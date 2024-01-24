import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RecordingFile = {
    duration: number;
    uri: string;
};

export const playRecordedFile = async (recordFile: RecordingFile, index: number, playObject: Audio.Sound | null, setPlayObject: Function, setIsPlayingList: Function, isPlayingList: boolean[], recordingList: RecordingFile[]): Promise<void> => {
    if (playObject) {
      await playObject.unloadAsync();
    }

    const newPlayObject = new Audio.Sound();
    
    await newPlayObject.loadAsync({ uri: recordFile.uri });
    setPlayObject(newPlayObject);
    await newPlayObject.playAsync();

    const newIsPlayingList = [...isPlayingList];
    newIsPlayingList[index] = true;
    setIsPlayingList(newIsPlayingList);
    setTimeout(() =>{
      newIsPlayingList[index] = false;
      setIsPlayingList(newIsPlayingList)
    }, recordingList[index].duration)
};

export const stopRecordedFile = async (index: number, playObject: Audio.Sound | null, isPlayingList: boolean[], setIsPlayingList: Function): Promise<void> =>{
    if(playObject != null){
      await playObject.stopAsync();
      const newIsPlayingList = [...isPlayingList];
      newIsPlayingList[index] = false;
      setIsPlayingList(newIsPlayingList);
    }
}

export const deleteRecordedFile = async (indexToRemove: number, recordingList: RecordingFile[], setRecordingList: Function): Promise<void> =>{
    const newRecordingList = recordingList.filter((_, index) => index !== indexToRemove);
    setRecordingList(newRecordingList);

    const recordingsJson = JSON.stringify(newRecordingList);

    try {
      await AsyncStorage.setItem(
        'recordsList',
        recordingsJson,
      );
    } catch (error) {
      console.log("Can't remove the list")
    }

}

export function getDurationFormatted(millis: number) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
}

export async function stopRecording(setRecording: Function, recording: Audio.Recording, recordingList: RecordingFile[], setRecordingList: Function) {
    console.log('Stopping recording..');
    setRecording(undefined)
    if (recording !== undefined) {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync(
        {
          allowsRecordingIOS: false,
        }
      );
      const durationMillis: number = (await recording.getStatusAsync()).durationMillis;

      let recordedFile: RecordingFile = {
        duration: durationMillis,
        uri: recording.getURI() ?? "",
      };

      let updatedRecordings = [...recordingList];
      updatedRecordings.push(recordedFile);

      setRecordingList(updatedRecordings);

      try {
        if(updatedRecordings != null){
          const recordingsJson = JSON.stringify(updatedRecordings);
          await AsyncStorage.setItem(
            'recordsList',
            recordingsJson,
          );
        }
      } catch (error) {
        console.log("Can't save the records URIs")
      }

      console.log('Recording stopped and stored at', recording.getURI());
    }
}

export async function startRecording(setRecording: Function) {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      }

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
}
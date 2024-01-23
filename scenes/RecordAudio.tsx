import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Audio } from 'expo-av';
import Ionicons from "@expo/vector-icons/Ionicons";

export type RecordingFile = {
  duration: string;
  uri: string;
};

const RecordAudio = () => {

  const [recording, setRecording] = useState<Audio.Recording>();
  const [recordingList, setRecordingList] = useState<RecordingFile[]>([]);

  async function startRecording() {
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

  async function stopRecording() {
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
        duration: getDurationFormatted(durationMillis),
        uri: recording.getURI() ?? "",
      };

      let updatedRecordings = [...recordingList];
      updatedRecordings.push(recordedFile);

      setRecordingList(updatedRecordings);
      console.log('Recording stopped and stored at', recording.getURI());
    }

    function getDurationFormatted(millis: number) {
      const minutes = millis / 1000 / 60;
      const minutesDisplay = Math.floor(minutes);
      const seconds = Math.round((minutes - minutesDisplay) * 60);
      const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
      return `${minutesDisplay}:${secondsDisplay}`;
    }
  }

  function getRecordingLines() {
    const [isPlayingList, setIsPlayingList] = useState(recordingList.map(() => false));

    const playRecordFile = async (recordFile: RecordingFile, index: number): Promise<void> => {
      const playObject = new Audio.Sound();
      await playObject.loadAsync({ uri: recordFile.uri });
      await playObject.playAsync();
  
      const newIsPlayingList = [...isPlayingList];
      newIsPlayingList[index] = true;
      setIsPlayingList(newIsPlayingList);
    };

    const deleteRecordFile = async (indexToRemove: number): Promise<void> =>{
      const newRecordingList = recordingList.filter((_, index) => index !== indexToRemove);
      setRecordingList(newRecordingList);
    }
    return recordingList.map((recordingLine, index) => {
      return (
        <View>
          <View style={styles.recorder}>
            <Text>Recording {index + 1} - {recordingLine.duration} </Text>
            <TouchableOpacity style={{flexDirection: "row"}} >
              <Ionicons
                  name={"trash-outline"}
                  size={30}
                  color={'#F5B40C'}
                  onPress={() => deleteRecordFile(index)}
                />
              <Ionicons
                name={isPlayingList[index] ? 'stop-circle-outline' : 'play-circle-outline'}
                size={30}
                color={'#F5B40C'}
                style={{paddingLeft: 20}}
                onPress={() => playRecordFile(recordingLine, index)}
              />
            </TouchableOpacity>
          </View>
        </View>
      )
    })
  }


  return (
    <View>
      <View style={styles.recorder}>
        <Ionicons
          name="musical-notes-outline"
          size={40}
          color={'#D00DF5'}
        />
        <Text>Tap mic icon to {recording ? "stop" : "start"} recording!</Text>
        {recording ?
          (
            <Ionicons
              name="mic-off-outline"
              size={40}
              color={'#F5B40C'}
              onPress={stopRecording}
            />
          ) : (
            <Ionicons
              name="mic-outline"
              size={40}
              color={'#F5B40C'}
              onPress={startRecording}
            />
        )}
      </View>
      {getRecordingLines()}
    </View>
  )
}

export default RecordAudio

const styles = StyleSheet.create({
  recorder: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 5,
    paddingBottom: 15,
    marginTop: 20,
    borderWidth: 2,
    borderBottomColor: '#D00DF5',
    borderTopColor: 'rgba(0, 0, 0, 0)',
    borderLeftColor: 'rgba(0, 0, 0, 0)',
    borderRightColor: 'rgba(0, 0, 0, 0)',
  }
})
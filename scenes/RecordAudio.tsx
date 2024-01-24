import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Audio } from 'expo-av';
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RecordingFile, deleteRecordedFile, getDurationFormatted, playRecordedFile, startRecording, stopRecordedFile, stopRecording } from '../services/recordService';


const RecordAudio = () => {
  
  const [recording, setRecording] = useState<Audio.Recording>();
  const [recordingList, setRecordingList] = useState<RecordingFile[]>([]);
  const [playObject, setPlayObject] = useState<Audio.Sound | null>(null);
  const [isPlayingList, setIsPlayingList] = useState(recordingList.map(() => false));

  const loadRecordingsFromStorage = async () => {
    try {
      const recordingsJson = await AsyncStorage.getItem('recordsList');
      
      let recordingsArray: RecordingFile[]
      if (recordingsJson) {
        const recordingsArray: RecordingFile[] = JSON.parse(recordingsJson);
        setRecordingList(recordingsArray)
      }
    } catch (error) {
      console.log("Error loading recordings from AsyncStorage");
    }
  };

  loadRecordingsFromStorage()

  function getRecordingLines() {
    return recordingList.map((recordingLine, index) => {
      return (
        <View>
          <View style={styles.recorder}>
            <Text>Recording {index + 1} - {getDurationFormatted(recordingLine.duration)} </Text>
            <TouchableOpacity style={{flexDirection: "row"}} >
              <Ionicons
                  name={"trash-outline"}
                  size={30}
                  color={'#F5B40C'}
                  onPress={() => deleteRecordedFile(index, recordingList, setRecordingList)}
                />
              <Ionicons
                name={isPlayingList[index] ? 'stop-circle-outline' : 'play-circle-outline'}
                size={30}
                color={'#F5B40C'}
                style={{paddingLeft: 20}}
                onPress={isPlayingList[index] ? () => stopRecordedFile(index, playObject, isPlayingList, setIsPlayingList) 
                  : () => playRecordedFile(recordingLine, index, playObject, setPlayObject, setIsPlayingList, isPlayingList, recordingList)}
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
          color={'#F5B40C'}
        />
        <Text>Tap mic icon to {recording ? "stop" : "start"} recording!</Text>
        {recording ?
          (
            <Ionicons
              name="mic-off-outline"
              size={40}
              color={'#F5B40C'}
              onPress={() => stopRecording(setRecording, recording, recordingList, setRecordingList)}
            />
          ) : (
            <Ionicons
              name="mic-outline"
              size={40}
              color={'#F5B40C'}
              onPress={() => startRecording(setRecording)}
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
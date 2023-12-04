import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

interface WelcomeProps {
  setIsLoging: React.Dispatch<React.SetStateAction<boolean>>
}

const Welcome: React.FC<WelcomeProps> = ({
  setIsLoging: setIsLogging
}) => {
  return (
    <View style={styles.backgroundColor}>
      <View>
        <View style={styles.lightDiamond}></View>
        <View style={styles.darkDiamond}></View>
      </View>
      <View style={styles.logInContainer}>
        <Text style={styles.logInText}>Hit me</Text>
        <Text style={styles.logInText}>to</Text>
        <Text style={styles.logInText}>log in!</Text>

        <Ionicons
          name={'chevron-up-outline'}
          size={64}
          style={{alignSelf: "center"}}
          color={'#F5B40C'}
          onPress={() => setIsLogging(true)}
        />
      </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    backgroundColor:{
        backgroundColor: "#D00DF5" ,
        width: "100%",
        height: "100%",
        justifyContent: "space-between"
    },
    lightDiamond:{
        position: "absolute",
        backgroundColor: "#D9D9D9",
        width: 600,
        height: 600,
        borderRadius: 70,
        transform: 'rotate(45deg)',
        left: "-100%"
    },
    darkDiamond:{
        backgroundColor: "#8F3DA0",
        width: 600,
        height: 600,
        borderRadius: 70,
        transform: 'rotate(45deg)',
        left: "-30%",
        top: "-10%",
        zIndex: -1,
    },
    logInContainer:{
      alignSelf: "center",
    },
    logInText:{
      color: "#D9D9D9",
      textAlign: "center",
      fontSize: 30,
      fontStyle: "italic",
      fontWeight: "bold"
    }
})
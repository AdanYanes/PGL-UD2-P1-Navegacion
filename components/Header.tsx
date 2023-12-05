import { StyleSheet, Text, View } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import React from 'react'

const Header = () => {
  return (
    <View style={styles.topContainer}>
      <Ionicons
      name={"menu-outline"}
      size={90}
      style={{alignSelf: "center"}}
      color={"#D9D9D9"}>
      </Ionicons>
      <Text style={styles.textStyle}>Adan's Portfolio</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    width: "100%",
    backgroundColor: "#D00DF5",
    paddingLeft: 20,
    flex: 3
  },
  textStyle:{
    fontSize: 35,
    color: "#D9D9D9"
  }
})
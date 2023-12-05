import { StyleSheet, Text, View } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import React from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/routers/src/types';

type HeaderProps = {
  navigation: DrawerNavigationProp<ParamListBase>
}

const Header = ({navigation}: HeaderProps) => {
  const openDrawer = () => navigation.openDrawer();
  return (
    <View style={styles.topContainer}>
      <Ionicons
      name={"menu-outline"}
      size={70}
      style={{alignSelf: "center"}}
      color={"#D9D9D9"}
      onPress={openDrawer}>
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
  },
  textStyle:{
    fontSize: 35,
    color: "#D9D9D9"
  }
})
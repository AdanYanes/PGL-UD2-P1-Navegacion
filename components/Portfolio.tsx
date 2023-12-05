import React, { useState } from "react";
import { StyleSheet, Image, View, Pressable, ImageProps } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import CardList from "./CardList";
import QR from "./QR";
import {profileData} from "../data/MyInfo"
import {ProfileData} from "../data/CardTypes";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Portfolio = () => {
  const ProfileTabOptions = ({ color }: { color: string }): BottomTabNavigationOptions => {
  return ({
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name={'person'}
        size={30}
        color={focused ? '#F5B40C' : color}
      />
    )
  })
}

const QRTabOptions = ({ color }: { color: string }): BottomTabNavigationOptions => {
  return ({
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name={'qr-code'}
        size={30}
        color={focused ? '#F5B40C' : color}
      />
    )
  })
}

  const tabNavigatorScreenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarInactiveTintColor: 'gray',
    tabBarActiveTintColor: "white",
    tabBarShowLabel: false,  
    tabBarStyle:{
      backgroundColor: "#D00DF5",
    }
  }

  return (
    <View style={[styles.body, styles.backgroundLight]}>
      <View>
        <View>
          <Image style={[styles.avatar, styles.borderColorLight]} source={profileData.image}></Image>
          <View style={[styles.iconView, styles.borderColorLight, {backgroundColor: '#D00DF5'}]}>
            <Ionicons
              name="repeat-outline"
              size={30}
              style={styles.icon}
              color={'#F5B40C'}
            />
          </View>
        </View>
        <View style={styles.appBody}>
          <Tab.Navigator screenOptions={tabNavigatorScreenOptions} >
          <Tab.Screen
            name='Home'
            component={CardList}
            options={({ route }) => ProfileTabOptions({ color: '#D9D9D9' })}
          />
          <Tab.Screen
            name='Login'
            component={QR}
            options={({ route }) => QRTabOptions({ color: '#D9D9D9' })}
          />
          </Tab.Navigator>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 20
  },
  backgroundLight:{
    backgroundColor: "#D9D9D9",
  },
  backgroundDark:{
    backgroundColor: "#232D3F",
  },
  borderColorLight: {
    borderColor: "#D00DF5",
  },
  borderColorDark: {
    borderColor: "#000000",
  },
  avatar: {
    height: 180,
    width: 180,
    borderRadius: 100,
    borderWidth: 10,
    marginTop: 20,
    marginBottom: -40,
    alignSelf: "center",
  },
  iconView: {
    width: 40,
    height: 40,
    alignSelf: "center",
    marginBottom: 40,
    borderRadius: 100,
    borderWidth: 3,
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
  },
  appBody: {
    flex: 1,
    width: 400
  }
});
export default Portfolio;

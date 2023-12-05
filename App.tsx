import { StyleSheet, Text, View } from 'react-native';
import Welcome from './components/Welcome';
import { useState } from 'react';
import Login from './components/Login';
import Portfolio from './components/Portfolio';
import {profileData} from "./data/MyInfo";
import Header from './components/Header';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [isLoging, setIsLoging] = useState(false);
  const [isLoged, setIsLoged] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true)

  return (
    <View style={styles.appContainer}>
      {isLoged ? (
        <NavigationContainer>
          <Header/>
          <Portfolio
            isLightMode={isLightMode}
            profileData={profileData}
          />
        </NavigationContainer>
      ) : (
        isLoging ? (
          <Login setIsLoged={setIsLoged} />
        ) : (
          <Welcome setIsLoging={setIsLoging} />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

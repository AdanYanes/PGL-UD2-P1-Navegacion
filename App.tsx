import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LoginContext } from './contexts/LoginContext'; // Ajusta la ruta según tu estructura de archivos
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import CustomDrawer from './components/CustomDrawer';

export default function App() {
  const [isLoging, setIsLoging] = useState(false);
  const [isLoged, setIsLoged] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);

  return (
    <LoginContext.Provider value={{ isLoged, toggleIsLoged: setIsLoged }}>
      <View style={styles.appContainer}>
        {isLoged ? (
          <CustomDrawer/>
        ) : (
          isLoging ? (
            isRegistering ? (
              <Register setIsRegistering={setIsRegistering} />
            ) : (
              <Login setIsRegistering={setIsRegistering} />
            )
          ) : (
            <Welcome setIsLoging={setIsLoging} />
          )
        )}
      </View>
    </LoginContext.Provider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { DefaultCredential } from '../data/Credentials';
import { LoginContext } from '../contexts/LoginContext'; // Ajusta la ruta según tu estructura de archivos

interface LoginProps {
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsRegistering }) => {
  const { toggleIsLoged } = useContext(LoginContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function checkUserData() {
    if (DefaultCredential.username === username && DefaultCredential.password === password) {
      toggleIsLoged(true);
    } else {
      alert('Credentials are not correct');
    }
  }

  function changeToRegistration() {
    setIsRegistering(true);
  }

  return (
    <View style={styles.backgroundColor}>
      <View>
        <View style={styles.lightDiamond}></View>
        <View style={styles.darkDiamond}></View>
      </View>
      <KeyboardAvoidingView behavior={'height'} style={styles.logInContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          style={styles.logInInput}
          onChangeText={setUsername}
        ></TextInput>
        <TextInput
          placeholder="Password"
          value={password}
          style={styles.logInInput}
          onChangeText={setPassword}
        ></TextInput>
        <View style={{ alignItems: 'center' }}>
          <Text>Don't have an account?</Text>
          <Pressable style={{}} onPress={changeToRegistration}>
            <Text style={{ color: 'blue' }}>Create an account here!</Text>
          </Pressable>
        </View>
        <Pressable style={styles.logInButton} onPress={checkUserData}>
          <Text style={styles.logInText}>Log In!</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

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
      position: "absolute",
      top: 215,
      alignItems: "center"
    },
    logInInput:{
      backgroundColor: "grey",
      width: 230,
      height: 30,
      borderRadius: 50,
      margin: 10,
      paddingLeft: 10
    },
    logInButton:{
        backgroundColor: '#F5B40C',
        borderRadius: 50,
        width: 120,
        height: 40,
        margin: 10,
        paddingTop: 5
    },
    logInText:{
        alignSelf: "center",
        color: "#D9D9D9",
        fontSize: 20,
    }
})
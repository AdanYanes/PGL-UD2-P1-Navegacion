import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import {DefaultCredential} from '../data/Credentials'
import { LoginContext } from '../contexts/LoginContext'

interface RegisterProps {
    setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>
}

const Register: React.FC<RegisterProps> = ({
    setIsRegistering: setIsRegistering
}) => {
    const { toggleIsLoged } = useContext(LoginContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function checkUserData(){
        if(DefaultCredential.username === username && DefaultCredential.password === password){
            toggleIsLoged(true)
            setIsRegistering(false)
        }else{
            alert("Credentials are not correct");
        }
    }

    function changeToLogin(){
        setIsRegistering(false)
    }

    return (
        <View style={styles.backgroundColor}>
          <View>
            <View style={styles.lightDiamond}></View>
            <View style={styles.darkDiamond}></View>
          </View>
          <KeyboardAvoidingView
          behavior={'height'}
          style={styles.registerContainer}>
            <TextInput
                placeholder="Username"
                value={username}
                style={styles.registerInput}
                onChangeText={setUsername}>
            </TextInput>
            <TextInput
                placeholder="Password"
                value={password}
                style={styles.registerInput}
                onChangeText={setPassword}>
            </TextInput>
            <TextInput
                placeholder="Email"
                value={email}
                style={styles.registerInput}
                onChangeText={setEmail}>
            </TextInput>
            <View style={{alignItems: 'center'}}>
                <Text>
                    Already have an account? 
                </Text>
                <Pressable
                    style={{}}
                    onPress={changeToLogin}>
                        <Text style={{color: 'blue'}}>Log in here!</Text>
                </Pressable>
            </View>
            <Pressable
            style={styles.registerButton}
            onPress={checkUserData}>
                <Text style={styles.registerText}>Log In!</Text>
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      )
}

export default Register

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
    registerContainer:{
      position: "absolute",
      top: 215,
      alignItems: "center"
    },
    registerInput:{
      backgroundColor: "grey",
      width: 230,
      height: 30,
      borderRadius: 50,
      margin: 10,
      paddingLeft: 10
    },
    registerButton:{
        backgroundColor: '#F5B40C',
        borderRadius: 50,
        width: 120,
        height: 40,
        margin: 10,
        paddingTop: 5
    },
    registerText:{
        alignSelf: "center",
        color: "#D9D9D9",
        fontSize: 20,
    }
})
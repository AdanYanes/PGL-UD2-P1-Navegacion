import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { LoginContext } from '../contexts/LoginContext';
import { postLogout } from '../services/loginService';

const Logout = () => {
    const { toggleIsLoged } = useContext(LoginContext);

    const fetchLogin = () => {
      const fetchData = async () => {
        const loginCodeResponse: string = await postLogout();
        if(loginCodeResponse == "200"){
          toggleIsLoged(false)
        }else{
          alert("Fatal error. Can't logout");
        }
      }
      fetchData();
    }

    fetchLogin()

  return null
}

export default Logout

const styles = StyleSheet.create({})
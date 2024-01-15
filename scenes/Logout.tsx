import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { LoginContext } from '../contexts/LoginContext';

const Logout = () => {
    const { toggleIsLoged } = useContext(LoginContext);
    toggleIsLoged(false)
  return (
    <View>
      <Text>Logout</Text>
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({})
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Header from './Header';
import Portfolio from './Portfolio';
import Test from '../scenes/Test';

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName='Profile'
        screenOptions={{
          header: ({ navigation }) => <Header navigation={navigation} />,
          drawerItemStyle: {
            width: '100%',
          },
          drawerActiveBackgroundColor: "rgba(255, 255, 255, 0.8)",
          drawerInactiveTintColor: 'lightgray',
          drawerInactiveBackgroundColor: "rgba(255, 255, 255, 0.8)",
          drawerStyle:{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          },
          drawerType: 'front',
        }}
      >
        <Drawer.Screen name='Profile' component={Portfolio} options={{ title: 'Portfolio' }} />
        <Drawer.Screen name='Test' component={Test} options={{ title: 'Test' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
});

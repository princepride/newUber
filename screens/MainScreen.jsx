import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStateContext } from '../context/ContextProvider'
import HomeTabs from './HomeTabs'
import SetPickUp from './SetPickUp'
import Login from './Login'
import React from 'react'

const MainScreen = () => {
  const Stack = createNativeStackNavigator();
  const { login } = useStateContext();
  return (
    <Stack.Navigator
    screenOptions = {({route}) => ({
      headerShown: false,
    })}
    >
      {!login && <Stack.Screen name="Login" component={Login} />}
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen name="SetPickUp" component={SetPickUp} />
    </Stack.Navigator>
  )
}

export default MainScreen

const styles = StyleSheet.create({})
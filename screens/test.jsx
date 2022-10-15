import { StyleSheet, Text, View, Button, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import React from 'react'

const MainAccountScreen = ({ navigation }) => {
  return (
    <View >
      <View style={tw`flex-row`}>
        <Text style={tw`text-5xl`}>Wang</Text>
        <Image source={{ uri: require('../assets/avatar.png') }} />
      </View>
    </View>
  )
}

export default MainAccountScreen;
{/*<Button onPress={() => navigation.navigate('StayturnScreen')} title="Button">Button</Button>*/ }
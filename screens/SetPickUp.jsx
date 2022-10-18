import { StyleSheet, View, SafeAreaView } from 'react-native'
import { TextInput } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames'
import { useStateContext } from '../context/ContextProvider'
import React, {useState, useEffect} from 'react'

const SetPickUp = ({ navigation }) => {
  const { profile, scheduleTime} = useStateContext();
  const [place, setPlace] = useState();

  //useEffect(() => {setPlace(profile.destination)},[])
  console.log(scheduleTime)
  return (
    <SafeAreaView style={tw`top-8`}>
      <TextInput
        style={tw`w-full`}
        theme={{ roundness: 50 }}
        mode='outlined'
        label="Start Place"
        placeholder='Where to?'
        value="University Town, NUS"
        editable={false}
        left={<TextInput.Icon icon="magnify" />}
        //onFocus={() => navigation.navigate("SetPickUp")}
      />
      <View style={tw`pt-1`}></View>
      <TextInput
        style={tw`w-full`}
        theme={{ roundness: 50 }}
        mode='outlined'
        label="Go To Pin"
        placeholder={profile.destination}
        left={<TextInput.Icon icon="magnify" />}
        //onFocus={() => navigation.navigate("SetPickUp")}
      />
    </SafeAreaView>
  )
}

export default SetPickUp

const styles = StyleSheet.create({})
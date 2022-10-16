import { StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames'
import { useStateContext } from '../context/ContextProvider'
import React, {useState} from 'react'

const SetPickUp = ({ navigation }) => {
  const { profile, scheduleTime} = useStateContext();
  const [place, setPlace] = useState(profile[0].destination);
  console.log(scheduleTime)
  return (
    <View>
      <TextInput
        style={tw`w-full`}
        theme={{ roundness: 50 }}
        mode='outlined'
        label="Start Place"
        placeholder='Where to?'
        value="University Town, NUS"
        editable={false}
        onChangeText={place => setText(place)}
        left={<TextInput.Icon icon="magnify" />}
        //onFocus={() => navigation.navigate("SetPickUp")}
      />
      <View style={tw`pt-1`}></View>
      <TextInput
        style={tw`w-full`}
        theme={{ roundness: 50 }}
        mode='outlined'
        label="Go To Pin"
        placeholder='Where to?'
        value={place}
        onChangeText={place => setText(place)}
        left={<TextInput.Icon icon="magnify" />}
        //onFocus={() => navigation.navigate("SetPickUp")}
      />
    </View>
  )
}

export default SetPickUp

const styles = StyleSheet.create({})
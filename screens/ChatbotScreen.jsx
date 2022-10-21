import { StyleSheet, Text, SafeAreaView, View, Image, ScrollView } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames'
import React, { useState } from 'react'
import { useStateContext } from '../context/ContextProvider'
import { postData } from '../fetchMethod'

const ChatbotScreen = () => {
  const [context, setContext] = useState('')
  const [tag1, setTag1] = useState(false)
  const [tag2, setTag2] = useState(false)
  const { chats, setChats } = useStateContext()
  const handleClick = () => {
    setChats([...chats, {
      name: 'user',
      text: context
    }])
    console.log(chats)
    postData('http://localhost:5000/chatbot', { context: context, tag1: tag1, tag2: tag2 })
      .then((data) => {
        console.log(typeof (data))
        console.log(data)
        setChats([...chats, {
          name: 'user',
          text: context
        },{
          name: 'bot',
          text: data[0],
        }])
        setTag1(data[1])
        setTag2(data[2])
      })
  }
  return (
    <>
      <SafeAreaView style={tw`top-8 pb-32`}>
        <ScrollView>
          {chats.map((chat, index) => {
            return (
              <View style={tw`flex p-2 flex-row`} key={`${chat.text}-${index}`}>
                {chat.name === 'bot' &&
                  <><Image style={tw`w-8 h-8 p-1`} source={require('../assets/bot.png')} /><Text style={tw`bg-blue-400 p-2 rounded-lg text-xl italic`}>
                    {chat.text}
                  </Text></>}
                {chat.name === 'user' &&
                  <><Text style={tw`bg-yellow-400 p-2 rounded-lg ml-auto text-xl italic`}>
                    {chat.text}
                  </Text>
                    <Image style={tw`w-8 h-8 p-1`} source={require('../assets/avatar.png')} /></>}
              </View>
            )
          }
          )}
        </ScrollView>
      </SafeAreaView>

      <View style={tw`absolute bottom-0`}>
        <View style={tw`flex-row`}>
          <TextInput
            style={tw`w-64`}
            theme={{ roundness: 50 }}
            mode='outlined'
            onChangeText={text => setContext(text)}
          //onFocus={() => navigation.navigate("SetPickUp")}
          />
          <View style={tw`pt-1 pl-1`}>
            <Button
              style={tw`w-32 p-2`}
              theme={{ roundness: 50 }}
              mode="contained"
              onPress={() => handleClick()}
            >
              Send
            </Button>
          </View>
        </View>
      </View>
    </>
  )
}



export default ChatbotScreen

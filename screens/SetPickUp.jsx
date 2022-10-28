import { StyleSheet, View, SafeAreaView, Image, Text, Modal, ScrollView } from 'react-native'
import { TextInput, Button, List } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames'
import { useStateContext } from '../context/ContextProvider'
import React, { useState, useEffect } from 'react'
import { postData } from '../fetchMethod'
import { backendhost } from '../configure' 
import ImageViewer from 'react-native-image-zoom-viewer';
import Axios from 'axios';

const SetPickUp = ({ navigation }) => {
  const { profile, scheduleTime, hour, minute } = useStateContext();
  const [destination, setDestination] = useState('');
  const [showImage, setShowImage ] = useState(false)
  const [imagesrc, setImagesrc] = useState('')
  const [routeName, setRouteName] = useState([])
  const [sumDistance, setSumDistance] = useState(0)
  const [dict, setDict] = useState({})
  const [route, setRoute] = useState([])
  //const [ finalRoute, setFinalRoute] = useState([])
  // const handleClick = () => {
  //   console.log(destination)
  //   postData(backendhost+'map', { destination: destination})
  //   .then((image) => {
  //       console.log(image)
  //       // setImagesrc(image.imgUrl)
  //       //console.log(typeof(imagesrc))

  //   })
  //   setShowImage(true)
  //   console.log(showImage)
  //   console.log(imagesrc)
  // }

  const handleClick = () => {

    Axios.post(backendhost+'map', { destination:destination == ''?profile.destination:destination, hour:hour, minute:minute }).then((respose) => {
      setImagesrc(respose.data[0])
      setRouteName(respose.data[1])
      setSumDistance(respose.data[2])
      setRoute(respose.data[3])
      //let temp = []
      //let i = 1
      //let j = 0
      //let pre = 0
      //console.log(routeName)
      //console.log(route)
      //while(i < route.length && j < routeName.length){
      //  if(routeName[j] === route[i]){
      //    console.log("hello")
      //    temp.push(routeName.slice(pre+1,j))
      //    pre = j
      //    i += 1
      //    j += 1
      //  }
      //  else{
      //    j += 1
      //  }
      //}
      //console.log(temp)
      //setFinalRoute(temp)
      //console.log(finalRoute)
      setShowImage(true)
    })
  }
  //useEffect(() => {setPlace(profile.destination)},[])
  console.log(scheduleTime)
  return (
    <SafeAreaView style={tw`top-8 flex-1`}>
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
        onChangeText={text => setDestination(text)}
        left={<TextInput.Icon icon="magnify" />}
      //onFocus={() => navigation.navigate("SetPickUp")}
      />
      <View style={tw`p-1`}></View>
      <Button
        style={tw`w-32 pt-2`}
        theme={{ roundness: 50 }}
        mode="contained"
        onPress={() => handleClick()}
      >
        Confirm
      </Button>
      {/* {showImage && setTimeout(()=>(<>
      <Image style={tw`w-full h-40 p-1`} source={`data:image/png;base64, ${imagesrc}`}></Image>
      <Text style={tw`text-xl italic p-1`}>{str}</Text>
      </>),3000)} */}
            {showImage && <>
      {/*<Image style={tw`w-full h-40 p-1`} source={{uri:`data:image/png;base64, ${imagesrc}`}}></Image>*/}
      <View style={tw`w-full h-64 p-1`}>
      <ImageViewer imageUrls={[{url:`data:image/png;base64, ${imagesrc}`,}]} renderIndicator={(currentIndex, allSize) =>""}/>
      </View>
      {/*{routeName.map((route) => <List.Item title={route} />)}*/}
      <Text style={tw`font-bold text-lg text-center`}>The distance of this trip is {sumDistance.toFixed(2)} km</Text>
      <ScrollView contentContainerStyle={{paddingHorizontal: 12}}>
      {route.map((route, index) => 
      (<List.Accordion title={route} key={`accordion-${route}`} left={props => <List.Icon {...props} icon="crosshairs-gps" color="#0a48f2"/>}>
        {console.log(typeof(routeName[index]))}
        {routeName[index]?.map((name)=>(<List.Item style={tw`left-4`} title={name} key={`item-${route}-${name}`} left={props => <List.Icon {...props} icon="arrow-down-thin-circle-outline" color="#9ddced"/>}/>))}
      </List.Accordion>))}
      </ScrollView>
      <View style={tw`pb-8`}></View>
      </>}
    </SafeAreaView>
  )
}

export default SetPickUp

const styles = StyleSheet.create({})
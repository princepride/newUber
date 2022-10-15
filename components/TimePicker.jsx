import { StyleSheet, Text, View, SectionList } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import React, { useState } from 'react'
import { Button } from 'react-native-paper';
import { useStateContext } from '../context/ContextProvider'

const TimePicker = () => {
  const [hour, setHour] = useState(new Date().getHours())
  const [minute, setMinute] = useState(new Date().getMinutes())

  const Item1 = ({ title }) => {
    if (title ==hour){
      return(
        <View style={tw`bg-blue-400 items-center`}>
        <Text style={tw`text-4xl`} onPress={()=>{setHour(title)}}>{title}</Text>
        </View>
      )
    }
      else {
        return(
        <View style={tw`items-center`}>
        <Text style={tw`text-4xl`} onPress={()=>{setHour(title)}}>{title}</Text>
        </View>
        )
      }
    };

const Item2 = ({ title }) => { 
  if (title ==minute){
  return(
    <View style={tw`bg-blue-400 items-center`}>
    <Text style={tw`text-4xl`} onPress={()=>{setMinute(title)}}>{title}</Text>
    </View>
  )
}
  else {
    return(
    <View style={tw`items-center`}>
    <Text style={tw`text-4xl`} onPress={()=>{setMinute(title)}}>{title}</Text>
    </View>
    )
  }
}

  const hoursData = [{
    data: ["00", "01", "02", "03", "04", "05", "06", "07",
      "08", "09", "10", "11", "12", "13", "14", "15",
      "16", "17", "18", "19", "20", "21", "22", "23"]
  }]
  const minutesData = [{
    data: ["00", "05", "10", "15",
      "20", "25", "30", "35",
      "40", "45", "50", "55"]
  }]
  return (
    <View style={tw`justify-center items-center`} >
      <View style={tw`absolute bg-yellow-400 w-5/6 h-60 pt-2 flex-row`}>
        <View style={tw` items-center justify-center`}>
        </View>
        <SectionList
          contentContainerStyle={tw``}
          sections={hoursData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item1 title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
        <SectionList
          contentContainerStyle={tw``}
          sections={minutesData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item2 title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text>{title}</Text>
          )}
        />
      </View>
      <View style={tw`absolute bg-blue-400 pt-56`}>
            <Button title={`test`} />
      </View>
    </View>
  )
}

export default TimePicker

const styles = StyleSheet.create({})
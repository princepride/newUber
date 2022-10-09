import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames'
import Ionicons from 'react-native-vector-icons/Ionicons';

const SuperButton = () => {
    return (
        <Button icon="clock" mode="contained" onPress={() => console.log('Pressed')}>
            Now
        </Button>
    )
}

const SuperSearch = () => {
    const [place, setPlace] = useState(null);
    return (
        <View style={tw`flex-row`}>
            <TextInput
                style={tw`w-64`}
                theme={{roundness:50}}
                mode='outlined'
                label="Place"
                placeholder='Where to?'
                value={place}
                onChangeText={place => setText(place)}
                left={<TextInput.Icon icon="magnify" />}
            />
            <View style={tw`pt-1 pl-1`}>
            <Button 
            style={tw`w-32 p-2`}
            theme={{roundness:50}}
            icon="clock"
            mode="contained" 
            contentStyle={{flexDirection: 'row-reverse'}}
            onPress={() => console.log('Pressed')}>
                Now
            </Button>
            </View>
        </View>
    )
}

export default SuperSearch

const styles = StyleSheet.create({})
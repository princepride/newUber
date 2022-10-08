// In App.js in a new project

import * as React from 'react';
import { Dimensions, View, Text } from 'react-native';

images: [
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree", // Network image         // Local image
]

const HomeScreen = () => {
    const width = Dimensions.get('window').width;
    return (
        <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
            </View>
        </>
    );
}

export default HomeScreen;
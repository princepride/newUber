// In App.js in a new project

import * as React from 'react';
import { Dimensions, View, Text } from 'react-native';
import { CustomSlider } from '../components';
import data from '../data/dummy'

const HomeScreen = () => {
    const width = Dimensions.get('window').width;
    return (
        <>
            <CustomSlider data={data}/>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
            </View>
        </>
    );
}

export default HomeScreen;
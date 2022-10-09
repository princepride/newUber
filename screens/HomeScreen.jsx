// In App.js in a new project
import { View } from 'react-native';
import React from 'react';
import Carousel from '../components/Carousel'
import Search from '../components/Search';
import tw from 'tailwind-react-native-classnames'
import SuperSearch from '../components/SuperSearch';

const HomeScreen = () => {
    return (
    <View style={tw`flex-col`}>
    <Carousel />
    {/*<Search />*/}
    <SuperSearch />
    </View>
    )
}

export default HomeScreen;
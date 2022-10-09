// In App.js in a new project

import { StatusBar } from 'expo-status-bar';
import React, {useRef} from 'react';
import { StyleSheet,Dimensions, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import carouselItem from '../data/dummy'
const {width,height} = Dimensions.get('window');
const HomeScreen = () => {
    let flatListRef = useRef()
    const renderItems = ({item}) => {
        return (
        <TouchableOpacity 
        onPress={() => console.log("clicked")}
        >
        <Image source={{uri:item.url}} style={styles.image} />
        <View style={styles.footer}>
            <Text style={styles.footerText}>{item.title}</Text>
            <Text style={styles.footerText}>{item.promo}</Text>
        </View>
        </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />

            <FlatList 
            data={carouselItem} 
            renderItem={renderItems} 
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            ref={(ref) => {
                flatListRef.current=ref
            }}
            style={styles.carousel}
            />
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex:1,
            backgroundColor:"#fff",
            //alignItems:'center',
            //justifyContent:"center",
        },
        carousel:{
            maxHeight: 300,

        },
        image: {
            width,
            height:250,
            resizeMode:"cover",
        },
        footer:{
            flexDirection:'row',
            justifyContent:'space-between',
            height:50,
            paddingHorizontal:40,
            alignItems:'center',
            backgroundColor:'#000',
        },
        footerText:{
            color:"#fff",
            fontSize:18,
            fontWeight:'bold'
        },

    }
)

export default HomeScreen;
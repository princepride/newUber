import { StyleSheet, Text, View, Dimensions  } from 'react-native'
import Carousel from "react-native-snap-carousel";
import CarouselItem from "./CarouselItem";
import styles from "./styles";
import React from 'react'

const { width } = Dimensions.get("window");
const CustomSlider = ({ data }) => {
    const settings = {
        sliderWidth: width,
        sliderHeight: width,
        itemWidth: width - 80,
        data: data,
        renderItem: CarouselItem,
        hasParallaxImages: true,
      };
  return (
<View style={styles.container}>
      <Carousel {...settings} />
    </View>
  )
}

export default CustomSlider
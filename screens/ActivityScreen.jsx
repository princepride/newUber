import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ImageComponent from "../components/ImageComponent";
import { images } from "../utils/Images";

const ActivityScreen = () => {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "black" }} />
      <View
        style={{
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <Text style={{ fontSize: 24, color: "white" }}>Activity</Text>
      </View>
      <ScrollView>
        {images.map((image, index) => (
          <ImageComponent key={image.id} image={image} />
        ))}
      </ScrollView>
    </>
  );
}

export default ActivityScreen

const styles = StyleSheet.create({
  header: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
import React from "react";
import styled from "styled-components";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
class MapScreen extends React.Component {
  static navigationOptions = { title: "Map", header: null };

  render() {
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle} />
      </View>
    );
  }
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});

/*Example to add or remove flatlist item with animation*/
import React from "react";
import styled from "styled-components";
//Import React
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
//Import basic react native components

export default class FridgeProp extends React.Component {
  render() {
    const { removeItem, item } = this.props;
    const { uri, title, description, key } = item;
    return (
      <Animated.View
        style={{ flex: 1, alignItems: "center", paddingVertical: 10 }}
      >
        <TouchableOpacity onPress={() => removeItem(key)}>
          <Container style={{ elevation: 10 }}>
            <Image source={{ uri }} resizeMode="contain" />
            <Text>{title}</Text>
          </Container>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const Container = styled.View`
  flex-direction: row;
  background: white;
  height: 60px;
  padding: 12px 16px 12px;
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  align-items: center;
  margin: 0 8px;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const Image = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 30px;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 17px;
  margin-left: 8px;
`;

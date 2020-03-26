import React from "react";
import styled from "styled-components";
import { Animated, TouchableOpacity } from "react-native";

export default class FridgeProp extends React.Component {
  render() {
    const { removeItem, item } = this.props;
    const { uri, title, description, key } = item;
    return (
      <Animated.View
        style={{ flex: 1, alignItems: "center", paddingVertical: 10 }}
      >
        <TouchableOpacity onLongPress={() => removeItem(key)}>
          <Container style={{ elevation: 5 }}>
            <Image source={{ uri }} />
            <Text>{title}</Text>
          </Container>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const Container = styled.View`
  flex-direction: column;
  background: white;
  height: 100%;
  padding: 12px 16px 12px;
  border-radius: 50px;
  align-items: center;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 100px;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 17px;
  margin-left: 8px;
  width: 200px;
  text-align: center;
`;

import React from "react";
import styled from "styled-components";
import { Animated, TouchableOpacity } from "react-native";
import * as Font from "expo-font";

export default class FridgeProp extends React.Component {
  state = {
    assetsLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      "open-sans-bold": require("../assets/fonts/OpenSans-Bold.ttf"),
      "galano-bold": require("../assets/fonts/Galano-Grotesque-Bold.ttf"),
      "galano-light": require("../assets/fonts/Galano-Grotesque-Light.ttf")
    });

    this.setState({ assetsLoaded: true });
  }

  render() {
    const { removeItem, item } = this.props;
    const { uri, title, key, exp } = item;
    return (
      <Animated.View
        style={{ flex: 1, alignItems: "center", paddingVertical: 10 }}
      >
        <TouchableOpacity onLongPress={() => removeItem(key)}>
          <Container style={{ elevation: 0 }}>
            <Image source={{ uri }} />
            {this.state.assetsLoaded ? (
              <Text numberOfLines={2}>{title}</Text>
            ) : null}

            {this.state.assetsLoaded ? (
              <ExpDate numberOfLines={1}>{exp}</ExpDate>
            ) : null}
          </Container>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const Container = styled.View`
  flex-direction: column;

  height: 150px;
  padding: 12px 16px 12px;
  border-radius: 50px;
  align-items: center;
  width: 150px;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 100px;
  margin-bottom: 10px;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 17px;
  margin-left: 8px;
  width: 150px;
  text-align: center;
  font-family: "galano-bold";
`;

const ExpDate = styled.Text`
  font-weight: 600;
  font-size: 17px;
  margin-left: 8px;
  width: 150px;
  text-align: center;
  font-family: "galano-light";
`;

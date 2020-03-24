import React from "react";
import styled from "styled-components";
import { Dimensions, ScrollView } from "react-native";
import { connect } from "react-redux";

import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

const screenWidth = Dimensions.get("window").width;

function getCourseWidth(screenWidth) {
  var cardWidth = screenWidth - 40;
  if (screenWidth >= 768) {
    cardWidth = (screenWidth - 60) / 2;
  }
  if (screenWidth >= 1024) {
    cardWidth = (screenWidth - 80) / 3;
  }
  return cardWidth;
}

class HomeCard extends React.Component {
  state = {
    cardWidth: getCourseWidth(screenWidth),
    fontLoaded: false
  };

  //   useEffect = () => {
  //     const playAnimation = this.props.navigation.addListener("didFocus", () => {
  //       if (this.animation) this.animation.play();
  //     });
  //     return () => playAnimation.remove();
  //   };

  //   useEffect2 = () => {
  //     const playAnimation2 = this.props.navigation.addListener("didFocus", () => {
  //       if (this.animation2) this.animation2.play();
  //     });
  //     return () => playAnimation.remove();
  //   };

  //   useEffect3 = () => {
  //     const playAnimation3 = this.props.navigation.addListener("didFocus", () => {
  //       if (this.animation3) this.animation3.play();
  //     });
  //     return () => playAnimation3.remove();
  //   };

  componentDidMount() {
    // this.useEffect();
    // this.useEffect2();
    // this.useEffect3();
    Dimensions.addEventListener("change", this.adaptLayout);
  }

  async componentDidMount() {
    await Font.loadAsync({
      "galano-bold": require("../assets/fonts/Galano-Grotesque-Bold.ttf"),
      "galano-light": require("../assets/fonts/Galano-Grotesque-Light.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  adaptLayout = dimensions => {
    this.setState({
      cardWidth: getCourseWidth(dimensions.window.width)
    });
  };

  render() {
    return (
      <Container style={{ width: this.state.cardWidth, elevation: 5 }}>
        <Fridge source={require("../assets/fridge.png")} />
        {this.state.fontLoaded ? <Title>Mon frigo</Title> : null}
        <LinearGradient
          colors={["#5145FF", "#3153FA"]}
          style={{ flex: 1, borderRadius: 30 }}
        >
          <ScrollView
            horizontal={true}
            style={{
              paddingBottom: 30,
              position: "absolute",
              bottom: 10,
              paddingLeft: 10
            }}
            showsHorizontalScrollIndicator={false}
          >
            {items.map((item, index) => (
              <MiniView>
                <ImageView>
                  <Image source={item.image} />
                </ImageView>

                <Text>{item.text}</Text>
              </MiniView>
            ))}
          </ScrollView>
        </LinearGradient>
      </Container>
    );
  }
}

export default connect()(HomeCard);

const Fridge = styled.Image`
  width: 180px;
  height: 180px;

  top: -40;
  left: 200;
`;

const MiniView = styled.View`
  width: 90px;
  height: 120px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 45px;
  margin-left: 20px;
  align-items: center;
  justify-content: center;
`;

const ImageView = styled.View`
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 60px;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  width: 30px;
  height: 30px;
`;

const Text = styled.Text`
  color: white;
  padding-top: 10px;
  font-family: "galano-bold";
`;

const Container = styled.View`
  width: 335px;
  height: 335px;
  background-color: #5145ff;
  margin: 10px 20px;
  border-radius: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
`;

const Title = styled.Text`
  color: white;
  font-size: 35px;
  top: 40px;
  left: 40px;
  position: absolute;
  z-index: 10;
  text-transform: uppercase;
  width: 130px;
  text-align: left;
  font-family: "galano-bold";
`;

const items = [
  {
    image: require("../assets/banana-line.png"),
    text: "2/5"
  },
  {
    image: require("../assets/turkey-line.png"),
    text: "4/10"
  },
  {
    image: require("../assets/egg-line.png"),
    text: "90%"
  },
  {
    image: require("../assets/carrot-line.png"),
    text: "1/20"
  }
];

import React from "react";
import styled from "styled-components";
import {
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  PanResponder
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const tabBarHeight = 0;

function mapStateToProps(state) {
  return {
    action: state.action
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openCard: () =>
      dispatch({
        type: "OPEN_CARD"
      }),
    closeCard: () =>
      dispatch({
        type: "CLOSE_CARD"
      })
  };
}

class Recette extends React.Component {
  state = {
    cardWidth: new Animated.Value(315),
    cardHeight: new Animated.Value(460),
    titleTop: new Animated.Value(20),
    opacity: new Animated.Value(0),
    textHeight: new Animated.Value(100)
  };

  openCard = () => {
    if (!this.props.canOpen) return;

    Animated.spring(this.state.cardWidth, { toValue: screenWidth }).start();
    Animated.spring(this.state.cardHeight, {
      toValue: screenHeight - tabBarHeight
    }).start();

    Animated.spring(this.state.titleTop, { toValue: 40 }).start();
    Animated.timing(this.state.opacity, { toValue: 1 }).start();
    Animated.spring(this.state.textHeight, { toValue: 1000 }).start();
    StatusBar.setHidden(true);
    this.props.openCard();
  };

  closeCard = () => {
    Animated.spring(this.state.cardWidth, { toValue: 315 }).start();
    Animated.spring(this.state.cardHeight, {
      toValue: 460
    }).start();

    Animated.spring(this.state.titleTop, { toValue: 20 }).start();
    Animated.timing(this.state.opacity, { toValue: 0 }).start();
    Animated.spring(this.state.textHeight, { toValue: 100 }).start();
    StatusBar.setHidden(false);
    this.props.closeCard();
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.openCard}>
        <AnimatedContainer
          style={{
            elevation: 10,
            width: this.state.cardWidth,
            height: this.state.cardHeight
          }}
        >
          <Cover>
            <Image source={{ uri: this.props.image }} />
            <AnimatedTitle style={{ top: this.state.titleTop }}>
              {this.props.title}
            </AnimatedTitle>
            <Author>by {this.props.author}</Author>
          </Cover>
          <AnimatedText style={{ height: this.state.textHeight }}>
            {this.props.text}
          </AnimatedText>
          <AnimatedLinearGradient
            colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
            style={{
              position: "absolute",
              top: 330,
              width: "100%",
              height: this.state.textHeight
            }}
          />
          <TouchableOpacity
            style={{ position: "absolute", top: 240, right: 20 }}
            onPress={this.closeCard}
          >
            <AnimatedCloseView style={{ opacity: this.state.opacity }}>
              <Ionicons name="ios-close" size={32} color="#546bfb" />
            </AnimatedCloseView>
          </TouchableOpacity>
        </AnimatedContainer>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recette);

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);

const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 280px;
`;

const AnimatedTitle = Animated.createAnimatedComponent(Title);

const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560;
`;

const AnimatedText = Animated.createAnimatedComponent(Text);

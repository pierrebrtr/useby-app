import React from "react";
import styled from "styled-components";
import { Animated, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuItem from "./MenuItem";
import { connect } from "react-redux";
import { AsyncStorage, PanResponder } from "react-native";

const screenWidth = Dimensions.get("window").width;

const cardWidth = screenWidth;

if (screenWidth > 500) {
  cardWidth = 500;
}

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () =>
      dispatch({
        type: "CLOSE_MENU"
      }),
    updateName: name =>
      dispatch({
        type: "UPDATE_NAME",
        name
      }),
    updateAvatar: avatar =>
      dispatch({
        type: "UPDATE_AVATAR",
        avatar
      })
  };
}

const screenHeight = Dimensions.get("window").height;

class Menu extends React.Component {
  state = {
    top: new Animated.Value(screenHeight),
    pan: new Animated.ValueXY()
  };

  retrieveName = async () => {
    try {
      const name = await AsyncStorage.getItem("name");
      if (name !== null) {
        console.log(name);
        this.props.updateName(name);
      }
    } catch (error) {}
  };

  componentDidMount() {
    this.toggleMenu();
    this.retrieveName();
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.spring(this.state.top, {
        toValue: 54
      }).start();
    }
    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.top, {
        toValue: screenHeight + 100
      }).start();
    }
  };

  handleMenu = index => {
    if (index == 3) {
      this.props.closeMenu();
      this.props.updateName("Inconnu");
      this.props.updateAvatar(
        "https://cl.ly/55da82beb939/download/avatar-default.jpg"
      );
      AsyncStorage.clear();
    }
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        if (gestureState.dx === 0 && gestureState.dy === 0) {
          return false;
        } else {
          if (this.props.action === "openCard") {
            return false;
          } else {
            return true;
          }
        }
      },
      onPanResponderGrant: () => {},

      onPanResponderMove: Animated.event([
        null,
        { dx: undefined, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: () => {
        const positionY = this.state.pan.y.__getValue();

        if (positionY > 200) {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            duration: 0
          }).start();
          this.props.closeMenu();
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 }
          }).start();
        }
      }
    });
  }

  render() {
    return (
      <AnimatedContainer
        style={{
          top: this.state.top,
          transform: [
            { translateX: this.state.pan.x },
            { translateY: this.state.pan.y }
          ]
        }}
      >
        <Cover {...this._panResponder.panHandlers}>
          <Image source={require("../assets/background2.jpg")} />
          <Title>{this.props.name}</Title>
          <Subtitle>Test de compte</Subtitle>
        </Cover>
        <TouchableOpacity
          onPress={this.props.closeMenu}
          style={{
            position: "absolute",
            top: 120,
            left: "50%",
            marginLeft: -22,
            zIndex: 1
          }}
        >
          <CloseView>
            <Ionicons name="ios-close" size={44} color="#546bfb" />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                this.handleMenu(index);
              }}
            >
              <MenuItem icon={item.icon} title={item.title} text={item.text} />
            </TouchableOpacity>
          ))}
        </Content>
      </AnimatedContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Container = styled.View`
  position: absolute;
  background: white;
  width: ${cardWidth};
  align-self: center;
  height: 1000%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  background: black;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  height: ${screenHeight};
  background-color: #f0f3f5;
  padding: 50px;
`;

const items = [
  {
    icon: "ios-settings",
    title: "Mon compte",
    text: "Paramètres"
  },
  {
    icon: "ios-card",
    title: "Mon Abonnement",
    text: "Moyens de paiement"
  },
  {
    icon: "ios-compass",
    title: "Support",
    text: "Un peu d'aide ? Une question ?"
  },
  {
    icon: "ios-exit",
    title: "Deconnexion",
    text: "Bye bye !"
  }
];

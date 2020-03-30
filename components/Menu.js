import React from "react";
import styled from "styled-components";
import {
  Animated,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  BackHandler
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuItem from "./MenuItem";
import { connect } from "react-redux";
import { AsyncStorage, PanResponder } from "react-native";
import colors from "../styles/colors.js";
import * as Font from "expo-font";

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
      }),
    openLogin: () =>
      dispatch({
        type: "OPEN_LOGIN"
      })
  };
}

const screenHeight = Dimensions.get("window").height;

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    top: new Animated.Value(screenHeight + 100),
    pan: new Animated.ValueXY(),
    assetsLoaded: false,
    iconLogin: "md-lock",
    titleLogin: "Connexion",
    descriptionLogin: "Se connecter",
    hasUpdated: false
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

  componentDidMount() {}
  async componentDidMount() {
    await Font.loadAsync({
      "galano-bold": require("../assets/fonts/Galano-Grotesque-Bold.ttf"),
      "galano-n": require("../assets/fonts/Galano-Grotesque.ttf")
    });

    this.setState({ assetsLoaded: true });
    this.toggleMenu();
    this.retrieveName();
    this.useEffect();
    if (this.checkLogged()) {
      this.setState({
        titleLogin: "Deconnexion",
        descriptionLogin: "Se deconnecter",
        iconLogin: "ios-exit"
      });
    } else {
    }
  }

  up = () => {
    if (this.state.hasUpdated && this.props.name !== "Inconnu") {
      this.setState({
        titleLogin: "Deconnexion",
        descriptionLogin: "Se deconnecter",
        iconLogin: "ios-exit",
        hasUpdated: false
      });
    }
  };

  checkLogged() {
    if (this.props.name !== "Inconnu") {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    this.toggleMenu();
    this.up();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.spring(this.state.top, {
        toValue: 200
      }).start();
    }
    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.top, {
        toValue: screenHeight + 100
      }).start();
    }
  };

  useEffect = () => {
    const backAction = () => {
      console.log("back");
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  };

  handleMenu = index => {
    if (index == 3) {
      if (this.checkLogged()) {
        this.props.closeMenu();
        this.props.updateName("Inconnu");
        this.props.updateAvatar(
          "https://cl.ly/55da82beb939/download/avatar-default.jpg"
        );
        AsyncStorage.clear();
        this.setState({
          titleLogin: "Connexion",
          descriptionLogin: "Se connecter",
          iconLogin: "md-lock"
        });
      } else {
        this.props.closeMenu();
        setTimeout(() => {
          this.props.openLogin();
        }, 100);
        this.setState({
          hasUpdated: true
        });
      }
    }
  };

  UNSAFE_componentWillMount() {
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
          this.props.closeMenu();
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            duration: 0
          }).start();
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 }
          }).start();
        }
      }
    });
  }

  tapBackground = () => {
    console.log("test");
  };

  render() {
    const { assetsLoaded } = this.state;
    return (
      <AnimatedContainer
        style={{
          top: this.state.top,
          transform: [
            { translateX: this.state.pan.x },
            { translateY: this.state.pan.y }
          ]
        }}
        {...this._panResponder.panHandlers}
      >
        <Cover>
          <Rect />
          <Image />
          {/* <Title>{this.props.name}</Title> */}

          {/* <Subtitle>Test de compte</Subtitle> */}
        </Cover>
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
        <Content>
          {this.state.assetsLoaded ? <Title>Menu</Title> : null}
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

          <TouchableOpacity
            onPress={() => {
              this.handleMenu(3);
            }}
          >
            <MenuItem
              icon={this.state.iconLogin}
              title={this.state.titleLogin}
              text={this.state.descriptionLogin}
            />
          </TouchableOpacity>
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
  color: #3c4560;
  justify-content: center;
  text-align: center;
  padding-bottom: 40px;
  font-size: 30px;
  font-family: "galano-bold";
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
  height: 10000px;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${colors.main_bg};
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 50px;

  justify-content: center;
  align-items: center;
  background-color: ${colors.main_bg};
`;

const Content = styled.View`
  height: ${screenHeight};
  background-color: ${colors.main_bg};
  margin-top: -20px;
  padding: 50px;
`;

const Rect = styled.View`
  background-color: #5145ff;
  width: 100px;
  height: 5px;
  border-radius: 20px;
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
  }
];

const login = [
  {
    icon: "ios-exit",
    title: "Deconnexion",
    text: "Bye bye !"
  }
];

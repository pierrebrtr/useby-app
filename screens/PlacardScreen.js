import React from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  Platform
} from "react-native";
import styled from "styled-components";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import Avatar from "../components/Avatar";
import ModalLogin from "../components/ModalLogin";
import NotificationButton from "../components/NotificationButton";
import Notifications from "../components/Notifications";
import { SwitchActions } from "react-navigation";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU"
      }),
    openLogin: () =>
      dispatch({
        type: "OPEN_LOGIN"
      }),
    openNotif: () =>
      dispatch({
        type: "OPEN_NOTIF"
      })
  };
}

class PlacardScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  state = {
    //Menu
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };

  useEffect = () => {
    const playAnimation = this.props.navigation.addListener("didFocus", () => {
      if (this.animation) this.animation.play();
    });
    return () => playAnimation.remove();
  };

  componentDidUpdate() {
    this.toggleMenu();
  }

  componentDidMount() {
    this.useEffect();
    StatusBar.setBarStyle("dark-content", true);

    if (Platform.OS == "android") {
      StatusBar.setBarStyle("light-content", true);
    }
  }

  render() {
    console.disableYellowBox = true;
    return (
      <RootView>
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity
          }}
        ></AnimatedContainer>
        <MainView>
          <EmptyView>
            <ChildView>
              <LottieView
                source={require("../assets/lottie-loading-text.json")}
                autoPlay={true}
                loop={true}
                ref={animation => {
                  this.animation = animation;
                }}
              />
              <Text>Ton placard est vide</Text>
            </ChildView>
          </EmptyView>
          <FridgeView></FridgeView>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.push("Barcode");
            }}
            style={{
              position: "absolute",
              top: screenHeight - 200,
              left: screenWidth / 2 - 35,
              zIndex: 100
            }}
          >
            <CloseButton style={{ elevation: 10 }}>
              <Ionicons name="ios-add" size={44} color="#546bfb" />
            </CloseButton>
          </TouchableOpacity>
        </MainView>
        <ModalLogin />
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacardScreen);

const MainView = styled.View`
  z-index: 0;
  top: 100px;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const RootView = styled.View`
  background: black;

  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const TitleBar = styled.View`
  width: 100%;
  height: 100px;
  margin-top: 50px;
  padding-left: 80px;
`;

const EmptyView = styled.View`
  z-index: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  align-items: center;
  justify-content: center;
`;
const ChildView = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  top: -100px;
  left: 0;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  padding-top: 200px;
  color: #b8bece;
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
`;

const FridgeView = styled.View``;

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

class FridgeScreen extends React.Component {
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

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.parallel([
        Animated.timing(this.state.scale, {
          toValue: 0.9,
          duration: 300,
          easing: Easing.in()
        }),
        Animated.timing(this.state.opacity, {
          toValue: 0.5,
          duration: 300
        })
      ]).start();

      StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.parallel([
        Animated.timing(this.state.scale, {
          toValue: 1,
          duration: 300
        }),
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 300
        })
      ]).start();

      StatusBar.setBarStyle("dark-content", true);
      if (Platform.OS == "android") {
        StatusBar.setBarStyle("light-content", true);
      }
    }
  };

  handleAvatar = () => {
    if (this.props.name !== "Inconnu") {
      this.props.openMenu();
    } else {
      this.props.openLogin();
    }
  };

  handlePress = index => {
    switch (index) {
      case 0:
        this.props.navigation.dispatch(
          SwitchActions.jumpTo({ routeName: "FridgeStack" })
        );
        break;
      case 1:
        this.props.navigation.dispatch(
          SwitchActions.jumpTo({ routeName: "RecettesStack" })
        );
        break;
      default:
        break;
    }
  };

  render() {
    console.disableYellowBox = true;
    return (
      <RootView>
        <Menu />
        <Notifications />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity
          }}
        >
          <SafeAreaView>
            <TitleBar>
              <TouchableOpacity
                onPress={this.handleAvatar}
                style={{ position: "absolute", top: 0, left: 20 }}
              >
                <Avatar />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.openNotif()}
                style={{ position: "absolute", right: 20, top: 5 }}
              >
                <NotificationButton />
              </TouchableOpacity>
            </TitleBar>
          </SafeAreaView>
        </AnimatedContainer>
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
            <Text>Ton frigo est vide</Text>
          </ChildView>
        </EmptyView>
        <ModalLogin />
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FridgeScreen);

const RootView = styled.View`
  background: black;

  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
  top: 100px;
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

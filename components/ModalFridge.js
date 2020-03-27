import React from "react";
import styled from "styled-components";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { BlurView } from "expo-blur";
import Success from "./Success";
import Loading from "./Loading";
import { Alert, Animated, Dimensions } from "react-native";
import { connect } from "react-redux";

import colors from "../styles/colors.js";

const screenHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
  return {
    action: state.action
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeFridge: () =>
      dispatch({
        type: "CLOSE_FRIDGE"
      })
  };
}

class ModalFridge extends React.Component {
  state = {
    email: "",
    password: "",
    iconEmail: require("../assets/icon-email.png"),
    iconPassword: require("../assets/icon-password.png"),
    top: new Animated.Value(screenHeight + 100),
    scale: new Animated.Value(1.3),
    translateY: new Animated.Value(0)
  };

  componentDidUpdate() {
    if (this.props.action === "openFridge") {
      Animated.timing(this.state.top, { toValue: 0, duration: 0 }).start();
      Animated.spring(this.state.scale, { toValue: 1 }).start();
      Animated.timing(this.state.translateY, {
        toValue: 0,
        duration: 0
      }).start();
    }
    if (this.props.action === "closeFridge") {
      setTimeout(() => {
        Animated.timing(this.state.top, {
          toValue: screenHeight + 100,
          duration: 0
        }).start();
        Animated.spring(this.state.scale, { toValue: 1.3 }).start();
      }, 500);

      Animated.timing(this.state.translateY, {
        toValue: 1000,
        duration: 500
      }).start();
    }
  }

  componentDidMount() {}

  focusEmail = () => {
    this.setState({
      iconEmail: require("../assets/icon-email-animated.gif"),
      iconPassword: require("../assets/icon-password.png")
    });
  };

  focusPassword = () => {
    this.setState({
      iconPassword: require("../assets/icon-password-animated.gif"),
      iconEmail: require("../assets/icon-email.png")
    });
  };

  tapBackground = () => {
    this.props.closeFridge();
  };

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <TouchableWithoutFeedback onPress={this.tapBackground}>
          <BlurView
            tint="default"
            intensity={100}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
        </TouchableWithoutFeedback>
        <AnimatedModal
          style={{
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateY }
            ]
          }}
        >
          <Logo source={require("../assets/logo-use.png")} />
          <Text>Connectez vous dès maintenant</Text>
          <TextInput
            onChangeText={email => this.setState({ email })}
            placeholder="Email"
            keyboardType="email-address"
            onFocus={this.focusEmail}
          />
          <TextInput
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            secureTextEntry={true}
            onFocus={this.focusPassword}
          />
          <IconEmail source={this.state.iconEmail} />
          <IconPassword source={this.state.iconPassword} />
          <TouchableOpacity onPress={this.tapBackground}>
            <Button>
              <ButtonText>Connexion</ButtonText>
            </Button>
          </TouchableOpacity>
        </AnimatedModal>
        <Success isActive={this.state.isSuccessful} />
        <Loading isActive={this.state.isLoading} />
      </AnimatedContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalFridge);

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Modal = styled.View`
  width: 335px;
  height: 370px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

const AnimatedModal = Animated.createAnimatedComponent(Modal);

const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;

const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  text-align: center;
  color: ${colors.main};
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 44px;
`;

const Button = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
`;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 179px;
  left: 31px;
`;

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 239px;
  left: 35px;
`;

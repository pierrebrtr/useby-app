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
import Moment from "moment";

import {
  Dimensions,
  FlatList,
  UIManager,
  StyleSheet,
  LayoutAnimation,
  View
} from "react-native";
import FridgeProp from "../components/FridgeProp";
import colors from "../styles/colors.js";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const imageUrl =
  "https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png";
const cards = [];

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

class FridgeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  state = {
    //Menu
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    cards,
    p_name: "Default",
    p_photo: "https://cl.ly/55da82beb939/download/avatar-default.jpg",
    p_date: "",
    show: true,
    isDatePickerVisible: false,
    setDatePickerVisibility: false
  };

  useEffect = () => {
    const playAnimation = this.props.navigation.addListener("didFocus", () => {
      if (this.animation) this.animation.play();
    });
    return () => playAnimation.remove();
  };

  componentDidMount() {
    this.useEffect();
    StatusBar.setBarStyle("dark-content", true);

    if (Platform.OS == "android") {
      StatusBar.setBarStyle("light-content", true);
    }
  }

  clearParams = () => {
    this.props.navigation.setParams({
      backRoute: null,
      routeImGoingNext: null
    });
  };

  showDatePicker() {
    this.setState({ isDatePickerVisible: true });
  }

  hideDatePicker() {
    this.setState({ isDatePickerVisible: false });
  }

  handleConfirm = date => {
    console.warn("A date has been picked: ", date);
    this.hideDatePicker();
    Moment.locale("fr");
    var dates = Moment(date).format("DD-MM-YYYY");
    this.setState({ p_date: dates }, function() {
      this.addItem();
      this.HideComponent();
    });
  };

  navigateToComponentB() {
    const { navigation } = this.props;
    this.navigationListener = navigation.addListener("willFocus", payload => {
      this.removeNavigationListener();
      const { state } = payload;
      const { params } = state;
      const { otherParam } = params;

      try {
        const p_name = params.product;
        const p_photo = params.photo;

        this.setState({ p_name, p_photo }, function() {
          this.showDatePicker();
        });
      } catch (e) {}
    });

    navigation.push("Barcode", {
      returnToRoute: navigation.state,
      otherParam: this.state.otherParam
    });
  }

  removeNavigationListener() {
    if (this.navigationListener) {
      this.navigationListener.remove();
      this.navigationListener = null;
    }
  }
  componentWillUnmount() {
    this.removeNavigationListener();
  }

  addItem = (() => {
    let key = cards.length;
    return () => {
      const { cards } = this.state;
      cards.unshift({
        key,
        uri: this.state.p_photo,
        title: this.state.p_name,
        exp: this.state.p_date
      });

      this.setState({
        cards: cards.slice(0)
      });
      key++;
    };
  })();

  removeItem = key => {
    const { cards } = this.state;
    console.log("Cards length : " + cards.length);
    if (cards.length == 1) {
      this.ShowComponent();
    }

    this.setState({
      cards: cards.slice().filter(card => card.key !== key)
    });
  };

  renderItem = ({ item }) => (
    <FridgeProp item={item} removeItem={this.removeItem} />
  );

  HideComponent = () => {
    this.setState({ show: false });
  };

  ShowComponent = () => {
    this.setState({ show: true });
  };

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
              {this.state.show ? (
                <LottieView
                  source={require("../assets/lottie-loading-text.json")}
                  autoPlay={true}
                  loop={true}
                  ref={animation => {
                    this.animation = animation;
                  }}
                />
              ) : null}
              {this.state.show ? <Text>Ton frigo est vide</Text> : null}
              <FlatList
                data={this.state.cards}
                renderItem={this.renderItem}
                style={{
                  position: "absolute",
                  width: "85%",
                  height: "65%"
                }}
                numColumns={2}
                // ItemSeparatorComponent={() => <View />}
                keyExtractor={item => item.key.toString()}
              />
            </ChildView>
          </EmptyView>
          <FridgeView></FridgeView>
          <TouchableOpacity
            onPress={() => {
              this.navigateToComponentB();
            }}
            // onPress={this.addItem}
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
        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
        />
      </RootView>
    );
  }
}

export default connect(mapStateToProps)(FridgeScreen);

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
  background-color: ${colors.main_bg};
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
  color: ${colors.main};
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
`;

const FridgeView = styled.View``;

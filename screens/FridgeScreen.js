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
import { SwitchActions } from "react-navigation";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import Moment from "moment";
import { AsyncStorage } from "react-native";
import { Notifications } from "expo";

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

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

class FridgeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.array = [];
  }

  static navigationOptions = {
    headerShown: false
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    p_name: "Default",
    p_photo: "https://cl.ly/55da82beb939/download/avatar-default.jpg",
    p_date: "",
    show: true,
    isDatePickerVisible: false,
    setDatePickerVisibility: false,
    arrayHolder: []
  };

  useEffect = () => {
    const playAnimation = this.props.navigation.addListener("didFocus", () => {
      if (this.animation) this.animation.play();
    });
    return () => playAnimation.remove();
  };

  componentDidMount() {
    this.retrieveData();
    this.useEffect();

    StatusBar.setBarStyle("dark-content", true);

    if (Platform.OS == "android") {
      StatusBar.setBarStyle("light-content", true);
    }
  }

  clearParams = () => {
    this.props.navigation.setParams({
      photo: null,
      product: null
    });
  };

  showDatePicker() {
    this.setState({ isDatePickerVisible: true });
  }

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  cancelDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
    this.setState({ p_date: " " }, function() {
      this.addItem();
      this.HideComponent();
    });
  };

  handleConfirm = date => {
    this.hideDatePicker();
    Moment.locale("fr");
    var dates = Moment(date).format("DD-MM-YYYY");
    this.setState({ p_date: dates }, function() {
      this.addItem();
      this.HideComponent();
    });
  };

  navigateToComponentB() {
    this.clearParams();
    const { navigation } = this.props;
    this.navigationListener = navigation.addListener("willFocus", payload => {
      this.removeNavigationListener();
      try {
        const { state } = payload;
        const { params } = state;
        console.log("Params : ", params);
        if (params.product) {
          const p_name = params.product;
          const p_photo = params.photo;

          this.setState({ p_name, p_photo }, function() {
            this.showDatePicker();
          });
        } else {
        }
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
  UNSAFE_componentWillUnmount() {
    this.removeNavigationListener();
  }

  saveState = async data => {
    try {
      const serializedState = JSON.stringify(data);
      AsyncStorage.removeItem("frigo-data");
      AsyncStorage.setItem("frigo-data", serializedState);
    } catch (error) {}
  };

  retrieveData = async () => {
    Notifications.cancelAllScheduledNotificationsAsync();
    const value = await AsyncStorage.getItem("frigo-data");
    if (value !== null) {
      const jsoni = JSON.parse(value);
      for (const el of jsoni) {
        if (el.title !== null) {
          Notifications.scheduleLocalNotificationAsync(
            { title: "Alerte Peromption", body: el.title + " bientot perimé" },
            { time: new Date().getTime() + Number(1000) }
          );
          this.HideComponent();
          let key = this.array.length;
          this.array.push({
            key,
            uri: el.uri,
            title: el.title,
            exp: el.exp
          });

          this.setState(
            {
              arrayHolder: [...this.array]
            },
            function() {
              this.saveState(this.state.arrayHolder);
            }
          );
          key++;
        }
      }
    }
  };

  addItem = (() => {
    return () => {
      let key = this.array.length;
      this.array.push({
        key,
        uri: this.state.p_photo,
        title: this.state.p_name,
        exp: this.state.p_date
      });

      this.setState(
        {
          arrayHolder: [...this.array]
        },
        function() {
          this.saveState(this.state.arrayHolder);
        }
      );
      key++;
    };
  })();

  removeItem = key => {
    this.array.splice(key, 1);
    this.setState(
      {
        arrayHolder: [...this.array]
      },
      function() {
        this.saveState(this.state.arrayHolder);
      }
    );
    console.log("Cards length : " + this.array.length);
    if (this.array.length == 0) {
      this.ShowComponent();
    }
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
                data={this.state.arrayHolder}
                renderItem={this.renderItem}
                style={{
                  position: "absolute",
                  width: "85%",
                  height: "65%"
                }}
                numColumns={2}
                extraData={this.state.arrayHolder}
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
              top: screenHeight * 0.97 - 200,
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
          onCancel={this.cancelDatePicker}
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

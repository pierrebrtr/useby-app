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
import {
  Dimensions,
  FlatList,
  UIManager,
  StyleSheet,
  LayoutAnimation,
  View
} from "react-native";
import FridgeProp from "../components/FridgeProp";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const imageUrl =
  "https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png";
const cards = [
  {
    key: 0,
    uri: imageUrl,
    title: "Animated FlatList Example Heading",
    description: "Please visit www.aboutreact.com"
  }
];

class FridgeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  state = {
    //Menu
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    cards,
    p_name: "Default"
  };

  useEffect = () => {
    const playAnimation = this.props.navigation.addListener("didFocus", () => {
      if (this.animation) this.animation.play();
    });
    return () => playAnimation.remove();
  };

  componentDidUpdate() {}

  componentDidMount() {
    this.useEffect();
    StatusBar.setBarStyle("dark-content", true);

    if (Platform.OS == "android") {
      StatusBar.setBarStyle("light-content", true);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("Param : " + nextProps.navigation.state.params.product);
    const p_name = nextProps.navigation.state.params.product;
    this.setState({ p_name: p_name }, function() {
      this.addItem();
    });
  }

  setAnimation = () => {
    LayoutAnimation.configureNext({
      duration: 250,
      update: {
        type: LayoutAnimation.Types.easeIn,
        springDamping: 0.7
      }
    });
    LayoutAnimation.configureNext({
      duration: 500,
      create: {
        type: LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7
      }
    });
  };

  addItem = (() => {
    let key = cards.length;
    return () => {
      const { cards } = this.state;
      cards.unshift({
        key,
        uri: imageUrl,
        title: this.state.p_name,
        description: "",
        animated: true
      });
      this.setAnimation();
      this.setState({
        cards: cards.slice(0)
      });
      key++;
    };
  })();

  addItem(StringHolder) {
    Alert.alert(StringHolder);
  }

  removeItem = key => {
    const { cards } = this.state;
    this.setAnimation();
    this.setState({
      cards: cards.slice().filter(card => card.key !== key)
    });
  };

  renderItem = ({ item }) => (
    <FridgeProp item={item} removeItem={this.removeItem} />
  );

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
              {/* <LottieView
                source={require("../assets/lottie-loading-text.json")}
                autoPlay={true}
                loop={true}
                ref={animation => {
                  this.animation = animation;
                }}
              /> */}
              <Text>Ton frigo est vide</Text>
              <FlatList
                data={this.state.cards}
                renderItem={this.renderItem}
                // ItemSeparatorComponent={() => <View />}
                keyExtractor={item => item.key.toString()}
              />
            </ChildView>
          </EmptyView>
          <FridgeView></FridgeView>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.push("Barcode");
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
        <ModalLogin />
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

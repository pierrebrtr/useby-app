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
import Card from "../components/Card";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import Avatar from "../components/Avatar";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ModalLogin from "../components/ModalLogin";
import NotificationButton from "../components/NotificationButton";
import Notifications from "../components/Notifications";
import { SwitchActions } from "react-navigation";
import HomeCard from "../components/HomeCard";

import * as Font from "expo-font";

const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        subtitle
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        content
      }
    }
  }
`;

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

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    fontLoaded: false
  };

  componentDidUpdate() {
    this.toggleMenu();
  }

  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);

    if (Platform.OS == "android") {
      StatusBar.setBarStyle("light-content", true);
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      "open-sans-bold": require("../assets/fonts/OpenSans-Bold.ttf"),
      "galano-bold": require("../assets/fonts/Galano-Grotesque-Bold.ttf"),
      "galano-light": require("../assets/fonts/Galano-Grotesque-Light.ttf"),
      galano: require("../assets/fonts/Galano-Grotesque.ttf")
    });

    this.setState({ fontLoaded: true });
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
            <ScrollView>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.handleAvatar}
                  style={{ position: "absolute", top: 0, left: 20 }}
                >
                  <Avatar />
                </TouchableOpacity>

                {this.state.fontLoaded ? (
                  <Title>Qu'allons nous faire aujourd'hui ?</Title>
                ) : null}

                {this.state.fontLoaded ? (
                  <Name>Bonjour, {this.props.name}</Name>
                ) : null}

                {/* <State>Etat : Presque vide</State> */}
                <TouchableOpacity
                  onPress={() => this.props.openNotif()}
                  style={{ position: "absolute", right: 20, top: 5 }}
                >
                  <NotificationButton />
                </TouchableOpacity>
              </TitleBar>
              <HomeCardView>
                <HomeCard navigation={this.props.navigation} />
              </HomeCardView>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                  flexDirection: "row",
                  marginBottom: 30,
                  paddingLeft: 10
                }}
              >
                {logos.map((logo, index) => (
                  <TouchableOpacity
                    onPress={() => this.handlePress(index)}
                    activeOpacity={0.6}
                  >
                    <Logo key={index} image={logo.image} text={logo.text} />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Subtitle>Continue learning</Subtitle>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                <Query query={CardsQuery}>
                  {({ loading, error, data }) => {
                    if (loading) return <Message>Loading...</Message>;
                    //console.log(data.cardsCollection.items);
                    return (
                      <CardsContainer>
                        {data.cardsCollection.items.map((card, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              this.props.navigation.push("Section", {
                                section: card
                              });
                            }}
                          >
                            <Card
                              title={card.title}
                              image={{ uri: card.image.url }}
                              caption={card.caption}
                              logo={{ uri: card.logo.url }}
                              subtitle={card.subtitle}
                              content={card.content}
                            />
                          </TouchableOpacity>
                        ))}
                      </CardsContainer>
                    );
                  }}
                </Query>
              </ScrollView>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
        <ModalLogin />
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const HomeCardView = styled.View`
  padding-top: 150;
`;

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;

const CardsContainer = styled.View`
  flex-direction: row;
  padding-left: 10px;
`;

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  text-transform: uppercase;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  top: 140;
  left: -50px;
  font-family: "galano";
`;
const Name = styled.Text`
  font-family: "galano-bold";
  font-size: 30px;
  color: #3c4560;
  top: 80px;
  left: -50px;
  width: 400px;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const logos = [
  {
    image: require("../assets/logo-use.png"),
    text: "Remplir mon frigo"
  },
  {
    image: require("../assets/logo-use.png"),
    text: "Recettes dispos"
  },
  {
    image: require("../assets/logo-use.png"),
    text: "Carte"
  }
];

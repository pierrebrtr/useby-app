import React from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  Platform,
  BackHandler
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
import ModalLoginBis from "../components/ModalLoginBis";
import NotificationButton from "../components/NotificationButton";
import Notifications from "../components/Notifications";
import { SwitchActions } from "react-navigation";
import HomeCardFridge from "../components/HomeCardFridge";

import * as Font from "expo-font";
import HomeCardPlac from "../components/HomeCardPlac";

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
    closeMenu: () =>
      dispatch({
        type: "CLOSE_MENU"
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
    assetsLoaded: false
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
      "galano-light": require("../assets/fonts/Galano-Grotesque-Light.ttf")
    });

    this.setState({ assetsLoaded: true });
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

  handleClick = () => {
    if (this.props.action == "openMenu") {
      this.props.closeMenu();
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
    const { assetsLoaded } = this.state;

    console.disableYellowBox = true;
    return (
      <RootView onPress={this.handleAvatar}>
        <Menu />
        <Notifications />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity
          }}
        >
          <SafeAreaView onStartShouldSetResponder={() => this.handleClick()}>
            <ScrollView>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.handleAvatar}
                  style={{ position: "absolute", top: 0, left: 20 }}
                >
                  <Avatar />
                </TouchableOpacity>

                {this.state.assetsLoaded ? (
                  <Title>Qu'allons nous faire aujourd'hui ?</Title>
                ) : null}

                {this.state.assetsLoaded ? (
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
              {this.state.assetsLoaded ? (
                <HomeCardView>
                  <HomeCardFridge navigation={this.props.navigation} />
                </HomeCardView>
              ) : null}

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
                    <ContainerLogo style={{ elevation: 5 }}>
                      <ImageLogo source={logo.image} resizeMode="contain" />
                      <TextLogo>{logo.text}</TextLogo>
                    </ContainerLogo>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {this.state.assetsLoaded ? (
                <HomeCardViewB>
                  <HomeCardPlac navigation={this.props.navigation} />
                </HomeCardViewB>
              ) : null}

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

const ContainerLogo = styled.View`
  flex-direction: row;
  background: white;
  height: 60px;
  padding: 12px 25px 12px;
  border-radius: 30px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  align-items: center;
  margin: 0 8px;
  margin-bottom: 10px;
  margin-top: 15px;
`;

const ImageLogo = styled.Image`
  width: 36px;
  height: 36px;
`;

const TextLogo = styled.Text`
  font-weight: 600;
  font-size: 17px;
  margin-left: 8px;
  font-family: "galano-bold";
`;

const HomeCardView = styled.View`
  padding-top: 170;
`;

const HomeCardViewB = styled.View`
  padding-top: 0;
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
  font-family: "galano-light";
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

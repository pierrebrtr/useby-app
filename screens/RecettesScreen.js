import React from "react";
import styled from "styled-components";
import {
  Button,
  SafeAreaView,
  TouchableOpacity,
  Easing,
  StatusBar
} from "react-native";
import Recette from "../components/Recette";
import { PanResponder, Animated } from "react-native";
import { connect } from "react-redux";
import Menu from "../components/Menu";
import Avatar from "../components/Avatar";
import ModalLogin from "../components/ModalLogin";
import NotificationButton from "../components/NotificationButton";
import Notifications from "../components/Notifications";
import colors from "../styles/colors.js";

function mapStateToProps(state) {
  return {
    action: state.action
  };
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

function getNextIndex(index) {
  var nextIndex = index + 1;
  if (nextIndex > projects.length - 1) {
    return 0;
  }
  return nextIndex;
}

class RecettesScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44),
    thirdScale: new Animated.Value(0.8),
    thirdTranslateY: new Animated.Value(-50),
    index: 0,
    opacity: new Animated.Value(0),
    scaleb: new Animated.Value(1),
    opacityb: new Animated.Value(1)
  };

  componentDidUpdate() {
    this.toggleMenu();
  }
  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.parallel([
        Animated.timing(this.state.scaleb, {
          toValue: 0.9,
          duration: 300,
          easing: Easing.in()
        }),
        Animated.timing(this.state.opacityb, {
          toValue: 0.5,
          duration: 300
        })
      ]).start();

      StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.parallel([
        Animated.timing(this.state.scaleb, {
          toValue: 1,
          duration: 300
        }),
        Animated.timing(this.state.opacityb, {
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
      onPanResponderGrant: () => {
        Animated.spring(this.state.scale, { toValue: 1 }).start();
        Animated.spring(this.state.translateY, { toValue: 0 }).start();
        Animated.spring(this.state.thirdScale, { toValue: 0.9 }).start();
        Animated.spring(this.state.thirdTranslateY, { toValue: 44 }).start();

        Animated.timing(this.state.opacity, { toValue: 1 }).start();
      },

      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: () => {
        const positionY = this.state.pan.y.__getValue();
        Animated.timing(this.state.opacity, { toValue: 0 }).start();

        if (positionY > 200) {
          var positionx = this.state.pan.x.__getValue();
          if (positionx < 0) {
            positionx -= 500;
          } else {
            positionx += 500;
          }
          Animated.timing(this.state.pan, {
            toValue: { x: positionx, y: 1000 },
            duration: 150
          }).start(() => {
            this.state.pan.setValue({ x: 0, y: 0 });
            this.state.scale.setValue(0.9);
            this.state.translateY.setValue(44);
            this.state.thirdScale.setValue(0.8);
            this.state.thirdTranslateY.setValue(-50);
            this.setState({ index: getNextIndex(this.state.index) });
          });
        } else if (positionY < -200) {
          var positionx = this.state.pan.x.__getValue();
          if (positionx < 0) {
            positionx -= 1000;
          } else {
            positionx += 1000;
          }
          Animated.timing(this.state.pan, {
            toValue: { x: positionx, y: -1000 },
            duration: 150
          }).start(() => {
            this.state.pan.setValue({ x: 0, y: 0 });
            this.state.scale.setValue(0.9);
            this.state.translateY.setValue(44);
            this.state.thirdScale.setValue(0.8);
            this.state.thirdTranslateY.setValue(-50);
            this.setState({ index: getNextIndex(this.state.index) });
          });
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 }
          }).start();

          Animated.spring(this.state.scale, { toValue: 0.9 }).start();
          Animated.spring(this.state.translateY, { toValue: 44 }).start();

          Animated.spring(this.state.thirdScale, { toValue: 0.8 }).start();
          Animated.spring(this.state.thirdTranslateY, { toValue: -50 }).start();
        }
      }
    });
  }

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
            transform: [{ scale: this.state.scaleb }],
            opacity: this.state.opacityb
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
        <AnimatedMask style={{ opacity: this.state.opacity }} />
        <MainView>
          <Container>
            <Animated.View
              style={{
                transform: [
                  { translateX: this.state.pan.x },
                  { translateY: this.state.pan.y }
                ]
              }}
              {...this._panResponder.panHandlers}
            >
              <Recette
                title={projects[this.state.index].title}
                image={projects[this.state.index].image}
                author={projects[this.state.index].author}
                text={projects[this.state.index].text}
                canOpen={true}
              />
            </Animated.View>
            <Animated.View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                transform: [
                  { scale: this.state.scale },
                  { translateY: this.state.translateY }
                ]
              }}
            >
              <Recette
                title={projects[getNextIndex(this.state.index)].title}
                image={projects[getNextIndex(this.state.index)].image}
                author={projects[getNextIndex(this.state.index)].author}
                text={projects[getNextIndex(this.state.index)].text}
              />
            </Animated.View>
            <Animated.View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -3,
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                transform: [
                  { scale: this.state.thirdScale },
                  { translateY: this.state.thirdTranslateY }
                ]
              }}
            >
              <Recette
                title={projects[getNextIndex(this.state.index + 1)].title}
                image={projects[getNextIndex(this.state.index + 1)].image}
                author={projects[getNextIndex(this.state.index + 1)].author}
                text={projects[getNextIndex(this.state.index + 1)].text}
              />
            </Animated.View>
          </Container>
        </MainView>
        <ModalLogin />
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecettesScreen);

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: -10;
`;

const AnimatedMask = Animated.createAnimatedComponent(Mask);

const Container = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

const MainView = styled.View`
  top: 0px;
  width: 100%;
  height: 80%;
  position: absolute;
  left: 0;
  top: 10%;
  z-index: 0;
`;

const RootViewb = styled.View`
  flex: 1;
`;

const RootView = styled.View`
  background: black;

  flex: 1;
`;

const Containerb = styled.View`
  flex: 1;
  background-color: ${colors.main_bg};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Containerb);

const TitleBar = styled.View`
  width: 100%;
  height: 100px;
  margin-top: 50px;
  padding-left: 80px;
`;

const projects = [
  {
    title: "Ratatouille",
    image:
      "https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2019.2F06.2F21.2F0a8803df-fcca-42ba-b953-3efaa375d1ee.2Ejpeg/748x372/quality/80/crop-from/center/ratatouille-au-companion.jpeg",
    author: "Cyrielle Albert",
    text:
      "ÉTAPE 1 \
    Ciselez le persil, épluchez les oignons et les gousses d'ail, enlevez les pépins, le coeur vert et les parties blanches du poivron rouge (ou du poivron vert), enlevez les extrémités des aubergines et des courgettes et enlevez le pédoncule des tomates. Ensuite, émincez tous ces légumes en cubes ou en quart de rondelles \
    \
    ÉTAPE 2 \
    Faites chauffer 2 c. à soupe l'huile dans une cocotte, mettez-y les oignons émincés, laissez-les blondir quelques min à feu moyen, puis ajoutez les tomates et laissez-les fondre quelques min en remuant de temps en temps\
    \
    ÉTAPE 3 \
    Mettez pour finir tous les autres légumes dans la cocotte, parfumez avec l'ail, le persil, le thym et 2 c. à soupe d'huile d'olive, salez et poivrez, mouillez avec l'eau, couvrez et laissez mijoter pendant 1 heure à feu doux, en remuant régulièrement. Servez chaud, tiède ou froid."
  },
  {
    title: "Gâteau au chocolat noir",
    image:
      "https://odelices.ouest-france.fr/images/recettes/gateau_au_chocolat1-970x1024.jpg",
    author: "Pierre Bertier",
    text:
      "ÉTAPE 1 \
      Préchauffez le four à th.5 (155°C) \
      \
      ÉTAPE 2 \
      Cassez les œufs dans deux bols différents en séparant les blancs des jaunes \
      \
      ÉTAPE 3 \
      Fouettez les jaunes avec 250 grammes de sucre et le sachet de sucre vanillé jusqu’à obtention d’un mélange blanc \
      \
      ÉTAPE 4 \
      Râpez le chocolat noir "
  },
  {
    title: "Tarte aux poires",
    image:
      "https://sf2.viepratique.fr/wp-content/uploads/sites/2/2015/04/Tarte-aux-poires-et-%C3%A0-la-frangipane-164334.jpg",
    author: "Cycy",
    text:
      "ÉTAPE 1\
      Avant de débuter la préparation votre tarte aux poires Williams, mettre votre four à préchauffer thermostat 7 ou 210°C\
      \
      ÉTAPE 2\
      Commencez par dérouler et déposer la pâte brisée dans un plat à tarte, et piquez le fond de la pâte avec une fourchette."
  }
];

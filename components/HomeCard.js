import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import { connect } from "react-redux";
import ProgressCircle from "react-native-progress-circle";

const screenWidth = Dimensions.get("window").width;

function getCourseWidth(screenWidth) {
  var cardWidth = screenWidth - 40;
  if (screenWidth >= 768) {
    cardWidth = (screenWidth - 60) / 2;
  }
  if (screenWidth >= 1024) {
    cardWidth = (screenWidth - 80) / 3;
  }
  return cardWidth;
}

class HomeCard extends React.Component {
  state = {
    cardWidth: getCourseWidth(screenWidth)
  };

  //   useEffect = () => {
  //     const playAnimation = this.props.navigation.addListener("didFocus", () => {
  //       if (this.animation) this.animation.play();
  //     });
  //     return () => playAnimation.remove();
  //   };

  //   useEffect2 = () => {
  //     const playAnimation2 = this.props.navigation.addListener("didFocus", () => {
  //       if (this.animation2) this.animation2.play();
  //     });
  //     return () => playAnimation.remove();
  //   };

  //   useEffect3 = () => {
  //     const playAnimation3 = this.props.navigation.addListener("didFocus", () => {
  //       if (this.animation3) this.animation3.play();
  //     });
  //     return () => playAnimation3.remove();
  //   };

  componentDidMount() {
    // this.useEffect();
    // this.useEffect2();
    // this.useEffect3();
    Dimensions.addEventListener("change", this.adaptLayout);
  }

  adaptLayout = dimensions => {
    this.setState({
      cardWidth: getCourseWidth(dimensions.window.width)
    });
  };

  render() {
    return (
      <Container style={{ width: this.state.cardWidth, elevation: 5 }}>
        <Title>Mon frigo</Title>
        <Row>
          <Item>
            <Icon source={require("../assets/banana-line.png")} />
            <TextContainer>
              <Text>Bananes</Text>
              <SubText>Infos supplémentaires</SubText>
            </TextContainer>
            <CView>
              <ProgressCircle
                percent={70}
                radius={30}
                borderWidth={4}
                color="#3399FF"
                shadowColor="#ecf0f1"
                bgColor="#fff"
              >
                <Text style={{ fontSize: 18, color: "#3399FF" }}>{"70%"}</Text>
              </ProgressCircle>
            </CView>
          </Item>
          <Item>
            {/* <LView>
              <LottieView
                source={require("../assets/lottie-milk2.json")}
                autoPlay={true}
                loop={true}
                style={{ position: "absolute" }}
                ref={animation2 => {
                  this.animation2 = animation2;
                }}
              />
            </LView> */}
            <Icon source={require("../assets/egg.png")} />
            <TextContainer>
              <Text>Oeufs</Text>
              <SubText>Infos supplémentaires</SubText>
            </TextContainer>
            <CView>
              <ProgressCircle
                percent={30}
                radius={30}
                borderWidth={4}
                color="#3399FF"
                shadowColor="#ecf0f1"
                bgColor="#fff"
              >
                <Text style={{ fontSize: 18, color: "#3399FF" }}>{"30%"}</Text>
              </ProgressCircle>
            </CView>
          </Item>
          <Item>
            <Icon source={require("../assets/cheese-line.png")} />
            <TextContainer>
              <Text>Fromage</Text>
              <SubText>Infos supplémentaires</SubText>
            </TextContainer>
            <CView>
              <ProgressCircle
                percent={5}
                radius={30}
                borderWidth={4}
                color="#3399FF"
                shadowColor="#ecf0f1"
                bgColor="#fff"
              >
                <Text style={{ fontSize: 18, color: "#3399FF" }}>{"5%"}</Text>
              </ProgressCircle>
            </CView>
          </Item>
        </Row>
      </Container>
    );
  }
}

export default connect()(HomeCard);

const CView = styled.View`
  width: 100px;
  position: absolute;
  top: -10;
  left: 270;
  height: 100px;
`;

const Container = styled.View`
  width: 335px;
  height: 335px;
  background: white;
  margin: 10px 20px;
  border-radius: 14px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
`;

const Title = styled.Text`
  color: #2c3e50;
  font-size: 24px;
  font-weight: bold;
  top: 20px;
  left: 20px;
  position: absolute;
  text-transform: uppercase;
  z-index: 10;
`;

const Row = styled.View`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  top: 100px;
  left: 20px;
`;

const Item = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

const Text = styled.Text`
  text-transform: uppercase;
  font-size: 15px;
  font-weight: bold;
`;

const TextContainer = styled.View`
  margin-left: 20px;
`;

const SubText = styled.Text`
  color: #b8bece;
`;

const Icon = styled.Image`
  width: 44px;
  height: 44px;
`;

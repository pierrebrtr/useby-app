import React from "react";
import styled from "styled-components";

class MapScreen extends React.Component {
  static navigationOptions = { title: "Map", header: null };

  render() {
    console.disableYellowBox = true;
    return <Container></Container>;
  }
}

export default MapScreen;

const Container = styled.View`
  background: #f0f3f5;
`;

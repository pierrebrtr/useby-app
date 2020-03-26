import React from "react";

import { createAppContainer, NavigationContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import FridgeScreen from "./FridgeScreen";
import PlacardScreen from "./PlacardScreen";

const TabScreen = createMaterialTopTabNavigator(
  {
    Frigo: { screen: FridgeScreen },
    Placard: { screen: PlacardScreen }
  },
  {
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: "blue",
      inactiveTintColor: "#b8bece",
      style: {
        backgroundColor: "transparent",
        position: "absolute",
        left: "5%",
        top: 40,
        width: "90%"
      },
      labelStyle: {
        textAlign: "center",
        fontFamily: "galano-bold"
      },
      indicatorStyle: {
        opacity: 0,
        borderBottomColor: "black",
        borderBottomWidth: 2
      }
    }
  }
);

//making a StackNavigator to export as default
const InventoryScreen = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      headerShown: false,
      headerStyle: {
        backgroundColor: "#633689"
      },
      headerTintColor: "#FFFFFF",
      title: "TabExample"
    }
  }
});

export default createAppContainer(InventoryScreen);

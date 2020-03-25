//This is an example of React Native Tab
import React from "react";
//import react in our code.

//For React Navigation 3+
//import {
//  createStackNavigator,
//  createMaterialTopTabNavigator,
//  createAppContainer,
//} from 'react-navigation';

//For React Navigation 4+
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import FridgeScreen from "./FridgeScreen";
import HomeScreen from "./HomeScreen";
import PlacardScreen from "./PlacardScreen";

//Making TabNavigator which will be called in App StackNavigator
//we can directly export the TabNavigator also but header will not be visible
//as header comes only when we put anything into StackNavigator and then export

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
        top: 150,
        width: "90%"
      },
      labelStyle: {
        textAlign: "center"
      },
      indicatorStyle: {
        marginLeft: "14.5%",
        borderBottomColor: "black",
        borderBottomWidth: 2,
        width: "10%"
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
import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CoursesScreen from "../screens/CoursesScreen";
import RecettesScreen from "../screens/RecettesScreen";
import VideoScreen from "../screens/VideoScreen";
import FridgeScreen from "../screens/FridgeScreen";

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Section: SectionScreen,
    Video: VideoScreen
  },
  {
    mode: "modal"
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == "Section" || routeName == "Video") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: "Accueil",
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name="ios-home"
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    )
  };
};

const CoursesStack = createStackNavigator({
  Courses: CoursesScreen
});

CoursesStack.navigationOptions = {
  tabBarLabel: "Courses",
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-albums"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};

const RecettesStack = createStackNavigator({
  Recettes: RecettesScreen
});

RecettesStack.navigationOptions = {
  tabBarLabel: "Recettes",
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name="receipt"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};

const FridgeStack = createStackNavigator({
  Fridges: FridgeScreen
});

FridgeStack.navigationOptions = {
  tabBarLabel: "Mon Frigo",
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name="fridge"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};

const TabNavigator = createBottomTabNavigator({
  HomeStack,
  CoursesStack,
  FridgeStack,
  RecettesStack
});

export default TabNavigator;

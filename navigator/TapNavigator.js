import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import CoursesScreen from "../screens/CoursesScreen";
import RecettesScreen from "../screens/RecettesScreen";
import VideoScreen from "../screens/VideoScreen";
import FridgeScreen from "../screens/FridgeScreen";
import MapScreen from "../screens/MapScreen";
import ModalLoginBis from "../components/ModalLoginBis";

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

const MapStack = createStackNavigator({
  Maps: MapScreen
});

MapStack.navigationOptions = {
  tabBarLabel: "Carte",
  tabBarIcon: ({ focused }) => (
    <FontAwesome
      name="map"
      size={24}
      color={focused ? activeColor : inactiveColor}
    />
  )
};

const AppStack = createStackNavigator({
  Maps: ModalLoginBis
});

AppStack.navigationOptions = {
  tabBarLabel: "Auth",
  tabBarIcon: ({ focused }) => (
    <FontAwesome
      name="lock"
      size={24}
      color={focused ? activeColor : inactiveColor}
    />
  )
};

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    FridgeStack,
    RecettesStack,
    MapStack,
    AppStack
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        position: "absolute",
        left: "10%",
        bottom: 10,
        width: "90%",
        borderRadius: 20,
        elevation: 10,
        borderTopWidth: 0
      }
    }
  }
);

export default TabNavigator;

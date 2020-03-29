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
import BarCodeScreen from "../screens/BarCodeScreen";
import ModalLoginBis from "../components/ModalLoginBis";
import InventoryScreen from "../screens/InventoryScreen";
import colors from "../styles/colors.js";
import { Dimensions } from "react-native";

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

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

// const FridgeStack = createStackNavigator(
//   {
//     Fridges: InventoryScreen,
//     Barcode: BarCodeScreen
//   },
//   {
//     mode: "modal"
//   },
// );

const FridgeStack = createStackNavigator({
  Fridges: {
    screen: InventoryScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Barcode: {
    screen: BarCodeScreen,
    navigationOptions: {
      headerShown: false
    }
  }
});

FridgeStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == "Barcode") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: "Mon Frigo",
    tabBarIcon: ({ focused }) => (
      <MaterialCommunityIcons
        name="fridge"
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    )
  };
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
  Auth: {
    screen: ModalLoginBis,
    navigationOptions: {
      header: null
    }
  }
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
        left: screenWidth * 0.1,
        bottom: screenHeight * 0.03,
        width: screenWidth * 0.8,
        borderRadius: 20,
        elevation: 10,
        borderTopWidth: 0,
        backgroundColor: colors.main_bg
      }
    }
  }
);

export default TabNavigator;

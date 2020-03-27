import {
  Appearance,
  AppearanceProvider,
  useColorScheme
} from "react-native-appearance";

function MyComponent() {
  let colorScheme = Appearance.getColorScheme();

  if (colorScheme === "dark") {
    return true;
  } else {
    return false;
  }
}

const colors = MyComponent()
  ? {
      main: "#b8bece",
      main_bg: "#000",
      main_icon: "#fff"
    }
  : {
      main: "#b8bece",
      main_bg: "#f0f3f5",
      main_icon: "#000"
    };
export default colors;

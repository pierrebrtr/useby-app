import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
  Feather
} from "@expo/vector-icons";
import colors from "../styles/colors.js";

export const NotificationIcon = props => (
  <Feather name="bell" size={26} color={colors.main_icon} />
);

export const PlayIcon = props => (
  <Svg height={38.15} width={38.15} {...props}>
    <Path
      opacity={1}
      d="M8.153 14.585c-1.73-1.703-.825-4.649 1.563-5.087l19.148-3.516c2.072-.38 3.88 1.436 3.49 3.506L28.8 28.364c-.444 2.36-3.343 3.267-5.053 1.582L8.153 14.586z"
      fill="#33CEFF"
      transform="rotate(45 19.075 19.075)"
    />
  </Svg>
);

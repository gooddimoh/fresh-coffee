import React from "react";
import { useFonts } from "expo-font";

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  View,
} from "react-native";

export default function ({ children, color, textColor, disabled }) {
  // Custom Font (FuturaBT)
  const [fontsLoaded] = useFonts({
    "FuturaBT-Medium": require("../../assets/fonts/FuturaBT-Medium.ttf"),
  });

  const BGcolorMap = {
    green: "#B7D295",
    gray: "#595959",
    darkGreen: "#98A489",
    disabled: "#C6C6C6",
  };

  const textColorMap = {
    white: "#fff",
  };

  // Button color from props (Green by default)
  const buttonBG = {
    backgroundColor: color === undefined ? BGcolorMap.green : BGcolorMap[color],
  };

  // Button color in case of a disabled button
  const buttonBGdisabled = {
    backgroundColor: BGcolorMap.disabled,
  };

  if (disabled) {
    return (
      <TouchableWithoutFeedback>
        <View style={[styles.button, buttonBGdisabled]}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return (
    <TouchableOpacity style={[styles.button, buttonBG]}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10.65,
    elevation: 8,
    marginVertical: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontFamily: "FuturaBT-Medium",
  },
});

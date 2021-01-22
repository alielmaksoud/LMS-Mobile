import React from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { theme } from "../core/theme";
import { useDimensions } from "@react-native-community/hooks";

const Background = ({ children }) => {
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: "100%",
      backgroundColor: theme.colors.surface,
    },
    container: {
      flex: 1,
      height: "100%",
      padding: 0,
      width: "100%",
      maxWidth: 340,
      alignSelf: "center",
      alignItems: "center",
      position: "absolute",
      paddingTop: "25%",
    },
  });
  return (
    <ImageBackground resizeMode="repeat" style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Background;

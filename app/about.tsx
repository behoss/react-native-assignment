import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Lamp</Text>
      <Text style={styles.description}>
        Lamp is a unique dating app that lights your way to finding meaningful
        connections.
      </Text>
      <Text style={styles.copyRight}>
        © {new Date().getFullYear()} Lamp. All rights reserved.
      </Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Adjust the padding to align text to the top
    paddingHorizontal: 20,
    justifyContent: "flex-start", // Align content to the top
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  copyRight: {
    position: "absolute",
    bottom: 10, // Position at the bottom of the view
    width: "100%",
    textAlign: "center", // Center the text
    fontSize: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "80%",
  },
  content: {
    fontSize: 16,
    textAlign: "center",
  },
});

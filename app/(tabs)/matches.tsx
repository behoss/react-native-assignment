import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, View } from "../../components/Themed";
import profiles_data from "../../data/profiles.json";
import { getImagePath } from "../../utils";
import { Profile } from ".";

export default function ChatScreen() {
  const renderItem = ({ item }: { item: Profile }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        /* Navigate to chat */
      }}
    >
      <Image source={getImagePath(item.image)} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.preview}>Hey, how are you doing?</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={profiles_data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  preview: {
    fontSize: 14,
    color: "#666",
  },
});

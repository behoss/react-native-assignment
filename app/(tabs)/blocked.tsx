import React from "react";
import { FlatList, StyleSheet, Image } from "react-native";
import { Text, View } from "../../components/Themed";
import profiles_data from "../../data/profiles.json";
import { getImagePath } from "../../utils";
import { Profile } from "../../types";

// Filter out the first two profiles to simulate blocked users
const blockedProfiles = profiles_data.slice(0, 2);

export default function BlockedUsersScreen() {
  const renderItem = ({ item }: { item: Profile }) => (
    <View style={styles.item}>
      <Image source={getImagePath(item.image)} style={styles.avatar} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.status}>Blocked</Text>
    </View>
  );

  return (
    <FlatList
      data={blockedProfiles}
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
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#cccccc",
    marginTop: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  status: {
    fontSize: 16,
    color: "red",
  },
});

import React from "react";
import { FlatList, View, TouchableOpacity, StyleSheet } from "react-native";
import { List, Avatar, Text, Icon } from "react-native-paper";
import { getImagePath } from "../../utils";
import { Profile } from "../../types";
import useStore from "../../store";
import { Link } from "expo-router";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default function Matches() {
  const { likedProfiles, getLastMessageInConvo, unmatchProfile } = useStore();

  const renderRightActions = (progress: any, dragX: any, item: Profile) => {
    return (
      <TouchableOpacity
        onPress={() => unmatchProfile(item.id)}
        style={styles.rightAction}
      >
        <Text style={styles.actionText}>Unmatch</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: Profile }) => (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, item)
      }
      overshootRight={false}
    >
      <Link href={`/chat?id=${item.id}`} asChild>
        <List.Item
          title={item.name}
          description={
            getLastMessageInConvo(item.id) || `Say hi to ${item.name}! 👋`
          }
          left={() => (
            <Avatar.Image size={50} source={getImagePath(item.image)} />
          )}
          style={{ borderBottomWidth: 1, borderBottomColor: "#cccccc" }}
        />
      </Link>
    </Swipeable>
  );

  if (likedProfiles.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Icon source="message-outline" size={100} color="gray" />
        <Text
          variant="bodyLarge"
          style={{ textAlign: "center", fontSize: 18, paddingVertical: 12 }}
        >
          Here you will have conversations with your future matches! 😊
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={likedProfiles}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  rightAction: {
    backgroundColor: "red",
    justifyContent: "center",
    flex: 1,
    alignItems: "flex-end",
  },
  actionText: {
    color: "white",
    fontWeight: "600",
    padding: 20,
  },
});

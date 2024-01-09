import React from "react";
import { FlatList, Pressable, View } from "react-native";
import { List, Avatar, Text, Icon } from "react-native-paper";
import { getImagePath } from "../../utils";
import { Profile } from "../../types";
import useStore from "../../store";
import { Link } from "expo-router";

export default function Matches() {
  const { likedProfiles, convos } = useStore();

  const renderItem = ({ item }: { item: Profile }) => (
    <Link href={`/chat?id=${item.id}`} asChild>
      <List.Item
        title={item.name}
        // Get the last message in the conversation
        description={
          convos[item.id]?.slice(-1)[0]?.content || `Say hi to ${item.name}! 👋`
        }
        left={() => (
          <Avatar.Image size={50} source={getImagePath(item.image)} />
        )}
        style={{ borderBottomWidth: 1, borderBottomColor: "#cccccc" }}
      />
    </Link>
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

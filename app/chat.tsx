import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Appbar,
  Avatar,
  Text,
  Icon,
} from "react-native-paper";
import { Message, Profile } from "../types";
import { useLocalSearchParams } from "expo-router";
import useStore from "../store";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const { likedProfiles, addToConvos, convos } = useStore();
  const [currentConvoId, setCurrentConvoId] = useState(0);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    setCurrentConvoId(parseInt(id.toString()) || 0);
    const profile = likedProfiles.find((p) => p.id === parseInt(id.toString()));
    setProfile(profile || null);
  }, [id, likedProfiles]);

  const sendMessage = () => {
    if (text) {
      const newMessage: Message = {
        id: Math.random(),
        content: text,
        createdAt: new Date(),
      };
      addToConvos(currentConvoId, newMessage);
      setText("");
    }
  };

  const sortedMessages = convos[currentConvoId]?.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        {profile?.image && (
          <Avatar.Image
            size={48}
            source={{ uri: profile.image }}
            style={{ marginRight: 12 }}
          />
        )}
        <Appbar.Content title={profile?.name} />
      </Appbar.Header>

      {!sortedMessages || sortedMessages?.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <Icon source="chat" size={100} color="gray" />
          <Text
            variant="bodyLarge"
            style={{ textAlign: "center", fontSize: 18, paddingVertical: 12 }}
          >
            Say hi to {profile?.name} to start a conversation! 👋
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedMessages}
          renderItem={({ item }) => (
            <View style={styles.messageBubble}>
              <Text variant="bodyLarge">{item.content}</Text>
              <Text style={styles.timestamp}>
                {item.createdAt.toLocaleTimeString().slice(0, -3)}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          inverted
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          placeholder="Type a message"
          value={text}
          onChangeText={setText}
          style={styles.input}
          right={
            <TextInput.Icon icon="send" onPress={sendMessage} color="teal" />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    borderRadius: 20,
  },
  messageBubble: {
    backgroundColor: "#ffe666",
    alignSelf: "flex-end",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "66%",
    minWidth: "33%",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  timestamp: {
    fontSize: 12,
    color: "grey",
    alignSelf: "flex-end",
    marginTop: 5,
  },
});

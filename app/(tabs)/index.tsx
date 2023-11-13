import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Image, Button, Pressable } from "react-native";
import { Text, View } from "../../components/Themed";
import profiles_data from "../../data/profiles.json";
import { FontAwesome } from "@expo/vector-icons";
import { getImagePath } from "../../utils";

export type Profile = {
  id: number;
  name: string;
  age: number;
  bio: string;
  image: string;
};

export default function TabOneScreen() {
  const [profiles, setProfiles] = useState<Profile[]>(profiles_data);

  return (
    <ScrollView contentContainerStyle={[styles.container, { marginTop: 10 }]}>
      {profiles.map((profile) => (
        <View key={profile.id} style={styles.profile}>
          <Image source={getImagePath(profile.image)} style={styles.image} />
          <Text style={styles.name}>
            {profile.name}, {profile.age}
          </Text>
          <Text style={styles.bio}>{profile.bio}</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => {
                /* Handle dislike */
              }}
              style={styles.circleButton}
            >
              <FontAwesome name="times" size={24} color="white" />
            </Pressable>
            <Pressable
              onPress={() => {
                /* Handle like */
              }}
              style={styles.circleButton}
            >
              <FontAwesome name="heart" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    width: "90%",
    marginBottom: 30,
    alignItems: "center",
    padding: 10,
    borderRadius: 24,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  circleButton: {
    marginHorizontal: 10,
    backgroundColor: "teal",
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});

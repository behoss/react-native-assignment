import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Text, RadioButton, Title, Button } from "react-native-paper";
import { GenderEnum } from "../../types";
import useStore from "../../store";

const PreferencesScreen = () => {
  const { profilesFilter, setProfilesFilter } = useStore();

  const handleSetGenderPreference = (value: GenderEnum) => {
    setProfilesFilter(value);
  };

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={120}
        source={{ uri: "assets/images/dc.png" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Patient Duck</Text>

      <Button
        mode="outlined"
        icon="camera"
        onPress={() => console.log("Add new photo")}
        style={styles.addButton}
      >
        Add new photo
      </Button>

      <View style={styles.preferenceSection}>
        <Title>Set gender preference:</Title>
        <RadioButton.Group
          onValueChange={(value) =>
            handleSetGenderPreference(value as GenderEnum)
          }
          value={profilesFilter}
        >
          <View style={styles.radioButtonRow}>
            <RadioButton value={GenderEnum.MALE} />
            <Text>Male</Text>
          </View>
          <View style={styles.radioButtonRow}>
            <RadioButton value={GenderEnum.FEMALE} />
            <Text>Female</Text>
          </View>
          <View style={styles.radioButtonRow}>
            <RadioButton value={GenderEnum.ALL} />
            <Text>Everyone</Text>
          </View>
        </RadioButton.Group>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  preferenceSection: {
    width: "80%",
    alignItems: "flex-start",
  },
  radioButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  addButton: {
    marginTop: 9,
    marginBottom: 33,
  },
});

export default PreferencesScreen;

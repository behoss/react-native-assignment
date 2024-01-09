import React, { useEffect, useState } from "react";
import { ScrollView, View, Image } from "react-native";
import {
  Card,
  Avatar,
  IconButton,
  Title,
  Paragraph,
  Modal,
} from "react-native-paper";
import profiles_data from "../../data/profiles.json";
import { getImagePath } from "../../utils";
import { Profile, GenderEnum } from "../../types";
import useStore from "../../store";

export default function TabOneScreen() {
  const { addProfile, profilesFilter } = useStore();

  const [profiles, setProfiles] = useState<Profile[]>(
    profiles_data.map((profile) => ({
      ...profile,
      gender: profile.gender as GenderEnum,
    })),
  );

  useEffect(() => {
    if (profilesFilter === GenderEnum.ALL) {
      setProfiles(
        profiles_data.map((profile) => ({
          ...profile,
          gender: profile.gender as GenderEnum,
        })),
      );
    } else {
      const filteredProfiles = profiles_data.filter(
        (profile) => profile.gender === profilesFilter,
      );
      setProfiles(filteredProfiles as Profile[]);
    }
  }, [profilesFilter]);

  const removeProfile = (id: number) => {
    setProfiles((prevProfiles) => prevProfiles.filter((p) => p.id !== id));
  };

  const handleLikeProfile = (profile: Profile) => {
    addProfile(profile);
    removeProfile(profile.id);
  };

  const handleDislikeProfile = (profile: Profile) => {
    removeProfile(profile.id);
  };

  const [visible, setVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const showModal = (profile: Profile) => {
    setSelectedProfile(profile);
    setVisible(true);
  };

  const hideModal = () => setVisible(false);

  return (
    <>
      <Title style={{ marginHorizontal: 16, marginVertical: 10 }}>{`Showing ${
        profilesFilter === GenderEnum.FEMALE
          ? "women"
          : profilesFilter === GenderEnum.MALE
          ? "men"
          : "everyone"
      }`}</Title>

      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            style={{ width: "90%", marginVertical: 10, elevation: 4 }}
            onPress={() => showModal(profile)}
          >
            <Card.Content
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Avatar.Image
                size={120}
                source={getImagePath(profile.image)}
                style={{ marginVertical: 10 }}
              />
              <Title style={{ fontWeight: "bold", marginVertical: 5 }}>
                {profile.name}, {profile.age}
              </Title>
              <Paragraph style={{ textAlign: "center", marginVertical: 5 }}>
                {profile.bio}
              </Paragraph>

              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <IconButton
                  icon="close"
                  mode="outlined"
                  iconColor="teal"
                  containerColor="white"
                  size={48}
                  onPress={() => handleDislikeProfile(profile)}
                />
                <IconButton
                  icon="heart"
                  mode="outlined"
                  iconColor="white"
                  containerColor="teal"
                  size={48}
                  onPress={() => handleLikeProfile(profile)}
                />
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        {selectedProfile && (
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <Image
              source={getImagePath(selectedProfile.image)}
              style={{ width: "100%", height: 300, borderRadius: 10 }}
              resizeMode="cover"
            />
            <Title
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginVertical: 12,
              }}
            >
              {selectedProfile.name}, {selectedProfile.age}
            </Title>
            <Paragraph style={{}}>{selectedProfile.longBio}</Paragraph>
          </View>
        )}
      </Modal>
    </>
  );
}

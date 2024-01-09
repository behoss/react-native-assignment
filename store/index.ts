import { create } from "zustand";
import { Convos, Profile, Message } from "../types";

interface CounterState {
  // Store liked profiles
  likedProfiles: Array<Profile>;
  addProfile: (profile: Profile) => void;
  convos: Convos;
  addToConvos: (convoId: number, message: Message) => void;
}

const useStore = create<CounterState>((set) => ({
  likedProfiles: [],
  convos: {},

  addToConvos: (convoId: number, message: Message) =>
    set((state) => ({
      convos: {
        ...state.convos,
        // Add the message to the convo where the key is the convoId
        [convoId]: [...(state.convos[convoId] || []), message],
      },
    })),

  // Add profile to likedProfiles
  addProfile: (profile: Profile) =>
    set((state) => ({
      likedProfiles: [...state.likedProfiles, profile],
    })),

  // Remove profile from likedProfiles
  removeProfile: (profile: Profile) =>
    set((state) => ({
      likedProfiles: state.likedProfiles.filter(
        (likedProfile) => likedProfile.id !== profile.id,
      ),
    })),

  // Clear likedProfiles
  clearLikedProfiles: () =>
    set((state) => ({
      likedProfiles: [],
    })),
}));

export default useStore;

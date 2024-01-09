import { create } from "zustand";
import { Convos, Profile, Message } from "../types";

interface IUseStore {
  // Store liked profiles
  likedProfiles: Array<Profile>;
  addProfile: (profile: Profile) => void;
  convos: Convos;
  addToConvos: (convoId: number, message: Message) => void;
  getLastMessageInConvo: (convoId: number) => string | undefined;
}

const useStore = create<IUseStore>((set) => ({
  likedProfiles: [],
  convos: {},

  addToConvos: (convoId: number, message: Message) =>
    set((state) => ({
      convos: {
        ...state.convos,
        [convoId]: [...(state.convos[convoId] || []), message],
      },
    })),

  getLastMessageInConvo: (convoId: number) => {
    const convo: Message[] | undefined = useStore.getState().convos[convoId];
    if (!convo) return undefined;
    return convo[convo.length - 1].content;
  },

  addProfile: (profile: Profile) =>
    set((state) => ({
      likedProfiles: [...state.likedProfiles, profile],
    })),

  removeProfile: (profile: Profile) =>
    set((state) => ({
      likedProfiles: state.likedProfiles.filter(
        (likedProfile) => likedProfile.id !== profile.id,
      ),
    })),

  clearLikedProfiles: () =>
    set((state) => ({
      likedProfiles: [],
    })),
}));

export default useStore;

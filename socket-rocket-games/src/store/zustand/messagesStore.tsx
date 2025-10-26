import { create } from "zustand";

interface messagesStoreState {
  messages: messagesType[];
  setMessage: (message: string, username: string) => void;
  setAllMessages: (messages: messagesType[]) => void;
  resetMessages: () => void;
}
interface messagesType {
  message: string;
  username: string;
}

const useMessagesStore = create<messagesStoreState>((set) => ({
  messages: [],
  setAllMessages: (messages) =>
    set(() => {
      return { messages: messages };
    }),
  setMessage: (message, username) =>
    set((state) => {
      state.messages.push({ message, username });
      return { messages: state.messages };
    }),
  resetMessages: () => {
    set({ messages: [] });
  },
}));

export default useMessagesStore;

import { create } from "zustand";

interface modalStoreState {
  visibility: boolean;
  type: string;
  message: string;
  setType: (type: string) => void;
  setVisibility: () => void;
  setMessage: (message: string) => void;
}

const useModalStore = create<modalStoreState>((set) => ({
  type: "message",
  setType: (type: string) =>
    set(() => ({
      type: type,
    })),
  //-----------------------------//
  message: "",
  setMessage: (message: string) =>
    set(() => {
      return {
        message: message,
      };
    }),
  //-----------------------------//
  visibility: false,
  setVisibility: () =>
    set((state: modalStoreState) => {
      return {
        visibility: !!state.visibility,
      };
    }),
  //-----------------------------//
}));

export default useModalStore;

import {create} from 'zustand';

type GlobalProps = {
  justLoggedIn: boolean;
  userSliceInitialized: boolean;
  setJustLoggedIn: (justLoggedIn: boolean) => void;
  setUserSliceInitialized: (initialized: boolean) => void;
  clearGlobalState: () => void;
};

const useGlobalStore = create<GlobalProps>((set) => ({
  justLoggedIn: false,
  userSliceInitialized: false,
  setJustLoggedIn: (justLoggedIn) => set({ justLoggedIn }),
  setUserSliceInitialized: (initialized) => set({ userSliceInitialized: initialized }),
  clearGlobalState: () => set({ justLoggedIn: false, userSliceInitialized: false }),
}));

export default useGlobalStore;
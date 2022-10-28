import create, { StateCreator } from 'zustand';

type THomeStore = {
  activeTag: string;
  setActiveTag: (value: string) => void;
};

const slice: StateCreator<THomeStore> = (set, get) => ({
  activeTag: '',
  setActiveTag: (value: string) => set({ activeTag: value }),

});

const useHomeStore = create<THomeStore>(slice);

export default useHomeStore;

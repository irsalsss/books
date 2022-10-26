import create, { StateCreator } from 'zustand';

type THomeStore = {
  activeTag: string;
  setActiveTag: (value: string) => void;
  dictCategory: Record<number, string>;
  setDictCategory: (value: Record<number, string>) => void;
};

const slice: StateCreator<THomeStore> = (set, get) => ({
  activeTag: '',
  setActiveTag: (value: string) => set({ activeTag: value }),
  dictCategory: {},
  setDictCategory: (value: Record<number, string>) => set({ dictCategory: value }),
});

const useHomeStore = create<THomeStore>(slice);

export default useHomeStore;

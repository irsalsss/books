import { TBook } from 'types/book';
import create, { StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
import { deepClone } from '../utils/general';

type TDictBook = Record<number | string, TBook>;

type TStore = {
  bookDetail: TDictBook;
  setBookDetail: (newObj: Partial<TBook>) => void;
  dictCategory: Record<number, string>;
  setDictCategory: (value: Record<number, string>) => void;
  bookmarks: TDictBook;
  setBookmarks: (newObj: Partial<TBook>) => void;
  deleteBookmarks: (newObj: Partial<TBook>) => void;
};

const useDetailStore = create<TStore>()(persist((set) => ({
  bookDetail: {},
  setBookDetail: (newObj: Partial<TBook>) => set((state) => {
    const currDetail = deepClone(state.bookDetail);
    const id = newObj.id;
    currDetail[id!] = newObj;
    return { bookDetail: currDetail }
  }),
  dictCategory: {},
  setDictCategory: (value: Record<number, string>) => set({ dictCategory: value }),
  bookmarks: {},
  setBookmarks: (newObj: Partial<TBook>) => set((state) => {
    const currBookmars = deepClone(state.bookmarks);
    const id = newObj.id;
    currBookmars[id!] = newObj;
    return { bookmarks: currBookmars }
  }),
  deleteBookmarks: (newObj: Partial<TBook>) => set((state) => {
    const currBookmars = deepClone(state.bookmarks);
    const id = newObj.id;
    delete currBookmars[id!];
    return { bookmarks: currBookmars }
  }),
}), {
  name: 'bookDetail',
  getStorage: () => localStorage
}));


export default useDetailStore;
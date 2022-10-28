import { TBook } from 'types/book';
import create, { StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
import { deepClone } from '../utils/general';

type Store = {
  bookDetail: Record<number | string, TBook>;
  setBookDetail: (newObj: Partial<TBook>) => void;
};

const useDetailStore = create<Store>()(persist((set) => ({
  bookDetail: {},
  setBookDetail: (newObj: Partial<TBook>) => set((state) => {
    const currDetail = deepClone(state.bookDetail);
    const id = newObj.id;
    currDetail[id!] = newObj;
    return { bookDetail: currDetail }
  }),
}), {
  name: 'bookDetail',
  getStorage: () => localStorage
}));


export default useDetailStore;
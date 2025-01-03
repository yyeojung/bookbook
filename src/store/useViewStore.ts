import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ViewYearStore {
  isView: string;
  setIsView: (value: string) => void;
}
const useViewStore = create<ViewYearStore>()(
  persist(
    (set) => ({
      isView: 'all',
      setIsView: (value) => set({ isView: value })
    }),
    { name: 'viewtype' }
  )
);
export { useViewStore };

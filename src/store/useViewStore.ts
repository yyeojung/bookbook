import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ViewYearStore {
  isView: string;
  isAscending: boolean; // 서재 정렬
  setIsView: (value: string) => void;
  setIsAscending: () => void; // 서재 정렬
}
const useViewStore = create<ViewYearStore>()(
  persist(
    (set) => ({
      isView: 'all',
      isAscending: true,
      setIsView: (value) => set({ isView: value }),
      setIsAscending: () =>
        set((state) => ({ isAscending: !state.isAscending }))
    }),
    { name: 'viewtype' }
  )
);
export { useViewStore };

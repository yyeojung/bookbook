import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Option {
  name: string;
  value: string;
}
interface SelectStore {
  selectOption: Option[];
  setSelectOption: (name: string, value: string) => void;
}

const useSelectStore = create<SelectStore>()(
  persist(
    (set) => ({
      selectOption: [],
      setSelectOption: (name, value) =>
        set((state) => {
          if (!name) return state;

          const existingIndex = state.selectOption.findIndex(
            (opt) => opt.name === name
          );

          if (existingIndex !== -1) {
            const updatedOption = [...state.selectOption];
            updatedOption[existingIndex] = { name, value };
            return { selectOption: updatedOption };
          } else {
            return { selectOption: [...state.selectOption, { name, value }] };
          }
        })
    }),
    { name: 'select' }
  )
);
export { useSelectStore };

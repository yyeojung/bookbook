import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Option {
  label: string;
  value: string;
}
interface SelectStore {
  selectOption: Option[];
  setSelectOption: (label: string, value: string) => void;
}

const useSelectStore = create<SelectStore>()(
  persist(
    (set) => ({
      selectOption: [],
      setSelectOption: (label, value) =>
        set((state) => {
          if (!label) return state;

          const existingIndex = state.selectOption.findIndex(
            (opt) => opt.label === label
          );

          if (existingIndex !== -1) {
            const updatedOption = [...state.selectOption];
            updatedOption[existingIndex] = { label, value };
            return { selectOption: updatedOption };
          } else {
            return { selectOption: [...state.selectOption, { label, value }] };
          }
        })
    }),
    { name: 'select' }
  )
);
export { useSelectStore };

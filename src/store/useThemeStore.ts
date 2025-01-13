import { create } from 'zustand';
import { themes } from '../assets/style/theme';
import { persist } from 'zustand/middleware';

type Theme = (typeof themes)[keyof typeof themes];
export type ThemeName = keyof typeof themes;

interface ThemeStore {
  isTheme: string;
  isThemeColor: Theme;
  setIsTheme: (themeName: ThemeName) => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isTheme: 'pink',
      isThemeColor: themes['pink'],
      setIsTheme: (themeName: keyof typeof themes) =>
        set({
          isThemeColor: themes[themeName],
          isTheme: themeName
        })
    }),
    { name: 'theme' }
  )
);
export { useThemeStore };

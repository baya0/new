"use client";
import { createContext, useContext } from "react";

interface ThemeContextValue {
  dark: boolean;
  setDark: (d: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  dark: false,
  setDark: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

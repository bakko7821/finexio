import { useEffect, useState } from "react";

const THEME_KEY = "theme";

const getPreferredTheme = (): "light" | "dark" => {
  const saved = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
  if (saved) return saved;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
};

const setTheme = (theme: "light" | "dark") => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
};

export const useTheme = () => {
  const [theme, setThemeState] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const initial = getPreferredTheme();
    setThemeState(initial);
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setThemeState(newTheme);
    setTheme(newTheme);
  };

  return [theme, toggleTheme] as const;
};

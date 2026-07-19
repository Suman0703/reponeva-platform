import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Initialize from localStorage, fall back to system preference
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("reponeva-theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Whenever theme changes: toggle the class on <html> and persist it
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("reponeva-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook so components can just call useTheme() instead of useContext(ThemeContext)
export function useTheme() {
  return useContext(ThemeContext);
}
// ThemeToggle.jsx
import { useState, useEffect } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  // Run once when component loads
  useEffect(() => {
    // Check if user saved a preference
    const savedTheme = localStorage.getItem("theme");

    // Check system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Use saved preference, or fall back to system preference
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    setTheme(initialTheme);

    // Apply dark class if needed
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className=" hover:bg-neutral/30 p-2 rounded-lg transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <MdOutlineDarkMode size={24} color="black"></MdOutlineDarkMode>
      ) : (
        <MdOutlineLightMode size={24} color="white"></MdOutlineLightMode>
      )}
    </button>
  );
}

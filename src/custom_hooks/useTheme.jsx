import { useLocalStorage } from "./useLocalStorage";
import { useEffect } from "react";

export function useTheme() {
    const [theme, setTheme] = useLocalStorage("theme", "light");

    useEffect(() => {
      document.body.className = theme;
    }, [theme]);

    function toggleTheme() {
      setTheme(prev =>
        prev === "light" ? "dark" : "light"
      );
    }

    return { theme, toggleTheme };
}
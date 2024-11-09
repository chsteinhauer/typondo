import { useEffect, useState } from "react";

export function DarkMode() {
  const [darkMode, setDarkMode] = useState<MediaQueryList>();

  useEffect(
    () => setDarkMode(window.matchMedia("(prefers-color-scheme: dark)")),
    [],
  );

  const toggleDarkMode = (state: boolean) => {
    document.documentElement.classList.toggle("dark-mode", state);
  };

  useEffect(() => toggleDarkMode(!!darkMode && darkMode.matches), [darkMode]);

  return <></>;
}

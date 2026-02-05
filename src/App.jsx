import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(localStorage.getItem("userId"));
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(theme === "dark" ? "light" : "dark");

  return user ? (
    <Dashboard theme={theme} toggleTheme={toggleTheme} />
  ) : (
    <Login setUser={setUser} />
  );
}

export default App;

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { apiFetch } from "../api.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  const [modules, setModules] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [cam, setCam] = useState(0);

  const clearAllData = useCallback(() => {
    localStorage.clear();
    sessionStorage.clear();

    setUser(null);
    setModules([]);
    setTasks([]);
    setDeadlines([]);
    setCam(0);
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      clearAllData();
    };

    window.addEventListener("auth:expired", handleSessionExpired);
    return () => window.removeEventListener("auth:expired", handleSessionExpired);
  }, [clearAllData]);

  useEffect(() => {
    const loadUserData = async () => {
      if (!user?.id) {
        clearAllData();
        setLoading(false);
        return;
      }

      try {
        const [modulesData, tasksData] = await Promise.all([
          apiFetch(`/modules/user/${user.id}`),
          apiFetch(`/tasks/user/${user.id}`),
        ]);
        setModules(modulesData || []);
        setTasks(tasksData || []);
      } catch (err) {
        console.error("Failed to load authenticated user data:", err);
        clearAllData();
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user?.id, clearAllData]);

  // TODO: restore JWT flow once backend issues tokens (see api.js Authorization header)
  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: credentials,
      });

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      console.log(data)
      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAllData();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        isLoggedIn: Boolean(user),
        login,
        logout,
        clearAllData,
        modules,
        setModules,
        tasks,
        setTasks,
        deadlines,
        setDeadlines,
        cam,
        setCam,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
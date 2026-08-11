import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

//   data
  const [modules, setModules] = useState(null);

//   user authentication and session management logic here

  const login = async ({username, password}) => {
    try {} catch (error) {} finally {}
  }

  const signUp = async ({firstname, surname, email, password}) => {
    try {} catch (error) {} finally {}
  }

  const forgotPassword = async ({email}) => {
    try {} catch (error) {} finally {}
  }

  const handleContinueWithoutLogin = () => {
    setUser({
        username: "Guest",
        isGuest: true
    });
  };
  
  let isLoggedIn = Boolean(user)

  return (
    <UserContext.Provider value={{ user, isLoggedIn, loading, login, signUp, forgotPassword, handleContinueWithoutLogin }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
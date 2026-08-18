import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // user object {id, name, surname, username, email, isEmailVerified, phone, active}
    // 
    // 
    // 
    // 
    // 
    // 
    // 
    // 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


//   data
  const [modules, setModules] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [cam, setCam] = useState(0);
  const [tasks, setTasks] = useState([]);

//   user authentication and session management logic here

  const login = async ({username, password}) => {
    try {} catch (error) {} finally {}
  };

  const signUp = async ({firstname, surname, email, password}) => {
    try {} catch (error) {} finally {}
  };

  const forgotPassword = async ({email}) => {
    try {} catch (error) {} finally {}
  };

  const handleContinueWithoutLogin = () => {
    setUser({
        username: "Guest",
        isGuest: true
    });
  };
  
  const isLoggedIn = Boolean(user)

//   data

  return (
    <UserContext.Provider value={{ user, isLoggedIn, loading, login, signUp, forgotPassword, handleContinueWithoutLogin, modules, setModules,deadlines,  cam, tasks }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
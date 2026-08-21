import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    // User object:
    // {
    //     id,
    //     name,
    //     surname,
    //     username,
    //     email,
    //     isEmailVerified,
    //     phone,
    //     active
    // }

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // User data
    const [modules, setModules] = useState([]);
    const [deadlines, setDeadlines] = useState([]);
    const [cam, setCam] = useState(0);
    const [tasks, setTasks] = useState([]);


    // =========================================================
    // FETCH USER MODULES
    // =========================================================

    const fetchUserModules = async (userId) => {

        // Do not fetch if there is no user ID
        if (!userId) {
            setModules([]);
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:8080/api/modules/user/${userId}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch user modules");
            }

            const data = await response.json();

            console.log("User modules:", data);

            setModules(data);

        } catch (error) {

            console.error("Error fetching user modules:", error);

            // If fetching fails, keep modules empty
            setModules([]);
        }
    };


    // =========================================================
    // LOGIN
    // =========================================================

    const login = async ({ username, password }) => {

        try {

            setLoading(true);

            // -------------------------------------------------
            // YOUR LOGIN API WILL GO HERE
            // -------------------------------------------------
            //
            // Example:
            //
            // const response = await fetch(
            //     "http://localhost:8080/users/login",
            //     {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json"
            //         },
            //         body: JSON.stringify({
            //             username,
            //             password
            //         })
            //     }
            // );
            //
            // const data = await response.json();
            // setUser(data);
            //
            // -------------------------------------------------

            console.log("Login:", username);

        } catch (error) {

            console.error("Login error:", error);

        } finally {

            setLoading(false);
        }
    };


    // =========================================================
    // SIGN UP
    // =========================================================

    const signUp = async ({
        firstname,
        surname,
        email,
        password
    }) => {

        try {

            setLoading(true);

            // -------------------------------------------------
            // YOUR REGISTER API WILL GO HERE
            // -------------------------------------------------
            //
            // Your backend currently has:
            //
            // POST /users
            //
            // We will connect this once we confirm the exact
            // CreateUserRequest fields in your backend.
            //
            // -------------------------------------------------

            console.log("Sign up:", {
                firstname,
                surname,
                email
            });

        } catch (error) {

            console.error("Sign up error:", error);

        } finally {

            setLoading(false);
        }
    };


    // =========================================================
    // FORGOT PASSWORD
    // =========================================================

    const forgotPassword = async ({ email }) => {

        try {

            console.log("Forgot password:", email);

            // Your forgot-password API will go here.

        } catch (error) {

            console.error("Forgot password error:", error);
        }
    };


    // =========================================================
    // CONTINUE WITHOUT LOGIN
    // =========================================================

    const handleContinueWithoutLogin = () => {

        setUser({
            username: "Guest",
            isGuest: true
        });

        // Guest users should not have database data
        setModules([]);
        setDeadlines([]);
        setCam(0);
        setTasks([]);
    };


    // =========================================================
    // AUTOMATICALLY FETCH USER DATA
    // =========================================================

    useEffect(() => {

        const loadUserData = async () => {

            // No user
            if (!user) {
                setModules([]);
                setDeadlines([]);
                setCam(0);
                setTasks([]);
                setLoading(false);
                return;
            }

            // Guest user
            if (user.isGuest) {
                setModules([]);
                setDeadlines([]);
                setCam(0);
                setTasks([]);
                setLoading(false);
                return;
            }

            // Real logged-in user
            if (user.id) {

                await fetchUserModules(user.id);

            }

            setLoading(false);
        };

        loadUserData();

    }, [user]);


    // =========================================================
    // LOGGED-IN STATUS
    // =========================================================

    const isLoggedIn = Boolean(user);


    // =========================================================
    // CONTEXT
    // =========================================================

    return (

        <UserContext.Provider
            value={{

                // User
                user,
                setUser,
                isLoggedIn,
                loading,

                // Authentication
                login,
                signUp,
                forgotPassword,
                handleContinueWithoutLogin,

                // Modules
                modules,
                setModules,
                fetchUserModules,

                // Other user data
                deadlines,
                setDeadlines,

                cam,
                setCam,

                tasks,
                setTasks
            }}
        >

            {children}

        </UserContext.Provider>
    );
};


// =============================================================
// CUSTOM HOOK
// =============================================================

export function useUser() {

    return useContext(UserContext);
}


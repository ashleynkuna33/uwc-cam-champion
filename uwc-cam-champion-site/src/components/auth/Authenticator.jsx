import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Authenticator() {
    const [tab, setTab] = useState("SignIn");

    const renderScreen = () => {
        if (tab === "SignIn") return <SignIn screen={setTab} />;
        if (tab === "SignUp") return <SignUp screen={setTab} />;
        if (tab === "ForgotPassword") return <ForgotPassword screen={setTab} />;
    };

    return (
        <div className='flex items-center justify-center'>
            <AnimatePresence mode="wait">
                <motion.div
                    key={tab}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    {renderScreen()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default Authenticator
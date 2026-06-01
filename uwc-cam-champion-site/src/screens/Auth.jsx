import { useState } from "react";
import { SignIn, SignUp, ForgotPassword } from "../components";
import { Background1 } from "../assets";

import CustomButton from "../components/CustomButton"
import { BiSolidChevronsDown } from "react-icons/bi";

function Auth() {

    const [activeTab, setActiveTab] = useState("login");

    return (
        <div className="min-h-screen w-full relative bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${Background1})`}}>
            {/* logo, we can remove it for the actual icon if we have one */}
            <div className="absolute top-4 left-2 z-10">
                <h1 className="text-white text-2xl font-bold tracking-wide ">UWC <span className="text-yellow-400">CAM Champion</span></h1>
            </div>

            <div className="pt-16 min-h-screen flex items-center justify-center px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl gap-6">

                {/* login view, this renders every screen under auth category */}
                <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                    <div className="mb-6 min-h-[460px] max-h-[460px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 hover:scrollbar-thumb-white/40 scrollbar-track-transparent">
                        {activeTab === "login" && <SignIn />}
                        {activeTab === "signup" && <SignUp />}
                        {activeTab === "forgot" && <ForgotPassword />}
                    </div>
                    <div className="flex border-t border-white/20 pt-2 gap-2">

                    {/* login button */}
                        <button onClick={() => setActiveTab("login")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === "login" ? "bg-black/30 text-white" : "text-white/50 hover:text-white"
                    }`}>Login</button>
                    
                    {/* sign up button */}
                        <button onClick={() => setActiveTab("signup")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === "signup" ? "bg-black/30 text-white" : "text-white/50 hover:text-white"
                    }`}>Sign Up</button>
                    
                    {/* forgot password button */}
                        <button onClick={() => setActiveTab("forgot")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === "forgot" ? "bg-black/30 text-white" : "text-white/50 hover:text-white"
                    }`}>Forgot Password</button>
                    
                    </div>
                </div>

                {/* banner, i don't know what we can add here yet or we can decide to remove it later */}
                <div className="flex items-center justify-center text-white">
                    <h1>banner session</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis vel blanditiis, vitae quaerat soluta quo impedit, ipsum officia cupiditate suscipit tempore molestiae asperiores perspiciatis eveniet possimus! Impedit excepturi nihil corporis!</p>
                </div>
                </div>
            </div>
            <div className="flex items-center justify-center pb-18">
                <CustomButton text={"Continue without signing in"} icon={BiSolidChevronsDown}/>
            </div>
        </div>
    )
};

export default Auth;
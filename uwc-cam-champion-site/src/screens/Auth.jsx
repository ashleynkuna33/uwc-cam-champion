import { useState } from "react";
import { SignIn, SignUp, ForgotPassword } from "../components";
import { Background1 } from "../assets";
import CustomButton from "../components/CustomButton";
import { BiSolidChevronsDown } from "react-icons/bi";

function Auth() {
    const [activeTab, setActiveTab] = useState("login");

    return (
        <div
            className="h-screen w-full flex flex-col bg-fixed bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: `url(${Background1})` }}
        >
            {/* Logo */}
            <div className="shrink-0 px-4 pt-4 pb-2">
                <h1 className="text-white text-2xl font-bold tracking-wide">
                    UWC <span className="text-yellow-400">CAM Champion</span>
                </h1>
            </div>

            {/* Main content — grows to fill remaining space */}
            <div className="flex-1 flex items-center justify-center px-4 min-h-0">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl gap-6 h-full max-h-[580px]">

                    {/* Auth card */}
                    <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col min-h-0">
                        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 hover:scrollbar-thumb-white/40 scrollbar-track-transparent mb-4 min-h-0">
                            {activeTab === "login" && <SignIn />}
                            {activeTab === "signup" && <SignUp />}
                            {activeTab === "forgot" && <ForgotPassword />}
                        </div>
                        <div className="shrink-0 flex border-t border-white/20 pt-3 gap-2">
                            <button
                                onClick={() => setActiveTab("login")}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                                    activeTab === "login" ? "bg-black/30 text-white" : "text-white/50 hover:text-white"
                                }`}
                            >Login</button>
                            <button
                                onClick={() => setActiveTab("signup")}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                                    activeTab === "signup" ? "bg-black/30 text-white" : "text-white/50 hover:text-white"
                                }`}
                            >Sign Up</button>
                            <button
                                onClick={() => setActiveTab("forgot")}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                                    activeTab === "forgot" ? "bg-black/30 text-white" : "text-white/50 hover:text-white"
                                }`}
                            >Forgot Password</button>
                        </div>
                    </div>

                    {/* Banner */}
                    <div className="hidden md:flex items-center justify-center text-white flex-col gap-4">
                        <h1 className="text-2xl font-bold">Banner section</h1>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vel blanditiis,
                            vitae quaerat soluta quo impedit, ipsum officia cupiditate suscipit tempore.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer button */}
            <div className="shrink-0 flex items-center justify-center py-4">
                <CustomButton text={"Continue without signing in"} icon={BiSolidChevronsDown} />
            </div>
        </div>
    );
}

export default Auth;
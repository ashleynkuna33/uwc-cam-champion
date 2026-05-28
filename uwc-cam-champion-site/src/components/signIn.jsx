import { useState } from "react";
import CustomField from "./CustomField";
import CustomButton from "./CustomButton";

import { BiRightArrowAlt } from "react-icons/bi";

const component = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {};

    return (
        <div>
            <h1 className="text-white text-2xl font-bold">Glad you're here</h1>
            <p className="text-white/60 text-sm mt-1 pb-6">Sign in to your champion account</p>

            <p className="text-white font-bold pt-2">Username/Email</p>
            <CustomField placeholder={"Enter your username or email"}/>

            <p className="text-white font-bold">Password</p>
            <CustomField type={"password"} placeholder={"Enter your password here"}/>

            <div className="pt-12">
                <CustomButton text={"Continue"} icon={BiRightArrowAlt}/>
            </div>
            

        </div>
    )
}

export default component;
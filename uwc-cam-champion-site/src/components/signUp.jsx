import CustomField from "./CustomField";
import CustomButton from "./CustomButton";
import { useState } from "react";

const component = () => {
    const [firstname, setFirstname] = useState("");
    const [surname, setSurname] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    // collect all data from usestate and send the information to the local server
    const handleSignUp = () => {};

    // this method will compare 2 password to see if there match, return true for yes and false for no
    const confirmPassword = () => {};

    return (
        <div>
            <h1 className="text-white text-2xl font-bold">Join the ranks.</h1>
            <p className="text-white/60 text-sm mt-1 pb-2">Create your cam champion account</p>

            <p className="text-white font-bold pt-2">Firstname</p>
            <CustomField placeholder={"Firstname here"}/>

            <p className="text-white font-bold">Surname</p>
            <CustomField placeholder={"Surname here"}/>

            <p className="text-white font-bold">Email</p>
            <CustomField placeholder={"Enter your email"}/>

            <p className="text-white font-bold pt-6">Password</p>
            <CustomField type={"password"} placeholder={"Create a strong password"}/>
            <p className="text-white font-bold">Confirm Password</p>
            <CustomField type={"password"} placeholder={"Re-type password"}/>

            <CustomButton text={"Create Account"}/>

        </div>
    )
}

export default component;
import { useState } from "react";
import CustomField from "./CustomField";
import CustomButton from "./CustomButton";

const component = () => {

    const handleSendOTP = () => {};
    const handleConfirmOTP = () => {};

    const [mail, setMail] = useState("");
    const [otp, setOtp] = useState(0);

    return (
        <div>
            <h1 className="text-white text-2xl font-bold">No worries, we got you.</h1>
            <p className="text-white/60 text-sm mt-1">Enter your email to reset your password</p>

            <p className="text-white font-bold pt-8">Email</p>
            <CustomField placeholder={"Enter your email"}/>
            <div className="flex items-center justify-center">
                <CustomButton text={"Send OTP code"}/>
            </div>
            

            <p className="text-white font-bold pt-4">OTP</p>
            <CustomField placeholder={"OTP code i.e 000 000"}/>
            <CustomButton text={"Confirm OTP"}/>
        </div>
    )


}

export default component;
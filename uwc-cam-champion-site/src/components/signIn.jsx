import { useState } from "react";
import CustomField from "./CustomField";
import CustomButton from "./CustomButton";
import { BiRightArrowAlt } from "react-icons/bi";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log(`username: ${username}\nPassword: ${password}`);
  };

  return (
    <div>
      <h1 className="text-white text-2xl font-bold">Glad you're here</h1>
      <p className="text-white/60 text-sm mt-1 pb-6">
        Sign in to your champion account
      </p>

      {/* Username / Email Field */}
      <p className="text-white font-bold pt-2">Username/Email</p>
      <CustomField
        placeholder="Enter your username or email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Password Field */}
      <p className="text-white font-bold">Password</p>
      <CustomField
        type="password"
        password
        placeholder="Enter your password here"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Submit Button */}
      <div className="pt-12">
        <CustomButton
          text="Continue"
          icon={BiRightArrowAlt}
          onClick={handleSignIn}
        />
      </div>
    </div>
  );
};

export default SignInForm;
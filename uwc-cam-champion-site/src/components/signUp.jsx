import { useState } from "react";
import CustomField from "./CustomField";
import CustomButton from "./CustomButton";

const SignUpForm = () => {
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswordState, setConfirmPasswordState] = useState("");
  const [error, setError] = useState("");

  // Compares the two passwords and returns true if they match, false if they don't
  const confirmPassword = () => {
    return password !== "" && password === confirmPasswordState;
  };

  // Collects data from state and sends it to your local server
  const handleSignUp = async () => {
    setError("");

    if (!confirmPassword()) {
      setError("Passwords do not match!");
      return;
    }

    const userData = {
      firstname,
      surname,
      email: mail,
      password,
    };
    console.log(userData)

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      const data = await response.json();
      console.log("Account created successfully:", data);
    } catch (err) {
      console.error("Sign-up error:", err);
      setError(err.message || "An error occurred during sign up.");
    }
  };

  return (
    <div>
      <h1 className="text-white text-2xl font-bold">Join the ranks.</h1>
      <p className="text-white/60 text-sm mt-1 pb-2">
        Create your cam champion account
      </p>

      {error && <p className="text-red-400 text-sm font-semibold pt-2">{error}</p>}

      {/* First Name */}
      <p className="text-white font-bold pt-2">Firstname</p>
      <CustomField
        placeholder="Firstname here"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />

      {/* Surname */}
      <p className="text-white font-bold">Surname</p>
      <CustomField
        placeholder="Surname here"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />

      {/* Email */}
      <p className="text-white font-bold">Email</p>
      <CustomField
        type="email"
        placeholder="Enter your email"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />

      {/* Password */}
      <p className="text-white font-bold pt-6">Password</p>
      <CustomField
        type="password"
        password
        placeholder="Create a strong password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Confirm Password */}
      <p className="text-white font-bold">Confirm Password</p>
      <CustomField
        type="password"
        password
        placeholder="Re-type password"
        value={confirmPasswordState}
        onChange={(e) => setConfirmPasswordState(e.target.value)}
      />

      {/* Submit Button */}
      <div className="pt-6">
        <CustomButton text="Create Account" onClick={handleSignUp} />
      </div>
    </div>
  );
};

export default SignUpForm;
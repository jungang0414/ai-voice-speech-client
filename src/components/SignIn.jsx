import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const signInWithEmail = async () => {
    try {
      setErrorMessage("");

      // Check if email or password is empty
      if (email.trim() === "" || password.trim() === "") {
        setErrorMessage("Email and password are required.");
        return;
      }

      // Sign in with email and password using Firebase auth
      await signInWithEmailAndPassword(auth, email, password);

      // Clear email and password fields after successful sign in
      setEmail("");
      setPassword("");
    } catch (error) {
      // Handle specific error codes
      if (error.code === "auth/invalid-credential") {
        setErrorMessage("Incorrect password. Please try again.");
      } else {
        setErrorMessage("Failed to sign in.");
      }
    }
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      className="form"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Sign In</h1>
      <div className="error">{errorMessage}</div>
      <br />
      <div>預設帳號: admin@gmail.com</div>
      <div>預設密碼: 123456</div>
      <input
        style={{ marginBottom: 10 }}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={{ marginBottom: 10 }}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={{ marginRight: 10 }} onClick={signInWithEmail}>
        Sign In
      </button>
    </div>
  );
}

export default SignIn;

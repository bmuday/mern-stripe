import React, { useState } from "react";
import { useLogin } from "../hooks/UseLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, message } = useLogin();

  const clearFields = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password);
    clearFields();
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      <label>Email address :</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter your email"
      />
      <label>Password :</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Enter your password"
      />
      <button type="submit" disabled={isLoading}>
        OK
      </button>
      {error && <div className="error">{error}</div>}
      {message && <div className="message">{message}</div>}
    </form>
  );
};

export default Login;

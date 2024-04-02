import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/user";
import { getPetsByUserId } from "../../api/pet";
import utilities from "../../utilitiesClient";

function Login() {
  const { setIsLogin, setUser, setPets, setUserObj } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await login(email, password);
      console.log('userData: ', data);
      if (!data) {
        setError("Invalid email or password");
        return;
      }

      const pets = await getPetsByUserId(data.userId);
      setUserObj(utilities.convertArrayToObject(data));
      setUser(data);
      setPets(pets);
      setIsLogin(true);
      navigate("/");
    } catch (error) {
      console.log("Login error:", error);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="login">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../actions/authActions";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoginMode) {
      dispatch(login(username, password, navigate));
    } else {
      dispatch(register(username, password, navigate));
    }
  };

  return (
    <div className="main">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="btn-container">
          <button className="btn" onClick={() => setIsLoginMode(true)}>
            Login
          </button>
          <button className="btn" onClick={() => setIsLoginMode(false)}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

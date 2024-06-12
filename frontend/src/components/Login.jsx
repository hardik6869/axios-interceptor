import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../actions/authActions";
import { useNavigate } from "react-router-dom";

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <button onClick={() => setIsLoginMode(true)}>Login</button>
          <button onClick={() => setIsLoginMode(false)}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

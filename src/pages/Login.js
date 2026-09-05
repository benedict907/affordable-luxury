import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { login } from "../redux/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoggedIn, error } = useAppSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    dispatch(login({ email: username, password }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="app-page flex items-center justify-center">
      <div className="card w-full max-w-sm p-8">
        <div className="mb-7 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Affordable Luxury
          </p>
          <h2 className="page-title mt-2 text-2xl">Welcome back</h2>
          <p className="page-subtitle mt-1">Sign in to manage your vouchers</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="field-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-input"
              required
            />
          </div>
          <div className="mb-2">
            <label className="field-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-input"
              required
            />
          </div>
          {error && <div className="field-error mb-3 mt-1">{error}</div>}
          <button type="submit" className="btn btn-primary mt-4 w-full">
            Sign In
          </button>
        </form>
        <button
          type="button"
          onClick={() => navigate("/change-password")}
          className="link mt-5 ml-auto block text-end text-sm"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Login;

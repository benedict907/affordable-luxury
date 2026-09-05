import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { login } from "../redux/authSlice";

const ChangePassword = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setPassword] = useState("");
  const [mismatchError, setMismatchError] = useState("");
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMismatchError("Passwords do not match.");
      return;
    }
    setMismatchError("");
    dispatch(login({ newPassword }));
  };

  return (
    <div className="app-page flex items-center justify-center">
      <div className="card w-full max-w-sm p-8">
        <div className="mb-7 text-center">
          <h2 className="page-title text-2xl">Change password</h2>
          <p className="page-subtitle mt-1">Choose a new password for your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="field-label" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              className="text-input"
              required
            />
          </div>
          <div className="mb-2">
            <label className="field-label" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-input"
              required
            />
          </div>
          {(mismatchError || error) && (
            <div className="field-error mb-3 mt-1">
              {mismatchError || error}
            </div>
          )}
          <button type="submit" className="btn btn-primary mt-4 w-full">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

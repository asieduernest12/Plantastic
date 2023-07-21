// import React, {useState} from "react";
// import { useHistory } from "react-router-dom";
import { Stack } from "@mui/material";
import { useState } from "react";

// the email and password should be required
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailHasErr, setEmailHasErr] = useState(false);
  const [passwordHasErr, setPasswordHasErr] = useState(false);
  //   const navigate = useNavigation();
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleEmailBlur() {
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!regexEmail.test(email)) {
      setEmailHasErr(true);
    } else {
      setEmailHasErr(false);
    }
  }
  function handlePasswordBlur() {
    const regexPassword = /^[a-zA-Z0-9]+$/;
    if (!regexPassword.test(password)) {
      setPasswordHasErr(true);
    } else {
      setPasswordHasErr(false);
    }
  }
  function handleLogin(e) {
    e.preventDefault();
    if (!emailHasErr && !passwordHasErr) {
      // redirect to dashboard
      //   navigate("/dashboard");
    }
  }
  return (
    <Stack
      direction="row"
      sx={{ height: "100%", width: "100%", placeContent: "center" }}
    >
      <form
        className="debug-outline"
        onSubmit={handleLogin}
        style={{ flex: "none", width: "clamp(300px,80%,600px" }}
      >
        <h1>I am the Login page.</h1>
        <div>
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />
            {emailHasErr && (
              <p className="text-danger">Please enter a valid email.</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
            />
            {passwordHasErr && (
              <p className="text-danger">Please enter a valid password.</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </Stack>
  );
}

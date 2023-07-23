import React from "react";
import useAuthService from "../utils/authHook";

export function NotLoggedIn({ children }) {
  const auth = useAuthService();

  return auth.isLoggedIn() ? <></> : children;
}

export function LoggedIn({ children }) {
  const auth = useAuthService();

  return auth.isLoggedIn() ? children : <></>;
}

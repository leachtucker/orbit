import React, { useState, createContext } from 'react';
import { useHistory } from "react-router";
const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const initialAuthState = () => ({
    token: localStorage.getItem("token"),
    expiresAt: localStorage.getItem("expiresAt"),
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {}
  });

  const [authState, setAuthState] = useState(initialAuthState);

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("expiresAt", expiresAt);

    setAuthState({
      token,
      userInfo,
      expiresAt
    });
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("expiresAt");

    setAuthState({
      token: null,
      expiresAt: null,
      userInfo: {}
    });

    history.push("/login");
  }

  const isAutheticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }

    return new Date().getTime() / 1000 < authState.expiresAt;
  }

  const isAdmin = () => {
    return authState.userInfo.role = "admin";
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        isAutheticated,
        logout,
        isAdmin
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };

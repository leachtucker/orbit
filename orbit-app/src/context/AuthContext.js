import React, { useState, createContext } from 'react';
const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const initialAuthState = () => ({
    token: localStorage.getItem("token"),
    expiresAt: localStorage.getItem("expiresAt"),
    userInfo: JSON.parse(localStorage.getItem("userInfo"))
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

  const isAutheticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }

    return new Date().getTime() / 1000 < authState.expiresAt;
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        isAutheticated
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };

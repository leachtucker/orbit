import React, { useState, createContext } from 'react';
const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const initialAuthState = () => {
    const state = {
      token: localStorage.getItem("token"),
      expiresAt: localStorage.getItem("expiresAt"),
      userInfo: JSON.parse(localStorage.getItem("userInfo") || {})
    };

    return state;
  }

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

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo)
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };

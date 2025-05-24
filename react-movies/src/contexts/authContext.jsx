import { useState, createContext } from "react";

export const AuthContext = createContext(null); //eslint-disable-line

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
  const [authToken, setAuthToken] = useState(existingToken); //eslint-disable-line
  const [userName, setUserName] = useState("");

  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };

  const authenticate = async (username, password) => {
    const res = await fetch("http://localhost:8080/api/users?action=authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      setToken(data.token);
      setIsAuthenticated(true);
      setUserName(username);
    } else {
      alert(data.msg || "Login failed");
    }
  };

  const register = async (username, password) => {
    const res = await fetch("http://localhost:8080/api/users?action=register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    return data.success;
  };

  const signout = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
        authToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

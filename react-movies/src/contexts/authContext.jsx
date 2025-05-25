import { useState, createContext } from "react";
import { login, signup } from "../api/movies-api";

export const AuthContext = createContext(null); //eslint-disable-line

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken); //eslint-disable-line
  const [userName, setUserName] = useState("");

 
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

const authenticate = async (username, password) => {
  const result = await login(username, password);
  if (result.token) {
    localStorage.setItem("token", result.token);
    setToken(result.token);
    setIsAuthenticated(true);
    setUserName(username);
    return true; 
  } else {
    return false; 
  }
};


  const register = async (username, password) => {
    const result = await signup(username, password);
    return result.success;
  };

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName
      }}
    >
      {props.children} {/* eslint-disable-line */}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

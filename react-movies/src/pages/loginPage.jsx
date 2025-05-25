import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";

const LoginPage = () => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/homePage";

const login = async () => {
  const success = await context.authenticate(userName, password);
  if (success) {
    setRedirect(true);
  } else {
    alert("Incorrect username or password!");
  }
};

  if (redirect) {
    return <Navigate to={from} />;
  }

  return (
    <>
      <h2>Login page</h2>
      <p>You must log in to view the protected pages </p>
      <input id="username" placeholder="user name" onChange={e => setUserName(e.target.value)} /><br />
      <input id="password" type="password" placeholder="password" onChange={e => setPassword(e.target.value)} /><br /><br />
      <button onClick={login}>Log in</button>
      <p>Not Registered? <Link to="/signup">Sign Up!</Link></p>
    </>
  );
};

export default LoginPage;

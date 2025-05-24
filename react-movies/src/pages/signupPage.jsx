import { Link } from "react-router-dom";


const SignUpPage = () => {

  return (
    <>
      <h2>SignUp page</h2>
      <p>You must register a username and password to log in </p>
      <input placeholder="user name" ></input><br />
      <input type="password" placeholder="password" ></input><br />
      <input type="password" placeholder="password again" ></input><br />
      {/* Login web form  */}
      <br/>
      <button>Register</button>
      <p>
        Already Registered? <Link to="/login">Log in</Link>
      </p>
      <p><Link to="/">Start Page</Link></p>
    </>
  );
};

export default SignUpPage;

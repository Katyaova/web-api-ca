import { Link } from "react-router";

const StartPage = () => {
  
    return(
        <>
            <h2>
                Welcome to your Movies Page, please Login or Signup!
            </h2>
            <p>
                <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to create tasks!
            </p>
        </>
    );
  };

export default StartPage;

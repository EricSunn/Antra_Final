import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const loginDate = { email, password };

      await axios.post("http://localhost:5000/auth/login", loginDate);
      getLoggedIn();
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Log in to your account</h1>
      <form onSubmit={handlesubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="Log In">Register</button>
      </form>
    </div>
  );
}

export default Login;

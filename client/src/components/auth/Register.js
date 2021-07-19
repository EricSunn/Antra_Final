import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Store from "../Redux/Store";

function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordVerify, setPasswordVerify] = React.useState("");
  const history = useHistory();

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const registerDate = {
        email,
        password,
        passwordVerify,
        permission: "user",
      };

      await axios.post("http://localhost:5000/auth", registerDate);
      const loggedInRes = await axios
        .get("http://localhost:5000/auth/loggedIn")
        .then((data) => data.data);
      Store.dispatch({ type: "log", payload: loggedInRes });
      Store.dispatch({ type: "title", payload: "Note System" });
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="formContainer">
      <h1>Register new account</h1>
      <form className="loginForm" onSubmit={handlesubmit}>
        <div>
          <h5 className=" col-sm-3 col-md-3">Email:</h5>
          <input
            className=" col-sm-2 col-md-2"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <h5 className=" col-sm-3 col-md-3">Password:</h5>
          <input
            className=" col-sm-2 col-md-2"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <h5 className=" col-sm-3 col-md-3">Password Verify:</h5>
          <input
            className=" col-sm-2 col-md-2"
            type="password"
            placeholder="Verified your password"
            onChange={(e) => setPasswordVerify(e.target.value)}
            value={passwordVerify}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;

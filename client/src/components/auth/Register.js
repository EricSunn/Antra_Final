import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordVerify, setPasswordVerify] = React.useState("");
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const registerDate = { email, password, passwordVerify };

      const log = await axios.post("http://localhost:5000/auth", registerDate);
      getLoggedIn();
      //   const log = fetch("http://localhost:5000/auth", {
      //     method: "POST",
      //     body: registerDate,
      //     headers: {
      //       "Content-type": "application/json; charset=UTF-8",
      //     },
      //   }).then((res) => res.json());
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Register a new account</h1>
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
        <input
          type="password"
          placeholder="Verified your password"
          onChange={(e) => setPasswordVerify(e.target.value)}
          value={passwordVerify}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

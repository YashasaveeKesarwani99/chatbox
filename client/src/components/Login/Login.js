import React, { useState } from "react";
import { loginUser } from "../../api/user";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const changeHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setemail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let user = await loginUser(email, password);
    console.log(user);
    if (user.data.message) {
      alert(user.data.message);
    } else {
      localStorage.setItem("token", user.data.token);
      navigate("/home");
    }
  };

  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <h1>LogIn</h1>
        <div className="login-form">
          <div>
        <input
          value={email}
          type="text"
          name="email"
          onChange={changeHandler}
          placeholder="Email"
        />
        </div>
        <div>
        <input
          value={password}
          type="password"
          className="loginPassword"
          name="password"
          onChange={changeHandler}
          placeholder="Password"
        />
        </div>
        <div>
        <input type="submit" name="submit" />
        </div>
        <div>
        <Link to="/signup" className="text">
          Create new one?
        </Link>
        </div>
        </div>
      </form>
    </div>
  );
}

export default Login;

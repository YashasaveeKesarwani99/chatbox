import React, { useState } from "react";
import { signupUser } from "../../api/user";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  let history = useNavigate();

  const changeHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setname(e.target.value);
        break;
      case "email":
        setemail(e.target.value);
        break;
      case "password":
        setpassword(e.target.value);
        break;
      case "confirmPassword":
        setconfirmPassword(e.target.value);
        break;
      default:
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords does not match");
      setconfirmPassword("");
      setpassword("");
    } else {
      let user = await signupUser(name, email, password);
      console.log(user);
      if (user.data.message) {
        alert(user.data.message);
      } else {
        history("/");
      }
    }
  };

  return (
    <div className="signup">
      <form onSubmit={submitHandler}>
        <h1>SignUp</h1>
        <div className="signup-form">
          <div>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          name="name"
          onChange={changeHandler}
        />
        </div>

        <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          name="email"
          onChange={changeHandler}
        />
        </div>
        <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={changeHandler}
        />
        </div>
        <div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={changeHandler}
        />
        </div>
        <div>
        <input type="submit" />
        </div>
        <div>
        <Link to="/" className="text">
          Existing account?
        </Link>
        </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;

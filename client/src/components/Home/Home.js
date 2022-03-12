import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./Home.css";

function Home({ socket, logOut }) {
  const [username, setusername] = useState("");
  const [room, setroom] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    let target = e.target;
    switch (target.name) {
      case "username":
        setusername(target.value);
        break;
      case "room":
        setroom(target.value);
        break;
      default:
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(socket);
    socket.open();
    socket.emit("check", { username, room }, (error, message) => {
      if (error) {
        console.log("error");
        alert(error);
      } else {
        console.log("hello");
        navigate(`/chat/${username}/${room}`);
      }
    });
    // socket.emit("join", { username, room }, (error, message) => {
    //   if (error) {
    //     alert(error);
    //   } else {
    //     navigate(`/chat/${username}/${room}`);
    //   }
    // });
  };
  const token = localStorage.getItem("token");
  return (
    <>
      {token ? (
        <div className="joinRoom">
          <div onClick={logOut} className="logout" style={{backgroundColor:'black'}}>
            Logout
          </div>
          <form onSubmit={submitHandler}>
            <h1>Join Chat</h1>
            <div className="joinroom-form">
            <input
              type="username"
              name="username"
              value={username}
              placeholder="username"
              onChange={handleChange}
            />
            <input
              type="text"
              name="room"
              value={room}
              placeholder="roomname"
              onChange={handleChange}
            />
            <input type="submit" className="signupSubmit" />
            </div>
          </form>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default Home;

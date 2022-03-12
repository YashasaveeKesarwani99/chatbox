import React, { useState, useEffect, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import "./Chat.css";

function Chat({ socket, logOut }) {
  const [message, setmessage] = useState("");
  const { username, roomname } = useParams();
  const [roomUsers, setroomUsers] = useState([]);

  useEffect(() => {
    if (socket != null) {
      socket.emit("join", { username, roomname });
      socket.on("roomUsers", (users) => {
        console.log(users);
        const temp = users.filter((user) => user.roomname === roomname);
        console.log(temp);
        setroomUsers(temp);
      });
      socket.on("userJoined", ({ username }) => {
        console.log(username);
        let element = document.createElement("li");
        element.classList.add("Center");
        element.innerHTML = `${username} has joined`;
        document.getElementById("chatList").appendChild(element);
      });
      socket.on("userLeft", ({ username }) => {
        console.log(username);
        let element = document.createElement("li");
        element.classList.add("Center");
        element.innerHTML = `${username} has left`;
        document.getElementById("chatList").appendChild(element);
      });
      socket.on("message", ({ message, username }) => {
        let element = document.createElement("li");
        element.innerHTML = ` ${message}`;
        element.classList.add("Left");
        document.getElementById("chatList").appendChild(element);
      });
      return () => {
        socket.close();
      };
    }
  }, [socket]);

  const handleChange = (e) => {
    let target = e.target;
    setmessage(target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let element = document.createElement("li");
    element.classList.add("Right");
    element.innerHTML = ` ${message}`;
    document.getElementById("chatList").appendChild(element);
    socket.emit("newMessage", { message, username, roomname });
    setmessage("");
  };
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem("token");
  return (
    <>
      {token ? (
        <div className="chatContainer">
          <div onClick={logOut} className="logout" style={{backgroundColor:'black'}}>
            Logout
          </div>
          <div className="Users">
            <div style={{fontSize:'28px', fontWeight:'600'}}>Users List</div>
            <ul className="list">
              {roomUsers.map((user) => (
                <li style={{fontSize:'24px', textAlign:'left'}}>{`${user.username}`}</li>
              ))}
            </ul>
          </div>
          <div className="chat">
            <ul id="chatList">
              <li className="Center" style={{fontSize:'28px',fontWeight:"600"}}>Welcome !</li>
            </ul>
            <div ref={messagesEndRef} />
            <form onSubmit={submitHandler}>
              <input
                style={{width:'35vw',height:'30px',padding:"5px"}}
                type="text"
                name="message"
                value={message}
                onChange={handleChange}
              />
              <input type="submit" value="send" style={{width:"5vw",height:'5vh'}}/>
            </form>
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default Chat;

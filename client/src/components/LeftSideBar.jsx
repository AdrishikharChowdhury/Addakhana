import React, { useState, useContext,useEffect } from "react";
import { Menu, LogOut, Ellipsis, EllipsisVertical, Search } from "lucide-react";
import defaultPic from "../assets/default-avatar.webp";
import ChatPanel from "./ChatPanel";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const LeftSideBar = ({ isCollapsed, navBox, panel, setinfo }) => {
  
  const {
    selectedUser,
    setselectedUser,
    getUsers,
    users,
    unseenMessages,
    setunseenMessages,
  } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [dots, setdots] = useState(true);
  const [three, setthree] = useState(true);
  const [input, setinput] = useState("");
  const navigate = useNavigate();
  const filteredUsers = input
    ? users.filter((user) =>
        user.name.toLowerCase().includes(input.toLowerCase()),
      )
    : users;

  const isDots = () => {
    setdots(!dots);
  };

  const isThree = () => {
    setthree(!three);
  };

  useEffect(()=>{getUsers()},[onlineUsers])

  return (
    <div
      className={`${isCollapsed ? "w-30" : "w-120"} flex h-full bg-zinc-900 text-white flex-col justify-between border-r-2 border-purple-900 shrink-0`}
    >
      <div
        className={`w-full flex items-center my-6 justify-between pl-6 pr-4`}
      >
        <div className="flex gap-4 items-center w-full">
          <img
            src={logo}
            className={`${isCollapsed ? "ml-1.5" : ""} size-15 rounded-xl object-cover`}
            alt=""
          />
          <p
            className={`${isCollapsed ? "hidden" : "show"} text-2xl font-semibold`}
          >
            Addakhana
          </p>
        </div>
        <button
          onClick={() => {
            isDots();
          }}
          className={`${isCollapsed ? "hidden" : "show"} hover:bg-zinc-800 h-14`}
        >
          <EllipsisVertical />
        </button>
        <div className="relative">
          <ul
            className={`absolute ${dots ? "hidden" : ""} z-15 bg-zinc-800 p-4 w-30 flex flex-col gap-2`}
          >
            <li>
              <Link to="/profile">Edit Profile</Link>
            </li>
            <li>
              <button onClick={() => logout()}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full flex h-fit items-center p-4">
        <div
          className={`bg-zinc-700 ${isCollapsed ? "rounded-2xl ml-2.5" : "rounded-l-2xl"} size-16 justify-center items-center flex`}
        >
          <Search />
        </div>
        <input
          type="text"
          name=""
          id=""
          placeholder={`Search`}
          className={`${isCollapsed ? "hidden" : "show"} h-16 pl-4 text-xl w-5/6 bg-zinc-700 rounded-r-2xl`}
          onChange={(e) => setinput(e.target.value)}
        />
      </div>
      <ul className="flex flex-col overflow-scroll h-200">
        {filteredUsers.map((user, idx) => (
          <li key={idx}>
            <ChatPanel
              key={idx}
              isCollapsed={isCollapsed}
              user={user}
            />
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          isThree();
        }}
        className={`w-max h-14 mb-6 ml-6 flex gap-4 items-center hover:bg-zinc-800 ${isCollapsed ? "px-4 show ml-8" : "px-4 hidden"}`}
      >
        <Ellipsis color="#ffffff" />
      </button>
      <div className="relative -top-10 left-20">
        <ul
          className={`absolute ${three ? "hidden" : ""} z-15 bg-zinc-800 p-4 w-30 flex flex-col gap-2`}
        >
          <li>
            <Link to="/profile">Edit Profile</Link>
          </li>
          <li>
            <button onClick={() => logout()}>Logout</button>
          </li>
        </ul>
      </div>
      <button
        className={`w-8/9 h-14 mb-6 ml-6 flex gap-4 items-center hover:bg-zinc-800 ${isCollapsed ? "px-4 w-max justify-center ml-8" : "px-4"}`}
        onClick={() => {
          navBox();
          setthree(true);
        }}
      >
        <Menu />
        <p className={`${isCollapsed ? "hidden" : "show"} text-xl`}>Menu</p>
      </button>
      <button
        onClick={() => logout()}
        className={`w-8/9 h-14 mb-6 ml-6 flex gap-4 items-center hover:bg-zinc-800 ${isCollapsed ? "px-4 w-max justify-center ml-8" : "px-4"}`}
      >
        <LogOut />
        <p className={`${isCollapsed ? "hidden" : "show"} text-xl`}>Logout</p>
      </button>
    </div>
  );
};

export default LeftSideBar;

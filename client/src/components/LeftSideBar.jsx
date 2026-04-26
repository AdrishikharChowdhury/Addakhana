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
      className={`${isCollapsed ? "w-16 md:w-20" : "w-64 md:w-80"} flex h-full bg-zinc-900 text-white flex-col justify-between border-r-2 border-purple-900 shrink-0 transition-all duration-300`}
    >
      <div
        className={`w-full flex items-center my-4 md:my-6 justify-between ${isCollapsed ? "px-2" : "px-4"}`}
      >
        <div className="flex gap-2 md:gap-4 items-center w-full">
          <img
            src={logo}
            className={`${isCollapsed ? "w-10 h-10" : "w-14 h-14"} rounded-xl object-cover`}
            alt=""
          />
          <p
            className={`${isCollapsed ? "hidden" : "show"} text-lg md:text-2xl font-semibold`}
          >
            Addakhana
          </p>
        </div>
        <button
          onClick={() => {
            isDots();
          }}
          className={`${isCollapsed ? "hidden" : "show"} hover:bg-zinc-800 h-10 md:h-14`}
        >
          <EllipsisVertical />
        </button>
        <div className="relative">
          <ul
            className={`absolute ${dots ? "hidden" : ""} z-50 bg-zinc-800 p-4 w-48 flex flex-col gap-2 -right-2 top-10`}
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
      <div className="w-full flex h-fit items-center p-2 md:p-4">
        <div
          className={`bg-zinc-700 ${isCollapsed ? "rounded-xl ml-1" : "rounded-l-xl"} size-10 md:size-14 justify-center items-center flex`}
        >
          <Search className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <input
          type="text"
          name=""
          id=""
          placeholder={`Search`}
          className={`${isCollapsed ? "hidden" : "show"} h-10 md:h-14 pl-2 md:pl-4 text-base md:text-xl w-3/4 bg-zinc-700 rounded-r-xl`}
          onChange={(e) => setinput(e.target.value)}
        />
      </div>
      <ul className="flex flex-col overflow-y-auto flex-1">
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
        className={`w-max h-10 md:h-14 mb-4 md:mb-6 flex gap-2 md:gap-4 items-center hover:bg-zinc-800 ${isCollapsed ? "px-2 show ml-2" : "px-4 hidden"}`}
      >
        <Ellipsis color="#ffffff" />
      </button>
      <div className="relative -top-8 left-12">
        <ul
          className={`absolute ${three ? "hidden" : ""} z-50 bg-zinc-800 p-4 w-48 flex flex-col gap-2`}
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
        className={`w-8/9 h-10 md:h-14 mb-4 md:mb-6 flex gap-2 md:gap-4 items-center hover:bg-zinc-800 ${isCollapsed ? "px-2 w-12 justify-center ml-2" : "px-4"}`}
        onClick={() => {
          navBox();
          setthree(true);
        }}
      >
        <Menu />
        <p className={`${isCollapsed ? "hidden" : "show"} text-base md:text-xl`}>Menu</p>
      </button>
      <button
        onClick={() => logout()}
        className={`w-8/9 h-10 md:h-14 mb-4 md:mb-6 flex gap-2 md:gap-4 items-center hover:bg-zinc-800 ${isCollapsed ? "px-2 w-12 justify-center ml-2" : "px-4"}`}
      >
        <LogOut />
        <p className={`${isCollapsed ? "hidden" : "show"} text-base md:text-xl`}>Logout</p>
      </button>
    </div>
  );
};

export default LeftSideBar;

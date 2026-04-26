import React, { useContext } from "react";
import defaultPic from "../assets/default-avatar.webp";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const ChatPanel = ({ isCollapsed, user }) => {
  const { unseenMessages, getUsers, users, setselectedUser,setunseenMessages } =
    useContext(ChatContext);
  const { onlineUsers } = useContext(AuthContext);
  return (
    <button
      onClick={() => {
        setselectedUser(user);
        setunseenMessages((p)=>({...p,[user._id]:0}))
      }}
      className="w-full"
    >
      <div
        className={`${isCollapsed ? "justify-center px-1" : "pl-4 md:pl-6"} text-base md:text-xl shrink-0 hover:bg-zinc-800 w-full h-16 md:h-20 gap-2 md:gap-4 flex items-center`}
      >
        <img
          src={`${user.image}`}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 object-cover"
          alt=""
        />
        <div className={`${isCollapsed ? "hidden" : "show"} text-base md:text-xl flex-1 min-w-0`}>
          <div className="flex items-center gap-2 md:gap-6 h-auto">
            <p className="truncate">{user.name}</p>
            {onlineUsers?.includes(user._id) ? (
              <div className="text-xs md:text-sm flex h-full items-center gap-1">
                <img
                  className="w-2 h-2 md:w-3 md:h-3 -ml-1 md:-ml-2"
                  src="https://img.icons8.com/emoji/48/green-circle-emoji.png"
                  alt="online"
                />
                <p className="text-green-600 hidden md:block">Online</p>
              </div>
            ) : (
              <div className="text-xs md:text-sm flex h-full items-center gap-1">
                <img
                  className="w-2 h-2 md:w-3 md:h-3 -ml-1 md:-ml-2"
                  src="https://img.icons8.com/ios-glyphs/30/FA5252/full-stop--v1.png"
                  alt="offline"
                />
                <p className="text-red-600 hidden md:block">Offline</p>
              </div>
            )}
          </div>
          <p className="font-extralight text-left text-xs md:text-sm text-zinc-400 truncate">
            {user.bio}
          </p>
        </div>
        {unseenMessages[user._id] > 0 && (
          <div
            className={`${isCollapsed ? "hidden" : "show"} bg-purple-700 w-5 h-5 md:w-6 md:h-8 rounded-full text-white text-xs md:text-sm ml-auto flex justify-center items-center font-bold`}
          >
            {unseenMessages[user._id]}
          </div>
        )}
      </div>
    </button>
  );
};

export default ChatPanel;

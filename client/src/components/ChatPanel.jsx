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
        className={`${isCollapsed ? "justify-center" : "pl-6"} text-xl shrink-0 hover:bg-zinc-800 w-full h-25 gap-4 flex items-center`}
      >
        <img
          src={`${user.image}`}
          className="rounded-full size-14 border-2 object-cover"
          alt=""
        />
        <div className={`${isCollapsed ? "hidden" : "show"} text-xl`}>
          <div className="flex items-center gap-6 h-auto">
            <p>{user.name}</p>
            {onlineUsers?.includes(user._id) ? (
              <div className="text-sm flex h-full items-center gap-1">
                <img
                  className="size-2 -ml-2"
                  src="https://img.icons8.com/emoji/48/green-circle-emoji.png"
                  alt="green-circle-emoji"
                />
                <p className="text-green-600">Online</p>
              </div>
            ) : (
              <div className="text-sm flex h-full items-center gap-1">
                <img
                  className="size-3 -ml-2"
                  src="https://img.icons8.com/ios-glyphs/30/FA5252/full-stop--v1.png"
                  alt="full-stop--v1"
                />
                <p className="text-red-600">Offline</p>
              </div>
            )}
          </div>
          <p className="font-extralight text-left text-md text-zinc-400">
            {user.bio}
          </p>
        </div>
        {unseenMessages[user._id] > 0 && (
          <div
            className={`${isCollapsed ? "hidden" : "show"} bg-purple-700 size-8 rounded-full text-white text-md ml-12 flex justify-center items-center font-bold`}
          >
            {unseenMessages[user._id]}
          </div>
        )}
      </div>
    </button>
  );
};

export default ChatPanel;
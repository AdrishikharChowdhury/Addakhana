import React,{useContext} from "react";
import { Info, ArrowLeft } from "lucide-react";
import defaultPic from "../assets/default-avatar.webp";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const ChatTopPanel = ({ isInfo }) => {

  const {selectedUser,users, setselectedUser}=useContext(ChatContext)
  const {onlineUsers}=useContext(AuthContext)

  return (
    <div className="text-white w-full flex justify-between items-center p-3 md:p-6 bg-zinc-950">
      <div className="w-full flex items-center gap-2 md:gap-4">
        <img src={selectedUser.image || defaultPic} className="w-10 h-10 md:w-16 md:h-16 rounded-full" alt="" />
        <p className="text-base md:text-2xl">{selectedUser.name}</p>
        {onlineUsers.includes(selectedUser._id)  ? (
          <img
            className="w-3 h-3 md:w-4 md:h-4 -ml-1 md:-ml-2"
            src="https://img.icons8.com/emoji/48/green-circle-emoji.png"
            alt="online"
          />
        ) : (
          <img
            className="w-3 h-3 md:w-4 md:h-4 -ml-1 md:-ml-2"
            src="https://img.icons8.com/emoji/48/red-circle-emoji.png"
            alt="offline"
          />
        )}
      </div>
      <button
        onClick={() => {
          isInfo();
        }}
        className="p-2 md:p-4 cursor-pointer rounded-full hover:bg-zinc-800"
      >
        <Info />
      </button>
    </div>
  );
};

export default ChatTopPanel;

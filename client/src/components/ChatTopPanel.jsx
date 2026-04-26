import React,{useContext} from "react";
import { Info } from "lucide-react";
import defaultPic from "../assets/default-avatar.webp";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const ChatTopPanel = ({ isInfo }) => {

  const {selectedUser,users}=useContext(ChatContext)
  const {onlineUsers}=useContext(AuthContext)

  return (
    <div className="text-white w-full flex justify-between items-center p-6 bg-zinc-950">
      <div className="w-full flex items-center gap-4">
        <img src={selectedUser.image || defaultPic} className="size-16 rounded-full" alt="" />
        <p className="text-2xl">{selectedUser.name}</p>
        {onlineUsers.includes(selectedUser._id)  ? (
          <img
            className="size-4 -ml-2"
            src="https://img.icons8.com/emoji/48/green-circle-emoji.png"
            alt="green-circle-emoji"
          />
        ) : (
          <img
            className="size-4 -ml-2"
            src="https://img.icons8.com/emoji/48/red-circle-emoji.png"
            alt="green-circle-emoji"
          />
        )}
      </div>
      <button
        onClick={() => {
          isInfo();
        }}
        className="p-4 cursor-pointer rounded-full hover:bg-zinc-800"
      >
        <Info />
      </button>
    </div>
  );
};

export default ChatTopPanel;

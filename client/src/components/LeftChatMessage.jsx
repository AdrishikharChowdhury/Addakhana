import React,{useContext} from "react";
import defaultPic from "../assets/default-avatar.webp";
import formatToIST from '../lib/utils'
import { ChatContext } from "../context/ChatContext";

const LeftChatMessage = ({image,text,createdAt}) => {
  const {selectedUser}=useContext(ChatContext)
  return (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <img src={selectedUser.image} className="size-10 rounded-full object-cover" alt="" />
        <p className="font-light text-sm">{formatToIST(createdAt)}</p>
      </div>
      <p className="max-w-1/2 w-max p-4 rounded-r-2xl rounded-tl-2xl bg-purple-700 mb-10">
        {text}
      </p>
    </div>
  );
};

export default LeftChatMessage;

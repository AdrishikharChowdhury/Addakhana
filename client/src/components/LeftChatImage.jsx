import React, { useContext } from "react";
import defaultPic from "../assets/default-avatar.webp";
import samplePic from "../assets/aboutus.webp";
import formatToIST from '../lib/utils'
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const LeftChatImage = ({image,createdAt}) => {
  const { selectedUser } = useContext(ChatContext);
  return (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <img src={selectedUser.image || defaultPic} className="size-10 rounded-full" alt="" />
        <p className="font-light text-sm">{formatToIST(createdAt)}</p>
      </div>
      <img
        src={image}
        className="max-w-1/2 object-cover rounded-r-2xl rounded-tl-2xl bg-purple-700 mb-10"
      />
    </div>
  );
};

export default LeftChatImage;

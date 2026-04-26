import React,{useContext} from "react";
import defaultPic from "../assets/default-avatar.webp";
import formatToIST from '../lib/utils'
import { AuthContext } from "../context/AuthContext";

const RightChatMessage = ({text,createdAt,image}) => {
  const {authUser}=useContext(AuthContext)
  return (
    <div className="flex flex-row-reverse items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <img src={authUser.image} className="size-10 rounded-full object-cover" alt="" />
        <p className="font-light text-sm">{formatToIST(createdAt)}</p>
      </div>
      <p className="max-w-1/2 w-max p-4 rounded-l-2xl rounded-tr-2xl bg-purple-950 border-2 border-purple-700 mb-10">
        {text}
      </p>
    </div>
  );
};

export default RightChatMessage;

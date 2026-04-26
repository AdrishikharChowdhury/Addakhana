import React, { useContext, useState, useEffect } from "react";
import samplePic1 from "../assets/aboutus.webp";
import defaultPic from "../assets/default-avatar.webp";
import samplePic2 from "../assets/woat1.webp";
import samplePic3 from "../assets/woat2.webp";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const RightSidebar = ({ info }) => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { onlineUsers } = useContext(AuthContext);
  const [msgImages, setmsgImages] = useState([]);

  useEffect(() => {
    setmsgImages(messages.filter((msg) => msg.image).map(msg=>msg.image));
  }, [messages]);

  return (
    <div
      className={`${info ? 'flex' : 'hidden'} w-120 h-full bg-zinc-900 text-white flex-col border-l-2 border-purple-900 shrink-0 transition-all duration-300`}
    >
      <p className="w-full text-3xl text-center py-8 bg-zinc-800 font-bold">
        Account Overview
      </p>
      <div className="flex flex-col items-center w-full py-8 gap-6">
        <img
          src={selectedUser?.image || defaultPic}
          className="size-20 rounded-full object-cover"
          alt=""
        />
        <div className="flex flex-col items-center gap-1">
          <p className="text-2xl">{selectedUser?.name}</p>
          <p className="text-lg text-zinc-500">
            @{selectedUser?.email || "No email"}
          </p>
        </div>
        <p className="text-xl text-zinc-400">{selectedUser?.bio || ""}</p>
      </div>
      <div className="flex flex-col w-full text-center pt-2">
        <p className="text-2xl font-semibold py-2">Media</p>
        <div className="flex overflow-y-scroll max-h-32 pt-4 flex-wrap gap-4 justify-center">
          {msgImages.map((image, idx)=><img
            key={idx}
            src={image}
            className="size-16 object-cover bg-purple-800 rounded-xl"
          />)}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;

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
      className={`${!info ? "hidden md:flex" : "flex"} w-full md:w-80 h-full bg-zinc-900 text-white flex-col border-l-2 border-purple-900 shrink-0 fixed md:relative right-0 top-0 z-40`}
    >
      <p className="w-full text-xl md:text-3xl text-center py-4 md:py-8 bg-zinc-800 font-bold">
        Account Overview
      </p>
      <div className="flex flex-col items-center w-full py-4 md:py-8 gap-4 md:gap-6">
        <img
          src={selectedUser?.image || defaultPic}
          className="w-20 h-20 md:w-28 md:h-28 lg:size-50 rounded-full object-cover"
          alt=""
        />
        <div className="flex flex-col items-center gap-1">
          <p className="text-lg md:text-2xl">{selectedUser?.name}</p>
          <p className="text-sm md:text-lg text-zinc-500">
            @{selectedUser?.email || "No email"}
          </p>
        </div>
        <p className="text-base md:text-xl text-zinc-400 px-4 text-center">{selectedUser?.bio || ""}</p>
      </div>
      <div className="flex flex-col w-full text-center pt-2">
        <p className="text-lg md:text-2xl font-semibold py-2">Media</p>
        <div className="flex overflow-y-auto max-h-32 md:max-h-80 p-2 md:p-4 flex-wrap gap-2 md:gap-4 justify-center">
          {msgImages.map((image, idx)=><img
            key={idx}
            src={image}
            className="w-16 h-16 md:w-24 md:h-24 object-cover bg-purple-800 rounded-lg md:rounded-xl"
          />)}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;

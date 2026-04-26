import React, { useState,useContext } from "react";
import LeftSideBar from "../../components/LeftSideBar";
import defaultPic from "../../assets/default-avatar.webp";
import { Info, Paperclip, SendHorizontal } from "lucide-react";
import ChatWindow from "../../components/ChatWindow";
import RightSidebar from "../../components/RightSidebar";
import ChatContainer from "../../components/ChatContainer";
import { ChatContext } from "../../context/ChatContext";

const Chat = () => {
  const {selectedUser,setselectedUser}=useContext(ChatContext)
  const [isCollapsed, setisCollapsed] = useState(false);
  const [info, setinfo] = useState(false);

  const isInfo = () => {
    setinfo(!info);
  };

  const navBox = () => setisCollapsed(!isCollapsed);

  return (
    <div className="w-full h-screen flex">
      <LeftSideBar
        isCollapsed={isCollapsed}
        navBox={navBox}
        setinfo={setinfo}
      />
      <div className="w-full h-screen bg-zinc-800 flex flex-col items-center">
        {selectedUser !== null ? (
          <ChatWindow
            isInfo={isInfo}
          />
        ) : (
          <ChatContainer />
        )}
      </div>
      <RightSidebar info={info} />
    </div>
  );
};

export default Chat;

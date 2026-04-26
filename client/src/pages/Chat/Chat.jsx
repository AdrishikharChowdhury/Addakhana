import React, { useState,useContext } from "react";
import LeftSideBar from "../../components/LeftSideBar";
import defaultPic from "../../assets/default-avatar.webp";
import { Info, Paperclip, SendHorizontal, Menu, X } from "lucide-react";
import ChatWindow from "../../components/ChatWindow";
import RightSidebar from "../../components/RightSidebar";
import ChatContainer from "../../components/ChatContainer";
import { ChatContext } from "../../context/ChatContext";

const Chat = () => {
  const {selectedUser,setselectedUser}=useContext(ChatContext)
  const [isCollapsed, setisCollapsed] = useState(false);
  const [info, setinfo] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const isInfo = () => {
    setinfo(!info);
  };

  const navBox = () => setisCollapsed(!isCollapsed);

  return (
    <div className="w-full h-screen flex">
      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-800 rounded-lg"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* LeftSidebar - hidden on mobile when collapsed */}
      <div className={`${showSidebar ? 'block' : 'hidden'} md:block`}>
        <LeftSideBar
          isCollapsed={isCollapsed}
          navBox={navBox}
          setinfo={setinfo}
        />
      </div>
      
      {/* Main chat area */}
      <div className="flex-1 h-screen bg-zinc-800 flex flex-col items-center min-w-0">
        {selectedUser !== null ? (
          <ChatWindow
            isInfo={isInfo}
          />
        ) : (
          <ChatContainer />
        )}
      </div>
      
      {/* RightSidebar - hidden by default, shown when info is clicked */}
      <div className={`${info ? 'flex' : 'hidden'} md:flex`}>
        <RightSidebar info={info} />
      </div>
    </div>
  );
};

export default Chat;

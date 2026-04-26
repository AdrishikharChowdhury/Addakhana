import React, { useState,useContext } from "react";
import LeftSideBar from "../../components/LeftSideBar";
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
      {/* LeftSidebar */}
      <div className="block">
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
      
      {/* RightSidebar */}
      <div className={`${info ? 'flex' : 'hidden'}`}>
        <RightSidebar info={info} />
      </div>
    </div>
  );
};

export default Chat;

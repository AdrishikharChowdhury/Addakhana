import React, { useContext, useEffect, useRef } from "react";
import ChatBackground from "./ChatBackground";
import LeftChatMessage from "./LeftChatMessage";
import RightChatMessage from "./RightChatMessage";
import LeftChatImage from "./LeftChatImage";
import RightChatImage from "./RightChatImage";
import ChatTopPanel from "./ChatTopPanel";
import ChatBottomPanel from "./ChatBottomPanel";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const ChatWindow = ({ isInfo }) => {
  const { authUser, onlineUsers } = useContext(AuthContext);
  const { messages, selectedUser, setselectedUser, sendMessage, getmessages } =
    useContext(ChatContext);

  const scrollEnd = useRef();

  useEffect(() => {
    if (selectedUser) {
      getmessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatTopPanel isInfo={isInfo} />
      <ChatBackground>
        <div className="max-h-206 overflow-scroll flex flex-col gap-2 p-4">
          {messages.map((msg, idx) =>
            msg.senderId === authUser._id ? (
              msg.image ? (
                <RightChatImage image={msg.image} createdAt={msg.createdAt} />
              ) : (
                <RightChatMessage text={msg.text} createdAt={msg.createdAt} />
              )
            ) : msg.image ? (
              <LeftChatImage image={msg.image} createdAt={msg.createdAt} />
            ) : (
              <LeftChatMessage text={msg.text} createdAt={msg.createdAt} />
            ),
          )}
          <div className="" ref={scrollEnd}></div>
        </div>
      </ChatBackground>
      <ChatBottomPanel />
    </>
  );
};

export default ChatWindow;

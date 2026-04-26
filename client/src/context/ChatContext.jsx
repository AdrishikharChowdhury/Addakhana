import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import dbgr from "debug";
const log = dbgr("development:ChatContext");
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setmessages] = useState([]);
  const [users, setusers] = useState([]);
  const [selectedUser, setselectedUser] = useState(null);
  const [unseenMessages, setunseenMessages] = useState({});

  const { socket, axios } = useContext(AuthContext);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setusers(data.users);
        setunseenMessages(data.unseenMessages);
      }
    } catch (error) {
      toast.error(error.message);
      log(error.message);
    }
  };

  const getmessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setmessages(data.messages);
      }
    } catch (error) {
      log(error.message);
      toast.error(error.message);
    }
  };

  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData,
      );
      if (data.success) {
        setmessages((p) => [...p, data.newMessage]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      log(error.message);
      toast.error(error.message);
    }
  };

  const subscribeToMessages = async () => {
    try {
      if (!socket) return;
      socket.on("newMessage", (newMessage) => {
        if (selectedUser && newMessage.senderId === selectedUser._id) {
          newMessage.seen = true;
          setmessages((p) => [...p, newMessage]);
          axios.put(`api/messages/mark/${newMessage._id}`);
        } else {
          setunseenMessages((p) => ({
            ...p,
            [newMessage.senderId]: p[newMessage.senderId]
              ? p[newMessage.senderId] + 1
              : 1,
          }));
        }
      });
    } catch (error) {
      log(error.message);
      toast.error(error.message);
    }
  };

  const unsubscribeFromMessages = () => {
    if (socket) socket.off("newMessage");
  };

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    setmessages,
    sendMessage,
    setselectedUser,
    unseenMessages,
    setunseenMessages,
    getmessages
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

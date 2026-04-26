import React, { useState, useContext } from "react";
import { Paperclip, SendHorizontal } from "lucide-react";
import { ChatContext } from "../context/ChatContext";
import toast from "react-hot-toast";

const ChatBottomPanel = () => {
  const { sendMessage } = useContext(ChatContext);
  const [input, setinput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setinput("");
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an Image File");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="text-white w-full flex justify-between items-center p-6 bg-zinc-950">
      <input
        type="text"
        placeholder="Enter your message..."
        className="border-2 p-4 w-9/10 border-zinc-800 rounded-2xl"
        onChange={(e) => setinput(e.target.value)}
        value={input}
        onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
      />

      <button className="p-4 rounded-full hover:bg-zinc-800 cursor-pointer">
        <label className="cursor-pointer" htmlFor="image">
          <Paperclip />
        </label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/"
          onChange={handleSendImage}
          hidden
        />
      </button>
      <button
        onClick={handleSendMessage}
        className="p-4 rounded-full bg-zinc-700 border-2 border-zinc-800 cursor-pointer"
      >
        <SendHorizontal />
      </button>
    </div>
  );
};

export default ChatBottomPanel;

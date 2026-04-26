import React from "react";

const ChatBackground = ({ children }) => {
  return (
    <div className="relative h-full w-full bg-zinc-900 text-white">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, 
              rgba(147, 51, 234, 0.2) 0%, 
              rgba(147, 51, 234, 0.12) 25%, 
              rgba(147, 51, 234, 0.05) 35%, 
              transparent 50%
            )
          `,
          backgroundSize: "100% 100%",
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ChatBackground;
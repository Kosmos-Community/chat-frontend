"use client";

import { useRouter } from "next/navigation";
import { Message } from "../../components/Message";
import { FormEventHandler, useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";

interface IMessage {
  author: string;
  msg: string;
  timeStamp: string;
}

export default function ChatView() {
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>("");

  const router = useRouter();
  const { socket } = useSocket();

  const handleLogout = () => {
    document.cookie = "username=; Max-Age=0";
    router.replace("/");
  };

  const handleMessageSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!message) return;

    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    if (!socket) return;

    function onOnlineUsers(value) {
      setOnlineUsers(value);
    }

    function onNewMessage(author, msg, timeStamp) {
      setAllMessages((prev) => [...prev, { author, msg, timeStamp }]);
    }

    socket.on("onlineUsers", onOnlineUsers);
    socket.on("newMessage", onNewMessage);

    return () => {
      socket.off("onlineUsers", onOnlineUsers);
      socket.off("newMessage", onNewMessage);
    };
  }, [socket]);

  return (
    <main className="text-sm w-full h-screen flex justify-center items-center">
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="text-xs p-2 px-3 bg-stone-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <p className="font-medium">{onlineUsers} online</p>
          </div>
          <button
            title="logout"
            className="text-stone-400 hover:text-red-500 focus:text-red-500 w-8 h-8 hover:bg-red-500/25 focus:bg-red-500/25 hover:bg-stone-700 rounded-md flex justify-center items-center transition outline-none"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col flex-1 gap-4 pt-3 px-3 overflow-y-scroll">
          {allMessages.map((message) => (
            <Message
              key={crypto.randomUUID()}
              username={message.author}
              message={message.msg}
              date={message.timeStamp}
            />
          ))}
        </div>
        <form
          onSubmit={handleMessageSubmit}
          className="w-full p-4 flex items-center gap-4 border-t border-stone-800"
        >
          <input
            type="text"
            className="flex-1 p-3 bg-transparent border border-stone-800 rounded-lg outline-none hover:border-stone-700 focus:border-stone-600 shadow-lg"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button className="text-stone-900 p-3 rounded-lg hover:bg-stone-100 focus:bg-stone-100 bg-stone-700 outline-none transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </div>
    </main>
  );
}

"use client";

import { Message } from "../components/Message";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";

interface IMessage {
  author: string;
  msg: string;
  timeStamp: string;
}

export default function ChatView() {
  const [connecting, setConnecting] = useState<boolean>(true);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>("");

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { socket } = useSocket();

  const handleMessageSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!message) return;

    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    if (!socket) return;

    function onConnect() {
      setConnecting(false);
    }

    function onOnlineUsers(value) {
      setOnlineUsers(value);
    }

    function onNewMessage(author, msg, timeStamp) {
      setAllMessages((prev) => [...prev, { author, msg, timeStamp }]);
    }

    socket.on("connect", onConnect);
    socket.on("onlineUsers", onOnlineUsers);
    socket.on("newMessage", onNewMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("onlineUsers", onOnlineUsers);
      socket.off("newMessage", onNewMessage);
    };
  }, [socket]);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [allMessages]);

  return (
    <main className="text-sm w-full h-screen flex justify-center items-center">
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="text-xs p-2 px-3 bg-stone-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <p className="font-medium">{onlineUsers} online</p>
          </div>
        </div>
        <div
          ref={chatContainerRef}
          className="flex flex-col flex-1 gap-4 py-3 px-3 overflow-y-scroll scroll-smooth"
        >
          {connecting && (
            <div className="text-stone-500 w-full h-full flex flex-col justify-center items-center">
              <h3 className="text-xl font-bold">
                Establishing connection to the server
              </h3>
              <p className="font-medium">Hold on, this may take some time</p>
            </div>
          )}
          {!connecting && allMessages.length === 0 && (
            <div className="text-stone-500 w-full h-full flex flex-col justify-center items-center">
              <h3 className="text-xl font-bold">
                There isn’t any messages yet
              </h3>
              <p className="font-medium">Be the first to send one</p>
            </div>
          )}
          {!connecting &&
            allMessages.map((message) => (
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
          className="w-full p-4 border-t border-stone-800"
        >
          <fieldset
            disabled={connecting}
            className="w-full flex items-center gap-4"
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
          </fieldset>
        </form>
      </div>
    </main>
  );
}

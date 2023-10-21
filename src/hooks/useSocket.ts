import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const username = document.cookie
      .split(";")
      .filter((cookie) => cookie.includes("username"))[0]
      .split("=")[1];

    const URL =
      process.env.NODE_ENV === "production"
        ? undefined
        : "http://localhost:4000";

    const ioSocket = io("http://localhost:4000", {
      auth: {
        username: username,
      },
    });

    setSocket(ioSocket);
  }, []);

  return { socket };
}

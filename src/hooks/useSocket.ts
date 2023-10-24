import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const username = localStorage.getItem("username") || "Anonymous";

    const URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    const ioSocket = io(URL, {
      auth: {
        username: username,
      },
    });

    setSocket(ioSocket);
  }, []);

  return { socket };
}

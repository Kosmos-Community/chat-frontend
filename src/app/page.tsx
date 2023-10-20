"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler, cache, useEffect, useState } from "react";

export default function Root() {
  const [username, setUsername] = useState<string>("");
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const router = useRouter();

  const handleUserLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!username) return;

    try {
      setIsLocked(true);

      // Save the username to the cookies so it can be used to re-login after
      document.cookie = `username=${username}`;

      router.replace("/chat");
    } catch (error) {
      // If something went wrong, clean the username input to let the user try again
      setUsername("");
    } finally {
      setIsLocked(false);
    }
  };

  return (
    <main className="h-screen flex justify-center items-center">
      <form onSubmit={handleUserLogin} className="w-full max-w-[250px]">
        <fieldset
          disabled={isLocked}
          className="text-sm font-medium w-full flex flex-col gap-4"
        >
          <input
            type="text"
            className="text-center w-full py-3 bg-stone-800 border border-white/[5%] rounded-lg outline-none shadow-lg placeholder:text-stone-600 focus:border-white/25 transition"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <button
            type="submit"
            className=" text-stone-400 py-3 w-full rounded-lg border border-transparent outline-none hover:text-stone-200 focus:text-stone-200 focus:border-white/25 transition"
          >
            Join Chatroom
          </button>
        </fieldset>
      </form>
    </main>
  );
}

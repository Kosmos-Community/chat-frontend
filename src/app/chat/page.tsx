"use client";

import { useRouter } from "next/navigation";
import { Message } from "../../components/Message";

export default function ChatView() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "username=; Max-Age=0";
    router.replace("/");
  };

  return (
    <main className="text-sm w-full h-screen flex justify-center items-center">
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="text-xs p-2 px-3 bg-stone-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <p className="font-medium">2 online</p>
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
          <Message
            username="Jorge Reyes"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus nisl tincidunt eget nullam non nisi. Aenean et tortor at risus viverra adipiscing at in tellus. Praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla. Dui faucibus in ornare quam viverra orci sagittis eu volutpat. Nunc sed blandit libero volutpat sed cras ornare arcu. Semper risus in hendrerit gravida rutrum quisque non. Accumsan tortor posuere ac ut consequat semper viverra. Ultricies tristique nulla aliquet enim tortor at auctor urna. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Tellus at urna condimentum mattis pellentesque id. Mauris vitae ultricies leo integer malesuada nunc. Fringilla phasellus faucibus scelerisque eleifend donec. Amet luctus venenatis lectus magna fringilla urna. Id venenatis a condimentum vitae sapien pellentesque."
            date={new Date().toLocaleTimeString()}
          />
          {Array.from({ length: 50 }).map((_) => (
            <Message
              username="Pablo Rosas"
              message="Hola Jorge, yo estoy conectado!"
              date={new Date().toLocaleTimeString()}
            />
          ))}
        </div>
        <form className="w-full p-4 flex items-center gap-4 border-t border-stone-800">
          <input
            type="text"
            className="flex-1 p-3 bg-transparent border border-stone-800 rounded-lg outline-none hover:border-stone-700 focus:border-stone-600 shadow-lg"
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

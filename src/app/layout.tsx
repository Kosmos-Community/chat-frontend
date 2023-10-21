import "./global.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Kosmos Community – Chatroom",
  description: "A straightforward fast chatroom",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="text-white min-h-screen bg-stone-900">{children}</body>
    </html>
  );
}

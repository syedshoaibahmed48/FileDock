import type { Metadata } from "next";
import "./globals.css";
import { AppWrapper } from "./contexts/app-context";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "FileDock",
  description: "Store & Share files",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-auto no-scrollbar">
        <main className="bg-gradient-to-tr from-zinc-900 via-zinc-800 via-60% to-zinc-900 w-screen h-screen text-white">
          <AppWrapper>
            <Navbar />
            {children}
          </AppWrapper>
        </main>
      </body>
    </html>
  );
}

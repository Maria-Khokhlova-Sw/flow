import type { Metadata } from 'next';
import './globals.css';
import HeaderChats from '@/app/components/header/mainHeader/headerChats';
import ChatList from "@/app/components/chatList/chatList";

export const metadata: Metadata = {
  title: 'Flow',
  description: 'Flow',
    icons:"/svg/Logo.svg",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <HeaderChats />
      <ChatList/>
      </body>
    </html>
  );
}

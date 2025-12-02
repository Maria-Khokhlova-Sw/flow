import type { Metadata } from 'next';
import './globals.css';
import {UserProvider} from "@/hooks/userContext";
import HeaderChats from '@/components/header/mainHeader/headerChats';
import './media.scss'
import 'react-resizable/css/styles.css'
import ChatLayout from "@/components/chatList/chatLayout/ChatLayout";


export const metadata: Metadata = {
    title: 'Flow',
    description: 'Flow',
    icons:"/svg/Logo.svg",
};

export default function RootLayout() {
    return (
        <html lang="en">
        <body>
        <UserProvider>
            <ChatLayout/>
        </UserProvider>
        </body>
        </html>
    );
}

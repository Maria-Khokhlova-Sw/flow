import type { Metadata } from 'next';
import './globals.css';
import {UserProvider} from "@/hooks/userContext";
import HeaderChats from '@/components/header/mainHeader/headerChats';
import NavigationBar from "@/components/chatList/navigationBar/NavigationBar";
import './media.scss'
import MainDesktop from "@/components/mainDesctop/MainDesktop";
import UserList from "@/components/chatList/chatList";

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
        <div className="MainContainer">
            <UserProvider>
                <div className="Container">
                    <NavigationBar/>
                    <UserList/>
                </div>
                <MainDesktop/>
            </UserProvider>
        </div>
        </body>
        </html>
    );
}

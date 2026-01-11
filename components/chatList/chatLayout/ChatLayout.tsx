"use client";

import UserList from "@/components/chatList/userList";
import MainDesktop from "@/components/mainDesctop/MainDesktop";
import { useUsers } from "@/hooks/userContext";
import useIsMobile from "@/hooks/useIsMobile";
import HeaderChats from '@/components/header/mainHeader/headerChats';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    const { selectedUserId, selectUser } = useUsers();
    const isMobile = useIsMobile();

    const handleBackToList = () => {
        selectUser(null);
    };

    if (selectedUserId) {
        return <MainDesktop onBack={handleBackToList} />;
    }

    if (isMobile) {
        return (
            <>
                <HeaderChats />
                <div className="MainContainer">
                    <UserList />
                </div>
            </>
        );
    }
    return (
        <>
            <HeaderChats />
            <div className="MainContainer">
                <UserList />
                {children || <MainDesktop onBack={handleBackToList} />}
            </div>
        </>
    );
}
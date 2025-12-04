"use client";
import UserList from "@/components/chatList/userList";
import MainDesktop from "@/components/mainDesctop/MainDesktop";
import { useUsers } from "@/hooks/userContext";
import useIsMobile from "@/hooks/useIsMobile";
import HeaderChats from '@/components/header/mainHeader/headerChats';



export default function ChatLayout() {
    const {selectedUserId, selectUser} = useUsers()
    const isMobile = useIsMobile();

    const handleBackToList = () => {
        selectUser(null)
    }
    if(isMobile) {
        if(selectedUserId){
            return (
                <MainDesktop onBack={handleBackToList} />
            );
        } else {
            return (
                <>
                    <HeaderChats />
                    <div className="MainContainer">
                        <UserList/>
                    </div>
                </>

            )
        }
    }
    return (
        <>
            <HeaderChats />
            <div className="MainContainer">
                <UserList/>
                <MainDesktop onBack={handleBackToList} />
            </div>
        </>
    )
}
"use client"
import styles from "./chatList.module.scss"
import { useUsers } from "@/hooks/userContext"
import { lastMessage } from "@/hooks/last-message"
import { UserListItem } from "./chatList-item"
import NavigationBar from "@/components/chatList/navigationBar/NavigationBar"
import { ResizableBox } from "react-resizable"
import { useEffect, useState } from "react"

export default function UserList() {
    const { users, selectedUserId, selectUser } = useUsers()
    const { getLastMessage, getUnreadCount } = lastMessage()
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(350)

    const initialWidth = 350

    useEffect(() => {
        const calculateHeight = () => {
            setHeight(window.innerHeight - 55)
        }
        calculateHeight()
        window.addEventListener("resize", calculateHeight)
        return () => window.removeEventListener("resize", calculateHeight)
    }, [])
    
    const handleResize = (event: any, data: any) => {
        const newWidth = data.size.width;

        if (newWidth <= 350) {
            setWidth(55);
        } else {
            setWidth(newWidth);
        }
    }

    return (
        <ResizableBox
            width={width}
            height={height}
            onResize={handleResize}
            style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
            resizeHandles={["e"]}
            minConstraints={[55, height]}
            maxConstraints={[450, height]}
        >
            <NavigationBar />
            <div className={styles.user_list}>
                <ul>
                    {users.map((user) => {
                        const lastMessage = getLastMessage(user.id)
                        const unreadCount = getUnreadCount(user.id)

                        return (
                            <UserListItem
                                key={user.id}
                                user={user}
                                lastMessage={lastMessage}
                                unreadCount={unreadCount}
                                isSelected={selectedUserId === user.id}
                                onSelect={() => selectUser(user.id)}
                            />
                        )
                    })}
                </ul>
            </div>
        </ResizableBox>
    )
}

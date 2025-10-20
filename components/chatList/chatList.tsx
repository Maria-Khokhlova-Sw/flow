"use client"
import styles from "./chatList.module.scss"
import { useUsers } from "@/hooks/userContext"
import { lastMessage } from "@/hooks/last-message"
import { UserListItem } from "./chatList-item"

export default function UserList() {
    const { users, selectedUserId, selectUser } = useUsers()
    const { getLastMessage, getUnreadCount } = lastMessage()

    return (
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
    )
}

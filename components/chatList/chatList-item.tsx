"use client"

import styles from "./chatList.module.scss"
import type { User, Message } from "@/types/chats"

interface UserListItemProps {
    user: User
    lastMessage: Message | null
    unreadCount: number
    isSelected: boolean
    onSelect: () => void
}

export function UserListItem({ user, lastMessage, unreadCount,  isSelected, onSelect }: UserListItemProps) {
    const renderStatusIndicator = (message: Message) => {
        if(message.author !== "me") return null

        if (message.status === "read") {
            return <span className={styles.status}>++</span>
        }else if(message.status ==="sent"){
            return <span className={styles.status}>+</span>
        }
        return null
    }
    return (
        <li className={`${styles.user_item} ${isSelected ? styles.active : ""}`} onClick={onSelect}>
            <img
                src={user.photoUrl}
                alt={user.name}
                width="50"
                height="50"
                className={styles.photo_user}
            />
            <div className={styles.content}>
                <div className={styles.name}>{user.name}</div>
                {lastMessage ? (
                    <div className={styles.message}>
                        <div className={styles.mess}>
                            <span className={styles.author}>{lastMessage.author === "me" ? "Вы: " : ""}</span> {lastMessage.text}
                        </div>
                    </div>
                ) : (
                    <div className={styles.message}>начните общение</div>
                )}
                <div className={styles.messageInfo}>
                    <div className={styles.message_meta}>
                          <span className={styles.time}>
                            {new Date(lastMessage.timestamp).toLocaleTimeString("ru-RU", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                          </span>
                    </div>
                    <div className={styles.indicators}>
                        {renderStatusIndicator(lastMessage)}
                        {unreadCount > 0 && <span className={styles.unread_badge}>{unreadCount}</span>}
                    </div>
                </div>
            </div>
        </li>
    )
}

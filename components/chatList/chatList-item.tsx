"use client"

import styles from "./chatList.module.scss"
import { formatTime } from "@/lib/format-time"
import type { User, Message } from "@/types/chats"

interface UserListItemProps {
    user: User
    lastMessage: Message | null
    isSelected: boolean
    onSelect: () => void
}

export function UserListItem({ user, lastMessage, isSelected, onSelect }: UserListItemProps) {
    return (
        <li className={`${styles.user_item} ${isSelected ? styles.active : ""}`} onClick={onSelect}>
            <img
                src={user.photoUrl || "/placeholder.svg"}
                alt={user.name}
                width="50"
                height="50"
                className={styles.photo_user}
            />
            <div className={styles.content}>
                <div className={styles.name}>{user.name}</div>
                {lastMessage ? (
                    <div className={styles.message}>
                        <span className={styles.author}>{lastMessage.author === "me" ? "Вы: " : ""}</span> {lastMessage.text}
                        <div className={styles.message_meta}>
                            <span className={styles.time}>{formatTime(lastMessage.timestamp)}</span>
                        </div>
                    </div>
                ) : (
                    <div className={styles.message}>начните общение</div>
                )}
            </div>
        </li>
    )
}

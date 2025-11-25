"use client"

import styles from "./chatList.module.scss"
import type { User, Message } from "@/types/chats"
import {useState, useRef} from "react";

const HOLD_DELAY = 800;

interface UserListItemProps {
    user: User
    lastMessage: Message | null
    unreadCount: number
    isSelected: boolean
    onSelect: () => void
    onLongPress: () => void
    currentWidth: number
}

export function UserListItem({ user, lastMessage, unreadCount,  isSelected, onSelect, onLongPress, currentWidth }: UserListItemProps) {
    const [didLongPress, setDidLongPress] = useState<boolean>(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const handlePressStart = () => {
        setDidLongPress(false);
        timerRef.current = setTimeout(() => {
            setDidLongPress(true);
            onLongPress();
            console.log('ok');
        }, HOLD_DELAY);
    }
    const handlePressEnd = () => {
        if(timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null;
        }
    }
    const handleClick = () => {
        handlePressEnd();
        if(didLongPress) {
            return;
        }
        onSelect();
    }
    const handleContextMenu = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        onLongPress()
        setDidLongPress(true);
    }
    const renderStatusIndicator = (message: Message) => {
        if(message.author !== "me") return null

        if (message.status === "read") {
            return(
                <span className={styles.status}>
                    <img
                        src="/svg/indicator.svg"
                        alt="прочитано"
                        width="30" height="15"
                        className="brightness-0 saturate-100"
                        style={{
                            filter: "invert(38%) sepia(98%) saturate(2476%) hue-rotate(200deg) brightness(95%) contrast(101%)",
                        }}
                    />
                </span>
            )
        }else if(message.status ==="sent"){
            return (
                <span className={styles.status}>
                    <img src={"/svg/indicator.svg"} alt={"индикатор"} width="30" height="15"/>
                </span>
            )
        }
        return null
    }
    return (
        <li className={`${styles.user_item} ${isSelected ? styles.active : ""}`}
            onClick={handleClick}
            onTouchStart={handlePressStart}
            onTouchEnd = {handlePressEnd}
            onContextMenu = {handleContextMenu}
        >
            <div className={styles.content}>
                {lastMessage ? (
                    <>
                        <div className={styles.messAboutUser}>
                        <img
                            src={user.photoUrl}
                            alt={user.name}
                            width="50"
                            height="50"
                            className={styles.photo_user}
                        />
                        <div className={styles.messTextBlock}>
                            <div className={styles.name}>{user.name}</div>
                            <div className={styles.message}>
                                <div className={styles.mess}>
                                    <span className={styles.author}>{lastMessage.author === "me" ? "Вы: " : ""}</span>  <span className={styles.textMess}>{lastMessage.text}</span>
                                </div>
                            </div>
                        </div>
                        </div>
                        {currentWidth > 55 && (
                            <div className={styles.messageInfo}>
                            <div className={styles.message_meta}>
                      <span className={styles.time}>
                          {new Date(lastMessage.timestamp).toLocaleTimeString("ru-RU", {
                              hour: "2-digit",
                              minute: "2-digit",
                          })}
                      </span>
                            </div>
                            {currentWidth > 55 && (
                                <div className={styles.indicators}>
                                    {renderStatusIndicator(lastMessage)}
                                    {unreadCount > 0 && <span className={styles.unread_badge}>{unreadCount}</span>}
                                </div>
                            )}
                        </div>
                            )}
                    </>
                ) : (
                    <>
                        <div className={styles.message}>начните общение</div>
                        <div className={styles.messageInfo}>
                            <div className={styles.message_meta}></div>
                            <div className={styles.indicators}>
                                {unreadCount > 0 && <span className={styles.unread_badge}>{unreadCount}</span>}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </li>
    )
}

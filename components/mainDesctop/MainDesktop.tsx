"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./mainDesctop.module.scss";
import { useUsers } from "@/hooks/userContext";
import cn from "classnames";
import type {Message} from "@/types/chats";

export default function MainDesktop() {
    const { users, conversations, selectedUserId, sendMessage, markMessagesAsRead } = useUsers()
    const [text, setText] = useState("")
    const listRef = useRef<HTMLDivElement | null>(null)
    const selectedUser = users.find((u) => u.id === selectedUserId) || null
    const mess = (selectedUserId && conversations[selectedUserId]) || []

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight
        }
    }, [selectedUserId, mess.length])

    useEffect(() => {
        if (selectedUserId) {
            markMessagesAsRead(selectedUserId)
        }
    }, [selectedUserId, markMessagesAsRead])

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedUserId) return
        sendMessage(selectedUserId, text)
        setText("")
    }
    const renderStatusIndicator = (m: Message) => {
        if (m.status === "read" && m.author === 'me') {
            return(
                <>
                    <img
                        src="/svg/indicator.svg"
                        alt="прочитано"
                        width="30" height="15"
                        className="brightness-0 saturate-100"
                        style={{
                            filter: "invert(100%) brightness(200%)",
                        }}
                    />
                </>
            )
        }else if(m.status ==="sent" && m.author === 'me'){
            console.log(mess)
            return (
                <>
                    <img src={"/svg/indicator.svg"} alt={"индикатор"} width="30" height="15"/>
                </>
            )
        }
    }

    if (!selectedUser) {
        return (
            <div className={styles.desk}>
                <div className={cn(styles.desk, styles.randomState)}>
                    <div className={styles.random}>Ты в потоке</div>
                </div>
            </div>
        )
    }


    return (
        <div className={styles.desk}>
            <div className={styles.chatHeader}>
                <img
                    src={selectedUser.photoUrl}
                    alt={selectedUser.name}
                    width="50"
                    height="50"
                    className={styles.avatar}
                />
                <div className={styles.headerName}>{selectedUser.name}</div>
            </div>

            <div className={styles.messages} ref={listRef}>
                {mess.map((m) => (
                    <div
                        key={m.id}
                        className={cn(styles.bubble, m.author === "me" ? styles.me : styles.them)}
                        title={new Date(m.timestamp).toLocaleString()}
                    >
                        {m.text}
                        <div className={styles.messTime} >
                            {renderStatusIndicator(m)}
                            {new Date(m.timestamp).toLocaleTimeString("ru-RU", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <form className={styles.inputRow} onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Напишите сообщение…"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={styles.input}
                />
                <button className={styles.buttonSubmit} type="submit" >Отправить</button>
            </form>
        </div>
    );
}

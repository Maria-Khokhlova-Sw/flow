"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./mainDesctop.module.scss";
import { useUsers } from "@/hooks/userContext";
import cn from "classnames";

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

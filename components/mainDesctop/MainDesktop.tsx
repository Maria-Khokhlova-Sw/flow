"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./mainDesctop.module.scss";
import { useUsers } from "@/hooks/userContext";
import cn from "classnames";
import type {Message} from "@/types/chats";
interface MainDesktopProps {
    onBack?: () => void;
}
export default function MainDesktop({onBack}: MainDesktopProps) {
    const { users, conversations, selectedUserId, sendMessage, markMessagesAsRead } = useUsers()
    const [text, setText] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement | null>(null)
    const selectedUser = users.find((u) => u.id === selectedUserId) || null
    const mess = (selectedUserId && conversations[selectedUserId]) || []
    const showBackButton = typeof onBack === 'function';

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
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !selectedUserId) return;

        if (!file.type.startsWith('image/')) {
            alert('Поддерживаются только изображения.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string;
            sendMessage(selectedUserId, `image:${base64}`);
            setText("");
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    }
    const handlePlusClick = () => {
        fileInputRef.current?.click();
    };
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
                {showBackButton && (
                    <button onClick={onBack} className={styles.backButton}>
                        ←
                    </button>
                )}
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
                <div onClick={handlePlusClick}>
                    +
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
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

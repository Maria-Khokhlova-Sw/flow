// UserList.tsx — полностью переписанная версия под твою задачу
"use client";
import { useEffect, useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import styles from "./chatList.module.scss";
import { useUsers } from "@/hooks/userContext";
import { lastMessage } from "@/hooks/last-message";
import { UserListItem } from "./chatList-item";
import NavigationBar from "@/components/chatList/navigationBar/NavigationBar";

export default function UserList() {
    const { users, selectedUserId, selectUser } = useUsers();
    const { getLastMessage, getUnreadCount } = lastMessage();
    const [activateCategory, setActivateCategory] = useState(0);

    const [width, setWidth] = useState(350);
    const [height, setHeight] = useState(0); // будет вычисляться

    // Вычисляем начальную высоту: вся высота окна минус хедер (55px у тебя)
    useEffect(() => {
        const updateHeight = () => {
            setHeight(window.innerHeight - 55);
        };
        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    const filteredUsers = users.filter((user) => {
        const unread = getUnreadCount(user.id);
        if (activateCategory === 1) return unread > 0;
        return true;
    });

    return (
        <ResizableBox
            width={width}
            height={height}
            minConstraints={[55, 300]}
            maxConstraints={[450, window.innerHeight - 55]}
            // Важно: обе ручки — справа и сверху
            resizeHandles={["e", "n"]}
            axis="both"
            onResize={(_, { size }) => {
                // При сжатии по ширине до 250px — сворачиваем в иконку
                setWidth(size.width <= 250 ? 55 : size.width);
            }}
            handle={(handleAxis, ref) => (
                <div
                    ref={ref}
                    className={
                        handleAxis === "e"
                            ? styles.resizeHandleVertical
                            : styles.resizeHandleHorizontal
                    }
                />
            )}
        >
            <div className={styles.sidebarContainer}>
                {/* ВСЁ, что должно сжиматься по высоте — внутри */}

                <NavigationBar
                    activeIndex={activateCategory}
                    onClick={setActivateCategory}
                />

                {/* Твоя строка поиска */}
                <div className={styles.searchContainer}>
                    <button className={styles.searchButton}>
                        <svg className={styles.searchIcon} width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15.8033 15.8033M15.8033 15.8033C17.2096 14.397 18 12.5435 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5435 18 14.397 17.2096 15.8033 15.8033Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Поиск..."
                    />
                </div>

                {/* Список чатов */}
                <div className={styles.user_list}>
                    <ul>
                        {filteredUsers.map((user) => {
                            const lastMsg = getLastMessage(user.id);
                            const unread = getUnreadCount(user.id);

                            return (
                                <UserListItem
                                    key={user.id}
                                    user={user}
                                    lastMessage={lastMsg}
                                    unreadCount={unread}
                                    isSelected={selectedUserId === user.id}
                                    onSelect={() => selectUser(user.id)}
                                    onLongPress={() => console.log("Long press", user.id)}
                                    currentWidth={width}
                                />
                            );
                        })}
                    </ul>
                </div>
            </div>
        </ResizableBox>
    );
}
"use client";
import styles from "./chatList.module.scss";
import React from "react";
import { useUsers } from "@/hooks/userContext";

export default function UserList() {
    const { users, selectedUserId, selectUser } = useUsers();

    return (
        <div className={styles.user_list}>
            <ul>
                {users.map((user) => (
                    <li
                        key={user.id}
                        className={`${styles.user_item} ${selectedUserId === user.id ? styles.active : ""}`}
                        onClick={() => selectUser(user.id)}
                    >
                        <img
                            src={user.photoUrl}
                            alt={user.name}
                            width="50"
                            height="50"
                            className={styles.photo_user}
                        />
                        <div className={styles.content}>
                            <div className={styles.name}>{user.name}</div>
                            <div className={styles.message}>начните общение</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

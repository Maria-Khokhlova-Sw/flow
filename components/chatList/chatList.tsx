"use client";
import styles from "./chatList.module.scss"

import React from 'react';
import { useUsers } from '@/hooks/userContext';

export default function UserList() {
    const { users } = useUsers();

    return (
        <div className={styles.user_list}>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className={styles.user_item}>
                        <img
                            src={user.photoUrl}
                            alt={user.name}
                            width="50"
                            height="50"
                            className={styles.photo_user}
                        />
                        <div className={styles.content}>
                            <div className={styles.name}>{user.name}</div>
                            <div className={styles.message}>{user.message}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
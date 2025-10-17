"use client"
import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import type { User, Message, Conversations, UserContextType } from "@/types/chats"

const UserContext = createContext<UserContextType | null>(null)

interface UserProviderProps {
    children: ReactNode
}

const BASE_TIMESTAMP = 1729152000000

export const UserProvider = ({ children }: UserProviderProps) => {
    const initialUsers: User[] = useMemo(
        () => [
            { id: 1, name: "Не глупенький", photoUrl: "/img/photo/user2.jpg", message: "начните общение" },
            { id: 2, name: "Глупенький", photoUrl: "/img/photo/user3.jpg", message: "начните общение" },
            { id: 3, name: "Самый глупенький", photoUrl: "/img/photo/user4.jpg", message: "начните общение" },
        ],
        [],
    )
    const [users] = useState<User[]>(initialUsers)

    const [conversations, setConversations] = useState<Conversations>({
        1: [
            { id: "1-1", author: "me", text: "Привет! Как дела?", timestamp: BASE_TIMESTAMP - 1000 * 60 * 60 * 4 },
            { id: "1-2", author: "them", text: "Привет! Всё ок, а ты?", timestamp: BASE_TIMESTAMP - 1000 * 60 * 60 * 3.8 },
            {
                id: "1-3",
                author: "me",
                text: "Тоже отлично. Готов к созвону?",
                timestamp: BASE_TIMESTAMP - 1000 * 60 * 60 * 3.7,
            },
            {
                id: "1-4",
                author: "them",
                text: "Да, давай через 10 минут.",
                timestamp: BASE_TIMESTAMP - 1000 * 60 * 60 * 3.6,
            },
        ],
        2: [
            { id: "2-1", author: "them", text: "Хэй, у нас дедлайн завтра.", timestamp: BASE_TIMESTAMP - 1000 * 60 * 60 * 6 },
            { id: "2-2", author: "me", text: "Ок, я допилю вечером.", timestamp: BASE_TIMESTAMP - 1000 * 60 * 60 * 5.7 },
            {
                id: "2-3",
                author: "them",
                text: "Кинешь превью, как будет.",
                timestamp: BASE_TIMESTAMP - 1000 * 60 * 60 * 5.6,
            },
        ],
        3: [
            { id: "3-1", author: "me", text: "Доброе утро!", timestamp: BASE_TIMESTAMP - 1000 * 60 * 60 * 12 },
            { id: "3-2", author: "them", text: "Утро доброе :)", timestamp: BASE_TIMESTAMP - 1000 * 60 * 60 * 11.8 },
        ],
    })

    const [selectedUserId, setSelectedUserId] = useState<number | null>(initialUsers[0]?.id ?? null)

    const selectUser = (id: number) => setSelectedUserId(id)

    const sendMessage = (userId: number, text: string) => {
        if (!text.trim()) return
        setConversations((prev) => {
            const list = prev[userId] ?? []
            const next: Message[] = [
                ...list,
                {
                    id: `${userId}-${Date.now()}`,
                    author: "me",
                    text: text.trim(),
                    timestamp: Date.now(),
                },
            ]
            return { ...prev, [userId]: next }
        })
    }

    const value: UserContextType = {
        users,
        conversations,
        selectedUserId,
        selectUser,
        sendMessage,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUsers = (): UserContextType => {
    const ctx = useContext(UserContext)
    if (!ctx) throw new Error("useUsers must be used within a UserProvider")
    return ctx
}

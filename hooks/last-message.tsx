import { useUsers } from "./userContext"
import type { Message } from "@/types/chats"

export function lastMessage() {
    const { conversations } = useUsers()

    const getLastMessage = (userId: number): Message | null => {
        const userMessages = conversations[userId]
        if (!userMessages || userMessages.length === 0) {
            return null
        }
        return userMessages[userMessages.length - 1]
    }

    const getUnreadCount =(userId: number) : number => {
        const userMessages = conversations[userId]
        if (!userMessages || userMessages.length === 0) return 0
        return userMessages.filter((msg) => msg.author === "them" && msg.status === "sent").length
    }

    return { getLastMessage, getUnreadCount }
}

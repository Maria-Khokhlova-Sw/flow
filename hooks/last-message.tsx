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

    return { getLastMessage }
}

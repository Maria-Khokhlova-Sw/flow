export interface User {
    id: number
    name: string
    photoUrl: string
}

export interface Message {
    id: string
    author: "me" | "them"
    text: string
    timestamp: number
    status: "sending" | "sent" | "read"
}

export interface Conversations {
    [userId: number]: Message[]
}

export interface UserContextType {
    users: User[]
    conversations: Conversations
    selectedUserId: number | null
    selectUser: (id: number | null) => void
    sendMessage: (userId: number, text: string) => void
    markMessagesAsRead: (userId: number) => void
}

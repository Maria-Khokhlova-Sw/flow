export interface User {
    id: number
    name: string
    photoUrl: string
    message: string
}

export interface Message {
    id: string
    author: "me" | "them"
    text: string
    timestamp: number
}

export interface Conversations {
    [userId: number]: Message[]
}

export interface UserContextType {
    users: User[]
    conversations: Conversations
    selectedUserId: number | null
    selectUser: (id: number) => void
    sendMessage: (userId: number, text: string) => void
}

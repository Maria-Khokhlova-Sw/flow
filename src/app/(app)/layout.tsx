import ChatLayout from "@/components/chatList/chatLayout/ChatLayout";

export default function AppLayout({
                                      children,
                                  }: {
    children: React.ReactNode;
}) {
    return <ChatLayout>{children}</ChatLayout>;
}
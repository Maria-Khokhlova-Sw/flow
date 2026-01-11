import type { Metadata } from 'next';
import './globals.css';
import { UserProvider } from "@/hooks/userContext";
import './media.scss';
import 'react-resizable/css/styles.css';

export const metadata: Metadata = {
    title: 'Flow',
    description: 'Flow',
    icons: "/svg/Logo.svg",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <UserProvider>
            {children}
        </UserProvider>
        </body>
        </html>
    );
}
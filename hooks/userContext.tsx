"use client";
import {createContext, useContext, useState} from 'react';

export const User ={
    id: Number,
    name: String,
    photoUrl : String,
    message: String,
}

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users] = useState([
        {
            id: 1,
            name: 'Не глупенький',
            photoUrl: '/img/photo/user2.jpg',
            message: 'начните общение',
        },
        {
            id: 2,
            name: 'Глупенький',
            photoUrl: '/img/photo/user3.jpg',
            message: 'начните общение',
        },
        {
            id: 3,
            name: 'Самый глупенький',
            photoUrl: '/img/photo/user4.jpg',
            message: 'начните общение',
        },
    ]);
    return (
        <UserContext.Provider value={{ users }}>
            {children}
        </UserContext.Provider>
    );
}
export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUsers must be used within a UserProvider');
    }
    return context;
};
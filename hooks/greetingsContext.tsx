"use client"

import { createContext, useContext, useState, useEffect } from "react"

const greetings = [
  "Пусть общение плывут как лёгкие волны по океану — спокойно и с искрой приключений!",
  "Добро пожаловать, пусть день накатывает на тебя только хорошие новости и тёплые разговоры.",
  "С прибытием! Как свежая волна на берегу — обнови мир своими идеями и лови прилив позитива.",
  "Привет из глубин! Волны сообщений ждут твоего шторма — что новенького в твоём океане?",
  "Входишь в чат как прилив — полон энергии и готов к новым горизонтам бесед.",
  "Готов к эпичным диалогам? Давай зажжём этот день, как фейерверк в полночь!",
  "Чашка чая в руках, хорошая компания — что расскажешь сегодня?",
  "Пусть твой день искрится теплом, как утренний лучик на подушке.",
  "Пусть твои мечты сбываются мягко, как облачко в голубом небе.",
  "Пусть мелкие радости собираются в большой букет счастья.",
  "Хорошего дня — с теплом в душе и свежим ветром в мыслях.",
  "Каждый вход — шаг к новым связям. Что вдохновит тебя на этот раз?",
  "Волны чата накатывают — твои сообщения будут как бриз, свежие и вдохновляющие.",
  "Как приливная волна — заполни чат энергией и лови эхо от друзей.",
  "Пусть твои слова плывут по волнам интернета, достигая всех уголков мира.",
  "Твой вход — как штормовой ветер: динамичный и полный сюрпризов.",
  "Чат — океан историй, ныряй глубже с каждым сообщением.",
  "Шепот волн зовёт! Твой вход — как рассвет над морем: обещающий и полный тайн.",
  "Входи в поток — здесь каждый разговор как прибой, полный свежих идей и брызг вдохновения.",
  "Добро пожаловать — пусть чаты будут такими же динамичными, как шторм в открытом океане!",
]

interface GreetingsContextType {
  randomGreeting: string
}

const GreetingsContext = createContext<GreetingsContextType | undefined>(undefined)

export function GreetingsProvider({ children }: { children: React.ReactNode }) {
  const [randomGreeting, setRandomGreeting] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined' && greetings.length > 0) {
      const newGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      setRandomGreeting(newGreeting);
    }
  }, []);

  return (
      <GreetingsContext.Provider value={{ randomGreeting }}>
        {children}
      </GreetingsContext.Provider>
  )
}

export function useGreetings() {
  const context = useContext(GreetingsContext)
  if (!context) {
    throw new Error("useGreetings must be used within GreetingsProvider")
  }
  return context
}
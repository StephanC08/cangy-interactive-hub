
import { useState } from 'react';
import { Message } from '../types';
import { getBotResponse } from '../chatBotUtils';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const initializeMessages = () => {
    if (messages.length === 0) {
      const hour = new Date().getHours();
      let greeting = "Bonjour";
      
      if (hour >= 12 && hour < 18) {
        greeting = "Bon après-midi";
      } else if (hour >= 18 || hour < 5) {
        greeting = "Bonsoir";
      }
      
      const initialMsg: Message = {
        id: 1,
        text: `${greeting} ! Je suis l'assistant virtuel de Stephan CANGY. Besoin d'un site web ? D'un plan stratégique ? D'estimer, acheter ou vendre un bien ? D'obtenir un accompagnement ou des conseils personnalisés ?`,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages([initialMsg]);
    }
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const { response, redirect } = getBotResponse(text);
      
      const botResponse: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      
      return { redirect };
    }, 800);
  };

  const handleQuestionClick = (question: string) => {
    sendMessage(question);
    setShowSuggestions(false);
  };

  return {
    messages,
    showSuggestions,
    initializeMessages,
    sendMessage,
    handleQuestionClick
  };
}

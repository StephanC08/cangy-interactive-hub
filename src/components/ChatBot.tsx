
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Message, ChatBotProps } from './chatbot/types';
import { getBotResponse } from './chatbot/chatBotUtils';
import WelcomeMessage from './chatbot/WelcomeMessage';
import ChatButton from './chatbot/ChatButton';
import ChatWindow from './chatbot/ChatWindow';

const ChatBot: React.FC<ChatBotProps> = ({ fullWidth = false, disableWelcomeMessage = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const { toast } = useToast();
  
  // Modified quick options for service selection
  const quickOptions = [
    { label: "Web", action: "web" },
    { label: "Coaching", action: "coaching" },
    { label: "Immo", action: "immobilier" }
  ];

  useEffect(() => {
    // Only show welcome message if not disabled
    if (!disableWelcomeMessage) {
      const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
      
      if (!hasSeenWelcome) {
        const timer = setTimeout(() => {
          setShowWelcomeMessage(true);
        }, 8000); // Show after intro animation
        
        return () => clearTimeout(timer);
      }
    }
  }, [disableWelcomeMessage]);
  
  useEffect(() => {
    // Initialize messages with personalized greeting when opened
    if (isOpen && messages.length === 0) {
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
  }, [isOpen, messages.length]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
    if (showWelcomeMessage) {
      setShowWelcomeMessage(false);
      sessionStorage.setItem('hasSeenWelcome', 'true');
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const navigateToPage = (page: string) => {
    if (window.location.pathname !== `/${page}`) {
      window.location.href = `/${page}`;
    }
  };

  const handleQuestionClick = (question: string) => {
    sendMessage(question);
    setShowSuggestions(false);
  };
  
  const handleQuickOptionClick = (option: string) => {
    let messageText = "";
    
    switch(option) {
      case "web":
        messageText = "Je souhaite des informations sur vos services de développement web";
        navigateToPage("developpement-web");
        break;
      case "coaching":
        messageText = "Je suis intéressé par vos services de coaching";
        navigateToPage("coaching");
        break;
      case "immobilier":
        messageText = "Je voudrais en savoir plus sur vos services immobiliers";
        navigateToPage("immobilier");
        break;
    }
    
    sendMessage(messageText);
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
      
      // Handle redirection if needed
      if (redirect) {
        setTimeout(() => navigateToPage("immobilier"), 1000);
      }
    }, 800);
  };

  const handleCloseWelcomeMessage = () => {
    setShowWelcomeMessage(false);
    sessionStorage.setItem('hasSeenWelcome', 'true');
  };

  return (
    <AnimatePresence>
      <WelcomeMessage 
        showWelcomeMessage={showWelcomeMessage} 
        disableWelcomeMessage={disableWelcomeMessage}
        quickOptions={quickOptions}
        onQuickOptionClick={handleQuickOptionClick}
        onClose={handleCloseWelcomeMessage}
      />

      <ChatButton 
        isOpen={isOpen} 
        showWelcomeMessage={showWelcomeMessage} 
        onClick={toggleChat} 
      />

      <ChatWindow 
        isOpen={isOpen}
        isMinimized={isMinimized}
        messages={messages}
        showSuggestions={showSuggestions}
        quickOptions={quickOptions}
        onQuestionClick={handleQuestionClick}
        onQuickOptionClick={handleQuickOptionClick}
        onMinimizeToggle={toggleMinimize}
        onClose={toggleChat}
        onSendMessage={sendMessage}
      />
    </AnimatePresence>
  );
};

export default ChatBot;

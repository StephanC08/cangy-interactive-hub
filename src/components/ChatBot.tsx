import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import ChatHeader from './chatbot/ChatHeader';
import ChatMessages from './chatbot/ChatMessages';
import ChatInput from './chatbot/ChatInput';
import { Message, ChatBotProps } from './chatbot/types';
import { initialMessages, getBotResponse } from './chatbot/chatBotUtils';

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

  return (
    <>
      {/* Welcome message popup - only show if not disabled */}
      <AnimatePresence>
        {showWelcomeMessage && !disableWelcomeMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 right-6 bg-noir-light border border-mauve p-4 rounded-lg shadow-xl z-40 max-w-xs"
          >
            <p className="text-white text-sm mb-3">
              Bienvenue ! Besoin d'aide pour naviguer dans mes services ?
            </p>
            <div className="flex flex-wrap gap-2">
              {quickOptions.map((option) => (
                <button
                  key={option.action}
                  onClick={() => handleQuickOptionClick(option.action)}
                  className="px-3 py-1 bg-mauve hover:bg-mauve-dark text-white rounded transition-colors text-xs"
                >
                  {option.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowWelcomeMessage(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 bg-mauve text-noir rounded-full p-4 shadow-lg z-40 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: showWelcomeMessage ? 0 : 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare size={24} />
        
        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-mauve"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 0, 0.7]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
          style={{ zIndex: -1 }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed bottom-6 right-6 bg-noir-light border border-mauve/20 rounded-lg shadow-2xl z-40 w-80 md:w-96 ${
              isMinimized ? 'h-16' : 'max-h-[32rem]'
            }`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
          >
            {/* Chat Header */}
            <ChatHeader 
              isMinimized={isMinimized}
              toggleMinimize={toggleMinimize}
              toggleChat={toggleChat}
            />

            {/* Chat Messages and Input */}
            {!isMinimized && (
              <>
                <ChatMessages 
                  messages={messages}
                  showSuggestions={showSuggestions}
                  onQuestionClick={handleQuestionClick}
                  quickOptions={quickOptions}
                  onQuickOptionClick={handleQuickOptionClick}
                />

                <ChatInput onSendMessage={sendMessage} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;

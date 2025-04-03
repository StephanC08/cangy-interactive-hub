
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ChatHeader from './chatbot/ChatHeader';
import ChatMessages from './chatbot/ChatMessages';
import ChatInput from './chatbot/ChatInput';
import { Message } from './chatbot/types';
import { initialMessages, getBotResponse } from './chatbot/chatBotUtils';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const { toast } = useToast();

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const navigateToImmobilierPage = () => {
    if (window.location.pathname !== '/immobilier') {
      window.location.href = '/immobilier';
    }
  };

  const handleQuestionClick = (question: string) => {
    sendMessage(question);
    setShowSuggestions(false);
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
    
    setMessages([...messages, userMessage]);
    
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
        setTimeout(navigateToImmobilierPage, 1000);
      }
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 bg-mauve hover:bg-mauve-dark text-noir rounded-full p-4 shadow-lg z-40 transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 bg-noir-light border border-mauve/20 rounded-lg shadow-2xl z-40 transition-all duration-300 w-80 md:w-96 ${
          isOpen 
            ? 'scale-100 opacity-100' 
            : 'scale-0 opacity-0 pointer-events-none'
        } ${
          isMinimized 
            ? 'h-16' 
            : 'max-h-[32rem]'
        }`}
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
            />

            <ChatInput onSendMessage={sendMessage} />
          </>
        )}
      </div>
    </>
  );
};

export default ChatBot;

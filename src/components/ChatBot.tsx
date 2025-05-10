
import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { ChatBotProps } from './chatbot/types';
import { useChatWindow } from './chatbot/hooks/useChatWindow';
import { useMessages } from './chatbot/hooks/useMessages';
import WelcomeMessage from './chatbot/WelcomeMessage';
import ChatButton from './chatbot/ChatButton';
import ChatWindow from './chatbot/ChatWindow';

const ChatBot: React.FC<ChatBotProps> = ({ fullWidth = false, disableWelcomeMessage = false }) => {
  const { toast } = useToast();
  
  // Quick options for service selection
  const quickOptions = [
    { label: "Web", action: "web" },
    { label: "Coaching", action: "coaching" },
    { label: "Immo", action: "immobilier" }
  ];

  const {
    isOpen,
    isMinimized,
    showWelcomeMessage,
    toggleChat,
    toggleMinimize,
    handleCloseWelcomeMessage,
    initializeWelcomeMessage
  } = useChatWindow();

  const {
    messages,
    showSuggestions,
    initializeMessages,
    sendMessage,
    handleQuestionClick
  } = useMessages();

  // Initialize welcome message based on session
  useEffect(() => {
    return initializeWelcomeMessage(disableWelcomeMessage);
  }, [disableWelcomeMessage]);
  
  // Initialize messages when chat is opened
  useEffect(() => {
    if (isOpen) {
      initializeMessages();
    }
  }, [isOpen]);

  const navigateToPage = (page: string) => {
    if (window.location.pathname !== `/${page}`) {
      window.location.href = `/${page}`;
    }
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
    
    const result = sendMessage(messageText);
    // Handle redirect if needed
    if (result && result.redirect) {
      setTimeout(() => navigateToPage("immobilier"), 1000);
    }
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

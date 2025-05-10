
import { useState } from 'react';

export function useChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

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

  const handleCloseWelcomeMessage = () => {
    setShowWelcomeMessage(false);
    sessionStorage.setItem('hasSeenWelcome', 'true');
  };

  const initializeWelcomeMessage = (disableWelcomeMessage: boolean) => {
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
  };

  return {
    isOpen,
    isMinimized,
    showWelcomeMessage,
    toggleChat,
    toggleMinimize,
    handleCloseWelcomeMessage,
    initializeWelcomeMessage
  };
}

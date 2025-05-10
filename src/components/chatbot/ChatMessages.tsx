import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';
import SuggestedQuestions from './SuggestedQuestions';
import { Message, QuickOption } from './types';
import { suggestedQuestions } from './chatBotUtils';

interface ChatMessagesProps {
  messages: Message[];
  showSuggestions: boolean;
  onQuestionClick: (question: string) => void;
  quickOptions?: QuickOption[];
  onQuickOptionClick?: (option: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  showSuggestions,
  onQuestionClick,
  quickOptions,
  onQuickOptionClick
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-4 overflow-y-auto h-80">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          variants={messageVariants}
          initial="hidden"
          animate="visible"
          transition={{ 
            duration: 0.3, 
            delay: index * 0.1
          }}
        >
          <ChatMessage message={message} />
          
          {/* Show quick options after first bot message if available */}
          {index === 0 && 
           message.sender === 'bot' && 
           quickOptions && 
           onQuickOptionClick && (
            <motion.div 
              className="flex flex-wrap gap-2 mt-2 ml-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {quickOptions.map((option) => (
                <button
                  key={option.action}
                  onClick={() => onQuickOptionClick(option.action)}
                  className="px-3 py-1 bg-mauve/20 hover:bg-mauve/40 text-white rounded-full text-xs transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>
      ))}
      
      {/* Suggested Questions */}
      {showSuggestions && messages.length < 3 && (
        <SuggestedQuestions
          questions={suggestedQuestions}
          onQuestionClick={onQuestionClick}
        />
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;

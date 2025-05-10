
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';
import { Message } from './types';

interface ChatMessageListProps {
  messages: Message[];
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages }) => {
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
    <>
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
        </motion.div>
      ))}
      <div ref={messagesEndRef} />
    </>
  );
};

export default ChatMessageList;

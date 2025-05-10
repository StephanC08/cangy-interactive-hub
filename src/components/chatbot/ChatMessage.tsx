
import React from 'react';
import { motion } from 'framer-motion';
import { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={`mb-4 flex ${
        message.sender === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      {message.sender === 'bot' && (
        <div className="w-8 h-8 rounded-full bg-mauve/30 flex items-center justify-center mr-2 flex-shrink-0">
          <span className="text-xs text-white font-bold">SC</span>
        </div>
      )}
      
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          message.sender === 'user'
            ? 'bg-mauve/20 text-white'
            : 'bg-noir-dark text-white'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <p className="text-xs text-gray-500 mt-1">
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
      
      {message.sender === 'user' && (
        <div className="w-8 h-8 rounded-full bg-mauve/20 flex items-center justify-center ml-2 flex-shrink-0">
          <span className="text-xs text-white">Vous</span>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;

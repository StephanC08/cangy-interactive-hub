
import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import SuggestedQuestions from './SuggestedQuestions';
import { Message } from './types';
import { suggestedQuestions } from './chatBotUtils';

interface ChatMessagesProps {
  messages: Message[];
  showSuggestions: boolean;
  onQuestionClick: (question: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  showSuggestions,
  onQuestionClick,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="p-4 overflow-y-auto h-80">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
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

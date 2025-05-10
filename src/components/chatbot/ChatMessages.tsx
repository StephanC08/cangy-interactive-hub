
import React from 'react';
import ChatMessageList from './ChatMessageList';
import SuggestedQuestions from './SuggestedQuestions';
import QuickOptionsBar from './QuickOptionsBar';
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
  const firstMessage = messages.length > 0 ? messages[0] : null;
  const isFirstMessageFromBot = firstMessage && firstMessage.sender === 'bot';

  return (
    <div className="p-4 overflow-y-auto h-80">
      <ChatMessageList messages={messages} />
      
      {/* Show quick options after first bot message if available */}
      {isFirstMessageFromBot && quickOptions && onQuickOptionClick && (
        <QuickOptionsBar 
          quickOptions={quickOptions} 
          onQuickOptionClick={onQuickOptionClick} 
        />
      )}
      
      {/* Suggested Questions */}
      {showSuggestions && messages.length < 3 && (
        <SuggestedQuestions
          questions={suggestedQuestions}
          onQuestionClick={onQuestionClick}
        />
      )}
    </div>
  );
};

export default ChatMessages;

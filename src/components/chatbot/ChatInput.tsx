
import React, { useState } from 'react';
import MessageInput from './MessageInput';
import SendButton from './SendButton';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-mauve/10">
      <div className="flex space-x-2">
        <MessageInput 
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <SendButton onClick={handleSend} />
      </div>
    </div>
  );
};

export default ChatInput;

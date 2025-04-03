
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
        <Input
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Votre message..."
          className="flex-1 bg-noir border-mauve/20 text-white"
        />
        <Button 
          onClick={handleSend} 
          size="icon" 
          className="bg-mauve hover:bg-mauve-dark text-noir"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;

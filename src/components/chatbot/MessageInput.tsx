
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  value, 
  onChange, 
  onKeyPress 
}) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder="Votre message..."
      className="flex-1 bg-noir border-mauve/20 text-white"
    />
  );
};

export default MessageInput;

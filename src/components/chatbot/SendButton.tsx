
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SendButtonProps {
  onClick: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ onClick }) => {
  return (
    <Button 
      onClick={onClick} 
      size="icon" 
      className="bg-mauve hover:bg-mauve-dark text-noir"
    >
      <Send size={18} />
    </Button>
  );
};

export default SendButton;

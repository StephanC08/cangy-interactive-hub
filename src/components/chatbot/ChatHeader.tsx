
import React from 'react';
import { MessageSquare, X, Minimize2, Maximize2 } from 'lucide-react';

interface ChatHeaderProps {
  isMinimized: boolean;
  toggleMinimize: () => void;
  toggleChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  isMinimized,
  toggleMinimize,
  toggleChat,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-mauve/10">
      <div className="flex items-center space-x-3">
        <MessageSquare className="text-mauve" size={20} />
        <h3 className="font-medium text-white">
          Assistant virtuel
        </h3>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleMinimize}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
        </button>
        <button
          onClick={toggleChat}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;

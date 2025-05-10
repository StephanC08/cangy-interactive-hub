
import React from 'react';
import HeaderTitle from './HeaderTitle';
import HeaderControls from './HeaderControls';

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
      <HeaderTitle />
      <HeaderControls 
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
        toggleChat={toggleChat}
      />
    </div>
  );
};

export default ChatHeader;

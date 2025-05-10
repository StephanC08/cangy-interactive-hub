
import React from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';

interface HeaderControlsProps {
  isMinimized: boolean;
  toggleMinimize: () => void;
  toggleChat: () => void;
}

const HeaderControls: React.FC<HeaderControlsProps> = ({
  isMinimized,
  toggleMinimize,
  toggleChat,
}) => {
  return (
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
  );
};

export default HeaderControls;

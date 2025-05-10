
import React from 'react';
import { MessageSquare } from 'lucide-react';

const HeaderTitle: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <MessageSquare className="text-mauve" size={20} />
      <h3 className="font-medium text-white">
        Assistant virtuel
      </h3>
    </div>
  );
};

export default HeaderTitle;

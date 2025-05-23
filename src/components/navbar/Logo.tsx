
import React from "react";

export const Logo: React.FC = () => {
  return (
    <a href="/" className="flex items-center">
      <img
        src="/lovable-uploads/e3d84279-748a-4dbd-aaab-744e78b20954.png"
        alt="Stephan CANGY Logo"
        className="h-16 md:h-24" // Reduced size to prevent overlapping
      />
    </a>
  );
};

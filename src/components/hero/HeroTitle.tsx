
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroTitleProps {
  titleFirstPart: string;
  titleSecondPart: string;
}

const HeroTitle: React.FC<HeroTitleProps> = ({ titleFirstPart, titleSecondPart }) => {
  const isMobile = useIsMobile();
  
  // Animation variants for text
  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };
  
  const titleChar = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  if (isMobile) {
    return (
      <motion.div
        className="overflow-visible px-1 mb-4"
        variants={titleContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl font-heading font-bold text-white leading-tight whitespace-nowrap"
          style={{ wordBreak: "keep-all", hyphens: "none" }}
        >
          {titleFirstPart.split('').map((char, index) => (
            <motion.span
              key={`first-${index}`}
              variants={titleChar}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.h1 
          className="text-4xl font-heading font-bold leading-tight whitespace-nowrap"
          style={{ wordBreak: "keep-all", hyphens: "none" }}
        >
          {titleSecondPart.split('').map((char, index) => (
            <motion.span
              key={`second-${index}`}
              variants={titleChar}
              className={char === '&' ? "mauve-gradient-text" : "text-white"}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>
    );
  }
  
  return (
    <motion.h1 
      className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-4 w-full overflow-visible px-1 whitespace-nowrap md:whitespace-normal"
      variants={titleContainer}
      initial="hidden"
      animate="visible"
      style={{ wordBreak: "keep-all", hyphens: "none" }}
    >
      {(titleFirstPart + " " + titleSecondPart).split('').map((char, index) => (
        <motion.span
          key={index}
          variants={titleChar}
          className={char === '&' ? "mauve-gradient-text" : ""}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default HeroTitle;

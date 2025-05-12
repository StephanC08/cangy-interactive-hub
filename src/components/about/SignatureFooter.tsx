
import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const SignatureFooter = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // SVG path animation effect
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        pathLength: 1,
        transition: {
          duration: 2.5,
          ease: "easeOut"
        }
      });
    }
  }, [controls, isInView]);

  return (
    <section className="py-16 bg-noir-light">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto text-center">
          <div ref={ref} className="relative h-32">
            <motion.svg 
              viewBox="0 0 300 100" 
              className="w-full h-auto stroke-mauve-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.path
                d="M40,90 C45,65 100,10 130,15 C160,20 150,90 180,60 C210,30 240,90 280,40"
                fill="transparent"
                strokeWidth="2"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={controls}
                style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              />
              <motion.path
                d="M150,50 C180,40 200,60 230,45"
                fill="transparent"
                strokeWidth="2"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={controls}
                transition={{ delay: 1 }}
                style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              />
              <motion.path
                d="M190,30 C210,20 220,40 240,30"
                fill="transparent"
                strokeWidth="2"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={controls}
                transition={{ delay: 1.5 }}
                style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              />
            </motion.svg>
            
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 2, duration: 0.8, type: "spring" }}
            >
              <img 
                src="/lovable-uploads/71e0f5be-e62c-41af-abab-86ef170a6967.png" 
                alt="Stephan CANGY Signature" 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureFooter;

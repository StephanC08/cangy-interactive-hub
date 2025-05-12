
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
        <div className="max-w-3xl mx-auto text-center">
          <motion.p 
            className="text-xl md:text-2xl font-heading mb-12 text-white italic"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Et si on avançait ensemble ?
          </motion.p>
          
          <div ref={ref} className="relative h-40 md:h-56">
            <motion.svg 
              viewBox="0 0 200 100" 
              className="w-full h-auto stroke-mauve"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.path
                d="M40,50 C80,30 120,70 160,50"
                fill="transparent"
                strokeWidth="1"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={controls}
                style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              />
            </motion.svg>
            
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 md:w-32 md:h-32"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 2, duration: 0.8, type: "spring" }}
            >
              <img 
                src="/lovable-uploads/526e59d8-b2e4-4632-a39a-30ea639684cf.png" 
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

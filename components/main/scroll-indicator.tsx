"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ModernScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      <motion.button
        onClick={scrollToNextSection}
        className={cn(
          "relative group flex flex-col items-center justify-center",
          "outline-none focus:outline-none"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to next section"
      >
        {/* Text label */}
        <motion.span
          className="text-xs font-medium text-foreground/70 mb-3 tracking-wider"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          EXPLORE
        </motion.span>
        
        {/* Scroll icon - creative line and dot animation */}
        <div className="relative h-16 w-7 overflow-hidden">
          <div className="absolute inset-0 rounded-full border border-foreground/20 bg-background/50 backdrop-blur-sm" />
          
          {/* Animated dot inside the capsule */}
          <motion.div
            className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-foreground"
            animate={{ 
              y: [0, 40, 0]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/50 pointer-events-none" />
        </div>
        
        {/* Focus indicator ring */}
        <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-foreground/5" />
        
        {/* Subtle pulse effect behind the button */}
        <motion.div
          className="absolute -inset-4 rounded-full bg-foreground/5 -z-10"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0, 0.2, 0] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </motion.button>
    </motion.div>
  );
};

// Alternative version with lines animation
const LineScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Chevron animation variants
  const chevronVariants = {
    initial: { opacity: 0, y: -5 },
    animate: (index) => ({
      opacity: [0, 1, 0],
      y: [0, 5, 10],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: index * 0.2,
        ease: "easeInOut"
      }
    })
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      <motion.button
        onClick={scrollToNextSection}
        className="flex flex-col items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to next section"
      >
        <span className="text-xs font-medium text-foreground/70 mb-2 tracking-wider">
          SCROLL
        </span>
        
        <div className="relative h-8 w-5 flex flex-col items-center justify-center">
          {/* Animated chevron lines */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-0.5 bg-foreground mb-1 last:mb-0"
              style={{ 
                transformOrigin: "center",
                rotate: 45,
                marginLeft: "3px"
              }}
              variants={chevronVariants}
              initial="initial"
              animate="animate"
              custom={index}
            />
          ))}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index + 3}
              className="w-3 h-0.5 bg-foreground mb-1 last:mb-0"
              style={{ 
                transformOrigin: "center",
                rotate: -45,
                marginRight: "3px",
                position: "absolute",
                top: `${index * 6 + 2}px`
              }}
              variants={chevronVariants}
              initial="initial"
              animate="animate"
              custom={index}
            />
          ))}
        </div>
      </motion.button>
    </motion.div>
  );
};

// Another alternative with circular design
const CircleScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.button
        onClick={scrollToNextSection}
        className="flex flex-col items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to next section"
      >
        <motion.div
          className="relative h-10 w-10 rounded-full border border-foreground/20 bg-background/30 backdrop-blur-sm flex items-center justify-center overflow-hidden"
          whileHover={{ borderColor: "rgba(var(--foreground-rgb), 0.3)" }}
        >
          {/* Arrow down icon */}
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-foreground/80"
            animate={{ 
              y: [0, 3, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </motion.svg>
          
          {/* Circular trace animation */}
          <svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 100 100"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-foreground/10"
              strokeDasharray="289"
              strokeDashoffset="289"
              animate={{ 
                strokeDashoffset: [289, 0, 289] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </svg>
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

// Choose which indicator you prefer:
//export default ModernScrollIndicator; 
// export default LineScrollIndicator;
 export default CircleScrollIndicator;
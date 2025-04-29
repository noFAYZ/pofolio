"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Cloud component to replace the handwritten arrows
const ImmersiveCloud = ({ 
  title, 
  color, 
  position, 
  delay = 0,
  onClick
}: { 
  title: string; 
  color: string; 
  position: [number, number]; 
  delay?: number;
  onClick?: () => void;
}) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  
  const cloudVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 0.9, 
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        delay,
        duration: 0.6, 
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      opacity: 1,
      boxShadow: `0 0 20px ${color}50`,
      transition: { duration: 0.3 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: delay + 0.3,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.1,
      color: "#ffffff",
      textShadow: `0 0 10px ${color}`,
      transition: { duration: 0.2 }
    }
  };

  // Particles inside the cloud
  const Particles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.6
            }}
            animate={{
              x: [0, Math.random() * 20 - 10],
              y: [0, Math.random() * 20 - 10],
              opacity: [0.6, 0.2, 0.6],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${position[0]}%`,
        top: `${position[1]}%`,
        zIndex: isHovered ? 30 : 20
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <motion.div
        className="relative flex items-center justify-center"
        variants={cloudVariants}
        initial="hidden"
        animate={isHovered ? "hover" : "visible"}
      >
        {/* Cloud shape */}
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
          <motion.path
            d="M30,60 Q10,60 10,45 Q10,30 25,30 Q25,10 45,10 Q65,10 70,25 Q85,15 100,25 Q115,35 110,50 Q120,65 100,70 Q90,75 70,70 Q60,80 40,70 Q20,70 30,60 Z"
            fill={`${color}25`}
            stroke={color}
            strokeWidth="1.5"
            animate={{
              d: isHovered 
              ? "M30,60 Q10,60 10,45 Q10,30 25,30 Q25,10 45,10 Q65,10 70,25 Q85,15 100,25 Q115,35 110,50 Q120,65 100,70 Q90,75 70,70 Q60,80 40,70 Q20,70 30,60 Z"
              : "M32,58 Q12,58 12,45 Q12,32 27,32 Q27,12 47,12 Q67,12 72,27 Q87,17 102,27 Q117,37 112,52 Q122,67 102,68 Q92,73 72,68 Q62,78 42,68 Q22,68 32,58 Z"
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
        </svg>
        
        {/* Text inside cloud */}
        <motion.div
          className="absolute font-medium"
          variants={textVariants}
          initial="hidden"
          animate={isHovered ? "hover" : "visible"}
          style={{ 
            color,
            fontSize: "14px"
          }}
        >
          {title}
        </motion.div>
        
        {/* Particles effect when hovered */}
        {isHovered && <Particles />}
      </motion.div>
    </motion.div>
  );
};

export default function ImmersiveAvatar() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCloud, setActiveCloud] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Add event listener for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!avatarRef.current) return;
      
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center (normalized from -1 to 1)
      const x = (e.clientX - centerX) / (window.innerWidth / 2);
      const y = (e.clientY - centerY) / (window.innerHeight / 2);
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Service areas with custom colors
  const services = [
    { title: 'Web Dev', color: '#3b82f6', position: [50, 5], id: 'web' },
    { title: 'Blockchain', color: '#8b5cf6', position: [90, 30], id: 'blockchain' },
    { title: 'Consulting', color: '#f97316', position: [50, 95], id: 'consulting' },
    { title: 'Web3', color: '#10b981', position: [10, 30], id: 'web3' },
    { title: 'UI/UX', color: '#ec4899', position: [20, 70], id: 'uiux' },
    { title: 'AI', color: '#0ea5e9', position: [80, 70], id: 'ai' },
  ];
  
  // Animation properties for the avatar container
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20,
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  // Glowing orbs floating around the avatar
  const FloatingOrbs = () => {
    return (
      <>
        {[...Array(8)].map((_, i) => {
          const size = Math.random() * 40 + 20;
          const orbitSize = Math.random() * 60 + 160;
          const speed = Math.random() * 20 + 15;
          const delay = Math.random() * 10;
          const color = services[i % services.length].color;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                background: `radial-gradient(circle at 30% 30%, ${color}30, ${color}05)`,
                boxShadow: `0 0 20px ${color}30`,
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
                zIndex: 5
              }}
              animate={{
                x: `calc(-50% + ${Math.cos(delay) * orbitSize}px)`,
                y: `calc(-50% + ${Math.sin(delay) * orbitSize}px)`,
              }}
              transition={{
                duration: speed,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                delay: -delay // Negative delay creates different starting positions
              }}
            />
          );
        })}
      </>
    );
  };

  return (
    <motion.div 
      className="relative flex items-center justify-center mx-auto h-[500px]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      ref={avatarRef}
    >
      {/* Atmospheric background */}
      <motion.div 
        className="absolute w-full h-full rounded-full bg-gradient-to-r from-violet-100/30 via-fuchsia-100/20 to-cyan-100/30 dark:from-violet-900/10 dark:via-fuchsia-900/5 dark:to-cyan-900/10 blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.7, 0.9, 0.7],
          background: [
            "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.15), rgba(59,130,246,0.05))",
            "radial-gradient(circle at 70% 70%, rgba(236,72,153,0.15), rgba(16,185,129,0.05))",
            "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.15), rgba(59,130,246,0.05))"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Animated circle patterns */}
      <svg className="absolute w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f630" />
            <stop offset="100%" stopColor="#8b5cf630" />
          </linearGradient>
          <linearGradient id="circleGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b98130" />
            <stop offset="100%" stopColor="#f9731630" />
          </linearGradient>
        </defs>
        
        <motion.circle 
          cx="200" cy="200" r="190" 
          stroke="url(#circleGradient1)"
          strokeWidth="1" 
          strokeDasharray="4 4"
          animate={{ 
            rotate: 360,
            scale: [1, 1.02, 1],
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.circle 
          cx="200" cy="200" r="160" 
          stroke="url(#circleGradient2)"
          strokeWidth="1"
          strokeDasharray="8 8"
          animate={{ 
            rotate: -360,
            scale: [1, 0.98, 1],
          }}
          transition={{ 
            rotate: { duration: 80, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </svg>
      
      {/* Floating orbs */}
      <FloatingOrbs />
      
      {/* The main avatar container with 3D effect */}
      <motion.div
        className="relative overflow-hidden w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-[360px] lg:h-[500px] rounded-[11rem] shadow-2xl z-10 border-4 border-white/30"
        style={{ 
          transformStyle: "preserve-3d",
          transform: `perspective(1000px) rotateX(${mousePosition.y * -7}deg) rotateY(${mousePosition.x * 7}deg)`,
          transition: "transform 0.2s ease-out",
          boxShadow: `
            0 10px 30px rgba(0,0,0,0.3),
            0 0 40px rgba(139,92,246,0.3),
            inset 0 0 0 1px rgba(255,255,255,0.1)
          `,
        }}
      >
        {/* Animated gradient border */}
        <motion.div 
          className="absolute inset-0 rounded-[11rem] p-[2px] overflow-hidden"
          animate={{
            background: [
              `linear-gradient(45deg, ${services[0].color}80, ${services[1].color}80, ${services[2].color}80, ${services[3].color}80)`,
              `linear-gradient(225deg, ${services[0].color}80, ${services[1].color}80, ${services[2].color}80, ${services[3].color}80)`,
              `linear-gradient(45deg, ${services[0].color}80, ${services[1].color}80, ${services[2].color}80, ${services[3].color}80)`,
            ],
            backgroundSize: ["200% 200%", "200% 200%", "200% 200%"],
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Inner container for image */}
          <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-[11rem] overflow-hidden">
            <Image 
              src="/profile/3.jpeg" 
              alt="Faizan Asad" 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              quality={100}
              priority
            
            />
            
  
   
          </div>
        </motion.div>
        

      </motion.div>

     

    </motion.div>
  );
}
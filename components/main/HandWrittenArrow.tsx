"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import * as THREE from 'three';
import { CodeIcon, LayersIcon, GlobeIcon } from '@radix-ui/react-icons';
import { FaEthereum } from 'react-icons/fa';
import { DeviconPlainWeb3js, SkillIconsSolidity } from '@/components/icons/skill-icons';

// Dynamic badge that floats around the avatar
const FloatingSkillBadge = ({
  skill,
  index,
  total,
  isHovered,
  setHovered,
  isMobile
}: {
  skill: {
    id: string;
    label: string;
    icon: React.ReactNode;
    description: string;
    color: string;
  };
  index: number;
  total: number;
  isHovered: boolean;
  setHovered: (value: boolean) => void;
  isMobile: boolean;
}) => {
  // Calculate position around a circle for even distribution
  const angle = (index / total) * 2 * Math.PI;
  const radius = isMobile ? 110 : 160; // Smaller radius on mobile
  
  // Convert polar to Cartesian coordinates
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  return (
    <motion.div
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: x,
        y: y,
        transition: { 
          type: "spring", 
          stiffness: 260, 
          damping: 20, 
          delay: 0.1 * index + 0.5 
        }
      }}
      whileHover={{ scale: 1.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div 
        className={`flex items-center p-1 rounded-full`}
        style={{ 
          background: `radial-gradient(circle at center, ${skill.color}20, ${skill.color}10)`,
          border: `1px solid ${skill.color}30`,
          boxShadow: isHovered ? `0 0 15px ${skill.color}50` : `0 0 5px ${skill.color}30`
        }}
        animate={{
          boxShadow: isHovered 
            ? `0 0 15px ${skill.color}50` 
            : `0 0 5px ${skill.color}30`,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Icon container */}
        <motion.div 
          className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-md bg-white/10 dark:bg-black/10"
          style={{ 
            color: skill.color,
            boxShadow: `inset 0 0 0 1px ${skill.color}20`
          }}
        >
          <div className="text-xl sm:text-2xl">{skill.icon}</div>
        </motion.div>
        
        {/* Label on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white/90 dark:bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              style={{ 
                border: `1px solid ${skill.color}20`,
                zIndex: 50
              }}
            >
              <div className="text-xs font-medium mb-1" style={{ color: skill.color }}>{skill.label}</div>
              <div className="text-[10px] max-w-[150px] text-black dark:text-white/80">{skill.description}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// Floating connector lines between badges and avatar
const ConnectorLines = ({ 
  skills, 
  isMobile 
}: { 
  skills: Array<{id: string; color: string}>;
  isMobile: boolean;
}) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * 2 * Math.PI;
        const radius = isMobile ? 110 : 160;
        const innerRadius = isMobile ? 60 : 80;
        
        // Calculate points
        const x1 = Math.cos(angle) * radius;
        const y1 = Math.sin(angle) * radius;
        const x2 = Math.cos(angle) * innerRadius;
        const y2 = Math.sin(angle) * innerRadius;
        
        return (
          <motion.line 
            key={skill.id}
            x1="0" 
            y1="0" 
            x2="0" 
            y2="0"
            stroke={`${skill.color}40`}
            strokeWidth="1"
            strokeDasharray="3 3"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1, 
              x1, y1, x2, y2,
              transition: { delay: 0.1 * index + 0.7, duration: 0.5 }
            }}
          />
        );
      })}
    </svg>
  );
};

// Circular progress with dynamic animation
const CircularProgress = ({ 
  progress = 75, 
  color = "#3b82f6",
  size = 190,
  strokeWidth = 2
}: {
  progress?: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      initial={{ opacity: 0, rotate: -90 }}
      animate={{ 
        opacity: 1,
        rotate: 0,
        transition: { duration: 1.5, ease: "easeOut", delay: 0.5 }
      }}
    >
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={`${color}20`}
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ 
          strokeDashoffset,
          transition: { duration: 2, ease: "easeOut", delay: 0.8 }
        }}
        style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
      />
    </motion.svg>
  );
};

export default function MinimalistAvatarWithBadges() {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Define skill badges with colors and descriptions
  const skills = [
    { 
      id: 'web', 
      label: 'Web Dev', 
      icon: <CodeIcon />, 
      description: 'Modern responsive web applications with Next.js & React',
      color: '#3b82f6' // blue
    },
    { 
      id: 'blockchain', 
      label: 'Blockchain', 
      icon: <FaEthereum />, 
      description: 'Blockchain architecture and distributed systems',
      color: '#8b5cf6' // purple
    },
    { 
      id: 'smart-contracts', 
      label: 'Smart Contracts', 
      icon: <SkillIconsSolidity className="text-primary" />, 
      description: 'Secure Solidity contract development and auditing',
      color: '#10b981' // green
    },
    { 
      id: 'web3', 
      label: 'Web3', 
      icon: <DeviconPlainWeb3js />, 
      description: 'Decentralized applications and web3 integration',
      color: '#f97316' // orange
    },
    { 
      id: 'ui-ux', 
      label: 'UI/UX', 
      icon: <LayersIcon />, 
      description: 'Intuitive interfaces with thoughtful user experiences',
      color: '#ec4899' // pink
    },
    { 
      id: 'global', 
      label: 'Consulting', 
      icon: <GlobeIcon />, 
      description: 'Technical consulting and strategic implementation',
      color: '#0ea5e9' // light blue
    }
  ];

  return (
    <div className="relative h-[400px] sm:h-[500px] flex items-center justify-center" ref={containerRef}>
 
      

      
      {/* Avatar in the center */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          transition: { 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }
        }}
      >
        <div className={`overflow-hidden ${isMobile ? 'w-32 h-32' : 'w-[360px] h-[500px]'} rounded-full`}>
          <div className="w-full h-full relative bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-0.5">
        
            
            <div className="relative h-full w-full rounded-full overflow-hidden border border-white/10">
              <Image 
                src="/profile/3.jpeg" 
                alt="Faizan Asad" 
                fill
                sizes="(max-width: 768px) 128px, 160px"
                className="object-cover"
                priority
                quality={100}
              />
            </div>
          </div>
        </div>
        

      </motion.div>
      
      {/* Skill badges around the avatar */}
      {skills.map((skill, index) => (
        <FloatingSkillBadge
          key={skill.id}
          skill={skill}
          index={index}
          total={skills.length}
          isHovered={hoveredBadge === skill.id}
          setHovered={(hovered) => setHoveredBadge(hovered ? skill.id : null)}
          isMobile={isMobile}
        />
      ))}
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30"
            initial={{
              x: Math.random() * (isMobile ? 300 : 500) - (isMobile ? 150 : 250),
              y: Math.random() * (isMobile ? 300 : 500) - (isMobile ? 150 : 250),
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5,
              backgroundColor: skills[i % skills.length].color
            }}
            animate={{
              x: Math.random() * (isMobile ? 300 : 500) - (isMobile ? 150 : 250),
              y: Math.random() * (isMobile ? 300 : 500) - (isMobile ? 150 : 250),
              opacity: [
                Math.random() * 0.2 + 0.1,
                Math.random() * 0.4 + 0.2,
                Math.random() * 0.2 + 0.1
              ]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>
    </div>
  );
}
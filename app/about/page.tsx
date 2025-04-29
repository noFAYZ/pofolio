"use client"

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Code,
  Box,
  Layers,
  Network,
  Wallet,
  Hexagon,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import MinimalProfile from './components/bio';

// Main About page component
const AboutPage = () => {

  return (
 

      
        <MinimalProfile />

  );
};

// Badge component for skills
const Badge = ({ children }) => (
  <div className="px-3 py-1 rounded-full text-xs font-medium bg-foreground/5 border border-foreground/10">
    {children}
  </div>
);

// Experience card component - more minimal
const ExperienceCard = ({ value, label, icon, delay }) => (
  <motion.div 
    className="p-5 rounded-2xl bg-foreground/[0.02] border border-foreground/5"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    whileHover={{ 
      y: -5, 
      backgroundColor: "rgba(var(--foreground-rgb), 0.03)",
      transition: { duration: 0.2 } 
    }}
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 rounded-full bg-foreground/[0.03]">
        {icon}
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
    <p className="text-xs text-muted-foreground">{label}</p>
  </motion.div>
);

// Tech stack component with minimal styling
const TechStack = ({ inView }) => {
  const technologies = [
    { name: "Ethereum", icon: <Hexagon className="w-5 h-5" /> },
    { name: "Solana", icon: <div className="w-5 h-5">S</div> },
    { name: "React", icon: <Code className="w-5 h-5" /> },
    { name: "Rust", icon: <div className="w-5 h-5">R</div> },
    { name: "Solidity", icon: <Box className="w-5 h-5" /> },
    { name: "Web3.js", icon: <Wallet className="w-5 h-5" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="space-y-4"
    >
      <h3 className="text-lg font-medium">Technical expertise</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-xl",
              "border border-foreground/5 bg-foreground/[0.01]",
              "hover:bg-foreground/[0.03] transition-colors"
            )}
          >
            <div className="mb-2">{tech.icon}</div>
            <span className="text-xs font-medium">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AboutPage;
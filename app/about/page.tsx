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

// Main About page component
const AboutPage = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  return (
    <div 
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative z-10"
    >
      {/* Subtle background element */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-foreground/5 blur-[100px] opacity-60" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-foreground/5 blur-[100px] opacity-60" />
      </div>
      
      <div className="max-w-4xl w-full space-y-16">
        {/* Header */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            About me
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Full stack blockchain developer with 4+ years experience
          </p>
        </motion.div>
        
        {/* Profile section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          {/* Profile image with subtle effect */}
          <motion.div
            className="lg:col-span-2 flex justify-center"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="relative h-56 w-56 sm:h-64 sm:w-64 rounded-full overflow-hidden border border-foreground/10">
                <img
                  src="/profile/3.jpeg"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <motion.div 
                className="absolute -inset-0.5 rounded-full z-[-1] opacity-0"
                animate={isInView ? { 
                  opacity: [0, 0.2, 0], 
                  scale: [0.8, 1.05, 0.8] 
                } : {}}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                style={{ 
                  background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)' 
                }}
              />
            </div>
          </motion.div>
          
          {/* Bio content */}
          <motion.div 
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              Full Stack Web3 Developer
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm a blockchain specialist with 4+ years of experience building decentralized applications and smart contracts across multiple ecosystems. My expertise spans EVM-compatible chains (Ethereum, Polygon, Avalanche) and Solana, with a focus on creating secure, efficient solutions.
              </p>
              
              <p>
                From DeFi protocols to NFT marketplaces and DAO governance systems, I've architected blockchain projects that combine technical excellence with intuitive interfaces, bridging the gap between complex blockchain technology and everyday users.
              </p>
            </div>
            
            {/* Skills tags */}
            <div className="flex flex-wrap gap-2">
              {["Smart Contracts", "DeFi", "NFTs", "DAOs", "Cross-chain"].map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
            
            {/* CTA button */}
            <div className="pt-4">
              <Button 
                className="group rounded-full border border-foreground/10 hover:border-foreground/20"
                variant="ghost"
              >
                <span>View Projects</span>
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Experience cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <ExperienceCard 
            value="4+" 
            label="Years Experience" 
            icon={<Layers className="w-5 h-5" />}
            delay={0.1}
          />
          <ExperienceCard 
            value="50+" 
            label="Projects" 
            icon={<Box className="w-5 h-5" />}
            delay={0.2}
          />
          <ExperienceCard 
            value="20+" 
            label="Smart Contracts" 
            icon={<Code className="w-5 h-5" />}
            delay={0.3}
          />
          <ExperienceCard 
            value="5+" 
            label="Blockchains" 
            icon={<Network className="w-5 h-5" />}
            delay={0.4}
          />
        </div>
        
        {/* Tech stack */}
        <TechStack inView={isInView} />
      </div>
    </div>
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
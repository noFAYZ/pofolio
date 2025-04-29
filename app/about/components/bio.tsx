"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircleIcon } from '@radix-ui/react-icons';

export default function MinimalProfile() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  
  useEffect(() => {
    setIsLoaded(true);
    controls.start("visible");
    
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [controls]);
  
  // Calculate spotlight position
  const spotlightX = mousePosition.x * 100;
  const spotlightY = mousePosition.y * 100;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full  mx-auto px-4 sm:px-6 py-12 md:py-24 min-h-screen flex flex-col justify-center z-20 "
      
    >

        {/* Text content section */}
        <div className="space-y-8 flex flex-col justify-center items-center">  
          
          <motion.div
              variants={itemVariants}
              className="flex items-center  gap-3"
            >
              <Badge  className=" rounded-full bg-lime-400 text-lime-800 px-4 py-1 text-sm font-medium flex items-center gap-2 hover:bg-lime-300">
                <span className="h-2 w-2 rounded-full bg-lime-800 animate-pulse"></span>
                Open to work
              </Badge>
            </motion.div>
          <div className="space-y-4 flex flex-col justify-center items-center">
        
            <motion.div 
              variants={itemVariants} 
              className="flex items-center gap-3"
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Hi, I'm
              </h1>
              <motion.div
              
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative overflow-hidden w-16 h-16 md:w-20 md:h-20 rounded-[2rem] border-2 border-black dark:border-white"
              >
                <Image
                  src="/profile/3.jpeg"
                  alt="Faizan Asad"
                  fill
                  className="object-cover"
              
                  priority
                  quality={80}
                />
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight relative">
                Faizan Asad!
                <motion.span 
                  className="absolute -top-1 -right-1 text-orange-500"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  *
                </motion.span>
              </h1>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-baseline gap-3">
              <p className="text-3xl md:text-5xl font-medium ">
                I'm a
              </p>
              <p className="text-3xl md:text-5xl font-bold text-gray-400 dark:text-primary bg-white px-3 py-2.5 rounded-2xl shadow-xl">
                Blockchain Developer
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex items-baseline gap-3 text-3xl md:text-5xl font-bold"
            >  &
              <p className="  text-3xl md:text-5xl font-bold text-gray-400 dark:text-primary bg-white px-3 py-2.5 rounded-2xl shadow-xl">
               Full Stack Developer
                <span className="text-orange-500">.</span>
              </p>
            </motion.div>
            
    
          </div>
          <div className="text-lg text-gray-300 dark:text-gray-300 max-w-2xl text-center space-y-4 bg-muted/60 py-6 px-4 rounded-[2rem] drop-shadow-md">
              <p>
                I'm a <span className=" font-bold text-gray-400 dark:text-primary bg-white px-1 py-0.5 rounded-lg shadow-xl">Web3</span> specialist with 4+ years of experience building decentralized applications and smart contracts across multiple ecosystems. My expertise spans EVM-compatible chains (Ethereum, Polygon, Avalanche) and Solana, with a focus on creating secure, efficient solutions.
              </p>
              
              <p>
                From DeFi protocols to NFT marketplaces/collections and DAO governance systems, I've architected blockchain projects that combine technical excellence with intuitive interfaces, bridging the gap between complex blockchain technology and everyday users.
              </p> 
              
              <motion.p 
            variants={itemVariants}
            className=" text-gray-400 dark:text-gray-300 max-w-2xl text-center"
          >
            Feel free to explore my portfolio and reach out
            — I'd love to connect and discuss your next project!
          </motion.p>
            </div>
          
         
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <Button 
              size="lg" 
              className="rounded-full bg-black text-white dark:bg-white dark:text-black text-base font-medium px-8 hover:scale-[1.01] transition-transform"
            >
              Book a call
            </Button>
            
            <Button 
  
             
              size="lg" 
              className="rounded-full border-2  text-base font-medium px-8 hover:scale-[1.01] transition-transform group bg-orange-500"
            >
              View portfolio
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Button>
          </motion.div>
        </div>
        

      
      {/* Credits and footer */}
      <motion.div 
        variants={itemVariants}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-sm text-gray-500 dark:text-gray-400 text-center"
      >
        * Currently specializing in Web3 development and decentralized applications
      </motion.div>
    </div>
  );
}
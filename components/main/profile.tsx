"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar } from "@/components/ui/avatar";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { 
  CodeIcon, 
  LayersIcon, 
  LaptopIcon, 
  GlobeIcon, 
  DownloadIcon 
} from '@radix-ui/react-icons';
import { FaGithub, FaEnvelope, FaFileDownload, FaUserAstronaut } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import GradualSpacing  from '../ui/gradual-spacing';
import { OcticonLogoGithub16 } from '@/components/icons/skill-icons';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import HandwrittenArrow from './HandWrittenArrow';
import { DownloadCloudIcon } from 'lucide-react';


export default function CreativeProfile() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const socialLinks = [
    { 
      icon: OcticonLogoGithub16, 
      href: "https://github.com/nofayz",
      label: "GitHub Profile" 
    },
    { 
      icon: LaptopIcon, 
      href: "/about", 
      label: "About Me"
    }
  ];

  const downloadResume = () => {
    window.open('/profile/resume.pdf', '_blank');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-[60rem]">
      {/* Profile Details */}
      <motion.div 
        className="flex flex-col items-center sm:items-start gap-6 sm:order-1 sm:w-1/2"
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        variants={container}
      >
        <motion.div className="flex flex-col items-center sm:items-start gap-2" variants={item}>
          <div className="relative">
            <span className="text-base sm:text-lg md:text-xl ">
              Hi <span className="inline-block animate-appearance-in">👋</span> I'm
            </span>
          </div>
          
    
          <motion.div 
            className="relative mt-2"
            variants={item}
          >
       
          
            <GradualSpacing
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold -tracking-widest text-black dark:text-white text-center"
            text="Faizan Asad"
          />
          <GradualSpacing
            className="text-sm sm:text-base md:text-lg lg:text-xl -tracking-widest text-black dark:text-white ml-1 text-center"
            text="Full Stack Web / Blockchain Developer"
          />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap gap-3 mt-4 justify-center sm:justify-start w-full"
          variants={item}
        >
          <Link href='/about' className="group">
            <Button 
              className="bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-100 text-md font-medium border"
              startContent={<FaUserAstronaut className="w-5 h-5" />}
              endContent={<HiExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
              radius="lg"
              
              size="md"
            >
              About me
            </Button>
          </Link>
          
          <Link href='https://github.com/nofayz' target='_blank'>
            <Button 
              className="bg-card backdrop-blur-sm "
              isIconOnly
              radius="lg"
              size="md"
            >
              <FaGithub className="w-5 h-5" />
            </Button>
          </Link>
          
          <Button 
            className="bg-card backdrop-blur-sm "
            isIconOnly
            radius="lg"
            size="md"
          >
            <FaEnvelope className="w-5 h-5" />
          </Button>
          
          <Button 
            className="bg-card backdrop-blur-sm group"
            onClick={downloadResume}
            endContent={<DownloadCloudIcon className="w-4 h-4 group-hover:translate-y-1 transition-transform" />}
            radius="lg"
            size="md"
          >
            Resume
          </Button>
        </motion.div>
      </motion.div>

      {/* Avatar with Service Arrows */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative flex items-center justify-center"
      >
        <Avatar className="w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-72 lg:h-96 border-4 border-primary/50">
          <img 
            src="/profile/3.jpeg" 
            alt="Faizan Asad" 
            className="object-cover rounded-full"
          />
        </Avatar>

        {/* Handwritten Service Arrows */}
        <HandwrittenArrow 
          direction="top" 
          title="Web Dev" 
        />
        <HandwrittenArrow 
          direction="right" 
          title="Blockchain" 
        />
        <HandwrittenArrow 
          direction="bottom" 
          title="Consulting" 
        />
        <HandwrittenArrow 
          direction="left" 
          title="Web3" 
        />
      </motion.div>

      


    </div>
  );
}
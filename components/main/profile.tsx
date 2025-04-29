"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
import { FaGithub, FaEnvelope, FaFileDownload, FaUserAstronaut, FaEthereum } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import GradualSpacing  from '../ui/gradual-spacing';
import { DeviconPlainWeb3js, DeviconSolidity, OcticonLogoGithub16, SkillIconsSolidity } from '@/components/icons/skill-icons';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import HandwrittenArrow from './HandWrittenArrow';
import { DownloadCloudIcon } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import EnhancedAvatar from './avatar-component';


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
            className="relative mt-2 text-center"
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
            {/* Floating skills indicators */}
            <AnimatePresence >
       
            {isLoaded && (
              <div className='flex gap-2 flex-wrap items-center justify-center '>
                <FloatingBadge
                  position="-left-4 top-1/4"
                  label="Web Dev"
                  icon={<CodeIcon />}
                  delay={0.5}
                />
                <FloatingBadge
                  position="right-0 top-10"
                  label="Blockchain"
                  icon={<FaEthereum />}
                  delay={0.8}
                />
                <FloatingBadge
                  position="-right-4 bottom-1/3"
                  label="Smart Contracts"
                  icon={<SkillIconsSolidity className='text-primary'/>}
                  delay={1.1}
                />
                <FloatingBadge
                  position="-left-2 bottom-10"
                  label="Web3"
                  icon={<DeviconPlainWeb3js />}
                  delay={1.4}
                />
              </div>
            )}
          </AnimatePresence>
        
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



          {/* Enhanced Avatar Component */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end z-10">
        <EnhancedAvatar />
      </div>


    </div>
  );
}

function FloatingBadge({ position, label, icon, delay = 0 }) {
  return (
    <motion.div
      className={`flex ${position} z-20`}
      initial={{ opacity: 0, scale: 0.8, x: 0 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay
      }}
    >
      <Badge className="px-3 py-1.5 flex items-center gap-1.5 backdrop-blur-md bg-white/80 dark:bg-black/80 shadow-lg border border-gray-200 dark:border-gray-800
      rounded-xl">
        <span className="text-orange-500">{icon}</span>
        <span className="text-xs font-medium">{label}</span>
      </Badge>
    </motion.div>
  );
}
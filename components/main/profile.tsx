<<<<<<< HEAD
"use client";
=======

import { Avatar, Button } from '@nextui-org/react'
import { EnvelopeClosedIcon, GitHubLogoIcon, LaptopIcon, PersonIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React, { useState } from 'react'
import { ArcticonsIntelligentCv, FxemojiAlien, HugeiconsBackpack03, HugeiconsLinkSquare01, OcticonLogoGithub16, PhReadCvLogoDuotone, SolarPhoneRoundedBold, StreamlineSendEmailSolid, SystemUiconsCloudDownload } from '../icons/skill-icons'
import  GradualSpacing  from '../ui/gradual-spacing'
import { PulsatingButton } from '../ui/pulsating-Button'
import { ShineBorder } from '../ui/shine-border'
import {ShinyButton}  from '../ui/shiny-button'
import { ArrowUpRight, Download, DownloadIcon, ExternalLink, Github, Mail, MessageSquare, Star, User2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { EnvelopeIcon } from '@sanity/icons'
import { cn } from '@/lib/utils'
>>>>>>> 7d7e71a4b9845189021b76949a2893667fa7c18b

import { useState, useEffect } from 'react';
import { Avatar, Button } from '@nextui-org/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaFileDownload, FaUserAstronaut } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import { GradualSpacing } from '../ui/gradual-spacing';
import Skills from './skills';

const Profile = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
      {/* Left side (Text) */}
      <motion.div 
        className="flex flex-col items-center sm:items-start gap-6 sm:order-1 sm:w-1/2"
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        variants={container}
      >
        <motion.div className="flex flex-col items-center sm:items-start gap-2" variants={item}>
          <div className="relative">
            <span className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
              Hi <span className="inline-block animate-bounce">👋</span> I'm
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
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 text-md font-medium"
              startContent={<FaUserAstronaut className="w-4 h-4" />}
              endContent={<HiExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
              radius="full"
              size="lg"
            >
              About me
            </Button>
          </Link>
          
          <Link href='https://github.com/nofayz' target='_blank'>
            <Button 
              className="bg-black/5 dark:bg-white/5 backdrop-blur-sm hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white shadow-sm border border-black/10 dark:border-white/10"
              isIconOnly
              radius="full"
              size="lg"
            >
              <FaGithub className="w-5 h-5" />
            </Button>
          </Link>
          
          <Button 
            className="bg-black/5 dark:bg-white/5 backdrop-blur-sm hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white shadow-sm border border-black/10 dark:border-white/10"
            isIconOnly
            radius="full"
            size="lg"
          >
            <FaEnvelope className="w-5 h-5" />
          </Button>
          
          <Button 
            className="bg-black/5 dark:bg-white/5 backdrop-blur-sm hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white shadow-sm border border-black/10 dark:border-white/10 group"
            onClick={downloadResume}
            endContent={<FaFileDownload className="w-4 h-4 group-hover:translate-y-1 transition-transform" />}
            radius="full"
            size="lg"
          >
            Resume
          </Button>
        </motion.div>
      </motion.div>

      {/* Right side (Avatar) */}
      <div 
        className="relative flex items-center justify-center sm:order-2 sm:w-1/2">
     
        
        <div 
          className="relative">
          <Avatar 
            isBordered 
            color="warning"
            src="/profile/3.jpeg" 
            className="w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-72 lg:h-96   "
          />
          
         
          
  
        </div>
     
      </div>
     
    </div>
  );
};

export default Profile;

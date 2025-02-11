
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

const downloadResume = () => {
  window.open('/profile/resume.pdf', '_blank')
}

const profile = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  return (
 <div className='flex flex-col sm:flex-row items-center justify-center gap-12 py-10 px-4 md:px-6 lg:px-8 max-w-5xl mx-auto'>
      <div className='flex flex-col items-center sm:items-end gap-8 sm:order-2 sm:w-1/2'>
        <Avatar 
          isBordered 
          color="default" 
          src="/profile/3.jpeg" 
          className='w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-72 lg:h-96'
        />
      </div>

 

      <div className='flex flex-col items-end justify-end sm:items-center sm:justify-end gap-4 sm:order-1 '>
  
     

        <div className="relative">


      <div className="flex flex-col items-end justify-end sm:items-center sm:justify-end gap-6 sm:order-1">
        {/* Introduction Section */}
        <div className="flex flex-col items-center md:items-start relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm mb-4"
          >
            <span className="text-base sm:text-lg md:text-xl">
              Hi <span className="wave inline-block">👋</span> I'm
            </span>
          </motion.div>

          <div className="relative">
            <GradualSpacing
              text="Faizan Asad"
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight  bg-clip-text "
              framerProps={{
                hidden: { opacity: 0, y: 20, rotate: -5 },
                visible: { opacity: 1, y: 0, rotate: 0 }
              }}
              duration={0.7}
            />
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-white/70 to-white/30 transform origin-left"
            />
          </div>

          <GradualSpacing
            text="Full Stack Web / Blockchain Developer"
            className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mt-4"
            framerProps={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
            delayMultiple={0.02}
          />
        </div>

        {/* Buttons Section */}
       
      
    <div className="w-full flex flex-col sm:flex-row items-center gap-3">
      {/* Primary Action Group */}
      <div className="flex-1 w-full">
        <div className="flex flex-wrap sm:flex-nowrap rounded-2xl bg-black 
                     border-2 border-orange-500/10 overflow-hidden backdrop-blur-sm">
          {/* About Button */}
          <Link href="/about" className="flex-1">
            <Button 
              className={cn(
                "w-full h-12",
                "rounded-none",
                "bg-gradient-to-r from-orange-500 to-pink-500",
                "text-white",
                "hover:shadow-lg hover:shadow-orange-500/20",
                "transition-all duration-300",
                "group"
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <div className="relative w-5 h-5">
                  <User2 className="absolute inset-0 transition-transform duration-300 
                                group-hover:-translate-y-6 group-hover:opacity-0" />
                  <span className="absolute inset-0 opacity-0 transition-transform duration-300 
                               translate-y-6 group-hover:translate-y-0 group-hover:opacity-100">
                    Me
                  </span>
                </div>
                <span className="font-medium">About</span>
              </div>
            </Button>
          </Link>

          {/* GitHub Button */}
          <Link 
            href="https://github.com/nofayz" 
            target="_blank" 
            className="flex-1"
          >
            <Button 
              className={cn(
                "w-full h-12",
                "rounded-none",
                "border-l border-orange-500/10",
                "hover:bg-muted/50",
                "transition-all duration-200 bg-black ",
                "group relative overflow-hidden"
              )}
            >
            
              <div className="relative flex items-center justify-center gap-2">
                <div className="relative">
                  <Github className="w-5 h-5 transition-transform duration-300 
                                 group-hover:rotate-12" />
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full 
                                bg-orange-500 opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300" />
                </div>
                <span className="font-medium">GitHub</span>
              </div>
            </Button>
          </Link>

          {/* Contact Button */}
          <Button 
            className={cn(
              "flex-1 w-full h-12",
              "rounded-none",
              "border-l border-orange-500/10",
              "hover:bg-muted/50",
              "transition-all duration-200",
              "group relative overflow-hidden"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 
                         via-pink-500/5 to-pink-500/10 opacity-0 
                         group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-2">
              <div className="relative w-5 h-5">
                <Mail className="absolute inset-0 transition-transform duration-300 
                             group-hover:scale-0 group-hover:rotate-180" />
                <ArrowUpRight className="absolute inset-0 scale-0 transition-transform 
                                     duration-300 group-hover:scale-100 group-hover:rotate-0" />
              </div>
              <span className="font-medium">Contact</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Download Button */}
      <Button 
        onClick={downloadResume}
        className={cn(
          "w-full sm:w-auto h-11 px-6",
          "rounded-2xl",
          "group relative overflow-hidden"
        )}
      >
        {/* Gradient Border */}
        <div className="absolute inset-0 p-[1px] rounded-2xl 
                     bg-gradient-to-r from-orange-500 to-pink-500">
          <div className="absolute inset-0 rounded-2xl bg-background 
                       transition-colors group-hover:bg-muted/50" />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-[1px] rounded-2xl 
                     bg-gradient-to-r from-orange-500 to-pink-500 
                     opacity-0 group-hover:opacity-10 
                     transition-opacity duration-300" />

        {/* Content */}
        <div className="relative flex items-center justify-center gap-3">
          <div className="p-1.5 rounded-lg bg-orange-500/10 
                       transition-colors group-hover:bg-orange-500/20">
            <Download className="w-4 h-4 text-orange-500 
                             transition-transform group-hover:translate-y-0.5" />
          </div>
          <span className="font-medium bg-gradient-to-r from-orange-500 to-pink-500 
                       bg-clip-text text-transparent">
            Resume
          </span>
        </div>
      </Button>
    </div>
 

      </div>
    </div>
      </div>
    </div>
  )
}
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  btn.style.setProperty('--mouse-x', `${x}px`);
  btn.style.setProperty('--mouse-y', `${y}px`);
};
export default profile
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { CodeIcon } from '@radix-ui/react-icons';
import { IconBriefcase, IconMail, IconSmartHome, IconUser } from '@tabler/icons-react';
import { CarbonBlog } from './icons/skill-icons';

const navItems = [
  { name: 'Home', href: '/', icon: IconSmartHome },
  { name: 'Projects', href: '/projects', icon: CodeIcon },
  { name: 'Blog', href: '/blog', icon: CarbonBlog },
  { name: 'About', href: '/about', icon: IconUser },
  { name: 'Contact', href: '/contact', icon: IconMail },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  // Track scroll position for translucency effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className="fixed top-6 left-1/2 z-40"
      initial={{ y: -100, x: '-50%' }}
      animate={{ y: 0, x: '-50%' }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20,
        delay: 0.1 
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div 
        className={cn(
          "relative backdrop-blur-md rounded-full border",
          "overflow-hidden flex items-center justify-center",
          "py-1.5 px-1.5 shadow-lg",
          scrolled ? "bg-background/85 border-border/30" : "bg-background border-border/20"
        )}
        animate={{ 
          boxShadow: hovered 
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Background pulse effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <ul className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavItem 
              key={item.name}
              item={item} 
              isActive={
                item.href === '/' 
                  ? pathname === '/'
                  : pathname.startsWith(item.href)
              } 
            />
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
}

function NavItem({ item, isActive }) {
  const Icon = item.icon;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      href={item.href} 
      className={cn(
        "relative group flex items-center justify-center",
        "rounded-full px-3 py-1.5 transition-all duration-300",
        isActive 
          ? "text-primary" 
          : "text-foreground/70 hover:text-foreground"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className={cn(
          "absolute inset-0 rounded-full -z-10",
          isActive ? "bg-primary/10" : "bg-transparent"
        )}
        animate={{ 
          scale: isHovered ? 1 : 0.95,
          opacity: isHovered || isActive ? 1 : 0 
        }}
        transition={{ duration: 0.2 }}
      />
      
      <motion.div
        className="flex items-center gap-2"
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <motion.div 
            animate={{ 
              y: isHovered && !isActive ? -2 : 0, 
              scale: isHovered ? 1.1 : 1 
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Icon className="w-[18px] h-[18px]" />
          </motion.div>
          
   
        </div>
        
        <AnimatePresence>
          <motion.span 
            className={cn(
              "text-sm font-medium origin-left",
              "hidden sm:block whitespace-nowrap"
            )}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.name}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}

export default Nav;
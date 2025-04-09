"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUp, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const [year] = useState(new Date().getFullYear());
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '#contact' }
  ];
  
  const socialLinks = [
    { name: 'Github', icon: <Github size={16} />, url: 'https://github.com/yourusername' },
    { name: 'LinkedIn', icon: <Linkedin size={16} />, url: 'https://linkedin.com/in/yourusername' },
    { name: 'Twitter', icon: <Twitter size={16} />, url: 'https://twitter.com/yourusername' }
  ];

  return (
    <footer className="border-t border-foreground/5 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and copyright */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-lg">YourName</span>
            </Link>
            <p className="text-xs text-muted-foreground mt-2">
              &copy; {year} All rights reserved
            </p>
          </div>
          
          {/* Center nav links - hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Right side - social + scroll to top */}
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            <div className="h-4 w-px bg-foreground/10 mx-1" />
            
            <Button
              onClick={scrollToTop}
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full bg-foreground/5 hover:bg-foreground/10"
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} />
            </Button>
          </div>
        </div>
        
        {/* Mobile nav - only visible on small screens */}
        <div className="mt-6 flex justify-center gap-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
"use client"

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Send, 
  CheckCircle, 
  Mail, 
  MapPin, 
  Copy
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ContactPage = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormState({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@yourwebsite.com');
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };

  // Social media links
  const socialLinks = [
    { 
      name: 'Github', 
      icon: <Github strokeWidth={1.5} />, 
      url: 'https://github.com/yourusername',
      color: 'group-hover:text-white group-hover:bg-black'
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin strokeWidth={1.5} />, 
      url: 'https://linkedin.com/in/yourusername',
      color: 'group-hover:text-white group-hover:bg-[#0077b5]'
    },
    { 
      name: 'Twitter', 
      icon: <Twitter strokeWidth={1.5} />, 
      url: 'https://twitter.com/yourusername',
      color: 'group-hover:text-white group-hover:bg-[#1DA1F2]'
    },
    { 
      name: 'Instagram', 
      icon: <Instagram strokeWidth={1.5} />, 
      url: 'https://instagram.com/yourusername',
      color: 'group-hover:text-white group-hover:bg-[#E1306C]'
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative z-10"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
        <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-foreground/[0.01] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-foreground/[0.01] to-transparent" />
      </div>
      
      <div className="max-w-6xl w-full">
        {/* Header */}
        <motion.div 
          className="text-center mb-16 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Get in touch
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="p-1 rounded-2xl">
              <div className="bg-muted/[0.61] border border-foreground/5 rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-medium mb-6">Send me a message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input 
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="bg-foreground/[0.02] border-foreground/10"
                      disabled={formStatus !== 'idle'}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="bg-foreground/[0.02] border-foreground/10"
                      disabled={formStatus !== 'idle'}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="Your message"
                      className="bg-foreground/[0.02] border-foreground/10 min-h-[120px]"
                      disabled={formStatus !== 'idle'}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className={cn(
                      "w-full sm:w-auto rounded-xl transition-all",
                      formStatus === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-foreground text-background'
                    )}
                    disabled={formStatus !== 'idle'}
                  >
                    {formStatus === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <LoadingSpinner /> Sending...
                      </span>
                    ) : formStatus === 'success' ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" /> Message sent
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" /> Send message
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
            
            {/* Decorative corner */}
            <div className="absolute -top-2 -left-2 w-5 h-5 border-t border-l border-foreground/20" />
            <div className="absolute -top-2 -right-2 w-5 h-5 border-t border-r border-foreground/20" />
            <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b border-l border-foreground/20" />
            <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b border-r border-foreground/20" />
          </motion.div>
          
          {/* Contact info and social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:pl-10 space-y-10"
          >
            {/* Direct contact details */}
            <div className="space-y-6">
              <h2 className="text-xl font-medium">Connect directly</h2>
              
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center gap-3 group bg-white/10 p-2 rounded-3xl"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="p-3 rounded-full bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Email</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">hello@yourwebsite.com</p>
                      <button 
                        onClick={copyEmail}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Copy email"
                      >
                        {copiedToClipboard ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3 group bg-white/10 p-2 rounded-3xl"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="p-3 rounded-full bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Location</h3>
                    <p className="text-sm text-muted-foreground">New York, USA</p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Social links */}
            <div className="space-y-6">
              <h2 className="text-xl font-medium">Follow me</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "relative overflow-hidden group",
                      "flex flex-col items-center justify-center p-4 rounded-3xl",
                      "border border-foreground/5 bg-white/[0.11]",
                      "hover:border-foreground/10 transition-colors",
                    )}
                    onMouseEnter={() => setHoveredSocial(social.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Hover background */}
                    <div className={cn(
                      "absolute inset-0 -z-10 opacity-0 transition-opacity duration-300",
                      "group-hover:opacity-100",
                      social.color
                    )} />
                    
                    <div className="mb-2 text-foreground/80 group-hover:text-current transition-colors">
                      {social.icon}
                    </div>
                    <span className="text-xs font-medium">{social.name}</span>
                    
                    {/* Interactive dot indicator */}
                    {hoveredSocial === social.name && (
                      <motion.div 
                        className="absolute bottom-1.5 h-1 w-1 rounded-full bg-current"
                        layoutId="socialIndicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Availability indicator */}
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-foreground/5 bg-white/[0.11]">
              <div className="relative">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <motion.div 
                  className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <p className="text-sm">Currently available for new projects</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Loading spinner component
const LoadingSpinner = () => (
  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default ContactPage;
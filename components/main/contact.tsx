"use client"

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Send,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ContactSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) return;
    
    setFormState('sending');
    // Simulate submission
    setTimeout(() => {
      setFormState('success');
      setEmail('');
      setMessage('');
      setTimeout(() => setFormState('idle'), 3000);
    }, 1000);
  };

  const socialLinks = [
    { name: 'Github', icon: <Github size={16} />, url: 'https://github.com/nofayz' },
    { name: 'LinkedIn', icon: <Linkedin size={16} />, url: 'https://linkedin.com/in/fayzan-asad' },
    { name: 'Twitter', icon: <Twitter size={16} />, url: 'https://twitter.com/_thedarkmatter' },
  ];

  return (
    <section 
      ref={containerRef}
      id="contact"
      className="py-12 relative"
    >
      {/* Subtle divider */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
      
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-foreground/10 bg-foreground/[0.01] backdrop-blur-sm overflow-hidden"
        >
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-start">
              {/* Left column */}
              <div className="sm:w-5/12">
                <h2 className="text-xl font-medium mb-3">Let's connect</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Have a project in mind? Drop me a line. I'm currently available for new opportunities.
                </p>
                
                {/* Social links as simple inline icons */}
                <div className="flex gap-4 items-center">
                  <span className="text-xs text-muted-foreground">Find me on</span>
                  <div className="h-px w-8 bg-foreground/10" />
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
                
                {/* Availability indicator */}
                <div className="mt-6 flex items-center">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs">Available for work</span>
                </div>
              </div>
              
              {/* Right column - Compact form */}
              <div className="sm:w-7/12 w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={formState !== 'idle'}
                    required
                    className="bg-transparent border-foreground/10 focus:border-foreground/20 h-9 placeholder:text-muted-foreground/50"
                  />
                  
                  <div className="relative">
                    <Input
                      className="bg-transparent border-foreground/10 focus:border-foreground/20 h-9 pr-24 placeholder:text-muted-foreground/50"
                      placeholder="Your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={formState !== 'idle'}
                      required
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={formState !== 'idle'}
                      className={cn(
                        "absolute right-0.5 top-0.5 bottom-0.5 px-3 rounded-md transition-all",
                        formState === 'success' ? 'bg-green-500 text-white' : 'bg-foreground/10 hover:bg-foreground/20'
                      )}
                    >
                      {formState === 'sending' ? (
                        <span className="flex items-center gap-1">
                          <LoadingSpinner />
                        </span>
                      ) : formState === 'success' ? (
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-xs">Sent</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <span className="text-xs">Send</span>
                          <ArrowRight size={12} />
                        </span>
                      )}
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    No spam, just a reply to your message.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Minimal loading spinner component
const LoadingSpinner = () => (
  <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default ContactSection;
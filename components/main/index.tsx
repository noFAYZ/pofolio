"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box, ChevronDown, Code, Layers, Network } from "lucide-react";
import Profile from "./profile";
import Portfolio from "../ProjectCard";
import Articles from "../blocks/articles";
import { Skills } from "./skills";
import ContactSection from "./contact";
import Footer from "./footer";
import CircleScrollIndicator from "./scroll-indicator";

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return isVisible ? (
    <motion.div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-30"
      onClick={scrollToNextSection}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ 
        y: [0, 10, 0], 
        opacity: 1 
      }}
      transition={{ 
        y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }}
    >
      <div className="flex flex-col items-center backdrop-blur-sm px-4 py-2 ">
        <p className="text-white/90 font-medium text-sm mb-1">Scroll Down</p>
        <ChevronDown className="w-5 h-5 text-orange-400" />
      </div>
    </motion.div>
  ) : null;
};

export const MainPage = () => {
  return (
    <div className="flex flex-col justify-center w-full z-10">
      {/* Hero section */}
      <section 
        className="min-h-screen flex flex-col md:flex-row items-center justify-center"
      
      >
        <Profile />

             
        {/* Experience cards */}
        <div className="md:absolute flex md:flex-col right-12 gap-4 sm:gap-6">
          <ExperienceCard 
            value="4+" 
            label="Years Experience" 
            icon={<Layers className="w-5 h-5" />}
            delay={0.1}
          />
          <ExperienceCard 
            value="23+" 
            label="Projects" 
            icon={<Box className="w-5 h-5" />}
            delay={0.2}
          />
          <ExperienceCard 
            value="14+" 
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
    
        <CircleScrollIndicator />
      </section>

      {/* Skills section 
      <motion.section 
        className="py-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            My Skills
          </motion.h2>
          <Skills />
        </div>
      </motion.section>*/}

      {/* Portfolio section */}
      <motion.section 
        className="min-h-screen py-20 px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Portfolio
          </motion.h2>
          <Portfolio />
        </div>
      </motion.section>

      {/* Articles section */}
      <motion.section 
        className="py-20 px-4 mb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Articles
          </motion.h2>
          <Articles limit={2} />
        </div>
      </motion.section>


       {/* Articles section */}
       <motion.section 
        className="py-20 px-4 mb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto">
  
          <ContactSection  />
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default MainPage;

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
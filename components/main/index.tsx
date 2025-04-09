"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
        className="min-h-screen flex items-center justify-center"
      
      >
        <Profile />
    
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
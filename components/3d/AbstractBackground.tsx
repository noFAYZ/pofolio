"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

const AbstractBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-black "
    >

      
      {/* 3D Objects */}
      <div className="absolute inset-0">
        {/* Main abstract shape 1 */}
        <motion.div 
          className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-pink-500/50 to-orange-500/50 opacity-60 blur-[120px]"
          animate={{
            x: ['-20%', '10%', '-15%', '-20%'],
            y: ['10%', '20%', '15%', '10%'],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            x: `calc(30% + ${mousePosition.x * 20}px)`,
            y: `calc(30% + ${mousePosition.y * 20}px)`,
          }}
        />


        {/* Additional orange-pink element */}
        <motion.div 
          className="absolute w-[35vw] h-[35vw] rounded-full bg-gradient-to-r from-orange-500 to-pink-500 opacity-40 blur-[90px]"
          animate={{
            x: ['40%', '30%', '45%', '40%'],
            y: ['20%', '30%', '15%', '20%'],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            x: `calc(50% - ${mousePosition.x * 40}px)`,
            y: `calc(70% - ${mousePosition.y * 20}px)`,
          }}
        />
      </div>
      
      {/* Interactive light elements */}
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-pink-400 mix-blend-screen opacity-80 blur-xl"
        style={{
          left: `calc(50% + ${mousePosition.x * 400}px)`,
          top: `calc(50% + ${mousePosition.y * 400}px)`,
        }}
      />
      
      <motion.div
        className="absolute w-12 h-12 rounded-full bg-purple-300 mix-blend-screen opacity-70 blur-md"
        style={{
          left: `calc(50% + ${mousePosition.x * 200}px)`,
          top: `calc(50% + ${mousePosition.y * 200}px)`,
        }}
      />
      
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-orange-300 mix-blend-screen opacity-60 blur-lg"
        style={{
          left: `calc(50% - ${mousePosition.x * 300}px)`,
          top: `calc(50% - ${mousePosition.y * 300}px)`,
        }}
      />
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white mix-blend-screen"
          style={{
            width: Math.random() * 4 + 1 + 'px',
            height: Math.random() * 4 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Depth enhancing overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-900/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-pink-900/5 to-transparent pointer-events-none" />
      
      {/* Fine detail noise texture */}
      <div className="absolute inset-0 opacity-30 mix-blend-soft-light bg-repeat" 
        style={{ 
          backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAA30lEQVRoge3YMQ7CMBBEUb4MLeeg5D65GrWlJQUFHZKNrYRnJKQUb36+cZELXYn8MIY+jGEuxpi7tV7v95z5C7Z8pmY95/O41vpijBljmKbpoxq11hmCjmJ0kXIXoYuMsyg6yDyLIEPmWQQZMs8iyJB5FkGGzLMIMmSeRZAh8yyCDJlnEWTIPIsgQ+ZZBBkyz9JFQu4iuQXIXSS3AL0o/hdkCPK+KPLeMXKvWrmvKLkLcu7LYu4fKPkfjfmX8z9MQxjDNIQxTEMYwzSEMUwjz+d175f1/Otzttbzfe8X9ZiGMIZpvAHXsU+S/aXMaQAAAABJRU5ErkJggg==)'
        }}
      />
    </div>
  );
};

export default AbstractBackground;
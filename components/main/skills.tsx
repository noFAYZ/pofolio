'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { skillSet } from "@/lib/skills-data";
import { cn } from "@/lib/utils";

export function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState(Object.keys(skillSet)[0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position for particle effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-7xl mx-auto py-20 px-4 relative overflow-hidden"
    >
      {/* Abstract background element */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/5 to-primary/10 blur-3xl opacity-30" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-2xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-primary/5 blur-xl opacity-20" />
      </div>
      
      {/* Category orbits */}
      <motion.div 
        className="flex justify-center mb-16"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="w-[300px] h-[60px] relative">
            {Object.keys(skillSet).map((category, index) => {
              // Calculate position on an elliptical orbit
              const theta = (index / Object.keys(skillSet).length) * Math.PI * 2;
              const x = 120 * Math.cos(theta);
              const y = 20 * Math.sin(theta);
              
              return (
                <OrbitingCategoryButton
                  key={category}
                  category={category}
                  isActive={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  x={x}
                  y={y}
                  index={index}
                />
              );
            })}
            
            {/* Central focus point */}
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Skill constellation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative min-h-[300px]"
        >
          <ConstellationSkills 
            skills={skillSet[activeCategory]} 
            mousePosition={mousePosition}
            inView={isInView}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Orbiting category button
const OrbitingCategoryButton = ({ category, isActive, onClick, x, y, index }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x, y }}
      animate={{ 
        opacity: 1, 
        x, 
        y,
        scale: isActive ? 1.1 : 1,
      }}
      transition={{ 
        duration: 0.3,
        delay: index * 0.1,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "px-3 py-1 rounded-full text-xs font-medium transition-colors",
        "border border-primary/20 backdrop-blur-sm",
        isActive 
          ? "bg-primary/10 text-primary shadow-sm shadow-primary/5" 
          : "bg-background/50 text-muted-foreground hover:text-foreground"
      )}
    >
      {category}
    </motion.button>
  );
};

// Constellation of skills
const ConstellationSkills = ({ skills, mousePosition, inView }) => {
  // Create a unique pattern of positions for each skill
  const positions = skills.map((_, i) => {
    const angleStep = (2 * Math.PI) / skills.length;
    const radius = 100 + (i % 3) * 50; // Vary radius to create depth
    const angle = i * angleStep + Math.random() * 0.5; // Add slight randomness
    
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
      size: 1 + Math.random() * 0.5 // Vary the size slightly
    };
  });

  return (
    <div className="relative w-full h-[450px]">
      {/* Connection lines between skills */}
      <svg className="absolute top-0 left-0 w-full h-full">
        <g transform="translate(50%, 50%)">
          {positions.map((pos, i) => {
            // Connect each skill to 1-2 nearby skills
            const connections = [];
            for (let j = 0; j < positions.length; j++) {
              // Skip self-connections and limit connections
              if (i === j || connections.length >= 2) continue;
              
              // Only connect to somewhat nearby nodes
              const distance = Math.sqrt(
                Math.pow(positions[j].x - pos.x, 2) + 
                Math.pow(positions[j].y - pos.y, 2)
              );
              
              if (distance < 150) {
                connections.push(
                  <motion.line
                    key={`line-${i}-${j}`}
                    x1={pos.x}
                    y1={pos.y}
                    x2={positions[j].x}
                    y2={positions[j].y}
                    stroke="currentColor"
                    strokeOpacity="0.1"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { 
                      pathLength: 1,
                      opacity: 0.3
                    } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                  />
                );
              }
            }
            return connections;
          })}
        </g>
      </svg>
      
      {/* Skill nodes */}
      {skills.map((skill, i) => (
        <SkillNode 
          key={skill.id}
          skill={skill}
          position={positions[i]}
          index={i}
          mousePosition={mousePosition}
          inView={inView}
        />
      ))}
    </div>
  );
};

// Individual skill node
const SkillNode = ({ skill, position, index, mousePosition, inView }) => {
  const nodeRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [nodePosition, setNodePosition] = useState({ x: 0, y: 0 });
  
  // Calculate the distance from mouse to determine magnetic pull
  useEffect(() => {
    if (!nodeRef.current) return;
    
    const rect = nodeRef.current.getBoundingClientRect();
    setNodePosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
  }, [mousePosition]);
  
  // Calculate attraction to mouse when nearby
  const distance = Math.sqrt(
    Math.pow(mousePosition.x - nodePosition.x, 2) + 
    Math.pow(mousePosition.y - nodePosition.y, 2)
  );
  
  const magneticPull = distance < 150 ? Math.min(10, 150 / distance) : 0;
  const pullAngle = Math.atan2(
    mousePosition.y - nodePosition.y,
    mousePosition.x - nodePosition.x
  );
  
  const magneticX = magneticPull * Math.cos(pullAngle);
  const magneticY = magneticPull * Math.sin(pullAngle);
  
  return (
    <motion.div
      ref={nodeRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
      initial={{ opacity: 0, x: position.x, y: position.y }}
      animate={{ 
        opacity: 1,
        x: position.x + magneticX, 
        y: position.y + magneticY,
        transition: {
          opacity: { duration: 0.3, delay: index * 0.05 },
          x: { duration: 0.3 },
          y: { duration: 0.3 },
        }
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulsing background */}
      <AnimatePresence>
        {hovered && (
          <motion.div 
            className="absolute inset-0 bg-primary/20 rounded-full blur-md -z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: [1, 1.2, 1],
              transition: {
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
            exit={{ opacity: 0, scale: 0.8 }}
          />
        )}
      </AnimatePresence>
      
      {/* Icon */}
      <motion.div
        className="relative bg-background/80 backdrop-blur-sm p-3 rounded-full border border-primary/20"
        animate={{ 
          scale: hovered ? 1.1 : position.size,
          boxShadow: hovered ? "0 0 20px rgba(var(--primary), 0.3)" : "none"
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-5 h-5 text-primary/90">
          {skill.icon}
        </div>
      </motion.div>
      
      {/* Skill name */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 5 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border border-primary/10 shadow-sm"
          >
            <span className="text-xs whitespace-nowrap font-medium">{skill.name}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Skills;
"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// Advanced path generation with artistic flair
const generateArtisticPath = (direction: 'top' | 'right' | 'bottom' | 'left') => {
  const randomCurve = (basePoints: number[]) => {
    // Create a more expressive, almost organic curve
    const curviness = 20; // Higher value means more dramatic curves
    const controlPoints = basePoints.map(point => 
      point + (Math.random() * curviness * 2 - curviness)
    );

    return {
      start: [basePoints[0], basePoints[1]],
      control1: [controlPoints[0], controlPoints[1]],
      control2: [controlPoints[2], controlPoints[3]],
      end: [basePoints[4], basePoints[5]]
    };
  };

  const pathStyles = {
    top: randomCurve([50, 90, 30, 60, 50, 20]),
    right: randomCurve([10, 50, 60, 30, 90, 50]),
    bottom: randomCurve([50, 10, 70, 40, 50, 90]),
    left: randomCurve([90, 50, 40, 70, 10, 50])
  };

  const currentStyle = pathStyles[direction];

  // Create a more complex, artistic path
  const path = `
    M${currentStyle.start[0]} ${currentStyle.start[1]}
    C${currentStyle.control1[0]} ${currentStyle.control1[1]}, 
      ${currentStyle.control2[0]} ${currentStyle.control2[1]}, 
      ${currentStyle.end[0]} ${currentStyle.end[1]}
    Q${currentStyle.end[0] + (Math.random() * 10 - 5)} ${currentStyle.end[1] + (Math.random() * 10 - 5)}, 
      ${currentStyle.end[0] + (Math.random() * 15 - 7)} ${currentStyle.end[1] + (Math.random() * 15 - 7)}
  `;

  return {
    path,
    titlePoint: {
      x: currentStyle.end[0],
      y: currentStyle.end[1]
    }
  };
};

interface CreativeArrowProps {
  direction: 'top' | 'right' | 'bottom' | 'left';
  title: string;
  className?: string;
}

const CreativeArrow: React.FC<CreativeArrowProps> = ({ 
  direction, 
  title, 
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Generate unique, artistic path
  const { path, titlePoint } = useMemo(() => generateArtisticPath(direction), [direction]);

  // Dynamic positioning with artistic variation
  const positionStyles = {
    top: { 
      position: 'absolute', 
      top: '-140px', 
      left: '50%', 
      transform: 'translateX(-50%) rotate(-4deg) skew(-5deg)' 
    },
    right: { 
      position: 'absolute', 
      right: '-160px', 
      top: '50%', 
      transform: 'translateY(-50%) rotate(4deg) skew(5deg)' 
    },
    bottom: { 
      position: 'absolute', 
      bottom: '-140px', 
      left: '50%', 
      transform: 'translateX(-50%) rotate(4deg) skew(-5deg)' 
    },
    left: { 
      position: 'absolute', 
      left: '-160px', 
      top: '50%', 
      transform: 'translateY(-50%) rotate(-4deg) skew(5deg)' 
    }
  };

  // Determine title positioning with artistic offset
  const getTitlePosition = () => {
    const offsetMap = {
      top: { x: titlePoint.x, y: titlePoint.y - 10 },
      right: { x: titlePoint.x + 10, y: titlePoint.y },
      bottom: { x: titlePoint.x, y: titlePoint.y + 10 },
      left: { x: titlePoint.x - 10, y: titlePoint.y }
    };
    return offsetMap[direction];
  };

  const titlePosition = getTitlePosition();

  return (
    <motion.div
      className={`-z-10 text-foreground ${className}`}
      style={positionStyles[direction]}
      initial={{ 
        opacity: 0, 
        scale: 0.7,
        rotate: 20
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotate: 0
      }}
      whileHover={{ 
        scale: 1.1,
        transition: { 
          type: 'spring', 
          stiffness: 300 
        }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <svg 
        width="200" 
        height="200" 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Artistic Gradient Definitions */}
        <defs>
          <linearGradient id="artisticGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(220,220,220,0.8)" />
          </linearGradient>
          
          {/* Creative Texture Filter */}
          <filter id="artisticTexture">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.05" 
              numOctaves="3" 
              result="turbulence"
            />
            <feDisplacementMap 
              in2="turbulence" 
              in="SourceGraphic" 
              scale="3" 
              xChannelSelector="R" 
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {/* Artistic Path with Texture and Gradient */}
        <motion.path 
          d={path}
          stroke="url(#artisticGradient)"
          strokeWidth="6" 
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#artisticTexture)"
          initial={{ 
            pathLength: 0,
            opacity: 0.5
          }}
          animate={{ 
            pathLength: 1,
            opacity: 1
          }}
          transition={{
            duration: 0.7,
            ease: "easeInOut"
          }}
        />
      </svg>

      {/* Artistic Title Placement */}
      <motion.div 
        className="absolute text-sm font-bold tracking-wider text-center text-white"
        style={{
          left: `${titlePosition.x}%`,
          top: `${titlePosition.y}%`,
          transform: 'translate(-50%, -50%) rotate(-5deg)',
          textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
          perspective: '100px'
        }}
        animate={{
          opacity: isHovered ? 1 : 0.7,
          scale: isHovered ? 1.2 : 1,
          rotateX: isHovered ? 10 : 0
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 300 
        }}
      >
        {title}
      </motion.div>
    </motion.div>
  );
};

export default CreativeArrow;
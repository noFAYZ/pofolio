'use client'

import { cn } from '@/lib/utils'
import type { Variants } from 'framer-motion'
import { AnimatePresence, motion } from 'framer-motion'


interface GradualSpacingProps {
   text: string;
   duration?: number;
   delayMultiple?: number;
   framerProps?: any;
   className?: string;
 }
 
const GradualSpacing = ({
   text,
   duration = 0.5,
   delayMultiple = 0.04,
   framerProps = {
     hidden: { opacity: 0, y: -20 },
     visible: { opacity: 1, y: 0 },
   },
   className,
 }: GradualSpacingProps) => {
   return (
     <div className="flex space-x-1">
       <AnimatePresence>
         {text.split('').map((char, i) => (
           <motion.span
             key={i}
             initial="hidden"
             animate="visible"
             exit="hidden"
             variants={framerProps}
             transition={{ 
               duration, 
               delay: i * delayMultiple,
               type: "spring",
               stiffness: 200,
               damping: 10
             }}
             className={cn('drop-shadow-sm', className)}
           >
             {char === ' ' ? '\u00A0' : char}
           </motion.span>
         ))}
       </AnimatePresence>
     </div>
   );
 };

 export default GradualSpacing
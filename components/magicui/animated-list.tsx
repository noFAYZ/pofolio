"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface AnimatedListProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  itemsPerRow?: number;
}

export const AnimatedList = React.memo(
  ({ className, children, delay = 1000, itemsPerRow: propItemsPerRow = 8 }: AnimatedListProps) => {
    const [displayedItems, setDisplayedItems] = useState<React.ReactNode[]>([]);
    const [itemsPerRow, setItemsPerRow] = useState(propItemsPerRow);
    const childrenArray = React.Children.toArray(children);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 640) {
          setItemsPerRow(3);
        } else if (window.innerWidth < 768) {
          setItemsPerRow(4);
        } else if (window.innerWidth < 1024) {
          setItemsPerRow(6);
        } else {
          setItemsPerRow(propItemsPerRow);
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [propItemsPerRow]);

    useEffect(() => {
      if (displayedItems.length < childrenArray.length) {
        const timer = setTimeout(() => {
          setDisplayedItems(prev => [
            ...prev,
            childrenArray[prev.length]
          ]);
        }, delay);

        return () => clearTimeout(timer);
      }
    }, [displayedItems.length, childrenArray, delay]);

    const rows = [];
    for (let i = 0; i < displayedItems.length; i += itemsPerRow) {
      rows.push(displayedItems.slice(i, i + itemsPerRow));
    }

    return (
      <div className={`flex flex-col justify-center md:justify-start  gap-2 sm:gap-3 md:gap-4 ${className}`}>
        <AnimatePresence>
          {rows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="flex flex-row items-center justify-center md:justify-start gap-2 sm:gap-3 md:gap-4 overflow-x-auto no-scrollbar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {row.map((item, index) => (
                <AnimatedListItem key={(item as ReactElement).key || `${rowIndex}-${index}`}>
                  {item}
                </AnimatedListItem>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="flex-shrink-0 overflow-hidden">
      {children}
    </motion.div>
  );
}

export default AnimatedList;
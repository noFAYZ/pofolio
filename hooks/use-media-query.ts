// hooks/use-media-query.ts
"use client";

import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  // Initialize with null during SSR
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    // Now we're on the client, we can check the media query
    const mediaQuery = window.matchMedia(query);
    
    // Set the initial value now that we're client-side
    setMatches(mediaQuery.matches);
    
    // Define our event listener
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add the event listener
    mediaQuery.addEventListener('change', handleChange);
    
    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  // Return false during SSR, and the actual value once on the client
  return matches === null ? false : matches;
};

export default useMediaQuery;
"use client";
import "@/styles/globals.css";
import { Nav } from "@/components/Nav";
import { Providers } from "./providers";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconBrandDocker, IconBrandFacebook, IconUser } from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import Meteors from "@/components/magicui/meteors";
import FlickeringGrid from "@/components/magicui/flickering-grid";
import { cn } from "@/lib/utils";
import { OcticonLogoGithub16 } from "@/components/icons/skill-icons";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

const navItems = [{
  title: "Github Profile",
  href: '#github',
  icon: <GitHubLogoIcon height={25} width={25} />,
},{
  title: "Instagram",
  href: '#insta',
  icon: <InstagramLogoIcon height={25} width={25}/>,
}]

// Updated DotPattern component
const DotPattern = ({ className, ...props }) => (
  <svg
    className={cn("absolute inset-0 h-full w-full", className)}
    {...props}
  >
    <pattern
      id="dot-pattern"
      x="0"
      y="0"
      width="16"
      height="16"
      patternUnits="userSpaceOnUse"
    >
      <circle cx="1" cy="1" r="1" fill="currentColor" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#dot-pattern)" />
  </svg>
);

const YouTubeBackground = ({ videoId, defaultVolume = 10 }) => {
  const playerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(defaultVolume);

  useEffect(() => {
    // Load the YouTube IFrame Player API code asynchronously
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Create YouTube player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          showinfo: 0,
          mute: 1,
          loop: 1,
          playlist: videoId
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
            event.target.setVolume(volume);
          }
        }
      });
    };

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, volume]);

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (playerRef.current && !isMuted) {
      playerRef.current.setVolume(newVolume);
    }
  };

  return (
    <>
      <div className="absolute inset-0 pointer-events-none">
        <div id="youtube-player" className="w-full h-full"></div>
      </div>
      <div className="absolute bottom-4 right-4 z-50 flex items-center space-x-4">
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-32"
        />
        <button 
          onClick={toggleMute} 
          className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black px-4 py-2 rounded-full transition-all duration-200 ease-in-out"
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </div>
    </>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const isVideoBg= true;
  const youtubeVideoId = "qoVHupBCTMY";

  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="relative flex min-h-screen w-full items-center justify-center bg-background overflow-hidden">
       
            <FloatingDock items={navItems} desktopClassName="z-10" />
            <Nav />
            {children}
            {isVideoBg ? <>   <YouTubeBackground videoId={youtubeVideoId} /></> : <>  <Meteors number={10} />
            <DotPattern
              className={cn(
                "text-neutral-400/80 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
              )}
            /></>

            }
          
          </div>
        </Providers>
      </body>
    </html>
  );
}
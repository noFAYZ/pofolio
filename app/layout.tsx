"use client";
import "@/styles/globals.css";
import { Nav } from "@/components/Nav";
import { Providers } from "./providers";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconBrandDocker, IconUser } from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import Meteors from "@/components/magicui/meteors";
import FlickeringGrid from "@/components/magicui/flickering-grid";
import { cn } from "@/lib/utils";

const navItems = [{
  title: "About",
  href: '#about',
  icon: <IconUser />,
},{
  title: "Skills",
  href: '#skills',
  icon: <IconBrandDocker />,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="relative flex min-h-screen w-full items-center justify-center bg-background overflow-hidden">
            <FloatingDock items={navItems} />
            <Nav />
            {children}
            <Meteors number={10} />
            <DotPattern
              className={cn(
                "text-neutral-400/80 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
              )}
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CodeIcon, LaptopIcon } from '@radix-ui/react-icons';
import { IconBriefcase, IconMail, IconUser } from '@tabler/icons-react';
import { ModeToggle } from './ModeToggle';
import { CarbonBlog } from './icons/skill-icons';


const navItems = [
  { name: 'Home', href: '/', icon: LaptopIcon },
  { name: 'Projects', href: '/projects', icon: CodeIcon },
  { name: 'Blog', href: '/blog', icon: CarbonBlog },
  { name: 'About', href: '/about', icon: IconUser },
  { name: 'Contact', href: '/contact', icon: IconMail },

];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-12 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white backdrop-blur-md rounded-full border border-border px-2 py-2 shadow-lg">
        <ul className="flex space-x-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavItem 
  item={item} 
  isActive={
    item.href === '/' 
      ? pathname === '/'
      : pathname.startsWith(item.href)
  } 
/>
            </li>
          ))}
          <ModeToggle />
        </ul>
      </div>
    </nav>
  );
}

function NavItem({ item, isActive }) {
  const Icon = item.icon;
  
  return (
    <Link href={item.href} passHref>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        size="sm"
        className={cn(
          "relative px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-0",
          isActive
            ? "bg-muted text-foreground rounded-full"
            : "dark:text-background hover:text-foreground hover:bg-transparent",
          "border-none"
        )}
      >
        <motion.span
          className="flex items-center gap-2"
          whileTap={{ scale: 0.95 }}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{item.name}</span>
        </motion.span>
      </Button>
    </Link>
  );
}

export default Nav;
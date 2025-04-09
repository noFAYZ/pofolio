'use client'

import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion, useInView, useMotionTemplate, useMotionValue } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, 
  ChevronRight, 
  Github, 
  Image as ImageIcon, 
  ExternalLink,
  X, 
  Filter,
  Sparkles,
  SaveAllIcon,
  ListXIcon,
  StarsIcon
} from 'lucide-react'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { DeviconNextjs, RiNftFill, UnjsUncrypto } from './icons/skill-icons'

// Skeleton loader for project cards during initial load or filtering
const CardSkeleton = () => (
  <div className="rounded-xl overflow-hidden bg-muted/5 animate-pulse">
    <div className="h-60 bg-muted/10"></div>
    <div className="p-4 space-y-3">
      <div className="h-6 bg-muted/10 rounded-md w-3/4"></div>
      <div className="h-4 bg-muted/10 rounded-md w-full"></div>
      <div className="flex gap-2 pt-2">
        <div className="h-5 bg-muted/10 rounded-full w-12"></div>
        <div className="h-5 bg-muted/10 rounded-full w-16"></div>
      </div>
    </div>
  </div>
)

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  tags: string[]
  projectUrl: string
  githubUrl: string
  index: number
}

export function ProjectCard({ 
  title,
  description,
  imageUrl,
  tags,
  projectUrl,
  githubUrl,
  index
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })
  
  // Mouse position tracking for spotlight effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }
  
  const handleImageLoad = () => setIsLoaded(true)
  const handleImageError = () => setImageError(true)
  
  // Create spotlight gradient that follows mouse
  const spotlightSize = 300
  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      ${spotlightSize}px circle at ${mouseX}px ${mouseY}px,
      rgba(var(--spotlight-color)/0.15),
      transparent 80%
    )
  `
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1, 
        ease: [0.22, 1, 0.36, 1]
      }}
      className="h-full"
    >
      <Card
        onMouseMove={handleMouseMove}
        style={{ "--spotlight-color": "255 255 255" } as React.CSSProperties}
        className={cn(
          "group relative h-full overflow-hidden border bg-card",
          "hover:shadow-md transition-all duration-100",
          "flex flex-col rounded-[3rem]"
        )}
      >
        {/* Spotlight effect overlay */}
        <motion.div 
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-100 group-hover:opacity-100"
          style={{ background: spotlightBackground }}
        />
        
        {/* Card content with glass effect */}
        <div className="relative flex flex-col h-full backdrop-blur-[2px] backdrop-saturate-150 z-10">
          {/* Image section */}
          <div className="relative overflow-hidden h-60">
            {!isLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-muted/5 flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
              </div>
            )}
            
            {imageError ? (
              <div className="h-full w-full bg-gradient-to-br from-primary/5 to-muted/5 flex items-center justify-center">
                <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
              </div>
            ) : (
              <>
                <motion.img 
                  src={imageUrl} 
                  alt={title}
                  className={cn(
                    "h-full w-full object-cover",
                    "transition-all duration-500 ease-out",
                    "group-hover:scale-105 group-hover:brightness-110",
                    !isLoaded && "opacity-0"
                  )}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={isLoaded ? { scale: 1, opacity: 1 } : { scale: 1.05, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
              </>
            )}
            
            {/* Tags displayed on hover */}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 max-w-[90%] transition-opacity group-hover:opacity-90">
              {tags.slice(0, 3).map((tag, idx) => (
                <Badge 
                  key={idx} 
                  variant="default" 
                  className="text-xs font-medium bg-background/70 text-foreground backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="text-xs font-medium bg-background/70 backdrop-blur-sm"
                >
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Content section */}
          <div className="flex flex-col flex-grow p-4 ">
            <div>
              <h3 className="font-medium tracking-tight">{title}</h3>
              <p className=" text-xs text-muted-foreground line-clamp-2">{description}</p>
            </div>
            
            {/* Action buttons */}
            <div className="mt-auto flex justify-between items-center pt-2">
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 rounded-full bg-primary/5"
                  asChild
                >
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-3.5 w-3.5" />
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 rounded-full bg-primary/5"
                  asChild
                >
                  <a href={projectUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
              
              <Button 
                size="sm" 
                className="rounded-full text-xs h-8 px-3 bg-primary-50"
                variant="secondary"
                asChild
              >
                <a href={projectUrl} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

const projects = [
  {
    title: "A.O.T.E. NFT Collection",
    description: "Manga-inspired NFT collection with unique character abilities and storylines.",
    imageUrl: "/projects/aote.png",
    tags: ["ethers.js", "React", "Next.js", "PostgreSQL", "NFTs"],
    projectUrl: "#",
    githubUrl: "#",
    date: "2023-08-15"
  },
  {
    title: "Orcafi NFT Marketplace",
    description: "Decentralized NFT marketplace with creator-friendly features and low fees.",
    imageUrl: "/projects/mark.png",
    tags: ["Solidity", "React", "Next.js", "IPFS", "Web3.js","dApp"],
    projectUrl: "https://data-viz-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/data-viz-dashboard",
    date: "2023-04-22"
  },
  {
    title: "deFlexy Platform",
    description: "Decentralized freelancing platform powered by secure smart contracts.",
    imageUrl: "/projects/flex.jpg",
    tags: ["Solidity", "React", "Next.js", "IPFS", "Web3.js","dApp"],
    projectUrl: "https://data-viz-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/data-viz-dashboard",
    date: "2023-02-10"
  },
  {
    title: "Trippy Lion NFTs",
    description: "Psychedelic artwork NFT collection with generative designs on Ethereum.",
    imageUrl: "/projects/trippy.png",
    tags: [ "React", "Next.js", "Solidity", "Web3.js", "IPFS"],
    projectUrl: "https://data-viz-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/data-viz-dashboard",
    date: "2022-11-05"
  },
  {
    title: "Ace Miners Rewards",
    description: "NFT-based mining rewards platform with unique staking mechanism.",
    imageUrl: "/projects/aceminers.png",
    tags: ["React", "Node.js", "Socket.io", "OpenAI", "MongoDB"],
    projectUrl: "aceminers.com",
    githubUrl: "https://github.com/yourusername/ai-chat-app",
    date: "2022-08-30"
  },
  {
    title: "Ant Minerz Platform",
    description: "Ecosystem for digital mining assets with recurring rewards system.",
    imageUrl: "/projects/antminerz.png",
    tags: [ "React", "Next.js", "Solidity", "Web3.js", "IPFS"],
    projectUrl: "https://ecommerce-platform-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    date: "2022-06-15"
  },
  {
    title: "Poker Pepe Collection",
    description: "Poker-themed NFT characters and accessories on Ethereum.",
    imageUrl: "/projects/pepe.png",
    tags: ["D3.js", "React", "Express", "PostgreSQL", "Chart.js"],
    projectUrl: "https://data-viz-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/data-viz-dashboard",
    date: "2022-04-01"
  },
  {
    title: "Portfolio Template",
    description: "Modern, responsive portfolio website for developers and creatives.",
    imageUrl: "/projects/portfolio.png",
    tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    projectUrl: "https://data-viz-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/data-viz-dashboard",
    date: "2022-02-15"
  },   
  {
    title: "Orcafi Swap DEX",
    description: "Decentralized exchange for trading assets with AMM and yield farming.",
    imageUrl: "/projects/swap.jpg",
    tags: [ "React", "Next.js", "Solidity", "Web3.js", "IPFS","dApp"],
    projectUrl: "https://data-viz-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/data-viz-dashboard",
    date: "2021-12-10"
  },
  {
    title: "Orcafi DeFi",
    description: "Platform for earning interest on crypto assets with various DeFi services.",
    imageUrl: "/projects/orcafi.png",
    tags: [ "React", "Next.js", "Solidity", "Web3.js", "IPFS"],
    projectUrl: "https://data-viz-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/data-viz-dashboard",
    date: "2021-09-22"
  },
  {
    title: "Ocean.Money",
    description: "Personal finance dashboard with visualization tools and insights.",
    imageUrl: "/projects/ocean.money.png",
    tags: [ "React", "Next.js", "Solidity", "Web3.js", "IPFS","dApp"],
    projectUrl: "https://data-viz-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/data-viz-dashboard",
    date: "2021-06-15"
  }
];

// Main categories for tab filtering
const categories = [
  {
    id: "all",
    label: "All ",
    icon: <StarsIcon className="h-5 w-5 mr-1" />
  },
  {
    id: "nft",
    label: "NFT",
    icon: <RiNftFill width="20" height="20" className="mr-1" />,
    tags: ["NFTs", "NFT"]
  },
  {
    id: "defi",
    label: "DeFi",
    icon: <UnjsUncrypto width="20" height="20" className="mr-1" />,
    tags: ["DeFi", "Swap", "dApp"]
  },
  {
    id: "web",
    label: "Web",
    icon: <DeviconNextjs width="20" height="20" className="mr-1" />,
    tags: ["React", "Next.js", "Web"]
  }
];

export default function PortfolioPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  
  const projectsPerPage = 6;
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Filter projects based on active category and tags
    let filtered = [...projects];
    
    // Apply category filter
    if (activeCategory !== "all") {
      const categoryTags = categories.find(c => c.id === activeCategory)?.tags || [];
      if (categoryTags.length > 0) {
        filtered = filtered.filter(project => 
          project.tags.some(tag => 
            categoryTags.some(categoryTag => 
              tag.toLowerCase().includes(categoryTag.toLowerCase())
            )
          )
        );
      }
    }
    
    // Apply additional tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter(project => 
        selectedTags.some(tag => 
          project.tags.some(projectTag => 
            projectTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      );
    }
    
    setFilteredProjects(filtered);
    setCurrentPage(1);
  }, [activeCategory, selectedTags]);
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  const clearFilters = () => {
    setSelectedTags([]);
  };
  
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );
  
  // Extract all unique tags for filter options
  const getPopularTags = () => {
    const tagCounts = {};
    projects.forEach(project => {
      project.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  };
  
  const popularTags = getPopularTags();
  
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
      <motion.div 
        className="mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Main category tabs */}
        <Tabs 
          defaultValue="all" 
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <TabsList className="w-full border max-w-md mx-auto grid grid-cols-4 mb-8 rounded-full h-13 bg-background border-border/20">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id}
                value={category.id}
                className="flex items-center justify-center gap-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-full h-12"
              >
                {category.icon}
                <span className="hidden sm:inline">{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        {/* Flexible tag filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {popularTags.slice(0, 8).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "secondary" : "outline"}
              className={cn(
                "cursor-pointer px-3 py-1 text-xs rounded-full",
                selectedTags.includes(tag) 
                  ? "bg-primary/50 hover:bg-primary/50" 
                  : "hover:bg-muted bg-card"
              )}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Active filters display */}
        {selectedTags.length > 0 && (
          <div className="flex justify-center items-center mt-4 text-sm text-muted-foreground">
            <Filter className="h-3 w-3 mr-1" />
            <span>Filtered by:</span>
            <div className="flex gap-1 ml-2">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="gap-1 pl-2 text-xs"
                >
                  {tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent text-muted-foreground"
                    onClick={() => toggleTag(tag)}
                  >
                    <X className="h-2.5 w-2.5" />
                  </Button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-5 px-1 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </Button>
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Projects grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/5 mb-4">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="text-base font-medium mb-2">No matching projects</h3>
                <p className="text-sm text-muted-foreground mb-5">Try adjusting your filters</p>
                <Button 
                  onClick={clearFilters}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  Show all projects
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory + selectedTags.join(',') + currentPage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {paginatedProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.title} 
                    {...project} 
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Pagination */}
          {filteredProjects.length > projectsPerPage && (
            <div className="mt-12 flex justify-center ">
              <div className="flex items-center gap-2 bg-card rounded-full">
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 rounded-full bg-card"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <span className="text-sm mx-2">
                  Page {currentPage} of {totalPages}
                </span>
                
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 rounded-full bg-card"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
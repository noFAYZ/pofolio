'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronLeft, ChevronRight, Eye, Github, Image as ImageIcon, Link2OffIcon } from 'lucide-react'
import { DeviconNextjs, RiNftFill, UnjsUncrypto } from './icons/skill-icons'
import { Chip } from '@nextui-org/react'

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  tags: string[]
  projectUrl: string
  githubUrl: string
}

export function ProjectCard({ 
  title = "AI-Powered Chat App",
  description = "A real-time chat application with AI-generated responses, leveraging OpenAI's GPT-3 for intelligent conversations. Features include user authentication, message history, and customizable AI personalities.",
  imageUrl = "/placeholder.svg?height=400&width=600&text=AI+Chat+App",
  tags = ["React", "Node.js", "Socket.io", "OpenAI", "MongoDB"],
  projectUrl = "https://ai-chat-app-demo.vercel.app",
  githubUrl = "https://github.com/yourusername/ai-chat-app"
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className=' bg-foreground-50 rounded-[2.5rem] shadow-xl  border-medium border-foreground-100'>
    <Card 
      className="group relative overflow-hidden rounded-[2.5rem] shadow-lg transition-all duration-300 hover:shadow-xl ]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 transition-opacity duration-300 group-hover:opacity-70" />
      {imageError ? (
        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
          <ImageIcon className="h-16 w-16 text-gray-400" />
        </div>
      ) : (
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={handleImageError}
        />
      )} 


      <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
    

        <motion.div
        className=' bg-black bg-opacity-70 rounded-3xl p-3'
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        >

      
        <motion.p 
          className="mb-4 text-md "
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {description}
        </motion.p>
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-orange-700 text-primary-foreground">
              {tag}
            </Badge>
          ))}
        </motion.div>
    </motion.div>
      </CardContent>
    </Card>
    
        <div className='flex py-3 gap-2 justify-between text-center items-center px-4'>
        

            <p className="text-lg justify-center font-bold  text-center">{title}</p> 
            <motion.div
              className=" flex gap-2 justify-center"
          
            >
              <Button asChild variant="secondary" className="group relative overflow-hidden">
                <a href={projectUrl} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                
                  <Eye className="relative z-10 h-6 w-6" />
                  <span className="absolute inset-0 bg-primary transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                </a>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
                <a href={githubUrl} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />           
                </a>
              </Button>
            
            </motion.div> 
            
            
        </div>
            

    </div>
  )
}

  const projects = [
    {
      title: "A. O. T. E. (Artist of the Eyeris) Nft Collection",
      description: "Artist of the Eyeris Is a manga/comic book series written and illustrated by artist (and A.O.T.E. project founder) Cory Evans. Each book is 150+ pages of a fantasy/action/adventure story that follows artists, endowed with supernatural abilities, as they fight impossible odds to save what matters to them most. ",
      imageUrl: "/projects/aote.png",
      tags: ["ethers.js", "React", "Next.js", "PostgreSQL", "Framer Motion","NFTs"],
      projectUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Orcafi NFT Marketplace",
      description: "Orcafi is a decentralized NFT marketplace that allows users to mint, buy, and sell digital assets on the Ethereum blockchain. The platform features a user-friendly interface, secure transactions, and low fees for creators.",
      imageUrl: "/projects/mark.png",
      tags: ["Solidity", "React", "Next.js", "IPFS", "Web3.js","dApp"],
      projectUrl: "https://data-viz-dashboard-demo.vercel.app",
      githubUrl: "https://github.com/yourusername/data-viz-dashboard"
    },
    {
      title: "deFlexy Decentralized Freelancing Platform",
      description: "deFlexy is a decentralized freelancing platform that connects clients with skilled professionals for on-demand services. Users can create job listings, submit proposals, and manage payments securely using smart contracts.",
      imageUrl: "/projects/flex.jpg",
      tags: ["Solidity", "React", "Next.js", "IPFS", "Web3.js","dApp"],
      projectUrl: "https://data-viz-dashboard-demo.vercel.app",
      githubUrl: "https://github.com/yourusername/data-viz-dashboard"
    },
    {
      title: "Trippy Lion NFT Collection",
      description: "Trippy Lion is a collection of unique NFTs featuring psychedelic artwork and generative designs. Each NFT is stored on the Ethereum blockchain and can be bought, sold, or traded on various marketplaces.",
      imageUrl: "/projects/trippy.png",
      tags: [ "React", "Next.js", "Solidity", "Web3.js", "IPFS"],
      projectUrl: "https://data-viz-dashboard-demo.vercel.app",
      githubUrl: "https://github.com/yourusername/data-viz-dashboard"
    },
    {
      title: "Ace Miners NFT Collection & Rewards Platform",
      description: " Ace Miners is a collection of NFTs that represent mining equipment and digital assets. Users recieves recurring reward .",
      imageUrl: "/projects/aceminers.png",
      tags: ["React", "Node.js", "Socket.io", "OpenAI", "MongoDB"],
      projectUrl: "aceminers.com",
      githubUrl: "https://github.com/yourusername/ai-chat-app"
    },
    {
      title: "Ant Minerz NFT Collection & Rewards Platform",
      description: "  Ant Minerz is a collection of NFTs that represent mining equipment and digital assets. Users recieves recurring reward .",
      imageUrl: "/projects/antminerz.png",
      tags: [ "React", "Next.js", "Solidity", "Web3.js", "IPFS"],
      projectUrl: "https://ecommerce-platform-demo.vercel.app",
      githubUrl: "https://github.com/yourusername/ecommerce-platform"
    },
    {
      title: "Poker Pepe NFT Collection",
      description: "  Poker Pepe is a collection of NFTs that represent poker-themed characters and accessories. Users can buy, sell, and trade NFTs on the Ethereum blockchain using various marketplaces.",
      imageUrl: "/projects/pepe.png",
      tags: ["D3.js", "React", "Express", "PostgreSQL", "Chart.js"],
      projectUrl: "https://data-viz-dashboard-demo.vercel.app",
      githubUrl: "https://github.com/yourusername/data-viz-dashboard"
    },
    {
      title: "Personal Portfolio Website",
      description: "A modern portfolio website template for showcasing your projects, skills, and experience. The template features a clean design, responsive layout, and easy customization options for developers.",
      imageUrl: "/projects/portfolio.png",
      tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
      projectUrl: "https://data-viz-dashboard-demo.vercel.app",
      githubUrl: "https://github.com/yourusername/data-viz-dashboard"
    },   
    {
      title: "Orcafi Swap",
      description: " Orcafi Swap is a decentralized exchange (DEX) that allows users to trade digital assets on the Ethereum blockchain. The platform features automated market-making (AMM), liquidity pools, and yield farming.",
      imageUrl: "/projects/swap.jpg",
      tags: [ "React", "Next.js", "Solidity", "Web3.js", "IPFS","dApp"],
      projectUrl: "https://data-viz-dashboard-demo.vercel.app",
      githubUrl: "https://github.com/yourusername/data-viz-dashboard"
    },
    {
      title: "Orcafi",
      description: " Orcafi is a decentralized finance (DeFi) platform that enables users to earn interest on their crypto assets. The platform features lending, borrowing, and staking services, as well as yield farming opportunities.",
      imageUrl: "/projects/orcafi.png",
      tags: [ "React", "Next.js", "Solidity", "Web3.js", "IPFS"],
      projectUrl: "https://data-viz-dashboard-demo.vercel.app",
      githubUrl: "https://github.com/yourusername/data-viz-dashboard"
    },
    {
      title: "Ocean.Money",
      description: "  Ocean.Money is a personal finance dashboard that helps users track their income, expenses, and investments. The platform features interactive data visualizations, budgeting tools, and financial insights to help users make informed decisions.",
      imageUrl: "/projects/ocean.money.png",
      tags: [ "React", "Next.js", "Solidity", "Web3.js", "IPFS","dApp"],
      projectUrl: "https://data-viz-dashboard-demo.vercel.app",
      githubUrl: "https://github.com/yourusername/data-viz-dashboard"
    },
    
  ]

  interface TagType {
    title: string;
    icon: React.ReactNode;
  }
  const allTags: TagType[] = [
    {
      "title": "NFTs",
      "icon": <RiNftFill width="22" height="22"/>,
    },
    {
      "title": "Solidity",
      "icon": <DeviconNextjs width="22" height="22"/>,
    },
    {
      "title": "Rust",
      "icon": <DeviconNextjs width="22" height="22"/>,
    },
    {
      "title": "dApp",
      "icon": <UnjsUncrypto width="22" height="22"/>,
    }
  ];
  
  export default function PortfolioPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [filteredProjects, setFilteredProjects] = useState(projects);
  
    const projectsPerPage = 4;
  
    useEffect(() => {
      const filtered = projects.filter(project =>
        selectedTags.length === 0 || selectedTags.some(tag => project.tags.includes(tag))
      );
      setFilteredProjects(filtered);
      setCurrentPage(1);
    }, [selectedTags]);
  
    const toggleTag = (tagTitle: string) => {
      setSelectedTags(prev =>
        prev.includes(tagTitle) ? prev.filter(t => t !== tagTitle) : [...prev, tagTitle]
      );
    };
  
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const paginatedProjects = filteredProjects.slice(
      (currentPage - 1) * projectsPerPage,
      currentPage * projectsPerPage
    );
  
    return (
      <div className="container mx-auto py-12 px-28">
       
        
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {allTags.map((tag) => (
            <Chip
              key={tag.title}
            
              variant={selectedTags.includes(tag.title) ? "dot" : "shadow"}
              className=" p-6 cursor-pointer w-full bg-gray-950 text-xl flex font-semibold items-center gap-2"
              onClick={() => toggleTag(tag.title)}
              startContent={tag.icon}
            >
             
              {tag.title}
            </Chip>
          ))}
        </div>
  
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + selectedTags.join(',')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {paginatedProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </motion.div>
        </AnimatePresence>
  
        {filteredProjects.length === 0 && (
          <p className="text-center mt-8">No projects match the selected filters.</p>
        )}
  
        {filteredProjects.length > 0 && (
          <>  <p className="text-center mt-4">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex justify-center mt-8 gap-4">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          
          </>
        )}
      </div>
    );
  }
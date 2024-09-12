import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardBody, CardFooter, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from "@nextui-org/react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Code, Layers, Zap, ExternalLink } from 'lucide-react';

const projects = [
    {
      id: 1,
      title: "DeFi Lending Platform",
      date: "2023",
      description: "Developed a decentralized lending platform using Solidity and React. This platform enables users to lend and borrow cryptocurrencies without traditional intermediaries.",
      longDescription: "Our DeFi lending platform revolutionizes the way people interact with financial services. By leveraging blockchain technology, we've created a trustless environment where users can lend their crypto assets to earn interest or borrow assets by providing collateral. The platform uses smart contracts to automate the lending process, ensuring transparency and reducing the risk of human error. Key features include variable and fixed interest rate options, multi-collateral loans, and a user-friendly interface that makes DeFi accessible to both crypto enthusiasts and newcomers.",
      icon: <Code className="w-6 h-6" />,
      color: "bg-blue-500",
      tags: ["Solidity", "React", "Web3.js", "Ethereum", "Smart Contracts"],
      link: "https://example-defi-platform.com",
      image: "https://picsum.photos/800/400"
    },
    {
      id: 2,
      title: "NFT Marketplace",
      date: "2022",
      description: "Created a marketplace for trading unique digital assets on the Ethereum blockchain. Artists can mint their own NFTs, and collectors can buy, sell, and trade these digital assets.",
      longDescription: "Our NFT marketplace is a vibrant platform that connects digital artists with collectors worldwide. Built on the Ethereum blockchain, it allows creators to mint their artwork as non-fungible tokens, ensuring authenticity and scarcity. Collectors can easily browse, buy, and trade NFTs, with features like auctions, fixed-price sales, and bundled collections. We've implemented IPFS for decentralized storage of metadata and media files, ensuring the longevity of digital assets. The platform also includes a social aspect, allowing users to follow their favorite artists and showcase their collections.",
      icon: <Layers className="w-6 h-6" />,
      color: "bg-purple-500",
      tags: ["ERC-721", "IPFS", "Ethereum", "React", "Node.js"],
      link: "https://example-nft-marketplace.com",
      image: "https://picsum.photos/800/400"
    },
    {
      id: 3,
      title: "DAO Governance System",
      date: "2021",
      description: "Implemented a decentralized autonomous organization voting system using smart contracts. This system allows token holders to propose and vote on important decisions.",
      longDescription: "Our DAO Governance System empowers communities to make decisions collectively and transparently. Built on Ethereum, it allows token holders to create proposals, discuss them in a decentralized forum, and vote on-chain. The system includes features like quadratic voting to prevent whale dominance, timelock for proposal execution to ensure security, and delegation to allow passive members to lend their voting power to active participants. We've also implemented a unique reputation system that weighs votes based on users' past contributions to the DAO, encouraging long-term engagement and thoughtful participation.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-green-500",
      tags: ["Smart Contracts", "Governance", "Voting", "Solidity", "The Graph"],
      link: "https://example-dao-governance.com",
      image: "https://picsum.photos/800/400"
    }
  ];

  const ProjectCard = ({ project, isSelected, onClick }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        layout
        className="w-full mb-4"
      >
        <Card 
          className={`cursor-pointer ${isSelected ? 'border-2 border-primary' : ''}`}
          isPressable
          onPress={() => onClick(project)}
        >
          <CardBody className="p-0 flex flex-col sm:flex-row">
            <Image
              alt={project.title}
              className="object-cover h-full max-w-40 hidden sm:flex"
              src={project.image}
            />
            <div className="p-4 flex-grow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-bold">{project.title}</h4>
                <div className={`p-2 ${project.color} rounded-full`}>
                  {project.icon}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 hidden sm:flex">{project.date}</p>
              
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.tags.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    );
  };
  
  const ProjectDetails = ({ project }) => {
    if (!project) return <div className="flex items-center justify-center h-full">Select a project to view details</div>;
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="h-full overflow-y-auto"
      >
        <Image
          alt={project.title}
          className="object-cover w-full h-full justify-center content-center items-center  rounded-lg mb-4 "
          src={project.image}
        />
        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
        <Badge variant="outline" className="mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          {project.date}
        </Badge>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.longDescription}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <Button 
          color="primary" 
          as="a" 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          endContent={<ExternalLink className="w-4 h-4" />}
        >
          View Project
        </Button>
      </motion.div>
    );
  };
  
  const SplitViewShowcase = () => {
    const [selectedProject, setSelectedProject] = useState(projects[0]);
  
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">My Web3 Projects</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-[45%] overflow-y-auto max-h-[calc(100vh-200px)] pr-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isSelected={selectedProject?.id === project.id}
                onClick={setSelectedProject}
              />
            ))}
          </div>
          <div className="lg:w-full bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <AnimatePresence mode="wait">
              <ProjectDetails key={selectedProject?.id} project={selectedProject} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  };
  
  export default SplitViewShowcase;
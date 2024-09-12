"use client"
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import { Card, CardBody, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from "@nextui-org/react";

import { Badge } from "@/components/ui/badge";
import { Calendar, Code, Layers, Zap, ExternalLink } from 'lucide-react';
import BentoGrid from '../components/bento';
import SplitViewShowcase from '../components/bento';

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

const AnimatedLine = () => {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });
  
    return (
      <motion.div
        className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
        style={{ scaleY, originY: 0 }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-blue-500 to-transparent dark:from-blue-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>
    );
  };
  
  const TimelineCard = ({ project, isLeft, onOpen }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    
    const handleCardClick = () => {
      onOpen(project);
    };
  
    return (
      <motion.div 
        ref={ref}
        className={`mb-8 flex justify-between items-center w-full ${isLeft ? 'flex-row-reverse' : ''}`}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="order-1 w-5/12"></div>
        <motion.div 
          className="z-20 flex items-center order-1 shadow-xl w-14 h-8 rounded-xl px-2 bg-gray-200 dark:bg-gray-800"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span 
            className="mx-auto font-semibold text-lg text-gray-800 dark:text-white"
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >
            {project.date}
          </motion.span>
        </motion.div>
        <motion.div 
          className="order-1 w-5/12 px-1 py-4"
          whileHover={{ scale: 1.05, rotateY: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <Card 
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            isPressable
            onPress={handleCardClick}
          >
            <CardBody className="p-0 overflow-hidden">
              <div className="relative overflow-hidden">
                <Image
                  alt={project.title}
                  className="object-cover w-full"
                  src={project.image}
                />
                <motion.div 
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white font-semibold">View Details</span>
                </motion.div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <motion.div 
                    className={`p-2 ${project.color} rounded-full`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {project.icon}
                  </motion.div>
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {project.date}
                  </Badge>
                </div>
                <h3 className="mb-3 font-bold text-xl">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.1 }}>
                      <Badge variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    </motion.div>
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
      </motion.div>
    );
  };
  
  const VerticalTimeline = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedProject, setSelectedProject] = useState(null);
  
    const handleOpenModal = (project) => {
      setSelectedProject(project);
      onOpen();
    };
  
    return (
      <div className="container mx-auto w-full h-full relative">
        <div className="relative wrap overflow-hidden p-10 h-full">
          <AnimatedLine />
          {projects.map((project, index) => (
            <TimelineCard 
              key={project.id} 
              project={project} 
              isLeft={index % 2 === 0}
              onOpen={handleOpenModal}
            />
          ))}
        </div>
        <Modal 
          isOpen={isOpen} 
          onClose={onClose}
          size="2xl"
          scrollBehavior="inside"
          classNames={{
            backdrop: "bg-black/50 backdrop-blur-sm",
            base: "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
            header: "border-b-1 border-gray-200 dark:border-gray-700",
            footer: "border-t-1 border-gray-200 dark:border-gray-700",
            closeButton: "hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                {selectedProject && (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 ${selectedProject.color} rounded-full`}>
                          {selectedProject.icon}
                        </div>
                        {selectedProject.title}
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      <Image
                        alt={selectedProject.title}
                        className="object-cover w-full h-64 rounded-lg"
                        src={selectedProject.image}
                      />
                      <Badge variant="outline" className="text-xs mt-4">
                        <Calendar className="w-3 h-3 mr-1" />
                        {selectedProject.date}
                      </Badge>
                      <p className="mt-4 text-gray-600 dark:text-gray-300">{selectedProject.longDescription}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={onClose} as="a" href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                        View Project <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  };
  

  
const PortfolioTimeline = () => {
    return (
      <div className=" min-h-screen py-12 ">
        <SplitViewShowcase />
        <h1 className="text-4xl font-bold text-center mb-12">My Web3 Journey</h1>
        <VerticalTimeline />
      </div>
    );
  };
  
export default PortfolioTimeline;
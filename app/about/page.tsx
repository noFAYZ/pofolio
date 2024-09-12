"use client"
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Briefcase, ChevronRight, Code, Coffee, Cpu, Eye, Globe, Layers, MessageCircle, Palette, Smartphone, Users, Zap } from 'lucide-react';

const stats = [
  { value: "8+", label: "Years of Experience" },
  { value: "1k+", label: "Completed Projects" },
  { value: "90+", label: "Client Satisfactions" },
  { value: "20+", label: "Design Awards" },
];

const experiences = [
  {
    period: "2020 - Present",
    company: "BloomHub Technology",
    role: "Application Developer",
    description: "As a product designer at a leading e-commerce company, I was responsible for designing user interfaces for the company's online shopping platform. I collaborated closely with the company's marketing and development teams to create designs that not only looked great but also drove conversions and increased sales."
  },
  {
    period: "2018 - 2020",
    company: "Skyward Company Limited",
    role: "Product Designer",
    description: "At a software startup, I worked as a product designer on a team that was responsible for developing a new mobile app. I was responsible for creating wireframes, designing user interfaces, and conducting user testing to ensure that the app was intuitive and user-friendly. My work helped the company launch a successful app that received positive feedback from users."
  },
  {
    period: "2015 - 2018",
    company: "Atlas Innovations",
    role: "Senior Developer",
    description: "As a freelance product designer, I worked with a variety of clients across different industries. I designed packaging for a new food product, created marketing materials for a fashion brand, and developed user interfaces for a healthcare startup. My ability to adapt to different industries and design challenges made me a valuable asset to my clients."
  },
];
const skills = [
    { name: "Web Design", icon: <Code className="w-6 h-6" />, level: 95 },
    { name: "UX/UI", icon: <Zap className="w-6 h-6" />, level: 90 },
    { name: "Front-end Development", icon: <Cpu className="w-6 h-6" />, level: 85 },
    { name: "Branding", icon: <Briefcase className="w-6 h-6" />, level: 88 },
  ];
  
  const projects = [
    { name: "E-commerce Redesign", description: "Revamped UI/UX for a major online retailer" },
    { name: "AI-Powered Portfolio Generator", description: "Web app that creates portfolios using AI" },
    { name: "Blockchain Visualizer", description: "Interactive tool for understanding blockchain technology" },
    { name: "Responsive News Platform", description: "Mobile-first news site with real-time updates" },
  ];


  const services = [
    { name: "Brand Identity Design", description: "Create a unique and memorable brand identity that resonates with your target audience.", icon: <Palette className="w-8 h-8 mb-4 text-purple-400" /> },
    { name: "Website Design", description: "Design beautiful, responsive websites that provide an exceptional user experience.", icon: <Globe className="w-8 h-8 mb-4 text-blue-400" /> },
    { name: "Application Design", description: "Craft intuitive and engaging user interfaces for mobile and web applications.", icon: <Smartphone className="w-8 h-8 mb-4 text-green-400" /> },
  ];
  
  const StatCard = ({ stat, icon }) => (
    <motion.div 
      className="text-center bg-muted backdrop-filter backdrop-blur-lg p-6 rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.051 }}
      whileHover={{ scale: 1.05,  }}
    >
      {icon}
      <h3 className="text-4xl font-bold text-neon-green mb-2">{stat.value}</h3>
      <p className="text-sm ">{stat.label}</p>
    </motion.div>
  );
  
  const SkillCard = ({ skill }) => (
    <motion.div 
      className="bg-gradient-to-br from-purple-700/50 to-blue-500/50 p-6 rounded-2xl backdrop-filter backdrop-blur-lg"
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center mb-4">
        <div className="text-white mr-4 bg-white/20 p-3 rounded-full">{skill.icon}</div>
        <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
      </div>
      <div className="w-full bg-white/30 rounded-full h-3">
        <motion.div 
          className="bg-white h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      <p className="text-right text-white mt-2">{skill.level}%</p>
    </motion.div>
  );
  
  const ProjectCard = ({ project }) => (
    <motion.div 
      className="bg-gradient-to-br from-green-700/50 to-teal-500/50 p-6 rounded-2xl backdrop-filter backdrop-blur-lg"
      whileHover={{ scale: 1.05, rotate: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <h3 className="text-xl font-semibold mb-3 text-white">{project.name}</h3>
      <p className="text-white/80 mb-4">{project.description}</p>
      <Button variant="secondary" size="sm" className="mt-2 text-teal-800 bg-white/90 hover:bg-white">
        Explore <Eye className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
  
  const AboutPage = () => {
    const [expandedExperience, setExpandedExperience] = useState(null);
    const [activeSection, setActiveSection] = useState('skills');
  
    return (
      <div className="min-h-screen py-40 z-10 ">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4 text-center "
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About me
          </motion.h1>
          <motion.p 
            className="text-xl mb-12  text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            With over 12 years of dedicated focus on designing products that achieve business goals, I 
            have established myself as a trusted professional in the industry.
          </motion.p>
  
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <StatCard stat={stats[0]} icon={<Coffee className="w-8 h-8 mx-auto mb-4 text-yellow-400 " />} />
            <StatCard stat={stats[1]} icon={<Layers className="w-8 h-8 mx-auto mb-4 text-blue-400" />} />
            <StatCard stat={stats[2]} icon={<Users className="w-8 h-8 mx-auto mb-4 text-green-400" />} />
            <StatCard stat={stats[3]} icon={<Award className="w-8 h-8 mx-auto mb-4 text-red-400" />} />
          </div>
  
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className=" inset-0 bg-neon-green rounded-full blur-md"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <img
                src="/profile/3.jpeg"
                alt="Profile"
                className="w-full h-48 object-cover rounded-full z-10 "
              />
            </motion.div>
            <div>
              <motion.h2 
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                A Passionate <span className="text-neon-green">Web Designer</span> Turning 
                Ideas Into Visually Stunning, User-Friendly Websites
              </motion.h2>
              <motion.p 
                className=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Hello! I'm Stacey, a self-taught & award-winning Digital Designer & Developer with over 
                8 years of work experience. I started in my children's room, and got my first job at renowned 
                digital agency. I have been freelancing for 3 years and taking projects from enterprise companies.
              </motion.p>
            </div>
          </div>
  
          <div className="flex justify-center space-x-4 mb-8">
            <Button 
              variant={activeSection === 'skills' ? "default" : "outline"}
              onClick={() => setActiveSection('skills')}
              className="px-6 py-2 rounded-full"
            >
              <Cpu className="mr-2 h-4 w-4" /> Skills
            </Button>
            <Button 
              variant={activeSection === 'projects' ? "default" : "outline"}
              onClick={() => setActiveSection('projects')}
              className="px-6 py-2 rounded-full"
            >
              <Briefcase className="mr-2 h-4 w-4" /> Projects
            </Button>
          </div>
  
          <AnimatePresence mode="wait">
            {activeSection === 'skills' && (
              <motion.div 
                key="skills"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
              >
                {skills.map((skill, index) => (
                  <SkillCard key={index} skill={skill} />
                ))}
              </motion.div>
            )}
            {activeSection === 'projects' && (
              <motion.div 
                key="projects"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
              >
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
  
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Education & Experience
          </motion.h2>
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className="mb-8  bg-muted backdrop-filter backdrop-blur-lg rounded-2xl p-6 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{  duration: 0.15 }}
              onClick={() => setExpandedExperience(expandedExperience === index ? null : index)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{exp.company}</h3>
                <Badge variant="secondary" className=" bg-muted">{exp.period}</Badge>
              </div>
              <p className=" mt-2 flex items-center">
                <Briefcase className="mr-2 h-4 w-4" /> {exp.role}
              </p>
              <AnimatePresence>
                {expandedExperience === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.13 }}
                    className="mt-4 "
                  >
                    {exp.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
  
          <motion.h2 
            className="text-3xl font-bold my-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{duration: 0.125 }}
          >
            Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className=" bg-muted p-6 rounded-2xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{  duration: 0.15 }}
                whileHover={{ scale: 1.05,  }}
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="">{service.description}</p>
              </motion.div>
            ))}
          </div>
  
          <motion.div 
            className=" p-1 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-muted rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to kickstart your project?</h2>
              <p className="mb-6 text-gray-300">
                Let's push the boundaries of design and deliver exceptional work together.
              </p>
              <Button variant="secondary" size="lg" className="bg-neon-green text-gray-900 hover:bg-blue-400">
                Let's Talk <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };
  
  export default AboutPage;
"use client";

import { Chip } from "@nextui-org/react";
import AnimatedList, { AnimatedListItem } from "../magicui/animated-list";
import { Tabs } from "../ui/tabs";

import { useState, useEffect } from "react";
import { skillSet } from "@/lib/skills-data";

export function Skills() {
  const [itemsPerRow, setItemsPerRow] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerRow(3);
      } else if (window.innerWidth < 768) {
        setItemsPerRow(4);
      } else if (window.innerWidth < 1024) {
        setItemsPerRow(6);
      } else {
        setItemsPerRow(8);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = Object.entries(skillSet).map(([category, skills]) => ({
    title: category,
    value: category.toLowerCase().replace(/\s+/g, '-'),
    content: (
      <div className="w-full overflow-hidden relative rounded-3xl p-2 sm:p-4 text-sm sm:text-base md:text-md font-bold text-white bg-gradient-to-br from-muted/85 to-muted/85">
        <SkillContent skills={skills} itemsPerRow={itemsPerRow} />
      </div>
    ),
  }));

  return (
    <div className="min-h-[12rem] sm:min-h-[12rem] md:min-h-[12rem] relative flex flex-col max-w-5xl mx-auto w-full  md:items-start md:justify-start p-2 sm:p-4">
      <Tabs 
        tabs={tabs}
        containerClassName="w-full overflow-x-auto justify-center"
        tabClassName="text-xs sm:text-sm md:text-base justify-center md:justify-start"
      />
    </div>
  );
}

const SkillContent = ({ skills, itemsPerRow }) => {
  return (
    <AnimatedList itemsPerRow={itemsPerRow} className="">
      {skills.map((skill) => (
        <AnimatedListItem key={skill.id}>
          <Chip   
            variant="shadow"
            classNames={{
              base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 rounded-full",
              content: "drop-shadow shadow-black text-white text-xs sm:text-sm",
            }}
            startContent={
              <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5">
                {skill.icon}
              </div>
            }
          >
            {skill.name}
          </Chip>
        </AnimatedListItem>
      ))}
    </AnimatedList> 
  );
};

export default Skills;
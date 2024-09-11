"use client";
import { Button, Chip } from "@nextui-org/react";
import { IconUserCircle } from "@tabler/icons-react";
import toast from "react-hot-toast";
import Articles from "../blocks/articles";
import ExpandableCardDemo from "../blocks/expandable-card-demo-standard";
import { DeviconNextjs, DeviconRust, DeviconSolidity, SkillIconsAwsDark, SkillIconsGcpDark, SkillIconsNextjsDark, SkillIconsRust, SkillIconsSolidity } from "../icons/skill-icons";
import { AnimatedList, AnimatedListItem } from "../magicui/animated-list";

import { BentoHome } from "./home-bento";
import Profile from "./profile";
import { Skills } from "./skills";

export const MainPage = () => {
  return (
    <div className=" flex z-10 py-20 flex-col  justify-center  ">
      <Profile />
      <div className="flex flex-wrap md:flex-nowrap gap-4">
     
        {/*   <div className="py-10">
            <AnimatedList >
              <AnimatedListItem>
                <Chip   
                variant="shadow"
              classNames={{
                base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                content: "drop-shadow shadow-black text-white",
              }}
                startContent={<SkillIconsNextjsDark width={'20px'} height={'20px'}/>}>
                  Next.js
                </Chip>
              </AnimatedListItem>
              <AnimatedListItem>
                <Chip
                variant="shadow"
                classNames={{
                  base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                  content: "drop-shadow shadow-black text-white",
                }}
                startContent={<SkillIconsSolidity width={'20px'} height={'202px'}/>}>
                  Solidity
                </Chip>
              </AnimatedListItem>
              <AnimatedListItem>
                <Chip   
                variant="shadow"
              classNames={{
                base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                content: "drop-shadow shadow-black text-white",
              }}
                startContent={<SkillIconsRust width={'20px'} height={'20px'}/>}>
                  Rust
                </Chip>
              </AnimatedListItem>
              <AnimatedListItem>
                <Chip
                variant="shadow"
                classNames={{
                  base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                  content: "drop-shadow shadow-black text-white",
                }}
                startContent={<SkillIconsAwsDark width={'20px'} height={'202px'}/>}>
                  AWS
                </Chip>
              </AnimatedListItem>
              <AnimatedListItem>
                <Chip   
                variant="shadow"
              classNames={{
                base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                content: "drop-shadow shadow-black text-white",
              }}
                startContent={<SkillIconsGcpDark width={'20px'} height={'20px'}/>}>
                  GCP
                </Chip>
              </AnimatedListItem>
              <AnimatedListItem>
                <Chip
                variant="shadow"
                classNames={{
                  base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                  content: "drop-shadow shadow-black text-white",
                }}
                startContent={<SkillIconsSolidity width={'20px'} height={'202px'}/>}>
                  Solidity
                </Chip>
              </AnimatedListItem>
              <AnimatedListItem>
                <Chip   
                variant="shadow"
              classNames={{
                base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                content: "drop-shadow shadow-black text-white",
              }}
                startContent={<SkillIconsNextjsDark width={'20px'} height={'20px'}/>}>
                  Next.js
                </Chip>
              </AnimatedListItem>
              <AnimatedListItem>
                <Chip
                variant="shadow"
                classNames={{
                  base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                  content: "drop-shadow shadow-black text-white",
                }}
                startContent={<SkillIconsSolidity width={'20px'} height={'202px'}/>}>
                  Solidity
                </Chip>
              </AnimatedListItem>
              <AnimatedListItem>
                <Chip   
                variant="shadow"
              classNames={{
                base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                content: "drop-shadow shadow-black text-white",
              }}
                startContent={<SkillIconsNextjsDark width={'20px'} height={'20px'}/>}>
                  Next.js
                </Chip>
              </AnimatedListItem>
              <AnimatedListItem>
                <Chip
                variant="shadow"
                classNames={{
                  base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                  content: "drop-shadow shadow-black text-white",
                }}
                startContent={<SkillIconsSolidity width={'20px'} height={'202px'}/>}>
                  Solidity
                </Chip>
              </AnimatedListItem>
              <AnimatedListItem>
                <Chip   
                variant="shadow"
              classNames={{
                base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                content: "drop-shadow shadow-black text-white",
              }}
                startContent={<SkillIconsNextjsDark width={'20px'} height={'20px'}/>}>
                  Next.js
                </Chip>
              </AnimatedListItem>
              <AnimatedListItem>
                <Chip
                variant="shadow"
                classNames={{
                  base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                  content: "drop-shadow shadow-black text-white",
                }}
                startContent={<SkillIconsSolidity width={'20px'} height={'202px'}/>}>
                  Solidity
                </Chip>
              </AnimatedListItem>
            </AnimatedList> 
            
          </div> */}
          
        
      </div>
      <Skills />
      <div>
        <Articles limit={2} />
      </div>
   
    </div>
  );
};

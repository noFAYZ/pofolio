import { DeviconHardhat, DeviconPlainWeb3js, DeviconReact, LogosEthers, SkillIconsExpressjsDark, SkillIconsGraphqlDark, SkillIconsNextjsDark, SkillIconsNodejsDark, SkillIconsPostgresqlDark, SkillIconsSolidity, SkillIconsTailwindcssDark, SkillIconsTypescript } from "@/components/icons/skill-icons";


export const skillSet = {
  "Full Stack": [
    { id: "nextjs", name: "Next.js", icon: <SkillIconsNextjsDark /> },
    { id: "typescript", name: "TypeScript", icon: <SkillIconsTypescript /> },
    { id: "solidity", name: "Solidity", icon: <SkillIconsSolidity /> },
    { id: "postgresql", name: "PostgreSQL", icon: <SkillIconsPostgresqlDark /> },
    { id: "hardhat", name: "Hardhat", icon: <DeviconHardhat /> },
    { id: "tailwind", name: "Tailwind CSS", icon: <SkillIconsTailwindcssDark /> },
    { id: "ethersjs", name: "Ethers.js", icon: <LogosEthers /> }
  ],
  "Frontend": [
    { id: "react", name: "React", icon: <DeviconReact /> },
    { id: "nextjs", name: "Next.js", icon: <SkillIconsNextjsDark /> },
    { id: "typescript", name: "TypeScript", icon: <SkillIconsTypescript /> },
    { id: "tailwind", name: "Tailwind CSS", icon: <SkillIconsTailwindcssDark /> },
    { id: "web3js", name: "Web3.js", icon: <DeviconPlainWeb3js /> },
    { id: "ethersjs", name: "Ethers.js", icon: <LogosEthers /> }
  ],
  "Backend": [
    { id: "nodejs", name: "Node.js", icon: <SkillIconsNodejsDark /> },
    { id: "express", name: "Express", icon: <SkillIconsExpressjsDark /> },
    { id: "graphql", name: "GraphQL", icon: <SkillIconsGraphqlDark /> },
    { id: "postre", name: "PostgreSQL", icon: <SkillIconsPostgresqlDark />},
    { id: "mongodb", name: "MongoDB", icon: "MongoDBIcon" },
    { id: "redis", name: "Redis", icon: "RedisIcon" }
  ],
  "Blockchain": [
    { id: "solidity", name: "Solidity", icon: <SkillIconsSolidity /> },
    { id: "hardhat", name: "Hardhat", icon: <DeviconHardhat /> },
    { id: "truffle", name: "Truffle", icon: "TruffleIcon" },
    { id: "ganache", name: "Ganache", icon: "GanacheIcon" },
    { id: "ipfs", name: "IPFS", icon: "IPFSIcon" }
  ],
 
};
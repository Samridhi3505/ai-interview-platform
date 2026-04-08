const skillsResources = [
  {
    title: "Frontend Development",
    description: "Build user interfaces and websites",
    websites: [
      { name: "MDN Web Docs", link: "https://developer.mozilla.org/" },
      { name: "FreeCodeCamp", link: "https://www.freecodecamp.org/" },
      { name: "Frontend Masters", link: "https://frontendmasters.com/" }
    ],
    youtube: [
      { name: "CodeWithHarry", link: "https://www.youtube.com/@CodeWithHarry" },
      { name: "Traversy Media", link: "https://www.youtube.com/@TraversyMedia" }
    ],
    topics: ["HTML", "CSS", "JavaScript", "React"]
  },

  {
    title: "Backend Development",
    description: "Build server-side logic and APIs",
    websites: [
      { name: "Node.js Docs", link: "https://nodejs.org/en/docs" },
      { name: "Express Docs", link: "https://expressjs.com/" }
    ],
    youtube: [
      { name: "Academind", link: "https://www.youtube.com/@Academind" },
      { name: "Programming with Mosh", link: "https://www.youtube.com/@programmingwithmosh" }
    ],
    topics: ["Node.js", "APIs", "Databases", "Authentication"]
  },

  {
    title: "Full Stack Development",
    description: "Frontend + Backend combined",
    websites: [
      { name: "Full Stack Open", link: "https://fullstackopen.com/en/" },
      { name: "The Odin Project", link: "https://www.theodinproject.com/" }
    ],
    youtube: [
      { name: "Apna College", link: "https://www.youtube.com/@ApnaCollegeOfficial" }
    ],
    topics: ["React", "Node.js", "MongoDB", "System Design"]
  },

  {
    title: "Data Science",
    description: "Analyze and extract insights from data",
    websites: [
      { name: "Kaggle", link: "https://www.kaggle.com/" },
      { name: "Coursera", link: "https://www.coursera.org/" }
    ],
    youtube: [
      { name: "Krish Naik", link: "https://www.youtube.com/@krishnaik06" }
    ],
    topics: ["Python", "Pandas", "Visualization", "Statistics"]
  },

  {
    title: "Machine Learning & AI",
    description: "Build intelligent systems",
    websites: [
      { name: "DeepLearning.ai", link: "https://www.deeplearning.ai/" },
      { name: "Fast.ai", link: "https://www.fast.ai/" }
    ],
    youtube: [
      { name: "3Blue1Brown", link: "https://www.youtube.com/@3blue1brown" }
    ],
    topics: ["ML Algorithms", "Neural Networks", "NLP", "LLMs"]
  },

  {
    title: "Cybersecurity",
    description: "Protect systems from attacks",
    websites: [
      { name: "TryHackMe", link: "https://tryhackme.com/" },
      { name: "HackTheBox", link: "https://www.hackthebox.com/" }
    ],
    youtube: [
      { name: "NetworkChuck", link: "https://www.youtube.com/@NetworkChuck" }
    ],
    topics: ["Ethical Hacking", "Network Security", "Encryption"]
  },

  {
    title: "Cloud Computing",
    description: "Work with AWS, Azure, GCP",
    websites: [
      { name: "AWS Training", link: "https://aws.amazon.com/training/" },
      { name: "Google Cloud", link: "https://cloud.google.com/training" }
    ],
    youtube: [
      { name: "TechWorld with Nana", link: "https://www.youtube.com/@TechWorldwithNana" }
    ],
    topics: ["AWS", "Docker", "Kubernetes", "Deployment"]
  },

  {
    title: "DevOps",
    description: "Automate deployment & CI/CD",
    websites: [
      { name: "DevOps Roadmap", link: "https://roadmap.sh/devops" }
    ],
    youtube: [
      { name: "TechWorld with Nana", link: "https://www.youtube.com/@TechWorldwithNana" }
    ],
    topics: ["CI/CD", "Docker", "Kubernetes", "Linux"]
  },

  {
    title: "UI/UX Design",
    description: "Design beautiful user experiences",
    websites: [
      { name: "Figma", link: "https://www.figma.com/" },
      { name: "Dribbble", link: "https://dribbble.com/" }
    ],
    youtube: [
      { name: "DesignCourse", link: "https://www.youtube.com/@DesignCourse" }
    ],
    topics: ["Wireframing", "Prototyping", "User Research"]
  },

  {
    title: "Mobile App Development",
    description: "Build Android/iOS apps",
    websites: [
      { name: "Flutter Docs", link: "https://docs.flutter.dev/" },
      { name: "React Native Docs", link: "https://reactnative.dev/" }
    ],
    youtube: [
      { name: "CodeWithHarry", link: "https://www.youtube.com/@CodeWithHarry" }
    ],
    topics: ["Flutter", "React Native", "Firebase"]
},
    {
  title: "Blockchain Development",
  description: "Build decentralized apps and smart contracts",
  websites: [
    { name: "Ethereum Docs", link: "https://ethereum.org/en/developers/docs/" },
    { name: "Solidity Docs", link: "https://docs.soliditylang.org/" },
    { name: "CryptoZombies", link: "https://cryptozombies.io/" }
  ],
  youtube: [
    { name: "Dapp University", link: "https://www.youtube.com/@DappUniversity" },
    { name: "Patrick Collins", link: "https://www.youtube.com/@PatrickAlphaC" }
  ],
  topics: [
    "Blockchain Basics",
    "Smart Contracts",
    "Solidity",
    "Web3.js / Ethers.js"
  ]
},

{
  title: "System Design",
  description: "Design scalable systems like Netflix, Uber",
  websites: [
    { name: "System Design Primer", link: "https://github.com/donnemartin/system-design-primer" },
    { name: "High Scalability", link: "http://highscalability.com/" },
    { name: "Educative.io", link: "https://www.educative.io/" }
  ],
  youtube: [
    { name: "Gaurav Sen", link: "https://www.youtube.com/@gkcs" },
    { name: "Tech Dummies", link: "https://www.youtube.com/@TechDummies" }
  ],
  topics: [
    "Load Balancing",
    "Caching",
    "Database Scaling",
    "Microservices"]
}
  
];

export default skillsResources;
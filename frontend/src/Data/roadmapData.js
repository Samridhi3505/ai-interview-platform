const roadmapData = {
  frontend: [
    {
      title: "HTML",
      resources: ["MDN Docs", "HTML Crash Course"]
    },
    {
      title: "CSS",
      children: [
        { title: "Flexbox", resources: ["Flexbox Froggy"] },
        { title: "Grid", resources: ["CSS Grid Guide"] }
      ]
    },
    {
      title: "JavaScript",
      resources: ["JS Basics", "ES6 Guide"]
    },
    {
      title: "React",
      resources: ["React Docs", "Projects"]
    }
  ],

  dsa: [
    { title: "Arrays" },
    { title: "Linked List" },
    { title: "Trees" },
    { title: "Graphs" }
  ]
};

export default roadmapData;
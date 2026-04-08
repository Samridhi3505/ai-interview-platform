const osResources = {
  websites: [
    {
      name: "GeeksforGeeks OS",
      link: "https://www.geeksforgeeks.org/operating-systems/",
      description: "Best for interview prep + quick revision"
    },
    {
      name: "TutorialsPoint OS",
      link: "https://www.tutorialspoint.com/operating_system/",
      description: "Beginner-friendly structured notes"
    },
    {
      name: "Javatpoint OS",
      link: "https://www.javatpoint.com/operating-system",
      description: "Quick revision + examples"
    },
    {
      name: "StudyTonight OS",
      link: "https://www.studytonight.com/operating-system/",
      description: "Simple explanations"
    },
    {
      name: "OSTEP (Operating Systems Book)",
      link: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
      description: "Best OS book for deep understanding"
    }
  ],

  youtube: [
    {
      name: "Gate Smashers OS",
      link: "https://youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p&si=2pfDT81kqR5kKMzB",
      description: "Best for Placements + GATE Prep"
    },
    {
      name: "Knowledge Gate OS",
      link: "https://youtube.com/playlist?list=PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD&si=KQYPQzipSmPdsriK",
      description: "Visual + Easy Explanations"
    },
    {
      name: "Unacademy GATE OS",
      link: "https://youtube.com/playlist?list=PLG9aCp4uE-s17rFjWM8KchGlffXgOzzVP&si=sQ0f8KUXMNsXKrz2",
      description: "Advanced + Interview Prep"
    }
  ],

  importantTopics: [
    {
      category: "Basics",
      topics: [
        "What is Operating System",
        "Types of OS",
        "Functions of OS",
        "System Calls"
      ]
    },
    {
      category: "Processes",
      topics: [
        "Process vs Program",
        "Process States",
        "PCB (Process Control Block)",
        "Context Switching"
      ]
    },
    {
      category: "CPU Scheduling",
      topics: [
        "FCFS",
        "SJF",
        "Round Robin",
        "Priority Scheduling"
      ]
    },
    {
      category: "Threads",
      topics: [
        "Threads vs Processes",
        "Multithreading",
        "User vs Kernel Threads"
      ]
    },
    {
      category: "Synchronization",
      topics: [
        "Critical Section Problem",
        "Mutex & Semaphore",
        "Producer Consumer Problem",
        "Readers Writers Problem"
      ]
    },
    {
      category: "Deadlocks",
      topics: [
        "Deadlock Conditions",
        "Prevention",
        "Avoidance (Banker’s Algorithm)",
        "Detection & Recovery"
      ]
    },
    {
      category: "Memory Management",
      topics: [
        "Paging",
        "Segmentation",
        "Virtual Memory",
        "Page Replacement Algorithms"
      ]
    },
    {
      category: "Disk Scheduling",
      topics: [
        "FCFS",
        "SSTF",
        "SCAN",
        "LOOK"
      ]
    },
    {
      category: "Advanced",
      topics: [
        "Thrashing",
        "File Systems",
        "I/O Systems",
        "Security & Protection"
      ]
    }
  ]
};

export default osResources;
const dbmsResources = {
  websites: [
    {
      name: "GeeksforGeeks DBMS",
      link: "https://www.geeksforgeeks.org/dbms/",
      description: "Best for Interview Prep + Concepts"
    },
    {
      name: "TutorialsPoint DBMS",
      link: "https://www.tutorialspoint.com/dbms/",
      description: "Beginner-Friendly Structured Content"
    },
    {
      name: "Javatpoint DBMS",
      link: "https://www.javatpoint.com/dbms-tutorial",
      description: "Quick Revision Notes"
    },
    {
      name: "W3Schools SQL",
      link: "https://www.w3schools.com/sql/",
      description: "Best for SQL Practice"
    },
    {
      name: "SQLZoo",
      link: "https://sqlzoo.net/",
      description: "Interactive SQL Practice Platform"
    }
  ],

  youtube: [
    {
      name: "Gate Smashers DBMS",
      link: "https://youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y&si=iqKgToH_DiFc_6Ti",
      description: "Best for Placements + Theory"
    },
    {
      name: "Knowledge Gate DBMS",
      link: "https://youtube.com/playlist?list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV&si=igkf8zQAVufqmtze",
      description: "Visual + Easy Explanation"
    },
    {
      name: "Apna College SQL",
      link: "https://www.youtube.com/@ApnaCollegeOfficial",
      description: "SQL + Practical Approach"
    }
  ],

  importantTopics: [
    {
      category: "Basics",
      topics: [
        "What is DBMS",
        "Types of Databases",
        "Advantages of DBMS",
        "3 Schema Architecture"
      ]
    },
    {
      category: "ER Model",
      topics: [
        "Entities & Attributes",
        "Relationships",
        "ER Diagrams",
        "Mapping ER to Tables"
      ]
    },
    {
      category: "Relational Model",
      topics: [
        "Keys (Primary, Foreign, Candidate)",
        "Constraints",
        "Schema vs Instance",
        "Relational Algebra"
      ]
    },
    {
      category: "Normalization",
      topics: [
        "1NF, 2NF, 3NF",
        "BCNF",
        "Functional Dependency",
        "Anomalies"
      ]
    },
    {
      category: "SQL",
      topics: [
        "Basic Queries (SELECT, WHERE)",
        "Joins (Inner, Left, Right)",
        "Group By & Having",
        "Subqueries"
      ]
    },
    {
      category: "Transactions",
      topics: [
        "ACID Properties",
        "Transaction States",
        "Concurrency Control",
        "Serializability"
      ]
    },
    {
      category: "Indexing & Storage",
      topics: [
        "Indexing (B+ Trees)",
        "Hashing",
        "File Organization"
      ]
    },
    {
      category: "Advanced",
      topics: [
        "Deadlocks",
        "Recovery Techniques",
        "Locks (Shared/Exclusive)",
        "Two Phase Locking"
      ]
    }
  ]
};

export default dbmsResources;
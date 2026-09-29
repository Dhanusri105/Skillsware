export const INITIAL_SKILLS = [
  {
    name: 'Python',
    slug: 'python',
    category: 'Backend & Data',
    description: 'Versatile, high-level programming language standard in backend, automation, and AI/ML.',
    icon: 'Terminal',
    difficulty: 'BEGINNER',
    popular: true,
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    category: 'Frontend & Fullstack',
    description: 'The core language of the modern web, powering interactive browser apps and Node.js servers.',
    icon: 'Code2',
    difficulty: 'BEGINNER',
    popular: true,
  },
  {
    name: 'React',
    slug: 'react',
    category: 'Frontend',
    description: 'Component-based UI library with declarative state, hooks, and rich ecosystem for web applications.',
    icon: 'Layers',
    difficulty: 'INTERMEDIATE',
    popular: true,
  },
  {
    name: 'Node.js',
    slug: 'nodejs',
    category: 'Backend',
    description: 'Event-driven, asynchronous JavaScript runtime built on Chrome V8 engine for high-performance servers.',
    icon: 'Server',
    difficulty: 'INTERMEDIATE',
    popular: true,
  },
  {
    name: 'Java',
    slug: 'java',
    category: 'Backend & Enterprise',
    description: 'Robust, statically typed object-oriented language for scalable enterprise distributed systems.',
    icon: 'Cpu',
    difficulty: 'INTERMEDIATE',
    popular: true,
  },
  {
    name: 'C and C++',
    slug: 'cpp',
    category: 'Systems & Core',
    description: 'Low-level control, high-performance systems programming, memory management, and competitive programming.',
    icon: 'Cpu',
    difficulty: 'ADVANCED',
    popular: false,
  },
  {
    name: 'HTML and CSS',
    slug: 'html-css',
    category: 'Frontend',
    description: 'Fundamental building blocks of web structure, semantic markup, responsive design, and CSS layouts.',
    icon: 'Layout',
    difficulty: 'BEGINNER',
    popular: true,
  },
  {
    name: 'SQL & Relational DBs',
    slug: 'sql',
    category: 'Databases',
    description: 'Declarative language for querying, indexing, and modeling relational databases.',
    icon: 'Database',
    difficulty: 'BEGINNER',
    popular: true,
  },
  {
    name: 'PostgreSQL',
    slug: 'postgresql',
    category: 'Databases',
    description: 'Advanced open-source object-relational database with JSONB support, indexing, and high reliability.',
    icon: 'Database',
    difficulty: 'INTERMEDIATE',
    popular: true,
  },
  {
    name: 'Data Structures and Algorithms',
    slug: 'dsa',
    category: 'Computer Science',
    description: 'Arrays, linked lists, trees, graphs, dynamic programming, time/space complexity analysis.',
    icon: 'Binary',
    difficulty: 'ADVANCED',
    popular: true,
  },
  {
    name: 'Git & GitHub',
    slug: 'git-github',
    category: 'DevOps & Tooling',
    description: 'Distributed version control, branching strategies, pull requests, CI/CD, and collaboration workflows.',
    icon: 'GitBranch',
    difficulty: 'BEGINNER',
    popular: true,
  },
  {
    name: 'Problem Solving',
    slug: 'problem-solving',
    category: 'Engineering Mindset',
    description: 'Analytical reasoning, algorithmic thinking, debugging skills, edge case handling, and system decomposition.',
    icon: 'Lightbulb',
    difficulty: 'INTERMEDIATE',
    popular: true,
  },
  {
    name: 'Communication & Teamwork',
    slug: 'communication',
    category: 'Professional Skills',
    description: 'Technical writing, agile sprint standups, architectural presentations, code reviews, and workplace empathy.',
    icon: 'MessageSquare',
    difficulty: 'BEGINNER',
    popular: false,
  },
];

export const INITIAL_ASSESSMENTS = [
  {
    skillSlug: 'python',
    title: 'Python Core & Algorithms Proficiency Check',
    description: 'Test your understanding of Python data structures, list comprehensions, decorators, and memory model.',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      {
        id: 'py-1',
        question: 'What will be the output of `[x * 2 for x in range(5) if x % 2 == 0]`?',
        options: ['[0, 4, 8]', '[0, 2, 4, 6, 8]', '[2, 6]', '[0, 2, 4]'],
        correctAnswerIndex: 0,
        explanation: 'range(5) produces 0, 1, 2, 3, 4. Even numbers are 0, 2, 4. Multiplied by 2 gives [0, 4, 8].',
        topic: 'List Comprehensions',
      },
      {
        id: 'py-2',
        question: 'Which of the following Python data types is immutable?',
        options: ['List', 'Dictionary', 'Tuple', 'Set'],
        correctAnswerIndex: 2,
        explanation: 'Tuples in Python cannot be modified after instantiation, unlike lists, dictionaries, or sets.',
        topic: 'Data Types',
      },
      {
        id: 'py-3',
        question: 'What is the time complexity of looking up a key in a standard Python dictionary on average?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswerIndex: 0,
        explanation: 'Python dictionaries are implemented using hash tables, giving average O(1) key lookup.',
        topic: 'Complexity',
      },
      {
        id: 'py-4',
        question: 'How do decorators work in Python?',
        options: [
          'They are syntax sugar for functions that accept another function and return a new function',
          'They compile Python into C extensions',
          'They provide automatic garbage collection',
          'They are only used for static typing'
        ],
        correctAnswerIndex: 0,
        explanation: 'A decorator takes a callable as input and wraps its execution with extended functionality.',
        topic: 'Advanced Features',
      },
      {
        id: 'py-5',
        question: 'What is the purpose of the `*args` and `**kwargs` syntax in Python function definitions?',
        options: [
          'To define pointer references',
          'To accept variable numbers of positional and keyword arguments',
          'To enforce strict typing',
          'To optimize CPU cache utilization'
        ],
        correctAnswerIndex: 1,
        explanation: '*args gathers extra positional arguments into a tuple, while **kwargs gathers keyword arguments into a dict.',
        topic: 'Functions',
      }
    ],
  },
  {
    skillSlug: 'javascript',
    title: 'Modern JavaScript & Async Programming Diagnostic',
    description: 'Evaluate ES6+ syntax, Closures, Event Loop, Promises, and prototype mechanics.',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      {
        id: 'js-1',
        question: 'What is the main difference between `let` and `var` in JavaScript?',
        options: [
          '`let` has block scope while `var` has function scope',
          '`var` is block scoped while `let` is globally scoped',
          '`let` variables cannot be reassigned',
          'There is no difference'
        ],
        correctAnswerIndex: 0,
        explanation: '`let` is confined to the enclosing block (`{}`), whereas `var` is hoisted and scoped to the nearest enclosing function.',
        topic: 'Scoping',
      },
      {
        id: 'js-2',
        question: 'What is the output of `console.log(typeof null)` in JavaScript?',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correctAnswerIndex: 2,
        explanation: 'This is a historical bug in JavaScript from its first version where null had the type tag 0 for object.',
        topic: 'Type System',
      },
      {
        id: 'js-3',
        question: 'What executes first in the JavaScript event loop queue when both are scheduled concurrently?',
        options: ['Microtasks (e.g. Promise.then)', 'Macrotasks (e.g. setTimeout)', 'DOM paint always', 'Garbage collection cycle'],
        correctAnswerIndex: 0,
        explanation: 'Microtasks (Promises, queueMicrotask) are processed completely before the next macrotask in the event loop.',
        topic: 'Event Loop',
      },
      {
        id: 'js-4',
        question: 'What is a closure in JavaScript?',
        options: [
          'A function combined with references to its surrounding lexical environment',
          'A method to terminate memory allocation',
          'A way to close browser tabs programmatically',
          'A strict syntax rule for JSON files'
        ],
        correctAnswerIndex: 0,
        explanation: 'Closures allow inner functions to retain access to outer function variables even after the outer function finishes executing.',
        topic: 'Closures',
      },
      {
        id: 'js-5',
        question: 'Which array method creates a new array populated with the results of calling a provided function on every element?',
        options: ['filter()', 'map()', 'reduce()', 'forEach()'],
        correctAnswerIndex: 1,
        explanation: '`Array.prototype.map()` transforms each item and returns a newly constructed array without mutating the original.',
        topic: 'Array Methods',
      }
    ],
  },
  {
    skillSlug: 'react',
    title: 'React 19 & Architecture Assessment',
    description: 'Test your grasp on hooks (useState, useEffect, useMemo), virtual DOM reconciliation, state design, and performance.',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      {
        id: 'react-1',
        question: 'What does the dependency array in `useEffect(callback, deps)` control?',
        options: [
          'It defines when the effect re-runs based on changed values between renders',
          'It imports foreign npm packages into the component',
          'It defines CSS styles for the component',
          'It prevents child components from rendering'
        ],
        correctAnswerIndex: 0,
        explanation: 'React compares values in `deps` using `Object.is()`. If any value changes, the cleanup runs and the effect re-executes.',
        topic: 'Hooks',
      },
      {
        id: 'react-2',
        question: 'Why should you provide stable unique `key` props when rendering lists in React?',
        options: [
          'To help React identify which items have changed, added, or removed during reconciliation',
          'To format the list items automatically with numbers',
          'To encrypt the array contents in the DOM',
          'Keys are optional and provide no performance benefit'
        ],
        correctAnswerIndex: 0,
        explanation: 'Keys give elements a stable identity, allowing Reacts diffing algorithm to reuse DOM nodes efficiently.',
        topic: 'Reconciliation',
      },
      {
        id: 'react-3',
        question: 'What is the primary difference between `useMemo` and `useCallback`?',
        options: [
          '`useMemo` caches the calculated result of a function, while `useCallback` caches the function instance itself',
          '`useCallback` is for classes and `useMemo` is for functional components',
          '`useMemo` creates asynchronous promises',
          'They are exact aliases for one another'
        ],
        correctAnswerIndex: 0,
        explanation: 'useMemo stores a memoized value `useMemo(() => compute(), [deps])`, whereas useCallback stores a memoized callback function `useCallback(fn, [deps])`.',
        topic: 'Performance',
      },
      {
        id: 'react-4',
        question: 'What happens when state updates in a parent component in React by default?',
        options: [
          'The parent and all child components re-render unless memoized',
          'Only the parent re-renders and children are frozen',
          'The entire HTML page reloads',
          'State is discarded after 500ms'
        ],
        correctAnswerIndex: 0,
        explanation: 'In React, component re-renders cascade down the component tree unless optimized with React.memo or pure component boundaries.',
        topic: 'Component Lifecycle',
      }
    ],
  },
  {
    skillSlug: 'sql',
    title: 'SQL & Database Design Evaluation',
    description: 'Check your mastery of Joins, Group By, Indexes, ACID transactions, and normalization.',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      {
        id: 'sql-1',
        question: 'Which type of JOIN returns all rows from the left table, and matching rows from the right table?',
        options: ['LEFT JOIN', 'INNER JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
        correctAnswerIndex: 0,
        explanation: 'LEFT JOIN (or LEFT OUTER JOIN) preserves every row from the left table, filling NULLs for non-matching right table columns.',
        topic: 'Joins',
      },
      {
        id: 'sql-2',
        question: 'What is the difference between WHERE and HAVING clauses in SQL?',
        options: [
          'WHERE filters rows before aggregation; HAVING filters groups after aggregation',
          'HAVING is only used for string matching',
          'WHERE is only used on indexed primary keys',
          'There is no functional difference'
        ],
        correctAnswerIndex: 0,
        explanation: 'WHERE filters individual records prior to GROUP BY, while HAVING filters aggregated results (e.g. `HAVING COUNT(*) > 5`).',
        topic: 'Filtering & Aggregation',
      },
      {
        id: 'sql-3',
        question: 'What does the "I" stand for in ACID properties of relational databases?',
        options: ['Isolation', 'Integration', 'Iteration', 'Indexing'],
        correctAnswerIndex: 0,
        explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability.',
        topic: 'Transactions',
      },
      {
        id: 'sql-4',
        question: 'Why are database indexes (e.g. B-Trees) added to database tables?',
        options: [
          'To drastically speed up data search and retrieval at the cost of slight write overhead',
          'To compress the hard drive storage size',
          'To automatically encrypt sensitive records',
          'To prevent foreign keys from deleting'
        ],
        correctAnswerIndex: 0,
        explanation: 'B-Tree indexes reduce scan time from O(n) table scans to O(log n) tree lookups.',
        topic: 'Indexing & Performance',
      }
    ],
  },
  {
    skillSlug: 'dsa',
    title: 'Data Structures & Algorithmic Thinking',
    description: 'Evaluate knowledge of algorithmic complexity, trees, graphs, sorting, and dynamic programming.',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      {
        id: 'dsa-1',
        question: 'What is the worst-case time complexity of standard QuickSort without randomized pivoting?',
        options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(log n)'],
        correctAnswerIndex: 0,
        explanation: 'When the chosen pivot is always the smallest or largest element (e.g. already sorted array), recursion depth degrades to O(n) with O(n^2) time.',
        topic: 'Sorting & Complexity',
      },
      {
        id: 'dsa-2',
        question: 'Which data structure follows the First-In, First-Out (FIFO) principle?',
        options: ['Queue', 'Stack', 'Heap', 'Binary Search Tree'],
        correctAnswerIndex: 0,
        explanation: 'Queues process elements in FIFO order, whereas Stacks operate in LIFO order.',
        topic: 'Data Structures',
      },
      {
        id: 'dsa-3',
        question: 'What algorithm is commonly used to find the shortest path in a weighted graph with non-negative edge weights?',
        options: ['Dijkstra\'s Algorithm', 'Kruskal\'s Algorithm', 'Depth-First Search (DFS)', 'Kadane\'s Algorithm'],
        correctAnswerIndex: 0,
        explanation: 'Dijkstras algorithm uses a min-priority queue to compute single-source shortest paths in non-negative weighted graphs.',
        topic: 'Graph Algorithms',
      },
      {
        id: 'dsa-4',
        question: 'What technique solves complex problems by breaking them into overlapping subproblems and storing subproblem results?',
        options: ['Dynamic Programming', 'Greedy Method', 'Brute Force', 'Bitmasking'],
        correctAnswerIndex: 0,
        explanation: 'Dynamic Programming combines optimal substructure and overlapping subproblems via memoization or tabulation.',
        topic: 'Dynamic Programming',
      }
    ],
  }
];

export const INITIAL_ROADMAPS = [
  {
    careerGoal: 'Full Stack Developer',
    title: 'Full Stack Web Developer Career Path',
    description: 'From modern frontend UI frameworks to resilient backend APIs, databases, authentication, and cloud deployment.',
    weeklyHours: 12,
    phases: [
      {
        title: 'Phase 1: Modern Frontend Core & State Architecture',
        description: 'Master HTML5 semantic layout, responsive Tailwind CSS, TypeScript fundamentals, and React 19 component patterns.',
        estimatedWeeks: 4,
        order: 1,
        tasks: [
          { title: 'Semantic HTML & Responsive CSS Flex/Grid', description: 'Build responsive layouts without layout shifts.', type: 'LESSON', durationHours: 4, order: 1 },
          { title: 'TypeScript Core & Generics for React', description: 'Write strongly-typed interfaces, union types, and props.', type: 'LESSON', durationHours: 6, order: 2 },
          { title: 'React State, Effects & Custom Hooks', description: 'Build reusable hooks for data fetching and local storage.', type: 'PROJECT', durationHours: 8, order: 3 },
          { title: 'Form Validation with Zod & React Hook Form', description: 'Implement accessible, validated registration and login forms.', type: 'PRACTICE', durationHours: 4, order: 4 },
        ]
      },
      {
        title: 'Phase 2: Scalable Node.js Backend & Relational Databases',
        description: 'Design RESTful Express APIs, JWT security, PostgreSQL modeling, and Prisma ORM migrations.',
        estimatedWeeks: 4,
        order: 2,
        tasks: [
          { title: 'Express Server Architecture & Routing', description: 'Implement controllers, middleware, and centralized error handling.', type: 'LESSON', durationHours: 5, order: 1 },
          { title: 'PostgreSQL Relational Schema & Indexing', description: 'Model multi-table relationships, 1-to-many, and many-to-many keys.', type: 'LESSON', durationHours: 6, order: 2 },
          { title: 'Prisma ORM Migrations & Query Optimization', description: 'Write safe database queries, pagination, and data transactions.', type: 'PRACTICE', durationHours: 6, order: 3 },
          { title: 'JWT Authentication & Password Hashing', description: 'Protect private endpoints with bcrypt and signed bearer tokens.', type: 'PROJECT', durationHours: 6, order: 4 },
        ]
      },
      {
        title: 'Phase 3: Production Deployment, Testing & Portfolio',
        description: 'Automate tests with Vitest, deploy backend to cloud container hosts, and build a standout portfolio.',
        estimatedWeeks: 4,
        order: 3,
        tasks: [
          { title: 'Integration Testing with Vitest & Supertest', description: 'Write automated test suites for authentication and CRUD routes.', type: 'PRACTICE', durationHours: 5, order: 1 },
          { title: 'Fullstack Monorepo Integration', description: 'Connect React client to Express REST API with unified error handling.', type: 'PROJECT', durationHours: 8, order: 2 },
          { title: 'Cloud CI/CD & Deployment', description: 'Deploy frontend to Vercel and backend to Render with live PostgreSQL.', type: 'PROJECT', durationHours: 6, order: 3 },
        ]
      }
    ]
  },
  {
    careerGoal: 'Python Developer',
    title: 'Python Backend & Systems Developer Mastery',
    description: 'Master Python OOP, asynchronous programming, FastAPI/Django architectures, SQL, and algorithm optimization.',
    weeklyHours: 10,
    phases: [
      {
        title: 'Phase 1: Python Deep Dive & Data Structures',
        description: 'Object-oriented programming, magic methods, memory management, generators, and decorators.',
        estimatedWeeks: 4,
        order: 1,
        tasks: [
          { title: 'Pythonic Code & Idioms', description: 'Master list comprehensions, generators, and context managers.', type: 'LESSON', durationHours: 4, order: 1 },
          { title: 'OOP & Class Inheritance', description: 'Design clean class hierarchies and polymorphism.', type: 'LESSON', durationHours: 6, order: 2 },
          { title: 'Data Structures & Big-O in Python', description: 'Implement heaps, graphs, and BSTs in pure Python.', type: 'PRACTICE', durationHours: 8, order: 3 },
        ]
      },
      {
        title: 'Phase 2: High Performance Web APIs & Databases',
        description: 'Build fast RESTful APIs with relational database persistence and Redis caching.',
        estimatedWeeks: 4,
        order: 2,
        tasks: [
          { title: 'FastAPI / Flask Microservices', description: 'Create asynchronous REST APIs with Pydantic validation.', type: 'LESSON', durationHours: 6, order: 1 },
          { title: 'PostgreSQL & SQLAlchemy / Peewee', description: 'Integrate relational databases and perform complex aggregations.', type: 'PROJECT', durationHours: 8, order: 2 },
          { title: 'Asynchronous Tasks with Celery & Redis', description: 'Handle long-running background worker tasks and queues.', type: 'LESSON', durationHours: 6, order: 3 },
        ]
      }
    ]
  },
  {
    careerGoal: 'Frontend Developer',
    title: 'Modern Frontend Engineer & UI Specialist',
    description: 'Specialize in React 19, Next.js, responsive layouts, web accessibility (a11y), and performance optimization.',
    weeklyHours: 10,
    phases: [
      {
        title: 'Phase 1: Advanced CSS, Tailwind & UX Design',
        description: 'Responsive layouts, fluid typography, animations, dark mode, and design system tokens.',
        estimatedWeeks: 3,
        order: 1,
        tasks: [
          { title: 'Tailwind CSS Grid & Flexbox mastery', description: 'Build pixel-perfect SaaS layouts across screen sizes.', type: 'LESSON', durationHours: 4, order: 1 },
          { title: 'Micro-interactions & CSS Transitions', description: 'Add smooth hover states and entry animations.', type: 'PRACTICE', durationHours: 4, order: 2 },
        ]
      },
      {
        title: 'Phase 2: React State, Routing & Performance',
        description: 'React Router, client-side caching, code-splitting, and memoization.',
        estimatedWeeks: 4,
        order: 2,
        tasks: [
          { title: 'Declarative Routing with React Router', description: 'Configure nested routes, protected routes, and loaders.', type: 'LESSON', durationHours: 5, order: 1 },
          { title: 'Core Web Vitals & Performance Optimization', description: 'Optimize LCP, CLS, and reduce bundle size with dynamic imports.', type: 'PROJECT', durationHours: 6, order: 2 },
        ]
      }
    ]
  },
  {
    careerGoal: 'Backend Developer',
    title: 'Backend Systems & API Architecture',
    description: 'Server engineering, database indexing, caching strategies, message brokers, and API security.',
    weeklyHours: 12,
    phases: [
      {
        title: 'Phase 1: API Design, Security & Middleware',
        description: 'REST architectural principles, rate limiting, authentication, and schema validation.',
        estimatedWeeks: 4,
        order: 1,
        tasks: [
          { title: 'RESTful API Standards & HTTP Status Codes', description: 'Design clear resource endpoints and standard error payloads.', type: 'LESSON', durationHours: 4, order: 1 },
          { title: 'JWT, OAuth & Role-Based Access Control', description: 'Enforce user roles, token expiry, and refresh flows.', type: 'PROJECT', durationHours: 6, order: 2 },
        ]
      },
      {
        title: 'Phase 2: Database Scalability & Transactions',
        description: 'PostgreSQL ACID isolation, foreign key cascading, query execution plans, and connection pooling.',
        estimatedWeeks: 4,
        order: 2,
        tasks: [
          { title: 'PostgreSQL EXPLAIN ANALYZE & Query Plans', description: 'Eliminate sequential table scans using composite B-tree indexes.', type: 'LESSON', durationHours: 6, order: 1 },
          { title: 'Prisma Multi-table Transactions', description: 'Implement financial/atomic operations with rollbacks.', type: 'PRACTICE', durationHours: 6, order: 2 },
        ]
      }
    ]
  },
  {
    careerGoal: 'Java Developer',
    title: 'Enterprise Java & Spring Boot Architect',
    description: 'Core Java 21, JVM internals, Spring Boot microservices, Hibernate/JPA, and enterprise architectures.',
    weeklyHours: 12,
    phases: [
      {
        title: 'Phase 1: Java 21 Core & Multithreading',
        description: 'Virtual threads, pattern matching, collections framework, and JVM memory model.',
        estimatedWeeks: 4,
        order: 1,
        tasks: [
          { title: 'Java Collections & Streams API', description: 'Process data pipelines with filter/map/reduce in Java.', type: 'LESSON', durationHours: 5, order: 1 },
          { title: 'Concurrency & Virtual Threads', description: 'Master executor services, locks, and Java 21 Project Loom.', type: 'LESSON', durationHours: 6, order: 2 },
        ]
      },
      {
        title: 'Phase 2: Spring Boot REST & JPA',
        description: 'Dependency injection, Spring Data JPA, Hibernate caching, and security filters.',
        estimatedWeeks: 5,
        order: 2,
        tasks: [
          { title: 'Spring Boot Dependency Injection & Controllers', description: 'Build enterprise REST endpoints with Bean validation.', type: 'PROJECT', durationHours: 8, order: 1 },
        ]
      }
    ]
  },
  {
    careerGoal: 'Software Engineer',
    title: 'Computer Science & Software Engineering Core',
    description: 'DSA, System Design fundamentals, design patterns, clean code, and engineering best practices.',
    weeklyHours: 12,
    phases: [
      {
        title: 'Phase 1: Data Structures & Problem Solving',
        description: 'Arrays, Hash maps, Two Pointers, Trees, Graphs, and Dynamic Programming.',
        estimatedWeeks: 5,
        order: 1,
        tasks: [
          { title: 'Binary Search & Sliding Window Patterns', description: 'Solve standard algorithmic patterns with O(log n) efficiency.', type: 'PRACTICE', durationHours: 6, order: 1 },
          { title: 'Tree Traversals & Graph BFS/DFS', description: 'Implement recursive and iterative graph search algorithms.', type: 'PRACTICE', durationHours: 8, order: 2 },
        ]
      },
      {
        title: 'Phase 2: Object-Oriented Design & System Architecture',
        description: 'SOLID principles, Factory, Strategy, Observer patterns, and caching tiers.',
        estimatedWeeks: 4,
        order: 2,
        tasks: [
          { title: 'SOLID Principles in Practice', description: 'Refactor monolithic spaghetti code into decoupled modules.', type: 'LESSON', durationHours: 5, order: 1 },
        ]
      }
    ]
  },
  {
    careerGoal: 'Data Analyst',
    title: 'Data Analytics, SQL & Business Intelligence',
    description: 'Advanced SQL queries, window functions, Python Pandas data wrangling, and interactive dashboards.',
    weeklyHours: 10,
    phases: [
      {
        title: 'Phase 1: Advanced SQL & Data Extraction',
        description: 'Window functions (RANK, ROW_NUMBER, LAG/LEAD), CTEs, and cohort analysis.',
        estimatedWeeks: 4,
        order: 1,
        tasks: [
          { title: 'SQL Window Functions & Partitioning', description: 'Calculate running totals, moving averages, and month-over-month growth.', type: 'LESSON', durationHours: 6, order: 1 },
          { title: 'Common Table Expressions (CTEs) & Subqueries', description: 'Organize multi-stage queries for complex metric generation.', type: 'PRACTICE', durationHours: 5, order: 2 },
        ]
      },
      {
        title: 'Phase 2: Python Data Wrangling & Visualization',
        description: 'Pandas, NumPy, statistical testing, Matplotlib/Seaborn, and reporting.',
        estimatedWeeks: 4,
        order: 2,
        tasks: [
          { title: 'Pandas Data Cleaning & Aggregation', description: 'Handle missing values, date parsing, and merge datasets.', type: 'PROJECT', durationHours: 8, order: 1 },
        ]
      }
    ]
  }
];

export const INITIAL_COURSES = [
  {
    title: 'Python Mastery for Modern Developers',
    slug: 'python-mastery',
    category: 'Programming Languages',
    level: 'BEGINNER',
    durationHours: 14.5,
    instructor: 'Skillsware Academy',
    rating: 4.9,
    totalStudents: 1420,
    description: 'Learn modern Python from core syntax and data structures to object-oriented patterns, decorators, file I/O, and API integrations.',
    tags: ['Python', 'Backend', 'Scripting', 'Algorithms'],
    lessons: [
      {
        title: 'Python Fundamentals: Types, Variables & Conditionals',
        description: 'Core syntax rules, dynamic typing, truthy/falsy expressions, and control flow.',
        order: 1,
        durationMinutes: 25,
        content: `### Python Fundamentals & Syntax Architecture

Python is a high-level, interpreted programming language renowned for its readability and simplicity.

#### Key Concepts Covered:
1. **Dynamic Typing**: Variables in Python hold references to objects in memory rather than raw value slots.
2. **Control Flow**: Using \`if\`, \`elif\`, and \`else\` blocks with clean 4-space indentation.
3. **Data Types**: Integers, floats, booleans, and immutable strings.

\`\`\`python
# Example: Clean conditionals and format strings
user_name = "Smily"
experience_years = 2

if experience_years >= 2:
    status = "Intermediate Developer"
else:
    status = "Aspiring Engineer"

print(f"Developer: {user_name} | Status: {status}")
\`\`\`

#### Best Practices:
- Always follow PEP 8 style conventions (snake_case for variable names).
- Use f-strings (\`f"..."\`) for concise, performant string interpolation.
`,
        officialDocsUrl: 'https://docs.python.org/3/tutorial/index.html',
        codeSnippet: `def greet_developer(name: str, goal: str) -> str:
    return f"Welcome {name} to Skillsware! Your target is {goal}."

print(greet_developer("Alex", "Full Stack Developer"))`,
      },
      {
        title: 'Lists, Tuples, Dictionaries & Sets',
        description: 'In-depth exploration of built-in Python collections, memory implications, and comprehension syntax.',
        order: 2,
        durationMinutes: 30,
        content: `### Mastering Python Collections

Python provides four primary built-in collection types:

| Data Structure | Ordered | Mutable | Duplicates Allowed | Best Use Case |
|---|---|---|---|---|
| **List** (\`[]\`) | Yes | Yes | Yes | Dynamic sequences, stacks |
| **Tuple** (\`()\`) | Yes | No | Yes | Immutable records, dictionary keys |
| **Dict** (\`{}\`) | Yes (3.7+) | Yes | Keys: No, Values: Yes | Key-value lookups (O(1)) |
| **Set** (\`set()\`) | No | Yes | No | Uniqueness testing, Venn operations |

\`\`\`python
# List comprehension with filtering
scores = [78, 92, 65, 88, 95, 54]
passing_scores = [s for s in scores if s >= 70]
print("Passing:", passing_scores)

# Dictionary lookup
skills_map = {"python": "Advanced", "react": "Intermediate"}
print("React skill:", skills_map.get("react", "Unassessed"))
\`\`\`
`,
        officialDocsUrl: 'https://docs.python.org/3/tutorial/datastructures.html',
        codeSnippet: `skills = ["Python", "SQL", "React", "Docker"]
senior_skills = {skill: True for skill in skills}
print("Skills Map:", senior_skills)`,
      },
      {
        title: 'Functions, Decorators & Closures',
        description: 'First-class functions, higher-order functions, *args/**kwargs, and writing custom decorators.',
        order: 3,
        durationMinutes: 35,
        content: `### Advanced Python Functions & Decorators

In Python, functions are first-class citizens. You can pass them as arguments, assign them to variables, and return them from other functions.

\`\`\`python
import time

def timing_decorator(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        duration = time.time() - start
        print(f"Function '{func.__name__}' executed in {duration:.4f}s")
        return result
    return wrapper

@timing_decorator
def calculate_squares(n):
    return [i**2 for i in range(n)]

calculate_squares(100000)
\`\`\`
`,
        officialDocsUrl: 'https://docs.python.org/3/glossary.html#term-decorator',
        codeSnippet: `def log_call(fn):
    def wrapped(*args):
        print(f"Calling {fn.__name__} with {args}")
        return fn(*args)
    return wrapped`,
      }
    ]
  },
  {
    title: 'Modern JavaScript & TypeScript from Scratch',
    slug: 'modern-javascript-typescript',
    category: 'Web Development',
    level: 'BEGINNER',
    durationHours: 16.0,
    instructor: 'Skillsware Academy',
    rating: 4.8,
    totalStudents: 2150,
    description: 'Master ES6+ JavaScript, Asynchronous Promises/Async-Await, DOM APIs, and transition seamlessly into TypeScript.',
    tags: ['JavaScript', 'TypeScript', 'ES6', 'Frontend'],
    lessons: [
      {
        title: 'ES6+ Essentials: Destructuring, Spread & Arrow Functions',
        description: 'Modern syntax patterns for clean, declarative JavaScript code.',
        order: 1,
        durationMinutes: 20,
        content: `### Modern JavaScript Syntax Standards

ES6 revolutionized JavaScript with expressive syntax that reduces boilerplate and prevents common scoping bugs.

\`\`\`javascript
// Object & Array Destructuring
const user = { name: 'Sarah', role: 'Engineer', skills: ['React', 'Node'] };
const { name, role } = user;
const [primarySkill, secondarySkill] = user.skills;

// Rest and Spread Operators
const updatedUser = {
  ...user,
  experienceYears: 3,
  status: 'Active'
};
\`\`\`
`,
        officialDocsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        codeSnippet: `const formatUserBadge = ({ name, role = 'Member' }) => {
  return \`[\${role.toUpperCase()}] \${name}\`;
};
console.log(formatUserBadge({ name: 'Jordan', role: 'Admin' }));`,
      },
      {
        title: 'Async JavaScript: Event Loop, Promises & Async/Await',
        description: 'Understand non-blocking I/O, microtasks vs macrotasks, and safe error handling with try/catch.',
        order: 2,
        durationMinutes: 30,
        content: `### Asynchronous Programming in JS

JavaScript is single-threaded with an event-driven runtime. Long-running network or disk operations run asynchronously without blocking the UI thread.

\`\`\`typescript
async function fetchSkillDetails(skillSlug: string) {
  try {
    const response = await fetch(\`/api/skills/\${skillSlug}\`);
    if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}
\`\`\`
`,
        officialDocsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop',
        codeSnippet: `async function runSequence() {
  console.log("Step 1: Init");
  await new Promise(res => setTimeout(res, 100));
  console.log("Step 2: Done");
}
runSequence();`,
      }
    ]
  },
  {
    title: 'React 19 & Fullstack UI Architecture',
    slug: 'react-fullstack-architecture',
    category: 'Frontend Frameworks',
    level: 'INTERMEDIATE',
    durationHours: 18.0,
    instructor: 'Skillsware Academy',
    rating: 4.95,
    totalStudents: 3100,
    description: 'Deep dive into React 19, hooks lifecycle, context state management, performance memoization, and Tailwind design systems.',
    tags: ['React', 'Tailwind', 'UI/UX', 'Frontend'],
    lessons: [
      {
        title: 'Component Design Patterns & Custom Hooks',
        description: 'Creating modular, testable UI components and isolating stateful logic in custom hooks.',
        order: 1,
        durationMinutes: 30,
        content: `### Custom React Hooks Architecture

Extracting stateful business logic into reusable custom hooks makes your presentation components pure and easy to test.

\`\`\`typescript
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
\`\`\`
`,
        officialDocsUrl: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
        codeSnippet: `export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {children}
    </div>
  );
}`,
      }
    ]
  },
  {
    title: 'SQL, PostgreSQL & Relational Database Design',
    slug: 'postgresql-database-mastery',
    category: 'Databases',
    level: 'BEGINNER',
    durationHours: 12.0,
    instructor: 'Skillsware Academy',
    rating: 4.85,
    totalStudents: 1890,
    description: 'Learn SQL querying, complex joins, indexing strategies, normalization, and ACID transaction semantics.',
    tags: ['SQL', 'PostgreSQL', 'Prisma', 'Databases'],
    lessons: [
      {
        title: 'Relational Schemas, Constraints & Foreign Keys',
        description: 'Design robust 3NF schemas with primary keys, unique constraints, and foreign key cascades.',
        order: 1,
        durationMinutes: 25,
        content: `### Database Normalization & Foreign Key Relations

Relational databases structure data into tables with defined columns and strict data types to prevent data duplication.

\`\`\`sql
-- Creating parent and child relational tables
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    proficiency_level VARCHAR(50) NOT NULL,
    UNIQUE(user_id, skill_name)
);
\`\`\`
`,
        officialDocsUrl: 'https://www.postgresql.org/docs/current/tutorial-sql.html',
        codeSnippet: `SELECT u.email, s.skill_name, s.proficiency_level
FROM users u
INNER JOIN user_skills s ON u.id = s.user_id
WHERE s.proficiency_level = 'ADVANCED'
ORDER BY u.email ASC;`,
      }
    ]
  },
  {
    title: 'Git, GitHub & Professional Collaboration',
    slug: 'git-github-collaboration',
    category: 'DevOps & Tooling',
    level: 'BEGINNER',
    durationHours: 8.5,
    instructor: 'Skillsware Academy',
    rating: 4.9,
    totalStudents: 2400,
    description: 'Distributed version control, branch management, pull requests, resolving merge conflicts, and GitHub workflows.',
    tags: ['Git', 'GitHub', 'CI/CD', 'Collaboration'],
    lessons: [
      {
        title: 'Git Branching Strategies & Pull Requests',
        description: 'Master git checkout -b, git rebase, commit conventions, and peer review workflows.',
        order: 1,
        durationMinutes: 20,
        content: `### Professional Git Branching Workflows

Using feature branches keeps the \`main\` branch stable and deployable at all times.

\`\`\`bash
# 1. Create and switch to a new feature branch
git checkout -b feature/auth-jwt-middleware

# 2. Stage and commit with conventional messages
git add .
git commit -m "feat(auth): add JWT verification middleware and token tests"

# 3. Push to remote and open a Pull Request
git push -u origin feature/auth-jwt-middleware
\`\`\`
`,
        officialDocsUrl: 'https://git-scm.com/doc',
        codeSnippet: `git branch -a
git status
git log --oneline --graph --decorate`,
      }
    ]
  },
  {
    title: 'Data Structures & Algorithms in Practice',
    slug: 'data-structures-algorithms',
    category: 'Computer Science',
    level: 'ADVANCED',
    durationHours: 22.0,
    instructor: 'Skillsware Academy',
    rating: 4.92,
    totalStudents: 4100,
    description: 'Master technical interview problem solving, Big-O notation, trees, graphs, sorting, and dynamic programming.',
    tags: ['DSA', 'Algorithms', 'Interview Prep', 'LeetCode'],
    lessons: [
      {
        title: 'Big-O Asymptotic Complexity & Two Pointer Pattern',
        description: 'Analyze time and space complexity with practical problem walkthroughs.',
        order: 1,
        durationMinutes: 30,
        content: `### Asymptotic Complexity & The Two Pointer Pattern

When solving array problems, the Two Pointer technique often reduces O(n^2) brute force algorithms down to O(n) linear time with O(1) extra space.

\`\`\`python
def two_sum_sorted(numbers: list[int], target: int) -> list[int]:
    """Find indices of two numbers that add to target in a sorted array."""
    left, right = 0, len(numbers) - 1
    
    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left + 1, right + 1] # 1-based index
        elif current_sum < target:
            left += 1
        else:
            right -= 1
            
    return []
\`\`\`
`,
        officialDocsUrl: 'https://en.wikipedia.org/wiki/Big_O_notation',
        codeSnippet: `def is_palindrome(s: str) -> bool:
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]

print(is_palindrome("A man, a plan, a canal: Panama"))`,
      }
    ]
  }
];

export const INITIAL_CODING_PROBLEMS = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'EASY',
    category: 'Arrays & Hashing',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].' }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    starterCode: {
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    # Write your solution here
    pass`,
      javascript: `function twoSum(nums, target) {
    // Write your solution here
}`
    },
    solutionCode: {
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, n in enumerate(nums):
        diff = target - n
        if diff in seen:
            return [seen[diff], i]
        seen[n] = i
    return []`,
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            return [map.get(diff), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`
    },
    testCases: [
      { input: '{"nums": [2, 7, 11, 15], "target": 9}', expectedOutput: '[0, 1]', isHidden: false },
      { input: '{"nums": [3, 2, 4], "target": 6}', expectedOutput: '[1, 2]', isHidden: false },
      { input: '{"nums": [3, 3], "target": 6}', expectedOutput: '[0, 1]', isHidden: false },
      { input: '{"nums": [1, 5, 8, 12, 19], "target": 20}', expectedOutput: '[0, 4]', isHidden: true }
    ],
    acceptanceRate: 91.2,
    points: 100,
  },
  {
    title: 'Valid Palindrome',
    slug: 'valid-palindrome',
    difficulty: 'EASY',
    category: 'Two Pointers & Strings',
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.`,
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' },
      { input: 's = " "', output: 'true', explanation: 's is an empty string "" after removing non-alphanumeric characters.' }
    ],
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.'
    ],
    starterCode: {
      python: `def isPalindrome(s: str) -> bool:
    # Write your solution here
    pass`,
      javascript: `function isPalindrome(s) {
    // Write your solution here
}`
    },
    solutionCode: {
      python: `def isPalindrome(s: str) -> bool:
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]`,
      javascript: `function isPalindrome(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}`
    },
    testCases: [
      { input: '{"s": "A man, a plan, a canal: Panama"}', expectedOutput: 'true', isHidden: false },
      { input: '{"s": "race a car"}', expectedOutput: 'false', isHidden: false },
      { input: '{"s": " "}', expectedOutput: 'true', isHidden: false },
      { input: '{"s": "0P"}', expectedOutput: 'false', isHidden: true }
    ],
    acceptanceRate: 88.5,
    points: 100,
  },
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'EASY',
    category: 'Stack',
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: 'true', explanation: 'Matching pair.' },
      { input: 's = "()[]{}"', output: 'true', explanation: 'All matching.' },
      { input: 's = "(]"', output: 'false', explanation: 'Mismatched brackets.' }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.'
    ],
    starterCode: {
      python: `def isValid(s: str) -> bool:
    # Write your solution here
    pass`,
      javascript: `function isValid(s) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"s": "()"}', expectedOutput: 'true', isHidden: false },
      { input: '{"s": "()[]{}"}', expectedOutput: 'true', isHidden: false },
      { input: '{"s": "(]"}', expectedOutput: 'false', isHidden: false },
      { input: '{"s": "([)]"}', expectedOutput: 'false', isHidden: true }
    ],
    acceptanceRate: 86.4,
    points: 100,
  },
  {
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    difficulty: 'EASY',
    category: 'Linked Lists',
    description: `Given the \`head\` of a singly linked list as an array of values, return the reversed list.`,
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]', explanation: 'Reversed order.' },
      { input: 'head = [1,2]', output: '[2,1]', explanation: 'Reversed order.' },
      { input: 'head = []', output: '[]', explanation: 'Empty list.' }
    ],
    constraints: ['The number of nodes in the list is the range [0, 5000].', '-5000 <= Node.val <= 5000'],
    starterCode: {
      python: `def reverseList(head: list[int]) -> list[int]:
    # Write your solution here
    pass`,
      javascript: `function reverseList(head) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"head": [1, 2, 3, 4, 5]}', expectedOutput: '[5, 4, 3, 2, 1]', isHidden: false },
      { input: '{"head": [1, 2]}', expectedOutput: '[2, 1]', isHidden: false },
      { input: '{"head": []}', expectedOutput: '[]', isHidden: false }
    ],
    acceptanceRate: 89.1,
    points: 100,
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    difficulty: 'EASY',
    category: 'Arrays & Dynamic Programming',
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'In this case, no transactions are done and max profit = 0.' }
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    starterCode: {
      python: `def maxProfit(prices: list[int]) -> int:
    # Write your solution here
    pass`,
      javascript: `function maxProfit(prices) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"prices": [7, 1, 5, 3, 6, 4]}', expectedOutput: '5', isHidden: false },
      { input: '{"prices": [7, 6, 4, 3, 1]}', expectedOutput: '0', isHidden: false },
      { input: '{"prices": [2, 4, 1]}', expectedOutput: '2', isHidden: true }
    ],
    acceptanceRate: 84.7,
    points: 100,
  },
  {
    title: 'Merge Two Sorted Lists',
    slug: 'merge-two-sorted-lists',
    difficulty: 'EASY',
    category: 'Linked Lists',
    description: `You are given two sorted arrays \`list1\` and \`list2\`. Merge the two lists into one sorted array.`,
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]', explanation: 'Combined sorted array.' },
      { input: 'list1 = [], list2 = []', output: '[]', explanation: 'Empty lists.' }
    ],
    constraints: ['0 <= list1.length, list2.length <= 50', '-100 <= Node.val <= 100'],
    starterCode: {
      python: `def mergeTwoLists(list1: list[int], list2: list[int]) -> list[int]:
    # Write your solution here
    pass`,
      javascript: `function mergeTwoLists(list1, list2) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"list1": [1, 2, 4], "list2": [1, 3, 4]}', expectedOutput: '[1, 1, 2, 3, 4, 4]', isHidden: false },
      { input: '{"list1": [], "list2": []}', expectedOutput: '[]', isHidden: false }
    ],
    acceptanceRate: 87.0,
    points: 100,
  },
  {
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    difficulty: 'EASY',
    category: 'Arrays & Hashing',
    description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true', explanation: '1 appears twice.' },
      { input: 'nums = [1,2,3,4]', output: 'false', explanation: 'All distinct.' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    starterCode: {
      python: `def containsDuplicate(nums: list[int]) -> bool:
    # Write your solution here
    pass`,
      javascript: `function containsDuplicate(nums) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"nums": [1, 2, 3, 1]}', expectedOutput: 'true', isHidden: false },
      { input: '{"nums": [1, 2, 3, 4]}', expectedOutput: 'false', isHidden: false }
    ],
    acceptanceRate: 92.4,
    points: 100,
  },
  {
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    difficulty: 'EASY',
    category: 'Strings & Hashing',
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise. An Anagram is a word formed by rearranging the letters of another word.`,
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true', explanation: 'Same frequency of characters.' },
      { input: 's = "rat", t = "car"', output: 'false', explanation: 'Different characters.' }
    ],
    constraints: ['1 <= s.length, t.length <= 5 * 10^4'],
    starterCode: {
      python: `def isAnagram(s: str, t: str) -> bool:
    # Write your solution here
    pass`,
      javascript: `function isAnagram(s, t) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"s": "anagram", "t": "nagaram"}', expectedOutput: 'true', isHidden: false },
      { input: '{"s": "rat", "t": "car"}', expectedOutput: 'false', isHidden: false }
    ],
    acceptanceRate: 90.1,
    points: 100,
  },
  {
    title: 'Binary Search',
    slug: 'binary-search',
    difficulty: 'EASY',
    category: 'Binary Search',
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`. You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4.' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1.' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All integers in nums are unique.'],
    starterCode: {
      python: `def search(nums: list[int], target: int) -> int:
    # Write your solution here
    pass`,
      javascript: `function search(nums, target) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"nums": [-1, 0, 3, 5, 9, 12], "target": 9}', expectedOutput: '4', isHidden: false },
      { input: '{"nums": [-1, 0, 3, 5, 9, 12], "target": 2}', expectedOutput: '-1', isHidden: false }
    ],
    acceptanceRate: 88.0,
    points: 100,
  },
  {
    title: 'Maximum Subarray (Kadane\'s Algorithm)',
    slug: 'maximum-subarray',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { input: 'nums = [1]', output: '1', explanation: 'Single element.' },
      { input: 'nums = [5,4,-1,7,8]', output: '23', explanation: 'Entire array sum is 23.' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    starterCode: {
      python: `def maxSubArray(nums: list[int]) -> int:
    # Write your solution here
    pass`,
      javascript: `function maxSubArray(nums) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"nums": [-2, 1, -3, 4, -1, 2, 1, -5, 4]}', expectedOutput: '6', isHidden: false },
      { input: '{"nums": [1]}', expectedOutput: '1', isHidden: false },
      { input: '{"nums": [5, 4, -1, 7, 8]}', expectedOutput: '23', isHidden: false }
    ],
    acceptanceRate: 75.3,
    points: 200,
  },
  {
    title: '3Sum',
    slug: '3sum',
    difficulty: 'MEDIUM',
    category: 'Two Pointers & Arrays',
    description: `Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`. The solution set must not contain duplicate triplets.`,
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]', explanation: 'The distinct triplets are [-1,0,1] and [-1,-1,2].' },
      { input: 'nums = [0,1,1]', output: '[]', explanation: 'No triplets sum to 0.' }
    ],
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    starterCode: {
      python: `def threeSum(nums: list[int]) -> list[list[int]]:
    # Write your solution here
    pass`,
      javascript: `function threeSum(nums) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"nums": [-1, 0, 1, 2, -1, -4]}', expectedOutput: '[[-1, -1, 2], [-1, 0, 1]]', isHidden: false },
      { input: '{"nums": [0, 1, 1]}', expectedOutput: '[]', isHidden: false }
    ],
    acceptanceRate: 64.8,
    points: 200,
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'MEDIUM',
    category: 'Sliding Window',
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3.' }
    ],
    constraints: ['0 <= s.length <= 5 * 10^4'],
    starterCode: {
      python: `def lengthOfLongestSubstring(s: str) -> int:
    # Write your solution here
    pass`,
      javascript: `function lengthOfLongestSubstring(s) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"s": "abcabcbb"}', expectedOutput: '3', isHidden: false },
      { input: '{"s": "bbbbb"}', expectedOutput: '1', isHidden: false },
      { input: '{"s": "pwwkew"}', expectedOutput: '3', isHidden: false }
    ],
    acceptanceRate: 68.2,
    points: 200,
  },
  {
    title: 'Container With Most Water',
    slug: 'container-with-most-water',
    difficulty: 'MEDIUM',
    category: 'Two Pointers',
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`th line are \`(i, 0)\` and \`(i, height[i])\`. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.`,
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'Max area is between indices 1 and 8.' },
      { input: 'height = [1,1]', output: '1', explanation: 'Area = 1 * 1 = 1.' }
    ],
    constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
    starterCode: {
      python: `def maxArea(height: list[int]) -> int:
    # Write your solution here
    pass`,
      javascript: `function maxArea(height) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"height": [1, 8, 6, 2, 5, 4, 8, 3, 7]}', expectedOutput: '49', isHidden: false },
      { input: '{"height": [1, 1]}', expectedOutput: '1', isHidden: false }
    ],
    acceptanceRate: 72.1,
    points: 200,
  },
  {
    title: 'Group Anagrams',
    slug: 'group-anagrams',
    difficulty: 'MEDIUM',
    category: 'Arrays & Hashing',
    description: `Given an array of strings \`strs\`, group the **anagrams** together. You can return the answer in any order.`,
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explanation: 'Grouped by anagram signature.' },
      { input: 'strs = [""]', output: '[[""]]', explanation: 'Single empty string.' }
    ],
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100'],
    starterCode: {
      python: `def groupAnagrams(strs: list[str]) -> list[list[str]]:
    # Write your solution here
    pass`,
      javascript: `function groupAnagrams(strs) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"strs": ["eat", "tea", "tan", "ate", "nat", "bat"]}', expectedOutput: '[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]', isHidden: false },
      { input: '{"strs": [""]}', expectedOutput: '[[""]]', isHidden: false }
    ],
    acceptanceRate: 70.8,
    points: 200,
  },
  {
    title: 'Top K Frequent Elements',
    slug: 'top-k-frequent-elements',
    difficulty: 'MEDIUM',
    category: 'Heap & Hashing',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You may return the answer in any order.`,
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]', explanation: '1 occurs 3 times, 2 occurs 2 times.' },
      { input: 'nums = [1], k = 1', output: '[1]', explanation: 'Single element.' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', 'k is in range [1, the number of unique elements].'],
    starterCode: {
      python: `def topKFrequent(nums: list[int], k: int) -> list[int]:
    # Write your solution here
    pass`,
      javascript: `function topKFrequent(nums, k) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"nums": [1, 1, 1, 2, 2, 3], "k": 2}', expectedOutput: '[1, 2]', isHidden: false },
      { input: '{"nums": [1], "k": 1}', expectedOutput: '[1]', isHidden: false }
    ],
    acceptanceRate: 69.4,
    points: 200,
  },
  {
    title: 'Product of Array Except Self',
    slug: 'product-of-array-except-self',
    difficulty: 'MEDIUM',
    category: 'Arrays & Prefix Sums',
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`. You must write an algorithm that runs in \`O(n)\` time and without using the division operation.`,
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]', explanation: 'Product without self.' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]', explanation: 'Product without self.' }
    ],
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30'],
    starterCode: {
      python: `def productExceptSelf(nums: list[int]) -> list[int]:
    # Write your solution here
    pass`,
      javascript: `function productExceptSelf(nums) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"nums": [1, 2, 3, 4]}', expectedOutput: '[24, 12, 8, 6]', isHidden: false },
      { input: '{"nums": [-1, 1, 0, -3, 3]}', expectedOutput: '[0, 0, 9, 0, 0]', isHidden: false }
    ],
    acceptanceRate: 74.5,
    points: 200,
  },
  {
    title: 'Number of Islands',
    slug: 'number-of-islands',
    difficulty: 'MEDIUM',
    category: 'Graphs & BFS/DFS',
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.`,
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1', explanation: 'All connected lands form 1 island.' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3', explanation: '3 separate islands.' }
    ],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300'],
    starterCode: {
      python: `def numIslands(grid: list[list[str]]) -> int:
    # Write your solution here
    pass`,
      javascript: `function numIslands(grid) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"grid": [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]}', expectedOutput: '3', isHidden: false }
    ],
    acceptanceRate: 65.0,
    points: 200,
  },
  {
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    difficulty: 'EASY',
    category: 'Dynamic Programming',
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: 'n = 2', output: '2', explanation: '1. 1 step + 1 step \\n 2. 2 steps' },
      { input: 'n = 3', output: '3', explanation: '1. 1+1+1 \\n 2. 1+2 \\n 3. 2+1' }
    ],
    constraints: ['1 <= n <= 45'],
    starterCode: {
      python: `def climbStairs(n: int) -> int:
    # Write your solution here
    pass`,
      javascript: `function climbStairs(n) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"n": 2}', expectedOutput: '2', isHidden: false },
      { input: '{"n": 3}', expectedOutput: '3', isHidden: false },
      { input: '{"n": 5}', expectedOutput: '8', isHidden: false }
    ],
    acceptanceRate: 89.2,
    points: 100,
  },
  {
    title: 'Trapping Rain Water',
    slug: 'trapping-rain-water',
    difficulty: 'HARD',
    category: 'Two Pointers & Dynamic Programming',
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: '6 units of rain water trapped.' },
      { input: 'height = [4,2,0,3,2,5]', output: '9', explanation: '9 units of rain water trapped.' }
    ],
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
    starterCode: {
      python: `def trap(height: list[int]) -> int:
    # Write your solution here
    pass`,
      javascript: `function trap(height) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"height": [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]}', expectedOutput: '6', isHidden: false },
      { input: '{"height": [4, 2, 0, 3, 2, 5]}', expectedOutput: '9', isHidden: false }
    ],
    acceptanceRate: 52.1,
    points: 300,
  },
  {
    title: 'Median of Two Sorted Arrays',
    slug: 'median-of-two-sorted-arrays',
    difficulty: 'HARD',
    category: 'Binary Search & Divide and Conquer',
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the median of the two sorted arrays. The overall run time complexity should be \`O(log (m+n))\`.`,
    examples: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000', explanation: 'merged array = [1,2,3] and median is 2.' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.50000', explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.' }
    ],
    constraints: ['nums1.length == m', 'nums2.length == n', '0 <= m, n <= 1000', '1 <= m + n <= 2000'],
    starterCode: {
      python: `def findMedianSortedArrays(nums1: list[int], nums2: list[int]) -> float:
    # Write your solution here
    pass`,
      javascript: `function findMedianSortedArrays(nums1, nums2) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '{"nums1": [1, 3], "nums2": [2]}', expectedOutput: '2.0', isHidden: false },
      { input: '{"nums1": [1, 2], "nums2": [3, 4]}', expectedOutput: '2.5', isHidden: false }
    ],
    acceptanceRate: 46.3,
    points: 300,
  }
];

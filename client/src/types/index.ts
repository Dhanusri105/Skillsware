export interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'FRESHER' | 'PROFESSIONAL' | 'ADMIN';
  avatar?: string;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  bio?: string;
  title?: string;
  college?: string;
  degree?: string;
  graduationYear?: number;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  targetRole?: string;
  experienceLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  weeklyHours?: number;
}

export interface UserStats {
  skillsLearned: number;
  learningStreak: number;
  problemsSolved: number;
  coursesInProgress: number;
  profileCompletion: number;
  activeRoadmap?: Roadmap;
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  icon?: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  popular: boolean;
  assessments?: Array<{ id: string; title: string; durationMinutes: number; totalQuestions: number }>;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  topic?: string;
  explanation?: string;
}

export interface SkillAssessment {
  id: string;
  title: string;
  description: string;
  skillId: string;
  skillSlug: string;
  skillName?: string;
  durationMinutes: number;
  totalQuestions: number;
  passingScore: number;
  questions: AssessmentQuestion[];
}

export interface AssessmentResult {
  id: string;
  userId: string;
  assessmentId: string;
  score: number;
  maxScore: number;
  percentage: number;
  proficiencyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  skillGaps: string[];
  strengths: string[];
  recommendations: Array<{ title: string; link?: string; action?: string }>;
  createdAt: string;
  assessment?: {
    title: string;
    skill: { name: string; slug: string };
  };
}

export interface RoadmapTask {
  id: string;
  phaseId: string;
  title: string;
  description: string;
  type: 'LESSON' | 'PRACTICE' | 'PROJECT' | 'ASSESSMENT' | 'READING';
  resourceUrl?: string;
  durationHours: number;
  isCompleted: boolean;
  completedAt?: string | null;
  order: number;
}

export interface RoadmapPhase {
  id: string;
  roadmapId: string;
  title: string;
  description: string;
  order: number;
  estimatedWeeks: number;
  tasks: RoadmapTask[];
}

export interface Roadmap {
  id: string;
  userId: string;
  title: string;
  careerGoal: string;
  description: string;
  currentLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  targetLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  weeklyHours: number;
  progressPercentage: number;
  isCustom: boolean;
  phases: RoadmapPhase[];
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  durationMinutes: number;
  content: string;
  videoUrl?: string;
  officialDocsUrl?: string;
  codeSnippet?: string;
  isFree: boolean;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  durationHours: number;
  thumbnail?: string;
  tags: string[];
  instructor: string;
  rating: number;
  totalStudents: number;
  isPublished: boolean;
  lessons?: Lesson[];
  isEnrolled?: boolean;
  userProgress?: number;
  completedLessonIds?: string[];
  _count?: { enrollments: number; lessons: number };
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface CodingProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  category: string;
  description: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
  starterCode: {
    python: string;
    javascript: string;
  };
  solutionCode?: {
    python?: string;
    javascript?: string;
  };
  testCases?: TestCase[];
  acceptanceRate: number;
  points: number;
  lastSubmission?: CodeSubmission | null;
}

export interface CodeSubmission {
  id: string;
  userId: string;
  problemId: string;
  language: string;
  code: string;
  status: 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'MEMORY_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'COMPILE_ERROR';
  runtimeMs?: number;
  memoryKb?: number;
  testCasesPassed: number;
  totalTestCases: number;
  errorOutput?: string;
  createdAt: string;
  problem?: {
    title: string;
    difficulty: string;
    slug: string;
  };
}

export interface CodeExecutionResult {
  status: 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'COMPILE_ERROR';
  runtimeMs: number;
  memoryKb: number;
  testCasesPassed: number;
  totalTestCases: number;
  output?: string;
  errorOutput?: string;
  details?: Array<{
    testCaseIndex: number;
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
    isHidden?: boolean;
  }>;
}

export interface PortfolioProject {
  id?: string;
  title: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  image?: string;
  featured: boolean;
  order?: number;
}

export interface Certification {
  id?: string;
  title: string;
  issuer: string;
  issueDate?: string | Date;
  credentialUrl?: string;
  credentialId?: string;
}

export interface Portfolio {
  id: string;
  userId: string;
  customSlug: string;
  themeTemplate: string;
  headline?: string;
  summary?: string;
  isPublished: boolean;
  viewsCount: number;
  projects: PortfolioProject[];
  certifications: Certification[];
  user?: {
    name: string;
    email: string;
    avatar?: string;
    profile?: UserProfile;
  };
}

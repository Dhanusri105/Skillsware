import {
  INITIAL_SKILLS,
  INITIAL_ASSESSMENTS,
  INITIAL_ROADMAPS,
  INITIAL_COURSES,
  INITIAL_CODING_PROBLEMS,
} from './data/seedData';
import { prisma, isDatabaseConnected } from '../config/prisma';
import { hashPassword, comparePassword } from '../utils/password';

// In-memory persistent demo store
class DataStore {
  users: any[] = [];
  profiles: any[] = [];
  skills: any[] = [];
  assessments: any[] = [];
  assessmentResults: any[] = [];
  roadmaps: any[] = [];
  courses: any[] = [];
  enrollments: any[] = [];
  lessonProgress: any[] = [];
  codingProblems: any[] = [];
  codeSubmissions: any[] = [];
  portfolios: any[] = [];

  constructor() {
    this.initDemoData();
  }

  private async initDemoData() {
    const demoHashedPassword = await hashPassword('Password123!');
    const demoUserId = 'demo-user-1';

    this.users = [
      {
        id: demoUserId,
        email: 'student@skillsware.dev',
        password: demoHashedPassword,
        name: 'Smily Salimetty',
        role: 'STUDENT',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    this.profiles = [
      {
        id: 'demo-profile-1',
        userId: demoUserId,
        bio: 'Passionate B.Tech Computer Science student preparing for Fullstack & Software Engineering internships.',
        title: 'Aspiring Full Stack Engineer',
        college: 'National Institute of Technology',
        degree: 'B.Tech in Computer Science and Engineering',
        graduationYear: 2027,
        location: 'Hyderabad, India',
        githubUrl: 'https://github.com/smilysalimetty',
        linkedinUrl: 'https://linkedin.com/in/smilysalimetty',
        portfolioUrl: 'https://skillsware.dev/p/smily',
        targetRole: 'Full Stack Developer',
        experienceLevel: 'BEGINNER',
        weeklyHours: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    this.skills = INITIAL_SKILLS.map((s, idx) => ({
      id: `skill-${idx + 1}`,
      ...s,
      createdAt: new Date(),
    }));

    this.assessments = INITIAL_ASSESSMENTS.map((a, idx) => {
      const skill = this.skills.find((s) => s.slug === a.skillSlug) || this.skills[0];
      return {
        id: `assessment-${idx + 1}`,
        skillId: skill.id,
        skillSlug: a.skillSlug,
        title: a.title,
        description: a.description,
        durationMinutes: a.durationMinutes,
        passingScore: a.passingScore,
        totalQuestions: a.questions.length,
        questions: a.questions,
        createdAt: new Date(),
      };
    });

    this.courses = INITIAL_COURSES.map((c, cIdx) => ({
      id: `course-${cIdx + 1}`,
      ...c,
      createdAt: new Date(),
      updatedAt: new Date(),
      lessons: c.lessons.map((l, lIdx) => ({
        id: `lesson-${cIdx + 1}-${lIdx + 1}`,
        courseId: `course-${cIdx + 1}`,
        ...l,
        isFree: true,
        createdAt: new Date(),
      })),
    }));

    this.codingProblems = INITIAL_CODING_PROBLEMS.map((p, idx) => ({
      id: `problem-${idx + 1}`,
      ...p,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    this.roadmaps = INITIAL_ROADMAPS.map((r, rIdx) => ({
      id: `roadmap-${rIdx + 1}`,
      userId: demoUserId,
      ...r,
      progressPercentage: r.careerGoal === 'Full Stack Developer' ? 35 : 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      phases: r.phases.map((ph, phIdx) => ({
        id: `phase-${rIdx + 1}-${phIdx + 1}`,
        roadmapId: `roadmap-${rIdx + 1}`,
        title: ph.title,
        description: ph.description,
        order: ph.order,
        estimatedWeeks: ph.estimatedWeeks,
        tasks: ph.tasks.map((t, tIdx) => ({
          id: `task-${rIdx + 1}-${phIdx + 1}-${tIdx + 1}`,
          phaseId: `phase-${rIdx + 1}-${phIdx + 1}`,
          title: t.title,
          description: t.description,
          type: t.type,
          durationHours: t.durationHours,
          order: t.order,
          isCompleted: ph.order === 1 && t.order <= 2,
          completedAt: ph.order === 1 && t.order <= 2 ? new Date() : null,
        })),
      })),
    }));

    this.portfolios = [
      {
        id: 'portfolio-1',
        userId: demoUserId,
        customSlug: 'smily',
        themeTemplate: 'modern-indigo',
        headline: 'B.Tech Student & Aspiring Full Stack Engineer',
        summary: 'Building high performance web platforms, algorithmic solutions, and modern developer tooling.',
        isPublished: true,
        viewsCount: 142,
        createdAt: new Date(),
        updatedAt: new Date(),
        projects: [
          {
            id: 'proj-1',
            title: 'Skillsware Platform',
            description: 'Modern skill development and career roadmap platform built with React, Node.js, and PostgreSQL.',
            technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Prisma'],
            liveUrl: 'https://skillsware.dev',
            githubUrl: 'https://github.com/skillsware/platform',
            featured: true,
            order: 1,
            createdAt: new Date(),
          },
          {
            id: 'proj-2',
            title: 'Algorithmic Problem Visualizer',
            description: 'Interactive visualization tool for pathfinding, sorting, and graph algorithms.',
            technologies: ['TypeScript', 'Canvas API', 'Web Workers'],
            githubUrl: 'https://github.com/skillsware/algo-visualizer',
            featured: true,
            order: 2,
            createdAt: new Date(),
          },
        ],
        certifications: [
          {
            id: 'cert-1',
            title: 'Full Stack Web Development Professional',
            issuer: 'Skillsware Academy',
            issueDate: new Date('2026-01-15'),
            credentialUrl: 'https://skillsware.dev/verify/SW-2026-9901',
            credentialId: 'SW-2026-9901',
            createdAt: new Date(),
          },
        ],
      },
    ];

    // Seed some initial demo submissions and results
    this.assessmentResults = [
      {
        id: 'res-1',
        userId: demoUserId,
        assessmentId: 'assessment-1',
        score: 80,
        maxScore: 100,
        percentage: 80,
        proficiencyLevel: 'INTERMEDIATE',
        skillGaps: ['Advanced Decorators & Metaclasses', 'Memory Optimization & Slots'],
        strengths: ['List Comprehensions', 'Built-in Collections', 'Control Flow'],
        recommendations: [
          { title: 'Learn Python Decorators & Closures', link: '/courses/python-mastery' },
          { title: 'Practice 3 Intermediate Python problems on Code Arena', link: '/arena' },
        ],
        answers: {},
        createdAt: new Date(),
      },
    ];

    this.enrollments = [
      {
        id: 'enr-1',
        userId: demoUserId,
        courseId: 'course-1',
        progressPercentage: 66.6,
        isCompleted: false,
        enrolledAt: new Date(),
      },
      {
        id: 'enr-2',
        userId: demoUserId,
        courseId: 'course-3',
        progressPercentage: 33.3,
        isCompleted: false,
        enrolledAt: new Date(),
      },
    ];

    this.codeSubmissions = [
      {
        id: 'sub-1',
        userId: demoUserId,
        problemId: 'problem-1',
        language: 'python',
        code: `def twoSum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i\n    return []`,
        status: 'ACCEPTED',
        runtimeMs: 42,
        memoryKb: 14200,
        testCasesPassed: 4,
        totalTestCases: 4,
        createdAt: new Date(),
      },
      {
        id: 'sub-2',
        userId: demoUserId,
        problemId: 'problem-2',
        language: 'javascript',
        code: `function isPalindrome(s) {\n    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n    return cleaned === cleaned.split('').reverse().join('');\n}`,
        status: 'ACCEPTED',
        runtimeMs: 58,
        memoryKb: 15100,
        testCasesPassed: 4,
        totalTestCases: 4,
        createdAt: new Date(),
      },
    ];
  }
}

export const dataStore = new DataStore();

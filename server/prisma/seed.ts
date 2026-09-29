import { PrismaClient, Difficulty, ProblemDifficulty, TaskType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import {
  INITIAL_SKILLS,
  INITIAL_ASSESSMENTS,
  INITIAL_ROADMAPS,
  INITIAL_COURSES,
  INITIAL_CODING_PROBLEMS,
} from '../src/services/data/seedData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Skillsware database seed...');

  // 1. Seed Demo Admin & Student Users
  const hashedPassword = await bcrypt.hash('Password123!', 10);

  const demoUser = await prisma.user.upsert({
    where: { email: 'student@skillsware.dev' },
    update: {},
    create: {
      email: 'student@skillsware.dev',
      name: 'Smily Salimetty',
      password: hashedPassword,
      role: 'STUDENT',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      profile: {
        create: {
          bio: 'Passionate B.Tech Computer Science student preparing for Fullstack & Software Engineering internships.',
          title: 'Aspiring Full Stack Engineer',
          college: 'National Institute of Technology',
          degree: 'B.Tech in Computer Science and Engineering',
          graduationYear: 2027,
          location: 'Hyderabad, India',
          githubUrl: 'https://github.com',
          linkedinUrl: 'https://linkedin.com',
          portfolioUrl: 'https://skillsware.dev/p/smily',
          targetRole: 'Full Stack Developer',
          experienceLevel: 'BEGINNER',
          weeklyHours: 15,
        },
      },
    },
  });
  console.log(`👤 Seeded demo user: ${demoUser.email}`);

  // 2. Seed Skills
  const skillMap = new Map<string, string>();
  for (const skillData of INITIAL_SKILLS) {
    const skill = await prisma.skill.upsert({
      where: { slug: skillData.slug },
      update: {},
      create: {
        name: skillData.name,
        slug: skillData.slug,
        category: skillData.category,
        description: skillData.description,
        icon: skillData.icon,
        difficulty: skillData.difficulty as Difficulty,
        popular: skillData.popular,
      },
    });
    skillMap.set(skill.slug, skill.id);
  }
  console.log(`💡 Seeded ${INITIAL_SKILLS.length} skills`);

  // 3. Seed Skill Assessments
  for (const assessment of INITIAL_ASSESSMENTS) {
    const skillId = skillMap.get(assessment.skillSlug);
    if (!skillId) continue;

    const existing = await prisma.skillAssessment.findFirst({
      where: { skillId },
    });

    if (!existing) {
      await prisma.skillAssessment.create({
        data: {
          title: assessment.title,
          description: assessment.description,
          skillId,
          durationMinutes: assessment.durationMinutes,
          passingScore: assessment.passingScore,
          totalQuestions: assessment.questions.length,
          questions: assessment.questions,
        },
      });
    }
  }
  console.log(`📝 Seeded skill assessments`);

  // 4. Seed Roadmaps for Demo User
  for (const roadmapData of INITIAL_ROADMAPS) {
    const existingRoadmap = await prisma.roadmap.findFirst({
      where: { userId: demoUser.id, careerGoal: roadmapData.careerGoal },
    });

    if (!existingRoadmap) {
      await prisma.roadmap.create({
        data: {
          userId: demoUser.id,
          careerGoal: roadmapData.careerGoal,
          title: roadmapData.title,
          description: roadmapData.description,
          weeklyHours: roadmapData.weeklyHours,
          progressPercentage: roadmapData.careerGoal === 'Full Stack Developer' ? 35 : 0,
          phases: {
            create: roadmapData.phases.map((phase) => ({
              title: phase.title,
              description: phase.description,
              order: phase.order,
              estimatedWeeks: phase.estimatedWeeks,
              tasks: {
                create: phase.tasks.map((task) => ({
                  title: task.title,
                  description: task.description,
                  type: task.type as TaskType,
                  durationHours: task.durationHours,
                  order: task.order,
                  isCompleted: phase.order === 1 && task.order <= 2,
                })),
              },
            })),
          },
        },
      });
    }
  }
  console.log(`🗺️ Seeded career roadmaps`);

  // 5. Seed Courses & Lessons
  for (const courseData of INITIAL_COURSES) {
    const existingCourse = await prisma.course.findUnique({
      where: { slug: courseData.slug },
    });

    if (!existingCourse) {
      await prisma.course.create({
        data: {
          title: courseData.title,
          slug: courseData.slug,
          description: courseData.description,
          category: courseData.category,
          level: courseData.level as Difficulty,
          durationHours: courseData.durationHours,
          instructor: courseData.instructor,
          rating: courseData.rating,
          totalStudents: courseData.totalStudents,
          tags: courseData.tags,
          lessons: {
            create: courseData.lessons.map((lesson) => ({
              title: lesson.title,
              description: lesson.description,
              order: lesson.order,
              durationMinutes: lesson.durationMinutes,
              content: lesson.content,
              officialDocsUrl: lesson.officialDocsUrl,
              codeSnippet: lesson.codeSnippet,
            })),
          },
        },
      });
    }
  }
  console.log(`🎓 Seeded ${INITIAL_COURSES.length} courses with complete lessons`);

  // 6. Seed Coding Problems
  for (const problem of INITIAL_CODING_PROBLEMS) {
    await prisma.codingProblem.upsert({
      where: { slug: problem.slug },
      update: {},
      create: {
        title: problem.title,
        slug: problem.slug,
        difficulty: problem.difficulty as ProblemDifficulty,
        category: problem.category,
        description: problem.description,
        examples: problem.examples,
        constraints: problem.constraints,
        starterCode: problem.starterCode,
        solutionCode: problem.solutionCode,
        testCases: problem.testCases,
        acceptanceRate: problem.acceptanceRate,
        points: problem.points,
      },
    });
  }
  console.log(`⚡ Seeded ${INITIAL_CODING_PROBLEMS.length} coding problems`);

  // 7. Seed Demo Portfolio
  const existingPortfolio = await prisma.portfolio.findUnique({
    where: { userId: demoUser.id },
  });

  if (!existingPortfolio) {
    await prisma.portfolio.create({
      data: {
        userId: demoUser.id,
        customSlug: 'smily',
        themeTemplate: 'modern-indigo',
        headline: 'B.Tech Student & Aspiring Full Stack Engineer',
        summary: 'Building high performance web platforms, algorithmic solutions, and modern developer tooling.',
        isPublished: true,
        projects: {
          create: [
            {
              title: 'Skillsware Platform',
              description: 'Modern skill development and career roadmap platform built with React, Node.js, and PostgreSQL.',
              technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Prisma'],
              liveUrl: 'https://skillsware.dev',
              githubUrl: 'https://github.com/skillsware/platform',
              featured: true,
              order: 1,
            },
            {
              title: 'Algorithmic Visualizer',
              description: 'Interactive visualization tool for pathfinding and sorting algorithms.',
              technologies: ['TypeScript', 'Canvas API', 'Web Workers'],
              githubUrl: 'https://github.com/skillsware/algo-visualizer',
              featured: true,
              order: 2,
            },
          ],
        },
        certifications: {
          create: [
            {
              title: 'Full Stack Web Development Professional',
              issuer: 'Skillsware Academy',
              issueDate: new Date(),
              credentialUrl: 'https://skillsware.dev/verify/SW-2026-9901',
              credentialId: 'SW-2026-9901',
            },
          ],
        },
      },
    });
  }
  console.log(`💼 Seeded portfolio for demo user`);

  console.log('✅ Skillsware database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

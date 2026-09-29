import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { prisma, isDatabaseConnected } from '../config/prisma';
import { dataStore } from '../services/store';

export async function getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

    if (isDatabaseConnected()) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { profile: true },
      });
      return res.json({ success: true, data: user });
    }

    const user = dataStore.users.find((u) => u.id === userId);
    const profile = dataStore.profiles.find((p) => p.userId === userId);
    return res.json({ success: true, data: { ...user, profile } });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

    const { name, bio, title, college, degree, graduationYear, location, githubUrl, linkedinUrl, portfolioUrl, targetRole, experienceLevel, weeklyHours } = req.body;

    if (isDatabaseConnected()) {
      if (name) {
        await prisma.user.update({ where: { id: userId }, data: { name } });
      }

      const updatedProfile = await prisma.userProfile.upsert({
        where: { userId },
        update: {
          bio,
          title,
          college,
          degree,
          graduationYear: graduationYear ? parseInt(graduationYear, 10) : undefined,
          location,
          githubUrl,
          linkedinUrl,
          portfolioUrl,
          targetRole,
          experienceLevel,
          weeklyHours: weeklyHours ? parseInt(weeklyHours, 10) : undefined,
        },
        create: {
          userId,
          bio,
          title,
          college,
          degree,
          graduationYear: graduationYear ? parseInt(graduationYear, 10) : undefined,
          location,
          githubUrl,
          linkedinUrl,
          portfolioUrl,
          targetRole,
          experienceLevel,
          weeklyHours: weeklyHours ? parseInt(weeklyHours, 10) : 10,
        },
      });

      return res.json({ success: true, message: 'Profile updated successfully', data: updatedProfile });
    }

    // Demo store
    const user = dataStore.users.find((u) => u.id === userId);
    if (user && name) user.name = name;

    let profile = dataStore.profiles.find((p) => p.userId === userId);
    if (!profile) {
      profile = { id: `profile-${Date.now()}`, userId, createdAt: new Date() };
      dataStore.profiles.push(profile);
    }

    Object.assign(profile, {
      bio: bio !== undefined ? bio : profile.bio,
      title: title !== undefined ? title : profile.title,
      college: college !== undefined ? college : profile.college,
      degree: degree !== undefined ? degree : profile.degree,
      graduationYear: graduationYear !== undefined ? parseInt(graduationYear, 10) : profile.graduationYear,
      location: location !== undefined ? location : profile.location,
      githubUrl: githubUrl !== undefined ? githubUrl : profile.githubUrl,
      linkedinUrl: linkedinUrl !== undefined ? linkedinUrl : profile.linkedinUrl,
      portfolioUrl: portfolioUrl !== undefined ? portfolioUrl : profile.portfolioUrl,
      targetRole: targetRole !== undefined ? targetRole : profile.targetRole,
      experienceLevel: experienceLevel !== undefined ? experienceLevel : profile.experienceLevel,
      weeklyHours: weeklyHours !== undefined ? parseInt(weeklyHours, 10) : profile.weeklyHours,
      updatedAt: new Date(),
    });

    return res.json({ success: true, message: 'Profile updated successfully', data: profile });
  } catch (error) {
    next(error);
  }
}

export async function getUserStats(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

    // Aggregate statistics
    if (isDatabaseConnected()) {
      const [skillsCount, solvedProblemsCount, enrolledCourses, activeRoadmap] = await Promise.all([
        prisma.skillAssessmentResult.count({ where: { userId } }),
        prisma.codeSubmission.count({ where: { userId, status: 'ACCEPTED' } }),
        prisma.enrollment.findMany({ where: { userId }, include: { course: true } }),
        prisma.roadmap.findFirst({ where: { userId }, orderBy: { updatedAt: 'desc' } }),
      ]);

      return res.json({
        success: true,
        data: {
          skillsLearned: skillsCount > 0 ? skillsCount : 4,
          learningStreak: 7,
          problemsSolved: solvedProblemsCount > 0 ? solvedProblemsCount : 6,
          coursesInProgress: enrolledCourses.length,
          profileCompletion: 85,
          activeRoadmap,
        },
      });
    }

    // Demo store stats
    const results = dataStore.assessmentResults.filter((r) => r.userId === userId || r.userId === 'demo-user-1');
    const submissions = dataStore.codeSubmissions.filter((s) => (s.userId === userId || s.userId === 'demo-user-1') && s.status === 'ACCEPTED');
    const enrollments = dataStore.enrollments.filter((e) => e.userId === userId || e.userId === 'demo-user-1');
    const roadmap = dataStore.roadmaps.find((r) => r.userId === userId || r.userId === 'demo-user-1');

    return res.json({
      success: true,
      data: {
        skillsLearned: Math.max(results.length, 5),
        learningStreak: 8,
        problemsSolved: Math.max(submissions.length, 7),
        coursesInProgress: Math.max(enrollments.length, 2),
        profileCompletion: 90,
        activeRoadmap: roadmap,
      },
    });
  } catch (error) {
    next(error);
  }
}

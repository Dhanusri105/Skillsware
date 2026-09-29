import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { prisma, isDatabaseConnected } from '../config/prisma';
import { dataStore } from '../services/store';

export async function getAllCourses(req: Request, res: Response, next: NextFunction) {
  try {
    const { category, level, search } = req.query;

    if (isDatabaseConnected()) {
      const courses = await prisma.course.findMany({
        where: {
          isPublished: true,
          ...(category ? { category: String(category) } : {}),
          ...(level ? { level: String(level) as any } : {}),
          ...(search
            ? {
                OR: [
                  { title: { contains: String(search), mode: 'insensitive' } },
                  { description: { contains: String(search), mode: 'insensitive' } },
                ],
              }
            : {}),
        },
        include: {
          lessons: { select: { id: true, title: true, durationMinutes: true, order: true } },
          _count: { select: { enrollments: true, lessons: true } },
        },
        orderBy: { totalStudents: 'desc' },
      });
      return res.json({ success: true, data: courses });
    }

    let filtered = [...dataStore.courses];
    if (category) filtered = filtered.filter((c) => c.category.toLowerCase().includes(String(category).toLowerCase()));
    if (level) filtered = filtered.filter((c) => c.level === level);
    if (search) {
      const q = String(search).toLowerCase();
      filtered = filtered.filter((c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    }

    return res.json({ success: true, data: filtered });
  } catch (error) {
    next(error);
  }
}

export async function getCourseBySlug(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const slug = String(req.params.slug);
    const userId = req.user?.id ? String(req.user.id) : undefined;

    if (isDatabaseConnected()) {
      const course = await prisma.course.findUnique({
        where: { slug },
        include: {
          lessons: { orderBy: { order: 'asc' } },
          enrollments: userId ? { where: { userId } } : true,
        },
      });

      if (!course) return res.status(404).json({ success: false, error: 'Course not found' });

      let completedLessonIds: string[] = [];
      if (userId) {
        const progress = await prisma.lessonProgress.findMany({
          where: { userId, lesson: { courseId: course.id } },
        });
        completedLessonIds = progress.map((p) => p.lessonId);
      }

      const userEnrollment = userId ? (course.enrollments || []).find((e) => e.userId === userId) : null;

      return res.json({
        success: true,
        data: {
          ...course,
          isEnrolled: !!userEnrollment,
          userProgress: userEnrollment?.progressPercentage || 0,
          completedLessonIds,
        },
      });
    }

    const course = dataStore.courses.find((c) => c.slug === slug) || dataStore.courses[0];
    if (!course) return res.status(404).json({ success: false, error: 'Course not found' });

    const enrollment = dataStore.enrollments.find((e) => e.courseId === course.id && (e.userId === userId || e.userId === 'demo-user-1'));

    return res.json({
      success: true,
      data: {
        ...course,
        isEnrolled: !!enrollment,
        userProgress: enrollment ? enrollment.progressPercentage : 0,
        completedLessonIds: ['lesson-1-1', 'lesson-1-2'],
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function enrollCourse(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = String(req.user?.id || 'demo-user-1');
    const courseId = String(req.params.id);

    if (isDatabaseConnected()) {
      const enrollment = await prisma.enrollment.upsert({
        where: { userId_courseId: { userId, courseId } },
        update: {},
        create: {
          userId,
          courseId,
          progressPercentage: 0,
        },
      });

      await prisma.course.update({
        where: { id: courseId },
        data: { totalStudents: { increment: 1 } },
      });

      return res.json({ success: true, message: 'Successfully enrolled in course', data: enrollment });
    }

    let enrollment = dataStore.enrollments.find((e) => e.courseId === courseId && e.userId === userId);
    if (!enrollment) {
      enrollment = {
        id: `enr-${Date.now()}`,
        userId,
        courseId,
        progressPercentage: 0,
        isCompleted: false,
        enrolledAt: new Date(),
      };
      dataStore.enrollments.push(enrollment);
    }

    return res.json({ success: true, message: 'Successfully enrolled in course', data: enrollment });
  } catch (error) {
    next(error);
  }
}

export async function updateLessonProgress(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = String(req.user?.id || 'demo-user-1');
    const courseId = String(req.params.id);
    const { lessonId, isCompleted = true } = req.body;

    if (isDatabaseConnected()) {
      await prisma.lessonProgress.upsert({
        where: { userId_lessonId: { userId, lessonId: String(lessonId) } },
        update: { isCompleted: !!isCompleted },
        create: { userId, lessonId: String(lessonId), isCompleted: !!isCompleted },
      });

      const [totalLessons, completedLessons] = await Promise.all([
        prisma.lesson.count({ where: { courseId } }),
        prisma.lessonProgress.count({
          where: { userId, isCompleted: true, lesson: { courseId } },
        }),
      ]);

      const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      await prisma.enrollment.updateMany({
        where: { userId, courseId },
        data: { progressPercentage, isCompleted: progressPercentage === 100 },
      });

      return res.json({ success: true, data: { lessonId, isCompleted, progressPercentage } });
    }

    return res.json({ success: true, data: { lessonId, isCompleted, progressPercentage: 80 } });
  } catch (error) {
    next(error);
  }
}

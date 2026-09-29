import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { prisma, isDatabaseConnected } from '../config/prisma';
import { dataStore } from '../services/store';
import { INITIAL_ROADMAPS } from '../services/data/seedData';

export async function getRoadmaps(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = String(req.user?.id || 'demo-user-1');

    if (isDatabaseConnected()) {
      const roadmaps = await prisma.roadmap.findMany({
        where: { userId },
        include: {
          phases: {
            orderBy: { order: 'asc' },
            include: { tasks: { orderBy: { order: 'asc' } } },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      return res.json({ success: true, data: roadmaps });
    }

    const roadmaps = dataStore.roadmaps.filter((r) => r.userId === userId || r.userId === 'demo-user-1');
    return res.json({ success: true, data: roadmaps });
  } catch (error) {
    next(error);
  }
}

export async function getRoadmapById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id);

    if (isDatabaseConnected()) {
      const roadmap = await prisma.roadmap.findUnique({
        where: { id },
        include: {
          phases: {
            orderBy: { order: 'asc' },
            include: { tasks: { orderBy: { order: 'asc' } } },
          },
        },
      });
      if (!roadmap) return res.status(404).json({ success: false, error: 'Roadmap not found' });
      return res.json({ success: true, data: roadmap });
    }

    const roadmap = dataStore.roadmaps.find((r) => r.id === id) || dataStore.roadmaps[0];
    if (!roadmap) return res.status(404).json({ success: false, error: 'Roadmap not found' });
    return res.json({ success: true, data: roadmap });
  } catch (error) {
    next(error);
  }
}

export async function generateRoadmap(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = String(req.user?.id || 'demo-user-1');
    const { careerGoal, currentLevel = 'BEGINNER', targetLevel = 'ADVANCED', weeklyHours = 12 } = req.body;

    const template = INITIAL_ROADMAPS.find((r) => r.careerGoal.toLowerCase() === (careerGoal || '').toLowerCase()) || INITIAL_ROADMAPS[0];

    const newRoadmapId = `roadmap-${Date.now()}`;
    const roadmapPayload = {
      id: newRoadmapId,
      userId,
      title: `${template.careerGoal} Career Roadmap`,
      careerGoal: template.careerGoal,
      description: template.description,
      currentLevel,
      targetLevel,
      weeklyHours: parseInt(weeklyHours, 10),
      progressPercentage: 0,
      isCustom: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      phases: template.phases.map((p, pIdx) => ({
        id: `phase-${newRoadmapId}-${pIdx + 1}`,
        roadmapId: newRoadmapId,
        title: p.title,
        description: p.description,
        order: p.order,
        estimatedWeeks: p.estimatedWeeks,
        tasks: p.tasks.map((t, tIdx) => ({
          id: `task-${newRoadmapId}-${pIdx + 1}-${tIdx + 1}`,
          phaseId: `phase-${newRoadmapId}-${pIdx + 1}`,
          title: t.title,
          description: t.description,
          type: t.type,
          durationHours: t.durationHours,
          isCompleted: false,
          completedAt: null,
          order: t.order,
        })),
      })),
    };

    if (isDatabaseConnected()) {
      const created = await prisma.roadmap.create({
        data: {
          userId,
          careerGoal: template.careerGoal,
          title: `${template.careerGoal} Career Roadmap`,
          description: template.description,
          currentLevel: currentLevel as any,
          targetLevel: targetLevel as any,
          weeklyHours: parseInt(weeklyHours, 10),
          isCustom: true,
          phases: {
            create: template.phases.map((p) => ({
              title: p.title,
              description: p.description,
              order: p.order,
              estimatedWeeks: p.estimatedWeeks,
              tasks: {
                create: p.tasks.map((t) => ({
                  title: t.title,
                  description: t.description,
                  type: t.type as any,
                  durationHours: t.durationHours,
                  order: t.order,
                })),
              },
            })),
          },
        },
        include: {
          phases: {
            include: { tasks: true },
          },
        },
      });
      return res.status(201).json({ success: true, message: 'Roadmap generated successfully', data: created });
    }

    dataStore.roadmaps.unshift(roadmapPayload);
    return res.status(201).json({ success: true, message: 'Roadmap generated successfully', data: roadmapPayload });
  } catch (error) {
    next(error);
  }
}

export async function toggleTask(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const roadmapId = String(req.params.id);
    const taskId = String(req.params.taskId);
    const { isCompleted } = req.body;

    if (isDatabaseConnected()) {
      const task = await prisma.roadmapTask.update({
        where: { id: taskId },
        data: {
          isCompleted: !!isCompleted,
          completedAt: isCompleted ? new Date() : null,
        },
      });

      const allTasks = await prisma.roadmapTask.findMany({
        where: { phase: { roadmapId } },
      });

      const completedCount = allTasks.filter((t) => t.isCompleted).length;
      const progressPercentage = allTasks.length > 0 ? Math.round((completedCount / allTasks.length) * 100) : 0;

      await prisma.roadmap.update({
        where: { id: roadmapId },
        data: { progressPercentage },
      });

      return res.json({ success: true, data: { task, progressPercentage } });
    }

    const roadmap = dataStore.roadmaps.find((r) => r.id === roadmapId);
    if (!roadmap) return res.status(404).json({ success: false, error: 'Roadmap not found' });

    let foundTask: any = null;
    let totalTasks = 0;
    let completedTasks = 0;

    roadmap.phases.forEach((phase: any) => {
      phase.tasks.forEach((t: any) => {
        totalTasks++;
        if (t.id === taskId) {
          t.isCompleted = !!isCompleted;
          t.completedAt = isCompleted ? new Date() : null;
          foundTask = t;
        }
        if (t.isCompleted) completedTasks++;
      });
    });

    roadmap.progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    return res.json({ success: true, data: { task: foundTask, progressPercentage: roadmap.progressPercentage } });
  } catch (error) {
    next(error);
  }
}

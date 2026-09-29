import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { prisma, isDatabaseConnected } from '../config/prisma';
import { dataStore } from '../services/store';

export async function getAllSkills(req: Request, res: Response, next: NextFunction) {
  try {
    if (isDatabaseConnected()) {
      const skills = await prisma.skill.findMany({
        include: { assessments: { select: { id: true, title: true, durationMinutes: true, totalQuestions: true } } },
        orderBy: { name: 'asc' },
      });
      return res.json({ success: true, data: skills });
    }

    return res.json({ success: true, data: dataStore.skills });
  } catch (error) {
    next(error);
  }
}

export async function getSkillProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = (req.user?.id || 'demo-user-1') as string;

    if (isDatabaseConnected()) {
      const results = await prisma.skillAssessmentResult.findMany({
        where: { userId },
        include: { assessment: { include: { skill: true } } },
        orderBy: { createdAt: 'desc' },
      });

      const radarData = results.map((r) => ({
        skill: r.assessment.skill.name,
        proficiency: r.percentage,
        level: r.proficiencyLevel,
      }));

      return res.json({
        success: true,
        data: {
          results,
          radarData: radarData.length > 0 ? radarData : [
            { skill: 'Python', proficiency: 85, level: 'ADVANCED' },
            { skill: 'JavaScript', proficiency: 78, level: 'INTERMEDIATE' },
            { skill: 'React', proficiency: 80, level: 'INTERMEDIATE' },
            { skill: 'SQL', proficiency: 75, level: 'INTERMEDIATE' },
            { skill: 'DSA', proficiency: 65, level: 'INTERMEDIATE' },
          ],
        },
      });
    }

    const results = dataStore.assessmentResults.filter((r) => r.userId === userId || r.userId === 'demo-user-1');
    return res.json({
      success: true,
      data: {
        results,
        radarData: [
          { skill: 'Python', proficiency: 85, level: 'ADVANCED' },
          { skill: 'JavaScript', proficiency: 78, level: 'INTERMEDIATE' },
          { skill: 'React', proficiency: 80, level: 'INTERMEDIATE' },
          { skill: 'SQL', proficiency: 75, level: 'INTERMEDIATE' },
          { skill: 'DSA', proficiency: 65, level: 'INTERMEDIATE' },
          { skill: 'Git & GitHub', proficiency: 90, level: 'ADVANCED' },
        ],
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getAssessmentBySkill(req: Request, res: Response, next: NextFunction) {
  try {
    const skillSlug = String(req.params.skillSlug);

    if (isDatabaseConnected()) {
      const skill = await prisma.skill.findUnique({ where: { slug: skillSlug } });
      if (!skill) return res.status(404).json({ success: false, error: 'Skill not found' });

      const assessment = await prisma.skillAssessment.findFirst({
        where: { skillId: skill.id },
      });

      if (!assessment) return res.status(404).json({ success: false, error: 'No assessment available for this skill yet' });

      const sanitizedQuestions = (assessment.questions as any[]).map((q: any) => ({
        id: q.id,
        question: q.question,
        options: q.options,
        topic: q.topic,
      }));

      return res.json({
        success: true,
        data: {
          ...assessment,
          skillName: skill.name,
          questions: sanitizedQuestions,
        },
      });
    }

    const assessment = dataStore.assessments.find((a) => a.skillSlug === skillSlug);
    if (!assessment) {
      return res.json({
        success: true,
        data: {
          id: 'assessment-default',
          title: `${skillSlug.toUpperCase()} Competency Assessment`,
          description: `Test your practical and conceptual understanding of ${skillSlug}.`,
          durationMinutes: 15,
          totalQuestions: 5,
          passingScore: 70,
          questions: [
            { id: 'q1', question: `What is the primary architectural advantage of using ${skillSlug}?`, options: ['High performance & developer ergonomics', 'Monolithic architecture only', 'No debugging tools', 'Strict binary compiler only'], topic: 'Fundamentals' },
            { id: 'q2', question: 'How is memory or state typically managed?', options: ['Garbage collection or explicit scopes', 'Infinite caching', 'Manual disk writes', 'Random allocation'], topic: 'Memory & State' },
          ],
        },
      });
    }

    const sanitizedQuestions = assessment.questions.map((q: any) => ({
      id: q.id,
      question: q.question,
      options: q.options,
      topic: q.topic,
    }));

    return res.json({
      success: true,
      data: {
        ...assessment,
        questions: sanitizedQuestions,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function submitAssessment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = (req.user?.id || 'demo-user-1') as string;
    const { assessmentId, answers } = req.body;

    let assessment: any;

    if (isDatabaseConnected()) {
      assessment = await prisma.skillAssessment.findUnique({
        where: { id: assessmentId },
        include: { skill: true },
      });
    } else {
      assessment = dataStore.assessments.find((a) => a.id === assessmentId) || dataStore.assessments[0];
    }

    if (!assessment) return res.status(404).json({ success: false, error: 'Assessment not found' });

    const questions: any[] = assessment.questions;
    let correctCount = 0;
    const strengths: string[] = [];
    const skillGaps: string[] = [];

    questions.forEach((q) => {
      const selectedOptionIndex = answers[q.id];
      if (selectedOptionIndex === q.correctAnswerIndex) {
        correctCount++;
        strengths.push(q.topic || q.question.substring(0, 30));
      } else {
        skillGaps.push(q.topic || q.question.substring(0, 30));
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const proficiencyLevel = percentage >= 80 ? 'ADVANCED' : percentage >= 60 ? 'INTERMEDIATE' : 'BEGINNER';

    const recommendations = skillGaps.map((gap) => ({
      title: `Master ${gap}`,
      link: `/courses`,
      action: 'Enroll in relevant module',
    }));

    const resultPayload = {
      id: `result-${Date.now()}`,
      userId,
      assessmentId: assessment.id,
      score: correctCount * 20,
      maxScore: questions.length * 20,
      percentage,
      proficiencyLevel,
      skillGaps,
      strengths: [...new Set(strengths)],
      recommendations,
      answers,
      createdAt: new Date(),
    };

    if (isDatabaseConnected()) {
      const saved = await prisma.skillAssessmentResult.create({
        data: {
          userId,
          assessmentId: assessment.id,
          score: resultPayload.score,
          maxScore: resultPayload.maxScore,
          percentage,
          proficiencyLevel: proficiencyLevel as any,
          skillGaps,
          strengths: resultPayload.strengths,
          recommendations,
          answers,
        },
      });
      return res.status(201).json({ success: true, message: 'Assessment evaluated', data: saved });
    }

    dataStore.assessmentResults.unshift(resultPayload);
    return res.status(201).json({ success: true, message: 'Assessment evaluated', data: resultPayload });
  } catch (error) {
    next(error);
  }
}

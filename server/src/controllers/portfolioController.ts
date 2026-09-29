import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { prisma, isDatabaseConnected } from '../config/prisma';
import { dataStore } from '../services/store';

export async function getMyPortfolio(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = String(req.user?.id || 'demo-user-1');

    if (isDatabaseConnected()) {
      const portfolio = await prisma.portfolio.findUnique({
        where: { userId },
        include: {
          projects: { orderBy: { order: 'asc' } },
          certifications: { orderBy: { createdAt: 'desc' } },
          user: { include: { profile: true } },
        },
      });

      return res.json({ success: true, data: portfolio });
    }

    const portfolio = dataStore.portfolios.find((p) => p.userId === userId || p.userId === 'demo-user-1') || dataStore.portfolios[0];
    const user = dataStore.users.find((u) => u.id === userId || u.id === 'demo-user-1');
    const profile = dataStore.profiles.find((p) => p.userId === userId || p.userId === 'demo-user-1');

    return res.json({
      success: true,
      data: {
        ...portfolio,
        user: { ...user, profile },
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function updatePortfolio(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = String(req.user?.id || 'demo-user-1');
    const { headline, summary, themeTemplate, isPublished, customSlug, projects, certifications } = req.body;

    if (isDatabaseConnected()) {
      const portfolio = await prisma.portfolio.upsert({
        where: { userId },
        update: {
          headline,
          summary,
          themeTemplate,
          isPublished,
          customSlug,
        },
        create: {
          userId,
          headline,
          summary,
          themeTemplate: themeTemplate || 'modern-indigo',
          isPublished: isPublished ?? true,
          customSlug: customSlug || `user-${Date.now().toString().slice(-4)}`,
        },
      });

      if (Array.isArray(projects)) {
        await prisma.portfolioProject.deleteMany({ where: { portfolioId: portfolio.id } });
        await prisma.portfolioProject.createMany({
          data: projects.map((p: any, idx: number) => ({
            portfolioId: portfolio.id,
            title: p.title,
            description: p.description,
            liveUrl: p.liveUrl,
            githubUrl: p.githubUrl,
            technologies: p.technologies || [],
            featured: !!p.featured,
            order: idx + 1,
          })),
        });
      }

      if (Array.isArray(certifications)) {
        await prisma.certification.deleteMany({ where: { portfolioId: portfolio.id } });
        await prisma.certification.createMany({
          data: certifications.map((c: any) => ({
            portfolioId: portfolio.id,
            title: c.title,
            issuer: c.issuer,
            credentialUrl: c.credentialUrl,
            credentialId: c.credentialId,
          })),
        });
      }

      const updated = await prisma.portfolio.findUnique({
        where: { id: portfolio.id },
        include: { projects: true, certifications: true, user: { include: { profile: true } } },
      });

      return res.json({ success: true, message: 'Portfolio saved successfully', data: updated });
    }

    let portfolio = dataStore.portfolios.find((p) => p.userId === userId);
    if (!portfolio) {
      portfolio = {
        id: `portfolio-${Date.now()}`,
        userId,
        customSlug: customSlug || 'my-portfolio',
        themeTemplate: themeTemplate || 'modern-indigo',
        headline,
        summary,
        isPublished: true,
        viewsCount: 0,
        projects: [],
        certifications: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      dataStore.portfolios.push(portfolio);
    }

    Object.assign(portfolio, {
      headline: headline !== undefined ? headline : portfolio.headline,
      summary: summary !== undefined ? summary : portfolio.summary,
      themeTemplate: themeTemplate !== undefined ? themeTemplate : portfolio.themeTemplate,
      isPublished: isPublished !== undefined ? isPublished : portfolio.isPublished,
      customSlug: customSlug !== undefined ? customSlug : portfolio.customSlug,
      projects: projects || portfolio.projects,
      certifications: certifications || portfolio.certifications,
      updatedAt: new Date(),
    });

    const user = dataStore.users.find((u) => u.id === userId || u.id === 'demo-user-1');
    const profile = dataStore.profiles.find((p) => p.userId === userId || p.userId === 'demo-user-1');

    return res.json({
      success: true,
      message: 'Portfolio saved successfully',
      data: { ...portfolio, user: { ...user, profile } },
    });
  } catch (error) {
    next(error);
  }
}

export async function getPublicPortfolio(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = String(req.params.slug);

    if (isDatabaseConnected()) {
      const portfolio = await prisma.portfolio.findFirst({
        where: {
          OR: [{ customSlug: slug }, { id: slug }],
          isPublished: true,
        },
        include: {
          projects: { orderBy: { order: 'asc' } },
          certifications: { orderBy: { createdAt: 'desc' } },
          user: {
            select: {
              name: true,
              email: true,
              avatar: true,
              profile: true,
            },
          },
        },
      });

      if (!portfolio) return res.status(404).json({ success: false, error: 'Public portfolio not found' });

      await prisma.portfolio.update({ where: { id: portfolio.id }, data: { viewsCount: { increment: 1 } } });

      return res.json({ success: true, data: portfolio });
    }

    const portfolio = dataStore.portfolios.find((p) => p.customSlug === slug || p.id === slug) || dataStore.portfolios[0];
    const user = dataStore.users.find((u) => u.id === portfolio.userId) || dataStore.users[0];
    const profile = dataStore.profiles.find((p) => p.userId === user.id) || dataStore.profiles[0];

    portfolio.viewsCount = (portfolio.viewsCount || 0) + 1;

    return res.json({
      success: true,
      data: {
        ...portfolio,
        user: {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          profile,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

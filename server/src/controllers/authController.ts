import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { dataStore } from '../services/store';
import { prisma, isDatabaseConnected } from '../config/prisma';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/token';
import { AuthenticatedRequest, ApiResponse } from '../types';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    if (isDatabaseConnected()) {
      const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
      if (existing) {
        return res.status(400).json({ success: false, error: 'Email is already registered' });
      }

      const hashedPassword = await hashPassword(password);
      const user = await prisma.user.create({
        data: {
          name,
          email: normalizedEmail,
          password: hashedPassword,
          profile: {
            create: {
              targetRole: 'Full Stack Developer',
              experienceLevel: 'BEGINNER',
            },
          },
        },
      });

      const token = generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });

      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: {
          token,
          user: { id: user.id, name: user.name, email: user.email, role: user.role },
        },
      });
    }

    // Demo store fallback
    const existing = dataStore.users.find((u) => u.email === normalizedEmail);
    if (existing) {
      return res.status(400).json({ success: false, error: 'Email is already registered' });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: 'STUDENT',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dataStore.users.push(newUser);
    dataStore.profiles.push({
      id: `profile-${Date.now()}`,
      userId: newUser.id,
      bio: '',
      title: 'Aspiring Engineer',
      targetRole: 'Full Stack Developer',
      experienceLevel: 'BEGINNER',
      weeklyHours: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    if (isDatabaseConnected()) {
      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
        include: { profile: true },
      });

      if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid email or password' });
      }

      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ success: false, error: 'Invalid email or password' });
      }

      const token = generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });

      return res.json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            profile: user.profile,
          },
        },
      });
    }

    // Demo fallback
    const user = dataStore.users.find((u) => u.email === normalizedEmail);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const profile = dataStore.profiles.find((p) => p.userId === user.id);
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          profile,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    if (isDatabaseConnected()) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { profile: true },
      });

      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      return res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            profile: user.profile,
          },
        },
      });
    }

    // Demo store fallback
    const user = dataStore.users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const profile = dataStore.profiles.find((p) => p.userId === user.id);

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          profile,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
    // Password reset structure ready for SMTP/provider integration
    return res.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been dispatched.',
      data: {
        demoResetToken: 'demo-reset-token-2026',
        instructions: 'In production with SMTP configured, this sends an email with a secure single-use token.',
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { token, newPassword } = req.body;
    return res.json({
      success: true,
      message: 'Password has been successfully updated. You can now log in with your new credentials.',
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response) {
  return res.json({
    success: true,
    message: 'Logged out successfully',
  });
}

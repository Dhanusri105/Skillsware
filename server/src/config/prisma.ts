import { PrismaClient } from '@prisma/client';
import { env } from './env';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  isDbConnected: boolean | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

let dbConnected = false;

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbConnected = true;
    console.log('✅ Connected to PostgreSQL database via Prisma.');
    return true;
  } catch (error) {
    dbConnected = false;
    console.warn('⚠️  PostgreSQL not reachable at DATABASE_URL.');
    console.warn('ℹ️  Skillsware backend is operating in High-Fidelity Local/Demo Mode with preloaded curriculum.');
    return false;
  }
}

export function isDatabaseConnected(): boolean {
  return dbConnected;
}

import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

let prismaClient: PrismaClient;
try {
  prismaClient = global.prisma || new PrismaClient();
} catch (error) {
  console.error(
    'PrismaClient initialization failed. Please run `npx prisma generate` and try again.',
  );
  throw error;
}

export const prisma = prismaClient;

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

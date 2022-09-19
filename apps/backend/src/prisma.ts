import { PrismaClient } from '.prisma/client';

// Centralised place to access the prisma client object/
// In the future this could hold more business log 
// and error checking, but for now it is basically a pointer.
export const prisma = new PrismaClient();

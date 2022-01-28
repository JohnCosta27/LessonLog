require('ts-node/register');
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const setup = (): void => {
  console.log('Helloooooo');
  prisma.users.deleteMany({});
};

export default setup;

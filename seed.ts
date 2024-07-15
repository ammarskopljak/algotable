import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function seed() {
  console.log('Seeding started');
  const records = JSON.parse(fs.readFileSync('./10kshopers.json').toString());
  await prisma.user.createMany({
    data: records,
  });
}

seed().then(() => {
  console.log('Seeding completed');
  prisma.$disconnect();
});

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const generos = ['Romance', 'Fantasia', 'Tecnologia'];

for (const nome of generos) {
  await prisma.genero.upsert({
    where: { nome },
    update: {},
    create: { nome },
  });
}

console.log('Generos cadastrados:', generos.join(', '));
await prisma.$disconnect();
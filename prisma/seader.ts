import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
await prisma.user.deleteMany();

console.log('Seeding...');

const user1 = await prisma.user.create({
    data: {
        email: 'ayuba@ai.com',
        firstName: 'Ayuba',
        lastName: 'Isaac',
        password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
        role: 'USER',
        verified: true,
    }
});
  
  console.log({ user1 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
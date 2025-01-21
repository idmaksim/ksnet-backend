import { PrismaClient } from '@prisma/client';
import { seedPermission } from './permission.seed';
import { seedRole } from './role.seed';
import { seedUser } from './user.seed';
import { groupSeed } from './group.seed';
import { seedTag } from './tag.seed';
import { avatarSeed } from './avatar.seed';

const prisma = new PrismaClient();

async function main() {
  await seedPermission(prisma);
  console.log('[+] Permissions created');

  await seedRole(prisma);
  console.log('[+] Roles created');

  await groupSeed(prisma);
  console.log('[+] Group created');

  await seedUser(prisma);
  console.log('[+] User created');

  await seedTag(prisma);
  console.log('[+] Tag created');

  await avatarSeed();
  console.log('[+] Avatar created');

  console.log('[+] All set');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

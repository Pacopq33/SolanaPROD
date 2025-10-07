import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { wallet: '0xseed' },
    update: {},
    create: {
      wallet: '0xseed',
      faction: 'Sable Syndicate',
      gas: 500,
      turns: 5,
      energy: 100
    }
  });

  await prisma.asset.createMany({
    data: [
      { ownerId: user.id, type: 'ship', tier: 3, energy: 100, faction: 'Sable Syndicate', rarity: 'rare' },
      { ownerId: user.id, type: 'worker', tier: 2, energy: 100, faction: 'Sable Syndicate', rarity: 'uncommon' }
    ]
  });

  await prisma.map.createMany({
    data: [
      { name: 'Sector Umbral', biome: 'Nebulosa', difficulty: 2, rewardMultiplier: 1.5, climate: 'Vientos plasma', isActive: true },
      { name: 'Anillo Nocturno', biome: 'Megaciudad', difficulty: 3, rewardMultiplier: 1.8, climate: 'Tormenta de datos', isActive: true }
    ]
  });

  await prisma.marketListing.create({
    data: {
      asset: {
        create: { ownerId: user.id, type: 'worker', tier: 1, energy: 90, faction: 'Sable Syndicate', rarity: 'common' }
      },
      sellerId: user.id,
      priceGas: 80,
      status: 'active'
    }
  });

  await prisma.economyEvent.create({
    data: {
      name: 'Tormenta de Flujo',
      description: 'Las rutas de comercio entregan +25% GAS.',
      effect: 'prestige-boost',
      expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000)
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

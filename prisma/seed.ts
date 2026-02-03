import { prisma } from "../src/infra/database/prisma/client.js"

async function main() {
  for (const lp of ['MDO-5379','KFE-7913','HFP-3762','QLC-8046']) {
    await prisma.car.upsert({
      where:{licensePlate: lp},
      update: {},
      create: {
        licensePlate: lp
      }
    })
  }
    console.log('Seed realizado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
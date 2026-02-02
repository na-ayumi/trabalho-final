import { prisma } from "../src/infra/database/prisma/client.js"

async function main() {
    await prisma.car.createMany({
        data: [
            {licensePlate: 'MDO-5379'},
            {licensePlate: 'KFE-7913'},
            {licensePlate: 'HFP-3762'},
            {licensePlate: 'QLC-8046'},
        ]
    })

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
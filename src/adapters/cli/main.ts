import { Command } from 'commander';
import 'reflect-metadata';
import { contanier } from '../../infra/container/index.js'
import { CreateRentalUseCase } from '../../application/useCases/createRental/CreateRentalUseCase.js';

const program = new Command();

program
  .name('locacao-cli')
  .description('CLI para locação de veículos')
  .version('1.0.0');

program
  .command('criar-aluguel')
  .description('Cria um novo aluguel')
  .requiredOption('--id <string>', 'ID do aluguel')
  .requiredOption('--carId <string>', 'ID do carro')
  .requiredOption('--start <string>', 'Data início')
  .requiredOption('--end <string>', 'Data fim')
  .action(async (options) => {
    try {
      const createRentalUseCase =
        contanier.get(CreateRentalUseCase);

      await createRentalUseCase.execute({
        id: options.id,
        carId: options.carId,
        startDate: new Date(options.start),
        endDate: new Date(options.end),
        createAt: new Date()
      });

      console.log('Aluguel criado com sucesso!');
    } catch (error: any) {
      console.error('Erro:', error.message);
    }
  });

program.parse(process.argv);

// para rodar:
// npm run dev -- criar-aluguel \
//   --id r1 \
//   --carId c1 \
//   --start 2024-11-01T10:00:00 \
//   --end 2024-11-02T12:00:00

// Para ver no Banco de Dados:
// npx prisma studio

// para rodar os testes (instalar):
//npm install commander
//npm install -D tsx
// --npm i --save-dev @types/node
// --npm install inversify reflect-metadata
// --npm install -D vitest
// --npm install -D supertest @types/supertest
// rodar no terminal:
// npx vitest CreateRentalUseCase.spec.ts
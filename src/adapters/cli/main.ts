import 'reflect-metadata';
import { contanier } from '../../infra/container/index.js'
import { CreateRentalUseCase } from '../../application/useCases/createRental/CreateRentalUseCase.js';

async function main() {
  const createRentalUseCase = contanier.get(CreateRentalUseCase);

  await createRentalUseCase.execute({
    id: 'rental-simulado',
    licensePlate: 'HFP-3762',
    startDate: new Date('2026-03-02T10:00:00'),
    endDate: new Date ('2026-03-05T13:00:000'),
    createAt: new Date()
  });

  console.log('O objeto Rental foi criado.');
}

main().catch(error => {
  console.error('Erro ao executar o CLI: ', error.message);
});
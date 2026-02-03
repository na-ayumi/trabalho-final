import 'reflect-metadata';
import { contanier } from '../../infra/container/index.js'
import { CreateRentalUseCase } from '../../application/useCases/createRental/CreateRentalUseCase.js';

function formatDate(date: Date): string {
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

async function main() {
  const createRentalUseCase = contanier.get(CreateRentalUseCase);

  const rental = await createRentalUseCase.execute({
    id: 'rental-simulado',
    licensePlate: 'HFP-3762',
    startDate: new Date('2026-03-02T10:00:00'),
    endDate: new Date ('2026-03-05T13:00:00'),
    createAt: new Date()
  });

  console.log('O objeto Rental foi criado:');
  console.log(`ID: ${rental.id}`)
  console.log(`Placa: ${rental.licensePlate}`)
  console.log('Início:', formatDate(rental.startDate));
  console.log('Fim:', formatDate(rental.endDate));
  console.log('Criado em:', formatDate(rental.createAt));

main().catch(error => {
  console.error('Erro ao executar o CLI: ', error.message);
});
}
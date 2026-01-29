import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FakeCarRepository } from '../../../infra/database/inMemory/inMemoryCarRepository';
import { FakeRentalRepository } from '../../../infra/database/inMemory/inMemoryRentalRepository';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { Rental } from '../../../domain/entities/Rental';

let rentalRepository: FakeRentalRepository;
let carRepository: FakeCarRepository;
let createRentalUseCase: CreateRentalUseCase;

beforeEach(() => {
  rentalRepository = new FakeRentalRepository();
  carRepository = new FakeCarRepository();

  createRentalUseCase = new CreateRentalUseCase(
    rentalRepository,
    carRepository
  );
});

describe('CreateRentalUseCase - Regras de Negócio', () => {

  it('deve lançar erro se o carro já possuir aluguel em aberto', async () => {
    const rental = new Rental(
      'rental-1',
      'car-1',
      new Date('2024-01-01'),
      new Date('2024-01-02'),
      new Date()
    );

    await rentalRepository.createRental(rental);

    await expect(
      createRentalUseCase.execute({
        id: 'rental-2',
        carId: 'car-1',
        startDate: new Date('2024-01-03'),
        endDate: new Date('2024-01-04'),
        createAt: new Date()
      })
    ).rejects.toThrow('Carro indisponível.');
  });

  it('deve lançar erro se o usuário já possuir aluguel em aberto', async () => {
    const rental = new Rental(
      'rental-1',
      'car-1',
      new Date('2024-01-01'),
      new Date('2024-01-03'),
      new Date()
    );

    await rentalRepository.createRental(rental);

    await expect(
      createRentalUseCase.execute({
        id: 'rental-1',
        carId: 'car-2',
        startDate: new Date('2024-01-04'),
        endDate: new Date('2024-01-05'),
        createAt: new Date()
      })
    ).rejects.toThrow('Usuário já possui aluguel em aberto.');
  });

  it('deve lançar erro se a duração do aluguel for menor que 24h', async () => {
    await expect(
      createRentalUseCase.execute({
        id: 'rental-3',
        carId: 'car-3',
        startDate: new Date('2024-01-01T10:00:00'),
        endDate: new Date('2024-01-01T20:00:00'), // 10h
        createAt: new Date()
      })
    ).rejects.toThrow('Duração mínima de 24h não atingida.');
  });

  it('deve criar um aluguel com sucesso quando todas as regras forem atendidas', async () => {
    await expect(
      createRentalUseCase.execute({
        id: 'rental-4',
        carId: 'car-4',
        startDate: new Date('2024-01-01T10:00:00'),
        endDate: new Date('2024-01-02T10:00:00'), // 24h
        createAt: new Date()
      })
    ).resolves.not.toThrow();
  });
});
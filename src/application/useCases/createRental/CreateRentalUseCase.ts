import { inject, injectable } from "inversify";
import { ICarRepostitory } from "../../../domain/repositories/ICarRepository.js";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository.js";
import { TYPES } from "../../../infra/container/types.js";
import { Rental } from "../../../domain/entities/Rental.js";
import { CreateRentalDTO } from "./CreateRentalDTO.js";


@injectable()
export class CreateRentalUseCase{
    constructor(
        @inject(TYPES.RentalRepository) private rentalRepository: IRentalRepository,
        @inject(TYPES.CarRepository) private carRepository: ICarRepostitory
    ) {}

    async execute(data: CreateRentalDTO): Promise<void> {
        const rental = new Rental(
            data.id, data.carId, data.startDate, data.endDate, data.createAt);

        const OpenRentalForCar = await this.rentalRepository.findOpenRentalByCarId(rental.carId)
        if(OpenRentalForCar) {
            throw new Error("Carro indisponível.");
        }

        const openRental = await this.rentalRepository.findById(rental.id)
        if(openRental) {
            throw new Error("Usuário já possui aluguel em aberto.");
            
        }

        const hours = (rental.endDate.getTime() - rental.startDate.getTime()) / (1000 * 60 * 60)
        if(hours < 24) {
            throw new Error("Duração mínima de 24h não atingida.");
            
        }

        await this.rentalRepository.createRental(rental);
    }
}
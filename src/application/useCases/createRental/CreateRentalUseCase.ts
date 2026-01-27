import { inject } from "inversify";
import { ICarRepostitory } from "../../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";

class CreateRentalUseCase {
    constructor(
        carRepository: ICarRepostitory,
        rentalRepository: IRentalRepository
    ) {}

    @inject
}
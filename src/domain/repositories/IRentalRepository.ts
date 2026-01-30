import { Rental } from "../entities/Rental.js";

export interface IRentalRepository {
    findById(id: string): Promise<Rental | null>;
    findOpenRentalByCarId(carId: string): Promise<Rental | null>;
    createRental(rental: Rental): Promise<void>;
}
import { Rental } from "../entities/Rental.js";

export interface IRentalRepository {
    findById(id: string): Promise<Rental | null>;
    findOpenRentalByLicensePlate(licensePlate: string): Promise<Rental | null>;
    createRental(rental: Rental): Promise<void>;
}
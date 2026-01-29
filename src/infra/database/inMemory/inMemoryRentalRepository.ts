import { Rental } from "../../../domain/entities/Rental";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";

export class FakeRentalRepository implements IRentalRepository {
    private rentals: Rental[] = [];

    async findById(id: string): Promise<Rental | null> {
        const rental = this.rentals.find(rental => rental.id === id);
        if(!rental) {
            return null;
        }
        return rental;
    }

    async findOpenRentalByCarId(carId: string): Promise<Rental | null> {
        const rental = this.rentals.find(rental => rental.carId === carId);
        if(!rental) {
            return null;
        }
        return rental;
    }

    async createRental(rental: Rental): Promise<void> {
        this.rentals.push(rental);
    }
}

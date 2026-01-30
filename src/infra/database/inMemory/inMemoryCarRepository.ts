import { Car } from "../../../domain/entities/Car.js";
import { ICarRepostitory } from "../../../domain/repositories/ICarRepository.js";

export class FakeCarRepository implements ICarRepostitory {
    private cars: Car[] = [];

    async findByLicensePlate(licensePlate: string): Promise<Car | null> {
        const car = this.cars.find(car => car.licensePlate === licensePlate);
        if(!car) {
            return null;
        }
        return car;
    }

    async newCar(car: Car): Promise<void> {
        this.cars.push(car);
    }
}

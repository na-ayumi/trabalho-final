import { Car } from "../../../domain/entities/Car.js";
import { ICarRepostitory } from "../../../domain/repositories/ICarRepository.js";

export class FakeCarRepository implements ICarRepostitory {
    private cars: Car[] = [];

    constructor() {
        this.cars = [
            new Car('ABC-1234'),
            new Car('DEF-5678')
        ]
    }

    async findByLicensePlate(licensePlate: string): Promise<Car | null> {
        const car = this.cars.find(car => car.licensePlate === licensePlate);
        if (!car) {
            return null;
        }
        return car;
    }
}

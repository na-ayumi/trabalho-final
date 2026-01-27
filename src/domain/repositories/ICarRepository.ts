import { Car } from "../entities/Car";

export interface ICarRepostitory {
    findByLicensePlate(licensePlate: string): Promise<Car | null>;
    newCar(car: Car): Promise<void>;
}
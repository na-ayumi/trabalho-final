import { Car } from "../entities/Car.js";

export interface ICarRepostitory {
    findByLicensePlate(licensePlate: string): Promise<Car | null>;
}
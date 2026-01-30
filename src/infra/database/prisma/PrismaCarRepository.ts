import { inject, injectable } from "inversify";
import { prisma } from "./client.js";
import { Car } from "../../../domain/entities/Car.js";
import { ICarRepostitory } from "../../../domain/repositories/ICarRepository.js";

@injectable()
export class PrismaCarReposittory implements ICarRepostitory {
    async findByLicensePlate(licensePlate: string): Promise<Car | null> {
        const car = await prisma.car.findUnique({
            where: {licensePlate}
        })

        return car;
    }

    async newCar(car: Car): Promise<void> {
        await prisma.car.create({
            data: {
                id: car.id,
                licensePlate: car.licensePlate,
                available: car.available
            }
        })
    }
}

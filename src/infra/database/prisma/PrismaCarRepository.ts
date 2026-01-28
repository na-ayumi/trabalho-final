import { inject, injectable } from "inversify";
import { prisma } from "./client";
import { Car } from "../../../domain/entities/Car";
import { ICarRepostitory } from "../../../domain/repositories/ICarRepository";

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

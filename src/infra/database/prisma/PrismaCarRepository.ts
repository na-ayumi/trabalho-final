import { injectable } from "inversify";
import { prisma } from "./client.js";
import { Car } from "../../../domain/entities/Car.js";
import { ICarRepostitory } from "../../../domain/repositories/ICarRepository.js";

@injectable()
export class PrismaCarReposittory implements ICarRepostitory {
    async findByLicensePlate(licensePlate: string): Promise<Car | null> {
        const car = await prisma.car.findUnique({
            where: {licensePlate}
        })

        if (!car) {
            return null;
        }

        return new Car(
            car.licensePlate
        )
        
    }
}


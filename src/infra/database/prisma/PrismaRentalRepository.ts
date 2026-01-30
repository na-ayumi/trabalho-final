import { injectable } from "inversify";
import { prisma } from "./client.js";
import { Rental } from "../../../domain/entities/Rental.js";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository.js";

@injectable()
export class PrismaRentalRepository implements IRentalRepository{
    async findById(id: string): Promise<Rental | null> {
        const rental = await prisma.rental.findUnique({
            where: {id}
        })

        return rental;
    }

    async findOpenRentalByCarId(carId: string): Promise<Rental | null> {
        const rental = await prisma.rental.findFirst({
            where: { carId }
        })

        return rental
    }

    async createRental(rental: Rental): Promise<void> {
        await prisma.rental.create({
            data: {
                id: rental.id,
                carId: rental.carId,
                startDate: rental.startDate,
                endDate: rental.endDate,
                createAt: rental.createAt
            }
        })
    }
}
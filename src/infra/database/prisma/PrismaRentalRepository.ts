import { injectable } from "inversify";
import { prisma } from "./client";
import { Rental } from "../../../domain/entities/Rental";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";

@injectable()
export class PrismaRentalRepository implements IRentalRepository{
    async findById(id: string): Promise<Rental | null> {
        const rental = await prisma.rental.findUnique({
            where: {id}
        })

        return rental;
    }

    async findOpenRentalByCarId(carId: string): Promise<Rental | null> {
        const rental = await prisma.rental.findUnique({
            where: {carId}
        })

        return rental;
    }

    async createRental(rental: Rental): Promise<void> {
        await prisma.rental.create({
            id: rental.id,
            carId: rental.carId,
            startDate: rental.startDate,
            endDate: rental.endDate,
            createAt: rental.createAt
        })
    }
}
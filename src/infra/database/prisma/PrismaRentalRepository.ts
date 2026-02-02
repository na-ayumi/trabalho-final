import { injectable } from "inversify";
import { prisma } from "./client.js";
import { Rental } from "../../../domain/entities/Rental.js";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository.js";

@injectable()
export class PrismaRentalRepository implements IRentalRepository{
    async findById(id: string): Promise<Rental | null> {
        const rental = await prisma.rental.findUnique({
            where: {id}
        });

        if (!rental) {
            return null;
        }

        return new Rental(
            rental.id,
            rental.licensePlate,
            rental.startDate,
            rental.endDate,
            rental.createAt
        );
    }

    async findOpenRentalByLicensePlate(licensePlate: string): Promise<Rental | null> {
        const rental = await prisma.rental.findFirst({
            where: { licensePlate, endDate: {equals: null} }
        })

        if (!rental) {
            return null;
        }

        return new Rental(
            rental.id,
            rental.licensePlate,
            rental.startDate,
            rental.endDate,
            rental.createAt
        )
    }

    async createRental(rental: Rental): Promise<void> {
        await prisma.rental.create({
            data: {
                id: rental.id,
                licensePlate: rental.licensePlate,
                startDate: rental.startDate,
                endDate: rental.endDate,
                createAt: rental.createAt
            }
        })
    }
}
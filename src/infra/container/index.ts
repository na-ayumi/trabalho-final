import "reflect-metadata"
import { Container } from "inversify"
import { TYPES } from "./types.js"
import { ICarRepostitory } from "../../domain/repositories/ICarRepository.js";
import { PrismaCarReposittory } from "../database/prisma/PrismaCarRepository.js";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository.js";
import { PrismaRentalRepository } from "../database/prisma/PrismaRentalRepository.js";
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase.js";

const contanier = new Container();

contanier.bind<ICarRepostitory>(TYPES.CarRepository).to(PrismaCarReposittory).inSingletonScope();
contanier.bind<IRentalRepository>(TYPES.RentalRepository).to(PrismaRentalRepository).inSingletonScope();
contanier.bind(CreateRentalUseCase).toSelf();

export { contanier };
import "reflect-metadata"
import { Container } from "inversify"
import { TYPES } from "./TYPES"
import { ICarRepostitory } from "../../domain/repositories/ICarRepository";
import { PrismaCarReposittory } from "../database/prisma/PrismaCarRepository";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";
import { PrismaRentalRepository } from "../database/prisma/PrismaRentalRepository";

const contanier = new Container();

contanier.bind<ICarRepostitory>(TYPES.CarRepository).to(PrismaCarReposittory).inSingletonScope();
contanier.bind<IRentalRepository>(TYPES.RentalRepository).to(PrismaRentalRepository).inSingletonScope();
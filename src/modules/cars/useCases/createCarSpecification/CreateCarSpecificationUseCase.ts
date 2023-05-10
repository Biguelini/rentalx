import { inject, injectable } from "tsyringe";


import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { AppError } from "@shared/errors/AppError";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";


interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private specificationsRepository: ISpecificationsRepository,

  ) { }

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car does not exists!");
    }
    const specifications = await this.specificationsRepository.findByIds(specifications_id)

    carExists.speficicatons = specifications

    await this.carsRepository.create(carExists)
    return carExists;
  }
}

export { CreateCarSpecificationUseCase };
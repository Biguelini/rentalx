import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { Car } from "../entities/Car"
import { Repository, getRepository } from "typeorm"

class CarsRepository implements ICarsRepository {


  private repository: Repository<Car>


  constructor() { this.repository = getRepository(Car) }
  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id)
    return car
  }
  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true })

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand })
    }

    if (name) {
      carsQuery.andWhere("name = :name", { name })
    }

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id })
    }

    const cars = await carsQuery.getMany()

    return cars
  }

  async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id }: ICreateCarDTO): Promise<Car> {

    const car = this.repository.create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, id })
    await this.repository.save(car)

    return car
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate })
    return car
  }

}

export { CarsRepository }
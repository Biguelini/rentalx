import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

class CarsRepositoryInMemory implements ICarsRepository {
  async findById(id: string): Promise<Car> {

    return this.cars.find((car) => car.id === id)
  }
  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const all = this.cars
      .filter((car) => {
        if (
          car.available === true ||
          (brand && car.brand == brand) ||
          (category_id && car.category_id === category_id) ||
          (name && car.name === name)) {
          return car;
        }
        return null; 3
      })
    return all;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate)
  }

  cars: Car[] = []
  async create({ brand, category_id, daily_rate, description, fine_amount, name, license_plate }: ICreateCarDTO): Promise<Car> {
    const car = new Car()
    Object.assign(car, { brand, category_id, daily_rate, description, fine_amount, name, license_plate })

    this.cars.push(car)
    return car
  }

}
export { CarsRepositoryInMemory }
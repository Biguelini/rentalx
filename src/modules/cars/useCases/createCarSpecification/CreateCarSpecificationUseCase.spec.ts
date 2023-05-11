import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"
import { AppError } from "@shared/errors/AppError"
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory"


let createCarSpecificationUseCase: CreateCarSpecificationUseCase

let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory
describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)
  })
  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name",
      description: "sadfdsf",
      daily_rate: 100,
      license_plate: "dsfsdf",
      fine_amount: 60,
      brand: "dfsf",
      category_id: "category"
    })
    const specification = await specificationsRepositoryInMemory.create({ description: 'teste', name: 'teste' })
    const specifications_id = [specification.id]
    const specificationCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id })

    expect(specificationCars).toHaveProperty('specifications')
    expect(specificationCars.specifications.length).toBe(1)
  })
  it('should not be able to add a new specification to a non existant car', async () => {

    expect(async () => {
      const car_id = '1234'
      const specifications_id = ['324324']
      await createCarSpecificationUseCase.execute({ car_id, specifications_id })

    }).rejects.toBeInstanceOf(AppError)
  })
})
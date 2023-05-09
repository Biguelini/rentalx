import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"
import { AppError } from "@shared/errors/AppError"

let carsRepository: CarsRepositoryInMemory
let createCarUseCase: CreateCarUseCase
describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepository)
  })
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute(
      {
        name: "Name",
        description: "sadfdsf",
        daily_rate: 100,
        license_plate: "dsfsdf",
        fine_amount: 60,
        brand: "dfsf",
        category_id: "category"
      })
    expect(car).toHaveProperty("id")
  })

  it("should not be able to create two cars with the same license plate", () => {
    expect(async () => {
      await createCarUseCase.execute(
        {
          name: "Name",
          description: "sadfdsf",
          daily_rate: 100,
          license_plate: "dsfsdf",
          fine_amount: 60,
          brand: "dfsf",
          category_id: "category"
        })
      await createCarUseCase.execute(
        {
          name: "Name2",
          description: "sadfdsf",
          daily_rate: 100,
          license_plate: "dsfsdf",
          fine_amount: 60,
          brand: "dfsf",
          category_id: "category"
        })
    }).rejects.toBeInstanceOf(AppError)



  })
  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute(
      {
        name: "Name2",
        description: "sadfdsf",
        daily_rate: 100,
        license_plate: "dsfsdf",
        fine_amount: 60,
        brand: "dfsf",
        category_id: "category"
      })

    expect(car.available).toBe(true)
  })
})
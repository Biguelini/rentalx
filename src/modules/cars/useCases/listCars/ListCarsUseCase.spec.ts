import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListCarsUseCase } from "./ListCarsUseCase"

let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
  })


  it("should be able to list all available cars", async () => {

    await carsRepositoryInMemory.create({
      name: "Carro1",
      description: "carro",
      daily_rate: 140,
      license_plate: "asdasd",
      fine_amount: 40,
      brand: "marca",
      category_id: "ab9271ab-609b-4544-93d7-09121af8837f"
    })
    const cars = await listCarsUseCase.execute({})
    expect(cars).toHaveLength(1)
  })
  it("should be able to list all available cars by name", async () => {


    await carsRepositoryInMemory.create({
      name: "Carro3",
      description: "carro",
      daily_rate: 140,
      license_plate: "asdasd",
      fine_amount: 40,
      brand: "marca2",
      category_id: "ab9271ab-609b-4544-93d7-09121af8837f"
    })
    const cars = await listCarsUseCase.execute({ name: 'Carro3' })
    expect(cars).toHaveLength(1)
  })
  it("should be able to list all available cars by brand", async () => {


    await carsRepositoryInMemory.create({
      name: "Carro3",
      description: "carro",
      daily_rate: 140,
      license_plate: "asdasd",
      fine_amount: 40,
      brand: "marca4",
      category_id: "ab9271ab-609b-4544-93d7-09121af8837f"
    })
    const cars = await listCarsUseCase.execute({ brand: 'marca4' })
    expect(cars).toHaveLength(1)
  })
  it("should be able to list all available cars by category", async () => {


    await carsRepositoryInMemory.create({
      name: "Carro3",
      description: "carro",
      daily_rate: 140,
      license_plate: "asdasd",
      fine_amount: 40,
      brand: "marca4",
      category_id: "ab0000ab-609b-4544-93d7-09121af8123f"
    })
    const cars = await listCarsUseCase.execute({ category_id: 'ab0000ab-609b-4544-93d7-09121af8123f' })

    console.log(cars)
    expect(cars).toHaveLength(1)
  })


})
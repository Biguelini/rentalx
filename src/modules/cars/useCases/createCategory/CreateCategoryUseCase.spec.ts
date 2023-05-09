import "reflect-metadata"
import { AppError } from "@shared/errors/AppError"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory"


let createCategoryUseCase: CreateCategoryUseCase
let categoriesInMemory: CategoriesRepositoryInMemory


describe("Create Category", () => {

  beforeEach(() => {
    categoriesInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesInMemory)
  })
  it("should to be able to create a new category", async () => {
    const category = { name: "Category Test", description: "Teste" }
    await createCategoryUseCase.execute(
      {
        name: category.name,
        description: category.description
      })
    const categoryCreated = await categoriesInMemory.findByName(category.name)
    expect(categoryCreated).toHaveProperty("id")
  })
  it("should not to be able to create a new category with same name", async () => {
    expect(async () => {
      const category = { name: "Category Test", description: "Teste" }
      await createCategoryUseCase.execute(
        {
          name: category.name,
          description: category.description
        })
      await createCategoryUseCase.execute(
        {
          name: category.name,
          description: category.description
        })
    }).rejects.toBeInstanceOf(AppError)
  })
})
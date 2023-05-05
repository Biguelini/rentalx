import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
const categoriesRepository = null
const createSpecificationUseCase = new CreateSpecificationUseCase(categoriesRepository)

const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)



export { createSpecificationController }
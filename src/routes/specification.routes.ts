import { Router } from 'express'
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'
import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository'
const specificationRepository = new SpecificationsRepository()
const specificationRoutes = Router()


const createSpecificationController = new CreateSpecificationController()
specificationRoutes.post("/", createSpecificationController.handle)


export { specificationRoutes }
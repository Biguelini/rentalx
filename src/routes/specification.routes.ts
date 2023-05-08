import { Router } from 'express'
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'
import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
const specificationRepository = new SpecificationsRepository()
const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController()
specificationRoutes.use(ensureAuthenticated)
specificationRoutes.post("/", createSpecificationController.handle)


export { specificationRoutes }
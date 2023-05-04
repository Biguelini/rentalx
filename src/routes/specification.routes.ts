import { Router } from 'express'
import { createSpecificationController } from '../modules/cars/useCases/createSpecification'
import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository'
const specificationRepository = new SpecificationsRepository()
const specificationRoutes = Router()
specificationRoutes.post("/", (req, res) => {

    return createSpecificationController.handle(req, res)

})


export { specificationRoutes }
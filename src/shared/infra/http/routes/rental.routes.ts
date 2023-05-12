import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const rentalRoutes = Router()
const createRentalController = new CreateRentalController()

rentalRoutes.post('/', ensureAuthenticated, ensureAdmin, createRentalController.handle)


export { rentalRoutes }
import uploadConfig from '@config/upload';
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController"
import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ensureAdmin } from "../middlewares/ensureAdmin"
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController"
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController"
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController"
import multer from 'multer';
const carsRoutes = Router()

const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

const uploadCarImages = multer(uploadConfig.upload("./tmp/carImages"))

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.get('/available', listCarsController.handle)
carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);
carsRoutes.post("/images/:id", uploadCarImages.array("images"), uploadCarImagesController.handle)
export { carsRoutes }
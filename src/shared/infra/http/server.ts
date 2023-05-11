import "reflect-metadata"
import express, { NextFunction, Request, Response } from "express"
import "express-async-errors"
import swaggerUi from "swagger-ui-express"

import { AppError } from "@shared/errors/AppError"
import { router } from "./routes"
import swaggerFile from "../../../swagger.json"

import createConnection from "../typeorm"
import "@shared/container"



createConnection()

const app = express()
const port = 3333

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      })
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    })
  }
)

app.listen(port, () => console.log(`Server is running on port ${port}`))
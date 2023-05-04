import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {

    constructor(private importCategoryUseCase: ImportCategoryUseCase) { }
    handle(req: any, res: Response): Response {
        const { file } = req
        this.importCategoryUseCase.execute(file)
        return res.send()
    }
}
export { ImportCategoryController }
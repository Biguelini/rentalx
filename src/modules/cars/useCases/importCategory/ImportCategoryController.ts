import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { container } from "tsyringe";

class ImportCategoryController {
    async handle(req: any, res: Response): Promise<Response> {
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase)
        const { file } = req
        await importCategoryUseCase.execute(file)
        return res.send()
    }
}
export { ImportCategoryController }
import fs from 'fs'
import csvParse from 'csv-parse'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

class ImportCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository) {

    }
    execute(file: any): void {

        const stream = fs.createReadStream(file.path)
        const parseFile = csvParse()

        stream.pipe(parseFile)

        parseFile.on("data", async (line) => {
            console.log(line)
        })
    }
}

export { ImportCategoryUseCase }
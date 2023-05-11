import { getRepository, Repository } from "typeorm"
import { Specification } from "../entities/Specification"
import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository"


class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification)
    }
    async findByIds(id: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(id)
        return specifications
    }

    async create({
        description,
        name,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            description,
            name,
        })

        await this.repository.save(specification)
        return specification
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({
            name,
        })
        return specification
    }
}

export { SpecificationsRepository }

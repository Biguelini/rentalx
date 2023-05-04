import { Category } from "../models/Category";

interface ICategoriesRepository {
    findByName(name: string): Category;
    create({ name, description }: ICreateCategoryDTO): void;
    list(): Category[];
}

interface ICreateCategoryDTO {
    name: string,
    description: string,
}
export { ICategoriesRepository, ICreateCategoryDTO }
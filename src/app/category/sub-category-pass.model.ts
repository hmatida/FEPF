import { CategoryModel } from "./category.model";

class SubCategoryPassModel{
    constructor(
        public id_subCategory: number,
        public category: CategoryModel,
        public subCategoryName: string,
    ){}
}
export {SubCategoryPassModel}
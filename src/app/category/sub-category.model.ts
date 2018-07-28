import { CategoryModel } from "./category.model";

class SubCategoryModel{
    constructor(
        public id_subCategory: number,
        public category: CategoryModel,
        public subCategoryName: string,
    ){}
}
export {SubCategoryModel}
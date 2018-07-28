import { SubCategoryModel } from "../category/sub-category.model";
import { CategoryModel } from "../category/category.model";

class ProviderModel{
    constructor(
        public id_provider: number,
        public name_provider: string,
        public subCategory: SubCategoryModel,
        public category: CategoryModel,
    ){}
}
export {ProviderModel}
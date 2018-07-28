import { SubCategoryModel } from "../category/sub-category.model";
import { ProviderModel } from "../provider/provider.model";

class PredictionModel{
    constructor(
        public id_launchPrediction: number,
        public part: number,
        public subCategory: SubCategoryModel,
        public typeOfLaunch: string,
        public provider: ProviderModel,
        public value: number,
        public description: string,
        public dt_exp: Date,
        public isPay: boolean,
    ){}
}
export {PredictionModel}
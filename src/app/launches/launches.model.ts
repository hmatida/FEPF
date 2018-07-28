import { ProviderModel } from "../provider/provider.model";
import { AccountModel } from "../account/account.model";
import { SubCategoryModel } from "../category/sub-category.model";


class LaunchesModel{
    constructor(
        public id_launch: number,
        public dt: Date,
        public provider: ProviderModel,
        public account: AccountModel,
        public subCategory: SubCategoryModel,

        public typeOfLaunch: string,
        public description: string,
        public discont: number,
        public interest: number,
        public tt: number,
        public pay_value: number,
        public balance: number,

    ){}
}
export {LaunchesModel}
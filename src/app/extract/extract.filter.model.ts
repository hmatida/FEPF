import { AccountModel } from "../account/account.model";

class ExtractFilterModel{
    
    constructor(
       public account: AccountModel,
       public operation: number,
       public initDate: Date,
       public finalDate: Date,
    ){}
}
export {ExtractFilterModel}
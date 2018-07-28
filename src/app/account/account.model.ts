class AccountModel{
    constructor(
        public id_account: number,
        public startBalance: number,
        public name_account: string,
        public balance: number,
        public limite: number,
        public typeOfAccount: string,
    ){}

    getNameAccount(){
        return this.name_account;
    }
}
export {AccountModel}
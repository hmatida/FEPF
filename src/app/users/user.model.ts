class UserModel{
    constructor(
        public id_usuario: number,
        public name: string,
        public login: string,
        public isActive: boolean,
        public sex: string,
        public password: string
    ){}
}
export {UserModel}
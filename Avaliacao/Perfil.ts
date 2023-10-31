class Perfil {
    private _id: number;
    private _nome: string;
    private _email: string;

    constructor(_id: number, _nome: string, _email: string){
        this._id = _id;
        this._nome = _nome;
        this._email = _email;

    }
    get id(): number{
        return this._id;
    }

    get nome(): string{
        return this._nome;
    }

    get email(): string{
        return this._email
    }
}
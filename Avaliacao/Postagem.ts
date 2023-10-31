class Postagem {
    private _id: number;
    private _qtdCurtidas: number;
    private _qtdDescurtidas: number;
    private _data: Date;
    private _perfil: Perfil;

    constructor(_id: number, _qtdCurtidas: number, _qtdDescurtidas: number, _data: Date, _perfil: Perfil){
        this._id = _id;
        this._data = _data;
        this._perfil = _perfil;
        this._qtdCurtidas = _qtdCurtidas;
        this._qtdDescurtidas = _qtdDescurtidas;
    }

    get id(): number {
        return this._id;
    }

    get qtdCurtidas(): number {
        return this._qtdCurtidas;
    }

    get qtdDescurtidas(): number {
        return this._qtdDescurtidas;
    }

    get data(): Date {
        return this._data;
    }

    get perfil(): Perfil {
        return this._perfil;
    }

    curtir(): void {
        this._qtdCurtidas += 1;
    }

    descurtir(): void {
        this._qtdDescurtidas += 1;
    }

    ehPopular(): boolean {
        return this._qtdCurtidas >= this._qtdDescurtidas * 1.5;
    }
}
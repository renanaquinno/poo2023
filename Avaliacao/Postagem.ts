class Postagem {
    private _id: number;
    private _texto: string;
    private _qtdCurtidas: number;
    private _qtdDescurtidas: number;
    private _data: Date;
    private _perfil: Perfil;

    constructor(id: number, texto: string, qtdCurtidas: number, qtdDescurtidas: number, data: Date, perfil: Perfil){
        this._id = id;
        this._texto = texto;
        this._data = data;
        this._perfil = perfil;
        this._qtdCurtidas = qtdCurtidas;
        this._qtdDescurtidas = qtdDescurtidas;
    }

    get id(): number {
        return this._id;
    }

    get texto(): string {
        return this._texto;
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
        return this._qtdCurtidas > this._qtdDescurtidas * 1.5;
    }
}
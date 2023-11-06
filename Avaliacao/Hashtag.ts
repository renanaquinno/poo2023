class Hashtag{
    private _hashtag: string;
    private _contador: number = 0;

    constructor (_hashtag: string, _contador: number){
        this._hashtag = _hashtag;
        this._contador = _contador;
    }

    get hashtag(): string{
        return this._hashtag;
    }

    get todasHashtags(){
        return this._hashtag;
    }

    get contador(): number{
        return this.contador;
    }

    atualizarContador(): void{
        this._contador += 1;
    }

}

export {Hashtag}
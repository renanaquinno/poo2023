class PostagemAvancada extends Postagem{
    private _hashtags: Hashtag[] = [];
    private _visualizacoesRestantes: number;

    constructor(id: number, texto: string, qtdCurtidas: number, qtdDescurtidas: number, data: Date, perfil: Perfil, hashtags: Hashtag[], visualizacoesRestantes: number){
        super(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil);
        this._hashtags = hashtags;
        this._visualizacoesRestantes = visualizacoesRestantes;
    }

    adicionarHashtag(hashtag: Hashtag): void{
        this._hashtags.push(hashtag);
    }

    existeHashtag(hashtag: Hashtag): boolean {
        for (let item of this._hashtags){
            if (item === hashtag){
                return true;
            }
        }

        return false;
    }

    decrementarVisualizacoes(): void {
        this._visualizacoesRestantes -= 1;
    }

    visualizacoesRestantes(): number {
        if (this._visualizacoesRestantes > 100) { //limite imposto = 100
            return 0;
        } else {
            return 100 - this._visualizacoesRestantes;
        }
    }
}

export {PostagemAvancada}
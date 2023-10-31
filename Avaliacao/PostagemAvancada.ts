class PostagemAvancada extends Postagem{
    hashtag: Hashtag;
    hashtags: Hashtag[] = [];
    visualizacoes: number;

    constructor(id: number, qtdCurtidas: number, qtdDescurtidas: number, data: Date, perfil: Perfil, hashtag: Hashtag, hashtags: Hashtag[], visualizacoes: number){
        super(id, qtdCurtidas, qtdDescurtidas, data, perfil);
        this.hashtag = hashtag;
        this.hashtags = hashtags;
        this.visualizacoes = visualizacoes;
    }

    adicionarHashtag(hashtag: Hashtag): void{
        this.hashtags.push(hashtag);
    }

    existeHashtag(hashtag: Hashtag): boolean {
        for (let item of this.hashtags){
            if (item === hashtag){
                return true;
            }
        }

        return false;
    }

    decrementarVisualizacoes(): void {
        this.visualizacoes += 1;
    }

    visualizacoesRestantes(): number {
        if (this.visualizacoes > 100) { //limite imposto = 100
            return 0;
        } else {
            return 100 - this.visualizacoes;
        }
    }
}
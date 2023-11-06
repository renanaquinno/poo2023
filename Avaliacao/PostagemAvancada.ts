import { Postagem } from "./Postagem";
import { Perfil } from "./Perfil";
import { Hashtag } from "./Hashtag";
class PostagemAvancada extends Postagem {
    private _hashtags: Hashtag[] = [];
    private _visualizacoesRestantes: number = 100;

    constructor(id: string, texto: string, qtdCurtidas: number, qtdDescurtidas: number, data: Date, perfil: Perfil, _hashtags: Hashtag, visualizacoesRestantes: number){
        super(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil);
        this._hashtags = [];
        this._visualizacoesRestantes = visualizacoesRestantes;
    }

    get hashtags(): Hashtag[]{
        return this._hashtags;
    }

    adicionarHashtag(hashtag: Hashtag): void{
        if (!this.existeHashtag){
            this._hashtags.push(hashtag);
        }
        hashtag.atualizarContador();
    }

    existeHashtag(hashtag: string): boolean {
        for (let item of this._hashtags){
            if (item.hashtag === hashtag){
                return true;
            }
        }
        return false;
    }

    decrementarVisualizacoes(): void {
        this._visualizacoesRestantes -= 1;
    }

    visualizacoesRestantes(): number {
        if (this._visualizacoesRestantes <= 0) { 
            return 0;
        } else {
            return 100 - this._visualizacoesRestantes;
        }
    }

    exibir3HashtagsPopulares(): Hashtag[] {
        const hashtagsOrdenadas = this._hashtags.sort((a, b) => b.contador - a.contador);
        return hashtagsOrdenadas.slice(0, 3);
    }
}

export {PostagemAvancada}
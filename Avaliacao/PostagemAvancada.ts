import { Postagem } from "./Postagem";
import { Perfil } from "./Perfil";
import { Hashtag } from "./Hashtag";
class PostagemAvancada extends Postagem {
    private _hashtags: string;
    private _visualizacoesRestantes: number = 1;

    constructor(id: string, texto: string, qtdCurtidas: number, qtdDescurtidas: number, data: Date, perfil: Perfil, _hashtags: string, visualizacoesRestantes: number){
        super(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil);
        this._hashtags = _hashtags;
        this._visualizacoesRestantes = visualizacoesRestantes;
    }

    get hashtags(): string{
        return this._hashtags;
    }

    get vizualizacoesRest(){
        return this._visualizacoesRestantes;
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

interface IRepositorioDePostagens {
    todasPostagens: any;
    hashtagPopular(): any;
    todosPost(): string[];
    excluirPostagem(id: string): any;
    exibirPostagemMaisRecente(): PostagemAvancada | Postagem | null;
    exibirCurtidasEDescurtidas(id: string): string;
    consultarPopulares(): (PostagemAvancada | Postagem)[] | null;
    consultarporhastag(hashtag: string): any;
    consultarPorId(id: string): PostagemAvancada | Postagem | null;
    inserir(postagem: Postagem): void;
    consultar(id?: string, texto?: string, hashtag?: string, perfil?: Perfil): PostagemAvancada []
}

export {PostagemAvancada, IRepositorioDePostagens}
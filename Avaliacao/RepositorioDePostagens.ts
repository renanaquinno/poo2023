import { PostagemAvancada } from "./PostagemAvancada";

class RepositorioDePostagens {
    private _postagens: Postagem[] = [];
    private _postagensAvancadas: PostagemAvancada[] = [];


    constructor(postagens: Postagem[]){
        this._postagens = postagens;
    }

    get lengthPostagens(): number{
        return this._postagens.length + this._postagensAvancadas.length;
    }

    adicionar(postagem: Postagem) {
        if (this._postagens.includes(postagem)) {
            return false;
        } else {
            this._postagens.push(postagem);
            return true;
        }
    }

    consultarPostagem(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem{
        let postagemProcurada!: Postagem;
        let postagemAvancadaProcurada!: PostagemAvancada;
        for (let postagem of this._postagens) {
            if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil) {
                postagemProcurada = postagem;
                break;
            }
        }

        /// CORRIGIR, RETORNAR PERFIS

        for (let postagemAvancada of this._postagensAvancadas) {
            if (postagemAvancada.id == id || postagemAvancada.texto == texto || postagemAvancada.hashtags == hashtag || postagemAvancada.perfil == perfil) {
                postagemAvancadaProcurada = postagemAvancada;
                break;
            }
        }
        return postagemAvancadaProcurada;
    }
}

export {RepositorioDePostagens}
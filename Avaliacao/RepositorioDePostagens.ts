import { PostagemAvancada } from "./PostagemAvancada";
import { Postagem } from "./Postagem";
import { Perfil } from "./Perfil";
import { stringify } from "querystring";
class RepositorioDePostagens {
    private _postagens: (Postagem | PostagemAvancada)[] = [];

    constructor(_postagens: Postagem | PostagemAvancada[]) {
        this._postagens = [];
    }

    get lenght(): number {
        return this._postagens.length;
    }

    get todasPostagens() {
        return this._postagens;
    }

    adicionar(postagem: Postagem | PostagemAvancada) {
        if (this._postagens.includes(postagem)) {
            return false;
        } else {
            this._postagens.push(postagem);
            let perfil = postagem.perfil;
            perfil.postagens.push(postagem);
            return true;
        }
    }

    remover(postagem: Postagem | PostagemAvancada): void {
        if (this._postagens.includes(postagem)) {
            let indiceBuscado = this.consultarIndicePorId(postagem.id);

            if (indiceBuscado != -1) {
                this._postagens.slice(indiceBuscado, 1);
            }
        }
    }

    consultarporhastag(hashtag: string): PostagemAvancada[] {
        let postagens: (PostagemAvancada)[] = [];
        for (let postagem of this._postagens) {
            if (postagem instanceof PostagemAvancada) {
                if (postagem.hashtags == hashtag) {
                    postagens.push(postagem)
                }
            }
        }

        return postagens;
    }

    consultar(id?: string, texto?: string, hashtag?: string, perfil?: Perfil): (Postagem | PostagemAvancada)[] {
        let postagens: (PostagemAvancada | Postagem)[] = [];
        for (let postagem of this._postagens) {
            if (postagem instanceof Postagem) {
                if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil) {
                    postagens.push(postagem)
                }
            }

            if (postagem instanceof PostagemAvancada) {
                if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil || postagem.hashtags == hashtag) {
                    postagem.decrementarVisualizacoes();
                    postagens.push(postagem)
                }
            }
        }

        return postagens.length > 0 ? postagens : null;
    }

    consultarPorId(id: string): Postagem | PostagemAvancada | null {
        for (let postagem of this._postagens) {
            if (postagem.id == id) {
                return postagem;
            }
        }
        return null;
    }

    consultarIndicePorId(id: string): number {
        let indiceBuscado: number = -1;

        for (let i = 0; i < this._postagens.length; i++) {
            if (this._postagens[i].id == id) {
                indiceBuscado = i;
                break;
            }
        }

        return indiceBuscado;
    }

    consultarPopulares(): (Postagem | PostagemAvancada)[] | null {
        let postsPopulares: (Postagem | PostagemAvancada)[] = [];

        for (let post of this._postagens) {
            if (post.ehPopular()) {
                postsPopulares.push(post);
            }
        }

        return postsPopulares;
    }

    exibirCurtidasEDescurtidas(id: string): string {
        let indiceBuscado = this.consultarIndicePorId(id);

        if (indiceBuscado != -1) {
            if (this._postagens[indiceBuscado] != null) {
                return `Curtidas = ${this._postagens[indiceBuscado].qtdCurtidas}\n Descurtidas ${this._postagens[indiceBuscado].qtdDescurtidas}`;
            }
        }
        return `POSTAGEM NÃO LOCALIZADA`
    }

    exibirPostagemMaisRecente(): Postagem | PostagemAvancada | null {
        if (this._postagens.length === 0) {
            return null;
        }

        let postagemMaisRecente = this._postagens[0];

        for (let postagem of this._postagens) {
            if (postagem.data > postagemMaisRecente.data) {
                postagemMaisRecente = postagem;
            }
        }
        return postagemMaisRecente;
    }

    exibirPostagemMaisCurtida(): Postagem {
        let postagemBuscada!: Postagem;
        let maiorQtdCurtidas: number = 0;

        for (let postagem of this._postagens) {
            if (postagem.qtdCurtidas > maiorQtdCurtidas) {
                postagemBuscada = postagem;
                maiorQtdCurtidas = postagem.qtdCurtidas;
            }
        }
        return postagemBuscada;
    }

    excluirPostagem(id: string): void {
        let postagemBuscada!: Postagem;

        for (let postagem of this._postagens) {
            if (postagem.id == id) {
                postagemBuscada = postagem;
                break;
            }
        }

        this._postagens.pop();
    }



    consultarPostagem(id?: string, texto?: string, hashtag?: string, perfil?: Perfil): Postagem {
        let postagemProcurada!: Postagem;
        let postagemAvancadaProcurada!: PostagemAvancada;
        for (let postagem of this._postagens) {
            if (postagem instanceof Postagem) {
                if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil) {
                    postagemProcurada = postagem;
                    break;
                }
            }

            if (postagem instanceof PostagemAvancada) {
                if (postagem.id == id || postagem.texto == texto || postagem.hashtags == hashtag || postagem.perfil == perfil) {
                    postagemAvancadaProcurada = postagem;
                    break;
                }
            }

        }
        return postagemProcurada;
    }
}

export { RepositorioDePostagens }
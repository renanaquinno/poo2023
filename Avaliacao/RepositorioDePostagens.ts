import { PostagemAvancada } from "./PostagemAvancada";
import { IRepositorioDePostagens, Postagem } from "./Postagem";
import { Perfil } from "./Perfil";
import { stringify } from "querystring";
import { AplicacaoError, PostagemNaoExistenteError } from "./Error";
class RepositorioDePostagens implements IRepositorioDePostagens {
    private _postagens: PostagemAvancada[] = [];


    constructor(_postagens: PostagemAvancada[]) {
        this._postagens = [];
    }

    get lenght(): number {
        return this._postagens.length;
    }

    get todasPostagens() {
        return this._postagens;
    }

    todosPost(): string[] {
        let post = [];
        let string = '';
        for (let p of this._postagens) {
            string = 'ID: ' + p.id + '; Texto: ' + p.texto;
            post.push(string);
        }
        return post;
    }

    inserir(postagem: PostagemAvancada) {
        try {
            if (this._postagens.includes(postagem)) {
                return false;
            } else {
                this._postagens.push(postagem);
                let perfil = postagem.perfil;
                perfil.postagens.push(postagem);
                return true;
            }
        } catch (e: any) {
            if (e instanceof AplicacaoError) {
                console.log(e.name);
                console.log(e.message);
            }
        }
    }


    remover(postagem: PostagemAvancada): void {
        try {
            if (this._postagens.includes(postagem)) {
                let indiceBuscado = this.consultarIndicePorId(postagem.id);
                if (indiceBuscado != -1) {
                    this._postagens.slice(indiceBuscado, 1);
                }
            }
        } catch (e: any) {
            if (e instanceof AplicacaoError) {
                console.log(e.name);
                console.log(e.message);
            }
        }
    }

    consultarporhastag(hashtag: string): PostagemAvancada[] {
        let postagens: PostagemAvancada[] = [];
        for (let postagem of this._postagens) {
            if (postagem instanceof PostagemAvancada) {
                if (postagem.hashtags == hashtag) {
                    postagens.push(postagem)
                    postagem.decrementarVisualizacoes();
                }
            }
        }
        return postagens;
    }

    hashtagPopular() {
        let hashtags = [];
        for (let postagem of this._postagens) {
            if (postagem instanceof PostagemAvancada) {
                if (postagem.hashtags) {
                    hashtags.push(postagem.hashtags)
                }
            }
        }

        let max = { item: 0, count: 0 };
        for (let i = 0; i < hashtags.length; i++) {
            let arrOccurences = hashtags.filter(item => { return item === hashtags[i] }).length;
            if (arrOccurences > max.count) {
                max = { item: hashtags[i], count: hashtags.filter(item => { return item === hashtags[i] }).length };
            }
        }

        return max.item;
    }

    consultar(id?: string, texto?: string, hashtag?: string, perfil?: Perfil): PostagemAvancada[] | null {
        let postagens: PostagemAvancada[] = [];
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

        return postagens.length > 0 ? postagens : null
    }

    consultarPorId(id: string): PostagemAvancada | null {
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

    consultarPopulares(): PostagemAvancada[] | null {
        let postsPopulares: PostagemAvancada[] = [];

        for (let post of this._postagens) {
            if (post.ehPopular()) {
                postsPopulares.push(post);
            }
        }

        return postsPopulares;
    }

    exibirCurtidasEDescurtidas(id: string): string {
        let indiceBuscado = this.consultarIndicePorId(id);
        try {
            if (indiceBuscado != -1) {
                if (this._postagens[indiceBuscado] != null) {
                    return `Curtidas = ${this._postagens[indiceBuscado].qtdCurtidas}\n Descurtidas ${this._postagens[indiceBuscado].qtdDescurtidas}`;
                }
            }
        } catch (e: any) {
            if (e instanceof AplicacaoError) {
                console.log(e.name);
                console.log(e.message);
                throw new PostagemNaoExistenteError("Postagem Não Existente!");
            }
        }
    }

    exibirPostagemMaisRecente(): PostagemAvancada | undefined {

        try {
            if (this._postagens.length === 0) {
                throw new PostagemNaoExistenteError("Postagens Não Existente!");
            }
            let postagemMaisRecente = this._postagens[0];

            for (let postagem of this._postagens) {
                if (postagem.data > postagemMaisRecente.data) {
                    postagemMaisRecente = postagem;
                }
            }
            return postagemMaisRecente;
        } catch (e: any) {
            if (e instanceof AplicacaoError) {
                console.log(e.name);
                console.log(e.message);
            }
        }
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
        try {
            let postagemBuscada!: Postagem;
            for (let postagem of this._postagens) {
                if (postagem.id == id) {
                    postagemBuscada = postagem;
                    break;
                }
            }
            this._postagens.pop();
        } catch (e: any) {
            if (e instanceof AplicacaoError) {
                console.log(e.name);
                console.log(e.message);
            }
        }
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
                    postagem.decrementarVisualizacoes();
                    break;
                }
            }

        }
        return postagemProcurada;
    }
}

export { RepositorioDePostagens }
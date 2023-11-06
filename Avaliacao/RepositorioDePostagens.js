"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioDePostagens = void 0;
const PostagemAvancada_1 = require("./PostagemAvancada");
const Postagem_1 = require("./Postagem");
const Hashtag_1 = require("./Hashtag");
class RepositorioDePostagens {
    constructor(postagens) {
        this._postagens = [];
        this._postagens = [];
    }
    get lenght() {
        return this._postagens.length;
    }
    get todasPostagens() {
        return this._postagens;
    }
    adicionar(postagem) {
        if (this._postagens.includes(postagem)) {
            return false;
        }
        else {
            this._postagens.push(postagem);
            let perfil = postagem.perfil;
            perfil.postagens.push(postagem);
            return true;
        }
    }
    remover(postagem) {
        if (this._postagens.includes(postagem)) {
            let indiceBuscado = this.consultarIndicePorId(postagem.id);
            if (indiceBuscado != -1) {
                this._postagens.slice(indiceBuscado, 1);
            }
        }
    }
    consultar(id, texto, hashtag, perfil) {
        let postagens = [];
        for (let postagem of this._postagens) {
            if (postagem instanceof Postagem_1.Postagem) {
                if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil) {
                    postagens.push(postagem);
                }
            }
            if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil || postagem.existeHashtag(hashtag)) {
                    postagem.decrementarVisualizacoes();
                    postagens.push(postagem);
                }
            }
        }
        return postagens.length > 0 ? postagens : null;
    }
    consultarPorId(id) {
        for (let postagem of this._postagens) {
            if (postagem.id == id) {
                return postagem;
            }
        }
        return null;
    }
    consultarIndicePorId(id) {
        let indiceBuscado = -1;
        for (let i = 0; i < this._postagens.length; i++) {
            if (this._postagens[i].id == id) {
                indiceBuscado = i;
                break;
            }
        }
        return indiceBuscado;
    }
    consultarPopulares() {
        let postsPopulares = [];
        for (let post of this._postagens) {
            if (post.ehPopular()) {
                postsPopulares.push(post);
            }
        }
        return postsPopulares;
    }
    exibirTop3HashtagsPopulares() {
        let todasHashtags = [];
        for (let postagem of this._postagens) {
            if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                todasHashtags.push(...postagem.hashtags);
            }
        }
        const hashtagsContadorMap = new Map();
        for (let hashtag of todasHashtags) {
            const existente = hashtagsContadorMap.get(hashtag.hashtag);
            if (existente) {
                existente.atualizarContador();
            }
            else {
                hashtagsContadorMap.set(hashtag.hashtag, new Hashtag_1.Hashtag(hashtag.hashtag, 1));
            }
        }
        let hashtagsOrdenadas = Array.from(hashtagsContadorMap.values()).sort((a, b) => b.contador - a.contador);
        return hashtagsOrdenadas.slice(0, 3);
    }
    exibirCurtidasEDescurtidas(id) {
        let indiceBuscado = this.consultarIndicePorId(id);
        if (indiceBuscado != -1) {
            if (this._postagens[indiceBuscado] != null) {
                return `Curtidas = ${this._postagens[indiceBuscado].qtdCurtidas}\n Descurtidas ${this._postagens[indiceBuscado].qtdDescurtidas}`;
            }
        }
        return `POSTAGEM NÃO LOCALIZADA`;
    }
    exibirPostagemMaisRecente() {
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
    exibirPostagemMaisCurtida() {
        let postagemBuscada;
        let maiorQtdCurtidas = 0;
        for (let postagem of this._postagens) {
            if (postagem.qtdCurtidas > maiorQtdCurtidas) {
                postagemBuscada = postagem;
                maiorQtdCurtidas = postagem.qtdCurtidas;
            }
        }
        return postagemBuscada;
    }
    excluirPostagem(id) {
        let postagemBuscada;
        for (let postagem of this._postagens) {
            if (postagem.id == id) {
                postagemBuscada = postagem;
                break;
            }
        }
        this._postagens.pop();
    }
    consultarPostagem(id, texto, hashtag, perfil) {
        let postagemProcurada;
        let postagemAvancadaProcurada;
        for (let postagem of this._postagens) {
            if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil) {
                postagemProcurada = postagem;
                break;
            }
        }
        // for (let postagemAvancada of this._postagensAvancadas) {
        //     if (postagemAvancada.id == id || postagemAvancada.texto == texto || postagemAvancada.perfil == perfil) {
        //     // if (postagemAvancada.id == id || postagemAvancada.texto == texto || postagemAvancada.hashtags == hashtag || postagemAvancada.perfil == perfil) {
        //         postagemAvancadaProcurada = postagemAvancada;
        //         break;
        //     }
        // }
        return postagemProcurada;
    }
}
exports.RepositorioDePostagens = RepositorioDePostagens;

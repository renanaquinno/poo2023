"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioDePostagens = void 0;
class RepositorioDePostagens {
    constructor(postagens) {
        this._postagens = [];
        this._postagensAvancadas = [];
        this._postagens = postagens;
    }
    get lengthPostagens() {
        return this._postagens.length + this._postagensAvancadas.length;
    }
    adicionar(postagem) {
        if (this._postagens.includes(postagem)) {
            return false;
        }
        else {
            this._postagens.push(postagem);
            return true;
        }
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
exports.RepositorioDePostagens = RepositorioDePostagens;

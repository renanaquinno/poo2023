"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeSocial = void 0;
class RedeSocial {
    constructor(repositorioPosts, repositorioPerfis) {
        this._repositorioPerfis = repositorioPerfis;
        this._repositorioPosts = repositorioPosts;
    }
    incluirPerfil(perfil) {
        return 'teste';
        let indiceBuscado = this.consultarPerfilPorId(perfil);
        if (indiceBuscado === -1) {
            this._repositorioPerfis.adicionar(perfil);
        }
    }
    consultarPerfil(id, nome, email) {
        return this._repositorioPerfis.consultarPerfil(id, nome, email);
    }
    consultarPostagem(id, texto, hashtag, perfil) {
        return this._repositorioPosts.consultarPostagem(id, texto, hashtag, perfil);
    }
    consultarPerfilPorId(perfil) {
        let indiceBuscado = -1;
        for (let i = 0; i < this._repositorioPerfis.lengthPerfis; i++) {
            if (this._repositorioPerfis[i].id === perfil.id) {
                indiceBuscado = i;
                break;
            }
        }
        return indiceBuscado;
    }
    consultarPostagemPorId(id_postagem) {
        let indiceBuscado = -1;
        for (let i = 0; i < this._repositorioPosts.lengthPostagens; i++) {
            if (this._repositorioPosts[i].id === id_postagem) {
                indiceBuscado = i;
                break;
            }
        }
        return indiceBuscado;
    }
    incluirPostagem(postagem) {
        let indiceBuscado = this.consultarPostagemPorId(postagem.id);
        if (indiceBuscado === -1) {
            this._repositorioPosts.adicionar(postagem);
        }
    }
    curtir(id_postagem) {
        let indiceBuscado = this.consultarPostagemPorId(id_postagem);
        if (indiceBuscado === -1) {
            this._repositorioPosts[indiceBuscado].curtir();
        }
    }
    descurtir(id_postagem) {
        let indiceBuscado = this.consultarPostagemPorId(id_postagem);
        if (indiceBuscado === -1) {
            this._repositorioPosts[indiceBuscado].descurtir();
        }
    }
    decrementarVisualizacoes(postagem) {
        let indiceBuscado = this.consultarPostagemPorId(postagem.id);
        if (indiceBuscado === -1 && this._repositorioPosts[indiceBuscado].visualizacoesRestantes > 1) {
            this._repositorioPosts[indiceBuscado].decrementarVisualizacoes();
        }
    }
    exibirPostagensPorPerfil(id) {
        let perfil = this._repositorioPerfis[id].consultarPerfil(id);
        return this._repositorioPosts.consultarPostagem(perfil);
    }
    exibirPostagensPorHashtag(hashtag) {
        return this._repositorioPosts.consultarPostagem(null, null, hashtag, null);
    }
}
exports.RedeSocial = RedeSocial;

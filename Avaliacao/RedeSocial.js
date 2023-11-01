"use strict";
exports.__esModule = true;
exports.RedeSocial = void 0;
var RedeSocial = /** @class */ (function () {
    function RedeSocial() {
    }
    RedeSocial.prototype.incluirPerfil = function (perfil) {
        var indiceBuscado = this.consultarPerfilPorId(perfil);
        if (indiceBuscado === -1) {
            this._repositorioPerfis.adicionar(perfil);
        }
    };
    RedeSocial.prototype.consultarPerfil = function (id, nome, email) {
        return this._repositorioPerfis.consultarPerfil(id, nome, email);
    };
    RedeSocial.prototype.consultarPostagem = function (id, nome, email) {
        return this._repositorioPosts.consultarPostagem(id, nome, email);
    };
    RedeSocial.prototype.consultarPerfilPorId = function (perfil) {
        var indiceBuscado = -1;
        for (var i = 0; i < this._repositorioPerfis.lengthPerfis; i++) {
            if (this._repositorioPerfis[i].id === perfil.id) {
                indiceBuscado = i;
                break;
            }
        }
        return indiceBuscado;
    };
    RedeSocial.prototype.consultarPostagemPorId = function (id_postagem) {
        var indiceBuscado = -1;
        for (var i = 0; i < this._repositorioPosts.lengthPostagens; i++) {
            if (this._repositorioPosts[i].id === id_postagem) {
                indiceBuscado = i;
                break;
            }
        }
        return indiceBuscado;
    };
    RedeSocial.prototype.incluirPostagem = function (postagem) {
        var indiceBuscado = this.consultarPostagemPorId(postagem.id);
        if (indiceBuscado === -1) {
            this._repositorioPosts.adicionar(postagem);
        }
    };
    RedeSocial.prototype.curtir = function (id_postagem) {
        var indiceBuscado = this.consultarPostagemPorId(id_postagem);
        if (indiceBuscado === -1) {
            this._repositorioPosts[indiceBuscado].curtir();
        }
    };
    RedeSocial.prototype.descurtir = function (id_postagem) {
        var indiceBuscado = this.consultarPostagemPorId(id_postagem);
        if (indiceBuscado === -1) {
            this._repositorioPosts[indiceBuscado].descurtir();
        }
    };
    RedeSocial.prototype.decrementarVisualizacoes = function (postagem) {
        var indiceBuscado = this.consultarPostagemPorId(postagem.id);
        if (indiceBuscado === -1 && this._repositorioPosts[indiceBuscado].visualizacoesRestantes > 1) {
            this._repositorioPosts[indiceBuscado].decrementarVisualizacoes();
        }
    };
    RedeSocial.prototype.exibirPostagensPorPerfil = function (id) {
        var perfil = this._repositorioPerfis[id].consultarPerfil(id);
        return this._repositorioPosts.consultarPostagem(perfil);
    };
    RedeSocial.prototype.exibirPostagensPorHashtag = function (hashtag) {
        this._repositorioPosts.consultarPostagem(null, null, hashtag, null);
    };
    return RedeSocial;
}());
exports.RedeSocial = RedeSocial;

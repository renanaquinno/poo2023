"use strict";
exports.__esModule = true;
exports.RepositorioDePostagens = void 0;
var RepositorioDePostagens = /** @class */ (function () {
    function RepositorioDePostagens(postagens) {
        this._postagens = [];
        this._postagensAvancadas = [];
        this._postagens = postagens;
    }
    Object.defineProperty(RepositorioDePostagens.prototype, "lengthPostagens", {
        get: function () {
            return this._postagens.length + this._postagensAvancadas.length;
        },
        enumerable: false,
        configurable: true
    });
    RepositorioDePostagens.prototype.adicionar = function (postagem) {
        if (this._postagens.includes(postagem)) {
            return false;
        }
        else {
            this._postagens.push(postagem);
            return true;
        }
    };
    RepositorioDePostagens.prototype.consultarPostagem = function (id, texto, hashtag, perfil) {
        var postagemProcurada;
        var postagemAvancadaProcurada;
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil) {
                postagemProcurada = postagem;
                break;
            }
        }
        /// CORRIGIR, RETORNAR PERFIS
        for (var _b = 0, _c = this._postagensAvancadas; _b < _c.length; _b++) {
            var postagemAvancada = _c[_b];
            if (postagemAvancada.id == id || postagemAvancada.texto == texto || postagemAvancada.hashtags == hashtag || postagemAvancada.perfil == perfil) {
                postagemAvancadaProcurada = postagemAvancada;
                break;
            }
        }
        return postagemAvancadaProcurada;
    };
    return RepositorioDePostagens;
}());
exports.RepositorioDePostagens = RepositorioDePostagens;

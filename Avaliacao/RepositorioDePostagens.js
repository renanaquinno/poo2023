"use strict";
exports.__esModule = true;
exports.RepositorioDePostagens = void 0;
var PostagemAvancada_1 = require("./PostagemAvancada");
var Postagem_1 = require("./Postagem");
var RepositorioDePostagens = /** @class */ (function () {
    function RepositorioDePostagens(_postagens) {
        this._postagens = [];
        this._postagens = [];
    }
    Object.defineProperty(RepositorioDePostagens.prototype, "lenght", {
        get: function () {
            return this._postagens.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RepositorioDePostagens.prototype, "todasPostagens", {
        get: function () {
            return this._postagens;
        },
        enumerable: false,
        configurable: true
    });
    RepositorioDePostagens.prototype.todosPost = function () {
        var post = [];
        var string = '';
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
            var p = _a[_i];
            string = 'ID: ' + p.id + '; Texto: ' + p.texto;
            post.push(string);
        }
        return post;
    };
    RepositorioDePostagens.prototype.inserir = function (postagem) {
        if (this._postagens.includes(postagem)) {
            return false;
        }
        else {
            this._postagens.push(postagem);
            var perfil = postagem.perfil;
            perfil.postagens.push(postagem);
            return true;
        }
    };
    RepositorioDePostagens.prototype.remover = function (postagem) {
        if (this._postagens.includes(postagem)) {
            var indiceBuscado = this.consultarIndicePorId(postagem.id);
            if (indiceBuscado != -1) {
                this._postagens.slice(indiceBuscado, 1);
            }
        }
    };
    RepositorioDePostagens.prototype.consultarporhastag = function (hashtag) {
        var postagens = [];
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                if (postagem.hashtags == hashtag) {
                    postagens.push(postagem);
                    postagem.decrementarVisualizacoes();
                }
            }
        }
        return postagens;
    };
    RepositorioDePostagens.prototype.hashtagPopular = function () {
        var hashtags = [];
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                if (postagem.hashtags) {
                    hashtags.push(postagem.hashtags);
                }
            }
        }
        var max = { item: 0, count: 0 };
        var _loop_1 = function (i) {
            var arrOccurences = hashtags.filter(function (item) { return item === hashtags[i]; }).length;
            if (arrOccurences > max.count) {
                max = { item: hashtags[i], count: hashtags.filter(function (item) { return item === hashtags[i]; }).length };
            }
        };
        for (var i = 0; i < hashtags.length; i++) {
            _loop_1(i);
        }
        return max.item;
    };
    RepositorioDePostagens.prototype.consultar = function (id, texto, hashtag, perfil) {
        var postagens = [];
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem instanceof Postagem_1.Postagem) {
                if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil) {
                    postagens.push(postagem);
                }
            }
            if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil || postagem.hashtags == hashtag) {
                    postagem.decrementarVisualizacoes();
                    postagens.push(postagem);
                }
            }
        }
        return postagens.length > 0 ? postagens : null;
    };
    RepositorioDePostagens.prototype.consultarPorId = function (id) {
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem.id == id) {
                return postagem;
            }
        }
        return null;
    };
    RepositorioDePostagens.prototype.consultarIndicePorId = function (id) {
        var indiceBuscado = -1;
        for (var i = 0; i < this._postagens.length; i++) {
            if (this._postagens[i].id == id) {
                indiceBuscado = i;
                break;
            }
        }
        return indiceBuscado;
    };
    RepositorioDePostagens.prototype.consultarPopulares = function () {
        var postsPopulares = [];
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
            var post = _a[_i];
            if (post.ehPopular()) {
                postsPopulares.push(post);
            }
        }
        return postsPopulares;
    };
    RepositorioDePostagens.prototype.exibirCurtidasEDescurtidas = function (id) {
        var indiceBuscado = this.consultarIndicePorId(id);
        if (indiceBuscado != -1) {
            if (this._postagens[indiceBuscado] != null) {
                return "Curtidas = ".concat(this._postagens[indiceBuscado].qtdCurtidas, "\n Descurtidas ").concat(this._postagens[indiceBuscado].qtdDescurtidas);
            }
        }
        return "POSTAGEM N\u00C3O LOCALIZADA";
    };
    RepositorioDePostagens.prototype.exibirPostagemMaisRecente = function () {
        if (this._postagens.length === 0) {
            return null;
        }
        var postagemMaisRecente = this._postagens[0];
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem.data > postagemMaisRecente.data) {
                postagemMaisRecente = postagem;
            }
        }
        return postagemMaisRecente;
    };
    RepositorioDePostagens.prototype.exibirPostagemMaisCurtida = function () {
        var postagemBuscada;
        var maiorQtdCurtidas = 0;
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem.qtdCurtidas > maiorQtdCurtidas) {
                postagemBuscada = postagem;
                maiorQtdCurtidas = postagem.qtdCurtidas;
            }
        }
        return postagemBuscada;
    };
    RepositorioDePostagens.prototype.excluirPostagem = function (id) {
        var postagemBuscada;
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem.id == id) {
                postagemBuscada = postagem;
                break;
            }
        }
        this._postagens.pop();
    };
    RepositorioDePostagens.prototype.consultarPostagem = function (id, texto, hashtag, perfil) {
        var postagemProcurada;
        var postagemAvancadaProcurada;
        for (var _i = 0, _a = this._postagens; _i < _a.length; _i++) {
            var postagem = _a[_i];
            if (postagem instanceof Postagem_1.Postagem) {
                if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil) {
                    postagemProcurada = postagem;
                    break;
                }
            }
            if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                if (postagem.id == id || postagem.texto == texto || postagem.hashtags == hashtag || postagem.perfil == perfil) {
                    postagemAvancadaProcurada = postagem;
                    postagem.decrementarVisualizacoes();
                    break;
                }
            }
        }
        return postagemProcurada;
    };
    return RepositorioDePostagens;
}());
exports.RepositorioDePostagens = RepositorioDePostagens;

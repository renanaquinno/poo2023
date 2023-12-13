"use strict";
exports.__esModule = true;
exports.RedeSocial = void 0;
var Postagem_1 = require("./Postagem");
var PostagemAvancada_1 = require("./PostagemAvancada");
var Error_1 = require("./Error");
var RedeSocial = /** @class */ (function () {
    function RedeSocial(repositorioPerfis, repositorioPosts, repositorioHashtags) {
        this._repositorioPerfis = repositorioPerfis;
        this._repositorioPosts = repositorioPosts;
        this._repositorioHashtag = repositorioHashtags;
    }
    RedeSocial.prototype.incluirPerfil = function (perfil) {
        if (!(this.existePerfil(perfil))) {
            this._repositorioPerfis.inserir(perfil);
            console.log("Adicionado com Sucesso!");
        }
        else {
            throw new Error_1.PerfilExistenteError("Erro ao Adicionar, ID ja existente!");
        }
    };
    RedeSocial.prototype.existePerfil = function (perfilBuscado) {
        this._repositorioPerfis.consultar(perfilBuscado.id, perfilBuscado.nome, perfilBuscado.email);
        if (this._repositorioPerfis.consultar(perfilBuscado.id, perfilBuscado.nome, perfilBuscado.email)) {
            return true;
        }
        return false;
    };
    RedeSocial.prototype.consultarPerfil = function (id, nome, email) {
        var perfil_procurado;
        for (var i = 0; i < this._repositorioPerfis.todosPerfis.length; i++) {
            if (this._repositorioPerfis.todosPerfis[i].id == id || this._repositorioPerfis.todosPerfis[i].nome == nome || this._repositorioPerfis.todosPerfis[i].email == email) {
                perfil_procurado = this._repositorioPerfis.todosPerfis[i];
            }
        }
        return perfil_procurado;
    };
    RedeSocial.prototype.consultarPerfilPorId = function (id) {
        var perfil_procurado;
        for (var i = 0; i < this._repositorioPerfis.todosPerfis.length; i++) {
            if (this._repositorioPerfis.todosPerfis[i].id == id) {
                perfil_procurado = this._repositorioPerfis.todosPerfis[i];
            }
        }
        return perfil_procurado;
    };
    RedeSocial.prototype.consultarHashTag = function (tag) {
        var tag_procurado = this._repositorioHashtag.consultarHashtag(tag);
        return tag_procurado;
    };
    RedeSocial.prototype.incluirHashtag = function (tag) {
        this._repositorioHashtag.adicionar(tag);
    };
    RedeSocial.prototype.existePostagem = function (postagem) {
        if (this._repositorioPosts.consultar(postagem.id)) {
            return true;
        }
        return false;
    };
    RedeSocial.prototype.incluirPostagem = function (postagem) {
        if (!this._repositorioPosts.consultar(postagem.id)) {
            this._repositorioPosts.inserir(postagem);
            console.log("Postagem Adicionada!");
        }
        else {
            throw new Error_1.PostagemExistenteError("Erro ao Adicionar, Postagem ja existente!");
        }
    };
    RedeSocial.prototype.consultarPostagens = function (id, texto, hashtag, perfil) {
        return this._repositorioPosts.consultar(id, texto, hashtag, perfil);
    };
    RedeSocial.prototype.consultarPostagemPorId = function (id) {
        return this._repositorioPosts.consultarPorId(id);
    };
    RedeSocial.prototype.curtir = function (id) {
        var postProcurado = this.consultarPostagemPorId(id);
        if (postProcurado != null) {
            postProcurado.curtir();
        }
        else {
            throw new Error_1.PostagemNaoExistenteError("Postagem Não Existente!");
        }
    };
    RedeSocial.prototype.descurtir = function (id) {
        var postProcurado = this.consultarPostagemPorId(id);
        if (postProcurado != null) {
            postProcurado.descurtir();
        }
        else {
            throw new Error_1.PostagemNaoExistenteError("Postagem Não Existente!");
        }
    };
    RedeSocial.prototype.decrementarVisualizacoes = function (postagem) {
        var postProcurado = this.consultarPostagemPorId(postagem.id);
        if (postProcurado != null) {
            if (postProcurado instanceof PostagemAvancada_1.PostagemAvancada) {
                postProcurado.decrementarVisualizacoes();
            }
        }
    };
    RedeSocial.prototype.exibirPostagensPorPerfil = function (id) {
        var postagens = this._repositorioPosts.consultar(id);
        var postagensValidas = [];
        if (postagens != null) {
            for (var _i = 0, postagens_1 = postagens; _i < postagens_1.length; _i++) {
                var post = postagens_1[_i];
                if (post instanceof PostagemAvancada_1.PostagemAvancada) {
                    post.decrementarVisualizacoes();
                    if (post.visualizacoesRestantes() !== 0) {
                        postagensValidas.push(post);
                    }
                }
                else if (post instanceof Postagem_1.Postagem) {
                    postagensValidas.push(post);
                }
            }
            return postagensValidas;
        }
        return null;
    };
    RedeSocial.prototype.exibirPostagensPorHashtag = function (hashtag) {
        var postagens = this._repositorioPosts.consultarporhastag(hashtag);
        return postagens;
    };
    RedeSocial.prototype.postagensPopulares = function () {
        return this._repositorioPosts.consultarPopulares();
    };
    RedeSocial.prototype.exibirHashtagsMaisPopulares = function () {
        return this._repositorioHashtag.exibirToptagPopular();
    };
    RedeSocial.prototype.exibirCurtidasEDescurtidas = function (id) {
        return this._repositorioPosts.exibirCurtidasEDescurtidas(id);
    };
    RedeSocial.prototype.exibirPostagemMaisRecente = function () {
        return this._repositorioPosts.exibirPostagemMaisRecente();
    };
    RedeSocial.prototype.exibirPostagemMaisCurtida = function () {
        return this._repositorioPosts.exibirPostagemMaisCurtida();
    };
    RedeSocial.prototype.excluirPostagem = function (id) {
        return this._repositorioPosts.excluirPostagem(id);
    };
    RedeSocial.prototype.exibirTodasPostagens = function () {
        return this._repositorioPosts.todosPost();
    };
    RedeSocial.prototype.exibirTodosPerfis = function () {
        return this._repositorioPerfis.todosPerfis;
    };
    RedeSocial.prototype.hashtagMaisPopular = function () {
        return this._repositorioPosts.hashtagPopular();
    };
    RedeSocial.prototype.atualizarBanco = function () {
        var listaPostagens = '';
        var postagens = this._repositorioPosts.todasPostagens;
        for (var i = 0; i < postagens.length; i++) {
            listaPostagens = listaPostagens + postagens[i].id + ';' + postagens[i].texto + ';' + postagens[i].qtdCurtidas + ';' + postagens[i].qtdDescurtidas + ';' + postagens[i].data + ';' + postagens[i].perfil.id + ';' + postagens[i].hashtags + ';' + postagens[i].vizualizacoesRest + '\n';
        }
        var bdPostagens = require('fs');
        bdPostagens.writeFile('postagens.txt', listaPostagens, function (err) {
            if (err)
                throw err;
        });
        var listaPerfis = '';
        var perfis = this._repositorioPerfis.todosPerfis;
        for (var i = 0; i < perfis.length; i++) {
            listaPerfis = listaPerfis + perfis[i].id + ';' + perfis[i].nome + ';' + perfis[i].email + ';' + perfis[i].postagens + '\n';
        }
        var bdperfis = require('fs');
        bdperfis.writeFile('perfis.txt', listaPerfis, function (err) {
            if (err)
                throw err;
        });
    };
    return RedeSocial;
}());
exports.RedeSocial = RedeSocial;

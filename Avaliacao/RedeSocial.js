"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeSocial = void 0;
const RepositorioDePostagens_1 = require("./RepositorioDePostagens");
const RepositorioDePerfis_1 = require("./RepositorioDePerfis");
const Postagem_1 = require("./Postagem");
const PostagemAvancada_1 = require("./PostagemAvancada");
const RepositorioHashtags_1 = require("./RepositorioHashtags");
class RedeSocial {
    constructor(_repositorioPerfis, _repositorioPosts, _repositorioHashtags) {
        this._repositorioPerfis = new RepositorioDePerfis_1.RepositorioDePerfis();
        this._repositorioPosts = new RepositorioDePostagens_1.RepositorioDePostagens();
        this._repositorioHashtag = new RepositorioHashtags_1.RepositorioDeHastags();
    }
    incluirPerfil(perfil) {
        if (!(this.existePerfil(perfil))) {
            this._repositorioPerfis.adicionar(perfil);
            console.log("Adicionado com Sucesso!");
        }
        else {
            console.log("Erro ao Adicionar, ID ja existente!");
        }
    }
    existePerfil(perfilBuscado) {
        if (this._repositorioPerfis.consultarPerfil(perfilBuscado.id, perfilBuscado.nome, perfilBuscado.email)) {
            return true;
        }
        return false;
    }
    consultarPerfil(id, nome, email) {
        let perfil_procurado;
        for (let i = 0; i < this._repositorioPerfis.todosPerfis.length; i++) {
            if (this._repositorioPerfis.todosPerfis[i].id == id || this._repositorioPerfis.todosPerfis[i].nome == nome || this._repositorioPerfis.todosPerfis[i].email == email) {
                perfil_procurado = this._repositorioPerfis.todosPerfis[i];
            }
        }
        return perfil_procurado;
    }
    consultarPerfilPorId(id) {
        let perfil_procurado;
        for (let i = 0; i < this._repositorioPerfis.todosPerfis.length; i++) {
            if (this._repositorioPerfis.todosPerfis[i].id == id) {
                perfil_procurado = this._repositorioPerfis.todosPerfis[i];
            }
        }
        return perfil_procurado;
    }
    consultarHashTag(tag) {
        let tag_procurado = this._repositorioHashtag.consultarHashtag(tag);
        return tag_procurado;
    }
    incluirHashtag(tag) {
        this._repositorioHashtag.adicionar(tag);
    }
    existePostagem(postagem) {
        if (this._repositorioPosts.consultar(postagem.id)) {
            return true;
        }
        return false;
    }
    incluirPostagem(postagem) {
        if (!this._repositorioPosts.consultar(postagem.id)) {
            this._repositorioPosts.adicionar(postagem);
            console.log("Postagen Adicionada!");
        }
        else {
            console.log("Postagen já existe!");
        }
    }
    consultarPostagens(id, texto, hashtag, perfil) {
        return this._repositorioPosts.consultar(id, texto, hashtag, perfil);
    }
    consultarPostagemPorId(id) {
        return this._repositorioPosts.consultarPorId(id);
    }
    curtir(id) {
        let postProcurado = this.consultarPostagemPorId(id);
        if (postProcurado != null) {
            postProcurado.curtir();
        }
        else {
            console.log("Postagem Não Existe");
        }
    }
    descurtir(id) {
        let postProcurado = this.consultarPostagemPorId(id);
        if (postProcurado != null) {
            postProcurado.descurtir();
        }
        else {
            console.log("Postagem Não Existe");
        }
    }
    decrementarVisualizacoes(postagem) {
        let postProcurado = this.consultarPostagemPorId(postagem.id);
        if (postProcurado != null) {
            if (postProcurado instanceof PostagemAvancada_1.PostagemAvancada) {
                postProcurado.decrementarVisualizacoes();
            }
        }
    }
    exibirPostagensPorPerfil(id) {
        let postagens = this._repositorioPosts.consultar(id);
        let postagensValidas = [];
        if (postagens != null) {
            for (let post of postagens) {
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
    }
    exibirPostagensPorHashtag(hashtag) {
        let postagens = this._repositorioPosts.consultarporhastag(hashtag);
        return postagens;
    }
    postagensPopulares() {
        return this._repositorioPosts.consultarPopulares();
    }
    exibirHashtagsMaisPopulares() {
        return this._repositorioHashtag.exibirToptagPopular();
    }
    exibirCurtidasEDescurtidas(id) {
        return this._repositorioPosts.exibirCurtidasEDescurtidas(id);
    }
    exibirPostagemMaisRecente() {
        return this._repositorioPosts.exibirPostagemMaisRecente();
    }
    exibirPostagemMaisCurtida() {
        return this._repositorioPosts.exibirPostagemMaisCurtida();
    }
    excluirPostagem(id) {
        return this._repositorioPosts.excluirPostagem(id);
    }
    exibirTodasPostagens() {
        return this._repositorioPosts.todosPost();
    }
    exibirTodosPerfis() {
        return this._repositorioPerfis.todosPerfis;
    }
    atualizarBanco() {
        let listaPostagens = '';
        let postagens = this._repositorioPosts.todasPostagens;
        for (let i = 0; i < postagens.length; i++) {
            listaPostagens = listaPostagens + postagens[i].id + ';' + postagens[i].texto + ';' + postagens[i].qtdCurtidas + ';' + postagens[i].qtdDescurtidas + ';' + postagens[i].data + ';' + postagens[i].perfil.id + '\n';
        }
        var bdPostagens = require('fs');
        bdPostagens.writeFile('postagens.txt', listaPostagens, function (err) {
            if (err)
                throw err;
        });
        let listaPerfis = '';
        let perfis = this._repositorioPerfis.todosPerfis;
        for (let i = 0; i < perfis.length; i++) {
            listaPerfis = listaPerfis + perfis[i].id + ';' + perfis[i].nome + ';' + perfis[i].email + ';' + perfis[i].postagens + '\n';
        }
        var bdperfis = require('fs');
        bdperfis.writeFile('perfis.txt', listaPerfis, function (err) {
            if (err)
                throw err;
        });
    }
}
exports.RedeSocial = RedeSocial;

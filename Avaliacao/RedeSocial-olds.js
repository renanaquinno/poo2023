"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeSocial = void 0;
const Postagem_1 = require("./Postagem");
const PostagemAvancada_1 = require("./PostagemAvancada");
class RedeSocial {
    constructor(_repositorioPerfis, _repositorioPosts) {
        this._repositorioPerfis = _repositorioPerfis;
        this._repositorioPosts = _repositorioPosts;
    }
    incluirPerfil(perfil) {
        if (!(this.existePerfil(perfil))) {
            this._repositorioPerfis.adicionar(perfil);
            return "Adicionado com Sucesso!";
        }
        else {
            return "Erro ao Adicionar, ID ja existente!";
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
    existePostagem(postagem) {
        if (this._repositorioPosts.consultar(postagem.id)) {
            return true;
        }
        return false;
    }
    incluirPostagem(postagem) {
        if (this._repositorioPosts.consultar(postagem.id)) {
            this._repositorioPosts.adicionar(postagem);
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
    }
    descurtir(id) {
        let postProcurado = this.consultarPostagemPorId(id);
        if (postProcurado != null) {
            postProcurado.descurtir();
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
        console.log(postagens);
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
        let postagens = this._repositorioPosts.consultar(undefined, undefined, hashtag);
        let postagensValidas = [];
        if (postagens != null) {
            for (let postagem of postagens) {
                if (postagem instanceof PostagemAvancada_1.PostagemAvancada) {
                    postagensValidas.push(postagem);
                }
            }
            return postagensValidas;
        }
        return null;
    }
    postagensPopulares() {
        return this._repositorioPosts.consultarPopulares();
    }
    exibirHashtagsMaisPopulares() {
        return this._repositorioPosts.exibirTop3HashtagsPopulares();
    }
    exibirCurtidasEDescurtidas(id) {
        return this._repositorioPosts.exibirCurtidasEDescurtidas(id);
    }
    exibirPostagemMaisRecente() {
        return this._repositorioPosts.exibirPostagemMaisRecente();
    }
    atualizarBanco() {
        console.log('teste');
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
    }
}
exports.RedeSocial = RedeSocial;

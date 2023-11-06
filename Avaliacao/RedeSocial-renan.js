"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeSocial = void 0;
const Postagem_1 = require("./Postagem");
const PostagemAvancada_1 = require("./PostagemAvancada");
class RedeSocial {
    constructor() {
        this._repositorioPerfis = [];
        this._repositorioPosts = [];
        // exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
        //     return this._repositorioPosts.consultarPostagem(null,null,hashtag,null);
        // }
    }
    incluirPerfil(perfil) {
        let indiceBuscado = this.consultarPerfilPorId(perfil.id);
        if (indiceBuscado == undefined) {
            this._repositorioPerfis.push(perfil);
            return "Adicionado com Sucesso!";
        }
        else {
            return "Erro ao Adicionar, ID ja existente!";
        }
    }
    consultarPerfil(id, nome, email) {
        let perfil_procurado;
        for (let i = 0; i < this._repositorioPerfis.length; i++) {
            if (this._repositorioPerfis[i].id == id || this._repositorioPerfis[i].nome == nome || this._repositorioPerfis[i].email == email) {
                perfil_procurado = this._repositorioPerfis[i];
            }
        }
        return perfil_procurado;
    }
    consultarPerfilPorId(id) {
        let perfil_procurado;
        for (let i = 0; i < this._repositorioPerfis.length; i++) {
            if (this._repositorioPerfis[i].id == id) {
                perfil_procurado = this._repositorioPerfis[i];
            }
        }
        return perfil_procurado;
    }
    consultarPostagem(id, texto, hashtag, perfil) {
        let post_procurado;
        for (let i = 0; i < this._repositorioPosts.length; i++) {
            if (this._repositorioPosts[i].id == id || this._repositorioPosts[i].texto == texto || this._repositorioPosts[i].perfil == perfil) {
                post_procurado = this._repositorioPosts[i];
            }
        }
        return post_procurado;
    }
    consultarPostagemPorId(id) {
        let post_procurado;
        for (let i = 0; i < this._repositorioPosts.length; i++) {
            if (this._repositorioPosts[i].id == id) {
                post_procurado = this._repositorioPosts[i];
            }
        }
        return post_procurado;
    }
    incluirPostagem(postagem) {
        let indiceBuscado = this.consultarPostagemPorId(postagem.id);
        if (indiceBuscado == undefined) {
            this._repositorioPosts.push(postagem);
            postagem.perfil.postagens.push(postagem);
            return "Adicionado com Sucesso!";
        }
        else {
            return "Erro ao Adicionar, Id ja existente!";
        }
    }
    curtir(id) {
        let postProcurado = this.consultarPostagemPorId(id);
        if (postProcurado != undefined) {
            postProcurado.curtir();
        }
    }
    descurtir(id) {
        let postProcurado = this.consultarPostagemPorId(id);
        if (postProcurado != undefined) {
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
        let postagens = [];
        for (let i = 0; i < this._repositorioPerfis.length; i++) {
            if (this._repositorioPerfis[i].id == id) {
                postagens.push(this._repositorioPerfis[i].postagens);
            }
        }
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
        let postagens = this._repPosts.consultar(undefined, undefined, hashtag);
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
        let post_procurado = [];
        for (let i = 0; i < this._repositorioPosts.length; i++) {
            if (this._repositorioPosts[i].ehPopular()) {
                post_procurado.push(this._repositorioPosts[i]);
            }
        }
        return post_procurado;
    }
    exibirHashtagsMaisPopulares() {
        return this._repPosts.exibirTop3HashtagsPopulares();
    }
    exibirCurtidasEDescurtidas(id) {
        return this._repPosts.exibirCurtidasEDescurtidas(id);
    }
    exibirPostagemMaisRecente() {
        return this._repPosts.exibirPostagemMaisRecente();
    }
    atualizarBanco() {
        let listaPostagens = '';
        for (let i = 0; i < this._repositorioPosts.length; i++) {
            listaPostagens = listaPostagens + this._repositorioPosts[i].id + ';' + this._repositorioPosts[i].texto + ';' + this._repositorioPosts[i].qtdCurtidas + ';' + this._repositorioPosts[i].qtdDescurtidas + ';' + this._repositorioPosts[i].data + ';' + this._repositorioPosts[i].perfil.id + '\n';
        }
        var bdPostagens = require('fs');
        bdPostagens.writeFile('postagens.txt', listaPostagens, function (err) {
            if (err)
                throw err;
        });
        let listaPerfis = '';
        for (let i = 0; i < this._repositorioPerfis.length; i++) {
            listaPerfis = listaPerfis + this._repositorioPerfis[i].id + ';' + this._repositorioPerfis[i].nome + ';' + this._repositorioPerfis[i].email + ';' + this._repositorioPerfis[i].postagens;
            '\n';
        }
        var bdPostagens = require('fs');
        bdPostagens.writeFile('perfil.txt', listaPerfis, function (err) {
            if (err)
                throw err;
        });
    }
}
exports.RedeSocial = RedeSocial;

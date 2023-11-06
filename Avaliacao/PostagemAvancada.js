"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostagemAvancada = void 0;
const Postagem_1 = require("./Postagem");
class PostagemAvancada extends Postagem_1.Postagem {
    constructor(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil, _hashtags, visualizacoesRestantes) {
        super(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil);
        this._hashtags = [];
        this._visualizacoesRestantes = 100;
        this._hashtags = [];
        this._visualizacoesRestantes = visualizacoesRestantes;
    }
    get hashtags() {
        return this._hashtags;
    }
    adicionarHashtag(hashtag) {
        if (!this.existeHashtag) {
            this._hashtags.push(hashtag);
        }
        hashtag.atualizarContador();
    }
    existeHashtag(hashtag) {
        for (let item of this._hashtags) {
            if (item.hashtag === hashtag) {
                return true;
            }
        }
        return false;
    }
    decrementarVisualizacoes() {
        this._visualizacoesRestantes -= 1;
    }
    visualizacoesRestantes() {
        if (this._visualizacoesRestantes <= 0) {
            return 0;
        }
        else {
            return 100 - this._visualizacoesRestantes;
        }
    }
    exibir3HashtagsPopulares() {
        const hashtagsOrdenadas = this._hashtags.sort((a, b) => b.contador - a.contador);
        return hashtagsOrdenadas.slice(0, 3);
    }
}
exports.PostagemAvancada = PostagemAvancada;

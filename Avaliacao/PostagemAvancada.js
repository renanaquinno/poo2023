"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostagemAvancada = void 0;
const Postagem_1 = require("./Postagem");
class PostagemAvancada extends Postagem_1.Postagem {
    constructor(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil, hashtags, visualizacoesRestantes) {
        super(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil);
        this._hashtags = [];
        this._hashtags = hashtags;
        this._visualizacoesRestantes = visualizacoesRestantes;
    }
    get hashtags() {
        return this.hashtags;
    }
    adicionarHashtag(hashtag) {
        this._hashtags.push(hashtag);
    }
    existeHashtag(hashtag) {
        for (let item of this._hashtags) {
            if (item === hashtag) {
                return true;
            }
        }
        return false;
    }
    decrementarVisualizacoes() {
        this._visualizacoesRestantes -= 1;
    }
    visualizacoesRestantes() {
        if (this._visualizacoesRestantes > 100) { //limite imposto = 100
            return 0;
        }
        else {
            return 100 - this._visualizacoesRestantes;
        }
    }
}
exports.PostagemAvancada = PostagemAvancada;

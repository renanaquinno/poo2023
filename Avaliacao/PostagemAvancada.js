"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostagemAvancada = void 0;
const Postagem_1 = require("./Postagem");
class PostagemAvancada extends Postagem_1.Postagem {
    constructor(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil, _hashtags, visualizacoesRestantes) {
        super(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil);
        this._visualizacoesRestantes = 1;
        this._hashtags = _hashtags;
        this._visualizacoesRestantes = visualizacoesRestantes;
    }
    get hashtags() {
        return this._hashtags;
    }
    get vizualizacoesRest() {
        return this._visualizacoesRestantes;
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

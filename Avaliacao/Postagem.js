"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postagem = void 0;
class Postagem {
    constructor(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil) {
        this._id = id;
        this._texto = texto;
        this._data = data;
        this._perfil = perfil;
        this._qtdCurtidas = qtdCurtidas;
        this._qtdDescurtidas = qtdDescurtidas;
    }
    get id() {
        return this._id;
    }
    get texto() {
        return this._texto;
    }
    get qtdCurtidas() {
        return this._qtdCurtidas;
    }
    get qtdDescurtidas() {
        return this._qtdDescurtidas;
    }
    get data() {
        return this._data;
    }
    get perfil() {
        return this._perfil;
    }
    curtir() {
        this._qtdCurtidas += 1;
    }
    descurtir() {
        this._qtdDescurtidas += 1;
    }
    ehPopular() {
        return this._qtdCurtidas > this._qtdDescurtidas * 1.5;
    }
}
exports.Postagem = Postagem;

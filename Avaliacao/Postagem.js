"use strict";
exports.__esModule = true;
exports.Postagem = void 0;
var Postagem = /** @class */ (function () {
    function Postagem(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil) {
        this._id = id;
        this._texto = texto;
        this._data = data;
        this._perfil = perfil;
        this._qtdCurtidas = qtdCurtidas;
        this._qtdDescurtidas = qtdDescurtidas;
    }
    Object.defineProperty(Postagem.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Postagem.prototype, "texto", {
        get: function () {
            return this._texto;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Postagem.prototype, "qtdCurtidas", {
        get: function () {
            return this._qtdCurtidas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Postagem.prototype, "qtdDescurtidas", {
        get: function () {
            return this._qtdDescurtidas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Postagem.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Postagem.prototype, "perfil", {
        get: function () {
            return this._perfil;
        },
        enumerable: false,
        configurable: true
    });
    Postagem.prototype.curtir = function () {
        this._qtdCurtidas += 1;
    };
    Postagem.prototype.descurtir = function () {
        this._qtdDescurtidas += 1;
    };
    Postagem.prototype.ehPopular = function () {
        return this._qtdCurtidas > this._qtdDescurtidas * 1.5;
    };
    return Postagem;
}());
exports.Postagem = Postagem;

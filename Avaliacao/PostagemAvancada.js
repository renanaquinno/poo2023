"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.PostagemAvancada = void 0;
var Postagem_1 = require("./Postagem");
var PostagemAvancada = /** @class */ (function (_super) {
    __extends(PostagemAvancada, _super);
    function PostagemAvancada(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil, _hashtags, visualizacoesRestantes) {
        var _this = _super.call(this, id, texto, qtdCurtidas, qtdDescurtidas, data, perfil) || this;
        _this._visualizacoesRestantes = 1;
        _this._hashtags = _hashtags;
        _this._visualizacoesRestantes = visualizacoesRestantes;
        return _this;
    }
    Object.defineProperty(PostagemAvancada.prototype, "hashtags", {
        get: function () {
            return this._hashtags;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PostagemAvancada.prototype, "vizualizacoesRest", {
        get: function () {
            return this._visualizacoesRestantes;
        },
        enumerable: false,
        configurable: true
    });
    PostagemAvancada.prototype.decrementarVisualizacoes = function () {
        this._visualizacoesRestantes -= 1;
    };
    PostagemAvancada.prototype.visualizacoesRestantes = function () {
        if (this._visualizacoesRestantes <= 0) {
            return 0;
        }
        else {
            return 100 - this._visualizacoesRestantes;
        }
    };
    PostagemAvancada.prototype.exibir3HashtagsPopulares = function () {
        var hashtagsOrdenadas = this._hashtags.sort(function (a, b) { return b.contador - a.contador; });
        return hashtagsOrdenadas.slice(0, 3);
    };
    return PostagemAvancada;
}(Postagem_1.Postagem));
exports.PostagemAvancada = PostagemAvancada;

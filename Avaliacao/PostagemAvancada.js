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
var PostagemAvancada = /** @class */ (function (_super) {
    __extends(PostagemAvancada, _super);
    function PostagemAvancada(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil, hashtags, visualizacoesRestantes) {
        var _this = _super.call(this, id, texto, qtdCurtidas, qtdDescurtidas, data, perfil) || this;
        _this._hashtags = [];
        _this._hashtags = hashtags;
        _this._visualizacoesRestantes = visualizacoesRestantes;
        return _this;
    }
    Object.defineProperty(PostagemAvancada.prototype, "hashtags", {
        get: function () {
            return this.hashtags;
        },
        enumerable: false,
        configurable: true
    });
    PostagemAvancada.prototype.adicionarHashtag = function (hashtag) {
        this._hashtags.push(hashtag);
    };
    PostagemAvancada.prototype.existeHashtag = function (hashtag) {
        for (var _i = 0, _a = this._hashtags; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item === hashtag) {
                return true;
            }
        }
        return false;
    };
    PostagemAvancada.prototype.decrementarVisualizacoes = function () {
        this._visualizacoesRestantes -= 1;
    };
    PostagemAvancada.prototype.visualizacoesRestantes = function () {
        if (this._visualizacoesRestantes > 100) { //limite imposto = 100
            return 0;
        }
        else {
            return 100 - this._visualizacoesRestantes;
        }
    };
    return PostagemAvancada;
}(Postagem));
exports.PostagemAvancada = PostagemAvancada;

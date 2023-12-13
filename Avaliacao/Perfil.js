"use strict";
exports.__esModule = true;
exports.Perfil = void 0;
var Perfil = /** @class */ (function () {
    function Perfil(id, nome, email, postagens) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._postagens = postagens;
    }
    Object.defineProperty(Perfil.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Perfil.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Perfil.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Perfil.prototype, "postagens", {
        get: function () {
            return this._postagens;
        },
        enumerable: false,
        configurable: true
    });
    return Perfil;
}());
exports.Perfil = Perfil;

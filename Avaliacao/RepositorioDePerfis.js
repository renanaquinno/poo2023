"use strict";
exports.__esModule = true;
exports.RepositorioDePerfis = void 0;
var Error_1 = require("./Error");
var RepositorioDePerfis = /** @class */ (function () {
    function RepositorioDePerfis(_perfis) {
        this._perfis = [];
        this._perfis = [];
    }
    Object.defineProperty(RepositorioDePerfis.prototype, "todosPerfis", {
        get: function () {
            return this._perfis;
        },
        enumerable: false,
        configurable: true
    });
    RepositorioDePerfis.prototype.inserir = function (perfil) {
        if (this._perfis.includes(perfil)) {
            throw new Error_1.PerfilExistenteError("Erro ao Adicionar, Perfil ja existente!");
        }
        else {
            this._perfis.push(perfil);
        }
    };
    RepositorioDePerfis.prototype.consultar = function (id, nome, email) {
        var perfilProcurado;
        for (var i = 0; i < this._perfis.length; i++) {
            if (this._perfis[i].id == id || this._perfis[i].nome == nome || this._perfis[i].email == email) {
                perfilProcurado = this._perfis[i];
                break;
            }
        }
        return perfilProcurado;
    };
    Object.defineProperty(RepositorioDePerfis.prototype, "lengthPerfis", {
        get: function () {
            return this._perfis.length;
        },
        enumerable: false,
        configurable: true
    });
    return RepositorioDePerfis;
}());
exports.RepositorioDePerfis = RepositorioDePerfis;

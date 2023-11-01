"use strict";
exports.__esModule = true;
exports.RepositorioDePerfis = void 0;
var RepositorioDePerfis = /** @class */ (function () {
    function RepositorioDePerfis(perfis) {
        this._perfis = [];
        this._perfis = perfis;
    }
    RepositorioDePerfis.prototype.adicionar = function (perfil) {
        if (this._perfis.includes(perfil)) {
            return false;
        }
        else {
            this._perfis.push(perfil);
            return true;
        }
    };
    RepositorioDePerfis.prototype.consultarPerfil = function (id, nome, email) {
        var perfilProcurado;
        for (var _i = 0, _a = this._perfis; _i < _a.length; _i++) {
            var perfil = _a[_i];
            if (perfil.id == id || perfil.nome == nome || perfil.email == email) {
                perfilProcurado = perfil;
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

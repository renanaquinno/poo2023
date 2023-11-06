"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioDePerfis = void 0;
class RepositorioDePerfis {
    constructor(_perfis) {
        this._perfis = [];
        this._perfis = [];
    }
    get todosPerfis() {
        return this._perfis;
    }
    adicionar(perfil) {
        if (this._perfis.includes(perfil)) {
            return false;
        }
        else {
            this._perfis.push(perfil);
            return true;
        }
    }
    consultarPerfil(id, nome, email) {
        let perfilProcurado;
        for (let i = 0; i < this._perfis.length; i++) {
            if (this._perfis[i].id == id || this._perfis[i].nome == nome || this._perfis[i].email == email) {
                perfilProcurado = this._perfis[i];
                break;
            }
        }
        return perfilProcurado;
    }
    get lengthPerfis() {
        return this._perfis.length;
    }
}
exports.RepositorioDePerfis = RepositorioDePerfis;

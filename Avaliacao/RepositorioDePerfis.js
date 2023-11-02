"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioDePerfis = void 0;
class RepositorioDePerfis {
    constructor(perfis) {
        this._perfis = [];
        this._perfis = perfis;
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
        for (let perfil of this._perfis) {
            if (perfil.id == id || perfil.nome == nome || perfil.email == email) {
                perfilProcurado = perfil;
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

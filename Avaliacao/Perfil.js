"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perfil = void 0;
class Perfil {
    constructor(id, nome, email, postagens) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._postagens = postagens;
    }
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get email() {
        return this._email;
    }
    get postagens() {
        return this._postagens;
    }
}
exports.Perfil = Perfil;

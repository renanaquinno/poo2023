"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hashtag = void 0;
class Hashtag {
    constructor(_hashtag, _contador) {
        this._contador = 0;
        this._hashtag = _hashtag;
        this._contador = _contador;
    }
    get hashtag() {
        return this._hashtag;
    }
    get todasHashtags() {
        return this._hashtag;
    }
    get contador() {
        return this.contador;
    }
    atualizarContador() {
        this._contador += 1;
    }
}
exports.Hashtag = Hashtag;

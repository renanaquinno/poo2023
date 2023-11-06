"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioDeHastags = void 0;
class RepositorioDeHastags {
    constructor(_hashtag) {
        this._hashtag = [];
        this._hashtag = [];
    }
    get todasHashtags() {
        return this._hashtag;
    }
    adicionar(hashtag) {
        if (this._hashtag.includes(hashtag)) {
            return false;
        }
        else {
            this._hashtag.push(hashtag);
            return true;
        }
    }
    consultarHashtag(hashtag) {
        let hashtagProcurada;
        for (let i = 0; i < this._hashtag.length; i++) {
            if (this._hashtag[i].hashtag == hashtag) {
                hashtagProcurada = this._hashtag[i];
                break;
            }
        }
        return hashtagProcurada;
    }
    exibirToptagPopular() {
        return '#';
        // let hashtagMaisUsada = '';
        // let maior = 0;        
        // for (let has of this._hashtag){
        //     if (maior > has.contador){
        //         hashtagMaisUsada = has.hashtag
        //         maior = has.contador;
        //     } 
        // }
        // return hashtagMaisUsada;
    }
}
exports.RepositorioDeHastags = RepositorioDeHastags;

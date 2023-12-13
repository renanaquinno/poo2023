"use strict";
exports.__esModule = true;
exports.RepositorioDeHastags = void 0;
var RepositorioDeHastags = /** @class */ (function () {
    function RepositorioDeHastags(_hashtag) {
        this._hashtag = [];
        this._hashtag = [];
    }
    Object.defineProperty(RepositorioDeHastags.prototype, "todasHashtags", {
        get: function () {
            return this._hashtag;
        },
        enumerable: false,
        configurable: true
    });
    RepositorioDeHastags.prototype.adicionar = function (hashtag) {
        if (this._hashtag.includes(hashtag)) {
            return false;
        }
        else {
            this._hashtag.push(hashtag);
            return true;
        }
    };
    RepositorioDeHastags.prototype.consultarHashtag = function (hashtag) {
        var hashtagProcurada;
        for (var i = 0; i < this._hashtag.length; i++) {
            if (this._hashtag[i].hashtag == hashtag) {
                hashtagProcurada = this._hashtag[i];
                break;
            }
        }
        return hashtagProcurada;
    };
    RepositorioDeHastags.prototype.exibirToptagPopular = function () {
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
    };
    return RepositorioDeHastags;
}());
exports.RepositorioDeHastags = RepositorioDeHastags;

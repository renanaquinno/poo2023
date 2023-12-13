"use strict";
exports.__esModule = true;
exports.Hashtag = void 0;
var Hashtag = /** @class */ (function () {
    function Hashtag(_hashtag, _contador) {
        this._contador = 0;
        this._hashtag = _hashtag;
        this._contador = _contador;
    }
    Object.defineProperty(Hashtag.prototype, "hashtag", {
        get: function () {
            return this._hashtag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hashtag.prototype, "todasHashtags", {
        get: function () {
            return this._hashtag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hashtag.prototype, "contador", {
        get: function () {
            return this.contador;
        },
        enumerable: false,
        configurable: true
    });
    Hashtag.prototype.atualizarContador = function () {
        this._contador += 1;
    };
    return Hashtag;
}());
exports.Hashtag = Hashtag;

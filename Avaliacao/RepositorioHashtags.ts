import { Hashtag } from "./Hashtag";

class RepositorioDeHastags {
    private _hashtag: Hashtag[] = [];

    constructor(_hashtag: Hashtag[]){
        this._hashtag = [] ;
    }

    get todasHashtags (){
        return this._hashtag;
    }

    adicionar(hashtag: Hashtag) {
        if (this._hashtag.includes(hashtag)) {
            return false;
        } else {
            this._hashtag.push(hashtag);
            return true;
        }
    }

    consultarHashtag(hashtag?: string): Hashtag {
        let hashtagProcurada!: Hashtag;
        for (let i = 0; i < this._hashtag.length; i++) {
            if (this._hashtag[i].hashtag == hashtag) {
                hashtagProcurada = this._hashtag[i];
                break;
            }            
        }
        return hashtagProcurada;
    }

    exibirToptagPopular(): string {

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

export {RepositorioDeHastags}
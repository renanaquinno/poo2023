import { PostagemAvancada } from "./PostagemAvancada";
import { Postagem } from "./Postagem";
import { Perfil } from "./Perfil";
import { stringify } from "querystring";
import { Hashtag } from "./Hashtag";
class RepositorioDePostagens {
    private _postagens: (Postagem|PostagemAvancada)[] = [];

    constructor(postagens: Postagem[]) {
        this._postagens = [];
    }

    get lenght(): number{
        return this._postagens.length;
    }

    get todasPostagens(){
        return this._postagens;
    }

    adicionar(postagem: Postagem | PostagemAvancada) {
        if (this._postagens.includes(postagem)) {
            return false;
        } else {
            this._postagens.push(postagem);
            let perfil = postagem.perfil;
            perfil.postagens.push(postagem);
            return true;
        }
    }

    remover(postagem: Postagem | PostagemAvancada): void{
        if (this._postagens.includes(postagem)){
            let indiceBuscado = this.consultarIndicePorId(postagem.id);

            if (indiceBuscado != -1){
                this._postagens.slice(indiceBuscado,1);
            }
        }
    }

      
  
    

    consultar(id?: string, texto?: string, hashtag?: string, perfil?: Perfil): (Postagem | PostagemAvancada)[] {
        let postagens: (PostagemAvancada | Postagem)[] = [];

        for (let postagem of this._postagens) {
            if (postagem instanceof Postagem){
                if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil) {
                    postagens.push(postagem)
                }
            } if (postagem instanceof PostagemAvancada){
                if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil || postagem.existeHashtag(hashtag)) {
                    postagem.decrementarVisualizacoes();
                    postagens.push(postagem)
                }
            }
        }

        return postagens.length > 0 ? postagens : null;
    }

    consultarPorId(id: string): Postagem | PostagemAvancada | null{
        for (let postagem of this._postagens){
            if (postagem.id == id){
                return postagem;
            }
        }

        return null;
    }

    consultarIndicePorId(id: string): number{
        let indiceBuscado: number = -1;

        for (let i = 0; i < this._postagens.length; i++){
            if (this._postagens[i].id == id){
                indiceBuscado = i;
                break;
            }
        }

        return indiceBuscado;
    }

    consultarPopulares(): (Postagem|PostagemAvancada)[] | null{
        let postsPopulares: (Postagem|PostagemAvancada)[] = [];

        for (let post of this._postagens){
            if (post.ehPopular()){
                postsPopulares.push(post);
            }
        }

        return postsPopulares;
    }

    exibirTop3HashtagsPopulares(): Hashtag[] {
        let todasHashtags: Hashtag[] = [];

        for (let postagem of this._postagens) {
            if (postagem instanceof PostagemAvancada) {
                todasHashtags.push(...postagem.hashtags);
            }
        }
        
        const hashtagsContadorMap: Map<string, Hashtag> = new Map();

        for (let hashtag of todasHashtags) {
            const existente = hashtagsContadorMap.get(hashtag.hashtag);

            if (existente) {
                existente.atualizarContador();
            } else {
                hashtagsContadorMap.set(hashtag.hashtag, new Hashtag(hashtag.hashtag, 1));
            }
        }

        let hashtagsOrdenadas = Array.from(hashtagsContadorMap.values()).sort((a, b) => b.contador - a.contador);

        return hashtagsOrdenadas.slice(0, 3);
    }

    exibirCurtidasEDescurtidas(id: string): string {
        let indiceBuscado = this.consultarIndicePorId(id);
    
        if (indiceBuscado != -1){
            if (this._postagens[indiceBuscado] != null){
                return `Curtidas = ${this._postagens[indiceBuscado].qtdCurtidas}\n Descurtidas ${this._postagens[indiceBuscado].qtdDescurtidas}`;
            }
        }

        return `POSTAGEM NÃO LOCALIZADA`
    }

    exibirPostagemMaisRecente(): Postagem | PostagemAvancada | null {
        if (this._postagens.length === 0) {
            return null; 
        }
    
        let postagemMaisRecente = this._postagens[0];
    
        for (let postagem of this._postagens) {
            if (postagem.data > postagemMaisRecente.data) {
                postagemMaisRecente = postagem;
            }
        }
    
        return postagemMaisRecente;
    }


    exibirPostagemMaisCurtida(): Postagem{
        let postagemBuscada!: Postagem;
        let maiorQtdCurtidas: number = 0;

        for (let postagem of this._postagens){
            if (postagem.qtdCurtidas > maiorQtdCurtidas){
                postagemBuscada = postagem;
                maiorQtdCurtidas = postagem.qtdCurtidas;
            }
        }
        return postagemBuscada;
    }

    excluirPostagem(id: string): void{
        let postagemBuscada!: Postagem;

        for(let postagem of this._postagens){
            if (postagem.id == id){
                postagemBuscada = postagem;
                break;
            }
        }

        this._postagens.pop();
    }

    

    consultarPostagem(id?: string, texto?: string, hashtag?: string, perfil?: Perfil): Postagem {
        let postagemProcurada!: Postagem;
        let postagemAvancadaProcurada!: PostagemAvancada;
        for (let postagem of this._postagens) {
            if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil) {
                postagemProcurada = postagem;
                break;
            }
        }

        // for (let postagemAvancada of this._postagensAvancadas) {
        //     if (postagemAvancada.id == id || postagemAvancada.texto == texto || postagemAvancada.perfil == perfil) {
        //     // if (postagemAvancada.id == id || postagemAvancada.texto == texto || postagemAvancada.hashtags == hashtag || postagemAvancada.perfil == perfil) {
        //         postagemAvancadaProcurada = postagemAvancada;
        //         break;
        //     }
        // }
        return postagemProcurada;
    }
}

export { RepositorioDePostagens }
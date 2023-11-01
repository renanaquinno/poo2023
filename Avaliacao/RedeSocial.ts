import { RepositorioDePostagens } from "./RepositorioDePostagens";
import { RepositorioDePerfis } from "./RepositorioDePerfis";
import { PostagemAvancada } from "./PostagemAvancada";

class RedeSocial {
    private _repositorioPosts: RepositorioDePostagens;
    private _repositorioPerfis: RepositorioDePerfis


    incluirPerfil(perfil: Perfil): void {
        let indiceBuscado = this.consultarPerfilPorId(perfil);

        if(indiceBuscado === -1){
            this._repositorioPerfis.adicionar(perfil);
        }
    }

    consultarPerfil(id: number, nome: string, email: string): Perfil{
        return this._repositorioPerfis.consultarPerfil(id, nome, email);
    }


    consultarPostagem(id: number, texto: string, hashtag: string, perfil: Perfil): Postagem{
        return this._repositorioPosts.consultarPostagem(id, texto, hashtag, perfil);
    }

    consultarPerfilPorId(perfil: Perfil){
        let indiceBuscado: number = -1;

        for(let i = 0; i < this._repositorioPerfis.lengthPerfis; i++){
            if (this._repositorioPerfis[i].id === perfil.id){
                indiceBuscado = i;
                break;
            }
        }
        return indiceBuscado;
    }

    consultarPostagemPorId(id_postagem: number){
        let indiceBuscado: number = -1;

        for(let i = 0; i < this._repositorioPosts.lengthPostagens; i++){
            if (this._repositorioPosts[i].id === id_postagem){
                indiceBuscado = i;
                break;
            }
        }
        return indiceBuscado;
    }

    incluirPostagem(postagem: Postagem | PostagemAvancada): void {
        let indiceBuscado = this.consultarPostagemPorId(postagem.id);

        if(indiceBuscado === -1){
            this._repositorioPosts.adicionar(postagem);
        }
    }

    curtir(id_postagem: number): void{
        let indiceBuscado = this.consultarPostagemPorId(id_postagem);

        if (indiceBuscado === -1){
            this._repositorioPosts[indiceBuscado].curtir();
        }
    }

    descurtir(id_postagem: number): void{
        let indiceBuscado = this.consultarPostagemPorId(id_postagem);

        if (indiceBuscado === -1){
            this._repositorioPosts[indiceBuscado].descurtir();
        }
    }

    decrementarVisualizacoes(postagem: PostagemAvancada): void{
        let indiceBuscado = this.consultarPostagemPorId(postagem.id);
        if (indiceBuscado === -1 && this._repositorioPosts[indiceBuscado].visualizacoesRestantes > 1 ){
            this._repositorioPosts[indiceBuscado].decrementarVisualizacoes();
        }
    }

    exibirPostagensPorPerfil(id: number): Postagem[] {
        let perfil = this._repositorioPerfis[id].consultarPerfil(id);
        return this._repositorioPosts.consultarPostagem(perfil);
    }

    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
        this._repositorioPosts.consultarPostagem(null,null,hashtag,null);
    }
}


export {RedeSocial}
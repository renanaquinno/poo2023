import { RepositorioDePostagens } from "./RepositorioDePostagens";
import { RepositorioDePerfis } from "./RepositorioDePerfis";
import { Postagem } from "./Postagem";
import { PostagemAvancada } from "./PostagemAvancada";
import { Perfil } from "./Perfil";


class RedeSocial {
    private _repositorioPerfis: Perfil[] = []
    private _repositorioPosts: Postagem[] = []

//   constructor (repositorioPosts: RepositorioDePostagens, repositorioPerfis: RepositorioDePerfis){
//     this._repositorioPosts = repositorioPosts;
//     this._repositorioPerfis = repositorioPerfis;
//   }

    incluirPerfil(perfil: Perfil) {
        let indiceBuscado = this.consultarPerfilPorId(perfil.id);
        if(indiceBuscado == undefined){
            this._repositorioPerfis.push(perfil);
            return "Adicionado com Sucesso!";
        } else {
            return "Erro ao Adicionar, ID ja existente!";
        }
    }

    consultarPerfil(id: string, nome: string, email: string): Perfil{
        let perfil_procurado!: Perfil;
        for(let i = 0; i < this._repositorioPerfis.length; i++){
            if (this._repositorioPerfis[i].id == id || this._repositorioPerfis[i].nome == nome || this._repositorioPerfis[i].email == email){
                perfil_procurado = this._repositorioPerfis[i];
            }
        }
        return perfil_procurado;
    }

    consultarPostagem(id: string, texto: string, hashtag: string, perfil: Perfil): Postagem{
        let post_procurado!: Postagem;
        for(let i = 0; i < this._repositorioPosts.length; i++){
            if (this._repositorioPosts[i].id == id || this._repositorioPosts[i].texto == texto || this._repositorioPosts[i].perfil == perfil){
                post_procurado = this._repositorioPosts[i];
            }
        }
        return post_procurado;
    }

    consultarPerfilPorId(id: string): Perfil {
        let perfil_procurado!: Perfil;
        for(let i = 0; i < this._repositorioPerfis.length; i++){
            if (this._repositorioPerfis[i].id == id){
                perfil_procurado = this._repositorioPerfis[i];
            }
        }
        return perfil_procurado;
    }

    consultarPostagemPorId(id: string): Postagem{
        let post_procurado!: Postagem;
        for(let i = 0; i < this._repositorioPosts.length; i++){
            if (this._repositorioPosts[i].id == id){
                post_procurado = this._repositorioPosts[i];
            }
        }
        return post_procurado;
    }

    incluirPostagem(postagem: Postagem | PostagemAvancada): string {
        let indiceBuscado = this.consultarPostagemPorId(postagem.id);
        if(indiceBuscado == undefined){
            this._repositorioPosts.push(postagem);
            postagem.perfil.postagens.push(postagem);
            return "Adicionado com Sucesso!";
        } else {
            return "Erro ao Adicionar, Id ja existente!";
        }
    }

    curtir(id: string): void{
        let postProcurado = this.consultarPostagemPorId(id);
        if (postProcurado != undefined){
            postProcurado.curtir();
        }
    }

    descurtir(id: string): void{
        let postProcurado = this.consultarPostagemPorId(id);
        if (postProcurado != undefined){
            postProcurado.descurtir();
        }
    }

    // decrementarVisualizacoes(postagem: PostagemAvancada): void{
    //     let indiceBuscado = this.consultarPostagemPorId(postagem.id);
    //     if (indiceBuscado === -1 && this._repositorioPosts[indiceBuscado].visualizacoesRestantes > 1 ){
    //         this._repositorioPosts[indiceBuscado].decrementarVisualizacoes();
    //     }
    // }

    exibirPostagensPorPerfil(id: string): Postagem[] {
        let post_procurado!: Postagem[];
        for(let i = 0; i < this._repositorioPerfis.length; i++){
            if (this._repositorioPerfis[i].id == id){
                post_procurado = this._repositorioPerfis[i]['_postagens'];
            }
        }
        return post_procurado;
    }

    postagensPopulares(): Postagem[]{
        let post_procurado = [];
        for(let i = 0; i < this._repositorioPosts.length; i++){
            if (this._repositorioPosts[i].ehPopular()){
                post_procurado.push(this._repositorioPosts[i]);
            }
        }
        return post_procurado;
    }   

    
    atualizarBanco() {
        let listaPostagens = ''
        for (let i: number = 0; i < this._repositorioPosts.length; i++) {
            listaPostagens = listaPostagens + this._repositorioPosts[i].id + ';'+ this._repositorioPosts[i].texto + ';' + this._repositorioPosts[i].qtdCurtidas + ';' + this._repositorioPosts[i].qtdDescurtidas + ';' + this._repositorioPosts[i].data + ';' + this._repositorioPosts[i].perfil.id + '\n';
        }

        var bdPostagens = require('fs');
        bdPostagens.writeFile('postagens.txt', listaPostagens, function (err: any) {
            if (err) throw err;
        });
    }

    // exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
    //     return this._repositorioPosts.consultarPostagem(null,null,hashtag,null);
    // }
}


export {RedeSocial}
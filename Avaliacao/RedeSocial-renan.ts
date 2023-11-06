import { RepositorioDePostagens } from "./RepositorioDePostagens";
import { RepositorioDePerfis } from "./RepositorioDePerfis";
import { Postagem } from "./Postagem";
import { PostagemAvancada } from "./PostagemAvancada";
import { Perfil } from "./Perfil";


class RedeSocial {
    private _repositorioPerfis: Perfil[] = []
    private _repositorioPosts: Postagem[] = []

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

    consultarPerfilPorId(id: string): Perfil {
        let perfil_procurado!: Perfil;
        for(let i = 0; i < this._repositorioPerfis.length; i++){
            if (this._repositorioPerfis[i].id == id){
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

    decrementarVisualizacoes(postagem: PostagemAvancada): void{
        let postProcurado = this.consultarPostagemPorId(postagem.id);

        if (postProcurado != null){
            if (postProcurado instanceof PostagemAvancada){
                postProcurado.decrementarVisualizacoes();
            }
        }
    }

    exibirPostagensPorPerfil(id: string): (Postagem | PostagemAvancada)[] | null {
        let postagens = [];

        for (let i = 0; i < this._repositorioPerfis.length; i++){
            if (this._repositorioPerfis[i].id == id){
                postagens.push(this._repositorioPerfis[i].postagens);
            }
        }
        
        let postagensValidas: (Postagem|PostagemAvancada)[] = [];

        if (postagens != null){
            for (let post of postagens){
                if (post instanceof PostagemAvancada){
                    post.decrementarVisualizacoes();
                    if (post.visualizacoesRestantes() !== 0){
                        postagensValidas.push(post);
                    }
                } else if (post instanceof Postagem){
                    postagensValidas.push(post);
                }
            }
            return postagensValidas;
        }
        
        return null;
    }


    exibirPostagensPorHashtag(hashtag: Hashtag): PostagemAvancada[] | null{
        let postagens = this._repPosts.consultar(undefined, undefined, hashtag);
        let postagensValidas: PostagemAvancada[] = [];

        if (postagens != null){
            for (let postagem of postagens){
                if (postagem instanceof PostagemAvancada){
                    postagensValidas.push(postagem);
                }
            }

            return postagensValidas;
        }

        return null;
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

    exibirHashtagsMaisPopulares(): Hashtag[]{
        return this._repPosts.exibirTop3HashtagsPopulares();
    }

    exibirCurtidasEDescurtidas(id: string): string{
        return this._repPosts.exibirCurtidasEDescurtidas(id);
    }

    exibirPostagemMaisRecente(): Postagem | PostagemAvancada | null{
        return this._repPosts.exibirPostagemMaisRecente();
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

        let listaPerfis = ''
        for (let i: number = 0; i < this._repositorioPerfis.length; i++) {
            listaPerfis= listaPerfis + this._repositorioPerfis[i].id + ';'+ this._repositorioPerfis[i].nome + ';' + this._repositorioPerfis[i].email + ';' + this._repositorioPerfis[i].postagens'\n';
        }

        var bdPostagens = require('fs');
        bdPostagens.writeFile('perfil.txt', listaPerfis, function (err: any) {
            if (err) throw err;
        });
    }

    // exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
    //     return this._repositorioPosts.consultarPostagem(null,null,hashtag,null);
    // }
}


export {RedeSocial}
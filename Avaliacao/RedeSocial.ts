import { RepositorioDePostagens } from "./RepositorioDePostagens";
import { RepositorioDePerfis } from "./RepositorioDePerfis";
import { Postagem } from "./Postagem";
import { IRepositorioDePostagens, PostagemAvancada } from "./PostagemAvancada";
import { IRepositorioDePerfis, Perfil } from "./Perfil";
import { Hashtag } from "./Hashtag";
import { RepositorioDeHastags } from "./RepositorioHashtags";
import { PerfilExistenteError, PostagemExistenteError, PostagemNaoExistenteError } from "./Error";

class RedeSocial {
    private _repositorioPerfis: IRepositorioDePerfis;
    private _repositorioPosts: IRepositorioDePostagens;
    private _repositorioHashtag: RepositorioDeHastags;

    constructor (repositorioPerfis: IRepositorioDePerfis, repositorioPosts: IRepositorioDePostagens, repositorioHashtags: RepositorioDeHastags){
        this._repositorioPerfis = repositorioPerfis;
        this._repositorioPosts = repositorioPosts;
        this._repositorioHashtag = repositorioHashtags;
    }

    incluirPerfil(perfil: Perfil) {
        if(!(this.existePerfil(perfil))){
            this._repositorioPerfis.inserir(perfil);
            console.log("Adicionado com Sucesso!");
        } else {
            throw new PerfilExistenteError("Erro ao Adicionar, ID ja existente!");
        }
    }

    
    existePerfil(perfilBuscado: Perfil): boolean{
        if (this._repositorioPerfis.consultar(perfilBuscado.id, perfilBuscado.nome, perfilBuscado.email)){
            return true;
        }
        return false;
    }

    consultarPerfil(id: string, nome: string, email: string): Perfil{
        let perfil_procurado!: Perfil;
        for(let i = 0; i < this._repositorioPerfis.todosPerfis.length; i++){
            if (this._repositorioPerfis.todosPerfis[i].id == id || this._repositorioPerfis.todosPerfis[i].nome == nome || this._repositorioPerfis.todosPerfis[i].email == email){
                perfil_procurado = this._repositorioPerfis.todosPerfis[i];
            }
        }
        return perfil_procurado;
    }

    consultarPerfilPorId(id: string): Perfil {
        let perfil_procurado!: Perfil;
        for(let i = 0; i < this._repositorioPerfis.todosPerfis.length; i++){
            if (this._repositorioPerfis.todosPerfis[i].id == id){
                perfil_procurado = this._repositorioPerfis.todosPerfis[i];
            }
        }
        return perfil_procurado;
    }

    consultarHashTag(tag: string): Hashtag {
        let tag_procurado = this._repositorioHashtag.consultarHashtag(tag);
        return tag_procurado;
    }

    incluirHashtag(tag: Hashtag){
        this._repositorioHashtag.adicionar(tag)
    }

    existePostagem(postagem: Postagem | PostagemAvancada){
        if (this._repositorioPosts.consultar(postagem.id)){
            return true;
        }

        return false;
    }

    incluirPostagem(postagem: Postagem | PostagemAvancada): void {
        if (!this._repositorioPosts.consultar(postagem.id)){ 
            this._repositorioPosts.inserir(postagem);
            console.log("Postagem Adicionada!");
        } else {
            throw new PostagemExistenteError("Erro ao Adicionar, Postagem ja existente!");
        }
    }

    consultarPostagens(id: string, texto: string, hashtag: string, perfil:Perfil): (Postagem|PostagemAvancada)[] {
        return this._repositorioPosts.consultar(id, texto, hashtag, perfil);
    }
  

    consultarPostagemPorId(id:string): Postagem | PostagemAvancada | null{
        return this._repositorioPosts.consultarPorId(id);
    }

    curtir(id: string): void{
        let postProcurado = this.consultarPostagemPorId(id);
        if (postProcurado != null){
            postProcurado.curtir();
        } else {
            throw new PostagemNaoExistenteError("Postagem Não Existente!");
        }
    }

    descurtir(id: string): void{
        let postProcurado = this.consultarPostagemPorId(id);
        if (postProcurado != null){
            postProcurado.descurtir();
        } else {
            throw new PostagemNaoExistenteError("Postagem Não Existente!");
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
        let postagens = this._repositorioPosts.consultar(id);
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

    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] | null{
        let postagens = this._repositorioPosts.consultarporhastag(hashtag);
        return postagens;
    }

    postagensPopulares(): (Postagem|PostagemAvancada)[] | null{
        return this._repositorioPosts.consultarPopulares();
    }
    
    exibirHashtagsMaisPopulares(): string {
        return this._repositorioHashtag.exibirToptagPopular();
    }

    exibirCurtidasEDescurtidas(id: string): string{
        return this._repositorioPosts.exibirCurtidasEDescurtidas(id);
    }

    exibirPostagemMaisRecente(): Postagem | PostagemAvancada | null{
        return this._repositorioPosts.exibirPostagemMaisRecente();
    }

    exibirPostagemMaisCurtida(){
        return this._repositorioPosts.exibirPostagemMaisRecente();
    }

    excluirPostagem(id: string){
        return this._repositorioPosts.excluirPostagem(id);
    }

    exibirTodasPostagens(): string[]{
        return this._repositorioPosts.todosPost();
    }
    
    exibirTodosPerfis(){
        return this._repositorioPerfis.todosPerfis;
    }

    hashtagMaisPopular(){
        return this._repositorioPosts.hashtagPopular();
    }

    atualizarBanco() {
        let listaPostagens = ''
        let postagens = this._repositorioPosts.todasPostagens;
        
        for (let i = 0; i < postagens.length; i++) {
            listaPostagens = listaPostagens + postagens[i].id + ';'+ postagens[i].texto + ';' + postagens[i].qtdCurtidas + ';' + postagens[i].qtdDescurtidas + ';' + postagens[i].data + ';' + postagens[i].perfil.id +';'+postagens[i].hashtags + ';' + postagens[i].vizualizacoesRest + '\n';
        }

        
    
        
        var bdPostagens = require('fs');
        bdPostagens.writeFile('postagens.txt', listaPostagens, function (err: any) {
            if (err) throw err;
        });

        let listaPerfis = ''
        let perfis = this._repositorioPerfis.todosPerfis;
        for (let i = 0; i < perfis.length; i++) {
            listaPerfis = listaPerfis + perfis[i].id + ';'+ perfis[i].nome + ';' + perfis[i].email + ';' + perfis[i].postagens+ '\n';
        }

        var bdperfis = require('fs');
        bdperfis.writeFile('perfis.txt', listaPerfis, function (err: any) {
            if (err) throw err;
        });
    }
}

export {RedeSocial}
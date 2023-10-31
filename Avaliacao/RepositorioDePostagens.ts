class RepositorioDePostagens {
    private _postagens: Postagem[] = [];
    private _postagensAvancadas: PostagemAvancada[] = [];


    constructor(postagens: Postagem[]){
        this._postagens = postagens;
    }


    adicionar(postagem: Postagem) {
        if (this._postagens.includes(postagem)) {
            return false;
        } else {
            this._postagens.push(postagem);
            return true;
        }
    }

    consultarPostagem(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[]{
        let postagemProcurada!: Postagem;
        for (let postagem of this._postagens) {
            if (postagem.id == id || postagem.texto == texto || postagem.perfil == perfil) {
                postagemProcurada = postagem;
                break;
            }
        }
        return postagemProcurada;
    }
}
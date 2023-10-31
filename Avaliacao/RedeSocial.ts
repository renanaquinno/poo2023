class RedeSocial {
    repositorioPosts: RepositorioDePostagens;
    repositorioPerfis: RepositorioDePerfis;

    consultarPerfil(id: number, nome: string, email: string): Perfil{
        return this.repositorioPosts.consultarPerfil(id, nome, email);
    }

    consultarPostagem(id: number, nome: string, email: string): Perfil{
        return this.repositorioPosts.consultarPostagem(id, nome, email);
    }

    consultarPerfilPorId(perfil: Perfil){
        let indiceBuscado: number = -1;

        for(let i = 0; i < this.repositorioPerfis.length; i++){
            if (this.repositorioPerfis[i].id === perfil.id){
                indiceBuscado = i;
                break;
            }
        }

        return indiceBuscado;
    }

    incluirPerfil(perfil: Perfil): void {
        let indiceBuscado = this.consultarPerfilPorId(perfil);

        if(indiceBuscado === -1){
            this.repositorioPerfis.adicionar(perfil);
        }
    }

    consultarPostagemPorId(postagem: Postagem){
        let indiceBuscado: number = -1;

        for(let i = 0; i < this.repositorioPosts.length; i++){
            if (this.repositorioPosts[i].id === postagem.id){
                indiceBuscado = i;
                break;
            }
        }

        return indiceBuscado;
    }

    incluirPostagem(postagem: Postagem | PostagemAvancada): void {
        let indiceBuscado = this.consultarPostagemPorId(postagem);

        if(indiceBuscado === -1){
            this.repositorioPosts.adicionar(postagem);
        }
    }

    curtir(id: number): void{
        let indiceBuscado = this.consultarPostagemPorId(id);

        if (indiceBuscado === -1){
            this.repositorioPosts[indiceBuscado].curtir();
        }
    }

    descurtir(id: number): void{
        let indiceBuscado = this.consultarPostagemPorId(id);

        if (indiceBuscado === -1){
            this.repositorioPosts[indiceBuscado].descurtir();
        }
    }

    decrementarVisualizacoes(postagem: PostagemAvancada): void{

    }
}

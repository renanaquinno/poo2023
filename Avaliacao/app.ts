import { RedeSocial } from "./RedeSocial";
import { Perfil } from "./Perfil";
import { Postagem } from "./Postagem";
var input = require('prompt-sync')();

class App {
    private _redeSocial: RedeSocial;

    constructor (redeSocial: RedeSocial){
        this._redeSocial = redeSocial;
    }

    
    init(): void {
        let opcao: String = '';
        do {
            console.log('\nBem vindo a Rede Social de Postagens\nDigite uma opção:');
            console.log('1 - Cadastrar Perfil  2 - Pesquisar Perfil  3 - Cadastrar Postagem  4 - Consultar Postagem  \n'+
            '5 - Postagens Populares 0 - Sair\n');
            opcao = input("Opção:");
            switch (opcao) {
                case "1":
                    app.cadastrarPerfil();
                    break;
                case "2":
                    app.pesquisarPerfil();
                    break;
                case "3":
                    app.cadastrarPostagem();
                    break;
                case "4":
                    app.pesquisarPostagem();
                    break;
                case "5":
                    app.postagensPopulares();
                    break;
            }
        } while (opcao != "0");
        
        input('Loggout Realizado com Sucesso!!');
    } 

    cadastrarPerfil(): string{
        let perfil!: Perfil;
        let id: string = input('Digite o ID: ');
        let nome: string = input('Digite o Nome: ').toLocaleUpperCase();
        let email: string = input('Digite o Email: ').toLocaleUpperCase();
        let postagens:Postagem[] = [];
        perfil = new Perfil(parseFloat(id), nome, email, postagens);
        return this._redeSocial.incluirPerfil(perfil);
    }

    pesquisarPerfil(): void{
        let id: string = input('Digite o ID: ');
        let nome: string = input('Digite o Nome: ').toLocaleUpperCase();
        let email: string = input('Digite o Email: ').toLocaleUpperCase();
        this._redeSocial.consultarPerfil(parseFloat(id), nome, email);
    }

    cadastrarPostagem(): void {
        let postagem!: Postagem;
        let id: string = input('Digite o ID: ');
        let texto: string = input('Digite o Texto: ').toLocaleUpperCase();
        let qtdCurtidas: number = 0;
        let qtdDescurtidas: number = 0;
        let data = new Date();
        let id_perfil: string = input('Digite o Id do Perfil').toLocaleUpperCase();
        let perfil = this._redeSocial.consultarPerfil(parseFloat(id_perfil), null, null);
        postagem = new Postagem(parseInt(id), texto, qtdCurtidas, qtdDescurtidas, data, perfil);
        this._redeSocial.incluirPostagem(postagem);
    }

    pesquisarPostagem(){
        let id: string = input('Digite o ID: ');
        let texto: string = input('Digite o Texto: ').toLocaleUpperCase();
        let hashtag: string = input('Digite a Hashtag: ').toLocaleUpperCase();
        let id_perfil: string = input('Digite o Id do Perfil').toLocaleUpperCase();
        
        let perfil = this._redeSocial.consultarPerfil(parseFloat(id_perfil), null, null);
        this._redeSocial.consultarPostagem(parseInt(id), texto, hashtag, perfil);
    }

    postagensPopulares(){
    }

    carregarDados() {
        let LineReaderSync = require("line-reader-sync");
        let fs = require('fs');
        let postagens;
        let usuario = '';
        try {
            postagens = new LineReaderSync("./postagens_" + usuario + ".txt");
        } catch (error) {
            let conteudo = '';
            fs.writeFile("./postagens_" + usuario + ".txt", conteudo, function (err: any) {
                if (err) throw err;
            }); 
            postagens = new LineReaderSync("./postagens_" + usuario + ".txt");
        }
        
        while (true) {
            let RepositorioDePostagens: string = postagens.readline();
            if (RepositorioDePostagens != null) {
                let array: string[] = RepositorioDePostagens.split(";");
    
                let id: number = parseFloat(array[3]);
                let texto: string = array[1].toUpperCase();
                let qtdCurtidas: number = parseFloat(array[3]);
                let qtdDescurtidas: number = parseFloat(array[3]);
                let data: Date = array[4];
                let perfil: Perfil = array[5];
    
                let postagem = new Postagem(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil);
                this._redeSocial.incluirPostagem(postagem);
            } else {
                console.log('POSTAGENS CARREGADAS: ' + usuario);
                break
            }
        }
    }
}

let app = new App();
//app.carregarDados();
app.init();
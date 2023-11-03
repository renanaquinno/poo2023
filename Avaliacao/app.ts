import { RedeSocial } from "./RedeSocial";
import { Perfil } from "./Perfil";
import { Postagem } from "./Postagem";
import { RepositorioDePostagens } from "./RepositorioDePostagens";
import { exit } from "process";
var input = require('prompt-sync')();

var rs: RedeSocial = new RedeSocial();
class App {
    private _redeSocial: RedeSocial

    constructor (redeSocial: RedeSocial){
        this._redeSocial = redeSocial;
    }

    init(): void {
        this.carregarDados();
        let opcao: String = '';
        do {
            console.log('\nBem vindo a Rede Social de Postagens\nDigite uma opção:');
            console.log('1 - Cadastrar Perfil\n'+
            '2 - Pesquisar Perfil\n'+
            '3 - Cadastrar Postagem\n'+
            '4 - Consultar Postagem\n'+
            '5 - Curtir Postagem\n'+
            '6 - Descurtir Postagem\n'+
            '7 - Exibir Postagens Por Perfil\n'+
            '8 - Exibir Postagens Populares\n'+
            '0 - Sair\n');
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
                    app.curtirDescurtir('curtir');
                    break;
                case "6":
                    app.curtirDescurtir('descurtir');
                    break;
                case "7":
                    app.exibirPostagensPerfil();
                    break;
                case "8":
                    app.postagensPopulares();
                    break;
            }
        } while (opcao != "0");
        
        rs.atualizarBanco();
        input('Loggout Realizado com Sucesso!!');
    } 

    cadastrarPerfil(): string{
        let perfil!: Perfil;
        // let id: string = input('Digite o ID: ');
        // let nome: string = input('Digite o Nome: ').toLocaleUpperCase();
        // let email: string = input('Digite o Email: ').toLocaleUpperCase();
        let id = '1';
        let nome = 'renan';
        let email = 'renan@gmail.com';
        let postagens:Postagem[] = [];
        perfil = new Perfil(id, nome, email, postagens);
        return rs.incluirPerfil(perfil);
    }

    pesquisarPerfil(): void {
        // let id: string = input('Digite o ID: ');
        // let nome: string = input('Digite o Nome: ').toLocaleUpperCase();
        // let email: string = input('Digite o Email: ').toLocaleUpperCase();
        let id = '1';
        let nome = 'renan';
        let email = 'renan@gmail.com';
        let perfil = rs.consultarPerfil(id, nome, email);
        let perfilstring = 'ID: '+ perfil.id + '\nNome: '+ perfil.nome + '\nEmail: '+perfil.email;
        console.log(perfilstring);
    }

    cadastrarPostagem(): void {
        let postagem!: Postagem;
        // let id: string = input('Digite o ID: ');
        // let texto: string = input('Digite o Texto: ').toLocaleUpperCase();
        // let qtdCurtidas: number = 0;
        // let qtdDescurtidas: number = 0;
        // let data = new Date();
        // let id_perfil: string = input('Digite o Id do Perfil').toLocaleUpperCase();
       
        let id = '1';
        let texto =  'string toLocaleUpperCase()';
        let qtdCurtidas = 0;
        let qtdDescurtidas = 0;
        let data = new Date();
        let id_perfil = '1';
        let perfil = rs.consultarPerfilPorId(id_perfil);
        postagem = new Postagem(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil);
        console.log(rs.incluirPostagem(postagem));
    }

    pesquisarPostagem(){
        //let id: string = input('Digite o ID: ');
        //let texto: string = input('Digite o Texto: ').toLocaleUpperCase();
        //let hashtag: string = input('Digite a Hashtag: ').toLocaleUpperCase();
        //let id_perfil: string = input('Digite o Id do Perfil').toLocaleUpperCase();

        let id = '1';
        let texto =  'string toLocaleUpperCase()';
        let hashtag = '0';
        let id_perfil = '1';
        let perfil = rs.consultarPerfilPorId(id_perfil);
        let postagem = rs.consultarPostagem(id, texto, hashtag, perfil);
        let postagemstring = 'ID: '+ postagem.id + '\nTexto: '+ postagem.texto + '\nPerfil: '+postagem.perfil.nome;
        console.log(postagemstring);
    }

    curtirDescurtir(opcao: string){
        //let id: string = input('Informe ID da Postagem: ');
        let id = '1';
        if (opcao == 'curtir'){
            rs.curtir(id);
        } else if (opcao == 'descurtir'){
            rs.descurtir(id);
        }
    }

    exibirPostagensPerfil(){
        //let id: string = input('Informe ID do Perfil: ');
        let id = '1';
        console.log(rs.exibirPostagensPorPerfil(id));
    }

    postagensPopulares(){
        let post = rs.postagensPopulares();
        if (post.length > 0){
            console.log(rs.postagensPopulares());
        } else {
            console.log("Não Existem Postagens Populares");
        }
    }   

    carregarDados() {
        let LineReaderSync = require("line-reader-sync");
        let perfil = new LineReaderSync("./perfil.txt");
        while (true) {
            let perfil_bd: string = perfil.readline();
            if (perfil_bd != null) {
                let array: string[] = perfil_bd.split(";");
                let id: string = array[0];
                let nome: string = array[1].toUpperCase();
                let email: string = array[2].toUpperCase();
                let postagens:Postagem[] = [];
                let perfil: Perfil = new Perfil(id, nome, email, postagens);
                rs.incluirPerfil(perfil);
                console.log('Perfil Lido: ' + perfil.nome);
            } else {
                break;
            }
        }

        console.log("---- PERFIS CARREGADOS ----\n");

        let fs = require('fs');
        let postagens;
        let usuario = '';
        try {
            postagens = new LineReaderSync("./postagens.txt");
        } catch (error) {
            let conteudo = '';
            fs.writeFile("./postagens.txt", conteudo, function (err: any) {
                if (err) throw err;
            }); 
            postagens = new LineReaderSync("./postagens.txt");
        }
        
        while (true) {
            let repositorioDePostagens: string = postagens.readline();
            if (repositorioDePostagens != null) {
                let array: string[] = repositorioDePostagens.split(";");
    
                let id: string = array[0];
                let texto: string = array[1].toUpperCase();
                let qtdCurtidas: number = parseFloat(array[2]);
                let qtdDescurtidas: number = parseFloat(array[3]);
                let data: Date = array[4];
                let perfil_id = array[5];
                
                perfil = rs.consultarPerfilPorId(perfil_id);
                let postagem = new Postagem(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil);
                rs.incluirPostagem(postagem);
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Perfil_1 = require("./Perfil");
const Postagem_1 = require("./Postagem");
var input = require('prompt-sync')();
class App {
    constructor(redeSocial) {
        this._redeSocial = redeSocial;
    }
    init() {
        let opcao = '';
        do {
            console.log('\nBem vindo a Rede Social de Postagens\nDigite uma opção:');
            console.log('1 - Cadastrar Perfil  2 - Pesquisar Perfil  3 - Cadastrar Postagem  4 - Consultar Postagem  \n' +
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
    cadastrarPerfil() {
        let perfil;
        let id = input('Digite o ID: ');
        let nome = input('Digite o Nome: ').toLocaleUpperCase();
        let email = input('Digite o Email: ').toLocaleUpperCase();
        let postagens = [];
        perfil = new Perfil_1.Perfil(parseFloat(id), nome, email, postagens);
        return this._redeSocial.incluirPerfil(perfil);
    }
    pesquisarPerfil() {
        let id = input('Digite o ID: ');
        let nome = input('Digite o Nome: ').toLocaleUpperCase();
        let email = input('Digite o Email: ').toLocaleUpperCase();
        this._redeSocial.consultarPerfil(parseFloat(id), nome, email);
    }
    cadastrarPostagem() {
        let postagem;
        let id = input('Digite o ID: ');
        let texto = input('Digite o Texto: ').toLocaleUpperCase();
        let qtdCurtidas = 0;
        let qtdDescurtidas = 0;
        let data = new Date();
        let id_perfil = input('Digite o Id do Perfil').toLocaleUpperCase();
        let perfil = this._redeSocial.consultarPerfil(parseFloat(id_perfil), null, null);
        postagem = new Postagem_1.Postagem(parseInt(id), texto, qtdCurtidas, qtdDescurtidas, data, perfil);
        this._redeSocial.incluirPostagem(postagem);
    }
    pesquisarPostagem() {
        let id = input('Digite o ID: ');
        let texto = input('Digite o Texto: ').toLocaleUpperCase();
        let hashtag = input('Digite a Hashtag: ').toLocaleUpperCase();
        let id_perfil = input('Digite o Id do Perfil').toLocaleUpperCase();
        let perfil = this._redeSocial.consultarPerfil(parseFloat(id_perfil), null, null);
        this._redeSocial.consultarPostagem(parseInt(id), texto, hashtag, perfil);
    }
    postagensPopulares() {
    }
    carregarDados() {
        let LineReaderSync = require("line-reader-sync");
        let fs = require('fs');
        let postagens;
        let usuario = '';
        try {
            postagens = new LineReaderSync("./postagens_" + usuario + ".txt");
        }
        catch (error) {
            let conteudo = '';
            fs.writeFile("./postagens_" + usuario + ".txt", conteudo, function (err) {
                if (err)
                    throw err;
            });
            postagens = new LineReaderSync("./postagens_" + usuario + ".txt");
        }
        while (true) {
            let RepositorioDePostagens = postagens.readline();
            if (RepositorioDePostagens != null) {
                let array = RepositorioDePostagens.split(";");
                let id = parseFloat(array[3]);
                let texto = array[1].toUpperCase();
                let qtdCurtidas = parseFloat(array[3]);
                let qtdDescurtidas = parseFloat(array[3]);
                let data = array[4];
                let perfil = array[5];
                let postagem = new Postagem_1.Postagem(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil);
                this._redeSocial.incluirPostagem(postagem);
            }
            else {
                console.log('POSTAGENS CARREGADAS: ' + usuario);
                break;
            }
        }
    }
}
let app = new App();
//app.carregarDados();
app.init();

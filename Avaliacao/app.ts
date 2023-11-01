//import prompt from "prompt-sync";
import { RedeSocial } from "./RedeSocial";

const input = prompt();
//const clc = require('cli-color');

let redesocial: RedeSocial;
class App {
    private _redeSocial: RedeSocial;

}

let opcao: String = '';

do {
    console.log('\nBem vindo ao Rede Social\nDigite uma opção:');
    console.log('1 - Cadastrar Perfil  2 - Pesquisar Perfil  3 - Cadastrar Postagem  4 - Consultar Postagem  \n'+
    '5 - Postagens Populares 0 - Sair\n');
    opcao = input("Opção:");
    switch (opcao) {
        case "1":
            cadastrarPerfil();
            break;
        case "2":
            PesquisarPerfil();
            break;
        case "3":
            cadastrarPostagem();
            break;
        case "4":
            PesquisarPostagem();
            break;
        case "5":
            PostagensPopulares();
            break;
    }
} while (opcao != "0");

input('Loggout Realizado com Sucesso!!');


function cadastrarPerfil(){
    let perfil!: Perfil;
    let id: string = input('Digite o ID: ');
    let nome: string = input('Digite o Nome: ').toLocaleUpperCase();
    let email: string = input('Digite o email: ').toLocaleUpperCase();
    let postagens = [];
    perfil = new Perfil(parseFloat(id), nome, email, postagens);
    redesocial.incluirPerfil(perfil);
}

function PesquisarPerfil(){
    let id: string = input('Digite o ID: ');
    let nome: string = input('Digite o Nome: ').toLocaleUpperCase();
    let email: string = input('Digite o Email: ').toLocaleUpperCase();
    redesocial.consultarPerfil(parseFloat(id), nome, email);
}


function cadastrarPostagem(){
    let postagem!: Postagem;
    let id: string = input('Digite o ID: ');
    let texto: string = input('Digite o Texto: ').toLocaleUpperCase();
    let qtdCurtidas: number = 0;
    let qtdDescurtidas: number = 0;
    let data = new Date();
    let id_perfil: string = input('Digite o Id do Perfil').toLocaleUpperCase();
    let perfil = redesocial.consultarPerfil(parseFloat(id_perfil), null, null);
    postagem = new Postagem(parseInt(id), texto, qtdCurtidas, qtdDescurtidas, data, perfil);
    redesocial.incluirPostagem(postagem);
}


function PesquisarPostagem(){
    let id: string = input('Digite o ID: ');
    let texto: string = input('Digite o Texto: ').toLocaleUpperCase();
    let hashtag: string = input('Digite a Hashtag: ').toLocaleUpperCase();
    let id_perfil: string = input('Digite o Id do Perfil').toLocaleUpperCase();
    
    let perfil = redesocial.consultarPerfil(parseFloat(id_perfil), null, null);
    redesocial.consultarPostagem(parseInt(id), texto, hashtag, perfil);
}


function PostagensPopulares(){
    
}

function carregarDados(usuario: string) {
    let LineReaderSync = require("line-reader-sync");
    let fs = require('fs');
    let postagens;

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
import prompt from "prompt-sync";
import { RedeSocial } from "./RedeSocial";

const input = prompt();
const clc = require('cli-color');

class App {
    private _redeSocial: RedeSocial;

}

let opcao: String = '';

do {
    console.log('\nBem vindo ao Rede Social\nDigite uma opção:');
    console.log('1 - Cadastrar Perfil  2 - Pesquisar Perfil  3 - Cadastrar Postagem  4 - Consultar Postagem  0 - Sair\n');
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
    }
} while (opcao != "0");

input('Loggout Realizado com Sucesso!!');


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
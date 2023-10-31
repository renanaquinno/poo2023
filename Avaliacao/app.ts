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
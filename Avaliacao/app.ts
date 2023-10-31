import prompt from "prompt-sync";

const input = prompt();
const clc = require('cli-color');

var c: Corretora = new Corretora();
let usuario!: Investidor;

carregarAtivos();
carregarContas();

let opcao: String = '';
do {
    console.log('\nEntrar no Sistema \nDigite uma opção:');
    console.log('Sair\n');
    opcao = input("Opção:");
    switch (opcao) {
        case "1":
            do {
        } while (opcao != "9");
            break;
    }
    
    } while (opcao != "9");
"use strict";
exports.__esModule = true;
var input = prompt();
//const clc = require('cli-color');
var App = /** @class */ (function () {
    function App() {
    }
    return App;
}());
var opcao = '';
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
function carregarDados(usuario) {
    var LineReaderSync = require("line-reader-sync");
    var fs = require('fs');
    var postagens;
    try {
        postagens = new LineReaderSync("./postagens_" + usuario + ".txt");
    }
    catch (error) {
        var conteudo = '';
        fs.writeFile("./postagens_" + usuario + ".txt", conteudo, function (err) {
            if (err)
                throw err;
        });
        postagens = new LineReaderSync("./postagens_" + usuario + ".txt");
    }
    while (true) {
        var RepositorioDePostagens = postagens.readline();
        if (RepositorioDePostagens != null) {
            var array = RepositorioDePostagens.split(";");
            var id = parseFloat(array[3]);
            var texto = array[1].toUpperCase();
            var qtdCurtidas = parseFloat(array[3]);
            var qtdDescurtidas = parseFloat(array[3]);
            var data = array[4];
            var perfil = array[5];
            var postagem = new Postagem(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil);
            this._redeSocial.incluirPostagem(postagem);
        }
        else {
            console.log('POSTAGENS CARREGADAS: ' + usuario);
            break;
        }
    }
}

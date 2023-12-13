"use strict";
exports.__esModule = true;
var RedeSocial_1 = require("./RedeSocial");
var Perfil_1 = require("./Perfil");
var Postagem_1 = require("./Postagem");
var PostagemAvancada_1 = require("./PostagemAvancada");
var Hashtag_1 = require("./Hashtag");
var input = require('prompt-sync')();
var rs = new RedeSocial_1.RedeSocial();
var App = /** @class */ (function () {
    function App(redeSocial) {
        this._redeSocial = redeSocial;
    }
    App.prototype.init = function () {
        this.carregarDados();
        var opcao = '';
        do {
            console.log('\n---------------    MENU    ---------------\n');
            console.log('Bem vindo a Rede Social de Postagens\nDigite uma opção:');
            console.log('1 - Cadastrar Perfil\n' +
                '2 - Pesquisar Perfil\n' +
                '3 - Cadastrar Postagem\n' +
                '4 - Consultar Postagem\n' +
                '5 - Curtir Postagem\n' +
                '6 - Descurtir Postagem\n' +
                '7 - Exibir Postagens Por Perfil\n' +
                '8 - Exibir Postagens Por Hashtag\n' +
                '9 - Exibir Postagens Populares\n' +
                '10 - Exibir Todas as Postagens\n' +
                '11 - Exibir Curtidas e Descurtidas\n' +
                '12 - Exibir Postagem Mais Recente\n' +
                '13 - Exibir Postagem Mais Curtida\n' +
                '14 - Exibir Todos Perfis\n' +
                '15 - Exibir Hashtag Mais Popular\n' +
                '16 - Excluir Postagem\n' +
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
                    app.exibirPostagensPorHashtag();
                    break;
                case "9":
                    app.postagensPopulares();
                    break;
                case "10":
                    app.exibirTodasPostagens();
                    break;
                case "11":
                    app.exibirCurtidasEDescurtidas();
                    break;
                case "12":
                    app.exibirPostagemMaisRecente();
                    break;
                case "13":
                    app.exibirPostagemMaisCurtida();
                    break;
                case "14":
                    app.exibirTodosPerfis();
                    break;
                case "15":
                    app.exibirHashtagMaisPopular();
                    break;
                case "16":
                    app.excluirPostagem();
                    break;
                default:
                    console.log('Opção Invalida, Tente Novamente!');
            }
        } while (opcao != "0");
        rs.atualizarBanco();
        input('Loggout Realizado com Sucesso!!');
    };
    App.prototype.cadastrarPerfil = function () {
        console.log('----- CADASTRAR PERFIL -----\n');
        var perfil;
        var id = input('Digite o ID: ');
        var nome = input('Digite o Nome: ').toLocaleUpperCase();
        var email = input('Digite o Email: ').toLocaleUpperCase();
        var postagens = [];
        perfil = new Perfil_1.Perfil(id, nome, email, postagens);
        rs.incluirPerfil(perfil);
    };
    App.prototype.pesquisarPerfil = function () {
        console.log('----- PESQUISAR PERFIL -----\n');
        var id = input('Digite o ID: ');
        var nome = input('Digite o Nome: ').toLocaleUpperCase();
        var email = input('Digite o Email: ').toLocaleUpperCase();
        var perfil = rs.consultarPerfil(id, nome, email);
        if (perfil) {
            var perfilstring = 'ID: ' + perfil.id + '\nNome: ' + perfil.nome + '\nEmail: ' + perfil.email;
            console.log(perfilstring);
        }
        else {
            console.log('Perfil não existe!');
        }
    };
    App.prototype.cadastrarPostagem = function () {
        console.log('----- CADASTRAR POSTAGEM -----\n');
        var postagem;
        var id = input('Digite o ID: ');
        var texto = input('Digite o Texto: ').toLocaleUpperCase();
        var qtdCurtidas = 0;
        var qtdDescurtidas = 0;
        var data = new Date();
        var id_perfil = input('Digite o Id do Perfil: ').toLocaleUpperCase();
        var perfil = rs.consultarPerfilPorId(id_perfil);
        if (perfil) {
            var avancada = input('Digite 1 para Postagem Normal ou 2 Para Postagem Avançada: ');
            if (avancada == '1') {
                postagem = new Postagem_1.Postagem(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil);
                rs.incluirPostagem(postagem);
            }
            else if (avancada == '2') {
                var tag = input('Digite a Hashtag: ');
                var hashtag = new Hashtag_1.Hashtag(tag, 0);
                var visualizacoesRestantes = input('Vizualizações Restantes: ');
                var postagemAvancada = new PostagemAvancada_1.PostagemAvancada(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil, tag, visualizacoesRestantes);
                rs.incluirHashtag(hashtag);
                rs.incluirPostagem(postagemAvancada);
            }
            else {
                console.log("Opção Invalida!");
            }
        }
        else {
            console.log('Perfil não existe!');
        }
    };
    App.prototype.pesquisarPostagem = function () {
        console.log('----- PESQUISAR POSTAGEM -----\n');
        var id = input('Digite o ID: ');
        var texto = input('Digite o Texto: ').toLocaleUpperCase();
        var hashtag = input('Digite a Hashtag: ').toLocaleUpperCase();
        var id_perfil = input('Digite o Id do Perfil: ').toLocaleUpperCase();
        var perfil = rs.consultarPerfilPorId(id_perfil);
        var postagem = rs.consultarPostagens(id, texto, hashtag, perfil);
        for (var _i = 0, postagem_1 = postagem; _i < postagem_1.length; _i++) {
            var pos = postagem_1[_i];
            var postagemstring = '\n -- POSTAGEM ENCONTRADA -- \nID: ' + pos.id + '\nTexto: ' + pos.texto +
                '\nPerfil: ' + pos.perfil.nome + '\n Data Criação: ' + pos.data + '\n Curtidas: ' +
                pos.qtdCurtidas + '\n Descurtidas: ' + pos.qtdDescurtidas;
            if (pos instanceof PostagemAvancada_1.PostagemAvancada) {
                postagemstring += '\n Hashtag: ' + pos.hashtags + '\n Vizualizações Restantes: ' + pos.vizualizacoesRest;
            }
            console.log(postagemstring);
        }
    };
    App.prototype.curtirDescurtir = function (opcao) {
        var id = input('Informe ID da Postagem: ');
        if (opcao == 'curtir') {
            rs.curtir(id);
            console.log('----- POSTAGEM CURTIDA -----\n');
        }
        else if (opcao == 'descurtir') {
            rs.descurtir(id);
            console.log('----- POSTAGEM DESCURTIDA -----\n');
        }
    };
    App.prototype.exibirPostagensPerfil = function () {
        console.log('----- POSTAGEMS POR PERFIL -----\n');
        var id = input('Informe ID do Perfil: ');
        var perfil = rs.consultarPerfilPorId(id);
        if (perfil) {
            console.log(rs.exibirPostagensPorPerfil(id));
        }
        else {
            console.log('Perfil não existe!');
        }
    };
    App.prototype.postagensPopulares = function () {
        console.log('----- POSTAGEMS POPULARES -----\n');
        var post = rs.postagensPopulares();
        if (post.length > 0) {
            console.log(rs.postagensPopulares());
        }
        else {
            console.log("Não Existem Postagens Populares");
        }
    };
    App.prototype.exibirPostagensPorHashtag = function () {
        console.log('----- POSTAGEMS POR HASHTAG -----\n');
        var hashtag = input('Informe a Hashtag: ');
        console.log(rs.exibirPostagensPorHashtag(hashtag));
    };
    App.prototype.exibirHashtagMaisPopular = function () {
        console.log('----- HASHTAG MAIS POPULAR -----\n');
        console.log(rs.hashtagMaisPopular());
    };
    App.prototype.exibirCurtidasEDescurtidas = function () {
        console.log('----- CURTIDAS E DESCURTIDAS -----\n');
        var id = input('Informe ID da Postagem: ');
        console.log(rs.exibirCurtidasEDescurtidas(id));
    };
    App.prototype.exibirPostagemMaisRecente = function () {
        console.log('----- POSTAGEM MAIS RECENTE -----\n');
        console.log(rs.exibirPostagemMaisRecente());
    };
    App.prototype.exibirPostagemMaisCurtida = function () {
        console.log('----- POSTAGEM MAIS CURTIDA -----\n');
        console.log(rs.exibirPostagemMaisCurtida());
    };
    App.prototype.excluirPostagem = function () {
        console.log('----- EXCLUIR POSTAGEM -----\n');
        var id = input('Informe ID da Postagem: ');
        console.log(rs.excluirPostagem(id));
    };
    App.prototype.exibirTodasPostagens = function () {
        console.log('----- EXIBIR TODAS AS POSTAGENS -----');
        console.log(rs.exibirTodasPostagens());
    };
    App.prototype.exibirTodosPerfis = function () {
        console.log('----- EXIBIR TODOS PERFIS -----');
        console.log(rs.exibirTodosPerfis());
    };
    App.prototype.carregarDados = function () {
        var LineReaderSync = require("line-reader-sync");
        var perfil = new LineReaderSync("./perfis.txt");
        while (true) {
            var perfil_bd = perfil.readline();
            if (perfil_bd != null) {
                var array = perfil_bd.split(";");
                var id = array[0];
                var nome = array[1].toUpperCase();
                var email = array[2].toUpperCase();
                var postagens_1 = [];
                var perfil_1 = new Perfil_1.Perfil(id, nome, email, postagens_1);
                rs.incluirPerfil(perfil_1);
                console.log('Perfil Lido: ' + perfil_1.nome);
            }
            else {
                break;
            }
        }
        console.log("---- PERFIS CARREGADOS ----\n");
        var fs = require('fs');
        var postagens;
        var usuario = '';
        try {
            postagens = new LineReaderSync("./postagens.txt");
        }
        catch (error) {
            var conteudo = '';
            fs.writeFile("./postagens.txt", conteudo, function (err) {
                if (err)
                    throw err;
            });
            postagens = new LineReaderSync("./postagens.txt");
        }
        while (true) {
            var repositorioDePostagens = postagens.readline();
            if (repositorioDePostagens != null) {
                var array = repositorioDePostagens.split(";");
                var id = array[0];
                var texto = array[1].toUpperCase();
                var qtdCurtidas = parseFloat(array[2]);
                var qtdDescurtidas = parseFloat(array[3]);
                var data = array[4];
                var perfil_id = array[5];
                perfil = rs.consultarPerfilPorId(perfil_id);
                if (array[6] != undefined) {
                    var hashtag = array[6];
                    var vizrest = parseInt(array[7]);
                    var postagem = new PostagemAvancada_1.PostagemAvancada(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil, hashtag, vizrest);
                    rs.incluirPostagem(postagem);
                }
                else {
                    var postagem = new Postagem_1.Postagem(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil);
                    rs.incluirPostagem(postagem);
                }
            }
            else {
                console.log('POSTAGENS CARREGADAS: ' + usuario);
                break;
            }
        }
    };
    return App;
}());
var app = new App();
app.init();

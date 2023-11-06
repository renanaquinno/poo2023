import { RedeSocial } from "./RedeSocial";
import { Perfil } from "./Perfil";
import { Postagem } from "./Postagem";
import { PostagemAvancada } from "./PostagemAvancada";
import { Hashtag } from "./Hashtag";

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
            console.log('\n-------------------------------------');
            console.log('\nBem vindo a Rede Social de Postagens\nDigite uma opção:');
            console.log('1 - Cadastrar Perfil\n'+
            '2 - Pesquisar Perfil\n'+
            '3 - Cadastrar Postagem\n'+
            '4 - Consultar Postagem\n'+
            '5 - Curtir Postagem\n'+
            '6 - Descurtir Postagem\n'+
            '7 - Exibir Postagens Por Perfil\n'+
            '8 - Exibir Postagens Por Hashtag\n'+
            '9 - Exibir Postagens Populares\n'+
            '10 - Exibir Hashtag Popular\n'+
            '11 - Exibir Curtidas e Descurtidas\n'+
            '12 - Exibir Postagem Mais Recente\n'+
            '13 - Exibir Postagem Mais Curtida\n'+
            '14 - Excluir Postagem\n'+
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
                    app.exibirHashtagsMaisPopulares();
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
                    app.excluirPostagem();
                    break;
            }
        } while (opcao != "0");
        
        rs.atualizarBanco();
        input('Loggout Realizado com Sucesso!!');
    } 

    cadastrarPerfil(): void{
        console.log('----- CADASTRAR PERFIL -----\n')
        let perfil!: Perfil;
        let id: string = input('Digite o ID: ');
        let nome: string = input('Digite o Nome: ').toLocaleUpperCase();
        let email: string = input('Digite o Email: ').toLocaleUpperCase();
        let postagens:Postagem[] = [];
        perfil = new Perfil(id, nome, email, postagens);
        rs.incluirPerfil(perfil);
    }

    pesquisarPerfil(): void {
        console.log('----- PESQUISAR PERFIL -----\n')
        let id: string = input('Digite o ID: ');
        let nome: string = input('Digite o Nome: ').toLocaleUpperCase();
        let email: string = input('Digite o Email: ').toLocaleUpperCase();
        let perfil = rs.consultarPerfil(id, nome, email);
        if (perfil){          
            let perfilstring = 'ID: '+ perfil.id + '\nNome: '+ perfil.nome + '\nEmail: '+perfil.email;
            console.log(perfilstring);
        } else {
            console.log('Perfil não existe!');
        }
  
    }

    cadastrarPostagem(): void {
        console.log('----- CADASTRAR POSTAGEM -----\n')
        let postagem!: Postagem | PostagemAvancada;
        let id: string = input('Digite o ID: ');
        let texto: string = input('Digite o Texto: ').toLocaleUpperCase();
        let qtdCurtidas: number = 0;
        let qtdDescurtidas: number = 0;
        let data = new Date();
        let id_perfil: string = input('Digite o Id do Perfil: ').toLocaleUpperCase();
        let perfil = rs.consultarPerfilPorId(id_perfil);
        if (perfil){
            let avancada: string = input('Digite 1 para Postagem Normal ou 2 Para Postagem Avançada: ');
            if (avancada == '1'){
                postagem = new Postagem(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil);    
                rs.incluirPostagem(postagem);
    
            } else if (avancada == '2'){
                let tag : string = input('Digite a Hashtag: ');
                let hashtag = new Hashtag(tag, 0);
                let visualizacoesRestantes: number = input('Vizualizações Restantes: ');                
                let postagemAvancada = new PostagemAvancada(id, texto, qtdCurtidas, qtdDescurtidas, data, perfil, tag, visualizacoesRestantes);        
                rs.incluirHashtag(hashtag);
                rs.incluirPostagem(postagemAvancada);

            } else {
                console.log("Opção Invalida!");
            }
        } else {
            console.log('Perfil não existe!');
        }
    }

    pesquisarPostagem(){
        console.log('----- PESQUISAR POSTAGEM -----\n')
        let id: string = input('Digite o ID: ');
        let texto: string = input('Digite o Texto: ').toLocaleUpperCase();
        let hashtag: string = input('Digite a Hashtag: ').toLocaleUpperCase();
        let id_perfil: string = input('Digite o Id do Perfil: ').toLocaleUpperCase();
        let perfil = rs.consultarPerfilPorId(id_perfil);
        let postagem = rs.consultarPostagens(id, texto, hashtag, perfil);        

        for (let pos of postagem){
            let postagemstring = '\n -- POSTAGEM ENCONTRADA -- \nID: '+ pos.id + '\nTexto: '+ pos.texto + 
            '\nPerfil: '+pos.perfil.nome + '\n Data Criação: ' + pos.data +  '\n Curtidas: ' + 
            pos.qtdCurtidas +  '\n Descurtidas: ' + pos.qtdDescurtidas;

            if (pos instanceof PostagemAvancada){
                postagemstring += '\n Hashtag: ' + pos.hashtags;
            }
            console.log(postagemstring);
        }
    }

    curtirDescurtir(opcao: string){
        let id: string = input('Informe ID da Postagem: ');
        if (opcao == 'curtir'){
            rs.curtir(id);
            console.log('----- POSTAGEM CURTIDA -----\n')
        } else if (opcao == 'descurtir'){
            rs.descurtir(id);
            console.log('----- POSTAGEM DESCURTIDA -----\n')
        }
    }

    exibirPostagensPerfil(){
        console.log('----- POSTAGEMS POR PERFIL -----\n')
        let id: string = input('Informe ID do Perfil: ');
        let perfil = rs.consultarPerfilPorId(id);
        if (perfil){
            console.log(rs.exibirPostagensPorPerfil(id));
        } else {
            console.log('Perfil não existe!');
        }
    }

    postagensPopulares(){
        console.log('----- POSTAGEMS POPULARES -----\n')
        let post = rs.postagensPopulares();
        if (post.length > 0){
            console.log(rs.postagensPopulares());
        } else {
            console.log("Não Existem Postagens Populares");
        }
    }   

    exibirPostagensPorHashtag(){
        console.log('----- POSTAGEMS POR HASHTAG -----\n')
         let hashtag: string = input('Informe a Hashtag: ');
         console.log(rs.exibirPostagensPorHashtag(hashtag));
    }

    exibirHashtagsMaisPopulares(){
        console.log('----- HASHTAGS MAIS POPULARES -----\n')
        console.log(rs.exibirHashtagsMaisPopulares());
    }

    exibirCurtidasEDescurtidas(){
        console.log('----- CURTIDAS E DESCURTIDAS -----\n')
        let id: string = input('Informe ID da Postagem: ');
        console.log(rs.exibirCurtidasEDescurtidas(id));
    }

    exibirPostagemMaisRecente(){
        console.log('----- POSTAGEM MAIS RECENTE -----\n')
        console.log(rs.exibirPostagemMaisRecente());
    }
   
    exibirPostagemMaisCurtida(){
        console.log('----- POSTAGEM MAIS CURTIDA -----\n')
        console.log(rs.exibirPostagemMaisCurtida());
    }

    excluirPostagem(){
       console.log('----- EXCLUIR POSTAGEM -----\n')
       let id: string = input('Informe ID da Postagem: ');
        console.log(rs.excluirPostagem(id));
    }


    carregarDados() {
        let LineReaderSync = require("line-reader-sync");
        let perfil = new LineReaderSync("./perfis.txt");
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
app.init();
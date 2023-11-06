import { Perfil } from "./Perfil";


class RepositorioDePerfis {
    private _perfis: Perfil[] = [];

    constructor(_perfis: Perfil[]){
        this._perfis = [] ;
    }

    get todosPerfis (){
        return this._perfis;
    }

    adicionar(perfil: Perfil) {
        if (this._perfis.includes(perfil)) {
            return false;
        } else {
            this._perfis.push(perfil);
            return true;
        }
    }

    consultarPerfil(id?: string, nome?: string, email?: string): Perfil {
        let perfilProcurado!: Perfil;
        for (let i = 0; i < this._perfis.length; i++) {
            if (this._perfis[i].id == id || this._perfis[i].nome == nome || this._perfis[i].email == email) {
                perfilProcurado = this._perfis[i];
                break;
            }            
        }

        return perfilProcurado;
    }

    get lengthPerfis(): number{
        return this._perfis.length;
    }

}

export {RepositorioDePerfis}
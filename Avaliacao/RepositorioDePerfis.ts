import { AplicacaoError, PerfilExistenteError } from "./Error";
import { IRepositorioDePerfis, Perfil } from "./Perfil";


class RepositorioDePerfis implements IRepositorioDePerfis {
    private _perfis: Perfil[] = [];

    constructor(_perfis: Perfil[]) {
        this._perfis = [];
    }

    get todosPerfis() {
        return this._perfis;
    }

    inserir(perfil: Perfil): void {
        try {
            if (this._perfis.includes(perfil)) {
                throw new PerfilExistenteError("Erro ao Adicionar, Perfil ja existente!");
            } else {
                this._perfis.push(perfil);
            }
        } catch (e: any) {
            if (e instanceof AplicacaoError) {
                console.log(e.name);
                console.log(e.message);
            }
        }
    }

    consultar(id?: string, nome?: string, email?: string): Perfil {
        let perfilProcurado!: Perfil;
        for (let i = 0; i < this._perfis.length; i++) {
            if (this._perfis[i].id == id || this._perfis[i].nome == nome || this._perfis[i].email == email) {
                perfilProcurado = this._perfis[i];
                break;
            }
        }
        return perfilProcurado;
    }

    get lengthPerfis(): number {
        return this._perfis.length;
    }

}

export { RepositorioDePerfis }
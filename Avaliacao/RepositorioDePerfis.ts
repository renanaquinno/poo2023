class RepositorioDePerfis {
    private _perfis: Perfil[] = [];

    constructor(perfis: Perfil[]){
        this._perfis = perfis;
    }

    adicionar(perfil: Perfil) {
        if (this._perfis.includes(perfil)) {
            return false;
        } else {
            this._perfis.push(perfil);
            return true;
        }
    }

    consultarPerfil(id?: number, nome?: string, email?: string): Perfil {
        let perfilProcurado!: Perfil;
        for (let perfil of this._perfis) {
            if (perfil.id == id || perfil.nome == nome || perfil.email == email) {
                perfilProcurado = perfil;
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
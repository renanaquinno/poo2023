class Pessoa {
    nome: string;
    constructor(nome: string) {
        this.nome = nome;
    }
}

class Conta {
    private _numero: string;
    private _saldo: number;
    cliente: Pessoa;

    constructor(numero: string, saldo: number, cliente: Pessoa) {
        this._numero = numero;
        this._saldo = saldo;
        this.cliente = cliente;
    }

    public sacar(valor: number): boolean {
        if ((this._saldo - valor) < 0) {
            return false;
        } else {
            this._saldo = this.saldo - valor;
            return true;
        }
    }

    public depositar(valor: number): void {
        this._saldo = this.saldo + valor;
    }

    public get saldo(): number {
        return this._saldo;
    }

    get nomeCliente() {
        return this.cliente.nome;
    }

    public transferir(contaDestino: Conta, valor: number): boolean {
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true;
        } else {
            return false;
        }
    }

    equals(conta: Conta): boolean {
        return (this._numero == conta._numero &&
            this.cliente.nome == conta.cliente.nome);
    }
}

class Poupanca extends Conta {
    private _taxaJuros : number;
   
    constructor(numero: string, saldo: number, cliente: Pessoa,taxaJuros: number) {
        super(numero, saldo, cliente);
        this._taxaJuros = taxaJuros;
    }

    renderJuros(): number{
        return (this._taxaJuros * this.saldo)/100;
    }
}

class ContaImposto extends Conta {
    private _taxaDeDesconto: number;

    constructor(numero: string, saldo: number, cliente: Pessoa, taxaDeDesconto: number) {
        super(numero, saldo, cliente);
        this._taxaDeDesconto = taxaDeDesconto;
    }
    
    sacar(valor: number) {
       let valorTotal = valor + valor*this._taxaDeDesconto/100;
       super.sacar(valorTotal);
    }
}



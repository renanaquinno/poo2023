class Calculadora {
    private _operando: number;
    private _operando_2: number;

    constructor(operando: number,operando_2: number) {
        this._operando = operando;
        this._operando_2 = operando_2;
    }

    somar() : number {
       return this._operando + this._operando_2;
    }
}


const c1 = new Calculadora(1,2);
console.log(c1.somar());
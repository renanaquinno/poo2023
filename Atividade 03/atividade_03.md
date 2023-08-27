# <center>Atividade 03 - Arrays, estruturas de decisão e de repetição, operadores e funções </center> 

**1. Crie uma função que recebe como parâmetro um número e retorna true se o número for  par e false se for ímpar.** 
``` ts
function parOuImpar(num: number) {
    if (num%2 == 0){
        return true;
    } else {
        return false; 
    }
}

console.log(parOuImpar(4));
```

**2. Crie uma função que recebe como parâmetro um número e retorna true se o número for  primo e false caso contrário.**
``` ts
function primoOuNao(num: number) {
    for (let divisor = 2; divisor < num; divisor++){
        if (num % divisor == 0) return false;
    } 
    return true;
}

console.log(primoOuNao(9));
```

**3. Crie uma função que receba como parâmetros um nome e um pronome de tratamento opcional. Caso esse último não seja fornecido, deve ser considerado o valor “Sr”. Ao final,  imprima uma saudação semelhante a “Sra. Sávia”.**
``` ts
function SrOuSra(nome: string, pronome: string = "Sr"): string {
    return pronome + ". " + nome
}
console.log(SrOuSra('Renan','Mr'));
```

**4. Crie uma função que retorne os números de um array passados por parâmetro separados  por traço (-) no formato string. Para isso, use o método forEach dos arrays.**
``` ts
function numArray(arr: string): void {
    let new_arr : number[] = arr.split("-");
    new_arr.forEach(function (value) {
        console.log(value);
    });

}

console.log(numArray('1-2-4-5-4-7'));
```

**5. Dada a função soma abaixo, tente executar os scripts das alternativas e exiba os eventuais resultados:**
``` ts
function soma(x: number, y?: any): number { 
    return x + y 
} 
console.log(soma(1, 2));    // 3
console.log(soma(1, "2"));  // 12
console.log(soma(1));       // NaN
```

**6. Crie uma função exibir receba como parâmetro um “rest parameter” representando strings. A função deve exibir no log cada um dos elementos do “rest parameter”. Chame a função  usando diferentes quantidade de parâmetros conforme abaixo:**
``` ts
function exibir(...letras : string[]) {
    for (let letra of letras){
        console.log(letra)
    }
}

exibir("a", "b"); 
exibir("a", "b", "c"); 
exibir("a", "b", "c", "d"); 
```

**7. Converta em arrow function a seguinte função:**
``` ts
const ola = () => console.log('Ola');
```

**8. Dado método filter dos arrays, crie uma implementação usando arrow function que filtre  todos os elementos pares do array abaixo:**
``` ts
function parArray(element) {
    return (element % 2 == 0);
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].filter(parArray)
console.log("Elementos Pares do Array : " + array );
```


**9. Crie um exemplo usando a função map para dobrar os elementos de um array e reduce para totalizar a soma dos elementos do array.**

``` ts
let array = [1, 2, 3, 4, 5]; 

let dobro = array.map(function(item){
   return item*2; 
});

console.log(dobro); 

let soma = array.reduce(function(soma, numero){
    return soma + numero;
}, 0);
console.log(soma);

```


**10. Resolva o problema abaixo usando Map/Reduce e Objetos JavaScript com a sintaxe TypeScript.**

``` ts
let menor_valor = 0;
let maior_valor = 0;
let media_valor = 0;

let dados = [1,2,3,4,5,6,7,8,9,10];

let sensor = dados.map(function(item){
   if (menor_valor > item){
    menor_valor = item;
   }

   if (maior_valor < item){
    maior_valor = item
   }

});


let med = dados.reduce(function(media_valor, numero){
    return (media_valor + numero)/2;
}, 0);

console.log(menor_valor)
console.log(maior_valor)
console.log(media_valor)

```
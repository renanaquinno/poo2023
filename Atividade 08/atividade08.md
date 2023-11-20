## 1) Identifique pelo menos 3 “erros” que acontecem quando você está programando com TypeScript que levam à parada brusca da execução de código.
### Erro de tipo, erro de instância e erro de referencia.

## 2) O que é uma exceção em programação e como ela se diferencia de um erro comum?
### Exceções são situações inválidas que ocorrem durante o processamento e impedem que o programa continue seu fluxo normal até que a situação seja de algum modo resolvida, diferencia de um erro comum pois não para bruscamente o código.

## 3) Como o TypeScript implementa o tratamento de exceções?
### sintaxe do try catch 

## 4) Qual é a função do bloco try-catch no tratamento de exceções em TypeScript?
### O try onde o código é executado e o catch, onde você recebe via parâmetro na função, um objeto do tipo Error. Com este objeto você pode aplicar o tratamento que for adequado. 

## 5) Como você pode criar exceções personalizadas em TypeScript?
###  Extendendo do objeto global Error, e no construtor passar a mensagem customizada, criar uma nova instância deste erro e chamar com o operador Throw.


## 6) Quais são os tipos comuns de exceções que podem ser encontradas em aplicações TypeScript?
## ReferenceError, TypeError, SyntaxError, RangeError

## 7) Qual é o papel do bloco finally no tratamento de exceções em TypeScript?
### Este bloco será executado independente se houver ou não falha, ou seja, depois que o try ou catch executar, este bloco será acionado. Isto pode ser útil por exemplo, para fechar um arquivo que foi aberto para leitura, registrar algum log ou fechar alguma conexão.


## 8) Como o tratamento de exceções em TypeScript ajuda a melhorar a robustez e a segurança de uma aplicação?
### Impedindo que funções sejam executadas se nao tiver sido autenticado, não parando a execução do código e evitando perca de dados;

## 9) Existem diferenças significativas no tratamento de exceções entre TypeScript e JavaScript?
### Não

## 10) Como você pode testar e depurar eficientemente exceções em TypeScript?
### Testa backend e node.
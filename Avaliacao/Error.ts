class AplicacaoError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}

class PerfilExistenteError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}

class PostagemExistenteError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}

class PostagemNaoExistenteError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}



export {AplicacaoError, PerfilExistenteError, PostagemExistenteError, PostagemNaoExistenteError};
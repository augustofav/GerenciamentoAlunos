class Entidades {
    nome: string
    email: string
    telefone: string
    constructor(nome: string, email: string, telefone: string) {
        this.nome = nome
        this.email = email
        this.telefone = telefone
    }
}

class Aluno extends Entidades {
    nota?: number

    constructor(nome: string, email: string, telefone: string) {
        super(nome, email, telefone)
    }

    visualizarNota() {
        if (this.nota !== undefined) {
            console.log(`a nota do aluno ${this.nome} e: ${this.nota}`)
        } else {
            console.log(`o aluno ${this.nome} ainda nao possui uma nota`)
        }
    }
}

class Pedagogo extends Entidades {
    alunos: Aluno[] = []
    cps: number[] = []

    constructor(nome: string, email: string, telefone: string) {
        super(nome, email, telefone)
    }

    fazercadastroaluno(nome: string, mail: string, telefone: string) {
        let novoAluno = new Aluno(nome, mail, telefone)
        this.alunos.push(novoAluno)
        console.log("aluno cadastrado com sucesso")
        console.log(novoAluno)
    }

    atualizardados(nome: string, email: string, telefone: string) {
        let aluno = this.alunos.find(aluno => aluno.nome === nome)
        if (aluno) {
            if (email && email !== aluno.email) aluno.email = email
            if (telefone && telefone !== aluno.telefone) aluno.telefone = telefone
            console.log("dados do aluno atualizados")
            console.log(aluno)
        } else {
            console.log("aluno nao encontrado")
        }
    }

    gerarCP(): number {
        let cp = Math.floor(Math.random() * 10000)
        this.cps.push(cp)
        console.log(`codigo CP gerado: ${cp}`)
        return cp
    }

    validarCP(cp: number): boolean {
        return this.cps.includes(cp)
    }
}

class Professor extends Entidades {
    alunos: Aluno[] = []
    cp: number

    constructor(nome: string, email: string, telefone: string, cp: number, pedagogo: Pedagogo) {
        super(nome, email, telefone)
        if (pedagogo.validarCP(cp)) {
            this.cp = cp
            console.log(`professor criado ${cp}`)
        } else {
            throw new Error("CP invalido")
        }
    }

    lancarnota(nota: number, aluno: Aluno) {
        aluno.nota = nota
        console.log(`nota ${nota} lancada para o aluno ${aluno.nome}`)
    }

    atualizarnota(novanota: number, aluno: Aluno) {
        aluno.nota = novanota
        console.log(`nota do aluno ${aluno.nome} atualizada para ${novanota}`)
    }
}

class ResponsavelAluno extends Entidades {
    filho: Aluno

    constructor(nome: string, email: string, telefone: string, filho: Aluno) {
        super(nome, email, telefone)
        this.filho = filho
    }

    visualizarNotasFilho() {
        console.log(`nota do seu filho ${this.filho.nome} e ${this.filho.nota}`)
    }
}
let pedagogo = new Pedagogo("Samara", "samara@email.com", "123456789")
pedagogo.fazercadastroaluno("Augusto", "augusto@email.com", "123456789")
pedagogo.fazercadastroaluno("Maria", "maria@email.com", "987654321")

let cp1 = pedagogo.gerarCP()
let professor = new Professor("Ricardo", "ricardo@email.com", "112233445", cp1, pedagogo)
let aluno1 = pedagogo.alunos[0]
professor.lancarnota(8.5, aluno1)
aluno1.visualizarNota()

let pai1 = new ResponsavelAluno("Joao", "joao@email.com", "556677889", aluno1)
pai1.visualizarNotasFilho()

pedagogo.atualizardados("Augusto", "novoemail@email.com", "112233445")
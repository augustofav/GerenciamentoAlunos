class Aluno {
    nome: string
    email: string
    telefone: number
    nota?: number

    constructor(nome: string, email: string, telefone: number) {
        this.nome = nome
        this.email = email
        this.telefone = telefone
    }
}

class Pedagogo {
    alunos: Aluno[] = []
    cps: number[] = []

    fazercadastroaluno(nome: string, mail: string, telefone: number) {
        let novoAluno = new Aluno(nome, mail, telefone)
        this.alunos.push(novoAluno)
        console.log("Aluno cadastrado com sucesso:")
        console.log(novoAluno)
    }

    gerarCP(): number {
        let cp = Math.floor(Math.random() * 10000)
        this.cps.push(cp)
        console.log(`Código CP gerado: ${cp}`)
        return cp
    }

    validarCP(cp: number): boolean {
        return this.cps.includes(cp)
    }
}

class Professor {
    alunos: Aluno[] = []
    cp: number

    constructor(cp: number) {
        if (pedagogo.validarCP(cp)) {
            this.cp = cp
            console.log(`Professor criado com CP válido: ${cp}`)
        } else {
            throw new Error("cp inválido")
        }
    }

    lancarnota(nota: number, aluno: Aluno) {
        aluno.nota = nota
        console.log(`Nota ${nota} lançada para o aluno ${aluno.nome}`)
    }
}

let pedagogo = new Pedagogo()
pedagogo.fazercadastroaluno("joao Silva", "joao@email.com", 123456789)
pedagogo.fazercadastroaluno("maria oliveira", "maria@email.com", 987654321)

let cp1 = pedagogo.gerarCP()
let professor = new Professor(cp1)
let aluno1 = pedagogo.alunos[0]
professor.lancarnota(8.5, aluno1)

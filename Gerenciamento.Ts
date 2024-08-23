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

class Cursos {
    nome: string
    materia: string
    alunos: Aluno[] = []

    constructor(nome: string, materia: string) {
        this.nome = nome
        this.materia = materia
    }
}

class Aluno extends Entidades {
    nota?: number
    codigomatriculas: number[] = []
    senha: number
    cursos: Cursos[] = []

    constructor(nome: string, email: string, telefone: string, senha: number) {
        super(nome, email, telefone)
        if (pedagogo.validarsenha(senha)) {
            this.senha = senha
        } else {
            throw new Error("Senha inválida")
        }
    }

    visualizarNota() {
        if (this.nota !== undefined) {
            console.log(`A nota do aluno ${this.nome} é: ${this.nota}`)
        } else {
            console.log(`O aluno ${this.nome} não possui uma nota`)
        }
    }

    visualizarCodigoMatricula() {
        console.log(this.codigomatriculas)
    }

    verMateriasMatriculado() {
        if (this.cursos.length > 0) {
            console.log(`O aluno ${this.nome} está matriculado em: ${this.cursos.map(curso => curso.nome).join(', ')}`)
        } else {
            throw new Error("O aluno não está matriculado em nenhum curso")
        }
    }

    matricularEmCurso(curso: Cursos) {
        if (!this.cursos.includes(curso)) {
            this.cursos.push(curso)
            curso.alunos.push(this)
            console.log(`Aluno ${this.nome} matriculado no curso ${curso.nome}`)
        } else {
            console.log(`Aluno ${this.nome} já está matriculado no curso ${curso.nome}`)
        }
    }

   
}

class Pedagogo extends Entidades {
    alunos: Aluno[] = []
    cps: number[] = []
    codigomatriculas: number[] = []
    cursos: Cursos[] = []
    senhas: number[] = []

    constructor(nome: string, email: string, telefone: string) {
        super(nome, email, telefone)
    }

    criarCurso(nome: string, materia: string) {
        let novoCurso = new Cursos(nome, materia)
        this.cursos.push(novoCurso)
        console.log("Curso criado")
        console.log(novoCurso)
    }

    addAlunoEmCurso(aluno: Aluno, nomeCurso: string) {
        let curso = this.cursos.find(curso => curso.nome === nomeCurso)
        if (curso) {
            aluno.matricularEmCurso(curso)
        } else {
            console.log(`Curso ${nomeCurso} não encontrado`)
        }
    }

    fazerCadastroAluno(nome: string, mail: string, telefone: string, senhaAluno: number) {
        if (this.validarsenha(senhaAluno)) {
            let novoAluno = new Aluno(nome, mail, telefone, senhaAluno)
            this.alunos.push(novoAluno)
            let codigoMatricula = Math.floor(Math.random() * 10000)
            novoAluno.codigomatriculas.push(codigoMatricula)
            this.codigomatriculas.push(codigoMatricula)
            console.log("Aluno cadastrado com sucesso")
            console.log(novoAluno)
        } else {
            console.log("Senha inválida")
        }
    }

    atualizarDadosAluno(nome: string, email: string, telefone: string) {
        let aluno = this.alunos.find(aluno => aluno.nome === nome)
        if (aluno) {
            if (email !== aluno.email) aluno.email = email
            if (telefone !== aluno.telefone) aluno.telefone = telefone
            console.log("Dados do aluno atualizados")
            console.log(aluno)
        } else {
            console.log("Aluno não encontrado")
        }
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

    gerarsenha(): number {
        let senha = Math.floor(Math.random() * 10000)
        this.senhas.push(senha)
        console.log("Senha gerada")
        return senha
    }

    validarsenha(senha: number): boolean {
        return this.senhas.includes(senha)
    }
}

class Professor extends Entidades {
    alunos: Aluno[] = []
    cp: number

    constructor(nome: string, email: string, telefone: string, cp: number, pedagogo: Pedagogo) {
        super(nome, email, telefone)
        if (pedagogo.validarCP(cp)) {
            this.cp = cp
            console.log(`Professor criado com CP ${cp}`)
        } else {
            throw new Error("CP inválido")
        }
    }

    lancarNota(nota: number, aluno: Aluno) {
        aluno.nota = nota
        console.log(`Nota ${nota} lançada para o aluno ${aluno.nome}`)
    }

    atualizarNota(novaNota: number, aluno: Aluno) {
        aluno.nota = novaNota
        console.log(`Nota do aluno ${aluno.nome} atualizada para ${novaNota}`)
    }
}

class ResponsavelAluno extends Entidades {
    filho: Aluno

    constructor(nome: string, email: string, telefone: string, filho: Aluno) {
        super(nome, email, telefone)
        this.filho = filho
    }

    visualizarNotasFilho() {
        console.log(`Nota do seu filho ${this.filho.nome} é ${this.filho.nota}`)
    }
}


let pedagogo = new Pedagogo("Samara", "samara@email.com", "123456789")
let senha1 = pedagogo.gerarsenha()
let senha2 = pedagogo.gerarsenha()
pedagogo.fazerCadastroAluno("Augusto", "augusto@email.com", "123456789", senha1)
pedagogo.fazerCadastroAluno("Maria", "maria@email.com", "987654321", senha2)

let curso1 = new Cursos("ADS", "Programação Orientada a Objetos")
pedagogo.criarCurso(curso1.nome, curso1.materia)

pedagogo.addAlunoEmCurso(pedagogo.alunos[0], curso1.nome)

let cp1 = pedagogo.gerarCP()
let professor = new Professor("Ricardo", "ricardo@email.com", "112233445", cp1, pedagogo)
let aluno1 = pedagogo.alunos[0]
professor.lancarNota(8.5, aluno1)
aluno1.visualizarNota()
aluno1.verMateriasMatriculado()

let pai1 = new ResponsavelAluno("João", "joao@email.com", "556677889", aluno1)
pai1.visualizarNotasFilho()

pedagogo.atualizarDadosAluno("Augusto", "novoemail@email.com", "112233445")
let opcao = prompt("1 para login pedagogo, 2 para professor, 3 para aluno")

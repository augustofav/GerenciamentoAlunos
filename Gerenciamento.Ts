class Entidades {
    nome: string
    email: string
    telefone: number
    constructor(nome: string, email: string, telefone: number) {
        this.nome = nome
        this.email = email
        this.telefone = telefone
       
    }
}
class Cursos{
    nome: string
    materia: string
    alunos: Aluno[] = []
    constructor(nome: string, materia: string,){
        this.nome = nome
        this.materia  = materia      
    }
}


class Aluno extends Entidades {
    nota?: number
    codigomatriculas: number[] = []
    constructor(nome: string, email: string, telefone: number) {
        super(nome, email, telefone)
    }


    visualizarNota() {
        if (this.nota !== null) {
            console.log(`a nota do aluno ${this.nome} e: ${this.nota}`)
        } else {
            console.log(`o aluno ${this.nome} nao possui uma nota`)
        }
    }
    vizualiarcodigomatricula(aluno: Aluno){
       console.log(aluno.codigomatriculas)
    }


}


class Pedagogo extends Entidades {
    alunos: Aluno[] = []
    cps: number[] = []
    codigomatriculas: number[] = []
    curso: Cursos[] = []
   


    constructor(nome: string, email: string, telefone: number) {
        super(nome, email, telefone)
    }
    criarcurso(nome: string, materia : string){
        let novocurso = new Cursos(nome, materia)
        this.curso.push(novocurso)
        console.log("curso criado")
        console.log(novocurso)
    }

     addalunoemcurso(aluno: Aluno, nomeCurso: string) {      
     let curso = this.curso.find(curso => curso.nome === nomeCurso);
         if (curso) {      
                curso.alunos.push(aluno);
                console.log(`Aluno ${aluno.nome} adicionado ao curso ${curso.nome}`);
            } else {
                console.log(`Curso ${nomeCurso} não encontrado`);
            }
    }



    fazercadastroaluno(nome: string, mail: string, telefone: number) {
        let novoAluno = new Aluno(nome, mail, telefone)
        this.alunos.push(novoAluno)
        let codigomatricula = Math.floor(Math.random() * 10000)
        this.codigomatriculas.push(codigomatricula)
        console.log("aluno cadastrado com sucesso")
        console.log(novoAluno)
       
    }


    atualizarDadosAluno(nome: string, email: string, telefone: number) {
        let aluno = this.alunos.find(aluno => aluno.nome === nome)
        if (aluno) {
            if (email !== aluno.email) aluno.email = email
            if (telefone !== aluno.telefone) aluno.telefone = telefone
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
    nota : number


    constructor(nome: string, email: string, telefone: number, cp: number, pedagogo: Pedagogo) {
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


    constructor(nome: string, email: string, telefone: number, filho: Aluno) {
        super(nome, email, telefone)
        this.filho = filho
    }


    visualizarNotasFilho() {
        console.log(`nota do seu filho ${this.filho.nome} e ${this.filho.nota}`)
    }
}
let pedagogo = new Pedagogo("Samara", "samara@email.com", 123456789)
pedagogo.fazercadastroaluno("Augusto", "augusto@email.com", 123456789)
pedagogo.fazercadastroaluno("Maria", "maria@email.com", 987654321)


let cp1 = pedagogo.gerarCP()
let professor = new Professor("Ricardo", "ricardo@email.com", 112233445, cp1, pedagogo)
let aluno1 = pedagogo.alunos[0]
professor.lancarnota(8.5, aluno1)
aluno1.visualizarNota()


let pai1 = new ResponsavelAluno("Joao", "joao@email.com", 556677889, aluno1)
pai1.visualizarNotasFilho()


pedagogo.atualizarDadosAluno("Augusto", "novoemail@email.com", 112233445)
let opcao = prompt("1 para login pedagogo, 2 para professor, 3 para aluno")


switch (opcao) {
    case "1":
        let nomePedagogo = "adad"
        let emailPedagogo = prompt("Digite seu email")
        let telefonePedagogo = prompt("Digite seu telefone")
        let novoPedagogo = new Pedagogo(nomePedagogo, emailPedagogo, telefonePedagogo)
        console.log("Login pedagogo efetuado:", novoPedagogo)
        break
    case "2":
        break
    case "3":


        break
    default:
        console.log("Opcao ivalidaa")
        break
}






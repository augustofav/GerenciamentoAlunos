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
  avaliacoes: string[] = []

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
  professores: Professor[] = []

  constructor(nome: string, email: string, telefone: string, senha: number) {
    super(nome, email, telefone)
    if (pedagogo.validarsenha(senha)) {
      this.senha = senha
    } else {
      throw new Error('Senha invalida')
    }
  }

  visualizarNota() {
    if (this.nota !== null) {
      console.log(`A nota do aluno ${this.nome} é: ${this.nota}`)
    } else {
      console.log(`O aluno ${this.nome} nao possui uma nota`)
    }
  }

  visualizarCodigoMatricula() {
    console.log(this.codigomatriculas)
  }

  verMateriasMatriculado() {
    if (this.cursos.length > 0) {
      console.log(`O aluno ${this.nome} esta matriculado em: ${this.cursos.map((curso) => curso.nome)}`)
    } else {
      throw new Error('O aluno nao esta matriculado em nenhum curso')
    }
  }

  matricularEmCurso(curso: Cursos) {
    if (!this.cursos.includes(curso)) {
      this.cursos.push(curso)
      curso.alunos.push(this)
      console.log(`Aluno ${this.nome} matriculado no curso ${curso.nome}`)
    } else {
      console.log(
        `Aluno ${this.nome} ja esta matriculado no curso ${curso.nome}`
      )
    }
  }
  darfeedbackprofessor(notaprofessor: number, nomeprofessor: string) {
    let procurasprofessor = this.professores.find((professores) => professor.nome === nomeprofessor)
    if (procurasprofessor) {
      professor.nota.push(notaprofessor)
    } else {
      console.log('professor nao existe')
    }
  }
}

class Pedagogo extends Entidades {
  alunos: Aluno[] = []
  cps: number[] = []
  codigomatriculas: number[] = []
  cursos: Cursos[] = []
  senhas: number[] = []
  professores: Professor[] = []

  constructor(nome: string, email: string, telefone: string) {
    super(nome, email, telefone)
  }

  criarCurso(nome: string, materia: string) {
    let novoCurso = new Cursos(nome, materia)
    this.cursos.push(novoCurso)
    console.log('curso criado')
    console.log(novoCurso)
  }

  addAlunoEmCurso(aluno: Aluno, nomeCurso: string) {
    let curso = this.cursos.find((curso) => curso.nome === nomeCurso)
    if (curso) {
      aluno.matricularEmCurso(curso)
    } else {
      console.log(`curso ${nomeCurso} nao encontrado`)
    }
  }

  fazerCadastroAluno(
    nome: string,
    mail: string,
    telefone: string,
    senhaAluno: number
  ) {
    if (this.validarsenha(senhaAluno)) {
      let novoAluno = new Aluno(nome, mail, telefone, senhaAluno)
      this.alunos.push(novoAluno)
      let codigoMatricula = Math.floor(Math.random() * 10000)
      novoAluno.codigomatriculas.push(codigoMatricula)
      this.codigomatriculas.push(codigoMatricula)
      console.log('aluno cadastrado com sucesso')
      console.log(novoAluno)
    } else {
      console.log('Senha invalida')
    }
  }

  atualizarDadosAluno(nome: string, email: string, telefone: string) {
    let aluno = this.alunos.find((aluno) => aluno.nome === nome)
    if (aluno) {
      if (email !== aluno.email) aluno.email = email
      if (telefone !== aluno.telefone) aluno.telefone = telefone
      console.log('Dados do aluno atualizados')
      console.log(aluno)
    } else {
      console.log('Aluno nao encontrado')
    }
  }

  gerarCP(): number {
    let cp = Math.floor(Math.random() * 10000)
    this.cps.push(cp)
    console.log(`Codigo CP gerado: ${cp}`)
    return cp
  }

  validarCP(cp: number): boolean {
    return this.cps.includes(cp)
  }

  gerarsenha(): number {
    let senha = Math.floor(Math.random() * 10000)
    this.senhas.push(senha)
    console.log('Senha gerada')
    return senha
  }

  validarsenha(senha: number): boolean {
    return this.senhas.includes(senha)
  }
  removeraluno(nomealuno: string) {
    let alunoposicao = this.alunos.findIndex(
      (aluno) => aluno.nome === nomealuno
    )
    if (alunoposicao > -1) {
      let aluno = this.alunos[alunoposicao]
      this.alunos.splice(alunoposicao)
      console.log(`o ${this.nome} foi removido`)
    }
  }
  calcularmediaprofessor(nomeprofessor: string): number {
    const professor = this.professores.find((professor) => professor.nome === nomeprofessor)
    if (professor) {
      if (professor.nota.length === 0) {
        throw new Error('Nenhuma nota registrada para este professor') }
      const totalNotas = professor.nota.reduce((acumulado, notaatual) => acumulado + notaatual,0)
      const media = totalNotas / professor.nota.length
      console.log(`A media das notas do professor ${nomeprofessor} e: ${media}`)
      return media
    } else {
      throw new Error('Professor nao encontrado')
    }
  }
}

class Professor extends Entidades {
  alunos: Aluno[] = []
  cp: number
  cursos: Cursos[] = []
  nota: number[] = []

  constructor(
    nome: string,
    email: string,
    telefone: string,
    cp: number,
    pedagogo: Pedagogo
  ) {
    super(nome, email, telefone)
    if (pedagogo.validarCP(cp)) {
      this.cp = cp
      console.log(`Professor criado com CP ${cp}`)
    } else {
      throw new Error('CP invalido')
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
  criaravaliacao(nomeprova: string, materia: Cursos) {
    let avaliacao = this.cursos.find((curso) => curso.nome === materia.nome)
    if (avaliacao) {
      materia.avaliacoes.push(nomeprova)
    } else {
      throw new Error('nao existe essa materia')
    }
  }
  avaliaravaliacao(
    nota: number,
    nomealuno: string,
    nomemateria: string,
    nomeprova: string
  ) {
    let aluno = this.alunos.find((aluno) => aluno.nome === nomealuno)
    let materia = this.cursos.find((curso) => curso.nome === nomemateria)
    if (aluno && materia) {
      let avaliacaoExiste = materia.avaliacoes.includes(nomeprova)
      if (avaliacaoExiste) {
        aluno.nota = nota
        console.log(
          `Nota ${nota} registrada para o aluno ${aluno.nome} na avaliacao ${nomeprova} da materia ${nomemateria}`
        )
      } else {
        throw new Error(
          `A avaliação ${nomeprova} nao existe na matéria ${nomemateria}`
        )
      }
    } else {
      throw new Error('Aluno ou matéria nao encontrados.')
    }
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

let pedagogo = new Pedagogo('Samara', 'samara@email.com', '123456789')
let senha1 = pedagogo.gerarsenha()
let senha2 = pedagogo.gerarsenha()
pedagogo.fazerCadastroAluno('Augusto', 'augusto@email.com', '123456789', senha1)
pedagogo.fazerCadastroAluno('Maria', 'maria@email.com', '987654321', senha2)

let curso1 = new Cursos('ADS', 'Programação Orientada a Objetos')
pedagogo.criarCurso(curso1.nome, curso1.materia)

pedagogo.addAlunoEmCurso(pedagogo.alunos[0], curso1.nome)

let cp1 = pedagogo.gerarCP()
let professor = new Professor(
  'Ricardo',
  'ricardo@email.com',
  '112233445',
  cp1,
  pedagogo
)
let aluno1 = pedagogo.alunos[0]
professor.lancarNota(8.5, aluno1)
aluno1.visualizarNota()
aluno1.verMateriasMatriculado()

let pai1 = new ResponsavelAluno('João', 'joao@email.com', '556677889', aluno1)
pai1.visualizarNotasFilho()

pedagogo.atualizarDadosAluno('Augusto', 'novoemail@email.com', '112233445')
let opcao = prompt('1 para login pedagogo, 2 para professor, 3 para aluno')

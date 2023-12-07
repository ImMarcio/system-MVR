import {Disciplina} from "./disciplina";

export class Aluno {
  id?:string;
  nome?:string;
  email?:string;
  senha?:string;
  matricula?:string;
  turmasMatriculado?: Array<string>;

  constructor(id?:string, aluno: Aluno = {}  ) {
   this.id = id;
   this.email = aluno.email;
   this.senha = aluno.senha;
   this.nome = aluno.nome;
   this.matricula = aluno.matricula;
   this.turmasMatriculado = []
  }
}



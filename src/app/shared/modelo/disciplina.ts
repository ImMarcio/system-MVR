import {Aluno} from "./aluno";
import {Professor} from "./professor";

export class Disciplina{
  id?:string;
  nome?:string;
  semestre?:string;
  professorResponsavel?:string;
  alunosMatriculados?:Array<string>;
  descricao?:string;

  constructor(id?:string, disciplina: Disciplina = {} )  {
    this.id= id;
    this.nome= disciplina.nome;
    this.semestre = disciplina.semestre;
    this.descricao = disciplina.descricao;
    this.professorResponsavel = disciplina.professorResponsavel
    this.alunosMatriculados = [];
  }




}

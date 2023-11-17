import {Aluno} from "./aluno";
import {Professor} from "./professor";

export class Disciplina{
  id:number;
  nome:string;
  semestre:string;
  professorResponsavel:Professor | undefined = new Professor(0,'','','','');
  alunosMatriculados:Array<Aluno> = []

  constructor(id:number, nome:string, semestre:string) {
    this.id= id;
    this.nome= nome;
    this.semestre = semestre
  }




}

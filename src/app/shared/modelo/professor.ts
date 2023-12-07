import {Disciplina} from "./disciplina";

export class Professor {
    id?:string;
    cpf?:string;
    nome?:string;
    senha?:string
    email?:string
    turmasEncarregadas?:Array<string>;
  constructor(id:string, professor: Professor = {}) {
    this.id = id;
    this.cpf = professor.cpf;
    this.nome = professor.nome;
    this.senha = professor.senha;
    this.email = professor.email;
    this.turmasEncarregadas = []
  }

}

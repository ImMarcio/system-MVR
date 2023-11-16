import {Disciplina} from "./disciplina";

export class Professor {
    id:number;
    cpf:string;
    nome:string;
    senha:string
    email:string
    turmasEncarregadas:Array<Disciplina> = [];
  constructor(id:number, cpf:string, nome:string, senha:string, email:string) {
    this.id = id;
    this.cpf = cpf;
    this.nome = nome;
    this.senha = senha;
    this.email = email;
  }

}

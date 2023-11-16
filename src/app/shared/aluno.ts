import {Disciplina} from "./disciplina";

export class Aluno {
  id:number;
  email:string;
  senha:string;
  matricula:string;
  nome:string ;
  turmasMatriculado:Array<Disciplina>;


  constructor(id:number,nome:string,email:string,senha:string,matriculaInserir:string) {
   this.id = id;
   this.email = email;
   this.senha = senha;
   this.nome= nome;
   this.matricula = matriculaInserir;
   this.turmasMatriculado = [];

  }
  getNome():string{
    return this.nome
  }

  toString(){
    return "Nome" + this.nome + "Senha" + this.senha;
  }


}

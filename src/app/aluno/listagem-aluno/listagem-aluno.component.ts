import { Component } from '@angular/core';
import {AlunoCrudService} from "../aluno-crud.service";
import {Aluno} from "../../shared/aluno";

@Component({
  selector: 'app-listagem-aluno',
  templateUrl: './listagem-aluno.component.html',
  styleUrls: ['./listagem-aluno.component.css']
})
export class ListagemAlunoComponent {
constructor(private _alunoService:AlunoCrudService ) {}
  public alunos: Aluno[] | undefined;

ngOnInit(){
  this._alunoService.getAlunos()
    .subscribe(
      retorno => {
        this.alunos = retorno.map(
          item => {
            return new Aluno(
              item.id,
              item.nome,
              item.email,
              item.senha,
              item.matricula
            )
          }
        )
      }
    )



}

excluirAluno(aluno:Aluno){
  const index = this.alunos?.findIndex(alunoAtual => alunoAtual.id == aluno.id);
  // @ts-ignore
  this.alunos?.splice(index,1);
  this._alunoService.deleteAluno(aluno.id).subscribe();
}

}

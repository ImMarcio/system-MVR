import { Component } from '@angular/core';
import {AlunoCrudService} from "../aluno-crud.service";
import {Aluno} from "../../shared/modelo/aluno";
import {AlunoFireStoreService} from "../../shared/services/aluno-fire-store.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listagem-aluno',
  templateUrl: './listagem-aluno.component.html',
  styleUrls: ['./listagem-aluno.component.css']
})
export class ListagemAlunoComponent {
constructor(private _alunoService:AlunoFireStoreService, private router:Router ) {}
  public alunos: Aluno[] | undefined;

ngOnInit(){
  this._alunoService.listar().subscribe(alunosRetornados =>
    {
      this.alunos = alunosRetornados;
    }
  );
  console.log('estou aqui');
  console.log(this.alunos);


}

// excluirAluno(aluno:Aluno){
//   const index = this.alunos?.findIndex(alunoAtual => alunoAtual.id == aluno.id);
//   // @ts-ignore
//   this.alunos?.splice(index,1);
//   this._alunoService.deleteAluno(aluno.id).subscribe();
// }

}

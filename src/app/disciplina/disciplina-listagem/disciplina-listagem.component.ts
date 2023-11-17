import { Component } from '@angular/core';

import {Disciplina} from "../../shared/disciplina";
import {Aluno} from "../../shared/aluno";
import {DisciplinaServiceService} from "../disciplina-service.service";

@Component({
  selector: 'app-disciplina-listagem',
  templateUrl: './disciplina-listagem.component.html',
  styleUrls: ['./disciplina-listagem.component.css']
})
export class DisciplinaListagemComponent {
disciplinas : Disciplina[] | undefined;

constructor(private _disciplinaService:DisciplinaServiceService) {


}

  ngOnInit(){
    this._disciplinaService.getDisciplinas()
      .subscribe(
        retorno => {
          this.disciplinas = retorno.map(
            item => {
              return new Disciplina(
                item.id,
                item.nome,
                item.semestre
              )
            }
          )
        }
      )
  }

  excluirDisciplina(disciplina:Disciplina){
    const index = this.disciplinas?.findIndex(disciplinaAtual => disciplinaAtual.id == disciplina.id);
    // @ts-ignore
    this.disciplinas?.splice(index,1);
    this._disciplinaService.deleteDisciplina(disciplina.id).subscribe();
  }
}

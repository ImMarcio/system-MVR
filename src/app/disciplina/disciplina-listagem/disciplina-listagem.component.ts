import { Component } from '@angular/core';

import {Disciplina} from "../../shared/modelo/disciplina";
import {Aluno} from "../../shared/modelo/aluno";
import {DisciplinaServiceService} from "../disciplina-service.service";
import {Router} from "@angular/router";
import {DisciplinaFireStoreService} from "../../shared/services/disciplina-fire-store.service";

@Component({
  selector: 'app-disciplina-listagem',
  templateUrl: './disciplina-listagem.component.html',
  styleUrls: ['./disciplina-listagem.component.css']
})
export class DisciplinaListagemComponent {
disciplinas : Disciplina[] | undefined;

constructor(private _disciplinaService:DisciplinaFireStoreService, private roteador: Router) {


}

  ngOnInit(){
    this._disciplinaService.listar().subscribe(disciplinasRetornadas =>
      {
        this.disciplinas = disciplinasRetornadas;
      }
    );
  }

  excluirDisciplina(disciplina:Disciplina){
    const index = this.disciplinas?.findIndex(disciplinaAtual => disciplinaAtual.id == disciplina.id);
    // @ts-ignore
    this.disciplinas?.splice(index,1);
    this._disciplinaService.apagar(disciplina).subscribe();
  }

  editarDisciplina(disciplina:Disciplina){
    this.roteador.navigate(['edicao-disciplina', disciplina.id]);
  }



}

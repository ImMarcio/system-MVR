import { Component } from '@angular/core';
import {ALUNOMAIN} from "../../shared/ALUNO-MAIN";
import {AuthService} from "../../layout/login/auth.service";
import {Observable, Subscription} from "rxjs";
import {Aluno} from "../../shared/aluno";
import {Disciplina} from "../../shared/disciplina";
import {subscribeToArray} from "rxjs/internal/util/subscribeToArray";

@Component({
  selector: 'app-listar-disciplinas-matriculado',
  templateUrl: './listar-disciplinas-matriculado.component.html',
  styleUrls: ['./listar-disciplinas-matriculado.component.css']
})
export class ListarDisciplinasMatriculadoComponent {
  aluno: Observable<Aluno> | undefined
  disciplinasMatriculado: Disciplina[] = []

  constructor( private _authService:AuthService) {
    this.aluno = this._authService.alunoLogado;
    this.aluno?.pipe( )

  }
  // cancelarIncricao(disciplinaID:number){
  //   const indxRemover = this.disciplinasMatriculado.findIndex(disciplina => disciplina.codigo === disciplinaID);
  //   if(indxRemover > -1){
  //     this.disciplinasMatriculado.splice(indxRemover, 1);
  //   }
  // }

}

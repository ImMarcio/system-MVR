import { Component } from '@angular/core';

import {AuthService} from "../../layout/login/auth.service";
import {Observable, Subscription} from "rxjs";
import {Aluno} from "../../shared/modelo/aluno";
import {Disciplina} from "../../shared/modelo/disciplina";
import {subscribeToArray} from "rxjs/internal/util/subscribeToArray";
import {AlunoLogadoService} from "../../layout/login/aluno-logado.service";
import {DisciplinaFireStoreService} from "../../shared/services/disciplina-fire-store.service";

@Component({
  selector: 'app-listar-disciplinas-matriculado',
  templateUrl: './listar-disciplinas-matriculado.component.html',
  styleUrls: ['./listar-disciplinas-matriculado.component.css']
})
export class ListarDisciplinasMatriculadoComponent {
  aluno: Aluno = new Aluno('')
  disciplinasMatriculado: Array<Disciplina> = [];
  disciplinas:Array<Disciplina>  = [];

  constructor( private _disciplinaServiceFireStore:DisciplinaFireStoreService,private _authService:AuthService, private alunoLogadoService:AlunoLogadoService) {
    this.aluno = alunoLogadoService.getCurrentStudent();
    this.disciplinas?.find(objeto => {
      for(const disciplina in this.aluno.turmasMatriculado){
        if(objeto.id === disciplina){
          this.disciplinasMatriculado.push(objeto);
        }
      }
    })

    // for (const disciplinaID in this.aluno.turmasMatriculado) {
    //   this.disciplinas.forEach(disciplinaArray => {
    //     if(disciplinaArray.id === disciplinaID){
    //       this.disciplinasMatriculado.push(disciplinaArray);
    //     }
    //   })
    // }

    }

  ngOnInit(){
    this._disciplinaServiceFireStore.listar().subscribe(disciplinasRetornadas =>
        {
          this.disciplinas = disciplinasRetornadas;
        }
    );
  }

  }
  // cancelarIncricao(disciplinaID:number){
  //   const indxRemover = this.disciplinasMatriculado.findIndex(disciplina => disciplina.codigo === disciplinaID);
  //   if(indxRemover > -1){
  //     this.disciplinasMatriculado.splice(indxRemover, 1);
  //   }
  // }






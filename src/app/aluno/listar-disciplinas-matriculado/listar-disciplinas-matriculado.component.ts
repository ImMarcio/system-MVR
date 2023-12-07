import { Component } from '@angular/core';

import {AuthService} from "../../layout/login/auth.service";
import {Observable, Subscription} from "rxjs";
import {Aluno} from "../../shared/modelo/aluno";
import {Disciplina} from "../../shared/modelo/disciplina";
import {subscribeToArray} from "rxjs/internal/util/subscribeToArray";
import {AlunoLogadoService} from "../../layout/login/aluno-logado.service";
import {DisciplinaFireStoreService} from "../../shared/services/disciplina-fire-store.service";
import {AlunoFireStoreService} from "../../shared/services/aluno-fire-store.service";

@Component({
  selector: 'app-listar-disciplinas-matriculado',
  templateUrl: './listar-disciplinas-matriculado.component.html',
  styleUrls: ['./listar-disciplinas-matriculado.component.css']
})
export class ListarDisciplinasMatriculadoComponent {
  aluno: Aluno = new Aluno('')
  disciplinasMatriculado: Array<string> | undefined = [];
  disciplinas:Array<Disciplina>  = [];

  constructor( private _disciplinaServiceFireStore:DisciplinaFireStoreService,private _authService:AuthService, private alunoLogadoService:AlunoLogadoService, private alunoService:AlunoFireStoreService) {
    this.aluno = alunoLogadoService.getCurrentStudent();
    this.disciplinasMatriculado = this.aluno.turmasMatriculado;

    // this.disciplinas?.find(objeto => {
    //   for(const disciplina in this.aluno.turmasMatriculado){
    //     if(objeto.nome === disciplina){
    //       this.disciplinasMatriculado.push(objeto);
    //     }
    //   }
    // })


    }

  ngOnInit(){
    this._disciplinaServiceFireStore.listar().subscribe(disciplinasRetornadas =>
        {
          this.disciplinas = disciplinasRetornadas;
        }
    );
  }
  cancelarIncricao(disciplina:String){
    if(this.aluno.turmasMatriculado){
    const indxRemover = this.aluno.turmasMatriculado.findIndex(disciplinaAtual => disciplinaAtual === disciplina);
    if(indxRemover > -1){
      this.aluno.turmasMatriculado.splice(indxRemover, 1);
      this.alunoService.atualizar(this.aluno).subscribe()
    }
  }

  }

  }







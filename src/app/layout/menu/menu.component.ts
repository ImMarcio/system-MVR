import { Component } from '@angular/core';

import {MatDialog} from "@angular/material/dialog";



import {Disciplina} from "../../shared/modelo/disciplina";



import {DisciplinaServiceService} from "../../disciplina/disciplina-service.service";
import {Aluno} from "../../shared/modelo/aluno";
import {AlunoCrudService} from "../../aluno/aluno-crud.service";
import {AlunoLogadoService} from "../login/aluno-logado.service";
import {AlunoFireStoreService} from "../../shared/services/aluno-fire-store.service";
import {DisciplinaFireStoreService} from "../../shared/services/disciplina-fire-store.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  opened = false;
  disciplinas : Disciplina[] | undefined;
  alunos: Aluno[] | undefined;
  alunoPrincipal: Aluno;
  disciplinasMatriculadas : Disciplina[] | undefined;
  alunoEstaLogado:boolean = false;

constructor(private _disciplinaService:DisciplinaFireStoreService,private _alunoService:AlunoCrudService,private alunoFire:AlunoFireStoreService, private alunoLogadoService:AlunoLogadoService) {
  this.alunoPrincipal = alunoLogadoService.getCurrentStudent();
  // this.alunoPrincipal.turmasMatriculado.forEach(disciplina => console.log(disciplina.nome  + "Aqui"))
  // this.disciplinasMatriculadas = this.alunoPrincipal.turmasMatriculado;

}
  ngOnInit(){
    this._disciplinaService.listar().subscribe(disciplinasRetornadas =>
      {
        this.disciplinas = disciplinasRetornadas;
      }
    );

    this.alunoFire.listar().subscribe(alunosRetornados =>
      {
        this.alunos = alunosRetornados;
      }
    );
    console.log('estou aqui');
    console.log(this.alunos);



  }


}

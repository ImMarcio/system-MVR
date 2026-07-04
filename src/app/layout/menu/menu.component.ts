import { Component } from '@angular/core';

import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

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

  constructor(
    private _disciplinaService:DisciplinaFireStoreService,
    private _alunoService:AlunoCrudService,
    private alunoFire:AlunoFireStoreService,
    private alunoLogadoService:AlunoLogadoService,
    private roteador: Router
  ) {}

  get alunoPrincipal(): Aluno {
    return this.alunoLogadoService.getCurrentStudent();
  }

  get alunoEstaLogado(): boolean {
    const student = this.alunoLogadoService.getCurrentStudent();
    return !!(student && student.id);
  }

  get disciplinasMatriculadas(): Disciplina[] {
    const student = this.alunoLogadoService.getCurrentStudent();
    if (!student || !student.turmasMatriculado || !this.disciplinas) {
      return [];
    }
    return this.disciplinas.filter(d => d.nome && student.turmasMatriculado?.includes(d.nome));
  }

  deslogar() {
    this.alunoLogadoService.setCurrentStudent(undefined);
    this.roteador.navigate(['']);
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
  }

}

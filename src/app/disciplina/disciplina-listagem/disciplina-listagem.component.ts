import { Component } from '@angular/core';

import {Disciplina} from "../../shared/modelo/disciplina";
import {Aluno} from "../../shared/modelo/aluno";
import {DisciplinaServiceService} from "../disciplina-service.service";
import {Router} from "@angular/router";
import {DisciplinaFireStoreService} from "../../shared/services/disciplina-fire-store.service";
import {AlunoFireStoreService} from "../../shared/services/aluno-fire-store.service";
import {ProfessorFireStoreService} from "../../shared/services/professor-fire-store.service";

@Component({
  selector: 'app-disciplina-listagem',
  templateUrl: './disciplina-listagem.component.html',
  styleUrls: ['./disciplina-listagem.component.css']
})
export class DisciplinaListagemComponent {
disciplinas : Disciplina[] | undefined;

constructor(
  private _disciplinaService:DisciplinaFireStoreService,
  private roteador: Router,
  private _alunoService: AlunoFireStoreService,
  private _professorService: ProfessorFireStoreService
) {}

  ngOnInit(){
    this._disciplinaService.listar().subscribe(disciplinasRetornadas =>
      {
        this.disciplinas = disciplinasRetornadas;
      }
    );
  }

  excluirDisciplina(disciplina:Disciplina){
    if (!disciplina.id || !disciplina.nome) return;

    // 1. Remove from all students' enrolled classes
    this._alunoService.listar().subscribe(alunos => {
      alunos.forEach(aluno => {
        if (aluno.turmasMatriculado && aluno.turmasMatriculado.includes(disciplina.nome!)) {
          const idx = aluno.turmasMatriculado.indexOf(disciplina.nome!);
          if (idx > -1) {
            aluno.turmasMatriculado.splice(idx, 1);
            this._alunoService.atualizar(aluno).subscribe();
          }
        }
      });
    });

    // 2. Remove from the responsible professor's classes
    if (disciplina.professorResponsavel) {
      this._professorService.listar().subscribe(professores => {
        const prof = professores.find(p => p.nome === disciplina.professorResponsavel);
        if (prof && prof.turmasEncarregadas && prof.turmasEncarregadas.includes(disciplina.nome!)) {
          const idx = prof.turmasEncarregadas.indexOf(disciplina.nome!);
          if (idx > -1) {
            prof.turmasEncarregadas.splice(idx, 1);
            this._professorService.atualizar(prof).subscribe();
          }
        }
      });
    }

    // 3. Delete the discipline itself
    const index = this.disciplinas?.findIndex(disciplinaAtual => disciplinaAtual.id == disciplina.id);
    if (index !== undefined && index > -1) {
      this.disciplinas?.splice(index, 1);
    }
    this._disciplinaService.apagar(disciplina).subscribe();
  }

  editarDisciplina(disciplina:Disciplina){
    this.roteador.navigate(['edicao-disciplina', disciplina.id]);
  }

}

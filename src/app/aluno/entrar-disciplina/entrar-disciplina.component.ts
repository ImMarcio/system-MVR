import { Component } from '@angular/core';


import {Disciplina} from "../../shared/modelo/disciplina";


import {DisciplinaServiceService} from "../../disciplina/disciplina-service.service";
import {AlunoLogadoService} from "../../layout/login/aluno-logado.service";
import {Aluno} from "../../shared/modelo/aluno";
import {AlunoCrudService} from "../aluno-crud.service";
import {AlunoFireStoreService} from "../../shared/services/aluno-fire-store.service";
import {DisciplinaFireStoreService} from "../../shared/services/disciplina-fire-store.service";

@Component({
  selector: 'app-entrar-disciplina',
  templateUrl: './entrar-disciplina.component.html',
  styleUrls: ['./entrar-disciplina.component.css']
})
export class EntrarDisciplinaComponent {
  disciplinas : Disciplina[] | undefined;
  selectDisciplina: Disciplina | undefined;
  aluno :Aluno = new Aluno('');
  messageBox: any;

  constructor(private _disciplinaService:DisciplinaFireStoreService, private _alunoService:AlunoFireStoreService, private alunoLogadoService:AlunoLogadoService) {
    this.aluno = this.alunoLogadoService.getCurrentStudent();

  }
  entrarDisciplina(){
      if(this.aluno && this.aluno.id && this.aluno.nome && this.selectDisciplina && this.selectDisciplina.nome ){
          this.aluno.turmasMatriculado = this.aluno.turmasMatriculado || [];
          if (!this.aluno.turmasMatriculado.includes(this.selectDisciplina.nome)) {
              this.aluno.turmasMatriculado.push(this.selectDisciplina.nome);
              this._alunoService.atualizar(this.aluno).subscribe();
              this.alunoLogadoService.setCurrentStudent(this.aluno);
          }

          this.selectDisciplina.alunosMatriculados = this.selectDisciplina.alunosMatriculados || [];
          if (!this.selectDisciplina.alunosMatriculados.includes(this.aluno.nome)) {
              this.selectDisciplina.alunosMatriculados.push(this.aluno.nome);
              this._disciplinaService.atualizar(this.selectDisciplina).subscribe();
          }

          this.messageBox = "Aluno matriculado com Sucesso";
      } else {
          this.messageBox = "Faça o login e selecione uma disciplina antes de se matricular";
      }
  }
  ngOnInit(){
    this._disciplinaService.listar().subscribe(disciplinasRetornadas =>
      {
        this.disciplinas = disciplinasRetornadas;
      }
    );
  }



}

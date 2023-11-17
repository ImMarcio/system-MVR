import { Component } from '@angular/core';


import {Disciplina} from "../../shared/disciplina";

import {ALUNOMAIN} from "../../shared/ALUNO-MAIN";
import {DisciplinaServiceService} from "../../disciplina/disciplina-service.service";
import {AlunoLogadoService} from "../../layout/login/aluno-logado.service";
import {Aluno} from "../../shared/aluno";
import {AlunoCrudService} from "../aluno-crud.service";

@Component({
  selector: 'app-entrar-disciplina',
  templateUrl: './entrar-disciplina.component.html',
  styleUrls: ['./entrar-disciplina.component.css']
})
export class EntrarDisciplinaComponent {
  disciplinas : Disciplina[] | undefined;
  selectDisciplina: Disciplina = new Disciplina(0,'','') ;
  aluno :Aluno = new Aluno(0,'','','','');

  constructor(private _disciplinaService:DisciplinaServiceService,private _alunoCrudService:AlunoCrudService, private alunoLogadoService:AlunoLogadoService) {
    this.aluno = this.alunoLogadoService.getCurrentStudent();

  }
  entrarDisciplina(){
    this.aluno.turmasMatriculado.push(this.selectDisciplina);
    this._alunoCrudService.putAluno(this.aluno).subscribe();
     this.selectDisciplina.alunosMatriculados.push(this.aluno);
     this._disciplinaService.getDisciplinaById(this.selectDisciplina.id).subscribe();

    console.log(this.aluno);
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



}

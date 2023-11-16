import { Component } from '@angular/core';


import {Disciplina} from "../../shared/disciplina";

import {ALUNOMAIN} from "../../shared/ALUNO-MAIN";
import {DisciplinaServiceService} from "../../disciplina/disciplina-service.service";

@Component({
  selector: 'app-entrar-disciplina',
  templateUrl: './entrar-disciplina.component.html',
  styleUrls: ['./entrar-disciplina.component.css']
})
export class EntrarDisciplinaComponent {
  disciplinas : Disciplina[] | undefined;
  selectDisciplina: Disciplina | undefined ;
  aluno = ALUNOMAIN;

  constructor(private _disciplinaService:DisciplinaServiceService) {
  }
  entrarDisciplina(){
    if (this.selectDisciplina instanceof Disciplina) {
      this.aluno.turmasMatriculado.push(this.selectDisciplina);
      this.selectDisciplina.alunosMatriculados.push(this.aluno);
      this._disciplinaService.putDisciplina(this.selectDisciplina.id,this.selectDisciplina).subscribe();

    }
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

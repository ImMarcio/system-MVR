import { Component } from '@angular/core';

import {MatDialog} from "@angular/material/dialog";



import {Disciplina} from "../../shared/disciplina";
import {ALUNOMAIN} from "../../shared/ALUNO-MAIN";


import {DisciplinaServiceService} from "../../disciplina/disciplina-service.service";
import {Aluno} from "../../shared/aluno";
import {AlunoCrudService} from "../../aluno/aluno-crud.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  opened = false;
  disciplinas : Disciplina[] | undefined;
    public alunos: Aluno[] | undefined;
  alunoTratatamento = ALUNOMAIN;



constructor(private _disciplinaService:DisciplinaServiceService,private _alunoService:AlunoCrudService) {

    this._alunoService.postAluno(this.alunoTratatamento).subscribe()

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

      this._alunoService.getAlunos()
          .subscribe(
              retorno => {
                  this.alunos = retorno.map(
                      item => {
                          return new Aluno(
                              item.id,
                              item.nome,
                              item.email,
                              item.senha,
                              item.matricula
                          )
                      }
                  )
              }
          )


  }


}

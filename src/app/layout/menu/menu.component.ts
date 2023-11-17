import { Component } from '@angular/core';

import {MatDialog} from "@angular/material/dialog";



import {Disciplina} from "../../shared/disciplina";



import {DisciplinaServiceService} from "../../disciplina/disciplina-service.service";
import {Aluno} from "../../shared/aluno";
import {AlunoCrudService} from "../../aluno/aluno-crud.service";
import {AlunoLogadoService} from "../login/aluno-logado.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  opened = false;
  disciplinas : Disciplina[] | undefined;
  alunos: Aluno[] | undefined;
  alunoPrincipal: Aluno = new Aluno(0,'','','','') ;
  disciplinasMatriculadas : Disciplina[] | undefined;
  alunoEstaLogado:boolean = false;

constructor(private _disciplinaService:DisciplinaServiceService,private _alunoService:AlunoCrudService, private alunoLogadoService:AlunoLogadoService) {
  this.alunoPrincipal = alunoLogadoService.getCurrentStudent();
  this.alunoPrincipal.turmasMatriculado.forEach(disciplina => console.log(disciplina.nome  + "Aqui"))
  this.disciplinasMatriculadas = this.alunoPrincipal.turmasMatriculado;

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
                item.semestre,
                item.descricao
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

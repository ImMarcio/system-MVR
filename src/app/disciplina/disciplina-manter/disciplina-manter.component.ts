import { Component } from '@angular/core';
import {Disciplina} from "../../shared/disciplina";

import {Professor} from "../../shared/professor";
import {DisciplinaServiceService} from "../disciplina-service.service";
import {ProfessorCrudService} from "../../professor/professor-crud.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-disciplina-manter',
  templateUrl: './disciplina-manter.component.html',
  styleUrls: ['./disciplina-manter.component.css']
})
export class DisciplinaManterComponent {

   disciplinaTratamento: Disciplina = new Disciplina(0, "", "");

  disciplinas : Disciplina[] | undefined;
  professores : Professor[] | undefined;


  selectProfessor: Professor | undefined;
  constructor(private _disciplinaService:DisciplinaServiceService, private _professorService:ProfessorCrudService) {

  }
  cadastrar():void{

    // @ts-ignore
    this.disciplinaTratamento.professorResponsavel = this.selectProfessor;

    this._disciplinaService.postDisciplina(this.disciplinaTratamento).subscribe(
      (response) => {
        console.log('Recurso criado com sucesso',response);
      },
      (error) => {
        console.error('Error ao criar recurso', error);
      }
    );
    this.disciplinaTratamento = new Disciplina(0,'','');

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




      this._professorService.getProfessores()
          .subscribe(
              retorno => {
                  this.professores = retorno.map(
                      item => {
                          return new Professor(
                              item.id,
                              item.cpf,
                              item.nome,
                              item.senha,
                              item.email
                          )
                      }
                  )
              }
          )
  }







}

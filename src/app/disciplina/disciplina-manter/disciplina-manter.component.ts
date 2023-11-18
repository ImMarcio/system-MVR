import { Component } from '@angular/core';
import {Disciplina} from "../../shared/disciplina";

import {Professor} from "../../shared/professor";
import {DisciplinaServiceService} from "../disciplina-service.service";
import {ProfessorCrudService} from "../../professor/professor-crud.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-disciplina-manter',
  templateUrl: './disciplina-manter.component.html',
  styleUrls: ['./disciplina-manter.component.css']
})
export class DisciplinaManterComponent {

  disciplinaTratamento: Disciplina;

  disciplinas : Disciplina[] | undefined;
  professores : Professor[] | undefined;
  selectProfessor: Professor = new Professor(0, '','','','') ;

  readonly NOME_BOTAO_CADASTRAR = 'Cadastrar';
  readonly NOME_BOTAO_ATUALIZAR = 'Atualizar';
  // disciplinaEdicao:Disciplina;
  estahCadastrando = true;
  nomeBotao = this.NOME_BOTAO_CADASTRAR;
  constructor(private roteador: Router,private rotaAtivada: ActivatedRoute,private _disciplinaService:DisciplinaServiceService, private _professorService:ProfessorCrudService) {
    const idEdicao = this.rotaAtivada.snapshot.params['id'];
    if(idEdicao){
      this.estahCadastrando = false;
      this._disciplinaService.getDisciplinaById(idEdicao).subscribe(disciplinaRetornada => {
        this.disciplinaTratamento = disciplinaRetornada;
      })
    }
    this.disciplinaTratamento = new Disciplina(0,'','','');
    this.nomeBotao = this.estahCadastrando ? this.NOME_BOTAO_CADASTRAR : this.NOME_BOTAO_ATUALIZAR;
  }
  cadastrar():void{
    if(this.estahCadastrando){
      this._disciplinaService.postDisciplina(this.disciplinaTratamento).subscribe(
        disciplinaRetornada => {this.roteador.navigate(["listagem-disciplina"])}
      )
    }else{
      this._disciplinaService.putDisciplina(this.disciplinaTratamento).subscribe(disciplina =>{
        this.roteador.navigate(["listagem-disciplina"])
      })
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
                item.semestre,
                item.descricao
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

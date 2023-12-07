import { Component } from '@angular/core';
import {Disciplina} from "../../shared/modelo/disciplina";

import {Professor} from "../../shared/modelo/professor";
import {DisciplinaServiceService} from "../disciplina-service.service";
import {ProfessorCrudService} from "../../professor/professor-crud.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ActivatedRoute, Router} from "@angular/router";
import {DisciplinaFireStoreService} from "../../shared/services/disciplina-fire-store.service";
import {ProfessorFireStoreService} from "../../shared/services/professor-fire-store.service";

@Component({
  selector: 'app-disciplina-manter',
  templateUrl: './disciplina-manter.component.html',
  styleUrls: ['./disciplina-manter.component.css']
})
export class DisciplinaManterComponent {

  disciplinaTratamento: Disciplina;

  disciplinas : Disciplina[] | undefined;
  professores : Professor[] | undefined;
  selectProfessor: Professor | undefined ;
  professor: Professor | undefined = new Professor('');

  readonly NOME_BOTAO_CADASTRAR = 'Cadastrar';
  readonly NOME_BOTAO_ATUALIZAR = 'Atualizar';
  // disciplinaEdicao:Disciplina;
  estahCadastrando = true;
  nomeBotao = this.NOME_BOTAO_CADASTRAR;


  constructor(private roteador: Router,private rotaAtivada: ActivatedRoute,private _disciplinaService:DisciplinaFireStoreService, private _professorService:ProfessorFireStoreService) {
    const idEdicao = this.rotaAtivada.snapshot.params['id'];
    if(idEdicao){
      this.estahCadastrando = false;
      this._disciplinaService.pesquisarPorId(idEdicao).subscribe(disciplinaRetornada => {
        this.disciplinaTratamento = disciplinaRetornada;
      })
    }

    this.disciplinaTratamento = new Disciplina('');
    this.nomeBotao = this.estahCadastrando ? this.NOME_BOTAO_CADASTRAR : this.NOME_BOTAO_ATUALIZAR;
  }
  cadastrar():void{

    if(this.estahCadastrando){
      if(this.selectProfessor && this.selectProfessor.nome && this.disciplinaTratamento.nome){
      this.disciplinaTratamento.professorResponsavel = this.selectProfessor.nome;
        this.selectProfessor?.turmasEncarregadas?.push(this.disciplinaTratamento.nome);
        this._professorService.atualizar(this.selectProfessor);
      }

      this._disciplinaService.inserir(this.disciplinaTratamento).subscribe(
        disciplinaRetornada => {this.roteador.navigate(["listagem-disciplina"])
        }
      )

    }else{
      if(this.selectProfessor && this.selectProfessor.nome){
      this.disciplinaTratamento.professorResponsavel = this.selectProfessor.nome;

      }
      this._disciplinaService.atualizar(this.disciplinaTratamento).subscribe(disciplina =>{
        this.roteador.navigate(["listagem-disciplina"])

      })
    }

  }


  ngOnInit(){
    this._disciplinaService.listar().subscribe(disciplinasRetornadas =>
      {
        this.disciplinas = disciplinasRetornadas;
      }
    );




    this._professorService.listar().subscribe(professoresRetornados =>
      {
        this.professores = professoresRetornados;
      }
    );

}
}

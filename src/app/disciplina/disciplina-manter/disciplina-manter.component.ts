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
  originalDisciplina?: Disciplina;

  disciplinas : Disciplina[] | undefined;
  professores : Professor[] | undefined;
  selectProfessor: Professor | undefined ;
  professor: Professor | undefined = new Professor('');

  readonly NOME_BOTAO_CADASTRAR = 'Cadastrar';
  readonly NOME_BOTAO_ATUALIZAR = 'Atualizar';
  estahCadastrando = true;
  nomeBotao = this.NOME_BOTAO_CADASTRAR;


  constructor(private roteador: Router,private rotaAtivada: ActivatedRoute,private _disciplinaService:DisciplinaFireStoreService, private _professorService:ProfessorFireStoreService) {
    this.disciplinaTratamento = new Disciplina('');
    const idEdicao = this.rotaAtivada.snapshot.params['id'];
    if(idEdicao){
      this.estahCadastrando = false;
      this._disciplinaService.pesquisarPorId(idEdicao).subscribe(disciplinaRetornada => {
        this.disciplinaTratamento = disciplinaRetornada;
        this.originalDisciplina = { ...disciplinaRetornada };
        this.inicializarProfessorSelecionado();
      })
    }
    this.nomeBotao = this.estahCadastrando ? this.NOME_BOTAO_CADASTRAR : this.NOME_BOTAO_ATUALIZAR;
  }

  inicializarProfessorSelecionado() {
    if (this.professores && this.disciplinaTratamento && this.disciplinaTratamento.professorResponsavel) {
      this.selectProfessor = this.professores.find(p => p.nome === this.disciplinaTratamento.professorResponsavel);
    }
  }

  cadastrar():void{

    if(this.estahCadastrando){
      if(this.selectProfessor && this.selectProfessor.nome && this.disciplinaTratamento.nome){
        this.disciplinaTratamento.professorResponsavel = this.selectProfessor.nome;
        this.selectProfessor.turmasEncarregadas = this.selectProfessor.turmasEncarregadas || [];
        if (!this.selectProfessor.turmasEncarregadas.includes(this.disciplinaTratamento.nome)) {
          this.selectProfessor.turmasEncarregadas.push(this.disciplinaTratamento.nome);
        }
        this._professorService.atualizar(this.selectProfessor).subscribe();
      }

      this._disciplinaService.inserir(this.disciplinaTratamento).subscribe(
        disciplinaRetornada => {this.roteador.navigate(["listagem-disciplina"])
        }
      )

    }else{
      const oldProfName = this.originalDisciplina?.professorResponsavel;
      const oldDiscName = this.originalDisciplina?.nome;
      const newProfName = this.selectProfessor?.nome;
      const newDiscName = this.disciplinaTratamento.nome;

      if(newProfName){
        this.disciplinaTratamento.professorResponsavel = newProfName;
      }

      if(oldDiscName && newDiscName){
        if(oldProfName !== newProfName){
          if(oldProfName){
            this._professorService.listar().subscribe(professores => {
              const oldProf = professores.find(p => p.nome === oldProfName);
              if (oldProf && oldProf.turmasEncarregadas) {
                const idx = oldProf.turmasEncarregadas.indexOf(oldDiscName);
                if (idx > -1) {
                  oldProf.turmasEncarregadas.splice(idx, 1);
                  this._professorService.atualizar(oldProf).subscribe();
                }
              }
            });
          }
          if(this.selectProfessor){
            this.selectProfessor.turmasEncarregadas = this.selectProfessor.turmasEncarregadas || [];
            if (!this.selectProfessor.turmasEncarregadas.includes(newDiscName)) {
              this.selectProfessor.turmasEncarregadas.push(newDiscName);
            }
            this._professorService.atualizar(this.selectProfessor).subscribe();
          }
        } else {
          if (oldDiscName !== newDiscName && this.selectProfessor) {
            this.selectProfessor.turmasEncarregadas = this.selectProfessor.turmasEncarregadas || [];
            const idx = this.selectProfessor.turmasEncarregadas.indexOf(oldDiscName);
            if (idx > -1) {
              this.selectProfessor.turmasEncarregadas[idx] = newDiscName;
            } else {
              this.selectProfessor.turmasEncarregadas.push(newDiscName);
            }
            this._professorService.atualizar(this.selectProfessor).subscribe();
          }
        }
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
        this.inicializarProfessorSelecionado();
      }
    );

}
}

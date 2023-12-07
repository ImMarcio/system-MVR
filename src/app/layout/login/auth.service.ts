import { Injectable } from '@angular/core';

import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Aluno} from "../../shared/modelo/aluno";
import {AlunoCrudService} from "../../aluno/aluno-crud.service";
import {Observable, Subscription} from "rxjs";
import {AlunoLogadoService} from "./aluno-logado.service";
import {Professor} from "../../shared/modelo/professor";
import {ProfessorCrudService} from "../../professor/professor-crud.service";
import {AlunoFireStoreService} from "../../shared/services/aluno-fire-store.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  alunoValidado = false;
  professorValidado = false;
  constructor(private  router: Router,private _professorService:ProfessorCrudService,  private _alunoService:AlunoFireStoreService, private alunoLogadoService:AlunoLogadoService) { }


  fazerLogin(email: string | undefined, senha: string | undefined){
   let alunoAuteticado:Aluno | null = null;
   this._alunoService.listar().subscribe(alunosListados => {
     alunosListados.map((alunoAtual) =>{
       if(alunoAtual.email == email && alunoAtual.senha == senha){
         alunoAuteticado = alunoAtual;
         this.alunoLogadoService.setCurrentStudent(alunoAuteticado);
         this.alunoValidado = true;
         this.router.navigate(['/listar-disciplinas-matriculado'])

       }

     })
     if(!alunoAuteticado){
       this.alunoValidado = false;
       window.alert("Email ou senha errada! Tente Novamente!");

     }
   })
  }

  alunoEstaValidado(){
    return this.alunoValidado;
  }



}




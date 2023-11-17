import { Injectable } from '@angular/core';

import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Aluno} from "../../shared/aluno";
import {AlunoCrudService} from "../../aluno/aluno-crud.service";
import {Observable, Subscription} from "rxjs";
import {AlunoLogadoService} from "./aluno-logado.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usuarioAuteticado:Aluno | undefined;
  public alunoLogado: Aluno | undefined;
  constructor(private  router: Router, private _alunoService:AlunoCrudService, private alunoLogadoService:AlunoLogadoService) { }



  fazerLogin(email:string, senha:string){
   let alunoAuteticado:Aluno | null = null;
   this._alunoService.getAlunos().subscribe(alunosListados => {
     alunosListados.map((alunoAtual) =>{
       if(alunoAtual.email == email && alunoAtual.senha == senha){
         this.usuarioAuteticado = alunoAtual;
         this.alunoLogadoService.setCurrentStudent(this.usuarioAuteticado);
         this.router.navigate(['/listar-disciplinas-matriculado'])

       }
     })
     // if(!alunoAuteticado){
     //   window.alert("Email ou senha errada! Tente Novamente!")
     // }
   })
  }





}




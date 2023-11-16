import { Injectable } from '@angular/core';

import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Aluno} from "../../shared/aluno";
import {AlunoCrudService} from "../../aluno/aluno-crud.service";
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usuarioAuteticado:boolean = false;
  public alunoLogado: Observable<Aluno> | undefined;
  constructor(private  router: Router, private _alunoService:AlunoCrudService) { }



  fazerLogin(aluno:Aluno){
    let alunoPesquisado = this._alunoService.getAlunoById(aluno.id);
    // @ts-ignore
    if(alunoPesquisado){
      this.usuarioAuteticado = true;
      this.alunoLogado = alunoPesquisado;
      this.router.navigate(['listagem-alunos']);
    }else{
      this.usuarioAuteticado = false;
    }
    console.log(this.usuarioAuteticado)
  }




}




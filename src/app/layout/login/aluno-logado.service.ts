import { Injectable } from '@angular/core';
import {Aluno} from "../../shared/aluno";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AlunoLogadoService {
  url:string;
  private currentStudent:Aluno;
  constructor(private http:HttpClient) {
    this.currentStudent = new Aluno(0,'','','','');
    this.url = 'http://localhost:3000/alunos'
  }

  setCurrentStudent(aluno:Aluno){
    this.currentStudent = aluno;
  }
  getCurrentStudent():Aluno{
    return this.currentStudent
  }



}

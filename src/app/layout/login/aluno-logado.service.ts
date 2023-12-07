import { Injectable } from '@angular/core';
import {Aluno} from "../../shared/modelo/aluno";
import {HttpClient} from "@angular/common/http";
import {Professor} from "../../shared/modelo/professor";

@Injectable({
  providedIn: 'root'
})
export class AlunoLogadoService {
  url:string;
  private currentStudent: Aluno | undefined;
  private currentTeacher: Professor;
  constructor(private http:HttpClient) {
    this.currentTeacher = new Professor('');
    this.url = 'http://localhost:3000/alunos'
  }

  setCurrentStudent(aluno:Aluno){
    this.currentStudent = aluno;
  }

  setCurrentTeacher(profesor:Professor){
    this.currentTeacher = profesor;
  }
  getCurrentStudent():Aluno{
    return <Aluno>this.currentStudent
  }



}

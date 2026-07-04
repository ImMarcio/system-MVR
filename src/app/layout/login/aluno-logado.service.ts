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
    this.url = 'http://localhost:3000/alunos';
    const stored = sessionStorage.getItem('currentStudent');
    if (stored) {
      try {
        this.currentStudent = JSON.parse(stored);
      } catch (e) {
        this.currentStudent = undefined;
      }
    }
  }

  setCurrentStudent(aluno: Aluno | undefined){
    this.currentStudent = aluno;
    if (aluno) {
      sessionStorage.setItem('currentStudent', JSON.stringify(aluno));
    } else {
      sessionStorage.removeItem('currentStudent');
    }
  }

  setCurrentTeacher(profesor:Professor){
    this.currentTeacher = profesor;
  }
  getCurrentStudent(): Aluno {
    return this.currentStudent || new Aluno('');
  }
}

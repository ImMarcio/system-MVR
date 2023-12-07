import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Aluno} from "../shared/modelo/aluno";
import {Observable} from "rxjs";
import {Professor} from "../shared/modelo/professor";

@Injectable({
  providedIn: 'root'
})
export class ProfessorCrudService {

  constructor(private _HttpClient:HttpClient) { }
  private url:string = "http://localhost:3000/professores";
  public alunoEncontrado: Aluno | undefined;
  getProfessores(): Observable<Professor[]>{
    return this._HttpClient.get<Professor[]>(this.url);
  }
  postProfessor(data:Professor){
    return this._HttpClient.post(this.url,data);
  }
  getAlunoById(id:number):Observable<Professor>{
    return this._HttpClient.get<Professor>(`${this.url}/${id}`)
  }
  deleteAluno(id:number){
    return this._HttpClient.delete<Professor>(`${this.url}/${id}`)
  }

}

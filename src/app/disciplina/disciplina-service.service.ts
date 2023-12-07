import { Injectable } from '@angular/core';
import {Aluno} from "../shared/modelo/aluno";
import {Observable} from "rxjs";
import {Disciplina} from "../shared/modelo/disciplina";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DisciplinaServiceService {

  constructor(private _HttpClient:HttpClient) { }

  private url:string = "http://localhost:3000/disciplinas";
  public alunoEncontrado: Aluno | undefined;


  getDisciplinas(): Observable<Disciplina[]>{
    return this._HttpClient.get<Disciplina[]>(this.url);
  }

    postDisciplina(data: Disciplina | undefined){
    return this._HttpClient.post(this.url,data);
  }
  getDisciplinaById(id:string):Observable<Disciplina>{
    return this._HttpClient.get<Disciplina>(`${this.url}/${id}`)
  }


  putDisciplina(disciplina:Disciplina):Observable<Disciplina>{
       return this._HttpClient.put<Disciplina>(`${this.url}/${disciplina.id}`,disciplina)
  }
  deleteDisciplina(id:number){
    return this._HttpClient.delete<Disciplina>(`${this.url}/${id}`)
  }

}

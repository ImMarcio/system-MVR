import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Aluno} from "../shared/aluno";
import {filter, map, Observable, toArray} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AlunoCrudService {
  private alunos: Aluno[][] = [];

  constructor(private _HttpClient:HttpClient) { }
  private url:string = "http://localhost:3000/alunos";
  public alunoEncontrado: Aluno | undefined;
  getAlunos(): Observable<Aluno[]>{
      return this._HttpClient.get<Aluno[]>(this.url);
  }
  postAluno(data:Aluno){
    return this._HttpClient.post(this.url,data);
  }
  getAlunoById(id:number):Observable<Aluno>{
    return this._HttpClient.get<Aluno>(`${this.url}/${id}`)
  }
  deleteAluno(id:number){
    return this._HttpClient.delete<Aluno>(`${this.url}/${id}`)
  }


}


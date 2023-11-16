import { Component } from '@angular/core';
import {AlunoCrudService} from "../aluno-crud.service";
import {Aluno} from "../../shared/aluno";

@Component({
  selector: 'app-manter-aluno',
  templateUrl: './manter-aluno.component.html',
  styleUrls: ['./manter-aluno.component.css']
})
export class ManterAlunoComponent {

  aluno:Aluno = new Aluno(0,'','','','');
constructor(private _alunoService:AlunoCrudService) {
}
enviarAluno(){
  this._alunoService.postAluno(this.aluno)
    .subscribe(
      (response) => {
          console.log('Recurso criado com sucesso',response);
      },
      (error) => {
        console.error('Error ao criar recurso', error);
      }
    )
}

}

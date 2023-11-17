import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";


import {AuthService} from "../login/auth.service";
import {AlunoCrudService} from "../../aluno/aluno-crud.service";
import {Aluno} from "../../shared/aluno";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent {
  public aluno:Aluno = new Aluno(200,'','','','');
  alunos:Array<Aluno> = [];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>
  , private authService:AuthService,  private _alunoService:AlunoCrudService) {}

  ngOnInit(){
    this._alunoService.getAlunos()
      .subscribe(
        retorno => {
          this.alunos = retorno.map(
            item => {
              return new Aluno(
                item.id,
                item.nome,
                item.email,
                item.senha,
                item.matricula
              )
            }
          )
        }
      )


  }
  entrar(): void {
    this.authService.fazerLogin(this.aluno.email, this.aluno.senha)
    this.dialogRef.close();

  }
}

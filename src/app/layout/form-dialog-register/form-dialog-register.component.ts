import { Component } from '@angular/core';
import {Aluno} from "../../shared/aluno";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../login/auth.service";
import {AlunoCrudService} from "../../aluno/aluno-crud.service";

@Component({
  selector: 'app-form-dialog-register',
  templateUrl: './form-dialog-register.component.html',
  styleUrls: ['./form-dialog-register.component.css']
})
export class FormDialogRegisterComponent {
  public aluno:Aluno = new Aluno(300,'','','','');
  alunos:Array<Aluno> = [];

  constructor( public dialogRef: MatDialogRef<FormDialogRegisterComponent>
    , private authService:AuthService,  private _alunoService:AlunoCrudService) {
  }

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
  cancelar(): void {
    this.aluno.id = this.alunos.length + 1;
    this._alunoService.postAluno(this.aluno)
      .subscribe(
        (response) => {
          console.log('Recurso criado com sucesso',response);
        },
        (error) => {
          console.error('Error ao criar recurso', error);
        }
      )
    this.dialogRef.close();

  }
}

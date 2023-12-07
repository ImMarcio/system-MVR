import { Component } from '@angular/core';
import {Aluno} from "../../shared/modelo/aluno";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../login/auth.service";
import {AlunoCrudService} from "../../aluno/aluno-crud.service";
import {AlunoFireStoreService} from "../../shared/services/aluno-fire-store.service";

@Component({
  selector: 'app-form-dialog-register',
  templateUrl: './form-dialog-register.component.html',
  styleUrls: ['./form-dialog-register.component.css']
})
export class FormDialogRegisterComponent {
  public aluno:Aluno = new Aluno('');
  alunos:Array<Aluno> = [];

  constructor( public dialogRef: MatDialogRef<FormDialogRegisterComponent>
    , private authService:AuthService,  private _alunoService:AlunoCrudService, private alunoFire:AlunoFireStoreService,) {
  }

  ngOnInit(){
    this.alunoFire.listar().subscribe(alunosRetornados =>
      {
        this.alunos = alunosRetornados;
      }
    );


  }
  cadastrar(): void {
    this.alunoFire.inserir(this.aluno)
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

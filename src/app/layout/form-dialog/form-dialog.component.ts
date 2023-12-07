import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";


import {AuthService} from "../login/auth.service";
import {AlunoCrudService} from "../../aluno/aluno-crud.service";
import {Aluno} from "../../shared/modelo/aluno";
import {Professor} from "../../shared/modelo/professor";
import {AlunoFireStoreService} from "../../shared/services/aluno-fire-store.service";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent {
  public user: Aluno  = new Aluno("") ;
  alunos:Array<Aluno> = [];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>
  , private authService:AuthService,  private _alunoService:AlunoCrudService, private alunoFire:AlunoFireStoreService) {}

  ngOnInit(){
    this.alunoFire.listar().subscribe(alunosRetornados =>
      {
        this.alunos = alunosRetornados;
      }
    );

  }
  entrar(): void {
    // @ts-ignore
    this.authService.fazerLogin(this.user.email, this.user.senha)
    this.dialogRef.close();


  }
}

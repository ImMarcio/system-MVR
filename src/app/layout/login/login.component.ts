import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormDialogComponent} from "../form-dialog/form-dialog.component";


import {AuthService} from "./auth.service";
import {ALUNOMAIN} from "../../shared/ALUNO-MAIN";
import {Aluno} from "../../shared/aluno";
import {HttpClient} from "@angular/common/http";
import {FormDialogRegisterComponent} from "../form-dialog-register/form-dialog-register.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private mostrarLogin:boolean = true;

  alunoPrincipal:Aluno = ALUNOMAIN;

  constructor(public dialog: MatDialog, private authService: AuthService, private _HttpClient:HttpClient) {

  }
  ngOnOnit(){

  }
  openLive(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500px',
      height: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.mostrarLogin = false;
  }
  openRegister(): void {
    const dialogRef = this.dialog.open(FormDialogRegisterComponent, {
      width: '500px',
      height: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.mostrarLogin = false;
  }


}

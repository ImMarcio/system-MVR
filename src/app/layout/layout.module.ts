import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatExpansionModule} from "@angular/material/expansion";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {DisciplinaModule} from "../disciplina/disciplina.module";
import {MatCardModule} from "@angular/material/card";
import { LoginComponent } from './login/login.component';

import {MatDialogModule} from '@angular/material/dialog';

import { FormDialogComponent } from './form-dialog/form-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import { FormDialogRegisterComponent } from './form-dialog-register/form-dialog-register.component';

@NgModule({
  declarations: [
    MenuComponent,
    LoginComponent,
    FormDialogComponent,
    FormDialogRegisterComponent
  ],
    exports: [
        MenuComponent,
        LoginComponent
    ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    RouterLink,
    MatMenuModule,
    DisciplinaModule,
    MatCardModule,
    RouterOutlet,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule


  ]
})
export class LayoutModule { }

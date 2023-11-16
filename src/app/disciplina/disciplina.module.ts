import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisciplinaListagemComponent } from './disciplina-listagem/disciplina-listagem.component';
import { DisciplinaManterComponent } from './disciplina-manter/disciplina-manter.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
    declarations: [
        DisciplinaListagemComponent,
        DisciplinaManterComponent
    ],
  exports: [
    DisciplinaManterComponent,
    DisciplinaListagemComponent
  ],
    imports: [
        CommonModule,
        MatCardModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class DisciplinaModule { }

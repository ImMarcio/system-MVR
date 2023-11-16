import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrarDisciplinaComponent } from './entrar-disciplina/entrar-disciplina.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { ListarDisciplinasMatriculadoComponent } from './listar-disciplinas-matriculado/listar-disciplinas-matriculado.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

import {HttpClientModule} from "@angular/common/http";
import { ListagemAlunoComponent } from './listagem-aluno/listagem-aluno.component';
import { ManterAlunoComponent } from './manter-aluno/manter-aluno.component';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    EntrarDisciplinaComponent,
    ListarDisciplinasMatriculadoComponent,
    ListagemAlunoComponent,
    ManterAlunoComponent
  ],
  exports: [
    ListagemAlunoComponent,
    ManterAlunoComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatInputModule
  ]
})
export class AlunoModule { }

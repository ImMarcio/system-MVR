import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LayoutModule} from "./layout/layout.module";
import {AlunoModule} from "./aluno/aluno.module";
import {ProfessorModule} from "./professor/professor.module";
import {DisciplinaModule} from "./disciplina/disciplina.module";
import {AuthService} from "./layout/login/auth.service";
import {FirestoreMvrModule} from "./shared/firestore-mvr/firestore-mvr.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AlunoModule,
    ProfessorModule,
    DisciplinaModule,
    FirestoreMvrModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

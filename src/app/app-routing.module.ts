import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DisciplinaManterComponent} from "./disciplina/disciplina-manter/disciplina-manter.component";
import {DisciplinaListagemComponent} from "./disciplina/disciplina-listagem/disciplina-listagem.component";
import {MenuComponent} from "./layout/menu/menu.component";
import {EntrarDisciplinaComponent} from "./aluno/entrar-disciplina/entrar-disciplina.component";
import {ListarDisciplinasMatriculadoComponent} from "./aluno/listar-disciplinas-matriculado/listar-disciplinas-matriculado.component";
import {LoginComponent} from "./layout/login/login.component";
import {ListagemAlunoComponent} from "./aluno/listagem-aluno/listagem-aluno.component";

const routes: Routes = [
  {path: 'menu', component: MenuComponent},
  {path: 'listagem-alunos', component: ListagemAlunoComponent},
  {path: 'cadastro-disciplina', component: DisciplinaManterComponent},
  {path: 'listagem-disciplina', component: DisciplinaListagemComponent},
  {path: 'entrar-disciplina', component: EntrarDisciplinaComponent},
  {path: 'listar-disciplinas-matriculado', component: ListarDisciplinasMatriculadoComponent},
  {path: '', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


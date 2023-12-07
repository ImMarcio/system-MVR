import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";

import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Professor} from "../modelo/professor";

@Injectable({
  providedIn: 'root'
})
export class ProfessorFireStoreService {
  colecaoProfessores: AngularFirestoreCollection<Professor>;
  NOME_COLECAO = "professores"
  constructor(private afs: AngularFirestore) {
    this.colecaoProfessores = afs.collection(this.NOME_COLECAO)

  }

  listar(): Observable<Professor[]> {
    // usando options para idField para mapear o id gerado pelo firestore para o campo id de usuário
    return this.colecaoProfessores.valueChanges({idField: 'id'});
  }
  inserir(professor: Professor): Observable<object> {
    // removendo id pois ele está undefined, já que um novo usuário
    // @ts-ignore
    delete professor.id;
    // Object.assign({}, professor) é usado para passar um objeto json puro. Não se aceita passar um objeto customizado
    // o from transforma uma promise num Observable, para mantermos a assinatura similar ao do outro service
    return from(this.colecaoProfessores.add(Object.assign({}, professor)));
  }


  apagar(disciplina:Professor): Observable<void> {
    return from(this.colecaoProfessores.doc(disciplina.id).delete());
  }


  pesquisarPorId(id: string | undefined): Observable<Professor> {
    // como o objeto retornado pelo get é um DocumentData, e não um usuário, transformamos a partir de um pipe e mapeamos de um document
    //  para o tipo usuário
    return this.colecaoProfessores.doc(id).get().pipe(map(document => new Professor(document.id, document.data())));
  }


  atualizar(professor: Professor): Observable<void> {
    const id = professor.id;
// removendo id pois não vamos guardar nos dados do documento, mas sim usar apenas como id para recuperar o documento

    delete professor.id;
    return from(this.colecaoProfessores.doc(id).update(Object.assign({}, professor)));


  }
}

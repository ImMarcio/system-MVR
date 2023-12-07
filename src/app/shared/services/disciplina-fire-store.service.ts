import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";

import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";
import { Disciplina } from '../modelo/disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaFireStoreService {
  colecaoDisciplinas: AngularFirestoreCollection<Disciplina>;
  NOME_COLECAO = "disciplinas"
  constructor(private afs: AngularFirestore) {
    this.colecaoDisciplinas = afs.collection(this.NOME_COLECAO)

  }

  listar(): Observable<Disciplina[]> {
    // usando options para idField para mapear o id gerado pelo firestore para o campo id de usuário
    return this.colecaoDisciplinas.valueChanges({idField: 'id'});
  }
  inserir(disciplina: Disciplina): Observable<object> {
    // removendo id pois ele está undefined, já que um novo usuário
    // @ts-ignore
    delete disciplina.id;
    // Object.assign({}, disciplina) é usado para passar um objeto json puro. Não se aceita passar um objeto customizado
    // o from transforma uma promise num Observable, para mantermos a assinatura similar ao do outro service
    return from(this.colecaoDisciplinas.add(Object.assign({}, disciplina)));
  }


  apagar(disciplina:Disciplina): Observable<void> {
    return from(this.colecaoDisciplinas.doc(disciplina.id).delete());
  }


  pesquisarPorId(id: string): Observable<Disciplina> {
    // como o objeto retornado pelo get é um DocumentData, e não um usuário, transformamos a partir de um pipe e mapeamos de um document
    //  para o tipo usuário
    return this.colecaoDisciplinas.doc(id).get().pipe(map(document => new Disciplina(document.id, document.data())));
  }


    atualizar(disciplina: Disciplina): Observable<void> {
    // @ts-ignore
      const id = disciplina.id;
// removendo id pois não vamos guardar nos dados do documento, mas sim usar apenas como id para recuperar o documento

    // @ts-ignore
      delete disciplina.id;
    return from(this.colecaoDisciplinas.doc(id).update(Object.assign({}, disciplina)));


  }
}

import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {map} from 'rxjs/operators';
import {Aluno} from "../modelo/aluno";
@Injectable({
  providedIn: 'root'
})
export class AlunoFireStoreService {
  colecaoAlunos: AngularFirestoreCollection<Aluno>;
  NOME_COLECAO = "alunos"
  constructor(private afs: AngularFirestore) {
    this.colecaoAlunos = afs.collection(this.NOME_COLECAO)

  }

  listar(): Observable<Aluno[]> {
    // usando options para idField para mapear o id gerado pelo firestore para o campo id de usuário
    return this.colecaoAlunos.valueChanges({idField: 'id'});
  }
  inserir(aluno: Aluno): Observable<object> {
    // removendo id pois ele está undefined, já que um novo usuário
    // @ts-ignore
    delete aluno.id;
    // Object.assign({}, aluno) é usado para passar um objeto json puro. Não se aceita passar um objeto customizado
    // o from transforma uma promise num Observable, para mantermos a assinatura similar ao do outro service
    return from(this.colecaoAlunos.add(Object.assign({}, aluno)));
  }


  apagar(id: string): Observable<void> {
    return from(this.colecaoAlunos.doc(id).delete());
  }


  pesquisarPorId(id: string): Observable<Aluno> {
    // como o objeto retornado pelo get é um DocumentData, e não um usuário, transformamos a partir de um pipe e mapeamos de um document
    //  para o tipo usuário
    return this.colecaoAlunos.doc(id).get().pipe(map(document => new Aluno(document.id, document.data())));
  }


  atualizar(aluno: Aluno): Observable<void> {
    const id = aluno.id;
// removendo id pois não vamos guardar nos dados do documento, mas sim usar apenas como id para recuperar o documento

    delete aluno.id;
    return from(this.colecaoAlunos.doc(id).update(Object.assign({}, aluno)));


  }

}

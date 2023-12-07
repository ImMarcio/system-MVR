import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFireModule} from '@angular/fire/compat';
import {firebaseConfig} from "../../../firebase.config";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule

  ]
})
export class FirestoreMvrModule { }

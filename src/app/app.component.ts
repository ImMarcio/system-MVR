import { Component } from '@angular/core';

import {AuthService} from "./layout/login/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'system-mvr';
  mostrarMenu:boolean = false;
  mostrarLogin:boolean = true;
  constructor(private _auth:AuthService) {

  }

  ngOnInit(){
    this.mostrarMenu = this._auth.usuarioAuteticado;
    if(this.mostrarMenu){
      this.mostrarLogin = false;
    }
    console.log('dentro do app ' + this.mostrarMenu)
  }


}

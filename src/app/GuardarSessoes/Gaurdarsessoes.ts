import { Injectable } from '@angular/core';
//import { MatSnackBar } from '@angular/material/snack-bar'
import { CampoSessoes } from 'src/Models/CampoSessoes';

@Injectable({
  providedIn: 'root'
})

export class GuardarSessoes {
  constructor(//private _snackBar: MatSnackBar 
  ) { }



  guardarSessao(Dadossessao: CampoSessoes) {
    localStorage.setItem("Sessao", JSON.stringify(Dadossessao))
  }

  obterSessao() {

    const dataGuardar = localStorage.getItem("Sessao");

    const utilizador = JSON.parse(dataGuardar!);
    return utilizador;
  }

  eliminarSessao() {
    localStorage.removeItem("Sessao");
  }

  isAutenticated() {
    return (localStorage.getItem("Sessao")) !== null ? true : false;
  }




  
  

}
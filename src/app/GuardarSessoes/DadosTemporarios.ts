import { Injectable } from '@angular/core';
import { Alauxiliar } from 'src/Models/Alauxiliar';
import { diarioClasses } from 'src/Models/DiarioClass';

@Injectable({
  providedIn: 'root'
})

export class DadosTemporarios {
  constructor(//private _snackBar: MatSnackBar 
  ) { }

  guardarSessao(DadosTemp: diarioClasses) {
    localStorage.setItem("Dtemp", JSON.stringify(DadosTemp))
  }

  obterSessao() {

    const dataGuardar = localStorage.getItem("Dtemp");

    const utilizador = JSON.parse(dataGuardar!);
    return utilizador;
  }

  eliminarSessao() {
    localStorage.removeItem("Dtemp");
  }

  isAutenticated() {
    return (localStorage.getItem("Dtemp")) !== null ? true : false;
  }




  guardarSessaoauxiliar(DadosTemp: Alauxiliar) {
    localStorage.setItem("Dtempauxiliar", JSON.stringify(DadosTemp))
  }

  obterSessaoauxiliar() {

    const dataGuardar = localStorage.getItem("Dtempauxiliar");

    const utilizador = JSON.parse(dataGuardar!);
    return utilizador;
  }

  eliminarSessaoauxiliar() {
    localStorage.removeItem("Dtempauxiliar");
  }

  isAutenticatedauxiliar() {
    return (localStorage.getItem("Dtempauxiliar")) !== null ? true : false;
  }

}
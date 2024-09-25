import { Injectable } from '@angular/core';
import { Alauxiliar } from 'src/Models/Alauxiliar';
import { diarioClasses } from 'src/Models/DiarioClass';
import { Estudante } from 'src/Models/Estudante';

@Injectable({
  providedIn: 'root'
})

export class Estudantestemp {
  constructor(//private _snackBar: MatSnackBar 
  ) { }

  guardarSessao(DadosEstund: Estudante) {
    localStorage.setItem("Estud", JSON.stringify(DadosEstund))
  }

  obterSessao() {

    const dataGuardar = localStorage.getItem("Estud");

    const utilizador = JSON.parse(dataGuardar!);
    return utilizador;
  }

  eliminarSessao() {
    localStorage.removeItem("Estud");
  }

  isAutenticated() {
    return (localStorage.getItem("Estud")) !== null ? true : false;
  }




//   guardarSessaoauxiliar(DadosTemp: Estudante) {
//     localStorage.setItem("Dtempauxiliar", JSON.stringify(DadosTemp))
//   }

//   obterSessaoauxiliar() {

//     const dataGuardar = localStorage.getItem("Dtempauxiliar");

//     const utilizador = JSON.parse(dataGuardar!);
//     return utilizador;
//   }

//   eliminarSessaoauxiliar() {
//     localStorage.removeItem("Dtempauxiliar");
//   }

//   isAutenticatedauxiliar() {
//     return (localStorage.getItem("Dtempauxiliar")) !== null ? true : false;
//   }

}
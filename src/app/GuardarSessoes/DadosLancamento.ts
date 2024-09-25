import { Injectable } from '@angular/core';
import { CampoSessoes } from 'src/Models/CampoSessoes';
import { diarioClasses } from 'src/Models/DiarioClass';
import { Estudante } from 'src/Models/Estudante';
import { Turmanota1 } from 'src/Models/Turma';

@Injectable({
  providedIn: 'root'
})

export class DadosLancamento {
  constructor(//private _snackBar: MatSnackBar 
  )
  
  { 
    
  }

  guardarSessao(LancaTemp: Estudante) {
    localStorage.setItem("LanTemp", JSON.stringify(LancaTemp))
  }

  obterSessao() {

    const dataGuardar = localStorage.getItem("LanTemp");

    const utilizador = JSON.parse(dataGuardar!);
    return utilizador;
  }

  eliminarSessao() {
    localStorage.removeItem("LanTemp");
  }

  isAutenticated() {
    return (localStorage.getItem("LanTemp")) !== null ? true : false;
  }


}
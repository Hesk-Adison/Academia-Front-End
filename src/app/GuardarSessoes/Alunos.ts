import { Injectable } from '@angular/core';
//import { MatSnackBar } from '@angular/material/snack-bar'
import { CampoSessoes } from 'src/Models/CampoSessoes';

@Injectable({
  providedIn: 'root'
})

export class Alunossessao {
  constructor(//private _snackBar: MatSnackBar 
  ) { }



  AlunoguardarSessao(DadosAlunosessao: CampoSessoes) {
    localStorage.setItem("Sessao", JSON.stringify(DadosAlunosessao))
  }

  AlunoobterSessao() {

    const dataGuardar = localStorage.getItem("Sessao");

    const utilizador = JSON.parse(dataGuardar!);
    return utilizador;
  }

  alunoeliminarSessao() {
    localStorage.removeItem("Sessao");
  }

  alunoisAutenticated() {
    return (localStorage.getItem("Sessao")) !== null ? true : false;
  }




  
  

}
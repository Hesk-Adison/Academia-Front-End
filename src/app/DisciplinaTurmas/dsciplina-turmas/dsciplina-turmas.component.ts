import { Component, OnInit } from '@angular/core';
import { clTurmaClass } from 'src/Models/ClTurma';
import { Pedisc } from 'src/Models/Pedisc';
import { camposCl } from 'src/Models/camposCl';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';

export interface PeriodicElement {
  name: string;
  position: string;
  

}
export interface PeriodicElement1 {
  name: string;
  position: number
  weight: string;
  ano: string;
  sala: string

}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: '1', name: 'Matematica 1' },
  {position: '2', name: 'Portugues 2' },


];

const ELEMENT_DATA1: PeriodicElement1[] = [
  {position: 1, name: 'LICENCIATURA EM ENSINO', weight: 'LIC.ENSINO DE HISTORIA.2023/1', ano: '2023/1', sala:'' },
  {position: 2, name: 'LICENCIATURA EM ENSINO', weight: 'LIC.ENSINO DE HISTORIA.2023/1', ano: '2023/1', sala:'' },
  {position: 3, name: 'LICENCIATURA EM ENSINO', weight: 'LIC.ENSINO DE HISTORIA.2023/1', ano: '2023/1', sala:'' },
  {position: 4, name: 'LICENCIATURA EM ENSINO', weight: 'LIC.ENSINO DE HISTORIA.2023/1', ano: '2023/1', sala:'' },
  {position: 5, name: 'LICENCIATURA EM ENSINO', weight: 'LIC.ENSINO DE HISTORIA.2023/1', ano: '2023/1', sala:'' },

];
@Component({
  selector: 'app-dsciplina-turmas',
  templateUrl: './dsciplina-turmas.component.html',
  styleUrls: ['./dsciplina-turmas.component.scss']
})
export class DsciplinaTurmasComponent  implements OnInit{
  disciplina:Pedisc[]=[]
  turma: clTurmaClass[]=[]

  displayedColumns: string[] = ['position', 'name'];
  dataSource = ELEMENT_DATA;
  displayedColumns1: string[] = ['position', 'name', 'weight', 'ano', 'sala'];
  dataSource1 = ELEMENT_DATA1;

  constructor(
    private guardarsessoes: GuardarSessoes
  ) {}

  ngOnInit(): void {
    this.turma = this.guardarsessoes.obterSessao().clTurmaClass
    this.disciplina = this.guardarsessoes.obterSessao().pedisc
    
    console.log(this.disciplina)
    console.log(this.turma[0].codsala)
   
  }

  colunas=['sigla','disciplina']  
  colunas1=['curso','turma', 'ano', 'sala']  
}

import { Component, OnInit } from '@angular/core';
import { CampoSessoes } from 'src/Models/CampoSessoes';
import { clTurmaClass } from 'src/Models/ClTurma';
import { Pe } from 'src/Models/Pe';
import {  pecontra } from 'src/Models/Pecontra';
import { Pedisc } from 'src/Models/Pedisc';
import { Pedoc } from 'src/Models/Pedoc';
import { Pefam } from 'src/Models/Pefam';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';



export interface PeriodicElement4 {

  id: number,
  numero: string
  local:string,
  tipo:string,
  emissao:string
  validade: string

}

export interface PeriodicElement5 {
  name: string;
  position: string;
  weight: string;
  nuit: number

}

export interface PeriodicElement6 {
  name: string;
  position: string;
  weight: string;

}


const ELEMENT_DATA4: PeriodicElement4[] = [
  {id: 1, tipo: 'LEH-A038', numero: 'LIC.ENSINO DE MATE.', emissao:'2023/1', validade:'', local:'SEM I' },

];

const ELEMENT_DATA5: PeriodicElement5[] = [
  {position: '', name: '', weight: '', nuit: 1 },

];

const ELEMENT_DATA6: PeriodicElement6[] = [
  {position: 'Moçambique', name: '10/06/1997', weight: 'Masculino', },

];


@Component({
  selector: 'app-perfil-prof',
  templateUrl: './perfil-prof.component.html',
  styleUrls: ['./perfil-prof.component.scss']
})
export class PerfilProfComponent  implements OnInit{
   
  data: Pe[]=[];
  Documentos: Pedoc[]=[]
  DadosGerais: CampoSessoes[]=[];
  Familia: Pefam[]=[]
  Contrato: pecontra[]=[]
  disciplina: Pedisc[]=[]

 
  displayedColumns4: string[] = ['id', 'tipo', 'numero', 'emissao', 'validade', 'local'];
  dataSource4 = ELEMENT_DATA4;

  displayedColumns5: string[] = ['nuit','weight', 'name', 'position',  ];
  dataSource5 = ELEMENT_DATA5;
 
  displayedColumns6: string[] = ['position', 'name', 'weight'];
  dataSource6 = ELEMENT_DATA6;


 
  constructor(
    private guardarsessoes: GuardarSessoes,
   
    
  ) { }

  ngOnInit(): void {


  
    this.data = this.guardarsessoes.obterSessao().pe
    this.DadosGerais = this.guardarsessoes.obterSessao()
    this.Documentos = this.guardarsessoes.obterSessao().pedoc
    this.Familia = this.guardarsessoes.obterSessao().pefam
    this.Contrato =  this.guardarsessoes.obterSessao().pecontraClass    
 
  }
  
  

  colunas=['nome','numero','Estado']  
  colunas1=['morada','provincia','email', 'nuit']  
  colunas2=['tipo', 'emissao', 'validade', 'local']  
  colunas3=['nome','telefone', 'parentesco', 'email']  
  colunas4=['codigo','turma', 'ano', 'sala','periodo']  
  colunas5=['contacto','inicio','termino'] 





veja(){

}
}

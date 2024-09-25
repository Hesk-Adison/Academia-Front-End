import { Component, OnInit } from '@angular/core';
import { CampoSessoes } from 'src/Models/CampoSessoes';
import { Cldocs } from 'src/Models/Cldocs';
import { Cls } from 'src/Models/Cls';
import { camposCl } from 'src/Models/camposCl';
import { dividasalunoss } from 'src/Models/dividasalunoss';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';

export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;

}

export interface DadosGerais {
  morada: string;
  localidade: string;
  fax: string;
  email: string;
  celular:string;
  nuit:number;
  estadocivil:string;
  religiao:string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'Hesk Adilson Fernando', name: '123234', weight: 'Activo', },

];

const dadosgerais: DadosGerais[]=[
  {morada:'Matola', localidade:'Machava', fax:'status', email:'string@gmail.cm', celular: '8678990009', nuit:23685443, estadocivil:'solteriro', religiao:'cqwhsdh' }
  
]


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


alunos: Cls[]=[]
alunoDocs: Cldocs[]=[]
alunosDivida: dividasalunoss[]=[]


  DadosColunas: string[]=['morada','localidade','fax', 'email', 'celular','nuit','estadocivil','religiao']
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;
  dataSource1 = dadosgerais;

  constructor(
    private guardarsessoes: GuardarSessoes
  ){}

  ngOnInit(): void {

  
    this.alunos = this.guardarsessoes.obterSessao().camposcl.cls
   this.alunoDocs = this.guardarsessoes.obterSessao().camposcl.cldocs
    this.alunosDivida =this.guardarsessoes.obterSessao().camposcl.dividasalunos

   const dadoGerais = this.guardarsessoes.obterSessao()


   
  }

  calculationtotalpendente(){ 

    return  this.alunosDivida.map(t => Number(t.valorreg)).
      reduce((acc, value) => acc + value, 0); 
      }
  colunas=['morada','localidade', 'fax','email', 'celular', 'telefone','nuit', 'religiao', 'estadocivil']  
  colunas1=['nome','numero', 'estado']  
  colunas2=['tipo','numero', 'emissao', 'validade', 'local']
  colunas3=['pais','provincia', 'distrito', 'datanasc', 'sexo']
  colunas4=['entidade','referencia', 'descricao', 'dataemis', 'datalim', 'valor']
 

}

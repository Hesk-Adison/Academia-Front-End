import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Alauxiliar } from 'src/Models/Alauxiliar';
import { diarioClasses } from 'src/Models/DiarioClass';
import { DadosTemporarios } from 'src/app/GuardarSessoes/DadosTemporarios';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';

@Component({
  selector: 'app-escolhertipoteste',
  templateUrl: './escolhertipoteste.component.html',
  styleUrls: ['./escolhertipoteste.component.scss']
})
export class EscolhertipotesteComponent implements OnInit{

  Diaro: diarioClasses[]=[];
  displayedColumns: string[] =[];
  dataSource: diarioClasses[]=[]
  Disciplina=''
  listaEstadoCivil: diarioClasses[] = [
    { descurso: '', etapa: '', codigo:'',disciplina:'',cursostamp:'',turmastamp:'',ststamp:''},
  ];

  constructor(
    private modalActual: MatDialogRef<EscolhertipotesteComponent>,
    // @Inject(MAT_DIALOG_DATA)
    //  public dadosMancebo: Estudante,
    private guararsessoes: GuardarSessoes,
    private dadostemp : DadosTemporarios,
    private router: Router
  ) {}
  
ngOnInit(): void {
  this.Diaro = this.guararsessoes.obterSessao().diarioClasses;  
  this.Disciplina=this.guararsessoes.obterSessao().diarioClasses[0].disciplina
  console.log( this.guararsessoes.obterSessao().diarioClasses[0].descurso)
  this.displayedColumns= ['descurso',  'accoes' ];
   this.dataSource = this.listaEstadoCivil;

}

carrega(desc:string) {  
  this.router.navigate(['Adim/Parametrosvaliacao', {id : desc}]);
}

closeDialog(){
  this.modalActual.close("true");

}

Result(numer: string){
  if(numer=='2'){
    this.router.navigate(['/Adim/media'])
  }
  else{
    this.router.navigate(['/Adim/aproveita'])
  }
}

}
export interface PeriodicElement { 
  descurso: string;
  accoes: string;
 
}
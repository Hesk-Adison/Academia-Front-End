import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Estudante } from 'src/Models/Estudante';
import { TestesComponent } from 'src/app/Teste/testes/testes.component';
import { DetalhesComponent } from '../../ModalDetalhes/detalhes/detalhes.component';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { CampoSessoes } from 'src/Models/CampoSessoes';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-informacoes',
  templateUrl: './informacoes.component.html',
  styleUrls: ['./informacoes.component.scss']
})
export class InformacoesComponent implements OnInit{

Dados: CampoSessoes[]=[]
totalAluno: number=0
totalProfessor: number=0
totalRh: number=0
totalCursos: number=0
totalTurma: number =0
elemento: any;
canvas:any;
percent: number=0
resp : number=0
leva: any

  constructor(
    private guardarsessoes: GuardarSessoes,
  
    
  ) { }

  @ViewChild("Grafico", {static:true}) meuGrafico!:ElementRef  ;

  
ngOnInit(): void {
    
  // new Chart(this.meuGrafico.nativeElement, {

  //   type:'line',
  //   data:{
  //     labels:['turma1', 'turma2', 'turma3', 'turma4'],
  //     datasets: [
  //       {
  //         data:[12, 29, 30, 40]
  //       }
  //     ]
  //   }
  // }
    
    
    // )
    this.Dados = this.guardarsessoes.obterSessao().CampoSessoes
   this.totalAluno = this.guardarsessoes.obterSessao().totalalunos
   this.totalProfessor=this.guardarsessoes.obterSessao().totalprofesso
   this.totalRh = this.guardarsessoes.obterSessao().totalRh
  this.totalCursos =this.guardarsessoes.obterSessao().totalcurso
  this.totalTurma = this.guardarsessoes.obterSessao().totalTurmas

   

  this.Pecentagem()

}

Pecentagem(){
  var profesor= 3000
  var data = this.totalAluno


 this.resp =((this.totalAluno * 100)/3000)
 this.percent= parseFloat(this.resp.toFixed(2))

 this.leva = (this.percent + '%')

  
  
}





// click(){
//  // this. abrirDialogo1()
//   console.log(  `Aqui`)
// }


//   dialog: any;
//   abrirDialogo1(mancebo:Estudante){
//     this.dialog.open(DetalhesComponent,{
//     //  height:'85%',
//       //width:'100%',
//       disableClose:true,
//       data:mancebo,
//       autoFocus:false,
//       enterAnimationDuration:'1000ms',
//       exitAnimationDuration: '1000ms', 
//      })
     
//     //  .afterClosed().subscribe(resultado =>{})
  
//   }
}

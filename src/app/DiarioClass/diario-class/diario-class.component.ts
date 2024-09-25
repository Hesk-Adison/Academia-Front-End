import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { finalize, window } from 'rxjs';
import { Alauxiliar } from 'src/Models/Alauxiliar';
import { CampoSessoes } from 'src/Models/CampoSessoes';
import { diarioClasses } from 'src/Models/DiarioClass';
import { Estudante, ReportPauta } from 'src/Models/Estudante';
import { Turmanota1 } from 'src/Models/Turma';
import { Trabalho } from 'src/Models/trabalho';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { DadosTemporarios } from 'src/app/GuardarSessoes/DadosTemporarios';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { gradel } from 'src/app/Interfaces/Grade/gradel';
import { carregardados } from 'src/app/Interfaces/carrgardados';
import { VerTrabalhoComponent } from 'src/app/Portal-do-Estudante/trabalho/ver-trabalho/ver-trabalho.component';
import { EscolhertipotesteComponent } from 'src/app/Teste/EscolherTipo/escolhertipoteste/escolhertipoteste.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-diario-class',
  templateUrl: './diario-class.component.html',
  styleUrls: ['./diario-class.component.scss']
})


export class DiarioClassComponent implements OnInit{

  Diaro: diarioClasses[]=[];
  displayedColumns: string[] =[];
  dataSource: diarioClasses[]=[]
  isSpinnerDisplayed=false;
  listCurso:Turmanota1[]=[];
  estudante!:Estudante;
  dataListaCurso= new MatTableDataSource(this.listCurso);
  carregar!: carregardados;
  anosem1: string=''
  curso1: string=''
  cusrsostamp1: string=''
  turmastamp1: string=''
  ststamp1: string=''
  disciplina1: string=''
  turma1: string=''

  constructor(
    private guararsessoes: GuardarSessoes,
    private dadostemp : DadosTemporarios,

    private router: Router,
    private dialog: MatDialog,
    private lancaTemp: DadosLancamento,
    private _loginservice: LoginServiceService,
   private TurmaotaService: TurmaNotaService
  ) {
    //this.Dadostemp1();
  }
ngOnInit(): void {



  if(!this.guararsessoes.isAutenticated()){
    Swal.fire('Erro',`Nao tens permissao para ver este formulario!`,'error');
    return;
  }
  const Dados = this.guararsessoes.obterSessao();
  if(Dados.tipo==2){

    this.Diaro = this.guararsessoes.obterSessao().diarioClasses;



    this.displayedColumns= ['descurso', 'etapa', 'codigo', 'disciplina', 'accoes' ];
     this.dataSource = this.Diaro;

    // this.dataListaCurso.data=this.estudante.turmanota;
    var teste = this.lancaTemp.obterSessao().turmanota
    this.dataListaCurso.data = teste



  }else{

    Swal.fire('Erro',`Nao tens permissao para ver este formulario!`,'error');
  }



}


Dadostemp(diaioClass : diarioClasses){
  this.dadostemp.eliminarSessao()
  this.dadostemp.guardarSessao(diaioClass);
  this.Dadostemp1111()


  
}

DadosTurma(diaioClass1 : diarioClasses){
  this.dadostemp.eliminarSessao()
  this.dadostemp.guardarSessao(diaioClass1);


}


abrirDialogo(){

  this.dialog.open(EscolhertipotesteComponent,{
    disableClose:true,
   // data:mancebo,
     width:'40%',

    autoFocus:false,
    enterAnimationDuration:'1000ms',
    exitAnimationDuration: '1000ms',
  }).afterClosed().subscribe(resultado =>{})

}

reloadPage() {
  location.reload();
}



// Dadostemp1(){

//   if (this.dadostemp.obterSessao !== null){
//     this.curso1 = this.dadostemp.obterSessao().descurso;
//     this.cusrsostamp1 =this.dadostemp.obterSessao().cursostamp;
//     this.turmastamp1 = this.dadostemp.obterSessao().turmastamp
//     this.disciplina1= this.dadostemp.obterSessao().disciplina;
//     this.ststamp1= this.dadostemp.obterSessao().ststamp
//     this.turma1 = this.dadostemp.obterSessao().codigo;
//     this.anosem1 = this.dadostemp.obterSessao().anosem;
//   }
//   else{
//     Swal.fire('Erro!', "O professor nao possui disciplinas do ano Corente", 'error');
//   }



//    this.carregar= {
//      turmastamp: this.turmastamp1,
//      anosem: this.anosem1,
//      turma: this.turma1,
//      curso: this.curso1,
//      cursostamp: this.cusrsostamp1,
//      disciplina: this.disciplina1,
//      ststamp: this.ststamp1,
//    }
//   this.TurmaotaService.ChamarAlunos(this.carregar).subscribe(
//     (data)=>
//       {

//         this.lancaTemp.eliminarSessao();
//     this.lancaTemp.guardarSessao(data.dados);
//     this.estudante=data.dados


//      })


// }

Trabalho() {


  this.carregar= {
    turmastamp: this.turmastamp1,
    anosem: this.anosem1,
    turma: this.turma1,
    curso: this.curso1,
    cursostamp: this.cusrsostamp1,
    disciplina: this.disciplina1,
    ststamp: this.ststamp1,
  }


  var professorstamp= '';
  var alunoestamp= '';
 var rhstamp= '';
 const Dados = this.guararsessoes.obterSessao();
 if(Dados.tipo==1){
   //Aluno
   alunoestamp=Dados.camposcl.cls[0].clstamp;
   rhstamp=alunoestamp;
 }
 if(Dados.tipo== 2){
   //Professor
   professorstamp=Dados.pe[0].pestamp;
   rhstamp=professorstamp;
 }

     if(Dados.tipo==1){
      //Aluno
      alunoestamp=Dados.camposcl.cls[0].clstamp;
      rhstamp=alunoestamp;
     this.router.navigate(['AdimEstud/Trabalho', {id : ` and  dg.ststamp='${this.carregar.ststamp}'`,
     disciplina:this.carregar.ststamp,etapa:this.carregar.anosem,descricao:this.carregar.disciplina}])
    }
    if(Dados.tipo== 2){
      //Professor
      professorstamp=Dados.pe[0].pestamp;
      rhstamp=professorstamp;
     this.router.navigate(['Adim/Trabalho', {id : ` and  dg.ststamp='${this.carregar.ststamp}'`,
     disciplina:this.carregar.ststamp,etapa:this.carregar.anosem,descricao:this.carregar.disciplina}])
    }
    if(Dados.tipo== 3){
      //Rh
      //alunoestamp=Dados.camposcl.cls[0].clstamp;
    }
}



Imprimir(origem:string) {



  if(this.dataListaCurso.data.length==0){
    Swal.fire('Erro',`A grelha de alunos não pode estar vazia, por favor!`,'error');
    return;
  }

const dadosMancebo=this.dadostemp.obterSessao();
  this.estudante= {
    turmastamp: dadosMancebo == null ? '' : this.dadostemp.obterSessao().turmastamp,
    anosem: dadosMancebo == null ? '' : this.dadostemp.obterSessao().anosem,
    turma: dadosMancebo == null ? '' : this.dadostemp.obterSessao().codigo,
    curso: dadosMancebo == null ? '' : this.dadostemp.obterSessao().descurso,
    cursostamp: dadosMancebo == null ? '' :this.dadostemp.obterSessao().cursostamp,
    disciplina: dadosMancebo == null ? '' :this.dadostemp.obterSessao().disciplina,
    ststamp: dadosMancebo == null ? '' : this.dadostemp.obterSessao().ststamp,
    turmanota: this.dataListaCurso.data,
  }



   let rep:ReportPauta= {
     estudante: this.estudante,
     filename: '',
     origem: origem,
     xmlstring: ''
   }
  this.isSpinnerDisplayed = true;
  this.TurmaotaService.GerarRelatorioPauta(rep).subscribe({
    next: (data) => {
      if (data.sucesso) {


        if (data.dados != null) {
          const filename = data.dados.filename;
          try {
            if (filename != null && filename.length > 0 && filename != '' && filename != 'vazio') {


             // this._loginservice.Downloadfile(filename);
             rep.filename=filename;
    let trabalho: Trabalho={
      trabalhostamp: '',
      turmalstamp: '',
      ststamp: '',
      clstamp: '',
      status: '',
      data: new Date(),
      path: filename,
      path1: ''
    }

    this.dialog.open(VerTrabalhoComponent, {
      width: '100%',
      height:'100%',
      disableClose: true,
      data: trabalho,
      autoFocus: false,
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.isSpinnerDisplayed= false
      }
    });
   }
          } catch {

            // this._loginservice.mostrarAlerta("O sistema não conseguiu carregar o ficheiro, o report apresenta má formatação!","Erro");
            Swal.fire('Erro!', "O sistema não conseguiu carregar o ficheiro, o report apresenta má formatação!", 'error');
          }
        }
      } else {
        this.isSpinnerDisplayed = false
        Swal.fire('Erro!',data.mensagem , 'error');


      }
    },
    error: (e) => {
     // Swal.fire('Erro!', "O sistema não conseguiu carregar o ficheiro " + e, 'error');
    }
  });

  this.dadostemp.eliminarSessao()

}


Dadostemp1111(){
  this.isSpinnerDisplayed = true
  this.dadostemp.eliminarSessaoauxiliar()
  this.curso1 = this.dadostemp.obterSessao().descurso;
  this.cusrsostamp1 =this.dadostemp.obterSessao().cursostamp;
  this.turmastamp1 = this.dadostemp.obterSessao().turmastamp
  this.disciplina1= this.dadostemp.obterSessao().disciplina;
  this.ststamp1= this.dadostemp.obterSessao().ststamp
  this.turma1 = this.dadostemp.obterSessao().codigo;
  this.anosem1 = this.dadostemp.obterSessao().anosem;
   this.carregar= {
     turmastamp: this.turmastamp1,
     anosem: this.anosem1,
     turma: this.turma1,
     curso: this.curso1,
     cursostamp: this.cusrsostamp1,
     disciplina: this.disciplina1,
     ststamp: this.ststamp1,
   }

  this.TurmaotaService.ChamarAlunos(this.carregar).pipe(
    finalize(() =>  this.isSpinnerDisplayed = false , ),
  ).subscribe( (data)=>
      {

   
        this.lancaTemp.eliminarSessao();
    this.lancaTemp.guardarSessao(data.dados);
    this.abrirDialogo()

     })


}


}
//,'Semestre','Turma','Disciplina', 'Acção'


export interface PeriodicElement {
  codigo: string;
  etapa: number;
  descurso: number;
  disciplina: string;
  accoes: string;

}

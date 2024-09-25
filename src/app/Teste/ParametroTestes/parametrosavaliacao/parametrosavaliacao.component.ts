import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alauxiliar } from 'src/Models/Alauxiliar';
import { diarioClasses } from 'src/Models/DiarioClass';
import { DadosTemporarios } from 'src/app/GuardarSessoes/DadosTemporarios';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { TabelapagComponent } from '../../GridView/tabelapag/tabelapag.component';
import { MatDialog } from '@angular/material/dialog';
import { Estudante, ReportPauta } from 'src/Models/Estudante';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { LancamentoexamesComponent } from '../../GridView/lancamentoexames/lancamentoexames.component';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { FormControl, FormGroup } from '@angular/forms';
import { carregardados } from 'src/app/Interfaces/carrgardados';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { environment } from 'src/environments/environment.development';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { VerTrabalhoComponent } from 'src/app/Portal-do-Estudante/trabalho/ver-trabalho/ver-trabalho.component';
import { Trabalho } from 'src/Models/trabalho';
import { MatTableDataSource } from '@angular/material/table';
import { Turmanota1 } from 'src/Models/Turma';
import { LancaTrabalhoComponent } from 'src/app/LancaTrabalhos/lanca-trabalho/lanca-trabalho.component';
import { EmailServiceService } from 'src/Service/EmailService/EmailService/email-service.service';

@Component({
  selector: 'app-parametrosavaliacao',
  templateUrl: './parametrosavaliacao.component.html',
  styleUrls: ['./parametrosavaliacao.component.scss']
})
export class ParametrosavaliacaoComponent implements OnInit{



Relatorio() {
  window.open(`${this.ApiUrlgeral}FrmPrintRlt`, "_blank");
}

private ApiUrlgeral = `${environment.APIurl}Users/`
listCurso:Turmanota1[]=[];
dataListaCurso= new MatTableDataSource(this.listCurso);
  Diaro: diarioClasses[]=[];
  ocultateste: boolean=false;
  estudante!:Estudante;
  auxiliarclass: Alauxiliar[]=[];
  auxiliarclassfilter: Alauxiliar[]=[];
  displayedColumns: string[] =['codigo','descricao','accoes' ];
  dataSource: Alauxiliar[]=[];
  dataSourceTrab: Alauxiliar[]=[];
  currentDate = new Date();
  idt:string = '';
  carregardaos!: FormGroup;
  titulo:string = '';
  carregar!: carregardados;
  anosem1: string=''
  curso1: string=''
  cusrsostamp1: string=''
  turmastamp1: string=''
  ststamp1: string=''
  disciplina1: string=''
  turma1: string='';
  isSpinnerDisplayed=false;
  desabilita: boolean= false
  abilitamedia: boolean=false
  constructor(
    private guararsessoes: GuardarSessoes,
    private dadostemp : DadosTemporarios,
    private router: Router,private route: ActivatedRoute,
    private dialog: MatDialog,
    private lancaTemp : DadosLancamento,
    private TurmaotaService: TurmaNotaService,
    private loginservice:LoginServiceService,
    private emailservice:EmailServiceService
  )
  {}
ngOnInit(): void {

this.Reload(this.route.snapshot.paramMap.get('id')?.toString());
if(this.route.snapshot.paramMap.get('id')?.toString() == 'teste'){
  this.ocultateste=true
}
else{
  this.ocultateste=false
}


if(this.route.snapshot.paramMap.get('id')?.toString()== 'exame'){
this.abilitamedia=false
}
else{
  this.abilitamedia=true
}

this.listCurso = this.lancaTemp.obterSessao().turmanota
this.dataListaCurso.data = this.listCurso

}


Reload(_id:any){
  this.ocultateste=true
  this.Diaro = this.guararsessoes.obterSessao().diarioClasses;
  this.auxiliarclassfilter=this.guararsessoes.obterSessao().alauxiliarClass;

  let idf= _id;
  if (idf === undefined){
    if(this.dadostemp.isAutenticatedauxiliar()){
      let des=this.dadostemp.obterSessaoauxiliar().descricao;
      if (des.toLowerCase().includes('exame')){
        idf='exame';
      }
      else if (des.toLowerCase().includes('teste'))
      {
      
        idf='teste';
      }

      else if (des.toLowerCase().includes('trabalho'))
        {
        
          idf='trabalho';
        }

      
    }
  }

  if (idf !== undefined) {
    switch(idf.toLowerCase()){
case 'teste':

this.titulo='Escolha de teste';
this.auxiliarclass= this.auxiliarclassfilter.filter(
  housingLocation => housingLocation?.descricao.toLowerCase().includes('teste'.toLowerCase())
);
  break;

  case 'trabalho':

this.titulo='Escolha de trabalho';
this.auxiliarclass= this.auxiliarclassfilter.filter(
  housingLocation => housingLocation?.descricao.toLowerCase().includes('trabalho'.toLowerCase())
);
  break;

  case 'exame':
    this.titulo='Escolha de exame!';
    this.auxiliarclass= this.auxiliarclassfilter.filter(
      housingLocation => housingLocation?.descricao.toLowerCase().includes('exame'.toLowerCase())
    );
  break;
    }
}
if(this.auxiliarclass[1].descricao === 'teste'){

  this.dataSource = this.auxiliarclass.slice(0, 2);

  this.dataSourceTrab = this.auxiliarclass.slice(2);
}

else{
  this.ocultateste=false;
  this.dataSource = this.auxiliarclass;
}



}



abrirDialogo(mancebo:Estudante){

  this.dialog.open(TabelapagComponent,{
    disableClose:true,
    data:mancebo,
    autoFocus:false,
    enterAnimationDuration:'1000ms',
    exitAnimationDuration: '1000ms',
  }).afterClosed().subscribe(resultado =>{
        this.Reload(resultado.id);

  })

}

LancamentoTrabalho(mancebo:Estudante){

  this.dialog.open(LancaTrabalhoComponent,{
    disableClose:true,
    data:mancebo,
    autoFocus:false,
    enterAnimationDuration:'1000ms',
    exitAnimationDuration: '1000ms',
  }).afterClosed().subscribe(resultado =>{
        this.Reload(resultado.id);

  })

}
LancarExame(mancebo:Estudante){
  let retorno = mancebo.turmanota.some((Item)=> Item.resultado==="")
if(retorno == true){
  Swal.fire('Alerta',`Faça o calculo de medias, por favor!`,'info');
  return
} 
 
  this.dialog.open(LancamentoexamesComponent,{
    disableClose:true,
    data:mancebo,
    autoFocus:false,
    enterAnimationDuration:'1000ms',
    exitAnimationDuration: '1000ms',
  }).afterClosed().subscribe(resultado =>{})

}
Dadostemp(diaioClass : Alauxiliar){
  //this.isSpinnerDisplayed = true
  this.dadostemp.eliminarSessaoauxiliar()
  this.dadostemp.guardarSessaoauxiliar(diaioClass);



//   this.curso1 = this.dadostemp.obterSessao().descurso;
//   this.cusrsostamp1 =this.dadostemp.obterSessao().cursostamp;
//   this.turmastamp1 = this.dadostemp.obterSessao().turmastamp
//   this.disciplina1= this.dadostemp.obterSessao().disciplina;
//   this.ststamp1= this.dadostemp.obterSessao().ststamp
//   this.turma1 = this.dadostemp.obterSessao().codigo;
//   this.anosem1 = this.dadostemp.obterSessao().anosem;
//    this.carregar= {
//      turmastamp: this.turmastamp1,
//      anosem: this.anosem1,
//      turma: this.turma1,
//      curso: this.curso1,
//      cursostamp: this.cusrsostamp1,
//      disciplina: this.disciplina1,
//      ststamp: this.ststamp1,
//    }

//   this.TurmaotaService.ChamarAlunos(this.carregar).pipe(
//     finalize(() =>  this.isSpinnerDisplayed = false , ),
//   ).subscribe( (data)=>
//       {

   
//         this.lancaTemp.eliminarSessao();
//     this.lancaTemp.guardarSessao(data.dados);
// if(data.sucesso===true){
  if(this.dadostemp.isAutenticatedauxiliar()){
    let des=this.dadostemp.obterSessaoauxiliar().descricao;
    if (des.toLowerCase().includes('exame')){
      this.LancarExame(this.lancaTemp.obterSessao())

    }
    else if (des.toLowerCase().includes('teste'))
    {
  this.abrirDialogo(this.lancaTemp.obterSessao())
    }


    else if (des.toLowerCase().includes('trabalho'))
      {
    this.LancamentoTrabalho(this.lancaTemp.obterSessao())
      }
  }
//}
     //})


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


EscolhaComponente(numer: string){
  this.auxiliarclass;
this.dadostemp.eliminarSessaoauxiliar()
this.dadostemp.guardarSessaoauxiliar(this.auxiliarclass[0]);

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


if(data.sucesso===true){
  this.lancaTemp.guardarSessao(data.dados);

}
   })


   if(numer == '2'){
    this.router.navigate(['/Adim/media'])
   }

   else{
    
    this.router.navigate(['/Adim/aproveita'])

   }
}




Back(){
  this.emailservice.back();
}


}




































import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup,FormArray, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { TurmaNota } from 'src/Models/TurmaNota';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DadosTemporarios } from 'src/app/GuardarSessoes/DadosTemporarios';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { Alauxiliar } from 'src/Models/Alauxiliar';
import { carregardados } from 'src/app/Interfaces/carrgardados';
import { diarioClasses } from 'src/Models/DiarioClass';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { MatDialog } from '@angular/material/dialog';
import { TestesComponent } from 'src/app/Teste/testes/testes.component';
import { Estudante } from 'src/Models/Estudante';
import { ExamesLancComponent } from 'src/app/Exames/exames-lanc/exames-lanc.component';


export interface PeriodicElement {
  codigo: string;
  etapa: number;
  descurso: number;
  disciplina: string;
  accoes: string;
 
}

export interface FormInfo{
  no: string,
  nome: string,
  n1:number,
  n2:number,
  n3:number,
  obs: string
  media:number,
  resultado:string
  e1:number,
  e2:number,
  es:number,
  mediafinal:  number
  resultadofinal:string
}

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.scss']
})
export default class TurmasComponent implements OnInit{
 
  @Output() onSubmit = new EventEmitter<TurmaNota>



  TurmanotaLista:TurmaNota[]=[]
  TurmanotaListaGeral:TurmaNota[]=[]
  Erro:any
  Formulario!:FormGroup;
  Select!:FormGroup;
  carregardaos!: FormGroup;
  dadosEstudante!: FormArray;
  nome: string ='';
  anosem1: string=''
  curso1: string=''
  cusrsostamp1: string=''
  turmastamp1: string=''
  ststamp1: string=''
  disciplina1: string=''
  turma1: string=''
  displayedColumns: string[] =[];
  mostraDados: string[]=[];
  dataSource: Alauxiliar[]=[]
  dataSource1: diarioClasses[]=[]
  Testeselecionado:string=''
  desricaoteeste:string=''
  contador : number= 0
  desabilita: boolean  = true
  
  constructor(
    private TurmaotaService: TurmaNotaService,
    private formbuild: FormBuilder,
    private router: Router,
    private dadosTemp : DadosTemporarios,
    private dadossessao : GuardarSessoes,
    private lancaTemp : DadosLancamento,
    private dialog: MatDialog,private route: ActivatedRoute
   
    ){

      let idf= this.route.snapshot.paramMap.get('id')?.toString();  
      if (idf === undefined){
        if(this.dadosTemp.isAutenticatedauxiliar()){
          let des=this.dadosTemp.obterSessaoauxiliar().descricao;      
          if (des.toLowerCase().includes('exame')){
            this.desricaoteeste='exame';
            
          }
          else if (des.toLowerCase().includes('teste'))
          {
            this.desricaoteeste='teste';
          }
        }
      }else{

        if (idf.toLowerCase().includes('exame')){          
            
          this.desricaoteeste='exame';
        }
        else if (idf.toLowerCase().includes('teste'))
        {
          
          this.desricaoteeste='teste';
        }
      }
    }




  ngOnInit(): void {
//-------------------------------------------------------------------------------------------
    let dadostemp = this.dadosTemp.obterSessao();
    console.log(dadostemp)
    const dadossessaoD = this.dadossessao.obterSessao();
    console.log(dadossessaoD)
    this.curso1 = this.dadosTemp.obterSessao().descurso;
    this.cusrsostamp1 =this.dadosTemp.obterSessao().cursostamp;
    this.turmastamp1 = this.dadosTemp.obterSessao().turmastamp
    this.disciplina1= this.dadosTemp.obterSessao().disciplina;
    this.ststamp1= this.dadosTemp.obterSessao().ststamp
    this.turma1 = this.dadosTemp.obterSessao().codigo;
    this.anosem1 = this.dadosTemp.obterSessao().anosem;
    this.dataSource = this.dadossessao.obterSessao().alauxiliarClass
    this.dataSource1 = this.dadossessao.obterSessao().diarioClasses;

//--------------------------------------------------------------------------------------------
    this.carregardaos = new FormGroup({
      cursostamp: new FormControl(this.cusrsostamp1, Validators.required),
      turmastamp: new FormControl(this.turmastamp1, Validators.required),
      anosem:new FormControl(this.anosem1, Validators.required),
      ststamp:new FormControl(this.ststamp1, Validators.required),
      curso:new FormControl(this.curso1, Validators.required),
      turma: new FormControl(this.turma1, Validators.required),
      disciplina:new FormControl(this.disciplina1, Validators.required),
    })
//--------------------------------------------------------------------------------------------
    this.displayedColumns= ['descurso', 'etapa', 'codigo', 'disciplina', 'accoes' ];
//--------------------------------------------------------------------------------------------
    this.Formulario = this.formbuild.group({
      dadosEstudante: this.formbuild.array([]),
    })

    this.Select = new FormGroup({
    
      TesteTipo: new FormControl('') 
    })   
   this.carrega();

 }

//----------------------------------Lancar Notas---------------------------------------------------

//  Enviar(){
//  // console.log(this.Formulario.value)

//   console.log(this.dadosEstudante.value)
//   const dados=this.Formulario.value;
//   //this.onSubmit.emit(this.Formulario.value)
//   this.onSubmit.emit(this.dadosEstudante.value)
//   const AlunosNota =this.formbuild.group({
//     alunonome:[, Validators.required],
//     alunostamp:['', Validators.required],
//     anosem:['', Validators.required],
//     aprovado: [true],
//     ativo: [true],
//     codsit: [0],
//     coddis: [0],
//     codetapa: [0],
//     cursostamp:['Hsjhdns'],
//     disciplina:[''],
//     e1:[, Validators.required],
//     e2:[, Validators.required ],
//     es: [, Validators.required],
//     fecho: [true],
//     media: [2],
//     mediafinal: [3],
//     motivo: [''],
//     n1: [],
//     n2: [],
//     n3: [],
//     obs: [''] ,
//     pestamp: ['teste'],
//     pestamp2: ['teste'],
//     profnome: ['teste'],
//     profnome2: ['teste'],
//     resultado: ['Aprovado'],
//     resultadoFinal: ['Aprovado'],
//     sem: [''],
//     turmanotastamp:['dsjkjdf'],
//     turmastamp:['sdsds'], 
//   })
//   //this.enviaraluno.push
//  }

Enviar(){}


 CreatNotas(Notas: TurmaNota){
  this.onSubmit.emit(this.Formulario.value)
  this.TurmaotaService.CreateTurmaNota(Notas).subscribe((data)=>{
    console.log(data)
  },Error =>{
   console.log(Error)
  })

}

 //---------------------------------Mapeamento de Dados da tabela-----------------------------------
colunas=['no','nome','n1','n2','n3', 'media', 'obs', 'resultado', 'e1', 'e2', 'es','mediafinal', 'resultadofinal']

//-------------------------------------------------------------------------

//Chamar alunos
carrega(){
  this.TurmaotaService.ChamarAlunos(this.carregardaos.value).subscribe((data)=>{this.lancaTemp.eliminarSessao()
    
this.lancaTemp.guardarSessao(data.dados)
this.TurmanotaLista =this.lancaTemp.obterSessao().turmanota
this.TurmanotaListaGeral = this.lancaTemp.obterSessao().turmanota
let teste1 = this.lancaTemp.obterSessao().turmanota[0].n1
let teste2 = this.lancaTemp.obterSessao().turmanota[0].n2
let teste3 = this.lancaTemp.obterSessao().turmanota[0].n3
let exame1 = this.lancaTemp.obterSessao().turmanota[0].e1
let exame2 = this.lancaTemp.obterSessao().turmanota[0].e2
let exame3 = this.lancaTemp.obterSessao().turmanota[0].s1


switch(this.desricaoteeste.toLowerCase()){
  case 'teste':    
      this.abrirDialogo(this.lancaTemp.obterSessao())   
    break;
    case 'exame':
    this.editarMancebo(this.lancaTemp.obterSessao())
    break;
  
  
      }
;
//-----------------------------------------------------------------------------
this.Formulario= new FormGroup(
  {
  alunonome: new FormControl('hhhhhhghg'),
  alunostamp: new FormControl('H$3873h'),
  anosem: new FormControl(''),
  aprovado: new FormControl(true),
  ativo: new FormControl(true),
  codsit: new FormControl(0),
  coddis: new FormControl(0),
  codetapa: new FormControl(0),
  cursostamp:new FormControl('Hsjhdns'),
  // data:new FormControl(new Date()),
  // datafecho:new FormControl(new Date()),
  disciplina:new FormControl(''),
  e1:new FormControl(exame1),
  e2:new FormControl(exame2),
  es: new FormControl(exame3),
  fecho: new FormControl(true),
  media: new FormControl(2),
  mediafinal: new FormControl(3),
  motivo: new FormControl(''),
  n1: new FormControl(teste1),
  n2: new FormControl(teste2),
  n3: new FormControl(teste3),
  obs: new FormControl('') ,
  pestamp: new FormControl('teste'),
  pestamp2: new FormControl('teste'),
  profnome: new FormControl('teste'),
  profnome2: new FormControl('teste'),
  resultado: new FormControl('Aprovado'),
  resultadoFinal: new FormControl('Aprovado'),
  sem: new FormControl(''),
  turmanotastamp:new FormControl('dsjkjdf'),
  turmastamp:new FormControl('sdsds'), 

})


 }) 

  

}


carrega1(){
  this.editarMancebo(this.lancaTemp.obterSessao())
  
}

//Metodo de escolha de teste


Escolhateste(){
  


}



//----------------------------------Busca Aluno--------------------------------------------------
busca(event: Event){

  const target = event.target as HTMLInputElement;
  const value = target.value.toLowerCase();


  this.TurmanotaLista= this.TurmanotaListaGeral.filter(
    housingLocation => housingLocation?.alunonome.toLowerCase().includes(value)
  );  

  // this.TurmanotaLista = this.TurmanotaListaGeral.filter(TurmanotaLista =>{
  //   return TurmanotaLista.alunonome.toLowerCase().includes(value)
  // })
}




 editarMancebo(mancebo : Estudante) {
  
  this.dialog.open(ExamesLancComponent, {
   // height: '85%',
   // width: '77%',
    disableClose: true,
     data: mancebo,
    autoFocus: false,
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    
  }).afterClosed().subscribe(resultado => {
    // if (resultado === "true") {
    // //  this.getMancebo();
    // }
  });
}

abrirDialogo(mancebo:Estudante){ 
  this.dialog.open(TestesComponent,{
    disableClose:true,
    data:mancebo,
    autoFocus:false,
    enterAnimationDuration:'1000ms',
    exitAnimationDuration: '1000ms', 
  }).afterClosed().subscribe(resultado =>{})

}

}









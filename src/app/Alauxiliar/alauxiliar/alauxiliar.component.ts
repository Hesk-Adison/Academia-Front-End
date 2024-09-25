import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Estudante } from 'src/Models/Estudante';
import { Turmanota1 } from 'src/Models/Turma';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { DadosTemporarios } from 'src/app/GuardarSessoes/DadosTemporarios';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { Teste1232Component } from './teste1232/teste1232.component';
import { TurmaNota } from 'src/Models/TurmaNota';

@Component({
  selector: 'app-alauxiliar',
  templateUrl: './alauxiliar.component.html',
  styleUrls: ['./alauxiliar.component.scss']
})
export class AlauxiliarComponent {


  formularioMancebo!: FormGroup;
  titloAccao: string = "Adicionar Ficha Individual de Recenseamento Militar";
  botaoAccao: string = "Guardar";

  
  

  nims: string = "0000000";
  situacaos: string = "Pronto a Classificar";
  provchaveCprm: string = "";
  cprmprovchave: string = "";
  anosem : string ="";
  curso :string="";
 cursostamp: string ="";
  disciplina: string  ="";
  ststamp : string  ="";
  turma : string  ="";
  turmastamp : string  ="";
  //Recenseamento
  recprpaischav: string = "";
  recprovchav: string = "";
  recdistchav: string = "";
  recpadchav: string = "";
  reclocalidchav: string = "";
  utilizadorCprm: string = "";
  //Morada
  mprovchav: string = "";
  mdistchav: string = "";
  mpadchav: string = "";
  mlocalidchav: string = "";
  //nascimento
  nascprpaischav: string = "";
  nascprovchav: string = "";
  nasdistchav: string = "";
  nascpadchav: string = "";
  nasclocalidchav: string = "";
  estCivilchave: string = "";
  generoSexchave: string = "";
  grupsangchave: string = "";
  //filiacao
  recenseadorchave: string = "";
  auxiliarchav: string = "";
  //Formacao
  nivelchav: string = "";
  profSitchav: string = "";

  //Documento
  documentochave!: string;
  localemischave: string = "";
  //Formac
  cursochav:string="";
  instituicaochave:string="";
  nivelchavee:string="";
  anofomacaochav:string="";
  paiseschavee:string="";
  linguachav:string="";  
  escritachav:string="";  
  falachav:string="";
  leiturachav:string="";
  compchav:string="";
  grauchav:string="";
  provfamchav:string="";
  distfamchav:string="";
  padfamchav:string="";
  indice:number=0;
  dialog: any;
  carregardaos!: FormGroup;
  TurmanotaLista:TurmaNota[]=[];
  Formulario!: FormGroup;
 


  constructor(
   
    private TurmaotaService: TurmaNotaService,
    private fb: FormBuilder,
    private router: Router,
    private dadosTemp : DadosTemporarios,
    private dadossessao : GuardarSessoes,
    private lancaTemp : DadosLancamento,
    
   
    ){

//#region Construtor
this.formularioMancebo = this.fb.group({
   alunonome:['Aniva', Validators.required],
    alunostamp:['Aniva', Validators.required],
    anosem:['Aniva', Validators.required],
    aprovado: [true],
    ativo: [true],
    codsit: [0],
    coddis: [0],
    codetapa: [0],
    cursostamp:['Hsjhdns'],
    disciplina:['Aniva'],
    e1:[0, Validators.required],
    e2:[0, Validators.required ],
    es: [ 0, Validators.required],
    fecho: [true],
    media: [2],
    mediafinal: [3],
    motivo: [0],
    n1: [0],
    n2: [0],
    n3: [0],
    obs: [''] ,
    pestamp: ['teste'],
    pestamp2: ['teste'],
    profnome: ['teste'],
    profnome2: ['teste'],
    resultado: ['Aprovado'],
    resultadoFinal: ['Aprovado'],
    sem: [''],
    turmanotastamp:['dsjkjdf'],
    turmastamp:['sdsds'], 
    dadosEstudante: this.fb.array([])
});
const xx=this.lancaTemp.obterSessao();
if (xx != null) {
  this.nims = xx.nim;
  this.situacaos = xx.situacao;
  this.anosem =xx.anosem;
  this.curso =xx.curso;
  this.cursostamp =xx.cursostamp;
  this.disciplina =xx.disciplina;
 this. ststamp =xx.ststamp;
 this.turma =xx.turma;
 this.turmastamp =xx.turmastamp;
}


    }



    mancdocs(): FormArray {
      // return this.formularioMancebo.get("mancdoc") as FormArray
      return this.formularioMancebo.get("mancdoc") as FormArray
     }

    




  ngOnInit(): void {
    
const xx=this.lancaTemp.obterSessao();
if (xx != null) {

      this.formularioMancebo.patchValue({

      nims: xx.nim,
      situacaos: xx.nim,
      anosem: xx.nim,
      curso: xx.nim,
      cursostamp: xx.nim,
      disciplina: xx.nim,
      ststamp: xx.nim,
      turma: xx.nim,
      turmastamp: xx.nim,
      });
      
 this.carregarMancdoc(xx.turmanotas);
 }
  }


  carregarMancdoc(mancdoc: Turmanota1[]) {

    const formArray = this.formularioMancebo.get('mancdoc') as FormArray;
    mancdoc.map(item => {
      formArray.push(this.mancdocForms(item));
    });
  }
  
    mancdocForms(item: Turmanota1) {
    let formGroup: FormGroup = new FormGroup(
      {
        activo:new FormControl(item.activo),
        alunoNome:new FormControl(item.alunoNome),
        alunostamp:new FormControl(item.alunostamp),
        anosem:new FormControl(item.anosem),
        aprovado:new FormControl(item.aprovado),
   
      }
    );
    return formGroup;
  } 
  
  carrega(){
    const Formdata = this.carregardaos.value
    console.log(Formdata)
  
    this.TurmaotaService.ChamarAlunos(Formdata).subscribe((data)=>{
    
  this.lancaTemp.eliminarSessao()
  this.lancaTemp.guardarSessao(data.dados)
  
  console.log(this.lancaTemp.obterSessao())
  this.TurmanotaLista =this.lancaTemp.obterSessao().turmanotas
  
  
  console.log(this.TurmanotaLista)
  let teste1 = this.lancaTemp.obterSessao().turmanotas[0].n1
  let teste2 = this.lancaTemp.obterSessao().turmanotas[0].n2
  let teste3 = this.lancaTemp.obterSessao().turmanotas[0].n3
  let exame1 = this.lancaTemp.obterSessao().turmanotas[0].e1
  let exame2 = this.lancaTemp.obterSessao().turmanotas[0].e1
  let exame3 = this.lancaTemp.obterSessao().turmanotas[0].s1
  
  this.editarMancebo()
  
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
    e1:new FormControl(),
    e2:new FormControl(),
    es: new FormControl(),
    fecho: new FormControl(true),
    media: new FormControl(2),
    mediafinal: new FormControl(3),
    motivo: new FormControl(''),
    n1: new FormControl(7),
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
  

  editarMancebo() {

    this.dialog.open(Teste1232Component, {
      height: '85%',
      width: '77%',
      disableClose: true,
     //  data: mancebo,
      autoFocus: false,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    // }).afterClosed().subscribe(resultado => {
    //   // if (resultado === "true") {
    //   // //  this.getMancebo();
    //   // }
    });
  
  

  
  }

}







import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Estudante } from 'src/Models/Estudante';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DadosTemporarios } from 'src/app/GuardarSessoes/DadosTemporarios';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { Alauxiliar } from 'src/Models/Alauxiliar';
import { carregardados } from 'src/app/Interfaces/carrgardados';
import { diarioClasses } from 'src/Models/DiarioClass';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { Turmanota1 } from 'src/Models/Turma';
import { __values } from 'tslib';
export const MY_DATA_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD/MM/YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  }

}
@Component({
  selector: 'app-testes',
  templateUrl: './testes.component.html',
  styleUrls: ['./testes.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS },
  ]
})
export class TestesComponent {
carrega() {
}

  formularioMancebo: FormGroup;
  titloAccao: string = "LAN'VAMENTO DE NOTAS";
  botaoAccao: string = "LANÇAR";

  
   listaDocumento: Turmanota1[] = [];

  nims: string = "0000000";
  situacaos: string = "";
  provchaveCprm: string = "";
  cprmprovchave: string = "";
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
  turmas: string = "";
  cursos: string = "";
  anosems: string = "";
  disciplinas: string = "";
  estudante!: Estudante;
  TurmaLista: Turmanota1[]=[]
  dataSource: Alauxiliar[]=[]
  Habilita1: boolean= true
  Habilita2: boolean= true
  Habilita3: boolean= true
  descrteste: string = "";
  liveForm!: FormGroup;
  simpleForm!: FormGroup;
  desc: string="";
  //Documento
  documentochave!: string;
  indice:number=0;
  constructor(
    private modalActual: MatDialogRef<TestesComponent>,
    @Inject(MAT_DIALOG_DATA) public dadosMancebo: Estudante,
    private fb: FormBuilder,
    private _manceboService: TurmaNotaService,
     private router: Router,    
     private dadosTemp : DadosTemporarios,
     private dadossessao : GuardarSessoes,
     private lancaTemp : DadosLancamento,private route: ActivatedRoute
  ) {

    
    let idf= this.route.snapshot.paramMap.get('id')?.toString();  
    if (idf === undefined){
      if(this.dadosTemp.isAutenticatedauxiliar()){
        let des=this.dadosTemp.obterSessaoauxiliar().descricao;      
        if (des.toLowerCase().includes('exame')){
          this.desc='exame';          
        }
        else if (des.toLowerCase().includes('teste'))
        {
          this.desc='teste';
        }
      }
    }else{
      this.desc=idf?.toString();
    }

    this.formularioMancebo = this.fb.group({
      curso:[this.dadosTemp.obterSessao().curso, [Validators.required]],
      cursostamp: [this.dadosTemp.obterSessao().cursostamp, [Validators.required]],
      turma: [this.dadosTemp.obterSessao().turma, [Validators.required]],
      turmastamp: [this.dadosTemp.obterSessao().turmastamp, [Validators.required]],
      anosem: [this.dadosTemp.obterSessao().anosem, [Validators.required]],
      disciplina: [this.dadosTemp.obterSessao().disciplina, [Validators.required]],
      ststamp: [this.dadosTemp.obterSessao().ststamp, [Validators.required]],
      mancdoc: this.fb.array([]),
    });
    let dadostemp = this.dadosTemp.obterSessaoauxiliar();
    this.descrteste=dadostemp.descricao;

  
    
    switch(this.descrteste.toLowerCase()) {
      case 'teste1':
        this.Habilita1=false;
        break; 
        case 'teste2':
          this.Habilita2=false;
        break; 
        case 'teste3':
          this.Habilita3=false;
        break;

    }
   
    
const xx=this.lancaTemp.obterSessao();
    this.dadosMancebo=xx;

    if (this.dadosMancebo != null) {

      this.nims = this.dadosMancebo.turma.toString();
      this.situacaos = this.dadosMancebo.curso;      
      this.titloAccao = "Lançamento de Notas";
      this.botaoAccao = "Lançar";
    } 
    
  }
  



  onKeyPress(params: any) {
    var inputVal = <HTMLInputElement>document.getElementById("Input");
    if (params.key === 'Backspace' || params.key === '.') {
      return true;
    }
    else if (!this.isKeyPressedNumeric(params, inputVal)) {
      return false;
    } else {
      return true;
    }
  }

  onKeyPressTelef(params: any) {
    var inputVal = <HTMLInputElement>document.getElementById("InputTelef");
    if (params.key === 'Backspace' || params.key === '.') {
      return true;
    }
    else if (!this.isKeyPressedNumeric(params, inputVal)) {
      return false;
    } else {
      return true;
    }
  }

  onKeyPressTelef2(params: any) {
    var inputVal = <HTMLInputElement>document.getElementById("InputTelef2");
    if (params.key === 'Backspace' || params.key === '.') {
      return true;
    }
    else if (!this.isKeyPressedNumeric(params, inputVal)) {
      return false;
    } else {
      return true;
    }
  }

  onKeyPressNuit(params: any) {
    var inputVal = <HTMLInputElement>document.getElementById("InputNuit");
    if (params.key === 'Backspace' || params.key === '.') {
      return true;
    }
    else if (!this.isKeyPressedNumeric(params, inputVal)) {
      return false;
    } else {
      return true;
    }
  }

  private isKeyPressedNumeric(event: any, inputVal: any): boolean {

    var input = inputVal.value;
    input = input + event.key;

    if (input.length >= 2) {
      var txtVal = input;
      return /^((\d{1,18})|(\d{1,18})(\.{1}\d{1,15}))$/.test(txtVal);
    }

    const charCode = this.getCharCode(event);
    const charStr = event.key ? event.key : String.fromCharCode(charCode);
    return this.isCharNumeric(charStr);
  }

  private getCharCode(event: any): any {
    event = event || window.event;
    return (typeof event.which == "undefined") ? event.keyCode : event.which;
  }

  private isCharNumeric(charStr: any): boolean {
    var validation = false;

    if (charStr == ".") {
      validation = !!/\./.test(charStr);
    }
    else {
      validation = !!/\d/.test(charStr);
    }
    return validation;
  }


  mancdocs(): FormArray {

   
   return this.formularioMancebo.get("mancdoc") as FormArray
  }



  ngOnInit(): void {    


    if (this.dadosMancebo != null) {
      this.formularioMancebo.patchValue({
        curso: this.dadosMancebo.curso,
        cursostamp: this.dadosMancebo.cursostamp,
        turma: this.dadosMancebo.turma,
        turmastamp: this.dadosMancebo.turmastamp,
        anosem: this.dadosMancebo.anosem,
        disciplina: this.dadosMancebo.disciplina,
        ststamp: this.dadosMancebo.ststamp
      });
      const xx=this.lancaTemp.obterSessao().turmanota;
      this.TurmaLista = this.lancaTemp.obterSessao().turmanota
       this.carregarMancdoc(this.TurmaLista);
     
    } 
    
    //const controles = this.mancdocs().controls
  
  }


// Habilitar a nota que deseja lancar
  Teste(item : any){

    if(item.target.value == 1){ 
      this.Habilita1 = !this.Habilita1
     
    }
    if(item.target.value == 2){
     
  
      this.Habilita2 = !this.Habilita2
    }
    if(item.target.value == 3){    
      this.Habilita3 = !this.Habilita3
    }
  }
//#region Carregar Filhas
carregarMancdoc(mancdoc: Turmanota1[]) {  
  const formArray = this.formularioMancebo.get('mancdoc') as FormArray;
  mancdoc.map(item => {
    formArray.push(this.mancdocForms(item)); 
  });
}



desabilitaTeste(){
  this.Habilita1 = !this.Habilita1
  console.log(this.Habilita1)
}



  mancdocForms(item: Turmanota1) {
   
  let formGroup: FormGroup = new FormGroup(
    {
      activo:new FormControl(item.activo),
      alunoNome:new FormControl(item.alunoNome),
      alunostamp:new FormControl(item.alunostamp),
      anosem:new FormControl(item.anosem),
      aprovado:new FormControl(item.aprovado),
      codSit:new FormControl(item.codSit),
      coddis:new FormControl(item.coddis),
      codetapa:new FormControl(item.codetapa),
      cursostamp:new FormControl(item.cursostamp),
      datafecho:new FormControl(item.datafecho),
      disciplina:new FormControl(item.disciplina),
      e1:new FormControl( {value: item.e1, disabled: this.Habilita2}),
      e2:new FormControl({value: item.e2, disabled: this.Habilita2}),
      es:new FormControl({value: item.es, disabled: this.Habilita2}),
      fecho:new FormControl(item.fecho),
      data:new FormControl(item.data),
      media:new FormControl(item.media),
      mediafinal:new FormControl(item.mediafinal),
      motivo:new FormControl(item.motivo),
      n1:new FormControl( {value: item.n1, disabled: this.Habilita1}),
      n2:new FormControl({value: item.n2, disabled: this.Habilita2}),
      n3:new FormControl({value: item.n3, disabled:this. Habilita3}),
      n4:new FormControl({value: item.n4, disabled: false}),
      n5:new FormControl({value: item.n5, disabled: false}),
      no:new FormControl(item.no),
      obs:new FormControl(item.obs),
      pestamp:new FormControl(item.pestamp),
      pestamp2:new FormControl(item.pestamp2),
      profnome:new FormControl(item.profnome2),
      profnome2:new FormControl(item.profnome2),
      resultado:new FormControl(item.resultado),
      resultadoFinal:new FormControl(item.resultadoFinal),
      sem:new FormControl(item.sem),
      turmanotastamp:new FormControl(item.turmanotastamp),
      turmastamp:new FormControl(item.turmastamp),      
    }
  );
  return formGroup;
} 




  ngAfterViewInit(): void {
  }

  ConvertDatepickerFormarray() {
    
  }

  guardarEditarMancebo() {
    this.estudante= {
      turmastamp: this.dadosMancebo == null ? '' : this.dadosMancebo.turmastamp,
      anosem: this.dadosMancebo == null ? '' : this.dadosMancebo.anosem,
      turma: this.dadosMancebo == null ? '' : this.dadosMancebo.turma,
      curso: this.dadosMancebo == null ? '' : this.dadosMancebo.curso,
      cursostamp: this.dadosMancebo == null ? '' : this.dadosMancebo.cursostamp,
      disciplina: this.dadosMancebo == null ? '' : this.dadosMancebo.disciplina,
      ststamp: this.dadosMancebo == null ? '' : this.dadosMancebo.ststamp,
      turmanota: <Turmanota1[]>this.formularioMancebo.value.mancdoc,
    }
    if(this.estudante.turmanota.length==0){
      alert("A grelha de alunos não pode estar vazia, por favor!");
      return;
    }
    if (this.estudante != null) {
      this._manceboService.GravarDadosEst(this.estudante).subscribe({
        next: (data) => {

          if (data.sucesso) {
            alert(`Lançamento executado com sucesso`);
            this.closeDialog()
          } else {
            alert(data.mensagem);
          }
        },
        error: (e) => {
          alert(e + " Erro de conexão");
        }
      });
    } else {
      alert( " Não pode gravar com dados vazios");
    }

  }

  closeDialog(){
    this.modalActual.close("true");
  this.router.navigate(['Adim/Parametrosvaliacao', {id : this.desc}])
  }

  

  busca(event: Event){

    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    console.log(value);

    // this.TurmaLista = this.TurmaLista.filter(
    //   (element) =>
    //     element.alunoNome.toLowerCase().includes(value) 
    // );
    




    



    

    this.mancdocs().controls =  this.mancdocs().controls.filter( 
      
      alunos =>{
      return alunos 
    })

    // const Pesquisa = this.mancdocs().controls.filter((mancdocs)=>{

    //    console.log(`AAAAAAAAAAAAAAAAAAAAAAAAA ${Pesquisa}`)
    // })

    // this.mancdocForms = this.TurmanotaListaGeral.filter(TurmanotaLista =>{
    //   return TurmanotaLista.alunonome.toLowerCase().includes(value)
    // })
  }

  colunas=['no','nome','n1','n2','n3', 'media', 'obs', 'resultado', 'e1', 'e2', 'es','mediafinal', 'resultadofinal']

}














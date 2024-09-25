import { Component, Inject, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { Alauxiliar } from 'src/Models/Alauxiliar';
import { Estudante } from 'src/Models/Estudante';
import { Turmanota1 } from 'src/Models/Turma';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { DadosTemporarios } from 'src/app/GuardarSessoes/DadosTemporarios';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { TestesComponent } from 'src/app/Teste/testes/testes.component';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent {

  formularioMancebo: FormGroup;
  titloAccao: string = "LAN'VAMENTO DE NOTAS";
  botaoAccao: string = "LANÇAR";

  
  @ViewChild('cprm') cprm!: MatSelect;
   listaDocumento: Turmanota1[] = [];

  nims: string = "0000000";
  situacaos: string = "Pronto a Classificar";
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
     private lancaTemp : DadosLancamento,
  ) {
    //#region Construtor
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

const xx=this.lancaTemp.obterSessao();
    this.dadosMancebo=xx;
  

    if (this.dadosMancebo != null) {

      this.nims = this.dadosMancebo.turma.toString();
      this.situacaos = this.dadosMancebo.curso;      
      this.titloAccao = "Lançamento de Notas";
      this.botaoAccao = "Lançar";
    } 
    this.getCprm();
    
  }
  getCprm() {
  
    
  }



  getEstadoCivil(estcivil: string) {
   

  }
  getgenero(sexo: string) {
   
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

  addMancdoc() {
    this.mancdocs().push(this.newMancdoc());
  }


 
  newMancdoc(): FormGroup {
    return this.fb.group({
      activo:[false],
  alunoNome:[''],
  alunostamp:[''],
  anosem:[''],
  aprovado:[false],
  codSit:[''],
  coddis:[''],
  codetapa:[''],
  cursostamp:[''],
  datafecho:[''],
  disciplina:[''],
  e1:[''],
  e2:[''],
  es:[''],
  fecho:[false],
  data:[''],
  media:[0],
  mediafinal:[0],
  motivo:[''],
  n1:[0],
  n2:[0],
  n3:[0],
  n4:[0],
  n5:[0],
  no:[''],
  obs:[''],
  pestamp:[''],
  pestamp2:[''],
  profnome:[''],
  profnome2:[''],
  resultado:[''],
  resultadoFinal:[''],
  sem:[''],
  turmanotastamp:[''],
  turmastamp:[''],
    })
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
    

    // this.dataSource = this.dadossessao.obterSessao().Alauxiliar[0].descricao
    // console.log(`teste data ${this.dataSource}`)
    this. Teste
  }


// Habilitar a nota que deseja lancar
  Teste(item : any){
 

    if(item.target.value == 1){
     
      
      this.Habilita1 = !this.Habilita1
      console.log(`Chegou ate aqui 1 ${this.Habilita1}`)
    }
    if(item.target.value == 2){
     
  
      this.Habilita2 = !this.Habilita2
      console.log(`Chegou ate aqui 2 ${this.Habilita2}`)
    }

    if(item.target.value == 3){
    
      this.Habilita3 = !this.Habilita3
      console.log(`Chegou ate aqui 3 ${this.Habilita3}`)
    }

  }




//#region Carregar Filhas
carregarMancdoc(mancdoc: Turmanota1[]) {  
  const formArray = this.formularioMancebo.get('mancdoc') as FormArray;

  mancdoc.map(item => {
    formArray.push(this.mancdocForms(item));
  });
}

  mancdocForms(item: Turmanota1) {
    console.log(this.Habilita1)
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
      e1:new FormControl( {value: item.e1, disabled: true}),
      e2:new FormControl({value: item.e2, disabled: true}),
      es:new FormControl({value: item.es, disabled: true}),
      fecho:new FormControl(item.fecho),
      data:new FormControl(item.data),
      media:new FormControl(item.media),
      mediafinal:new FormControl(item.mediafinal),
      motivo:new FormControl(item.motivo),
      n1:new FormControl({value: item.n1, disabled: this.Habilita1}),
      n2:new FormControl({value: item.n2, disabled: this.Habilita2}),
      n3:new FormControl({value: item.n3, disabled:this. Habilita3}),
      n4:new FormControl(item.n4),
      n5:new FormControl(item.n5),
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
  }


  busca(event: Event){

    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    console.log()

    // this.TurmanotaLista = this.TurmanotaListaGeral.filter(TurmanotaLista =>{
    //   return TurmanotaLista.alunonome.toLowerCase().includes(value)
    // })
  }

  colunas=['no','nome','n1','n2','n3', 'media', 'obs', 'resultado', 'e1', 'e2', 'es','mediafinal', 'resultadofinal']

}

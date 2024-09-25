import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatPaginator,  MatPaginatorIntl,  MatPaginatorModule,  PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Alauxiliar } from 'src/Models/Alauxiliar';
import { diarioClasses } from 'src/Models/DiarioClass';
import { Estudante } from 'src/Models/Estudante';
import { Turmanota1 } from 'src/Models/Turma';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { DadosTemporarios } from 'src/app/GuardarSessoes/DadosTemporarios';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { DynamicGrid } from '../outross/outross.component';
import { carregardados } from 'src/app/Interfaces/carrgardados';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';

@Component({
  selector: 'app-lancamentoexames',
  templateUrl: './lancamentoexames.component.html',
  styleUrls: ['./lancamentoexames.component.scss'],
  standalone: true,
  imports: [MatTableModule,MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,MatIconModule,
    MatDividerModule, MatDialogModule,MatTabsModule, MatPaginatorModule, CommonModule, MatProgressSpinnerModule

  ],
  
})
export class LancamentoexamesComponent implements 
AfterViewInit, OnInit{
guardarEditarMancebo() {
  
}
  dynamicArray1:Array<DynamicGrid> = [];   
  turmanota:Array<Turmanota1> = []; 
  turmanotas:Array<Turmanota1> = []; 
  
  dynamicArray: Array<Estudante> = [];  
  carregardados!:carregardados;
  dynamicArrays: Array<Estudante> = [];  
  newDynamic: any = {};  
  lisnewDynamic: Estudante[] = []; 
  //teste:string='Meu nome é';
  estudante!:Estudante;
//usr!:DynamicGrid;




getRecrutaIncoporado() {
  
}
editarManceboDesmobilizar(_t47: any) {
  
}

  ngOnInit(): void {
  
  }
submit() {

this.isSpinnerDisplayed=true;

  const dadosMancebo=this.lancaTemp.obterSessao();
  this.estudante= {
    turmastamp: dadosMancebo == null ? '' : dadosMancebo.turmastamp,
    anosem: dadosMancebo == null ? '' : dadosMancebo.anosem,
    turma: dadosMancebo == null ? '' : dadosMancebo.turma,
    curso: dadosMancebo == null ? '' : dadosMancebo.curso,
    cursostamp: dadosMancebo == null ? '' : dadosMancebo.cursostamp,
    disciplina: dadosMancebo == null ? '' :dadosMancebo.disciplina,
    ststamp: dadosMancebo == null ? '' : dadosMancebo.ststamp,
    turmanota: this.dataListaCurso.filteredData,
  }
 
  if(this.estudante.turmanota.length==0){
 
    Swal.fire('Opss',"A grelha de alunos não pode estar vazia, por favor!",'error');
    
    return;
  }
  if (this.estudante != null) {
    this.TurmaotaService.GravarDadosEst(this.estudante).pipe(
      finalize(() =>  this.isSpinnerDisplayed = false , ),
    ).subscribe({
      next: (data) => {

        if (data.sucesso) {
          Swal.fire('Sucesso',`Lançamento executado com sucesso`,'success');
          this.lancaTemp.eliminarSessao();
          this.lancaTemp.guardarSessao(data.dados);
          this.listCurso=data.dados.turmanota;
          const xx=this.lancaTemp.obterSessao();
  this.estudante=xx;
  this.listCurso=this.estudante.turmanota;
  
  this.myDataArray=this.estudante.turmanota;
  this.totalRecords=50;
  this.dataListaCurso= new MatTableDataSource(this.listCurso);  
  this.dataListaCurso.sort = this.sort;
  window.location.reload();
  //Swal.fire('Sucesso',`Lançamento executado com sucesso`,'success');
          //this.closeDialog()
        } else {
          Swal.fire('Opss',data.mensagem,'error');
        }
      },
      error: (e) => {
        
        Swal.fire('Opss',e + " Erro de conexão",'error');
      }
    });
  } else {
    Swal.fire('Opss'," Não pode gravar com dados vazios",'error');
    
  }
 
  

}

  public doFilter = (value: string) => {
    this.dataListaCurso.filter = value.trim().toLocaleLowerCase();
  }

busca(event: Event) {

  this.dataListaCurso.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
}

myDataArray: Array<Turmanota1> = []; 


onKeyPress($event: Event,_t25: Turmanota1,number: number)

{

let id=($event.target as HTMLInputElement).id.replace(`-${number}`,'').toString().toLowerCase()
switch(id){
  case 'e1':
  _t25.e1 =this.newMethod($event);
  let MdFreq : any = document.getElementById("media-"+number) as HTMLInputElement | null;

let exameNorm : any = document.getElementById("e1-"+number) as HTMLInputElement | null
;

let MdFinal : any = document.getElementById(`mediafinal-${number}`) as HTMLInputElement | null

MdFinal.value=((Number(MdFreq.value)*0.7))+(Number(exameNorm.value)*0.3)
if( MdFinal.value>=9.5 ){
  _t25.resultadoFinal = 'Aprovado(a)'
}
else{
  _t25.resultadoFinal = 'Reprovado(a)'
}
    break;
    case 'e2':
      _t25.e2 =this.newMethod($event) ;



      
let nota1 : any = document.getElementById("media-"+number) as HTMLInputElement | null;

let nota2 : any = document.getElementById("e2-"+number) as HTMLInputElement | null
;

let test : any = document.getElementById(`mediafinal-${number}`) as HTMLInputElement | null

test.value=((Number(nota1.value)*0.7))+(Number(nota2.value)*0.3)
if( test.value>=9.5 ){
  _t25.resultadoFinal = 'Aprovado(a)'
}
else{
  _t25.resultadoFinal = 'Reprovado(a)'
}
      break;
      case 'es':
        _t25.es =this.newMethod($event) ;
        
_t25.media=_t25.es;
_t25.mediafinal =_t25.media

const convert= Number(_t25.mediafinal)
if(convert>=9.5 ){
  _t25.resultadoFinal = 'Aprovado(a)'
}
else{
  _t25.resultadoFinal = 'Reprovado(a)'
}
        break;

}




}
  Diaro: diarioClasses[]=[];
  currentDate = new Date();
  listCurso:Turmanota1[]=[];
  divHideShow:boolean=true;
dataListaCurso= new MatTableDataSource(this.listCurso);
@ViewChild(MatPaginator) paginacaoTabela!:MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;
 displayedturma: string[] = ['no', 'alunoNome', 'n1','n2','media', 'resultadoFinal'];
totalRecords:number=0;
titloAccao: string = "LANÇAMENTO DE NOTAS";
botaoAccao: string = "Gravar";
 listaDocumento: Turmanota1[] = [];
nims: string = "0000000";
situacaos: string = "";
provchaveCprm: string = "";
cprmprovchave: string = "";
recprpaischav: string = "";
recprovchav: string = "";
recdistchav: string = "";
recpadchav: string = "";
reclocalidchav: string = "";
utilizadorCprm: string = "";
mprovchav: string = "";
mdistchav: string = "";
mpadchav: string = "";
mlocalidchav: string = "";
turmas: string = "";
cursos: string = "";
anosems: string = "";
disciplinas: string = "";
TurmaLista: Turmanota1[]=[]
dataSource: Alauxiliar[]=[]
Habilita1: boolean= false
Habilita2: boolean= true
Habilita3: boolean= true
descrteste: string = "";
liveForm!: FormGroup;
simpleForm!: FormGroup;
desc: string="";
formularioMancebo!: FormGroup;
//Documento
documentochave!: string;
indice:number=0;
isSpinnerDisplayed=false;
constructor(
  private modalActual: MatDialogRef<LancamentoexamesComponent>,
  @Inject(MAT_DIALOG_DATA) public dadosMancebo: Estudante,
  private fb:FormBuilder,
  private TurmaotaService: TurmaNotaService,
  private router: Router,
  private dadosTemp : DadosTemporarios,
  private lancaTemp : DadosLancamento,
  private route: ActivatedRoute ,private guararsessoes: GuardarSessoes,
){

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
    let dadostemp = this.dadosTemp.obterSessaoauxiliar();
    this.descrteste=dadostemp.descricao;  
    switch(this.descrteste.toLowerCase()) {
      case 'exame normal':
        this.Habilita1=false;
        this.displayedturma= ['no', 'alunoNome','media','e1','mediafinal'];
        break; 
        case 'exame de recorrência':
          this.Habilita2=false;
          this.displayedturma= ['no', 'alunoNome','media','e2','mediafinal'];
        break; 
        case 'exame especial':
          this.Habilita3=false;          
                this.displayedturma= ['no', 'alunoNome','media','es','mediafinal'];
        break;
    }
    if (this.dadosMancebo != null) {
      this.nims = this.dadosMancebo.turma.toString();
      this.situacaos = this.dadosMancebo.curso;      
      this.titloAccao = " Notas de Exames";
      this.botaoAccao = "Gravar";
    } 
}


closeDialog(){
  this.modalActual.close("true");
this.router.navigate(['Adim/Parametrosvaliacao', {id : this.desc}])
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



  private newMethod($event: Event): string {
    return(($event.target as HTMLInputElement).value);
  }
 
getCurso(){  
  this.isSpinnerDisplayed=true;
 
}

@ViewChild(MatPaginator) paginator!: MatPaginator;

ngAfterViewInit(): void {  
  const Dados = this.guararsessoes.obterSessao()

  if(!this.guararsessoes.isAutenticated()){
    Swal.fire('Erro',`Nao tens permissao para ver este formulario!`,'error');
    return;
  }
  if(Dados.tipo==2){


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
  let dadostemp = this.dadosTemp.obterSessaoauxiliar();
  this.descrteste=dadostemp.descricao;
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
  this.descrteste=dadostemp.descricao;  


  switch(this.descrteste.toLowerCase()) {
    case 'exame normal':
      this.Habilita1=false;
      this.displayedturma= ['no', 'alunoNome','media','e1','mediafinal'];
      break; 
      case 'exame de recorrência':
        this.Habilita2=false;
        this.displayedturma= ['no', 'alunoNome','media','e2','mediafinal'];
      break; 
      case 'exame especial':
        this.Habilita3=false;          
              this.displayedturma= ['no', 'alunoNome','media','es','mediafinal'];
      break;
  }
  if (this.dadosMancebo != null) {
    this.nims = this.dadosMancebo.turma.toString();
    this.situacaos = this.dadosMancebo.curso;      
    this.titloAccao = "Lançamento de Exames";
    this.botaoAccao = "Gravar";
  } 
  this.estudante=xx;
  this.listCurso=this.estudante.turmanota;  
  this.myDataArray=this.estudante.turmanota;
  this.totalRecords=50;
  this.dataListaCurso= new MatTableDataSource(this.listCurso);  
  this.dataListaCurso.sort = this.sort;
  this.dataListaCurso.paginator = this.paginator;
  this.paginator._intl.itemsPerPageLabel = 'itens por página.';
  this.paginator._intl.nextPageLabel = 'Próxima';
   this.paginator._intl.previousPageLabel = 'Anterior';
this.paginator._intl.lastPageLabel = 'Última';
this.paginator._intl.firstPageLabel = 'Primeira';  }else{
    
  Swal.fire('Erro',`Nao tens permissao para ver este formulario!`,'error');
}

}

initialLoad(_descricao:string){
  let currentPage= (this.paginacaoTabela?.pageIndex ?? 0)+1;
  let pageSize= (this.paginacaoTabela?.pageSize ?? 0);
  this.totalRecords=10;
  this.dataListaCurso.data=this.listCurso;
}


novoCurso(){
  
 }
 
 editarCurso(curso:Alauxiliar){
   
 }
 
 eliminarNivel(curso:Alauxiliar){
 
  
 }

}



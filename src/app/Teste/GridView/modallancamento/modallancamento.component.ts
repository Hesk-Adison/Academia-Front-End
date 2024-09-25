
import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule,  PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DynamicGrid } from '../outross/outross.component';

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
  selector: 'app-modallancamento',
  templateUrl: './modallancamento.component.html',
  styleUrls: ['./modallancamento.component.scss'],
})
export class ModallancamentoComponent implements 


AfterViewInit {
  dynamicArray1:Array<DynamicGrid> = [];   
  turmanota:Array<Turmanota1> = []; 
  turmanotas:Array<Turmanota1> = [];   
  dynamicArray: Array<Estudante> = [];  
  carregardados!:carregardados;
  dynamicArrays: Array<Estudante> = [];  
  newDynamic: any = {};  
  lisnewDynamic: Estudante[] = []; 
  estudante!:Estudante;
getRecrutaIncoporado() {
  
}
editarManceboDesmobilizar(_t47: any) {
  
}

  
submit() {
console.log(this.dataListaCurso.data);

  const dadosMancebo=this.lancaTemp.obterSessao();
  this.estudante= {
    turmastamp: dadosMancebo == null ? '' : dadosMancebo.turmastamp,
    anosem: dadosMancebo == null ? '' : dadosMancebo.anosem,
    turma: dadosMancebo == null ? '' : dadosMancebo.turma,
    curso: dadosMancebo == null ? '' : dadosMancebo.curso,
    cursostamp: dadosMancebo == null ? '' : dadosMancebo.cursostamp,
    disciplina: dadosMancebo == null ? '' :dadosMancebo.disciplina,
    ststamp: dadosMancebo == null ? '' : dadosMancebo.ststamp,
    turmanota: this.dataListaCurso.data,
  }
 
  if(this.estudante.turmanota.length==0){
    alert("A grelha de alunos não pode estar vazia, por favor!");
    return;
  }
  if (this.estudante != null) {
    this.TurmaotaService.GravarDadosEst(this.estudante).subscribe({
      next: (data) => {

        if (data.sucesso) {
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
          alert(`Lançamento executado com sucesso`);
          //this.closeDialog()
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

  public doFilter = (value: string) => {
    this.dataListaCurso.filter = value.trim().toLocaleLowerCase();
  }

busca(event: Event) {

  this.dataListaCurso.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
}

myDataArray: Array<Turmanota1> = []; 


onKeyPress($event: Event,_t25: Turmanota1,number: number) {

let id=($event.target as HTMLInputElement).id.replace(`-${number}`,'').toString().toLowerCase()
switch(id){
  case 'n1':

  _t25.n1 =this.newMethod($event);
    break;
    case 'n2':
      _t25.n2 =this.newMethod($event) ;
      break;
      case 'n3':
        _t25.n3 =this.newMethod($event) ;
        break;
        case 'n4':
          _t25.n4 =this.newMethod($event) ;
          break;
          case 'e1':
            _t25.e1 =this.newMethod($event);
            break;
            case 'e2':
              _t25.e2 =this.newMethod($event) ;
              break;
              case 'e2':
                _t25.es =this.newMethod($event) ;
                break;

}
let nota1 : any = document.getElementById("n1-"+number) as HTMLInputElement | null;

let nota2 : any = document.getElementById("n2-"+number) as HTMLInputElement | null
;

let test : any = document.getElementById(`media-${number}`) as HTMLInputElement | null

test.value=(Number(nota2.value)+Number(nota1.value))/2
_t25.media=test.value;
//test.value = nota2.value*nota1.value;
}
  Diaro: diarioClasses[]=[];
  currentDate = new Date();
  listCurso:Turmanota1[]=[];
  divHideShow:boolean=true;
dataListaCurso= new MatTableDataSource(this.listCurso);
@ViewChild(MatPaginator) paginacaoTabela!:MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;
 displayedturma: string[] = ['no', 'alunoNome', 'n1','n2','media'];
totalRecords:number=0;
isSpinnerDisplayed=false;
constructor(
  private modalActual: MatDialogRef<ModallancamentoComponent>,
  @Inject(MAT_DIALOG_DATA) public dadosMancebo: Estudante,
  private fb:FormBuilder,
  private TurmaotaService: TurmaNotaService,
  private router: Router,
  private dadosTemp : DadosTemporarios,
  private guararsessoes : GuardarSessoes,
  private lancaTemp : DadosLancamento,
  private dialog: MatDialog,private route: ActivatedRoute,  
  private paginatorIntl: MatPaginatorIntl
 
){
 
}

  private newMethod($event: Event): string {
    return(($event.target as HTMLInputElement).value);
  }
 
getCurso(){  
  this.isSpinnerDisplayed=true;
 
}

closeDialog(){
  this.modalActual.close("true");
this.router.navigate(['Adim/Parametrosvaliacao', {id : this.desc}])
}

guardarEditarMancebo() {

}
//@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatPaginator, { static: true})  paginator!: MatPaginator;
formularioMancebo!: FormGroup;
  titloAccao: string = "LANÇAMENTO DE NOTAS";
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


ngAfterViewInit(): void {  
  const xx=this.lancaTemp.obterSessao();
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
this.paginator._intl.firstPageLabel = 'Primeira';

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



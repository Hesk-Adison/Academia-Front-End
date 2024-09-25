
import { AfterViewInit, Component, Inject, NgModule, NgZone, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren, forwardRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { HttpClient, HttpClientModule, HttpEventType, HttpRequest } from '@angular/common/http';
import { Cldocview, Clfamview, Clview } from 'src/Models/Cldocs';
import { environment } from 'src/environments/environment.development';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { cllingview, condicoesprocura, contacorrentelista, gradelviw, selects, selectsprocura } from 'src/Models/CampoSessoes';
import { BehaviorSubject, Observable, delay, finalize, map, startWith } from 'rxjs';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { Alauxiliar } from 'src/Models/Alauxiliar';
import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Pe } from 'src/Models/Pe';
import { pelingview } from 'src/Models/pelingview';
import { pecadastroview } from 'src/Models/pecadastroview';
import { Pedoc } from 'src/Models/Pedoc';
import Swal from 'sweetalert2';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, CommonModule, NgSwitch, formatDate } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCake } from '@fortawesome/free-solid-svg-icons';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from 'src/app/app.module';
import { campoDashboard } from 'src/Models/campoDashboard';
import { dmzviewgrelha } from 'src/app/Interfaces/Grade/dmzviewgrelha';
import { ModalPeComponent } from 'src/app/clcadastro/cadastro-pessoa/Modal/modal-pe/modal-pe.component';
import { ChangeDetectorRef } from '@angular/core';

import { MY_DATA_FORMATS } from 'src/app/listaestudantes/modal-estudantes/modal-estudantes.component';
import { dmzview } from 'src/app/Interfaces/Grade/dmzview';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkTableModule } from '@angular/cdk/table';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { Matriculaservice } from '../Portal-da-Secretaria/MatriculaAluno/matriculaservice';
import { PeriodicElementbcbcbc, ModalMatriculaComponent } from '../Portal-da-Secretaria/MatriculaAluno/modal-matricula/modal-matricula.component';
import { ModalprocdisciComponent } from '../Portal-da-Secretaria/MatriculaAluno/modal-matricula/modalprocdisci/modalprocdisci.component';
import { planopag, matriculaAluno, disciplinaTumra, matriculaTurmaAlunol, tdocMat, tRcl } from '../Portal-da-Secretaria/MatriculaAluno/todasClassesmatricula';
import { Modalproc2Component } from '../Portal-da-Secretaria/modalproc2/modalproc2.component';
import { turmanota, turmadisc } from '../Turmas/todastabelasturma';
import { formasp, rCL, rcll } from './TodosRCL';
import { FrmProcuraGeralComponent } from '../frm-procura-geral/frm-procura-geral.component';
import { procura } from '../Interfaces/Procura/Procura';
import { FrmPgfComponent } from '../frm-pgf/frm-pgf.component';
import { Resposta } from 'src/Models/Resposta';
import { Trabalho } from 'src/Models/trabalho';
import { VerTrabalhoComponent } from '../Portal-do-Estudante/trabalho/ver-trabalho/ver-trabalho.component';
import { GuardarSessoes } from '../GuardarSessoes/Gaurdarsessoes';
import { FrmrclBuscaComponent } from '../frmrclBusca/frmrcl-busca/frmrcl-busca.component';
@Component({
  selector: 'app-frm-rcl',
  templateUrl: './frm-rcl.component.html',
  styleUrls: ['./frm-rcl.component.scss'] ,
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => 'lingua'),
      multi: true,
    }
  ],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,MatIconModule,
    MatDividerModule, MatDialogModule,MatTabsModule,MatDatepickerModule,
    MatNativeDateModule ,MatSlideToggleModule ,
    MatAutocompleteModule,
    AsyncPipe,
    FormsModule,
    MatProgressSpinnerModule , MatMenuModule,
    CommonModule,MatCheckboxModule,MatButtonModule,
    A11yModule,
    CdkTableModule,
    CdkTreeModule,
    MatRippleModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
  ],
})
export class FrmRclComponent implements OnInit, AfterViewInit {


  private someInputSubject = new BehaviorSubject<any>(null);
  someInput$ = this.someInputSubject.asObservable();


adicionarRcl // }
() {

  let stamp =this.turmanotaservice.Stamp();

  if(this.cadastro.value.clstamp.length==0){
    Swal.fire('Não permitido!', 'O aluno não foi seleccionado!', 'error');
    return;
  }
  this.getrcll.push(this.fb.group({
    rcllstamp:[stamp],
    rclstamp: [this.clstampvliw],
    ccstamp: [''],
    data:[formatDate(new Date(), 'yyyy-MM-dd', 'en-US')],//.format("yyyy-MM-dd HH-mm-ss"),
    nrdoc:[''],
    descricao: [''],
    valorpreg:[0],
    valordoc:[0],
    mValordoc:[ 0],
    valorreg: [0],
    valorPend: [0],
    mvalorPend:[ 0],
    anulado: [false],
    numinterno: [this.cadastro.value.numero],
    cambiousd: [1],
    origem: [''],
    mvalorpreg: [0],
    mvalorreg: [0],
    descontofin: [0],
    mDescontofin: [0],
    perdescfin: [0],
    rcladiant: [true]
  }));


if(this.itemsFp.length==0){
  this.visibilidadeagregado=true;
  let stamp =this.turmanotaservice.Stamp();
    this.itemsFp.push(this.fb.group({
      formaspstamp: [stamp],
      titulo: [''],
      numtitulo: [''],
      dcheque: [new Date()],
      banco: [this.optionsEtapaSemestre[0].sigla],
      banco2: [''],
      contatesoura: [this.optionsEtapaSemestre[0].contas],
      valor: [0],
      codtz: [this.docMat.codtz],
      codtz2: [0],
      contatesoura2: [''],
      contasstamp2: [''],
      trf: [false],
      numer: [false],
      tipo: [false],
      obgTitulo: [false],
      rclstamp: [this.clstampvliw],
      oristamp: [this.clstampvliw],
      factstamp: [''],
      faccstamp: [''],
      pgfstamp: [''],
      perclstamp: [''],
      status: [false],
      distamp: [''],
      cpoc: [0],
      contaPgc: [0],
      origem: ['Rcl'],
      mvalor: [0],
      codmovtz: [this.docMat.codmovtz],
      descmovtz: [this.docMat.descmovtz],
      codmovtz2: [0],
      descmovtz2: [''],
      usrLogin: [''],
      aberturaCaixa: [false],
      no: [this.cadastro.value.no],
      nome: [this.cadastro.value.nome],
      numero: [this.cadastro.value.numero],
      ccusto: [this.cadastro.value.ccusto],
      contasstamp: [this.optionsEtapaSemestre[0].contasstamp],
      ccustamp: [this.cadastro.value.ccustamp],
      moeda: ['MZN'],
      cambiousd: [1]
    }));
}

}
  ngAfterViewInit() {

    this.dataListaturma.paginator=this.paginatorTeste.toArray()[0];
   
    this.cdr.detectChanges();



  }

  carregarRCL(){
    
    this.dialog.open(FrmrclBuscaComponent, {
     //height: '77%',
       width: '50%',
      disableClose: true,
     // data: estudante,
      autoFocus: false,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    }).afterClosed().subscribe(resultado => {})
  }

  getTotalCost(){
    return 25;
  }
  @ViewChild(MatPaginator, { static: true})  paginacaoTabela!: MatPaginator;

  @ViewChild(MatPaginator)  paginacaoTurmas!: MatPaginator;
listaplanopagamento:planopag[]=[]


allComplete: boolean = false;
habilitarcheckebo: boolean = false;



    totalRecords: number = 0;

    pagenumber: number = 0;
    pagesize: number = 0;

    pagetotalrecord: number = 0;
    isSpinnerDisplayed = false;
    listplanopagamento: dmzview[] = [];
    dataListaplanopagamento = new MatTableDataSource(this.listplanopagamento);



    myControl = new FormControl<string | selects>('');
    options: selects[] = [];
    filteredOptions!: Observable<selects[]>;
    myControlsexo = new FormControl<string | selects>('');
    optionssexo: selects[] = [];
    filteredOptionssexo!: Observable<selects[]>;
    myControlestadociv = new FormControl<string | selects>('');
    optionsestadociv: selects[] = [];
    filteredOptionsestadociv!: Observable<selects[]>;
    sexo:string='';
    estadocivil:string='';
    SetSexo(item:selects){
  this.sexo=item.descricao;
    }
    Setestadoscivil(item:selects){
      this.estadocivil=item.descricao;
        }


    working = false;
    uploadFile!: File | null;
    selectedFile!: any;
    uploadFileLabel: string | undefined = 'Escolha a imagem';
    uploadProgress: number=0;
    uploadUrl: string="";
    name = '';
    fileUrl!:any;
    fileName!:string;


    descricaopais!: string;
    paisstamp!: string;
    descricaoProvincia!: string;
    Provinciastamp!: string;

    descricaodistrito!: string;
    distritostamp!: string;
    disabiltabtnSave:any;



  //Filtro de provincia local emissao
  myControlprovincia = new FormControl<string | selects>('');
  myControlbis = new FormControl<string | selects>('');

  optionslistaprovincia: selects[] = [];
  filteredOptionsprovincia!: Observable<selects[]>;
  listaprovincia: selects[] = [];
  listaaprovinciafilterr: selects[] = [];



  //Filtro de paises  local nasciment
  myControlpaises = new FormControl<string | selects>('');
  optionslistapaises: selects[] = [];
  filteredOptionspaises!: Observable<selects[]>;
  //listapaises: selects[] = [];


  listaapaisesfilterr: selects[] = [];

  //Filtro de provincia local nasciment
  myControlprovincianasciment = new FormControl<string | selects>('');
  optionslistaprovincianasciment: selects[] = [];
  filteredOptionsprovincianasciment!: Observable<selects[]>;
  listaprovincianasciment: selects[] = [];
  listaaprovinciafilterrnasciment: selects[] = [];
  //Filtro de Distrito nascimento
  myControldistrito = new FormControl<string | selects>('');
  optionslistadistrito: selects[] = [];
  filteredOptionsdistrito!: Observable<selects[]>;
  listadistrito: selects[] = [];
  listaadistritofilterr: selects[] = [];



  myControllocalemissao = new FormControl<string | selects>('');
  optionsemissao: selects[] = [];
  filteredOptionsemissao!: Observable<selects[]>;

  myControldisciplinas = new FormControl<string | matriculaAluno>('');
  optionsdisciplinas: matriculaAluno[] = [];
  filtareringoptionsdisciplinas: matriculaAluno[] = [];
  filteredOptionsdisciplinas!: Observable<matriculaAluno[]>;
  async  getdisciplinas() {




  }





  myControlstatuss = new FormControl<string | selects>('');
  optionsstatuss: selects[] = [];
  filteredOptionsstatuss!: Observable<selects[]>;

  @ViewChild('listastatuss') listastatuss!: MatSelect;
  statuss:string='';


  Setstatuss(item:selects){
    this.statuss=item.descricao;
    this.cadastro.patchValue({
      sitcao:this.statuss,
    })
      }
  async Getstatuss(){
    const se:condicoesprocura={
      tabela:"Auxiliar",
    campo1: "descricao",
    campo2:"codigo",
     condicao:"Tabela=79"
    }
    //codigo,descricao
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionsstatuss = data.dados.selects;
          this.filteredOptionsstatuss = this.myControlstatuss.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsstatuss) : this.optionsstatuss.slice();
            }),
          );
        } else {
          this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
        }
      },
      error: (e) => {
        this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });

  }


  async GetDisciplina(){
    const se:condicoesprocura={
      tabela:"st",
    campo1: "descricao",
    campo2:"referenc",
     condicao:"vazio"
    }
    //codigo,descricao
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionsst = data.dados.selects;

          this.optionsstref = data.dados.selects;
          this.filteredOptionsst= this.myControlst.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsst) : this.optionsst.slice();
            }),
          );

          this.filteredOptionsstref= this.myControlstref.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.ordem;
              return name ? this._filterref(name as string,this.optionsstref) : this.optionsstref.slice();
            }),
          );
        } else {
          this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
        }
      },
      error: (e) => {
        this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });

  }



  myControlreliagiao = new FormControl<string | selects>('');
  optionsreliagiao: selects[] = [];
  filteredOptionsreliagiao!: Observable<selects[]>;




listaccfill: rcll[]=[]

  turma: dmzview[]=[]
  turmaa: dmzview[]=[]
  dataListaturma = new MatTableDataSource(this.listaccfill);
  colunas=['nrdoc','descricao','data','valordoc','valorpreg','valorreg','desconto','valorpend','marcar']



  // colunas=[,'valorpend','marcar']
totalrecordturma:number=0;



disciplinasa: dmzview[]=[]
disciplinas: dmzview[]=[]

 @ViewChildren(MatPaginator) paginatorTeste = new QueryList<MatPaginator>();



listacc: dmzview[]=[]



async editarestudante(estudante: selectsprocura) {
  this.dialog.open(FrmPgfComponent, {
    // height: '77%',
    // width: '50%',
    disableClose: true,
    data: estudante,
    autoFocus: false,
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  }).afterClosed().subscribe(resultado => {
    if (resultado) {
      this.listacc=resultado;

      // console.log(this.listacc)
      let todostrue=this.listacc;

      const listaOrdenada = this.listacc.sort((a, b) => {
        return new Date(a.col3).getTime() - new Date(b.col3).getTime();
      });

      // console.log(listaOrdenada)

      for (let i = 0; i < todostrue.length; i++) {

      let tr:boolean=false;
        if(todostrue[i].col19.toLowerCase()!='false'){
          tr=true;
        }
        this.listaccfill.push({
          rcllstamp:this.turmanotaservice.Stamp()+i,
          rclstamp: this.clstampvliw,
          ccstamp: todostrue[i].col8,
          data:formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),//.format("yyyy-MM-dd HH-mm-ss"),
          nrdoc:todostrue[i].col2,
          descricao: todostrue[i].col1,
          valorpreg:Number(todostrue[i].col5)*1,
          valordoc:Number(todostrue[i].col4)*1,
          mValordoc: 0,
          valorreg: Number(todostrue[i].col6)*1,
          valorPend: (Number(todostrue[i].col5)*1)-(Number(todostrue[i].col6)*1),
          mvalorPend: 0,
          anulado: false,
          numinterno: this.cadastro.value.numero,
          cambiousd: 1,
          origem: '',
          mvalorpreg: 0,
          mvalorreg: 0,
          descontofin: 0,
          mDescontofin: 0,
          perdescfin: 0,
          rcladiant: tr
        });

        }


        this.dataListaturma.data=this.listaccfill;
if(this.listaccfill.length>0){
if(this.itemsFp.length==0){
  this.adicionarFp();


}


}

    }
  });
}
get itemsFp(): FormArray {

  return this.cadastro.get('formasp') as FormArray;
 }

 onSelectbi(value:selects,i:number) {


  let langArr = (<FormArray>this.cadastro.get('formasp'));
  langArr.controls[i].patchValue({titulo:value.descricao,
        })



}
colunasturmacopy=['numero','nome','email','marcar']
  async Getturmas(){

    if(this.cadastro.value.cursostamp.length==0){
      Swal.fire('Não permitido!', 'O curso do aluno está vazio!', 'error')
      return;
    }
    if(this.cadastro.value.clstamp.length==0){
      Swal.fire('Não permitido!', 'Indica o aluno primeiro!', 'error')
      return;
    }


    let set:selectsprocura={
      chave:  this.docMat.tRclstamp,
      descricao: this.docMat.tRclstamp,
      ordem: this.cadastro.value.clstamp,
      stamplocal: this.clstampvliw,
      stampsexcepcao:this.cadastro.value.clstamp
    }

this.editarestudante(set);





  }




  async Getcl(){
    const se:condicoesprocura={
      tabela:"cl",
    campo1: "nome",
    campo2:"no",
     condicao:"aluno=1"
    }
    //codigo,descricao
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionscl = data.dados.selects;
          this.optionsclcodo = data.dados.selects;
          this.filteredOptionscl= this.myControlcl.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionscl) : this.optionscl.slice();
            }),
          );

          this.filteredOptionsclcodo= this.myControlclcodo.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.ordem;
              return name ? this._filterref(name as string,this.optionsclcodo) : this.optionsclcodo.slice();
            }),
          );


        } else {
         // this._loginservice.mostrarAlerta("Nao foi possivel carregar a lista de alunos", "Opps");
        }
      },
      error: (e) => {
       // this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });

  }



  myControlcl= new FormControl<string | selects>('');
  optionscl: selects[] = [];
  filteredOptionscl!: Observable<selects[]>;

  myControlclcodo= new FormControl<string | selects>('');
  optionsclcodo: selects[] = [];
  filteredOptionsclcodo!: Observable<selects[]>;


  @ViewChild('listareliagiao') listareliagiao!: MatSelect;
  reliagiao:string='';




  myControlplanocurricular = new FormControl<string | selects>('');
  optionsplanocurricular: selects[] = [];
  filteredOptionsplanocurricular!: Observable<selects[]>;

  @ViewChild('listaplanocurricular') listaplanocurricular!: MatSelect;
  planocurricular:string='';
  planocurricularstamp:string='';









  myControlCurso = new FormControl<string | selects>('');
  optionsCurso: selects[] = [];
  filteredOptionsCurso!: Observable<selects[]>;
  Curso:string='';
  Cursostamp:string='';
  SetCurso(item:selects){
    this.Curso=item.descricao;
  this.Cursostamp=item.chave;
  this.Getplanocurricular(item);
      }
  async GetCurso(){
    const se:condicoesprocura={
      tabela:"Curso",
    campo1: "Desccurso",
    campo2:"Codcurso",
     condicao:"vazio"
    }

    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionsCurso = data.dados.selects;
          this.filteredOptionsCurso = this.myControlCurso.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsCurso) : this.optionsCurso.slice();
            }),
          );
        } else {
          this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
        }
      },
      error: (e) => {
        this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });

  }


  Setplanocurricular(item:selects){
    this.planocurricular=item.descricao;
  this.planocurricularstamp=item.chave;
      }
  async Getplanocurricular(value1:selects) {
    this. myControlplanocurricular = new FormControl<string | selects>('');
     let value = value1.chave;
     const se:condicoesprocura={
      tabela:"Grade",
      campo1: "Descricao",
      campo2:"Codigo",
      condicao:`cursostamp='${value}'`
     }

    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionsplanocurricular = data.dados.selects;
          this.filteredOptionsplanocurricular = this.myControlplanocurricular.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsplanocurricular) : this.optionsplanocurricular.slice();
            }),
          );
        } else {
          this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
        }
      },
      error: (e) => {
        this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });

  }





  myControlst = new FormControl<string | selects>('');
  optionsst: selects[] = [];
  filteredOptionsst!: Observable<selects[]>;

  myControlstref = new FormControl<string | selects>('');
  optionsstref: selects[] = [];
  filteredOptionsstref!: Observable<selects[]>;


  disciplina:string='';
  ststamp:string='';

  displayValue(x:any,i:number){
  var fff=x.target.value;
  this.listaturmadis[i].disciplina=fff;

  }
  Setgrauparen(item:selects,i:number){
    this.listaturmadis[i].disciplina=item.descricao;
    this.listaturmadis[i].referenc=item.ordem;
    this.listaturmadis[i].ststamp=item.chave;
  (<FormArray>this.cadastro.get('turmadisc')).clear();
    this.carregarturmadisc(this.listaturmadis)
      }


      SetAluno(item:selects,i:number){
   // this.listaturmal[i].no=item.ordem;
   // this.listaturmal[i].nome=item.descricao;
    //this.listaturmal[i].clstamp=item.chave;
  this.matriculaTurmaAlunol.clear();
    this.carregarmatriculaTurmaAlunol(this.listamatriculaTurmaAlunol)

          }

  paisnascimento:string='';
  pprovnascimento:string='';
  codprovnascimento:number=0;
  pprovnascimentostamp:string='';
  distrnascimento:string='';


  private _filter(name: string,list:selects[]): selects[] {
    const filterValue = name.toLowerCase();
    let fffh=list.filter(option => option.descricao.toLowerCase().includes(filterValue));

    return fffh;
  }

  private _filtercontas(name: string,list:any[]): any[] {
    const filterValue = name.toLowerCase();
    let fffh=list.filter(option => option.contas.toLowerCase().includes(filterValue));

    return fffh;
  }



  private _filterref(name: string,list:selects[]): selects[] {
    const filterValue = name.toLowerCase();
    return list.filter(option => option.ordem.toLowerCase().includes(filterValue));
  }

  isibilidadeturmanota=false;
  carregarturmanota(afam: turmanota[]) {
    this.isibilidadeturmanota=true;
    const formArray = this.cadastro.get('turmanota') as FormArray;
    afam.map(item => {
      formArray.push(this.aturmanota(item));
    });
  }
  aturmanota(item: turmanota): any {
    return this.fb.group({

      turmanotastamp: [item.turmanotastamp],
         turmastamp :[item.turmastamp],
         no : [item.no],
         alunostamp : [item.alunostamp],
         alunoNome : [item.alunoNome],
         n1:[item.n1],
         n2:[item.n2],
         n3:[item.n3],
         n4:[item.n4],
         n5:[item.n5],
         media:[item.media],
         data:[item.data],
         aprovado:[item.aprovado],
         coddis:[item.coddis],
         disciplina:[item.disciplina],
         anosem : [item.anosem],
         sem : [item.sem],
         cursostamp : [item.cursostamp],
         e1:[item.e1],
         e2:[item.e2], //Exame Recurso
         es:[item.es], //Exame especial
         mediafinal:[item.mediafinal],
          pestamp : [item.pestamp],
          Profnome : [item.profnome],
          pestamp2 : [item.pestamp2],
          profnome2 : [item.profnome2],
          fecho: [item.fecho],//Fechar o diario pelo professor (Basta fechar nao tera mais possibilidade de alterar)
         //Dados adicionados e alterados
          datafecho:[item.datafecho],
          resultado:[item.resultado],     //Para Obter todos admitidos/Excluidos
          resultadoFinal:[item.resultadoFinal],   //Para obter todas stuacoes
         //de resultados nos exames
          codSit: [item.codSit], //1=exluido,2=admitido,3=dispensado
         //,4=aprovado,5=reprovado
          codetapa: [item.codetapa]  ,
          activo: [item.activo], //True=matrícula cancelada e false = matrícula activa
          motivo : [item.motivo],//Motivo pelo qual lhe leva ao cancelamento da matrícula
          obs : [item.obs], //Motivo pelo qual lhe leva ao cancelamento da matrícula


        })
    }







  carregarturmadisc(afam: turmadisc[]) {
    this.visibilidadeturmadisc=true;
    const formArray = this.cadastro.get('turmadisc') as FormArray;
    afam.map(item => {
      formArray.push(this.aturmadisc(item));
    });
  }
  aturmadisc(item: turmadisc): any {
    return this.fb.group({
      turmadiscstamp:[item.turmadiscstamp],
      turmastamp:[item.turmastamp],
      ststamp :[item.ststamp],
      referenc :[item.referenc],
      disciplina :[item.disciplina],
      turmadiscp :[item.turmadiscp],//True=matrícula cancelada e false = matrícula activa

        })
    }

  cldocumentos = new FormArray([]);
  disciplinades:string='';
  visibilidadeturmal:boolean=false;
  carregarmatriculaTurmaAlunol(afam: formasp[]) {


    this.visibilidadeturmal=true;
    this.isLoggedIn=false;
    const formArray = this.cadastro.get('formasp') as FormArray;
    afam.map(item => {
      formArray.push(this.aformap(item));
    });
  }
  ststampsss:string='';
  aformap(item: formasp): any {

   // itemsFp
    return this.fb.group({
      formaspstamp: [item.formaspstamp],
      titulo: [item.titulo],
      Numtitulo: [item.numtitulo],
      dcheque: [item.dcheque],
      banco: [item.banco],
      banco2: [item.banco2],
      contatesoura: [item.contatesoura],
      valor: [item.valor],
      codtz: [item.codtz],
      codtz2: [item.codtz2],
      contatesoura2: [item.contatesoura2],
      contasstamp2: [item.contasstamp],
      trf: [item.trf],
      numer: [item.numer],
      tipo: [item.tipo],
      obgTitulo: [item.obgTitulo],
      rclstamp: [item.rclstamp],
      oristamp: [item.oristamp],
      factstamp: ['item.factstamp'],
      faccstamp: ['item.faccstamp'],
      pgfstamp: ['item.pgfstamp'],
      perclstamp: ['item.perclstamp'],
      status: [item.status],
      distamp: ['item.distamp'],
      cpoc: [item.cpoc],
      contaPgc: [item.contaPgc],
      origem: [item.origem],
      mvalor: [item.mvalor],
      codmovtz: [item.codmovtz],
      descmovtz: [item.descmovtz],
      codmovtz2: [item.codmovtz2],
      descmovtz2: [item.descmovtz2],
      usrLogin: [item.usrLogin],
      aberturaCaixa: [item.aberturaCaixa],
      no: [item.no],
      nome: [item.nome],
      numero: [item.numero],
      ccusto: [item.ccusto],
      contasstamp: [item.contasstamp],
      ccustamp: [item.ccustamp],
      moeda: [item.moeda],
      cambiousd: [item.cambiousd]
    })
    }


    carregardisciplinaturma(afam: disciplinaTumra[]) {
      this.visibilidadeturmadisc=true;
      // const formArray = this.disciplinaTumra;
      // afam.map(item => {
      //   formArray.push(this.adisciplinaturma(item));
      // });

      // this.ststampsss='';
      // for (let i = 0; i < this.listamatriculadisciplinaTumra.length; i++) {
      //   if(this.ststampsss.length==0)
      //   {
      //     this.ststampsss=`'${this.listamatriculadisciplinaTumra[i].ststamp}'`
      //   }else{
      //   this.ststampsss+=`,'${this.listamatriculadisciplinaTumra[i].ststamp}'`
      //   }
      //   }
    }
    adisciplinaturma(item: disciplinaTumra): any {

      return this.fb.group({
      matriculaAlunostamp:[item.matriculaAlunostamp],
      codigo:[item.codigo],
      disciplinaTumrastamp:[item.disciplinaTumrastamp],
     disciplina:[item.disciplina],
     referenc:[item.referenc],
     turmastamp:[item.turmastamp],
     ststamp:[item.ststamp],
     clstamp:[item.clstamp],
     sitcao:[item.sitcao],
    activo:[item.activo],//True=matrícula cancelada e false = matrícula activa
     motivo:[item.motivo],
      })
      }


  //======================Teste======================
    cadastro!:FormGroup

    getestudante() {
      this.isSpinnerDisplayed = true;
      let nimNome = '';

let prc:procura={
  tabela: 'cl',
  campo: 'nome',
  campo1: 'no',
  chave: 'clstamp',
  valorprocurado: nimNome,
  currentNumber: 1,
  pagesize: 5,
  marcar: false,
  professorstamp:'',
      alunoestamp: '',
      rhstamp:'',
      referencia:'',
      descricao:'',
      origem:'',
}
      this.dialog.open(FrmProcuraGeralComponent, {
        // height: '77%',
        // width: '50%',
        disableClose: true,
        data: prc,
        autoFocus: false,
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
      }).afterClosed().subscribe(resultado => {
    

        if (resultado) {

let set:selects={
  chave: resultado.chave,
  descricao: resultado.chave,
  ordem: resultado.chave
}

this.itemsFp.clear();
this.dataListaturma.data=[];
this.listaccfill=[];
          this.onSelectAluno(set)
        }
      });
    }

    cadastros!:FormGroup
    DadosGerais!: Clview
    fotos: any
    foto: any

    colunasTabela: string[] = ['no','entidadebanc', 'referencia','descricao','data','dataven','valorreg'];
    colunasTabelaprofes: string[] = ['no','codigo', 'descricao', 'accoes'];
      titloAccao: string='';
      botaoAccao: string='';
    clfamstamp: string=''

    labelPosition: 'before' | 'after' = 'after';
    disabled = false;
      constructor(
        private fb:FormBuilder,
        private turmanotaservice: TurmaNotaService,private http: HttpClient,
        private _loginservice: LoginServiceService,
         private _estudanteService: Matriculaservice,
         private dialog: MatDialog,library: FaIconLibrary,
         private matriculaservice:Matriculaservice,
         private guardarsessoes:GuardarSessoes,
         private cdr: ChangeDetectorRef,
         private ngZone: NgZone

      ){
        library.addIcons(faCake);
        //this.dataListaturma.paginator = this.paginacaoTurmas;
        this.titloAccao=`Novo`;
        this.botaoAccao=`Salvar`;
        this.cadastro = this.fb.group({
          rclstamp :[''],
            numero :[0],
            tRclstamp :['',Validators.required],
            data : [new Date()],
            nuit :[0],
            morada :[''],
            localidade :[''],
            no :['',Validators.required],
            nome :['',Validators.required],
            moeda :[''],
            banco :[''],
            total :[0],
            mtotal :[0],
            obs :[''],
            process :[false],
            rcladiant :[false],//Recibo de adiantamento
            dprocess :[new Date()],
            anulado :[false],
            ccusto :[''],
            ccustamp :[''],
            numdoc :[0],
            sigla :[''],
            nomedoc :[''],
            codmovcc :[0],
            descmovcc :[''],
            codmovtz :[0],
            descmovtz :[''],
            nomecomerc :[''],
            integra :[false],
            nodiario :[0],
            diario :[''],
            ndocCont :[0],
            descDocCont :[''],
            estabno :[0],
            estabnome :[''],
            cambiousd :[0],
            moeda2 :[''],
            especial :[false], //Usado definir se pode ser visivel, ou recebe pagamento especial
            pjno :[0],
            pjstamp :[''],
            clstamp :['',Validators.required],
            pjNome :[''],
            descontofin :[0],
            mDescontofin :[0],
            perdescfin :[0],
            usrstamp :[''],
            pos :[false],//Indica a factura foi feita no pos
            cursostamp :[''],
            desccurso :[''],
            turmastamp :[''],
            descturma :[''],
            anosem :[''],
            etapa :[''],
            nivelac:[''],
            cc: this.fb.array([]),
            rcll:this.fb.array([]),
    formasp:this.fb.array([]),
     inserindos :['fdfhdfjdjdf'],
      })
      }



      nos:string='';
      nome=''
     async ngOnInit() {

      

      this.habilitarcheckebo=false;
      await  this.Getstatuss();
     await this. Getturno();
    // await this.GetFaculdade();
    //await this.GetsupervisPedagogico();
     await this.GetAnoSem();
     await this.GetCurso();
     await this.GetDisciplina();
     await this.Getcl();
     await this.GetTipoDocMat();
     //await this.GetFormasingresso();
    // await this.getEntidade();
     await this.getEtapaSemestre();

    this.displayedColumnsfinanceiro= ['codigo','descricao','accoes'];

this.nome=this.guardarsessoes.obterSessao().nome


    this.titloAccao = "Nova Matrícula";
    this.isSpinnerDisplayed = false;
     this.clstampvliw=this.turmanotaservice.Stamp();

     this.editando=false;

    this.botaoAccao = "Salvar";
      }

      isLoggedIn = true;
  myControlccu1 = new FormControl<string | selects>('');
  optionsccu1: selects[] = [];
  filteredOptionsccu1!: Observable<selects[]>;
  editando:boolean=false;


  @ViewChild('listaccu1') listaccu1!: MatSelect;
  ccu1:string='';
  ccu1stamp:string='';
  Setccu1(item:selects){
    this.ccu1=item.descricao;
  this.ccu1stamp=item.chave;
      }

  toggle1(event: MatSlideToggleChange) {
    if(event.checked==true)
    {
      this.cadastro.controls['tipo1'].setValue(true);
      //this.dadosestudantes.horasaulas=1;
    }else{
      //this.dadosestudantes.horasaulas=0;
      this.cadastro.controls['tipo1'].setValue(false);
    }
    this.cadastro.value.tipo3=false;
    this.cadastro.value.tipo2=false;
    this.cadastro.value.tipo4=false;
    this.cadastro.controls['tipo3'].setValue(false);
    this.cadastro.controls['tipo2'].setValue(false);
    this.cadastro.controls['tipo4'].setValue(false);
  }
  toggle2(event: MatSlideToggleChange) {
    if(event.checked!=true)
    {
      //this.dadosestudantes.tipo=0;
    }else{

      //this.dadosestudantes.tipo=1;
    }
    this.cadastro.value.tipo1=false;
    this.cadastro.value.tipo3=false;
    this.cadastro.value.tipo4=false;
    this.cadastro.controls['tipo3'].setValue(false);
    this.cadastro.controls['tipo1'].setValue(false);
    this.cadastro.controls['tipo4'].setValue(false);
  }
  toggle3(event: MatSlideToggleChange) {
    if(event.checked!=true)
    {
      //this.dadosestudantes.tipo=0;
    }else{

      //this.dadosestudantes.tipo=3;
    }
    this.cadastro.value.tipo1=false;
    this.cadastro.value.tipo2=false;
    this.cadastro.value.tipo4=false;
    this.cadastro.controls['tipo1'].setValue(false);
    this.cadastro.controls['tipo2'].setValue(false);
    this.cadastro.controls['tipo4'].setValue(false);

  }
  toggle4(event: MatSlideToggleChange) {
    if(event.checked!=true)
    {
      //this.dadosestudantes.tipo=0;
    }else{

     // this.dadosestudantes.tipo=4;
    }
    this.cadastro.value.tipo1=false;
    this.cadastro.value.tipo2=false;
    this.cadastro.value.tipo3=false;
    this.cadastro.controls['tipo3'].setValue(false);
    this.cadastro.controls['tipo2'].setValue(false);
    this.cadastro.controls['tipo1'].setValue(false);
  }

  myControlAnoSem = new FormControl<string | selects>('');
  optionsAnoSem: selects[] = [];
  filteredOptionsAnoSem!: Observable<selects[]>;




  myControlTipoDoc = new FormControl<string | selects>('');
  optionsTipoDoc: selects[] = [];
  filteredOptionsTipoDoc!: Observable<selects[]>;





  tdocdescricao:string='';
  tdocstamp:string='';
  numdoc:number=0;
  docMat!:tRcl;
  visiblelinhas=false
  visibletable=true
  SetTipoDoc(item:selects){


    this.getrcll.clear();
    this.dataListaturma= new MatTableDataSource(this.listaccfill);
   this._estudanteService.GettRclsingleq(item.chave).subscribe({
    next: (data) => {
      if (data.sucesso) {
        this.docMat = data.dados;
        this.myControlTipoDoc.setValue(this.docMat.descricao);
        this.cadastro.patchValue({
          numdoc : this.docMat.numdoc,
          nomedoc : this.docMat.descricao,
          codmovcc : this.docMat.codmovcc,
          descmovcc : this.docMat.descmovcc,
          sigla : this.docMat.sigla,
          codmovtz : this.docMat.codmovtz,
          descmovtz : this.docMat.descmovtz,
          rcladiant : this.docMat.rcladiant,
          tRclstamp : this.docMat.tRclstamp,
        });


        this.visibilidadeRclAdiant=false;

        if (this.docMat.rcladiant==true)
          {
            this.visibilidadeRclAdiant=true;
            this.visiblelinhas=true
            this.visibletable=false
          }
          else{
            this.visiblelinhas=false
            this.visibletable=true
          }
        if(this.editando!=true){
          let item:selects={
            chave: 'rcl',
            descricao: 'numero',
            ordem: `numdoc=${this.docMat.numdoc}`
          }
          // this._estudanteService.GetMax(item).subscribe({
          //   next: (data) => {
          //     if (data.sucesso) {
          //       this.cadastro.patchValue({
          //         numero:data.dados.chave
          //       })
          //     }
          //   }
          // });
        }
      }
    }
  });
      }
      
      SetTipoDoc111(item:selects){


        this.getrcll.clear();
        this.dataListaturma= new MatTableDataSource(this.listaccfill);
        const filterValue = 'Recibo do Alunos'.toLowerCase();
        let filtro=this.optionsTipoDoc.filter(option => option.descricao.toLowerCase().includes(filterValue));
          //this.docMat = filtro[1];

          this.myControlTipoDoc.setValue(this.docMat.descricao);
          this.cadastro.patchValue({
            numdoc : this.docMat.numdoc,
            nomedoc : this.docMat.descricao,
            codmovcc : this.docMat.codmovcc,
            descmovcc : this.docMat.descmovcc,
            sigla : this.docMat.sigla,
            codmovtz : this.docMat.codmovtz,
            descmovtz : this.docMat.descmovtz,
            rcladiant : this.docMat.rcladiant,
            tRclstamp : this.docMat.tRclstamp,
          });
          this.visibilidadeRclAdiant=false;
  
          if (this.docMat.rcladiant==true)
            {
              this.visibilidadeRclAdiant=true;
            }
          if(this.editando!=true){
            let item:selects={
              chave: 'rcl',
              descricao: 'numero',
              ordem: `numdoc=${this.docMat.numdoc}`
            }
            // this._estudanteService.GetMax(item).subscribe({
            //   next: (data) => {
            //     if (data.sucesso) {
            //       this.cadastro.patchValue({
            //         numero:data.dados.chave
            //       })
            //     }
            //   }
            // });
        
        }
          }
  verifica=false
  async GetTipoDocMat(){

    const se:condicoesprocura={
      tabela:"TRcl",
    campo1: "descricao",
    campo2:"Sigla",
     condicao:"Descricao <>'Recibo'"
     //condicao:"TRclstamp= '490D20214DMZ15101936'"
    }
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionsTipoDoc = data.dados.selects;
          this.filteredOptionsTipoDoc = this.myControlTipoDoc.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsTipoDoc) : this.optionsTipoDoc.slice();
            }),
          );
   
   
      
          let se:selects={
            chave: '490D20214DMZ15101936',
            descricao: 'Recibo de alunos',
            ordem: '3'
          }
      
          this.SetTipoDoc(se);
        
          

        } else {
        }
      },
      error: (e) => {
      }
    });

  }



  myControlFormasingresso = new FormControl<string | selects>('');
  optionsFormasingresso: selects[] = [];
  filteredOptionsFormasingresso!: Observable<selects[]>;

  SetFormasingresso(item:selects){


      }

  async GetFormasingresso(){
    const se:condicoesprocura={
      tabela:"Auxiliar",
    campo1: "descricao",
    campo2:"codigo",
     condicao:"Tabela =81"
    }
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionsFormasingresso = data.dados.selects;
          this.filteredOptionsFormasingresso = this.myControlFormasingresso.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsFormasingresso) : this.optionsFormasingresso.slice();
            }),
          );
          let se:selects={
            chave: '464D20237DMZ12111417',
            descricao: 'MATRÍCULA',
            ordem: '1'
          }
          //this.SetTipoDoc(se);
        } else {
        }
      },
      error: (e) => {
      }
    });

  }


  AnoSem:string='';
  AnoSemstamp:string='';



  SetAnoSem(item:selects){
    this.AnoSem=item.descricao;
  this.AnoSemstamp=item.chave;
      }
  async GetAnoSem(){
    const se:condicoesprocura={
      tabela:"AnoSem",
    campo1: "codigo",
    campo2:"descricao",
     condicao:"vazio"
    }

    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionsAnoSem = data.dados.selects;
          this.filteredOptionsAnoSem = this.myControlAnoSem.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsAnoSem) : this.optionsAnoSem.slice();
            }),
          );
        } else {
          this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
        }
      },
      error: (e) => {
        this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });

  }








  myControlsupervisPedagogico = new FormControl<string | selects>('');
  optionssupervisPedagogico: selects[] = [];
  filteredOptionssupervisPedagogico!: Observable<selects[]>;

  supervisPedagogico:string='';
  supervisPedagogicostamp:string='';



  SetsupervisPedagogico(item:selects){
    this.supervisPedagogico=item.descricao;
  this.supervisPedagogicostamp=item.chave;
      }
  async GetsupervisPedagogico(){
    const se:condicoesprocura={
      tabela:"pe",
    campo1: "nome",
    campo2:"no",
     condicao:"Coordenador=1"
    }
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionssupervisPedagogico = data.dados.selects;
          this.filteredOptionssupervisPedagogico = this.myControlsupervisPedagogico.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionssupervisPedagogico) : this.optionssupervisPedagogico.slice();
            }),
          );
        } else {
          this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
        }
      },
      error: (e) => {
        this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });

  }

  myControlFaculdade = new FormControl<string | selects>('');
  optionsFaculdade: selects[] = [];
  filteredOptionsFaculdade!: Observable<selects[]>;
  Faculdade:string='';
  Faculdadestamp:string='';
  async GetFaculdade(){
    const se:condicoesprocura={
      tabela:"ccu",
    campo1: "descricao",
    campo2:"CodCcu",
     condicao:"vazio"
    }

    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionsFaculdade = data.dados.selects;
          this.filteredOptionsFaculdade = this.myControlFaculdade.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsFaculdade) : this.optionsFaculdade.slice();
            }),
          );
        } else {
          this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
        }
      },
      error: (e) => {
        this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });

  }
  SetFaculdade(item:selects){
    this.Faculdade=item.descricao;
  this.Faculdadestamp=item.chave;
      }



  @ViewChild('listasupervisPedagogico') listasupervisPedagogico!: MatSelect;


  @ViewChild('listaFaculdade') listaFaculdade!: MatSelect;

      myControlturno = new FormControl<string | selects>('');
      optionsturno: selects[] = [];
      filteredOptionsturno!: Observable<selects[]>;
      EtapaSemestre: string='';
      EtapaSemestrestamp: string='';

      onSetEtapaSemestre(value:any,i:number) {

  let langArr = (<FormArray>this.cadastro.get('formasp'));
  langArr.controls[i].patchValue(
    {
      contatesoura:value.contas,
      codtz:value.codigo,
      banco:value.sigla,
      contasstamp:value.contasstamp,
        }
  )
      } 
      
    

      
    
adicionarFp() {



   if(this.cadastro.value.cursostamp.length==0){
    Swal.fire('Não permitido!', 'O curso do aluno está vazio!', 'error')
    return;
  }
  if(this.cadastro.value.clstamp.length==0){
    Swal.fire('Não permitido!', 'Indica o aluno primeiro!', 'error')
    return;
  }


  if(this.calculationtotalpago()==0){
    Swal.fire('Não permitido!', 'Carrega os documentos por regularizar primeiro!', 'error')
    return;
  }

let yotal=0;
let sum = this.itemsFp.value.reduce((prev: number,
   next: { valor: string | number; }) => prev + +next.valor, 0);

yotal=Number(this.calculationtotalpago())-Number(sum)


    if(this.calculationtotalpago()==sum){
      Swal.fire('Não permitido!', 'Já não é possivel adicionar mais formas de pagamentos!', 'error')
      return;
    }
    if(this.calculationtotalpago()<yotal){
      Swal.fire('Não permitido!', 'O total pago não pode ser inferior ao favor das formas de pagamentos!', 'error')
      return;
    }


    if(this.optionsEtapaSemestre.length==0){
      Swal.fire('Não permitido!', 'O sistema não conseguiu carregar as contas!', 'error')
      return;
    }

  this.visibilidadeagregado=true;
let stamp =this.turmanotaservice.Stamp();


  this.itemsFp.push(this.fb.group({
    formaspstamp: [stamp],
    titulo: [''],
    numtitulo: [''],
    dcheque: [new Date()],
    banco: [this.optionsEtapaSemestre[0].sigla],
    banco2: [''],
    contatesoura: [this.optionsEtapaSemestre[0].contas],
    valor: [yotal],
    codtz: [this.docMat.codtz],
    codtz2: [0],
    contatesoura2: [''],
    contasstamp2: [''],
    trf: [false],
    numer: [false],
    tipo: [false],
    obgTitulo: [false],
    rclstamp: [this.clstampvliw],
    oristamp: [this.clstampvliw],
    factstamp: [''],
    faccstamp: [''],
    pgfstamp: [''],
    perclstamp: [''],
    status: [false],
    distamp: [''],
    cpoc: [0],
    contaPgc: [0],
    origem: ['Rcl'],
    mvalor: [0],
    codmovtz: [this.docMat.codmovtz],
    descmovtz: [this.docMat.descmovtz],
    codmovtz2: [0],
    descmovtz2: [''],
    usrLogin: [''],
    aberturaCaixa: [false],
    no: [this.cadastro.value.no],
    nome: [this.cadastro.value.nome],
    numero: [this.cadastro.value.numero],
    ccusto: [this.cadastro.value.ccusto],
    contasstamp: [this.optionsEtapaSemestre[0].contasstamp],
    ccustamp: [this.cadastro.value.ccustamp],
    moeda: ['MZN'],
    cambiousd: [1]
  }));
}


// ccusto :[''],
// ccustamp :[''],
      myControlEtapaSemestre = new FormControl<string | any>('');
      optionsEtapaSemestre: any[] = [];
      filteredOptionsEtapaSemestre!: Observable<any[]>;

      async  getEtapaSemestre() {

        const se:selects={
          chave: 'GetContas()',
          descricao: 'gfgfg',
          ordem: 'fgfgf'
        }

        this._estudanteService.GetQualquerObjectDt(se).subscribe({
          next: (data) => {
            if (data.sucesso) {
              this.optionsEtapaSemestre = data.dados;

              this.filteredOptionsEtapaSemestre = this.myControlEtapaSemestre.
              valueChanges.pipe(
                startWith(''),
                map(value => {

                  const name = typeof value === 'string' ? value : value?.contas;
                  return name ? this._filtercontas(name as string,this.optionsEtapaSemestre) :
                  this.optionsEtapaSemestre.slice();
                }),
              );

             // this.myControlccu.setValue( {descricao:this.listaccusto[0].descricao,chave:this.listaccusto[0].chave,ordem:this.listaccusto[0].ordem});

            } else {
              this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
            }
          },
          error: (e) => {
            this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
          }
        });
      }



      myControlEntidade = new FormControl<string | selects>('');
      optionsEntidade: selects[] = [];
      filteredOptionsEntidade!: Observable<selects[]>;
      async  getEntidade() {
        //select Contasstamp,Entidadebanc from Contas where Entidadebanc <>''
        const se:condicoesprocura={
          tabela:"Contas",
        campo1: "Entidadebanc",
        campo2:"banco",
         condicao:"Entidadebanc <>''"
        }
        this._loginservice.getselectionPost(se).subscribe({
          next: (data) => {
        
            if (data.sucesso) {
              this.optionsEntidade = data.dados.selects;
              //this.myControlccu.setValue(this.sala);
              this.filteredOptionsEntidade = this.myControlEntidade.valueChanges.pipe(
                startWith(''),
                map(value => {
                  const name = typeof value === 'string' ? value : value?.descricao;
                  return name ? this._filter(name as string,this.optionsEntidade) :
                  this.optionsEntidade.slice();
                }),
              );
  if(data.dados.selects.length>1){
    this.myControlEntidade.setValue(data.dados.selects[1].descricao);
    this.OnSelectplanopag(data.dados.selects[1]);
  }

            } else {
              this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
            }
          },
          error: (e) => {
            this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
          }
        });
      }


      myControlPlanopgt = new FormControl<string | selects>('');
      optionsPlanopgt: selects[] = [];

      optionsPlanopgtGeral: selects[] = [];
      filteredOptionsPlanopgt!: Observable<selects[]>;
      async  getPlanopgt() {
        //select Contasstamp,Entidadebanc from Contas where Entidadebanc <>''
        const se:condicoesprocura={
          tabela:"Planopag",
        campo1: "Descricao",
        campo2:"descanosem",
         condicao:"vazio"
        }
        this._loginservice.getselectionPost(se).subscribe({
          next: (data) => {
            if (data.sucesso) {
              this.optionsPlanopgt = data.dados.selects;
              this.optionsPlanopgtGeral= data.dados.selects;
              this.filteredOptionsPlanopgt = this.myControlPlanopgt.valueChanges.pipe(
                startWith(''),
                map(value => {
                  const name = typeof value === 'string' ? value : value?.descricao;
                  return name ? this._filter(name as string,this.optionsPlanopgt) :
                  this.optionsPlanopgt.slice();
                }),
              );
  if(data.dados.selects.length>1){
    this.myControlEntidade.setValue(data.dados.selects[1].descricao);
    this.OnSelectplanopag(data.dados.selects[1]);
  }

            } else {
              this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
            }
          },
          error: (e) => {
            this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
          }
        });
      }


  GetDividadoAluno(clstamp:string){
    this.isSpinnerDisplayed =true;
    let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
        let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
      this._estudanteService.GetPlanopamentoestudante(clstamp).pipe(
      finalize(() => this.isSpinnerDisplayed = false),
    ).subscribe({
        next: (data) => {
          if (data.sucesso) {
            this.totalRecords = data.dados.dmzview.length;
            this.pagenumber = currentPage;
            this.pagesize = pageSize;
            this.pagetotalrecord=data.dados.dmzview.length;
           this.dataListaplanopagamento.data = data.dados.dmzview;

          }
        },
        error: (e) => {
         // this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
        }
      });

  }

  columns = [
    {
      columnDef: 'position',
      header: 'No.',
      //cell: (element: PeriodicElementbcbcbc) => `${element.position}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      //cell: (element: PeriodicElementbcbcbc) => `${element.name}`,
    },
    {
      columnDef: 'weight',
      header: 'Weight',
     // cell: (element: PeriodicElementbcbcbc) => `${element.weight}`,
    },
    {
      columnDef: 'symbol',
      header: 'Symbol',
     // cell: (element: PeriodicElementbcbcbc) => `${element.symbol}`,
    },
  ];
  moeda:string='MZN'
  calculationtotalpago(){

  return  this.dataListaturma.data.map(t => Number(t.valorreg)).
    reduce((acc, value) => acc + value, 0);

  
    }

    calculationtotaldoc(){

      return  this.dataListaturma.data.map(t => Number(t.valordoc)).
        reduce((acc, value) => acc + value, 0);
        }
        calculationtotaldesc(){

          return  this.dataListaturma.data.map(t => Number(t.descontofin)).
            reduce((acc, value) => acc + value, 0);
            }
            calculationtotalpendente(){

              return  this.dataListaturma.data.map(t => Number(t.valorPend)).
                reduce((acc, value) => acc + value, 0);
                }
                calculationtotalpreg(){

                  return  this.dataListaturma.data.map(t => Number(t.valorpreg)).
                    reduce((acc, value) => acc + value, 0);
                    }
  totalCc:number=0;
  OnSelectplanopag(value:selects){
    this.cadastro.patchValue({codfac:value.chave});
  }
  OnSelectDescplano(value:selects){
    this.cadastro.patchValue({planopagstamp:value.chave});
  }

  OnSelecttipodo(value:selects){
    this.editando=false;
    this.cadastro.patchValue(
      {obs:value.chave});
      let se:selects={
        chave: value.chave,
        descricao: value.descricao,
        ordem: value.descricao.toString()
      }
      this.SetTipoDoc(se);

  }


      onSelectAluno(value:selects) {
      var campos=`Codcurso,Curso,Descgrelha,Gradestamp,Nivelac,Coddep,Departamento,
      Faculdade,Ccusto,Ccustostamp,Tipo,clstamp,no,nome,Email,nuit,morada,localidade,Moeda`;
      this.GetDividadoAluno(value.chave);
      let set:selects={
        chave: `clstamp='${value.chave}'`,
        descricao: campos,
        ordem: 'cl'
      }
        this._estudanteService.GetQualquerdado(set).subscribe({
          next: (data) => {
            if (data.sucesso) {
              if(data.dados.dmzview.length>1){
                let aluno = data.dados.dmzview[1];
                this.cadastro.patchValue({
                  desccurso:aluno.col2,
                  cursostamp :aluno.col1,
                  clstamp :aluno.col12,
                  no :aluno.col13,
                  nome :aluno.col14,
                  emails :aluno.col15,
                  gradestamp :aluno.col4,
                  descGrade :aluno.col3,
                  nivelac :aluno.col5,
                  ccusto :aluno.col9,
                  ccustamp :aluno.col10,
                nuit: aluno.col16,
                morada: aluno.col17,
                localidade: aluno.col18,
                moeda: aluno.col19,
                estabnome: aluno.col8,
                cambiousd: 1,
                });

              }

              this.isSpinnerDisplayed=false;
            }
          },
          error: (e) => {
            //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
          }
        });


      }


      async Getturno(){
        const se:condicoesprocura={
          tabela:"Fpagam",
        campo1: "descricao",
        campo2:"Codigo",
         condicao:"vazio"
        }
        this._loginservice.getselectionPost(se).subscribe({
          next: (data) => {
            if (data.sucesso) {
              this.optionsturno = data.dados.selects;
              this.filteredOptionsturno = this.myControlturno.valueChanges.pipe(
                startWith(''),
                map(value => {
                  const name = typeof value === 'string' ? value : value?.descricao;
                  return name ? this._filter(name as string,this.optionsturno) : this.optionsturno.slice();
                }),
              );
            } else {
              this._loginservice.mostrarAlerta("Nao foi possivel carregar as formas de pagamentos", "Opps");
            }
          },
          error: (e) => {
            this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
          }
        });

      }

      myControltipoaluno = new FormControl<string | selects>('');
      optionstipoaluno: selects[] = [];
      filteredOptionstipoaluno!: Observable<selects[]>;

      @ViewChild('listatipoaluno') listatipoaluno!: MatSelect;
      tipoaluno:string='';
      tipoalunostamp:string='';
      Settipoaluno(item:selects){
        this.tipoaluno=item.descricao;
      this.tipoalunostamp=item.chave;
          }


      myControltipobolsa = new FormControl<string | selects>('');
      optionstipobolsa: selects[] = [];
      filteredOptionstipobolsa!: Observable<selects[]>;

      @ViewChild('listatipobolsa') listatipobolsa!: MatSelect;
      tipobolsa:string='';
      tipobolsastamp:string='';


      myControlinstituicaoensino = new FormControl<string | selects>('');
      optionsinstituicaoensino: selects[] = [];
      filteredOptionsinstituicaoensino!: Observable<selects[]>;

      @ViewChild('listainstituicaoensino') listainstituicaoensino!: MatSelect;
      instituicaoensino:string='';
      instituicaoensinostamp:string='';
      array!:Blob

      listaformasp:formasp[]=[]
      Total=0
      sumaaa=0
      CalcTotal(){
        this.sumaaa = this.itemsFp.value.reduce((prev: number,
          next: { valor: string | number; }) => prev + +next.valor, 0);
 
          this.Total=Number(this.calculationtotalpago())-Number(this.sumaaa)
      }
  
      Cadastrar( )
      {
    
    
        if(this.cadastro.value.desccurso.length==0){
          Swal.fire('Não permitido!', 'O curso não pode estar vazio!', 'error');
          return;
        }
        if(this.cadastro.value.clstamp.length==0){
          Swal.fire('Não permitido!', 'O aluno não foi seleccionado!', 'error');
          return;
        }
    
    
        //Ok. Entao assim que chegares em casa, faça verificação aqui se é recibo de adiantamento para bentrar no ciclo de for para 
        //injectar o seu this.dataListaturma.data
    
        //Tchau, esta bem
    if(this.visiblelinhas==true){
      for (const control of this.getrcll.controls) {
        this.dataListaturma.data.push(control.value);
    }  
    }
    
    let yotal=0;
    let sum = this.itemsFp.value.reduce((prev: number,
       next: { valor: string | number; }) => prev + +next.valor, 0);
    
    yotal=Number(this.calculationtotalpago())-Number(sum)
    
    
        if(this.dataListaturma.data.length==0){
          Swal.fire('Não permitido!', 'Não pode gravar recibo sem linhas do recibo, por favor verifique!.!', 'error');
          return;
        }
        let str=`Desculpe mas o valor do Documento tem que ser igual ao valor total das formas de pagamento.
        Valor do Documento: ${this.calculationtotalpago()}
        Total Pagamentos: ${sum}
        Por favor verifique !!`;
        if(this.calculationtotalpago()!=sum){
          Swal.fire('Não permitido!', str, 'error');
          return;
        }
        if(Number(this.calculationtotalpago())<0){
          Swal.fire('Não permitido!', 'Não se pode  gravar recibo com valor negativo, verifique!', 'error');
          return;
        }
        this.isSpinnerDisplayed=true;
    
      const cl:rCL={
        rclstamp: this.clstampvliw,
        numero: this.cadastro.value.numero,
        tRclstamp: this.cadastro.value.tRclstamp,
        data:formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),//;
        nuit: this.cadastro.value.nuit,
        morada: this.cadastro.value.morada,
        localidade: this.cadastro.value.localidade,
        no: this.cadastro.value.no,
        nome: this.cadastro.value.nome,
        moeda: 'MZN',
        banco: this.cadastro.value.banco,
        total: this.calculationtotalpago(),
        mtotal: this.cadastro.value.mtotal,
        obs: this.nome,
        process: false,
        rcladiant: this.cadastro.value.rcladiant,
        dprocess:  formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
        anulado: this.cadastro.value.anulado,
        ccusto: this.cadastro.value.ccusto,
        numdoc: this.cadastro.value.numdoc,
        sigla: this.cadastro.value.sigla,
        nomedoc: this.cadastro.value.nomedoc,
        codmovcc: this.cadastro.value.codmovcc,
        descmovcc: this.cadastro.value.descmovcc,
        codmovtz: this.cadastro.value.codmovtz,
        descmovtz: this.cadastro.value.descmovtz,
        nomecomerc: this.cadastro.value.nomecomerc,
        integra: this.cadastro.value.integra,
        nodiario: this.cadastro.value.nodiario,
        diario: this.cadastro.value.diario,
        ndocCont: this.cadastro.value.ndocCont,
        descDocCont: this.cadastro.value.descDocCont,
        estabno: this.cadastro.value.estabno,
        estabnome: this.cadastro.value.estabnome,
        cambiousd: this.cadastro.value.cambiousd,
        moeda2: this.cadastro.value.moeda2,
        especial: this.cadastro.value.especial,
        pjno: this.cadastro.value.pjno,
        pjstamp: this.cadastro.value.pjstamp,
        clstamp: this.cadastro.value.clstamp,
        pjNome: this.cadastro.value.pjNome,
        descontofin: this.cadastro.value.descontofin,
        mDescontofin: this.cadastro.value.mDescontofin,
        perdescfin: this.cadastro.value.perdescfin,
        usrstamp: this.cadastro.value.usrstamp,
        ccustamp: this.cadastro.value.ccustamp,
        pos: this.cadastro.value.pos,
        cursostamp: this.cadastro.value.cursostamp,
        desccurso: this.cadastro.value.desccurso,
        turmastamp: this.cadastro.value.turmastamp,
        descturma: this.cadastro.value.descturma,
        anosem: this.cadastro.value.anosem,
        etapa: this.cadastro.value.etapa,
        cc: [],
        formasp: this.cadastro.value.formasp,
        rcll: this.dataListaturma.data
      };
      const dadosssss=cl;
    
      this._estudanteService.PostarRecibo(dadosssss).pipe(
        finalize(() => this.isSpinnerDisplayed = false),
      ).subscribe({
        next: (data) => {
          if (data.sucesso) {
    
          Swal.fire('Sucesso!', `Operação executada com sucesso`, 'success');
    
    
          }
          else{
            alert(`erro`)
          }
    
    
        },
        error: (set:any) => {
           
          Swal.fire('Erro!', "Erro de conexao "+set, 'error');
         // this._loginservice.mostrarAlerta("Erro de conexao"+set, "Opps");
          this.veradadeiro=false;
        }
      });
    
    
      }
    

  total:number=0;
  totalstr:string='Total:  ';
   //------------------------------------------------Documentos----------------------------------------------------------



  //---------------------------------------------------------------------------------------------------------------------

  //-----------------------------------Agregado Familiar-----------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------------------------






  visibilidadeagregado:boolean=false;
  clstampvliw: string='';


  @ViewChild('recprpais') recprpais!: MatSelect;
  //-----------------------------------------------------------------------------------------------------------------------
  visibilidadeRclAdiant:boolean=false;
  visibilidadebolsa:boolean=false;
  visibilidadelingua:boolean=false;
  //------------------------------------------Adiciona e remove linhas do docs---------------------------------------------







  paletteColour:string='';
  change() {
  this.paletteColour = 'warn';
  }

  turmastamp:string='';


  get matriculaTurmaAlunol(): FormArray {

    return this.cadastro.get('formasp') as FormArray;
   }

   get getrcll(): FormArray {

    return this.cadastro.get('rcll') as FormArray;
   }

  listaturmadis:turmadisc[]=[]
  listamatriculaTurmaAlunol:formasp[]=[]



  listamatriculadisciplinaTumra:disciplinaTumra[]=[]

  visibilidadeturmadisc:boolean=false;

  get turmadisc(): FormArray {

    return this.cadastro.get('turmadisc') as FormArray;
   }

  displayedColumns: string[] =[];
  dataSource: Alauxiliar[]=[];
  currentDate = new Date();


  displayedColumnsturma: string[] =[];
  dataSourceturma: Alauxiliar[]=[];

  displayedColumnsfinanceiro: string[] =[];
  dataSourcefinanceiro: contacorrentelista[]=[];
  veradadeiro:boolean=false;

  Dadostemp(){

  }

    eliminarestudante(stamp: string,descricao:string,index:number,tabela:string,nomecampochave:string) {
      this.veradadeiro=false;

    Swal.fire({
      title: `Deseja eliminar ${tabela}?`,
      text: descricao,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sim, Eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Não, Voltar'
    }).then((resultado => {
      if (resultado.isConfirmed) {
        this._estudanteService.eliminargradelsddgd(stamp,tabela,nomecampochave).subscribe({
          next: (data) => {
            if (data.sucesso) {
             // this._loginservice.mostrarAlerta(`${tabela} eliminada com sucesso`, "Ok");

      Swal.fire('Sucesso!', `${tabela} eliminada(o) com sucesso`, 'success');
              this.veradadeiro=true;

            } else {

      Swal.fire('Sucesso!', `Nao foi possível eliminar a(o) ${tabela} `, 'error');
              this.veradadeiro=false;
            }
  switch(tabela.toLowerCase()){
  case 'disciplinatumra':
   if(this.veradadeiro==true){
    this.listamatriculadisciplinaTumra = this.listamatriculadisciplinaTumra.filter(item => item.disciplinaTumrastamp.toLowerCase() != stamp.toLowerCase());
       var letss=this.listamatriculadisciplinaTumra;
   if(letss!=null && letss!=undefined &&  letss.length>0){
   this.visibilidadeturmadisc=true;
   //this.disciplinaTumra.clear();
   this.carregardisciplinaturma(this.listamatriculadisciplinaTumra);
   }  else{
    //this.turmadisc.clear();
   this.visibilidadeturmadisc=false;
   }
   }
    break;
    case 'matriculaturmaalunol':
   if(this.veradadeiro==true){
    this.removergri(index);
   }
      break;

      case 'formasp':
        if(this.veradadeiro==true){
         this.removergri(index);
        }
           break;
  }

          },
          error: () => {
            this._loginservice.mostrarAlerta("Erro de conexao", "Opps");
            this.veradadeiro=false;
          }
        });

      }

    }));

  }



  removerFormasp(index: number) {
    let grela=(<FormArray>this.cadastro.get('formasp')).controls[index].value;
   let ret= this.eliminarestudante(grela.formaspstamp,grela.titulo,index,'formasp','formaspstamp')






  }



  removerturmal(index: number) {
  var aaa=index
     let tabela=this.dataListaturma.data[index].descricao;

   Swal.fire({
    title: `Deseja eliminar ${tabela}?`,
    text: tabela,
    icon: "warning",
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Sim, Eliminar',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    cancelButtonText: 'Não, Voltar'
  }).then((resultado => {
    if (resultado.isConfirmed) {
      this.listaccfill=this.listaccfill.filter(item => item.rcllstamp.toLowerCase() != this.listaccfill[index].rcllstamp.toLowerCase());

      this.dataListaturma.data= this.listaccfill;


    

           Swal.fire('Sucesso!', `Dado eliminado com sucesso`, 'success');
      this.itemsFp.clear()
if( this.dataListaturma.data.length>0){
  this.adicionarFp()
}
        
 

      

    }

  }));

  this.CalcTotal()


  }
  MatTabGroupsss!:MatTabGroup;
  AdicionarDisciplinas( tabgroup: MatTabGroup, number: number,index: number) {


    let stamp=this.listamatriculaTurmaAlunol[index].formaspstamp;

    if(this.cadastro.value.gradestamp.length==0){
      Swal.fire('Não permitido!', 'O Plano curricular do aluno está vazio!', 'error');
      return;
    }
    if(this.cadastro.value.cursostamp.length==0){
      Swal.fire('Não permitido!', 'O curso do aluno está vazio!', 'error')
      return;
    }
    if(stamp.length==0){
      Swal.fire('Não permitido!', 'escolha a turma!', 'error')
      return;
    }
    this.ststampsss='';

let turmadis=(<FormArray>this.cadastro.get('disciplinaTumra')).controls
    for (let i = 0; i < turmadis.length; i++) {
      let valor=turmadis[i].value;
      if(i==0)
      {
        this.ststampsss=`'${valor.ststamp}'`
      }else{
      this.ststampsss+=`,'${valor.ststamp}'`
      }
      }
      let disciplinastm='';
if(this.ststampsss.length>0){
  disciplinastm=`  and Ststamp not in  (${this.ststampsss})`
}
let conddicao=`  Turmastamp='${stamp}'`

    this.habilitarcheckebo=false;
    this.turma=[];
    this.totalrecordturma=0;
    var campos=`select distinct *,Sitcao=''from(
      select Referenc,Disciplina, ok,Turmastamp,Ststamp,ISNULL(Mediafina,0)Mediafina,ISNULL(Fecho,0)Fecho,Prec
      from(select Referenc,Disciplina, cast (0 as bit) as ok,Turmastamp,Ststamp,Mediafina=(
      select top 1 ISNULL(tn.Mediafinal ,18)
      from Turmanota tn where tn.Coddis=Turmadisc.Ststamp
      and tn.Turmastamp=Turmadisc.Turmastamp
      ),Fecho=(
      select top 1 ISNULL(tn.Fecho ,0) from Turmanota tn where
      tn.Coddis=Turmadisc.Ststamp
      and tn.Turmastamp=Turmadisc.Turmastamp
      ) ,Prec=(select top 1 Prec from st  where st.Ststamp=Turmadisc.Ststamp)
      from Turmadisc  where ${conddicao}) temp)temp2 where Mediafina<9.5  and Fecho=0 ${disciplinastm}`;
    // let set:selects={
    //   chave: this.cadastro.value.clstamp,
    //   descricao: campos,
    //   ordem: 'disciplina'
    // }
     this.MatTabGroupsss=tabgroup;


    let set:selectsprocura={
      chave: conddicao,
      descricao: campos,
      ordem: 'disciplina',
      stamplocal: this.clstampvliw,
      stampsexcepcao:stamp
    }


  }


removergri(index:number){
  this.turmastamp='';
  this.matriculaTurmaAlunol.clear();
let stamp=this.listamatriculaTurmaAlunol[index].formaspstamp;
  this.listamatriculaTurmaAlunol = this.listamatriculaTurmaAlunol.filter(item => item.formaspstamp.toLowerCase()
  != stamp.toLowerCase());
  for (let i = 0; i < this.listamatriculaTurmaAlunol.length; i++) {
    if(i==0)
    {
      this.turmastamp=`'${this.listamatriculaTurmaAlunol[i].formaspstamp}'`
    }else{
    this.turmastamp+=`,'${this.listamatriculaTurmaAlunol[i].formaspstamp}'`
    }
    }
    this.carregarmatriculaTurmaAlunol(this.listamatriculaTurmaAlunol);
  var lets=this.cadastro.get('matriculaTurmaAlunol') as FormArray
  if(lets.length>0){
  this.visibilidadeturmal=true;
  }  else{
  this.visibilidadeturmal=false;
  }
}

  removerturmadisc(index: number) {
   if(this.listamatriculadisciplinaTumra[index]!==undefined){
    let ret= this.eliminarestudante(this.listamatriculadisciplinaTumra[index].disciplinaTumrastamp,this.listamatriculadisciplinaTumra[index].disciplina,index,'disciplinaTumra','disciplinaTumrastamp')

   }

  }


  myControlfala = new FormControl<string | selects>('');
  optionsfala: selects[] = [];
  filteredOptionsfala!: Observable<selects[]>;
  @ViewChild('listafala') listafala!: MatSelect;
  fala:string='';
  falastamp:string='';
  Setfala(item:selects,i:number){
    this.fala=item.descricao;
  this.falastamp=item.chave;

  (<FormArray>this.cadastro.get('mancfam')).controls[i].value.fala= item.descricao;
      }


      myControlleitura = new FormControl<string | selects>('');
      optionsleitura : selects[] = [];
      filteredOptionsleitura !: Observable<selects[]>;
      @ViewChild('listaleitura ') listaleitura !: MatSelect;
      leitura :string='';
      leiturastamp:string='';
      Setleitura (item:selects,i:number){
        this.leitura =item.descricao;
      this.leiturastamp=item.chave;
      (<FormArray>this.cadastro.get('mancfam')).controls[i].value.leitura= item.descricao;
          }

          myControlescrita = new FormControl<string | selects>('');
          optionsescrita : selects[] = [];
          filteredOptionsescrita !: Observable<selects[]>;
          @ViewChild('listaescrita ') listaescrita !: MatSelect;
          escrita :string='';
          escritastamp:string='';
          Setescrita (item:selects,i:number){
            this.escrita =item.descricao;
          this.escritastamp=item.chave;
          (<FormArray>this.cadastro.get('mancfam')).controls[i].value.escrita= item.descricao;
              }

              myControlcompressao = new FormControl<string | selects>('');

              optionscompressao : selects[] = [];
              filteredOptionscompressao !: Observable<selects[]>;
              @ViewChild('listacompressao ') listacompressao !: MatSelect;
              compressao :string='';
              compressaostamp:string='';
              Setcompressao (item:selects,i:number){
                this.compressao =item.descricao;
              this.compressaostamp=item.chave;
              (<FormArray>this.cadastro.get('mancfam')).controls[i].value.compreecao= item.descricao;
                  }

  async Getfala(){

    const se:condicoesprocura={
      tabela:"PeAuxiliar",
    campo1: "descricao",
    campo2:"codigo",
     condicao:"tabela=12"
    }

    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionscompressao =        this.optionsescrita = this.optionsleitura=
           this.optionsfala = data.dados.selects;
          this.filteredOptionsfala = this.myControlfala.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsfala) : this.optionsfala.slice();
            }),
          );
          this.filteredOptionsleitura = this.myControlleitura.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsleitura) : this.optionsleitura.slice();
            }),
          );

          this.filteredOptionsescrita = this.myControlescrita.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsescrita) : this.optionsescrita.slice();
            }),
          );

          this.filteredOptionscompressao = this.myControlcompressao.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionscompressao) : this.optionscompressao.slice();
            }),
          );
        } else {
          this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
        }
      },
      error: (e) => {
        this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });

  }


  myControllingua = new FormControl<string | selects>('');
  optionslingua: selects[] = [];
  filteredOptionslingua!: Observable<selects[]>;
  @ViewChild('listalingua') listalingua!: MatSelect;
  lingua:string='';
  linguastamp:string='';
  Setlingua(item:selects,i:number){
    this.lingua=item.descricao;
  this.linguastamp=item.chave;


  (<FormArray>this.cadastro.get('mancfam')).controls[i].value.lingua= item.descricao;



      }
  async Getlingua(){

    const se:condicoesprocura={
      tabela:"PeAuxiliar",
    campo1: "descricao",
    campo2:"codigo",
     condicao:"tabela=2"
    }

    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionslingua = data.dados.selects;
          this.filteredOptionslingua = this.myControllingua.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionslingua) : this.optionslingua.slice();
            }),
          );
        } else {
          this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
        }
      },
      error: (e) => {
        this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });
  }



  //-------------------------------------------------------Imprimir relatorio------------------------------------------------
   yotal: number = 0;
  sum:any;
  Imprimir() {
    if (this.cadastro.value.desccurso.length == 0) {
      Swal.fire('Não permitido!', 'O curso não pode estar vazio!', 'error');
      return;
    }
    if (this.cadastro.value.clstamp.length == 0) {
      Swal.fire('Não permitido!', 'O aluno não foi seleccionado!', 'error');
      return;
    }


     //this.yotal = 0;
     if(this.visiblelinhas==false){
      this.sum = this.itemsFp.value.reduce((prev: number,next: { valor: string | number; }) => prev + +next.valor, 0);
      this.yotal = Number(this.calculationtotalpago()) - Number(this.sum);
     }


    if(this.visiblelinhas==true){
      for (const control of this.getrcll.controls) {
        this.dataListaturma.data.push(control.value);
    }  
    }
    if (this.dataListaturma.data.length == 0) {
      Swal.fire('Não permitido!', 'Não pode imprimir recibo sem linhas do recibo, por favor verifique!.!', 'error');
      return;
    }
    let str = `Desculpe mas o valor do Documento tem que ser igual ao valor total das formas de pagamento.
    Valor do Documento: ${this.calculationtotalpago()}
    Total Pagamentos: ${this.sum}
    Por favor verifique !!`;
    if(this.visiblelinhas==false){
      if (this.calculationtotalpago() != this.sum) {
        Swal.fire('Não permitido!', str, 'error');
        return;
      }
    }

    if (Number(this.calculationtotalpago()) < 0) {
      Swal.fire('Não permitido!', 'Não se pode  imprimir recibo com valor negativo, verifique!', 'error');
      return;
    }

let Data = this.matriculaservice.ConvertDate(this.cadastro.value.data)
    this.isSpinnerDisplayed = true;
    const cl: rCL = {
      rclstamp: this.clstampvliw,
      numero: this.cadastro.value.numero,
      tRclstamp: this.cadastro.value.tRclstamp,
      data:Data ,
      nuit: this.cadastro.value.nuit,
      morada: this.cadastro.value.morada,
      localidade: this.cadastro.value.localidade,
      no: this.cadastro.value.no,
      nome: this.cadastro.value.nome,
      moeda: 'MZN',
      banco: this.cadastro.value.banco,
      total: this.calculationtotalpago(),
      mtotal: this.cadastro.value.mtotal,
      obs: this.nome,
      process: this.cadastro.value.process,
      rcladiant: this.cadastro.value.rcladiant,
      dprocess: this.cadastro.value.dprocess,
      anulado: this.cadastro.value.anulado,
      ccusto: this.cadastro.value.ccusto,
      numdoc: this.cadastro.value.numdoc,
      sigla: this.cadastro.value.sigla,
      nomedoc: this.cadastro.value.nomedoc,
      codmovcc: this.cadastro.value.codmovcc,
      descmovcc: this.cadastro.value.descmovcc,
      codmovtz: this.cadastro.value.codmovtz,
      descmovtz: this.cadastro.value.descmovtz,
      nomecomerc:this.optionsEtapaSemestre[0].contas,
      integra: this.cadastro.value.integra,
      nodiario: this.cadastro.value.nodiario,
      diario: this.cadastro.value.diario,
      ndocCont: this.cadastro.value.ndocCont,
      descDocCont: this.cadastro.value.descDocCont,
      estabno: this.cadastro.value.estabno,
      estabnome: this.cadastro.value.estabnome,
      cambiousd: this.cadastro.value.cambiousd,
      moeda2: this.cadastro.value.moeda2,
      especial: this.cadastro.value.especial,
      pjno: this.cadastro.value.pjno,
      pjstamp: this.cadastro.value.pjstamp,
      clstamp: this.cadastro.value.clstamp,
      pjNome: this.cadastro.value.pjNome,
      descontofin: this.cadastro.value.descontofin,
      mDescontofin: this.cadastro.value.mDescontofin,
      perdescfin: this.cadastro.value.perdescfin,
      usrstamp: this.cadastro.value.usrstamp,
      ccustamp: this.cadastro.value.ccustamp,
      pos: this.cadastro.value.pos,
      cursostamp: this.cadastro.value.cursostamp,
      desccurso: this.cadastro.value.desccurso,
      turmastamp: this.cadastro.value.turmastamp,
      descturma: this.cadastro.value.descturma,
      anosem: this.cadastro.value.anosem,
      etapa: this.cadastro.value.etapa,
      cc: [],
      formasp: this.cadastro.value.formasp,
      rcll: this.dataListaturma.data
    };

    let tipodoc='';

    if(this.docMat.rcladiant==true){
      tipodoc='rcladiantas'
    }
    else{
      tipodoc='RCL'
    }
   // 
    let resssssss: Resposta<rCL> = {
      dados: cl,
      mensagem: tipodoc,
      sucesso: true
    };


    this._loginservice.GerarRelatorioFacturacao(resssssss).pipe(
      finalize(() => {
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            this.ngZone.run(() => {
              this.isSpinnerDisplayed = false;
            });
          });
        });
      })
    ).subscribe({
      next: (data) => {



        if (data.sucesso) {

          if (data.dados != null) {

            const filename = data.dados.filename;
            try {

              if (filename != null && filename.length > 0 && filename != '' && filename != 'vazio') {

//O filename é o nome do ficheiro na Api,

                // this._loginservice.Downloadfile(filename);
                //this.modalActual.close("true");


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
                this.isSpinnerDisplayed = false;
                this.disabiltabtnSave = false;

              }
            } catch {
              // this._loginservice.mostrarAlerta("O sistema não conseguiu carregar o ficheiro, o report apresenta má formatação!","Erro");
              Swal.fire('Erro!', "O sistema não conseguiu carregar o ficheiro, o report apresenta má formatação!", 'error');
            }
          }
        } else {
          Swal.fire('Erro!',data.mensagem , 'error');
        }
      },
      error: (e) => {
        Swal.fire('Erro!', "O sistema não conseguiu carregar o ficheiro " + e, 'error');
        this.disabiltabtnSave = false;
      }
    });

  }



onKeyPress($event: Event,number: number) {

let numer=Number(($event.target as HTMLInputElement).value);
let langArr = this.getrcll
langArr.controls[number].patchValue(
  {
    valordoc:numer,
    valorpreg:numer,
    valorreg:numer,
  }
);


    if(this.getrcll.length>0){
      if(this.itemsFp.length==1){
     
        
        let eeee=this.getrcll.value.reduce((prev: number, next: { valorreg: number | number; }) => prev + +next.valorreg, 0);;
        


        let fp = this.itemsFp
        fp.controls[0].patchValue(
  {
    valor:eeee,
  }
);
      
      
      }
      
      
      }
  }

novo(){
  location.reload()
}

  }

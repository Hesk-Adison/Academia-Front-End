import { AsyncPipe, CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatButton } from '@angular/material/button';
import { camposCl } from 'src/Models/camposCl';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { Router } from '@angular/router';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { TranslateModule } from '@ngx-translate/core';
import { finalize, forkJoin, map, Observable, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { matriculaAluno } from '../todasClassesmatricula';
import { ModalMatriculaComponent } from '../modal-matricula/modal-matricula.component';
import { Matriculaservice } from '../matriculaservice';
import { dadosmatricula } from 'src/Models/DadosMatricu';
import { selects, condicoesprocura } from 'src/Models/CampoSessoes';
@Component({
  selector: 'app-listamatricula',
  templateUrl: './listamatricula.component.html',
  styleUrls: ['./listamatricula.component.scss'],
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
    CommonModule
  ],
  providers: [  
    MatDatepickerModule,  
  ],
})
export class ListamatriculaComponent 

implements OnInit, AfterViewInit {

  myControlAnoSem = new FormControl<string | selects>('');
  optionsAnoSem: selects[] = [];
  filteredOptionsAnoSem!: Observable<selects[]>;

  private _filter(name: string,list:selects[]): selects[] {
    const filterValue = name.toLowerCase();
    let fffh=list.filter(option => option.descricao.toLowerCase().includes(filterValue));
  
    return fffh;
  }

  frmestudantes: FormGroup;
  colunasTabela: string[] = ['no', 'codigo','descricao','descurso', 'etapa','descanoaem', 'accoes'];
  listestudante: matriculaAluno[] = [];
  divHideShow: boolean = true;
  dataListaestudante = new MatTableDataSource(this.listestudante);
   currentPage: number=0;
   pageGapTxt: string[]=['']
   rangeStart: number=0;
   rangeEnd: number=0;
   buttons: MatButton[] = [];
   showTotalPages: number =0;
   checkPage: number[]=[0];
@ViewChild(MatPaginator, { static: true})  paginacaoTabela!: MatPaginator;
  totalRecords: number = 0;  
  pagenumber: number = 0;
  pagesize: number = 0;  
  pagetotalrecord: number = 0;
  isSpinnerDisplayed:boolean = false;
  recProvstamp: string = "";
pageIndex: number = 0;
dataaa: { dadosmatricula: dadosmatricula } = {
  dadosmatricula: {
      nonome: '',
      currentNumber: 0,
      pagesize: 10,
      tipo: '',
      anoSem: '',
      valor: ''
  }
};

pegaanosem=''
Matriculac=''
  

  OF_LABEL = 'de';
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _estudanteService: Matriculaservice,
    private _loginService: LoginServiceService
    
  ) {
this.Matriculac='Matricula'
    TranslateModule.forRoot()
    this.frmestudantes = this.fb.group({
     nimNome: ['']
    });
  }


  getestudante() {
    this.isSpinnerDisplayed = true;
    let nimNome = this.frmestudantes.value.nimNome;
    this.initialLoad(nimNome);
  }

  changeIndex(tabgroup: MatTabGroup, number: number){
    tabgroup.selectedIndex = number;
  }
  submit(){ }
  async ngOnInit() {
    
    await this.GetAnoSem();
  }
  ngAfterViewInit(): void {
    
    this.isSpinnerDisplayed =false;
   //this. load();
   
  }
  load(){
    let nimNome = this.frmestudantes.value.nimNome;       
    this.initialLoad(nimNome);
  }
  initialLoad(valor: string) {
    this.isSpinnerDisplayed =true;
    let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
        let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
        this.dataaa.dadosmatricula.valor=valor
        this.dataaa.dadosmatricula.anoSem=this.pegaanosem;
        this.dataaa.dadosmatricula.currentNumber=currentPage;
        this.dataaa.dadosmatricula.pagesize=pageSize;
        this.dataaa.dadosmatricula.tipo=this.Matriculac
    this._estudanteService.Getgrades(this.dataaa.dadosmatricula).pipe(
      finalize(() => this.isSpinnerDisplayed = false),
    ).subscribe(result => {
      if (result) {
        this.totalRecords = result.totalCount;
        this.dataListaestudante.data = result.data;
        this.pagenumber = currentPage;
        this.pagesize = pageSize;
        this.pagetotalrecord=result.totalCount;
      }
    });
}



initialLoadsss(valor: string,pageevent:PageEvent) {
  this.isSpinnerDisplayed =true;
  let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
  let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
  this.dataaa.dadosmatricula.valor=valor
  this.dataaa.dadosmatricula.anoSem=this.pegaanosem;
  this.dataaa.dadosmatricula.currentNumber=currentPage;
  this.dataaa.dadosmatricula.pagesize=pageSize;
  this.dataaa.dadosmatricula.tipo=this.Matriculac
  this._estudanteService.Getgrades(this.dataaa.dadosmatricula).pipe(
    finalize(() => this.isSpinnerDisplayed = false),
  ).subscribe(result => {
    if (result) {
      this.totalRecords = result.totalCount;
      this.dataListaestudante.data = result.data;
    }
  });
  this.currentPage = 1;
    this.pageGapTxt = ['•••', '---'];
    this.showTotalPages = 3;
    this.checkPage = [0, 0, 0];
    // Display custom range label text
    this.paginacaoTabela._intl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return length > 0 ? 'Showing ' + (startIndex + 1) + ' – ' + endIndex + ' of ' + length + ' records' : 'Showing 0 – 0 of 0 records';
    };
    // Subscribe to rerender buttons when next page and last page button is used
    this.paginacaoTabela.page.subscribe((paginator: PageEvent) => {
      this.currentPage = paginator.pageIndex;
      this.paginacaoTabela.pageIndex = paginator.pageIndex;
      this.initPageRange();
    });

}

SetAnoSem(item:selects){
  this.pegaanosem=item.descricao;
  console.log( this.pegaanosem)
// this.AnoSemstamp=item.chave;
// this.cadastro.patchValue({
//   anosem:this.AnoSem,
//   anoSemstamp:this.AnoSemstamp
// })

   }
async GetAnoSem(){
 const se:condicoesprocura={
   tabela:"AnoSem",
 campo1: "codigo",
 campo2:"descricao",
  condicao:"vazio"
 }

 this._loginService.getselectionPost(se).subscribe({
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
       this._loginService.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
     }
   },
   error: (e) => {
     this._loginService.mostrarAlerta(`Erro, ${e}`, "Opps");
   }
 });

}

private initPageRange(): void {
  this.rangeStart = this.currentPage - this.showTotalPages / 2;
  this.rangeEnd = this.currentPage + this.showTotalPages / 2; 
}

private switchPage(index: number): void {
  this.paginacaoTabela?.page.emit({
    previousPageIndex: this.currentPage,
    pageIndex: index,
    pageSize: this.paginacaoTabela?.pageSize,
    length: this.paginacaoTabela?.length
  });
  this.currentPage = index;
  this.initPageRange();
}


pagelanguage(){
  forkJoin({
    itemsPerPageLabel: 'itens por página.',
    nextPageLabel: 'Próxima',
    previousPageLabel: 'Anterior',
    firstPageLabel: 'Primeira',
    lastPageLabel: 'Última',
  }).subscribe(values => {
    this.paginacaoTabela._intl.itemsPerPageLabel = values.itemsPerPageLabel;
    this.paginacaoTabela._intl.nextPageLabel = values.nextPageLabel;
    this.paginacaoTabela._intl.previousPageLabel = values.previousPageLabel;
    this.paginacaoTabela._intl.firstPageLabel = values.firstPageLabel;
    this.paginacaoTabela._intl.lastPageLabel = values.lastPageLabel;
    this.paginacaoTabela._intl.getRangeLabel = (page: number, pageSize: number, length: number): 
    string => {
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? 
      Math.min(startIndex + pageSize, length) : startIndex + pageSize;     
      length = Math.max(length, 0);      
      return `${startIndex + 1} - ${endIndex} ${
        this.OF_LABEL
      } ${length}`;  
    };
  
  });
  this.dataListaestudante.paginator = this.paginacaoTabela; 
}

  confirmPageChange(pageEvent: PageEvent) {
    let nimNome = this.frmestudantes.value.nimNome;
    this.pageIndex=pageEvent.pageIndex;
    this.paginacaoTabela.pageSize=pageEvent.pageSize;    
    this.paginacaoTabela.pageIndex=pageEvent.pageIndex;
    this.initialLoad(nimNome);
  }



  aplicarFiltroTabela(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaestudante.filter = filterValue.trim().toLocaleLowerCase();
  }

  novoestudante() {   
let plano:matriculaAluno={
  matriculaAlunostamp: '',
  planopagstamp: '',
  numero: 0,
  numdoc: 0,
  codigo: '',
  refonecedor: '',
  anolectivo: 0,
  descplano: 0,
  datapartida: new Date(),
  cursostamp: '',
  data: new Date(),
  anoSemstamp: '',
  clstamp: '',
  descricao: '',
  sitcao: '',
  no: 0,
  nome: '',
  curso: '',
  codcurso: '',
  datamat: new Date(),
  turno: '',
  periodo: '',
  anoSem: '',
  codtur: '',
  anolect: '',
  localmat: '',
  emails: '',
  obs: '',
  gradestamp: '',
  descGrade: '',
  etapa: '',
  turmadiscstamp: '',
  ststamp: '',
  turmastamp: '',
  turnostamp: '',
  codfac: '',
  alauxiliarstamp: '',
  semstamp: '',
  nivelac: '',
  formaingresso: '',
  ccusto: '',
  ccustostamp: '',
  coddep: '',
  departamento: '',
  faculdade: '',
  descanoaem: '',
  tipo: '',
  activo: false,
  motivo: '',
  matriculaTurmaAlunol: [],
  disciplinaTumra: [],
  matdisc: [],
  inscricao: false,
  matricula: false,
  nomedoc: ''
}

    this.dialog.open(ModalMatriculaComponent, {
      // height: '85%',
      width: '100%',
      disableClose: true,
      data: plano,
      autoFocus: false,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.getestudante();
      }
    });
  }

  async editarestudante(estudante: matriculaAluno) {

    this.dialog.open(ModalMatriculaComponent, {
      // height: '85%',
      width: '100%',
      disableClose: true,
      data: estudante,
      autoFocus: false,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.getestudante();
      }
    });
  }


  eliminarestudante(estudante: matriculaAluno) {
  let tabela = `matriculaAluno`
  Swal.fire({
    title: `Deseja eliminar ${tabela}?`,
    text: estudante.nome,
    icon: "warning",
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Sim, Eliminar',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    cancelButtonText: 'Não, Voltar'
  }).then((resultado => {
    if (resultado.isConfirmed) {
      this._estudanteService.eliminargradelsddgd(estudante.matriculaAlunostamp,tabela,`matriculaAlunostamp`).subscribe({
        next: (data) => {
          if (data.sucesso) {
           // this._loginservice.mostrarAlerta(`${tabela} eliminada com sucesso`, "Ok");
           this.getestudante();
    Swal.fire('Sucesso!', `${tabela} eliminada(o) com sucesso`, 'success');   
           

          } else {
            
    Swal.fire('Sucesso!', `Nao foi possível eliminar a(o) ${tabela} `, 'error');   
         
          }

        },
        error: () => {
          // this._loginservice.mostrarAlerta("Erro de conexao", "Opps");          
          // this.veradadeiro=false;
        }
      });

    }

  }));
  
}


  eliminarestudante11(estudante: matriculaAluno) {
    Swal.fire({
      title: 'Deseja eliminar a turma?',
      text: estudante.descricao,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sim, Eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Não, Voltar'
    }).then((resultado => {

      if (resultado.isConfirmed) {

        this._estudanteService.eliminar(estudante.matriculaAlunostamp).subscribe({
          next: (data) => {
            if (data.sucesso) {
              this._loginService.mostrarAlerta("Matrícula eliminada com sucesso", "Ok");
              this.getestudante();
            } else {
              this._loginService.mostrarAlerta("Nao foi possível eliminar a Matrícula", "Erro");
            }
          },
          error: (e) => {
            this._loginService.mostrarAlerta("Erro de conexao", "Opps");
          }
        });

      }

    }));
  }
}

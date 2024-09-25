import { AsyncPipe, CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatTabsModule } from '@angular/material/tabs';
import { anolect } from '../anolect';
import { MatButton } from '@angular/material/button';
import { camposCl } from 'src/Models/camposCl';
import { Anolectservices } from '../anolectservices';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { Router } from '@angular/router';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { TranslateModule } from '@ngx-translate/core';
import { finalize, forkJoin } from 'rxjs';
import { ModalAnolectComponent } from '../modal-anolect/modal-anolect.component';
import Swal from 'sweetalert2';
import { Matriculaservice } from 'src/app/Portal-da-Secretaria/MatriculaAluno/matriculaservice';

@Component({
  selector: 'app-lista-anolect',
  templateUrl: './lista-anolect.component.html',
  styleUrls: ['./lista-anolect.component.scss'],
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
export class ListaAnolectComponent 


implements OnInit, AfterViewInit {

  frmestudantes: FormGroup;
  colunasTabela: string[] = ['no', 'nome', 'nim','sexo', 'accoes'];

  listestudante: anolect[] = [];
  divHideShow: boolean = true;
  dataListaestudante = new MatTableDataSource(this.listestudante);
  // @ViewChild(MatPaginator) paginacaoTabela!: MatPaginator;
  
   currentPage: number=0;
   pageGapTxt: string[]=['']
   rangeStart: number=0;
   rangeEnd: number=0;
   buttons: MatButton[] = [];
   showTotalPages: number =0;
   checkPage: number[]=[0];
   minDate!: Date;
   maxDate!: Date;



@ViewChild(MatPaginator, { static: true})  paginacaoTabela!: MatPaginator;

  totalRecords: number = 0;
  
  pagenumber: number = 0;
  pagesize: number = 0;
  
  pagetotalrecord: number = 0;
  isSpinnerDisplayed = true;

  recProvstamp: string = "";
pageIndex: number = 0;
  onKeyPress(params: any) {
    
    if (params.key === 'Backspace' || params.key === '.') {
      
    }
    
  }
  

  getRangeLabel = (
    page: number,
    pageSize: number,
    length: number,
  ) => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.OF_LABEL} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${
      this.OF_LABEL
    } ${length}`;
  };
  user!:camposCl;
  OF_LABEL = 'de';
  constructor(
    private _ElinarServic:Matriculaservice,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _estudanteService: Anolectservices,
    private _utilidadeService: DadosLancamento,
    private _loginService: LoginServiceService,
    private router: Router,
    private readonly renderer: Renderer2,
    private turmanotaservice: TurmaNotaService,
  
    
  ) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 12, 0, 1);
    this.maxDate = new Date(currentYear , 11, 31);

    TranslateModule.forRoot()
    this.frmestudantes = this.fb.group({
     // nimNome: ['',[Validators.required]]
     nimNome: ['']
    });
    this.dataListaestudante.paginator = this.paginacaoTabela; 
  }


  getestudante() {
    this.isSpinnerDisplayed = true;
    let nimNome = this.frmestudantes.value.nimNome;
    this.initialLoad(nimNome);
  }



  ngOnInit(): void {

    
    this.user=this._utilidadeService.obterSessao();
  }
  getPaginatorIntl(): MatPaginatorIntl {
    const paginatorIntl = new MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = 'itens por página';
    paginatorIntl.nextPageLabel = 'Próxima';
    paginatorIntl.previousPageLabel = 'Anterior';
    paginatorIntl.firstPageLabel = 'Primeira';
    paginatorIntl.lastPageLabel = 'Última';
    
    paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
    return paginatorIntl;
}

  ngAfterViewInit(): void {
   this. load();
  }



  load(){
    let nimNome = this.frmestudantes.value.nimNome;   
    
    this.initialLoad(nimNome);
  }
  initialLoad(valor: string) {
    this.isSpinnerDisplayed =true;
    let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
        let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
    this._estudanteService.Getgrades(valor, currentPage, pageSize).pipe(
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

  // this.dataListaestudante.paginator = this.paginacaoTabela;
  // this.paginacaoTabela.pageSize = this.paginacaoTabela.pageSize;
  // this.paginacaoTabela.pageIndex = this.paginacaoTabela.pageIndex;

  // this.dataListaestudante.paginator.page.emit({
  //   length: this.paginacaoTabela.getNumberOfPages(),
  //   pageIndex: this.paginacaoTabela.pageIndex,
  //   pageSize: this.paginacaoTabela.pageSize
  // } as PageEvent);



  let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
  let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
  this._estudanteService.Getgrades(valor, currentPage, pageSize).pipe(
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

  // let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
  // let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
  // this._estudanteService.getestudantes(valor, currentPage, pageSize).pipe(
  //   finalize(() => this.isSpinnerDisplayed = false),
  // ).subscribe(result => {
  //   if (result) {
  //     this.totalRecords = result.totalCount;
  //     this.dataListaestudante.data = result.data;
  //     this.pagenumber = result.totalCount;
  //     this.pagesize = result.data;
  //     this.totalRecords = result.totalCount;

  //     console.log( 'numero de linhas encontradas');
  //     console.log( this.totalRecords);
  //     this.pagetotalrecord=result.totalCount;
  //   }
  // });
//this.pagelanguage();
}


private initPageRange(): void {
  this.rangeStart = this.currentPage - this.showTotalPages / 2;
  this.rangeEnd = this.currentPage + this.showTotalPages / 2;
  
}

private switchPage(index: number): void {
  //this.paginacaoTabela?.pageIndex = 0;
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
    
  let stamp =this.turmanotaservice.Stamp(); 
let plano:anolect={
  anolectstamp: '',
  codigo: 0,
  ano: 0,
  descricao: '',
  anoSem: []
}

    this.dialog.open(ModalAnolectComponent, {
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

  async editarestudante(estudante: anolect) {

    this.dialog.open(ModalAnolectComponent, {
      // height: '85%',
      width: '100%',
      disableClose: true,
      data: estudante,
      autoFocus: false,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    }).afterClosed().subscribe(resultado => {
      this.getestudante();
    });
  }



  eliminarestudante(estudante: anolect) {
    //let tabela = `grade`
    let tab= 'Anolect'
    Swal.fire({
      title: `Deseja eliminar Este plano?`,
      text: estudante.descricao,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sim, Eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Não, Voltar'
    }).then((resultado => {
      if (resultado.isConfirmed) {
      
        this._ElinarServic.eliminargradelsddgd(estudante.anolectstamp,tab,`anolectstamp`).subscribe({
          next: (data) => {
            if (data.sucesso) {
             // this._loginservice.mostrarAlerta(`${tabela} eliminada com sucesso`, "Ok");
             this.getestudante();
      Swal.fire('Sucesso!', `Ano lectivo eliminada(o) com sucesso`, 'success');   
             
  
            } else {
              
      Swal.fire('Erro!', `Nao foi possível eliminar a(o) Ano lectivo `, 'error');   
           
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



  // eliminarestudante11(estudante: anolect) {
  //   Swal.fire({
  //     title: 'Deseja eliminar o plano curricular?',
  //     text: estudante.descricao,
  //     icon: "warning",
  //     confirmButtonColor: '#3085d6',
  //     confirmButtonText: 'Sim, Eliminar',
  //     showCancelButton: true,
  //     cancelButtonColor: '#d33',
  //     cancelButtonText: 'Não, Voltar'
  //   }).then((resultado => {

  //     if (resultado.isConfirmed) {

  //       this._estudanteService.eliminar(estudante.anolectstamp).subscribe({
  //         next: (data) => {
  //           if (data.sucesso) {
              
  //     Swal.fire('Sucesso!', `Operação executada com sucesso`, 'success');  
  //            // this._loginService.mostrarAlerta("Ano eliminado com sucesso", "Ok");
  //             this.getestudante();
  //           } else {
              
  //     Swal.fire('Sucesso!', `Não foi possivel execu`, 'error'); 
  //             this._loginService.mostrarAlerta("Nao foi possível eliminar o ano", "Erro");
  //           }
  //         },
  //         error: (e) => {
  //           this._loginService.mostrarAlerta("Erro de conexao", "Opps");
  //         }
  //       });

  //     }

  //   }));
  // }

  
}

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
import { MatButton } from '@angular/material/button';
import { camposCl } from 'src/Models/camposCl';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { Router } from '@angular/router';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { TranslateModule } from '@ngx-translate/core';
import { finalize, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { Turmaservico } from '../../sertvico/turmaservico';
import { horario, turma } from '../../todastabelasturma';
import { ModalturmaComponent } from '../modalturma/modalturma.component';
import { Horarioservico } from '../../ServicoHorario/horarioservico';
import { ModalhorarioComponent } from '../modalhorario/modalhorario.component';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss'],
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
export class HorarioComponent implements OnInit, AfterViewInit {

  frmestudantes: FormGroup;
  // horariostamp: stamp,
  // turmastamp: '',
  // turma: '',
  // codigo: '',
  // descricao: '',
  // anosem: '',
  // visualizar: false,
  // hactivo: false,
  colunasTabela: string[] = ['no', 'descricao','turma', 'anosem', 'accoes'];
  listestudante: turma[] = [];
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
  isSpinnerDisplayed = true;
  recProvstamp: string = "";
pageIndex: number = 0; 

  OF_LABEL = 'de';
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _estudanteService: Horarioservico,
    private _loginService: LoginServiceService,
    private turmanotaservice: TurmaNotaService,
    
  ) {

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



  ngOnInit(): void {
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
        console.log(result.data)
        this.pagenumber = currentPage;
        this.pagesize = pageSize;
        this.pagetotalrecord=result.totalCount;
      }
    });



}



initialLoadsss(valor: string) {
  this.isSpinnerDisplayed =true;
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

}


private initPageRange(): void {
  this.rangeStart = this.currentPage - this.showTotalPages / 2;
  this.rangeEnd = this.currentPage + this.showTotalPages / 2;
  
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
let plano:horario={
  horariostamp: stamp,
  turmastamp: '',
  turma: '',
  codigo: '',
  descricao: '',
  anosem: '',
  visualizar: false,
  hactivo: false,
  horariol: []
}

    this.dialog.open(ModalhorarioComponent, {
      height: '85%',
      width: '77%',
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

  async editarestudante(estudante: horario) {
    this.dialog.open(ModalhorarioComponent, {
      height: '85%',
      width: '77%',
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

  eliminarestudante(estudante: horario) {
    Swal.fire({
      title: 'Deseja eliminar horário?',
      text: estudante.descricao,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sim, Eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Não, Voltar'
    }).then((resultado => {

      if (resultado.isConfirmed) {

        this._estudanteService.eliminar(estudante.horariostamp).subscribe({
          next: (data) => {
            if (data.sucesso) {
              this._loginService.mostrarAlerta("Horário eliminada com sucesso", "Ok");
              this.getestudante();
            } else {
              this._loginService.mostrarAlerta("Nao foi possível eliminar o Horário", "Erro");
            }
          },
          error: () => {
            this._loginService.mostrarAlerta("Erro de conexao", "Opps");
          }
        });

      }

    }));
  }
}


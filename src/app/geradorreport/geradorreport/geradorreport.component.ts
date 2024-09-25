import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {finalize} from 'rxjs/operators';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { Peservice } from 'src/Service/Peservice/peservice';
import { pecadastroview } from 'src/Models/pecadastroview';
import { rltview } from 'src/app/Interfaces/rltview';
import { Relatorioservice } from 'src/Service/Relatorios/relatorioservice';
import { ModalParamRelComponent } from 'src/app/ModalParamRel/modal-param-rel/modal-param-rel.component';

@Component({
  selector: 'app-geradorreport',
  templateUrl: './geradorreport.component.html',
  styleUrls: ['./geradorreport.component.scss'],
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
export class GeradorreportComponent 

implements OnInit, AfterViewInit {

  frmrltvs: FormGroup;
  @ViewChild(MatPaginator) paginacaoTabela!:MatPaginator;
  rltview : rltview[]=[]
  divHideShow: boolean = true;
  dataSource= new MatTableDataSource(this.rltview);
  Dadostemp(relt: rltview) {
  this.abrirDialogo(relt)
}
constructor(
  private fb: FormBuilder,
  private dialog: MatDialog,
  private _rltvService: Relatorioservice,
  private _loginService: Relatorioservice,
  private _loginService1: LoginServiceService,
  private router: Router  
) {

  TranslateModule.forRoot()
  this.frmrltvs = this.fb.group({
   nimNome: ['']
  });
}


Chamar() {


  //window.open(`${this.ApiUrlgeral}FrmPrintRlt`, "_blank");

  // this.loginService.Imprimir().subscribe({
   
  // });

  //this.dataSource= new MatTableDataSource(this.rltview);  
  // this.dataListaCurso.sort = this.sort;
   //this.dataSource.paginator = this.paginacaoTabela;
//    this.paginacaoTabela._intl.itemsPerPageLabel = 'itens por página.';
//    this.paginacaoTabela._intl.nextPageLabel = 'Próxima';
//     this.paginacaoTabela._intl.previousPageLabel = 'Anterior';
//  this.paginacaoTabela._intl.lastPageLabel = 'Última';
//  this.paginacaoTabela._intl.firstPageLabel = 'Primeira';
}




 displayedColumns= ['codigo','descricao','accoes' ];


abrirDialogo(mancebo:rltview){ 

  this.dialog.open(ModalParamRelComponent,{
    disableClose:true,
    data:mancebo,
    autoFocus:false,
    enterAnimationDuration:'1000ms',
    exitAnimationDuration: '1000ms',
    width: '50%'
  }).afterClosed().subscribe(resultado =>{
    
  })


}

// }

   currentPage: number=0;
   pageGapTxt: string[]=['']
   rangeStart: number=0;
   rangeEnd: number=0;
   buttons: MatButton[] = [];
   showTotalPages: number =0;
   checkPage: number[]=[0];
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
  
  OF_LABEL = 'de';


  getrltv() {
    this.isSpinnerDisplayed = true;
    let nimNome = this.frmrltvs.value.nimNome;

    this.initialLoad(nimNome);



  }



  ngOnInit(): void {

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
   this.load();
   
  }



  load(){
    let nimNome = this.frmrltvs.value.nimNome;  
    this.initialLoad(nimNome);
  }
  initialLoad(valor: string) {
    this.isSpinnerDisplayed =true;
    let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
        let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
    this._rltvService.GetRelatorio(valor, currentPage, pageSize).pipe(
      finalize(() => this.isSpinnerDisplayed = false),
    ).subscribe(result => {
      if (result) {
        this.totalRecords = result.totalCount;
       this.dataSource.data=result.data
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
  this._rltvService.GetRelatorio(valor, currentPage, pageSize).pipe(
    finalize(() => this.isSpinnerDisplayed = false),
  ).subscribe(result => {
    if (result) {
      this.totalRecords = result.totalCount;
      this.dataSource.data = result.data;
    }
  });
  this.currentPage = 1;
    this.pageGapTxt = ['•••', '---'];
    this.showTotalPages = 3;
    this.checkPage = [0, 0, 0];
    this.paginacaoTabela._intl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return length > 0 ? 'Showing ' + (startIndex + 1) + ' – ' + endIndex + ' of ' + length + ' records' : 'Showing 0 – 0 of 0 records';
    };
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
  this.dataSource.paginator = this.paginacaoTabela; 
}

  confirmPageChange(pageEvent: PageEvent) {
    let nimNome = this.frmrltvs.value.nimNome;
    this.pageIndex=pageEvent.pageIndex;
    this.paginacaoTabela.pageSize=pageEvent.pageSize;    
    this.paginacaoTabela.pageIndex=pageEvent.pageIndex;
    this.initialLoad(nimNome);
  }



  aplicarFiltroTabela(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  novorltv() {
    
   // this.router.navigate(['Adim/CadastroPessoa']);
  }

  eliminarrltv(rltv: rltview) {
    Swal.fire({
      title: 'Deseja eliminar o relatório?',
      text: rltv.descricao,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sim, Eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Não, Voltar'
    }).then((resultado => {
      if (resultado.isConfirmed) {
        this._rltvService.eliminar(rltv.rltstamp).subscribe({
          next: (data) => {
            if (data.sucesso) {
              this._loginService1.mostrarAlerta("Relatório eliminado com sucesso", "Ok");
              this.getrltv();
            } else {
              this._loginService1.mostrarAlerta("Nao foi possível eliminar o Relatório", "Erro");
            }
          },
          error: (e) => {
            this._loginService1.mostrarAlerta("Erro de conexao", "Opps");
          }
        });

      }

    }));
  }
}

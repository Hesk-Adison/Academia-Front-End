import { AfterViewInit, Component, Directive, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clview } from '../Clcadastrovie/Clview';
import { camposCl } from 'src/Models/camposCl';
import { DadosLancamento } from '../GuardarSessoes/DadosLancamento';
// import { ModalEstudantesComponent } from '../modal-estudantes/modal-estudantes.component';
import { ModalEstudantesComponent } from './modal-estudantes/modal-estudantes.component';
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
import {finalize, map, switchMap} from 'rxjs/operators';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { TranslateService,TranslateModule } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { CadastroComponent } from '../Portal-da-Secretaria/Cadastro/cadastro/cadastro.component';
import { cl } from 'src/Models/Cl/cl';
import { Matriculaservice } from '../Portal-da-Secretaria/MatriculaAluno/matriculaservice';

@Component({
  selector: 'app-listaestudantes',
  templateUrl: './listaestudantes.component.html',
  styleUrls: ['./listaestudantes.component.scss'],
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
export class ListaestudantesComponent 


implements OnInit, AfterViewInit {

  frmestudantes: FormGroup;
  colunasTabela: string[] = ['no','nim', 'nome', 'sexo', 'pai', 'mae', 'accoes'];

  listestudante: Clview[] = [];
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
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _estudanteService: LoginServiceService,
    private _utilidadeService: DadosLancamento,
    private _loginService: LoginServiceService,
    private router: Router,
    private readonly renderer: Renderer2,
    private _ElinarServic: Matriculaservice 
    
  ) {

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

    // const localDate: Date = this.convertToLocalDate('01/25/2021');
  
  }
  initialLoad(valor: string) {
    this.isSpinnerDisplayed =true;
    let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
        let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
    this._estudanteService.getestudantes(valor, currentPage, pageSize).pipe(
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






    // this.paginacaoTabela._intl.getRangeLabel = (): string => {
    //   const startIndex = this.pagenumber *  this.pagesize ;
    //   const endIndex = startIndex < this.pagetotalrecord ?
    //     Math.min(startIndex +  this.pagesize , this.pagetotalrecord) :
    //     startIndex +  this.pagesize ;
    //   return this.pagetotalrecord > 0 ? 'Mostrando ' + (startIndex + 1) + ' – ' + endIndex + ' de ' + this.pagetotalrecord + ' dados' : 'Mostrando 0 – 0 de 0 dados';
    // };
    // this.paginacaoTabela.page.subscribe((paginator: PageEvent) => {
    //   this.currentPage = paginator.pageIndex;
    //   this.paginacaoTabela.pageIndex = paginator.pageIndex;
    //   this.initPageRange();
    // });
   // this.dataListaestudante.paginator=this.paginacaoTabela;
}


convertToLocalDate(responseDate: any) {
    try {
        if (responseDate != null) {
            if (typeof (responseDate) === 'string') {
                if (String(responseDate.indexOf('T') >= 0)) {
                    responseDate = responseDate.split('T')[0];
                }
                if (String(responseDate.indexOf('+') >= 0)) {
                    responseDate = responseDate.split('+')[0];
                }
            }

            responseDate = new Date(responseDate);
            const newDate = new Date(responseDate.getFullYear(), responseDate.getMonth(), responseDate.getDate(), 0, 0, 0);
            const userTimezoneOffset = newDate.getTimezoneOffset() * 60000;

            const finalDate: Date = new Date(newDate.getTime() - userTimezoneOffset);
            return finalDate ;
        } else {
            return null;
        }
    } catch (error) {
        return responseDate;
    }
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
  this._estudanteService.getestudantes(valor, currentPage, pageSize).pipe(
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
private createButton(index: string, pageIndex: number): MatButton {
  const linkBtn: MatButton = this.renderer.createElement('button');
  this.renderer.setAttribute(linkBtn, 'class', 'custom-paginator-page');
  this.renderer.addClass(linkBtn, 'custom-paginator-page-enabled');
  if (index === this.pageGapTxt[0] || index === this.pageGapTxt[1]) {
    this.renderer.addClass(linkBtn, 'custom-paginator-arrow-enabled');
  }
  const pagingTxt = isNaN(+ index) ? this.pageGapTxt[0] : (+ index + 1);
  const text = this.renderer.createText(pagingTxt + '');
  this.renderer.addClass(linkBtn, 'mat-custom-page');
  switch (index) {
    case `${pageIndex}`:
      this.renderer.setAttribute(linkBtn, 'disabled', 'disabled');
      this.renderer.removeClass(linkBtn, 'custom-paginator-page-enabled');
      this.renderer.addClass(linkBtn, 'custom-paginator-page-disabled');
      break;
    case this.pageGapTxt[0]:
      this.renderer.listen(linkBtn, 'click', () => {
        this.switchPage(this.currentPage < this.showTotalPages + 1
           ? this.showTotalPages + 2
          : this.currentPage + this.showTotalPages - 1
        );
      });
      break;
    case this.pageGapTxt[1]:
      this.renderer.listen(linkBtn, 'click', () => {
        this.switchPage(this.currentPage > this.paginacaoTabela?.getNumberOfPages() - this.showTotalPages - 2
          ? this.paginacaoTabela?.getNumberOfPages() - this.showTotalPages - 3
          : this.currentPage - this.showTotalPages + 1
        );
      });
      break;
    default:
      this.renderer.listen(linkBtn, 'click', () => {
        this.switchPage(+ index);
      });
      break;
  }
  this.renderer.appendChild(linkBtn, text);
  // Add button to private array for state
  this.buttons.push(linkBtn);
  return linkBtn;
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
    this.abrirDialogo()
    
    // this.router.navigate(['secret/cadastro']);
    // this.dialog.open(ModalEstudantesComponent, {
    //   height: '85%',
    //   width: '77%',
    //   disableClose: true,
    //   autoFocus: false,
    //   enterAnimationDuration: '1000ms',
    //   exitAnimationDuration: '1000ms',
    // }).afterClosed().subscribe(resultado => {
    //   if (resultado === "true") {
    //     this.getestudante();
    //   }
    // });
  }

  async editarestudante(estudante: Clview) {

    this.dialog.open(ModalEstudantesComponent, {
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



  eliminarestudante(estudante: Clview) {
    let tabela = `Cl`
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
        this._ElinarServic.eliminargradelsddgd(estudante.clstamp,tabela,`clstamp`).subscribe({
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
  






  abrirDialogo(){ 
    //estudante: Clview
    let cl:Clview={
      clstamp: '',
      no: '',
      nome: '',
      morada: '',
      codprov: 0,
      coddist: 0,
      codpad: 0,
      localidade: '',
      distrito: '',
      provincia: '',
      telefone: '',
      celular: '',
      fax: '',
      email: '',
      nuit: 0,
      saldo: 0,
      moeda: '',
      status: 'Activo',
      obs: '',
      prontopag: false,
      tipo: '',
      pos: false,
      pais: '',
      codcurso: '',
      curso: '',
      gradestamp: '',
      descgrelha: '',
      bolseiro: false,
      coddep: '',
      departamento: '',
      codfac: '',
      faculdade: '',
      nofnc: '',
      fnc: '',
      sexo: '',
      areafiscal: '',
      aluno: false,
      estadocivil: '',
      religiao: '',
      nivelac: '',
      codaluno: '',
      codesc: '',
      escola: '',
      planosaude: false,
      medico: '',
      hospital: '',
      instplanosaude: '',
      transp: '',
      sozinho: false,
      acompanhado: false,
      codccu: 0,
      ccusto: '',
      ccustostamp: '',
      deficilCobrar: false,
      plafond: 0,
      vencimento: 0,
      generico: false,
      desconto: false,
      percdesconto: 0,
      codCondPagamento: 0,
      descCondPagamento: '',
      insencao: false,
      motivoInsencao: '',
      cobrador: '',
      clivainc: false,
      codtz: 0,
      tesouraria: '',
      localentregas: '',
      contaPgc: '',
      grupoclPgc: '',
      descGrupoclPgc: '',
      site: '',
      variasmoradas: false,
      tipocl: '',
      precoespecial: false,
      ctrlplanfond: false,
      contastamp: '',
      mesavirtual: false,
      possuifilial: false,
      contasstamp: '',
      clfamview: []
    }

    this.dialog.open(ModalEstudantesComponent,{
      disableClose:true,
data:cl,
     width:'100%',
    //  height:'98vh',
      autoFocus:false,
      enterAnimationDuration:'1000ms',
      exitAnimationDuration: '1000ms', 
    }).afterClosed().subscribe(resultado =>{
      this.getestudante();
    })
  

    
    // this.dialog.open(CadastroComponent,{
    //   disableClose:true,
    //  width:'100vw',
    //  height:'98vh',
    //   autoFocus:false,
    //   enterAnimationDuration:'1000ms',
    //   exitAnimationDuration: '1000ms', 
    // }).afterClosed().subscribe(resultado =>{})
  
  }
}
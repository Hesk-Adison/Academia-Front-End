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
import { ModalPeComponent } from '../../Modal/modal-pe/modal-pe.component';
import { Peservice } from 'src/Service/Peservice/peservice';
import { pecadastroview } from 'src/Models/pecadastroview';
import { EscolhertipotesteComponent } from 'src/app/Teste/EscolherTipo/escolhertipoteste/escolhertipoteste.component';
import { CadastroPessoaComponent } from '../../cadastro-pessoa.component';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { Matriculaservice } from 'src/app/Portal-da-Secretaria/MatriculaAluno/matriculaservice';

@Component({
  selector: 'app-listaprofessores',
  templateUrl: './listaprofessores.component.html',
  styleUrls: ['./listaprofessores.component.scss'],
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
export class ListaprofessoresComponent 

implements OnInit, AfterViewInit {

  frmProfessors: FormGroup;
  colunasTabela: string[] = ['no','nim', 'nome', 'sexo', 'pai', 'mae', 'accoes'];

  listProfessor: pecadastroview[] = [];
  divHideShow: boolean = true;
  dataListaProfessor = new MatTableDataSource(this.listProfessor);
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
  
  OF_LABEL = 'de';
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _ProfessorService: Peservice,
    private _loginService: LoginServiceService,
    private turmanotaservice:TurmaNotaService,
    private router: Router,
    private readonly renderer: Renderer2,
    private _ElinarServic:Matriculaservice
    
  ) {

    TranslateModule.forRoot()
    this.frmProfessors = this.fb.group({
     // nimNome: ['',[Validators.required]]
     nimNome: ['']
    });

    //this.dataListaProfessor.paginator = this.paginacaoTabela; 




  }


  getProfessor() {
    this.isSpinnerDisplayed = true;
    let nimNome = this.frmProfessors.value.nimNome;

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
   this. load();
  }



  load(){
    let nimNome = this.frmProfessors.value.nimNome;       
    this.initialLoad(nimNome);

  //   this.paginacaoTabela?.page.pipe(
  //     switchMap(() => {
  //       let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
  //       let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
  //       return this._ProfessorService.getProfessors(nimNome, currentPage, pageSize)
  //     }),
  //     map(result => result),
  //     finalize(() => this.isSpinnerDisplayed = false),
  //   ).subscribe(result => {
  //     if (result) {
  //       this.totalRecords = result.totalCount;
  //       this.dataListaProfessor.data = result.data;
  //     }
  //   });
  //   this.dataListaProfessor.paginator = this.paginacaoTabela; 
  //   this.paginacaoTabela._intl.itemsPerPageLabel = 'itens por página.';
  //   this.paginacaoTabela._intl.nextPageLabel = 'Próxima';
  //    this.paginacaoTabela._intl.previousPageLabel = 'Anterior';
  // this.paginacaoTabela._intl.lastPageLabel = 'Última';
  // this.paginacaoTabela._intl.firstPageLabel = 'Primeira';
  }
  initialLoad(valor: string) {
    this.isSpinnerDisplayed =true;
    let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
        let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
    this._ProfessorService.GetProfessores(valor, currentPage, pageSize).pipe(
      finalize(() => this.isSpinnerDisplayed = false),
    ).subscribe(result => {
      if (result) {
        this.totalRecords = result.totalCount;
        this.dataListaProfessor.data = result.data;
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
  this._ProfessorService.GetProfessores(valor, currentPage, pageSize).pipe(
    finalize(() => this.isSpinnerDisplayed = false),
  ).subscribe(result => {
    if (result) {
      this.totalRecords = result.totalCount;
      this.dataListaProfessor.data = result.data;
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
  // this._ProfessorService.getProfessors(valor, currentPage, pageSize).pipe(
  //   finalize(() => this.isSpinnerDisplayed = false),
  // ).subscribe(result => {
  //   if (result) {
  //     this.totalRecords = result.totalCount;
  //     this.dataListaProfessor.data = result.data;
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
  this.dataListaProfessor.paginator = this.paginacaoTabela; 
}

  confirmPageChange(pageEvent: PageEvent) {
    let nimNome = this.frmProfessors.value.nimNome;
    this.pageIndex=pageEvent.pageIndex;
    this.paginacaoTabela.pageSize=pageEvent.pageSize;    
    this.paginacaoTabela.pageIndex=pageEvent.pageIndex;
    this.initialLoad(nimNome);
  }



  aplicarFiltroTabela(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaProfessor.filter = filterValue.trim().toLocaleLowerCase();
  }

  novoProfessor() {
    
    this.abrirDialogo();


    //this.router.navigate(['secret/CadastroPessoa']);
    // this.dialog.open(ModalProfessorsComponent, {
    //   height: '85%',
    //   width: '77%',
    //   disableClose: true,
    //   autoFocus: false,
    //   enterAnimationDuration: '1000ms',
    //   exitAnimationDuration: '1000ms',
    // }).afterClosed().subscribe(resultado => {
    //   if (resultado === "true") {
    //     this.getProfessor();
    //   }
    // });
  }

  async editarProfessor(Professor: pecadastroview) {

    this.dialog.open(ModalPeComponent, {
      // height: '85%',
      width: '100%',
      disableClose: true,
      data: Professor,
      autoFocus: false,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.getProfessor();
      }
    });
  }



  eliminarProfessor(estudante: pecadastroview) {
    let tabela = `Pe`
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
        this._ElinarServic.eliminargradelsddgd(estudante.pestamp,tabela,`pestamp`).subscribe({
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
  

  getestudante() {
    this.isSpinnerDisplayed = true;
    let nimNome = this.frmProfessors.value.nimNome;

    this.initialLoad(nimNome);



  }

  // eliminarProfessor11(Professor: pecadastroview) {
  //   Swal.fire({
  //     title: 'Deseja eliminar o Professor?',
  //     text: Professor.nome,
  //     icon: "warning",
  //     confirmButtonColor: '#3085d6',
  //     confirmButtonText: 'Sim, Eliminar',
  //     showCancelButton: true,
  //     cancelButtonColor: '#d33',
  //     cancelButtonText: 'Não, Voltar'
  //   }).then((resultado => {

  //     if (resultado.isConfirmed) {

  //       this._ProfessorService.eliminar(Professor.pestamp).subscribe({
  //         next: (data) => {
  //           if (data.sucesso) {
  //             this._loginService.mostrarAlerta("Professor eliminado com sucesso", "Ok");
  //             this.getProfessor();
  //           } else {
  //             this._loginService.mostrarAlerta("Nao foi possível eliminar o Professor", "Erro");
  //           }
  //         },
  //         error: (e) => {
  //           this._loginService.mostrarAlerta("Erro de conexao", "Opps");
  //         }
  //       });

  //     }

  //   }));
  // }



  abrirDialogo(){ 


    let pe:pecadastroview={
      pestamp: '',
      no: '',
      nome: '',
      nuit: 0,
      bi: '',
      codsit: 0,
      situacao: '',
      datanasc: new Date(1900,1,1),
      dataAdmissao: new Date(),
      dataFimContrato: new Date(),
      dataDemissao: new Date(),
      sexo: '',
      ecivil: '',
      dcasa: new Date(),
      nacional: '',
      pais: '',
      provNasc: '',
      distNasc: '',
      padNasc: '',
      bairro: '',
      provMorada: '',
      distMorada: '',
      padMorada: '',
      locali: '',
      pai: '',
      mae: '',
      codNivel: 0,
      nivel: '',
      codCateg: 0,
      categ: '',
      codprof: 0,
      prof: '',
      codep: 0,
      depart: '',
      codrep: 0,
      repart: '',
      nrinss: '',
      balcaoInss: '',
      dataInss: new Date(),
      relPonto: false,
      valBasico: 0,
      horasdia: 0,
      nrdepend: 0,
      obs: '',
      codtipo: '',
      tipo: '',
      codccu: '',
      cCusto: '',
      ccustamp: '',
      diasmes: 0,
      horasSemana: 0,
      salHora: 0,
      tabIrps: '',
      codRepFinancas: '',
      descRepFinancas: '',
      apolice: '',
      dataApoliceIn: new Date(),
      dataApoliceTer: new Date(),
      seguradora: '',
      moeda: '',
      naoInss: false,
      naoIRPS: false,
      tirpsstamp: '',
      ntabelado: false,
      pontonome: '',
      formapag: '',
      codformp: 0,
      dataadm: new Date(),
      reDataadm:new Date(),
      basedia: 0,
      pedagogico: false,
      coordenador: false,
      email: '',
      pefamview: [],
      pedocview: [],
      pelingview: [],
      pediscview: []
    }


    this.dialog.open(ModalPeComponent,{
      disableClose:true,
      data:pe,
     width:'100%',
    //  height:'98vh',
      autoFocus:false,
      enterAnimationDuration:'1000ms',
      exitAnimationDuration: '1000ms', 
    }).afterClosed().subscribe(resultado =>{
      
      this.getProfessor();
    })
  
    // this.dialog.open(CadastroPessoaComponent,{
    //   disableClose:true,
    //  width:'100vw',
    //  height:'98vh',
    //   autoFocus:false,
    //   enterAnimationDuration:'1000ms',
    //   exitAnimationDuration: '1000ms', 
    // }).afterClosed().subscribe(resultado =>{})
  
  }

}
import { AfterViewInit, Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject, finalize, forkJoin } from 'rxjs';
import { Trabalho } from 'src/Models/trabalho';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
import { VerTrabalhoComponent } from '../../trabalho/ver-trabalho/ver-trabalho.component';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { procura } from 'src/app/Interfaces/Procura/Procura';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { ActivatedRoute, Router } from '@angular/router';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { Peservice } from 'src/Service/Peservice/peservice';
import { MatButton } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { ModaltrabalhoComponent } from '../../modaltrabalho/modaltrabalho/modaltrabalho.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-enviar-trabalho',
  templateUrl: './enviar-trabalho.component.html',
  styleUrls: ['./enviar-trabalho.component.scss'],
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


  
export class EnviarTrabalhoComponent implements OnInit, AfterViewInit {

  frmProfessors: FormGroup;
  colunasTabela: string[] = ['no', 'nome', 'accoes'];

  listProfessor: Trabalho[] = [];
  divHideShow: boolean = true;
  dataListaProfessor = new MatTableDataSource(this.listProfessor);
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
    private readonly renderer: Renderer2,private route: ActivatedRoute,private guararsessoes: GuardarSessoes

  ) {

   this.routaid= this.route.snapshot.paramMap.get('id')?.toString()


       this.disciplina= this.route.snapshot.paramMap.get('disciplina')?.toString()

       this.etapa= this.route.snapshot.paramMap.get('etapa')?.toString()


       this.descricaodisciplina= this.route.snapshot.paramMap.get('descricao')?.toString()

    TranslateModule.forRoot()
    this.frmProfessors = this.fb.group({
     nimNome: ['']
    });
  }
 trabalho!:Trabalho;
routaid:any;
disciplina:any;
etapa:any;
descricaodisciplina:any;
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


  }
  initialLoad(valor: string) {

if(this.routaid==undefined || this.routaid.length<=0){
  Swal.fire('Erro!', "Rota inválida!", 'error');

  return};

    this.isSpinnerDisplayed =true;
    let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
        let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
        var professorstamp= '';
        var alunoestamp= '';
       var rhstamp= '';
       const Dados = this.guararsessoes.obterSessao()
       if(Dados.tipo==1){
         //Aluno
         alunoestamp=Dados.camposcl.cls[0].clstamp;
         rhstamp=alunoestamp;
       }
       if(Dados.tipo== 2){
         //Professor
         professorstamp=Dados.pe[0].pestamp;
         rhstamp=professorstamp;
       }
       if(Dados.tipo== 3){
         //Rh

         //alunoestamp=Dados.camposcl.cls[0].clstamp;
       }
        let proc:procura={
          tabela: 'Trabalho',
          campo: rhstamp,
          campo1: this.routaid,
          chave: '',
          valorprocurado: valor,
          currentNumber: currentPage,
          
          pagesize: pageSize,
          marcar: false,
          professorstamp: professorstamp,
          alunoestamp: alunoestamp,
          rhstamp: '',
          referencia:'',
          descricao:'',
          origem:'',
        }

    this._ProfessorService.GetTrabalhos(proc).pipe(
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
  }

  async editarProfessor(Professor: Trabalho) {

    this.dialog.open(VerTrabalhoComponent, {
      // height: '85%',
      width: '100%',
      disableClose: true,
      data: Professor,
      autoFocus: false,
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.getProfessor();
      }
    });
  }

  eliminarProfessor(Professor: Trabalho) {
    Swal.fire({
      title: 'Deseja eliminar o Professor?',
      text: Professor.path,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sim, Eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Não, Voltar'
    }).then((resultado => {


    }));
  }



  abrirDialogo(){
    var professorstamp= '';
    var alunoestamp= '';
   var rhstamp= '';

   this.disciplina= this.route.snapshot.paramMap.get('disciplina')?.toString()

   this.etapa= this.route.snapshot.paramMap.get('etapa')?.toString()


if(this.disciplina==null || this.disciplina==undefined || this.disciplina.length==0){

  Swal.fire('Erro!', `Disciplina não especificada!!!!`, 'error');
  return;
}
   const Dados = this.guararsessoes.obterSessao()

   if(Dados.tipo==1){
     //Aluno
     alunoestamp=Dados.camposcl.cls[0].clstamp;
     rhstamp=alunoestamp;
     let pe:Trabalho={
      trabalhostamp: '',
      turmalstamp: '',
      ststamp: this.disciplina,
      clstamp: alunoestamp,
      status: 'activo',
      data: new Date(),
      path: '',
      path1: ''
    }
    this.dialog.open(ModaltrabalhoComponent,{
      disableClose:true,
      data:pe,
     width:'30%',
    //  height:'98vh',
      autoFocus:false,
    }).afterClosed().subscribe(resultado =>{

      this.getProfessor();
    })
   } else{
    Swal.fire('Erro!', `Só estudante tem permissão de adicionar trabalhos`, 'error');
   return;
   }


  }

}

import { AsyncPipe, CommonModule } from '@angular/common';
import { AfterViewInit, Component, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
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
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { finalize, forkJoin, timeout } from 'rxjs';
import { pecadastroview } from 'src/Models/pecadastroview';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { Peservice } from 'src/Service/Peservice/peservice';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import Swal from 'sweetalert2';
import { VerTrabalhoComponent } from '../../trabalho/ver-trabalho/ver-trabalho.component';
import { Trabalho } from 'src/Models/trabalho';
import { procura } from 'src/app/Interfaces/Procura/Procura';
import { gradel } from 'src/app/Interfaces/Grade/gradel';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { strings } from '@material/select';
import { Estudante, ReportPauta } from 'src/Models/Estudante';
import { Turmanota1 } from 'src/Models/Turma';
import { VerPautaEstudanteComponent } from '../../ver-pauta-estudante/ver-pauta-estudante/ver-pauta-estudante.component';


@Component({
  selector: 'app-lista-situacao-pedagogica',
  templateUrl: './lista-situacao-pedagogica.component.html',
  styleUrls: ['./lista-situacao-pedagogica.component.scss'],
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
export class ListaSituacaoPedagogicaComponent

implements OnInit, AfterViewInit {
  frmProfessors: FormGroup;
  colunasTabela: string[] = ['no', 'disciplina','etapa', 'accoes'];
  listProfessor: gradel[] = [];
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
    private ngZone: NgZone,
    private router: Router,
    private readonly renderer: Renderer2,private guararsessoes: GuardarSessoes

  ) {

    TranslateModule.forRoot()
    this.frmProfessors = this.fb.group({
     nimNome: ['']
    });

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

  busca(event: Event) {

    this.dataListaProfessor.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
   
  }

  load(){
    let nimNome = this.frmProfessors.value.nimNome;
    this.initialLoad(nimNome);
  }
  initialLoad(valor: string) {


     var professorstamp= '';
     var alunoestamp= '';
    var rhstamp= '';

    const Dados = this.guararsessoes.obterSessao()

    if(Dados.tipo==1){
      //Aluno
      alunoestamp=Dados.camposcl.cls[0].clstamp;
    }
    if(Dados.tipo== 2){
      //Professor
      professorstamp=Dados.pe[0].pestamp;
    }
    if(Dados.tipo== 3){
      //Rh

      //alunoestamp=Dados.camposcl.cls[0].clstamp;
    }

    this.isSpinnerDisplayed =true;
    let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
        let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
        let proc:procura={
          tabela: 'gradel',
          campo: '',
          campo1: '',
          chave: '',
          valorprocurado: valor,
          currentNumber: currentPage,
          pagesize: pageSize,
          marcar: false,
          professorstamp: professorstamp,
          alunoestamp: alunoestamp,
          rhstamp: rhstamp,
          referencia:'',
          descricao:'',
          origem:'',
        }
    this._ProfessorService.GetSituacaoPedago(proc).pipe(
      finalize(() => this.isSpinnerDisplayed = false),
    ).subscribe(result => {
      if (result.status==true) {
        this.dataListaProfessor.data = result.data.gradel;
        this.pagenumber = currentPage;
        this.pagesize = pageSize;
        this.totalRecords=result.totalCount;
        this.pageIndex=currentPage;
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

  async VerPauta(grastamp: gradel,tipoteste:string) {



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

   this.isSpinnerDisplayed =true;
   this.startTimeout()
   let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
       let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
       let proc:procura={
         tabela: 'turmanota',
         campo: grastamp.ststamp,
         campo1: tipoteste,
         chave: '',
         valorprocurado: '',
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
   this._ProfessorService.ImprimirPauta(proc).pipe(
     finalize(() => this.isSpinnerDisplayed = true),
   ).subscribe(result => {
     if (result.status==true) {

if(result.data.length>0){




var trmn= result.data as Turmanota1[][0];
let estudante:Estudante= {
  turmanota: result.data,
  anosem: trmn.anosem,
  curso: trmn.cursostamp,
  cursostamp: trmn.cursostamp,
  disciplina: trmn.disciplina,
  ststamp: trmn.coddis,
  turma: trmn.turmastamp,
  turmastamp: trmn.turmastamp
}
estudante.anosem=estudante.turmanota[0].anosem;
estudante.curso=Dados.camposcl.cls[0].curso,
estudante.cursostamp=estudante.turmanota[0].cursostamp,
estudante.disciplina=estudante.turmanota[0].disciplina,
estudante.ststamp=estudante.turmanota[0].coddis,
estudante.turma=grastamp.etapa,
estudante.turmastamp=estudante.turmanota[0].turmastamp
this.dialog.open(VerPautaEstudanteComponent, {
  width: '100%',
  //height:'100%',
  disableClose: true,
  data: estudante,
  autoFocus: false,
}).afterClosed().subscribe(resultado => {
  if (resultado === "true") {
    this.isSpinnerDisplayed = false
  }
});






// let rep:ReportPauta= {
//   estudante: estudante,
//   filename: '',
//   origem: tipoteste,
//   xmlstring: rhstamp
// }
// this.isSpinnerDisplayed = true;
// this.turmanotaservice.GerarRelatorioPauta(rep).pipe(
//   finalize(() => this.isSpinnerDisplayed = true)
// ).subscribe({
//   next: (data) => {
//     if (data.sucesso) {
//       if (data.dados != null) {



//         const filename = data.dados.filename;
//         try {




//           if (filename != null && filename.length > 0 && filename != '' && filename != 'vazio') {

//             rep.filename=filename;
//             let trabalho: Trabalho={
//               trabalhostamp: '',
//               turmalstamp: '',
//               ststamp: '',
//               clstamp: '',
//               status: '',
//               data: new Date(),
//               path: filename,
//               path1: ''
//             }
//             this.dialog.open(VerTrabalhoComponent, {
//               width: '100%',
//               height:'100%',
//               disableClose: true,
//               data: trabalho,
//               autoFocus: false,
//             }).afterClosed().subscribe(resultado => {
//               if (resultado === "true") {
//                 this.isSpinnerDisplayed = false
//               }
//             });

//           }
//         } catch {
//           // this._loginservice.mostrarAlerta("O sistema não conseguiu carregar o ficheiro, o report apresenta má formatação!","Erro");
//           Swal.fire('Erro!', "O sistema não conseguiu carregar o ficheiro, o report apresenta má formatação!", 'error');
//         }
//       }
//     } else {
//       Swal.fire('Erro!',data.mensagem , 'error');
//     }
//   },
//   error: (e) => {
//   }
// });
}}
   });
  }

  Trabalho(grastamp: gradel) {
    var professorstamp= '';
    var alunoestamp= '';
   var rhstamp= '';
   const Dados = this.guararsessoes.obterSessao();
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
       if(Dados.tipo==1){
        //Aluno

        alunoestamp=Dados.camposcl.cls[0].clstamp;
        rhstamp=alunoestamp;
       this.router.navigate(['AdimEstud/Trabalho', {id : ` and  dg.ststamp='${grastamp.ststamp}'`,
       disciplina:grastamp.ststamp,etapa:grastamp.etapa,descricao:grastamp.displina}])
      }
      if(Dados.tipo== 2){
        //Professor
        professorstamp=Dados.pe[0].pestamp;
        rhstamp=professorstamp;
       this.router.navigate(['Adim/Trabalho', {id : ` and  dg.ststamp='${grastamp.ststamp}'`,
       disciplina:grastamp.ststamp,etapa:grastamp.etapa,descricao:grastamp.displina}])
      }
      if(Dados.tipo== 3){
        //Rh
        //alunoestamp=Dados.camposcl.cls[0].clstamp;
      }
  }



  abrirDialogo(){


    let pe:pecadastroview={
      pestamp: '',
      no: '',
      nome: '',
      nuit: 0,
      bi: '',
      codsit: 0,
      situacao: '',
      datanasc: new Date(),
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
      dataApoliceIn:new Date(),
      dataApoliceTer:new Date(),
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
      reDataadm: new Date(),
      basedia: 0,
      pedagogico: false,
      coordenador: false,
      email: '',
      pefamview: [],
      pedocview: [],
      pelingview: [],
      pediscview: []
    }


    this.dialog.open(VerTrabalhoComponent,{
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
    
   
  }
  startTimeout(){
      
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        
        this.ngZone.run(() => {
       
          this.isSpinnerDisplayed=false
          Swal.fire('Informação!', "O aproveitamento desta disciplina ainda não esta disponivel, Aguarde por favor!", 'info');
        });
      }, 300000); 
    });
  }
  message: string = 'Waiting...';
}

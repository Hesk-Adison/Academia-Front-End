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
import { Anolectservices } from '../../Anolect/anolectservices';
import { Disciplinasservices } from '../disciplinasservices';
import { st } from '../st';
import { ModalDisciplinasComponent } from '../modal-disciplinas/modal-disciplinas.component';
import { Matriculaservice } from 'src/app/Portal-da-Secretaria/MatriculaAluno/matriculaservice';

@Component({
  selector: 'app-lista-disciplinas',
  templateUrl: './lista-disciplinas.component.html',
  styleUrls: ['./lista-disciplinas.component.scss'],
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
export class ListaDisciplinasComponent 
implements OnInit, AfterViewInit {

  frmestudantes: FormGroup;
  colunasTabela: string[] = ['no', 'referenc', 'descricao','credac','cargahteorica','cargahpratica','cargahtotal', 'accoes'];

  listestudante: st[] = [];
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
    private _estudanteService: Disciplinasservices,
    private _utilidadeService: DadosLancamento,
    private _loginService: LoginServiceService,
    private router: Router,
    private readonly renderer: Renderer2,
    private turmanotaservice: TurmaNotaService,
    private _ElinarServic: Matriculaservice,
    
  ) {

    TranslateModule.forRoot()
    this.frmestudantes = this.fb.group({
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
let plano:st={
  ststamp: '',
  referenc: '',
  obs: '',
  refornec: '',
  tipo: '',
  codigoBarras: '',
  status: '',
  unidade: '',
  descricao: '',
  servico: false,
  tabiva: 0,
  txiva: 0,
  valor: 0,
  ivainc: false,
  codfam: '',
  familia: '',
  codsubfam: '',
  subfamilia: '',
  codarm: '',
  armazem: '',
  codmarca: 0,
  marca: '',
  matricula: '',
  modelo: '',
  motor: '',
  chassis: '',
  anofab: 0,
  tara: 0,
  pesobruto: 0,
  combustivel: false,
  tipoCombustivel: '',
  codfab: 0,
  fabricante: '',
  negativo: false,
  viatura: false,
  avisanegativo: false,
  descontinuado: false,
  ligaprojecto: false,
  composto: false,
  stock: 0,
  ultimopreco: 0,
  precoponderado: 0,
  imagem: undefined,
  codigobarra: undefined,
  codigoQr: undefined,
  codtrailer: 0,
  trailer: false,
  usaconvunid: false,
  quantidade: 0,
  unidsaida: '',
  usadoprod: false,
  dimensao: false,
  devolc: false,
  usaserie: false,
  stockmin: 0,
  stockmax: 0,
  reserva: 0,
  encomenda: 0,
  nmovstk: false,
  pos: false,
  motorista: '',
  departanto: '',
  ccusto: '',
  cilindrada: 0,
  companhia: '',
  contrato: '',
  inicio: new Date(),
  termino: new Date(),
  valorLeasing: 0,
  mensalidade: 0,
  bloqueado: false,
  assentos: 0,
  portas: 0,
  data: new Date(),
  trailref: '',
  traildesc: '',
  anomodelo: 0,
  eixos: 0,
  pneus: 0,
  carga: 0,
  vendido: 0,
  comprado: 0,
  obterpeso: false,
  peso: 0,
  volume: 0,
  usalote: false,
  ivametade: false,
  cpoc: '',
  contaInv: '',
  contaCev: '',
  contaReo: '',
  contaCoi: '',
  nofrota: '',
  cor: '',
  gasoleo: false,
  naovisisvel: false,
  activo: false,
  tipoartigo: 0,
  quantvenda: 0,
  usaquant2: false,
  disciplina: false,
  sigla: '',
  credac: 0,
  cargahtotal: 0,
  cargahteorica: 0,
  cargahpratica: 0,
  prec: false,
  stl: [],
  stb: [],
  stPrecos: [],
  multa: false,
  bilhete: false,
  bilheteespecial: false,
  tipoProduto: 0
}

    this.dialog.open(ModalDisciplinasComponent, {
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

  async editarestudante(estudante: st) {

    this.dialog.open(ModalDisciplinasComponent, {
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


  eliminarestudante(estudante: st) {
    //let tabela = `St`
    let tab= 'St'
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
      
        this._ElinarServic.eliminargradelsddgd(estudante.ststamp,tab,`ststamp`).subscribe({
          next: (data) => {
            if (data.sucesso) {
             // this._loginservice.mostrarAlerta(`${tabela} eliminada com sucesso`, "Ok");
             this.getestudante();
      Swal.fire('Sucesso!', `Disciplina eliminada(o) com sucesso`, 'success');   
             
  
            } else {
              
      Swal.fire('Erro!', `Nao foi possível eliminar a(o) Disciplina`, 'error');   
           
            }
  
          },
          error: () => {
           
          }
        });
  
      }
  
    }));
    
  }


  // eliminarestudante(estudante: st) {
  //   Swal.fire({
  //     title: 'Deseja eliminar a disciplina?',
  //     text: estudante.descricao,
  //     icon: "warning",
  //     confirmButtonColor: '#3085d6',
  //     confirmButtonText: 'Sim, Eliminar',
  //     showCancelButton: true,
  //     cancelButtonColor: '#d33',
  //     cancelButtonText: 'Não, Voltar'
  //   }).then((resultado => {

  //     if (resultado.isConfirmed) {

  //       this._estudanteService.eliminar(estudante.ststamp).subscribe({
  //         next: (data) => {
  //           if (data.sucesso) {
  //             this._loginService.mostrarAlerta("Ano eliminado com sucesso", "Ok");
  //             this.getestudante();
  //           } else {
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

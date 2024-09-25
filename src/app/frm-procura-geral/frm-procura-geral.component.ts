import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, HostListener, Inject, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { selects, selectsprocura } from 'src/Models/CampoSessoes';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCake } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { SelectionModel } from '@angular/cdk/collections';
import { MY_DATA_FORMATS } from 'src/app/listaestudantes/modal-estudantes/modal-estudantes.component';

import { dmzview } from 'src/app/Interfaces/Grade/dmzview';
import { Matriculaservice } from '../Portal-da-Secretaria/MatriculaAluno/matriculaservice';
import { Procuservice } from '../Portal-da-Secretaria/MatriculaAluno/procuservice';
import { procura } from '../Interfaces/Procura/Procura';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-frm-procura-geral',
  templateUrl: './frm-procura-geral.component.html',
  styleUrls: ['./frm-procura-geral.component.scss'],  
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
  ], 
})
export class FrmProcuraGeralComponent implements OnInit, AfterViewInit
{

  constructor(
    private fb:FormBuilder,    
    private modalActual: MatDialogRef<FrmProcuraGeralComponent>,
     @Inject(MAT_DIALOG_DATA) public dadosestudantes: procura,
     private _estudanteService: Procuservice,
     library: FaIconLibrary
  ){
    library.addIcons(faCake);
    this.titloAccao=`Procura `;
    this.botaoAccao=`Processar`;
    this.cadastro = this.fb.group({
 descricao :[''],
  })
  this.dataListaturma.paginator = this.paginacaoTabela; 
  this.descricao=dadosestudantes.campo;
  } 
  
 @ViewChildren(MatPaginator) paginatorTeste = new QueryList<MatPaginator>();
  ngAfterViewInit() {
   // this.dataListaturma.paginator = this.paginatorTeste.toArray()[0];
  }

  ngOnInit(): void {



  }

  @ViewChild(MatPaginator, { static: true})  paginacaoTabela!: MatPaginator;

  totalRecords: number = 0;
  
  pagenumber: number = 0;
  pagesize: number = 0;
  
  pagetotalrecord: number = 0;
  isSpinnerDisplayed = false;
  getestudante() {
    this.isSpinnerDisplayed = false;
    let nimNome = this.cadastro.value.descricao;
    this.initialLoad(nimNome);
  }
  descricao:string=''
  initialLoad(valor: string) {
    this.isSpinnerDisplayed =true;
    let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
        let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
        let proc:procura={
          tabela: this.dadosestudantes.tabela,
          campo: this.dadosestudantes.campo,
          campo1: this.dadosestudantes.campo1,
          chave: this.dadosestudantes.chave,
          valorprocurado: valor,
          pagesize: pageSize,
          marcar: false,
          currentNumber: currentPage,
          professorstamp:'',
          alunoestamp: '',
          rhstamp:'',
          referencia:'',
          descricao:'',
          origem:'',
        }
    this._estudanteService.Procurar(proc).pipe(
      finalize(() => this.isSpinnerDisplayed = false),
    ).subscribe(result => {
      if (result) {
        this.totalRecords = result.totalCount;
        this.dataListaturma.data = result.data;
        this.pagenumber = currentPage;
        this.pagesize = pageSize;
        this.pagetotalrecord=result.totalCount;
      }
    });
  }

  pageIndex: number = 0;
  confirmPageChange(pageEvent: PageEvent) {
    let nimNome = this.cadastro.value.descricao;
    this.pageIndex=pageEvent.pageIndex;
    this.paginacaoTabela.pageSize=pageEvent.pageSize;    
    this.paginacaoTabela.pageIndex=pageEvent.pageIndex;
    this.initialLoad(nimNome);
  }

  async editarestudante(estudante: procura) { 
    this.modalActual.close(estudante);
  }
  titloAccao: string='';
  botaoAccao: string='';
  cadastro!:FormGroup;
  Cadastrar() {      
    this.modalActual.close(this.listamatriculaTurmaAlunol);
  }

  @HostListener('document:keyup.escape') onClose() {
    this.onCancel();
  }
  dmzview:dmzview[]=[];
  onCancel() {
    this.modalActual.close();
  }
  isAllSelecteddmz() {
    const numSelected = this.selectiondmz.selected.length;
    const numRows = this.dataListaturma.data.length;
    return numSelected === numRows;
  }
  clstampvliw:string=''
  listamatriculaTurmaAlunol:procura[]=[]
  selectiondmz = new SelectionModel<procura>(true, []);
  turmastamp:string='';
  adicionarturmaleeee( ) {
    
  let todostrue= this.dataListaturma.data.filter(item => item.marcar == true);  
  if(todostrue.length==0){
    Swal.fire('Não permitido!', 'Nenhuma dado seleccionado!', 'error')     
    return;
  }  
  for (let i = 0; i < todostrue.length; i++) {
    this.listamatriculaTurmaAlunol.push({
      tabela:todostrue[i].tabela,
      campo: todostrue[i].campo,
      campo1: todostrue[i].campo1,
      chave: todostrue[i].chave,
      valorprocurado: todostrue[i].valorprocurado,
      currentNumber: todostrue[i].currentNumber,
      pagesize: todostrue[i].pagesize,
      marcar: todostrue[i].marcar,
      professorstamp:'',
      alunoestamp: '',
      rhstamp:'',
      referencia:'',
      descricao:'',
      origem:'',
    });
  }
this.Cadastrar();
  
  }
 

  onKeyPress($event: MatCheckboxChange,_t25: procura,index:number){      
    const padrao= Boolean($event.checked);
    this.selectiondmz.toggle(_t25)
    _t25.marcar=(padrao);  
    this.dataListaturma.data[index].marcar=padrao;
   }

  masterToggledmz() {

    this.isAllSelecteddmz() ?
        this.selectiondmz.clear() :
        this.dataListaturma.data.forEach(row => this.selectiondmz.select(row));            
        for (let i = 0; i < this.dataListaturma.data.length; i++) {
          this.dataListaturma.data[i].marcar =this.dataListaturma.data[i].marcar;
            }
                }


habilitarcheckebo: boolean = false;
  turma: procura[]=[]  
  turmaa: procura[]=[]  
  dataListaturma = new MatTableDataSource(this.turma);
colunas=['turma','descanoaem','marcar']
totalrecordturma:number=0;
}

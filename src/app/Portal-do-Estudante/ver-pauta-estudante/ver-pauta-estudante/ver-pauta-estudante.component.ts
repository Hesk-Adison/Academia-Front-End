import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCake } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';
import { Estudante } from 'src/Models/Estudante';
import { Turmanota1 } from 'src/Models/Turma';
import { dmzview } from 'src/app/Interfaces/Grade/dmzview';
import { procura } from 'src/app/Interfaces/Procura/Procura';
import { Procuservice } from 'src/app/Portal-da-Secretaria/MatriculaAluno/procuservice';
import { FrmProcuraGeralComponent } from 'src/app/frm-procura-geral/frm-procura-geral.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-pauta-estudante',
  templateUrl: './ver-pauta-estudante.component.html',
  styleUrls: ['./ver-pauta-estudante.component.scss'],
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
 ]
})
export class VerPautaEstudanteComponent
implements OnInit, AfterViewInit
{
  constructor(
    private fb:FormBuilder,
    private modalActual: MatDialogRef<VerPautaEstudanteComponent>,
     @Inject(MAT_DIALOG_DATA) public dadosestudantes: Estudante,
     library: FaIconLibrary
  ){
    library.addIcons(faCake);
    this.titloAccao=`Pauta`;
    this.botaoAccao=`Pauta`;
    this.cadastro = this.fb.group({
 descricao :[''],
  })
  this.dataListaturma.paginator = this.paginacaoTabela;
  }

  ngAfterViewInit() {
    this.getestudante();
  }

  ngOnInit(): void {

  }

  Curso:string=''
  turma:string=''
  Anosem:string=''
  disciplina:string=''
  @ViewChild(MatPaginator, { static: true})  paginacaoTabela!: MatPaginator;
  totalRecords: number = 0;
  pagenumber: number = 0;
  pagesize: number = 0;
  pagetotalrecord: number = 0;
  getestudante() {
    let nimNome = this.cadastro.value.descricao;
    this.initialLoad(nimNome);


    this.Curso=this.dadosestudantes.curso;
    this.turma=this.dadosestudantes.turma;
    this.Anosem=this.dadosestudantes.anosem;
    this.disciplina=this.dadosestudantes.disciplina

  }
  descricao:string=''
  initialLoad(valor: string) {
    let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
        let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
        this.totalRecords = this.dadosestudantes.turmanota.length;
        this.dataListaturma.data = this.dadosestudantes.turmanota;
        this.pagenumber = currentPage;
        this.pagesize = pageSize;
        this.pagetotalrecord=this.dadosestudantes.turmanota.length;
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

  @HostListener('document:keyup.escape') onClose() {
    this.onCancel();
  }
  dmzview:dmzview[]=[];
  onCancel() {
    this.modalActual.close('true');
  }




  turmas: Turmanota1[]=[]
  dataListaturma = new MatTableDataSource(this.turmas);
colunas=['n1','n2','media','resultado','e1','e2','mediafinal', 'resultadoFinal']
}

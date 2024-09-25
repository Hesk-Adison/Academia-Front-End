import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, HostListener, Inject, OnInit, QueryList, SimpleChanges, ViewChildren, forwardRef } from '@angular/core';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
import { dmzview } from 'src/app/Interfaces/Grade/dmzview';
import { disciplinaTumra, matriculaTurmaAlunol } from '../../todasClassesmatricula';
import { MY_DATA_FORMATS } from 'src/app/listaestudantes/modal-estudantes/modal-estudantes.component';
import { Matriculaservice } from '../../matriculaservice';


@Component({
  selector: 'app-modalprocdisci',
  templateUrl: './modalprocdisci.component.html',
  styleUrls: ['./modalprocdisci.component.scss'],  
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
export class ModalprocdisciComponent 

implements OnInit, AfterViewInit
{

  constructor(
    private fb:FormBuilder,
    private turmanotaservice: TurmaNotaService,
    private modalActual: MatDialogRef<ModalprocdisciComponent>,
     @Inject(MAT_DIALOG_DATA) public dadosestudantes: selectsprocura,
     private _estudanteService: Matriculaservice,
     library: FaIconLibrary
  ){
    library.addIcons(faCake);
    this.titloAccao=`Carregar Disciplina`;
    this.botaoAccao=`Processar`;
    this.cadastro = this.fb.group({
      matriculaAlunostamp:[''],
 planopagstamp :[''],
 numero :[0],
 numdoc :[0],
 codigo :[''],
 refonecedor :[''],
 anolectivo :[0],
 descplano :[0], 
 datapartida :[new Date()],
 cursostamp :[''],
 data :[new Date()],//Data de Criacao 
 anoSemstamp :[''],
 clstamp :[''],
 descricao :[''],
 sitcao :[''],
 no :[0],
 nome :[''],
 curso :[''],
 codcurso :[''],
 datamat :[new Date()],
 turno :[''],
 periodo :[''],
 anoSem :[''],
 codtur :[''],
 anolect :[''],
 localmat :[''],
 emails :[''],        
 obs :[''],
 gradestamp :[''],
 descGrade :[''],
 etapa :[''],
 turmadiscstamp :[''],
 ststamp :[''],
 turmastamp :[''],
 turnostamp :[''],
 codfac :[''],
 alauxiliarstamp :[''],
 semstamp :[''],
 nivelac :[''],
 formaingresso :[''],        
 ccusto :[''],
 ccustostamp :[''],
 coddep :[''],
 departamento :[''],
 faculdade :[''],
 descanoaem :[''],
 tipo :[''],
 activo :[false],//True=matrícula cancelada e false = matrícula activa        
 motivo :[''],//Motivo pelo qual lhe leva ao cancelamento da matrícula
matriculaTurmaAlunol: this.fb.array([]),
disciplinaTumra:this.fb.array([]),
matdisc:this.fb.array([]),
 inscricao :[false],
 matricula :[false],
 nomedoc :[''],
      tipo1:[false], 
      tipo2:[false],  
      tipo3:[false], 
      tipo4:[false], 
      
 inserindos :['gghhhhh'],      
  })
   
  } 
  
totalrecorddisciplinas:number=0;
disciplinasa: dmzview[]=[]  
disciplinas: dmzview[]=[]  
dataListadisciplinas = new MatTableDataSource(this.disciplinas);
colunasdisciplinas=['ref','disciplina','ok']
 @ViewChildren(MatPaginator) paginatorTeste = new QueryList<MatPaginator>();
  ngAfterViewInit() {
    this.dataListadisciplinas.paginator = this.paginatorTeste.toArray()[0];
  }

  ngOnInit(): void {
    let set:selects={
      chave:  this.dadosestudantes.chave,
      descricao:  this.dadosestudantes.descricao,
      ordem:  this.dadosestudantes.ordem,
    }
  
    this.clstampvliw=this.dadosestudantes.stamplocal;    
    this._estudanteService.GetAnybyquery(set).subscribe({
      next: (data) => {
        if (data.sucesso) {    
  
   
          data.dados.dmzview = data.dados.dmzview.filter((item: { col1: string; }) => item.col1.toLowerCase() != '');  
          this.totalrecorddisciplinas =data.dados.dmzview.length;              
          this.dataListadisciplinas.data = data.dados.dmzview;   
          if( this.totalrecorddisciplinas>0){
          }else{
            Swal.fire('Opps!', 'O Sistema não conseguiu achar dados nas condições indicadas!', 'error'); 
   
          }
          

        } 
      },
      error: () => {
        //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });
  }
  titloAccao: string='';
  botaoAccao: string='';
  cadastro!:FormGroup;
  Cadastrar() {       
    let todostrue= this.dataListadisciplinas.data.filter(item => item.col3 == 'true'); 
    if(todostrue.length==0){
      Swal.fire('Não permitido!', 'Nenhuma disciplina seleccionada na grelha de disciplina!', 'error')     
      return;
    }    
    this.modalActual.close(this.listamatriculadisciplinaTumra);
  }

  @HostListener('document:keyup.escape') onClose() {
    this.onCancel();
  }
  dmzview:dmzview[]=[];
  onCancel() {
    this.modalActual.close();
  }
  clstampvliw:string=''
 

  
 
  adicionarlistamatriculadisciplinaTumra() {   
  let todostrue= this.dataListadisciplinas.data.filter(item => item.col3 == 'true');  
  if(todostrue.length==0){
    Swal.fire('Não permitido!', 'Nenhuma disciplina seleccionada na grelha de disciplina!', 'error')     
    return;
  }  
  for (let i = 0; i < todostrue.length; i++) {
    
  let stamp =this.turmanotaservice.Stamp()+i;  
    this.listamatriculadisciplinaTumra.push({      
      matriculaAlunostamp: this.clstampvliw,
      disciplinaTumrastamp: stamp,
      disciplina: todostrue[i].col2,
      referenc: todostrue[i].col7,
      turmastamp: todostrue[i].col4,
      codigo:todostrue[i].col7,
      ststamp: todostrue[i].col1,
      clstamp: this.cadastro.value.clstamp,
      sitcao: todostrue[i].col8,
      activo: false,
      motivo: ''
    });
    
  }

  this.Cadastrar();
  
  }
 
      
  listamatriculadisciplinaTumra:disciplinaTumra[]=[]
   isAllSelecteddmzdisciplinas() {
    const numSelected = this.selectiondmzdisciplinas.selected.length;
    const numRows = this.dataListadisciplinas.data.length;
    return numSelected === numRows;
  }
   onKeyPressdisciplina($event: MatCheckboxChange,_t25: dmzview,index:number){      
    const padrao= Boolean($event.checked);
    this.selectiondmzdisciplinas.toggle(_t25)
    _t25.col3=String(padrao);  
    this.dataListadisciplinas.data[index].col3=String(padrao);
   }
  selectiondmzdisciplinas = new SelectionModel<dmzview>(true, []);
  masterToggledmzdisciplinas() {

    this.isAllSelecteddmzdisciplinas() ?
        this.selectiondmzdisciplinas.clear() :
        this.dataListadisciplinas.data.forEach(row => this.selectiondmzdisciplinas.select(row));            
        for (let i = 0; i < this.dataListadisciplinas.data.length; i++) {
          this.dataListadisciplinas.data[i].col3 = String(Boolean(this.dataListadisciplinas.data[i].col3));
            }
                }
  



habilitarcheckebo: boolean = false;
  turma: dmzview[]=[]  
  turmaa: dmzview[]=[]  
  dataListaturma = new MatTableDataSource(this.turma);
colunas=['turma','descanoaem','marcar']
totalrecordturma:number=0;
sele!:selects;
  // Load(){
  //         this._estudanteService.GetQualquerdado(this.dadosestudantes).subscribe({
  //       next: (data) => {
  //         if (data.sucesso) {    
  //           data.dados.dmzview = data.dados.dmzview.filter(item => item.col1.toLowerCase() != '');
  
  //           this.totalrecordturma =data.dados.dmzview.length;              
  //           this.dataListaturma.data = data.dados.dmzview;   
  //           this.turmaa=data.dados.dmzview;
  //           if( this.totalrecordturma>0){
  //             this.habilitarcheckebo=true;
              
  //           }else{
  //             Swal.fire('Opps!', 'O Sistema não conseguiu achar dados nas condições indicadas!', 'error'); 
     
  //           }
            

  //         } 
  //       },
  //       error: (e) => {
  //         //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
  //       }
  //     });

  // }
}

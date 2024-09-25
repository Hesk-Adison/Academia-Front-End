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
import { matriculaTurmaAlunol } from '../MatriculaAluno/todasClassesmatricula';
import { MY_DATA_FORMATS } from 'src/app/listaestudantes/modal-estudantes/modal-estudantes.component';
import { Matriculaservice } from '../MatriculaAluno/matriculaservice';
import { dmzview } from 'src/app/Interfaces/Grade/dmzview';

@Component({
  selector: 'app-modalproc2',
  templateUrl: './modalproc2.component.html',
  styleUrls: ['./modalproc2.component.scss'],  
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
export class Modalproc2Component 
implements OnInit, AfterViewInit
{

  constructor(
    private fb:FormBuilder,
    private turmanotaservice: TurmaNotaService,private http: HttpClient,
    private _loginservice: LoginServiceService,
     private modalActual: MatDialogRef<Modalproc2Component>,
     @Inject(MAT_DIALOG_DATA) public dadosestudantes: selectsprocura,
     private _estudanteService: Matriculaservice,
     library: FaIconLibrary
  ){
    library.addIcons(faCake);
    this.titloAccao=`Carregar Turma`;
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
  
 @ViewChildren(MatPaginator) paginatorTeste = new QueryList<MatPaginator>();
  ngAfterViewInit() {
    this.dataListaturma.paginator = this.paginatorTeste.toArray()[0];
   // this.dataListadisciplinas.paginator=this.paginatorTeste.toArray()[1];
    //this.dataListaplanopagamento.paginator=this.paginatorTeste.toArray()[2];
  }

  ngOnInit(): void {
    let set:selects={
      chave:  this.dadosestudantes.chave,
      descricao:  this.dadosestudantes.descricao,
      ordem:  this.dadosestudantes.ordem,
    }
    this.clstampvliw=this.dadosestudantes.stamplocal;
    this._estudanteService.GetQualquerdado(set).subscribe({
        next: (data) => {
          if (data.sucesso) {    
            data.dados.dmzview = data.dados.dmzview.filter(item => item.col1.toLowerCase() != '');
  
            this.totalrecordturma =data.dados.dmzview.length;              
            this.dataListaturma.data = data.dados.dmzview;   
            this.turmaa=data.dados.dmzview;
            if( this.totalrecordturma>0){
              this.habilitarcheckebo=true;              
            }else{
              Swal.fire('Opps!', 'O Sistema não conseguiu achar dados nas condições indicadas!', 'error'); 
     
            }
            

          } 
        },
        error: (e) => {
          //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
        }
      });

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
  listamatriculaTurmaAlunol:matriculaTurmaAlunol[]=[]
  selectiondmz = new SelectionModel<dmzview>(true, []);
  turmastamp:string='';
  adicionarturmaleeee( ) {
    
  let todostrue= this.dataListaturma.data.filter(item => item.col9 == 'true');  
  if(todostrue.length==0){
    Swal.fire('Não permitido!', 'Nenhuma turma seleccionada na grelha de turmas!', 'error')     
    return;
  }  
  for (let i = 0; i < todostrue.length; i++) {
  let stamp =this.turmanotaservice.Stamp()+i;  
  if(this.turmastamp.length==0)
  {
    this.turmastamp=`'${todostrue[i].col1}'`
  }else{
    
  this.turmastamp+=`,'${todostrue[i].col1}'`
  }
    this.listamatriculaTurmaAlunol.push({
      matriculaTurmaAlunolstamp: stamp,
      matriculaAlunostamp: this.clstampvliw,
      codigo: todostrue[i].col2,
      descricao: todostrue[i].col10,
      
      anoSemstamp: todostrue[i].col3,
      descanoaem: todostrue[i].col4,
      descurso: this.cadastro.value.curso,
      cursostamp: this.cadastro.value.cursostamp,
      descgrade: this.cadastro.value.descGrade,
      gradestamp: this.cadastro.value.gradestamp,
      etapa: todostrue[i].col5,
      sala: todostrue[i].col6,
      turno: todostrue[i].col7,
      vagasmin: Number(todostrue[i].col11),
      vagasmax:  Number(todostrue[i].col12),
      responsavel: todostrue[i].col13,
      responsavel2:todostrue[i].col14,
      semanaslec:Number(todostrue[i].col15),
      horasaulas:Number(todostrue[i].col16),
      formaaval: todostrue[i].col17,
      situacao: todostrue[i].col18,
      obs: todostrue[i].col19,
      datain: new Date(),
      datafim: new Date(),
      horain: new Date(),
      horafim: new Date(),
      turmastamp: todostrue[i].col1,
      turmadiscstamp: '',
      padrao: false
    });
  }
this.Cadastrar();

  
  }
 

  onKeyPress($event: MatCheckboxChange,_t25: dmzview,index:number){      
    const padrao= Boolean($event.checked);
    this.selectiondmz.toggle(_t25)
    _t25.col9=String(padrao);  
    this.dataListaturma.data[index].col9=String(padrao);
   }

  masterToggledmz() {
    console.log(this.dataListaturma.data);
    this.isAllSelecteddmz() ?
        this.selectiondmz.clear() :
        this.dataListaturma.data.forEach(row => this.selectiondmz.select(row));            
        for (let i = 0; i < this.dataListaturma.data.length; i++) {
          this.dataListaturma.data[i].col9 = String(Boolean(this.dataListaturma.data[i].col9));
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

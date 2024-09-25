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
import { MY_DATA_FORMATS } from 'src/app/listaestudantes/modal-estudantes/modal-estudantes.component';

import { dmzview } from 'src/app/Interfaces/Grade/dmzview';
import { Matriculaservice } from '../Portal-da-Secretaria/MatriculaAluno/matriculaservice';
import { matriculaTurmaAlunol } from '../Portal-da-Secretaria/MatriculaAluno/todasClassesmatricula';
import { Procuservice } from '../Portal-da-Secretaria/MatriculaAluno/procuservice';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-frm-pgf',
  templateUrl: './frm-pgf.component.html',
  styleUrls: ['./frm-pgf.component.scss'],  
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
export class FrmPgfComponent 
implements OnInit, AfterViewInit
{

  constructor(
    private fb:FormBuilder,
    private turmanotaservice: TurmaNotaService,private http: HttpClient,
    private _loginservice: LoginServiceService,
     private modalActual: MatDialogRef<FrmPgfComponent>,
     @Inject(MAT_DIALOG_DATA) public dadosestudantes: selectsprocura,
     private _estudanteService: Procuservice,
     library: FaIconLibrary
  ){
    library.addIcons(faCake);
    this.titloAccao=`Carregar Dados`;
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
  }

  isSpinnerDisplayed = true;
  ngOnInit(): void {


    this.isSpinnerDisplayed =true;
    let set:selects={
      chave:  this.dadosestudantes.chave,
      descricao:  this.dadosestudantes.descricao,
      ordem:  this.dadosestudantes.ordem,
    }
    this.clstampvliw=this.dadosestudantes.stamplocal;
    this._estudanteService.GetCc(set).pipe(
      finalize(() => this.isSpinnerDisplayed = false),
    ).subscribe({
        next: (data) => {
          if (data.sucesso) {    


            // const listaOrdenada = data.dados.dmzview.sort((a, b) => {
            //   return new Date(a.col3).getTime() - new Date(b.col3).getTime();
            // });

        
            

            data.dados.dmzview = data.dados.dmzview.filter(item => item.col1.toLowerCase() != '');  
            this.totalrecordturma =data.dados.dmzview.length;              
            this.dataListaturma.data = data.dados.dmzview;  
            
            if( this.totalrecordturma>0){
              this.habilitarcheckebo=true;              
            }else{
              Swal.fire('Opps!', 'Sem dados nestas condições!', 'error');      
            }
          } 
        },
        error: (e) => {
          
          Swal.fire('Opps!', 'Erro inesperado...! ', 'error');   
          //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
        }
      });

  }
  titloAccao: string='';
  botaoAccao: string='';
  cadastro!:FormGroup;
  Cadastrar() {      
    this.modalActual.close(this.listacc);
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
    
  let todostrue= this.dataListaturma.data.filter(item => String(Boolean(item.col25)).toLowerCase() == 'true');  
  let verifa:Boolean=false;
  if(todostrue.length==0){
    Swal.fire('Não permitido!', 'Nenhuma linha seleccionada!', 'error')     
    return;
  }  
  for (let i = 0; i < todostrue.length; i++) {
  if(todostrue[i].col25.toLowerCase()=='true'){
    verifa=true;
    this.listacc.push({
      chave: todostrue[i].chave,
      descricao: todostrue[i].descricao,
      ordem: todostrue[i].ordem,
      query: todostrue[i].query,
      tabela: todostrue[i].tabela,
      col1: todostrue[i].col1,
      col2: todostrue[i].col2,
      col3: todostrue[i].col3,
      col4:todostrue[i].col4,
      col5: todostrue[i].col5,
      col6: todostrue[i].col6,
      col7: todostrue[i].col7,
      col8: todostrue[i].col8,
      col9: todostrue[i].col9,
      col10: todostrue[i].col10,
      col11: todostrue[i].col11,
      col12: todostrue[i].col12,
      col13: todostrue[i].col13,
      col14: todostrue[i].col14,
      col15: todostrue[i].col15,
      col16: todostrue[i].col16,
      col17: todostrue[i].col17,
      col18: todostrue[i].col18,
      col19: todostrue[i].col19,
      col20: todostrue[i].col20,
      col21: todostrue[i].col21,
      col22: todostrue[i].col22,
      col23: todostrue[i].col23,
      col24:todostrue[i].col24,
      col25: todostrue[i].col25,
      col26: todostrue[i].col26,
      col27: todostrue[i].col27,
      col28: todostrue[i].col28,
      col29: todostrue[i].col29,
      col30: todostrue[i].col29,
      col31: todostrue[i].col30,
      col32: todostrue[i].col31,
      col33: todostrue[i].col32,
      col34: '',
      col35: '',
      col36: '',
      col37: '',
      col38: '',
      col39: '',
      col40: '',
      col41: '',
      col42: '',
      col43: '',
      col44: '',
      col45: '',
      col46: '',
      col47: '',
      col48: '',
      col49: '',
      col50: '',
      col51: ''
    });
  }


  }
  if(verifa==false){
    Swal.fire('Não permitido!', 'Nenhuma linha seleccionada!', 'error')     
    return;
  }  
this.Cadastrar();
  
  }
 

  onKeyPress($event: MatCheckboxChange,_t25: dmzview,index:number){ 
      
    const padrao= Boolean($event.checked);
    this.selectiondmz.toggle(_t25)
    _t25.col25=String(padrao);  
    this.dataListaturma.data[index].col25=String(padrao);
   }

  masterToggledmz() {
    this.isAllSelecteddmz() ?
        this.selectiondmz.clear() :
        this.dataListaturma.data.forEach(row => this.selectiondmz.select(row));            
        for (let i = 0; i < this.dataListaturma.data.length; i++) {
          this.dataListaturma.data[i].col25 = String(true);
            }

                }


                onKeyPresssd($event: Event,_t25: dmzview,number: number)
                {
                let id=($event.target as HTMLInputElement).id.replace(`-${number}`,'').toString().toLowerCase()
                switch(id){
                  case 'media':
                  _t25.col6 =String(this.newMethod($event));     
                    break;
                }
                }
               private newMethod($event: Event): number {
                  return Number(($event.target as HTMLInputElement).value);
                }
habilitarcheckebo: boolean = false;
  turma: dmzview[]=[]  
  listacc: dmzview[]=[]  
  dataListaturma = new MatTableDataSource(this.turma);
colunas=['descricao','nrdoc','valordoc','valorpreg','valorreg','marcar']
totalrecordturma:number=0;
sele!:selects;
}

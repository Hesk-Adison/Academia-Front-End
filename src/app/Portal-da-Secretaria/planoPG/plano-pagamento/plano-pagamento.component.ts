import { formatDate } from '@angular/common';
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCake } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, startWith, map, finalize } from 'rxjs';
import { FrmPgfComponent } from 'src/app/frm-pgf/frm-pgf.component';
import { FrmProcuraGeralComponent } from 'src/app/frm-procura-geral/frm-procura-geral.component';
import { rcll, formasp, rCL } from 'src/app/frm-rcl/TodosRCL';
import { FrmrclBuscaComponent } from 'src/app/frmrclBusca/frmrcl-busca/frmrcl-busca.component';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { dmzview } from 'src/app/Interfaces/Grade/dmzview';
import { procura } from 'src/app/Interfaces/Procura/Procura';
import { VerTrabalhoComponent } from 'src/app/Portal-do-Estudante/trabalho/ver-trabalho/ver-trabalho.component';
import { turmanota, turmadisc } from 'src/app/Turmas/todastabelasturma';
import { Alauxiliar } from 'src/Models/Alauxiliar';
import { selects, condicoesprocura, selectsprocura, contacorrentelista } from 'src/Models/CampoSessoes';
import { Clview } from 'src/Models/Cldocs';
import { Resposta } from 'src/Models/Resposta';
import { Trabalho } from 'src/Models/trabalho';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import Swal from 'sweetalert2';
import { Matriculaservice } from '../../MatriculaAluno/matriculaservice';
import { planopag, matriculaAluno, disciplinaTumra, tRcl, planopagp } from '../../MatriculaAluno/todasClassesmatricula';
import { PlanopagamentoService } from 'src/Service/planopagService/planopagamento.service';
import { yearsPerPage } from '@angular/material/datepicker';
import { environment } from 'src/environments/environment';
import { Planopag } from 'src/Models/PlanoPagamento/planoPag';
import { Planopagp } from 'src/Models/PlanoPagamento/Planopagp';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-plano-pagamento',
  templateUrl: './plano-pagamento.component.html',
  styleUrls: ['./plano-pagamento.component.scss']
})
export class PlanoPagamentoComponent {

  private someInputSubject = new BehaviorSubject<any>(null);
  someInput$ = this.someInputSubject.asObservable();



  ngAfterViewInit() {

    this.dataListaturma.paginator=this.paginatorTeste.toArray()[0];
   
    this.cdr.detectChanges();



  }

  toggle1(event: MatSlideToggleChange) {
    if(event.checked==true)
    {
      this.cadastro.controls['tipo1'].setValue(true);
      //this.dadosestudantes.horasaulas=1;
    }else{
      //this.dadosestudantes.horasaulas=0;
      this.cadastro.controls['tipo1'].setValue(false);
    }
    this.cadastro.value.tipo3=false;
    this.cadastro.value.tipo2=false;
    this.cadastro.value.tipo4=false;
    this.cadastro.controls['tipo3'].setValue(false);
    this.cadastro.controls['tipo2'].setValue(false);
    this.cadastro.controls['tipo4'].setValue(false);
  }
  onKeyPressxffdf($event: MatCheckboxChange){   

    const padrao= Boolean($event.checked);
    this.cadastro.patchValue({tipo:1})
   }

   onKeyPressx($event: MatCheckboxChange){      
    const padrao= Boolean($event.checked);
  
    this.cadastro.patchValue({tipo:1})
   }

  getTotalCost(){
    return 25;
  }
  @ViewChild(MatPaginator, { static: true})  paginacaoTabela!: MatPaginator;

  @ViewChild(MatPaginator)  paginacaoTurmas!: MatPaginator;
listaplanopagamento:planopag[]=[]


allComplete: boolean = false;
habilitarcheckebo: boolean = false;



    totalRecords: number = 0;

    pagenumber: number = 0;
    pagesize: number = 0;

    pagetotalrecord: number = 0;
    isSpinnerDisplayed = false;
    listplanopagamento: dmzview[] = [];
    dataListaplanopagamento = new MatTableDataSource(this.listplanopagamento);



    myControl = new FormControl<string | selects>('');
    options: selects[] = [];
    filteredOptions!: Observable<selects[]>;
    myControlsexo = new FormControl<string | selects>('');
    optionssexo: selects[] = [];
    filteredOptionssexo!: Observable<selects[]>;
    myControlestadociv = new FormControl<string | selects>('');
    optionsestadociv: selects[] = [];
    filteredOptionsestadociv!: Observable<selects[]>;
    sexo:string='';
    estadocivil:string='';
    SetSexo(item:selects){
  this.sexo=item.descricao;
    }
    Setestadoscivil(item:selects){
      this.estadocivil=item.descricao;
        }


    working = false;
    uploadFile!: File | null;
    selectedFile!: any;
    uploadFileLabel: string | undefined = 'Escolha a imagem';
    uploadProgress: number=0;
    uploadUrl: string="";
    name = '';
    fileUrl!:any;
    fileName!:string;


    descricaopais!: string;
    paisstamp!: string;
    descricaoProvincia!: string;
    Provinciastamp!: string;

    descricaodistrito!: string;
    distritostamp!: string;
    disabiltabtnSave:any;



  //Filtro de provincia local emissao
  myControlprovincia = new FormControl<string | selects>('');
  myControlbis = new FormControl<string | selects>('');

  optionslistaprovincia: selects[] = [];
  filteredOptionsprovincia!: Observable<selects[]>;
  listaprovincia: selects[] = [];
  listaaprovinciafilterr: selects[] = [];



  //Filtro de paises  local nasciment
  myControlpaises = new FormControl<string | selects>('');
  optionslistapaises: selects[] = [];
  filteredOptionspaises!: Observable<selects[]>;
  //listapaises: selects[] = [];


  listaapaisesfilterr: selects[] = [];

  //Filtro de provincia local nasciment
  myControlprovincianasciment = new FormControl<string | selects>('');
  optionslistaprovincianasciment: selects[] = [];
  filteredOptionsprovincianasciment!: Observable<selects[]>;
  listaprovincianasciment: selects[] = [];
  listaaprovinciafilterrnasciment: selects[] = [];
  //Filtro de Distrito nascimento
  myControldistrito = new FormControl<string | selects>('');
  optionslistadistrito: selects[] = [];
  filteredOptionsdistrito!: Observable<selects[]>;
  listadistrito: selects[] = [];
  listaadistritofilterr: selects[] = [];



  myControllocalemissao = new FormControl<string | selects>('');
  optionsemissao: selects[] = [];
  filteredOptionsemissao!: Observable<selects[]>;

  myControldisciplinas = new FormControl<string | matriculaAluno>('');
  optionsdisciplinas: matriculaAluno[] = [];
  filtareringoptionsdisciplinas: matriculaAluno[] = [];
  filteredOptionsdisciplinas!: Observable<matriculaAluno[]>;
  async  getdisciplinas() {




  }





  myControlstatuss = new FormControl<string | selects>('');
  optionsstatuss: selects[] = [];
  filteredOptionsstatuss!: Observable<selects[]>;

  @ViewChild('listastatuss') listastatuss!: MatSelect;
  statuss:string='';


  Setstatuss(item:selects){
    this.statuss=item.descricao;
    this.cadastro.patchValue({
      sitcao:this.statuss,
    })
      }
  async Getstatuss(){
    const se:condicoesprocura={
      tabela:"Auxiliar",
    campo1: "descricao",
    campo2:"codigo",
     condicao:"Tabela=79"
    }
    //codigo,descricao
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionsstatuss = data.dados.selects;
          this.filteredOptionsstatuss = this.myControlstatuss.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsstatuss) : this.optionsstatuss.slice();
            }),
          );
        } else {
          this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
        }
      },
      error: (e) => {
        this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });

  }


  async GetDisciplina(){
    const se:condicoesprocura={
      tabela:"st",
    campo1: "descricao",
    campo2:"referenc",
     condicao:"vazio"
    }
    //codigo,descricao
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionsst = data.dados.selects;

          this.optionsstref = data.dados.selects;
          this.filteredOptionsst= this.myControlst.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsst) : this.optionsst.slice();
            }),
          );

          this.filteredOptionsstref= this.myControlstref.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.ordem;
              return name ? this._filterref(name as string,this.optionsstref) : this.optionsstref.slice();
            }),
          );
        } else {
          this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
        }
      },
      error: (e) => {
        this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });

  }



  myControlreliagiao = new FormControl<string | selects>('');
  optionsreliagiao: selects[] = [];
  filteredOptionsreliagiao!: Observable<selects[]>;




listaccfill: rcll[]=[]

  turma: dmzview[]=[]
  turmaa: dmzview[]=[]
  dataListaturma = new MatTableDataSource(this.listaccfill);
  colunas=['nrdoc','descricao','data','valordoc','valorpreg','valorreg','desconto','valorpend','marcar']



  // colunas=[,'valorpend','marcar']
totalrecordturma:number=0;



disciplinasa: dmzview[]=[]
disciplinas: dmzview[]=[]

 @ViewChildren(MatPaginator) paginatorTeste = new QueryList<MatPaginator>();



listacc: dmzview[]=[]




get itemsFp(): FormArray {

  return this.cadastro.get('planopagp') as FormArray;
 }

 onSelectbi(value:selects,i:number) {


  let langArr = (<FormArray>this.cadastro.get('planopagp'));
  langArr.controls[i].patchValue({titulo:value.descricao,
        })



}
colunasturmacopy=['numero','nome','email','marcar']
  async Getturmas(){

    if(this.cadastro.value.cursostamp.length==0){
      Swal.fire('Não permitido!', 'O curso do aluno está vazio!', 'error')
      return;
    }
    if(this.cadastro.value.clstamp.length==0){
      Swal.fire('Não permitido!', 'Indica o aluno primeiro!', 'error')
      return;
    }


    let set:selectsprocura={
      chave:  this.docMat.tRclstamp,
      descricao: this.docMat.tRclstamp,
      ordem: this.cadastro.value.clstamp,
      stamplocal: this.clstampvliw,
      stampsexcepcao:this.cadastro.value.clstamp
    }






  }




  async Getcl(){
    const se:condicoesprocura={
      tabela:"cl",
    campo1: "nome",
    campo2:"no",
     condicao:"aluno=1"
    }
    //codigo,descricao
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionscl = data.dados.selects;
          this.optionsclcodo = data.dados.selects;
          this.filteredOptionscl= this.myControlcl.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionscl) : this.optionscl.slice();
            }),
          );

          this.filteredOptionsclcodo= this.myControlclcodo.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.ordem;
              return name ? this._filterref(name as string,this.optionsclcodo) : this.optionsclcodo.slice();
            }),
          );


        } else {
         // this._loginservice.mostrarAlerta("Nao foi possivel carregar a lista de alunos", "Opps");
        }
      },
      error: (e) => {
       // this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });

  }



  myControlcl= new FormControl<string | selects>('');
  optionscl: selects[] = [];
  filteredOptionscl!: Observable<selects[]>;

  myControlclcodo= new FormControl<string | selects>('');
  optionsclcodo: selects[] = [];
  filteredOptionsclcodo!: Observable<selects[]>;


  @ViewChild('listareliagiao') listareliagiao!: MatSelect;
  reliagiao:string='';




  myControlplanocurricular = new FormControl<string | selects>('');
  optionsplanocurricular: selects[] = [];
  filteredOptionsplanocurricular!: Observable<selects[]>;

  @ViewChild('listaplanocurricular') listaplanocurricular!: MatSelect;
  planocurricular:string='';
  planocurricularstamp:string='';









  myControlCurso = new FormControl<string | selects>('');
  optionsCurso: selects[] = [];
  filteredOptionsCurso!: Observable<selects[]>;
  Curso:string='';
  Cursostamp:string='';
  SetCurso(item:selects){
    this.Curso=item.descricao;
  this.Cursostamp=item.chave;
//console.log(`${this.Curso}  and ${  this.Cursostamp}`)
  this.cadastro.patchValue({desccurso:this.Curso, cursostamp:this.Cursostamp})
  this.Getplanocurricular(item);
      }
  async GetCurso(){
    const se:condicoesprocura={
      tabela:"Curso",
    campo1: "Desccurso",
    campo2:"Codcurso",
     condicao:"vazio"
    }

    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionsCurso = data.dados.selects;
          this.filteredOptionsCurso = this.myControlCurso.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsCurso) : this.optionsCurso.slice();
            }),
          );
        } else {
          this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
        }
      },
      error: (e) => {
        this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });

  }


  Setplanocurricular(item:selects){
    this.planocurricular=item.descricao;
  this.planocurricularstamp=item.chave;
      }
  async Getplanocurricular(value1:selects) {
    this. myControlplanocurricular = new FormControl<string | selects>('');
     let value = value1.chave;
     const se:condicoesprocura={
      tabela:"Grade",
      campo1: "Descricao",
      campo2:"Codigo",
      condicao:`cursostamp='${value}'`
     }

    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionsplanocurricular = data.dados.selects;
          this.filteredOptionsplanocurricular = this.myControlplanocurricular.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsplanocurricular) : this.optionsplanocurricular.slice();
            }),
          );
        } else {
          this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
        }
      },
      error: (e) => {
        this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });

  }





  myControlst = new FormControl<string | selects>('');
  optionsst: selects[] = [];
  filteredOptionsst!: Observable<selects[]>;

  myControlstref = new FormControl<string | selects>('');
  optionsstref: selects[] = [];
  filteredOptionsstref!: Observable<selects[]>;


  disciplina:string='';
  ststamp:string='';

  displayValue(x:any,i:number){
  var fff=x.target.value;
  this.listaturmadis[i].disciplina=fff;

  }


  //     SetAluno(item:selects,i:number){
  //  // this.listaturmal[i].no=item.ordem;
  //  // this.listaturmal[i].nome=item.descricao;
  //   //this.listaturmal[i].clstamp=item.chave;
  // this.matriculaTurmaAlunol.clear();
  //   this.carregarmatriculaTurmaAlunol(this.listamatriculaTurmaAlunol)

  //         }

  paisnascimento:string='';
  pprovnascimento:string='';
  codprovnascimento:number=0;
  pprovnascimentostamp:string='';
  distrnascimento:string='';


  private _filter(name: string,list:selects[]): selects[] {
    const filterValue = name.toLowerCase();
    let fffh=list.filter(option => option.descricao.toLowerCase().includes(filterValue));

    return fffh;
  }

  private _filtercontas(name: string,list:any[]): any[] {
    const filterValue = name.toLowerCase();
    let fffh=list.filter(option => option.contas.toLowerCase().includes(filterValue));

    return fffh;
  }



  private _filterref(name: string,list:selects[]): selects[] {
    const filterValue = name.toLowerCase();
    return list.filter(option => option.ordem.toLowerCase().includes(filterValue));
  }

  isibilidadeturmanota=false;








  aturmadisc(item: turmadisc): any {
    return this.fb.group({
      turmadiscstamp:[item.turmadiscstamp],
      turmastamp:[item.turmastamp],
      ststamp :[item.ststamp],
      referenc :[item.referenc],
      disciplina :[item.disciplina],
      turmadiscp :[item.turmadiscp],//True=matrícula cancelada e false = matrícula activa

        })
    }

  cldocumentos = new FormArray([]);
  disciplinades:string='';
  visibilidadeturmal:boolean=false;
  // carregarmatriculaTurmaAlunol(afam: formasp[]) {


  //   this.visibilidadeturmal=true;
  //   this.isLoggedIn=false;
  //   const formArray = this.cadastro.get('planopagp') as FormArray;
  //   afam.map(item => {
  //     formArray.push(this.Planopagp(item));
  //   });
  // }
  ststampsss:string='';

  
  Planopagp(item: Planopagp): any {

   // itemsFp
    return this.fb.group({
      planopagpstamp: [''],
      planopagstamp: [''],
      ordem: [0],
      descricao:[''],
      data: new Date(),
      parecela:[0],
      valorbruto: [0],
      valordesc: [0],
      valorextra: [0],
      valordescextra: [0],
      valorTotal: [0],
      titulo: [''],
      pzerro: [false],
      //planopag: [''],
    })
    }






  //======================Teste======================
    cadastro!:FormGroup

    nivelacademico:any
    getestudante() {
      this.isSpinnerDisplayed = true;
      let nimNome = '';

let prc:procura={
  tabela: 'cl',
  campo: 'nome',
  campo1: 'no',
  chave: 'clstamp',
  valorprocurado: nimNome,
  currentNumber: 1,
  pagesize: 5,
  marcar: false,

  professorstamp:'',
      alunoestamp: '',
      rhstamp:'',
      referencia:'',
      descricao:'',
      origem:'',
}
      this.dialog.open(FrmProcuraGeralComponent, {
        // height: '77%',
        // width: '50%',
        disableClose: true,
        data: prc,
        autoFocus: false,
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
      }).afterClosed().subscribe(resultado => {
    

        if (resultado) {

let set:selects={
  chave: resultado.chave,
  descricao: resultado.chave,
  ordem: resultado.chave
}

this.itemsFp.clear();
this.dataListaturma.data=[];
this.listaccfill=[];
          this.onSelectAluno(set)
        }
      });
    }
      //======================Ano Sem======================

        //======================Teste======================
    myControlnivelacademico = new FormControl<string | selects>('');
    optionsnivelacademico: selects[] = [];
    filteredOptionsnivelacademico!: Observable<selects[]>;  
    Setnivelacademico(item:selects){
      this.nivelacademico=item.descricao;
      this.cadastro.patchValue({descdistrato:this.nivelacademico, });
        }


        async Getnivelacademico(){ 
          //select Codigo,descricao from PeAuxiliar where tabela =11 order by codigo
    
          const se:condicoesprocura={
            tabela:"PeAuxiliar",
          campo1: "descricao", 
          campo2:"Codigo",
           condicao:"tabela=11"
          }
          
          this._loginservice.getselectionPost(se).subscribe({
            next: (data) => {
           
              if (data.sucesso) {            
                this.optionsnivelacademico = data.dados.selects.slice(-3);
                this.filteredOptionsnivelacademico = this.myControlnivelacademico.valueChanges.pipe(
                  startWith(''),
                  map(value => {            
                    const name = typeof value === 'string' ? value : value?.descricao;
                    return name ? this._filter(name as string,this.optionsnivelacademico) : this.optionsnivelacademico.slice();
                  }),
                );
              } else {
                //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
              }
            },
            error: (e) => {
              //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
            }
          });
        
        }
    cadastros!:FormGroup
    DadosGerais!: Clview
    fotos: any
    foto: any

    colunasTabela: string[] = ['no','entidadebanc', 'referencia','descricao','data','dataven','valorreg'];
    colunasTabelaprofes: string[] = ['no','codigo', 'descricao', 'accoes'];
      titloAccao: string='';
      botaoAccao: string='';
    clfamstamp: string=''

    labelPosition: 'before' | 'after' = 'after';
    disabled = false;
      constructor(
        private fb:FormBuilder,
        private turmanotaservice: TurmaNotaService,private http: HttpClient,
        private _loginservice: LoginServiceService,
         private _estudanteService: Matriculaservice,
         private dialog: MatDialog,library: FaIconLibrary,
         private matriculaservice:Matriculaservice,
         private guardarsessoes:GuardarSessoes,
         private cdr: ChangeDetectorRef,
         private ngZone: NgZone,
         private planopagamentoService: PlanopagamentoService


      ){
        library.addIcons(faCake);
        let date = new Date();
        let year = date.getFullYear();
        //this.dataListaturma.paginator = this.paginacaoTurmas;
        this.titloAccao=`Novo`;
        this.botaoAccao=`Salvar`;
        this.cadastro = this.fb.group({
          planopagstamp: [''],
          codigo: [''],
          descricao: [''],
          parcelas: [0],
          anosem: [''],
          anolectivo: [year],
          valor: [0],
          valorextra: [0],
          desconto: [0],
          valorparzero: [0],
          datapartida: new Date(),
          datafim: new Date(),
          diauteis: false,
          pularsabados: false,
          pulardomingos: false,
          pularferiados: false,
          tipo: [0],
          distrato: false,
          valordistrato: [0],
          diasvenc: [0],
          tipoValdistrato: [0],
          descdistrato: [''],
          cursostamp: [''],
          desccurso: [''],
          descanosem: [''],
          anoSemstamp: [''],
          planopagp: this.fb.array([]),
          planopagt: this.fb.array([]),
          tipo1:[false],
          tipo2:[false],
      })

    
      }



      nos:string='';
      nome=''
     async ngOnInit() {

      

      this.habilitarcheckebo=false;
      await  this.Getstatuss();
     await this. Getturno();

     await this.GetAnoSem();
     await this.GetCurso();
      await this.GetDisciplina();

      await this.getEtapaSemestre();
     this.Getnivelacademico();

    this.displayedColumnsfinanceiro= ['codigo','descricao','accoes'];

this.nome=this.guardarsessoes.obterSessao().nome


    this.titloAccao = "Nova Matrícula";
    this.isSpinnerDisplayed = false;
     this.clstampvliw=this.turmanotaservice.Stamp();

     this.editando=false;

    this.botaoAccao = "Salvar";
      }

      isLoggedIn = true;
  myControlccu1 = new FormControl<string | selects>('');
  optionsccu1: selects[] = [];
  filteredOptionsccu1!: Observable<selects[]>;
  editando:boolean=false;


  @ViewChild('listaccu1') listaccu1!: MatSelect;
  ccu1:string='';
  ccu1stamp:string='';
  Setccu1(item:selects){
    this.ccu1=item.descricao;
  this.ccu1stamp=item.chave;
      }


      toggle111(event: MatSlideToggleChange) {
        if(event.checked==true)
        {
          this.cadastro.patchValue({tipo:'1'});
        }else{
          this.cadastro.patchValue({tipo:'0'});
        }
        this.cadastro.patchValue({tipo2:false})
      }
  toggle2222(event: MatSlideToggleChange) {
    if(event.checked==true)
      {
        this.cadastro.patchValue({tipo:'3'});
      }else{
        this.cadastro.patchValue({tipo:'0'});
      }
      this.cadastro.patchValue({tipo1:false})
  }
  toggle3(event: MatSlideToggleChange) {
    if(event.checked!=true)
    {
      //this.dadosestudantes.tipo=0;
    }else{

      //this.dadosestudantes.tipo=3;
    }
    this.cadastro.value.tipo1=false;
    this.cadastro.value.tipo2=false;
    this.cadastro.value.tipo4=false;
    this.cadastro.controls['tipo1'].setValue(false);
    this.cadastro.controls['tipo2'].setValue(false);
    this.cadastro.controls['tipo4'].setValue(false);

  }
  toggle4(event: MatSlideToggleChange) {
    if(event.checked!=true)
    {
      //this.dadosestudantes.tipo=0;
    }else{

     // this.dadosestudantes.tipo=4;
    }
    this.cadastro.value.tipo1=false;
    this.cadastro.value.tipo2=false;
    this.cadastro.value.tipo3=false;
    this.cadastro.controls['tipo3'].setValue(false);
    this.cadastro.controls['tipo2'].setValue(false);
    this.cadastro.controls['tipo1'].setValue(false);
  }


  myControlTipoDoc = new FormControl<string | selects>('');
  optionsTipoDoc: selects[] = [];
  filteredOptionsTipoDoc!: Observable<selects[]>;





  tdocdescricao:string='';
  tdocstamp:string='';
  numdoc:number=0;
  docMat!:tRcl;
  visiblelinhas=false
  visibletable=true







  AnoSem:string='';
  AnoSemstamp:string='';


  myControlAnoSem = new FormControl<string | selects>('');
  optionsAnoSem: selects[] = [];
  filteredOptionsAnoSem!: Observable<selects[]>;




  SetAnoSem(item:selects){
    this.AnoSem=item.descricao;
  this.AnoSemstamp=item.chave;
  this.cadastro.patchValue({
    anosem:this.AnoSem,
    anoSemstamp:this.AnoSemstamp,
    descanosem:item.ordem
  })
      }
  async GetAnoSem(){
    const se:condicoesprocura={
      tabela:"AnoSem",
    campo1: "codigo",
    campo2:"descricao",
     condicao:"vazio"
    }

    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionsAnoSem = data.dados.selects;
          this.filteredOptionsAnoSem = this.myControlAnoSem.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsAnoSem) : this.optionsAnoSem.slice();
            }),
          );
        } else {
          this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
        }
      },
      error: (e) => {
        this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });

  }









  





      myControlturno = new FormControl<string | selects>('');
      optionsturno: selects[] = [];
      filteredOptionsturno!: Observable<selects[]>;
      EtapaSemestre: string='';
      EtapaSemestrestamp: string='';

      onSetEtapaSemestre(value:any,i:number) {

  let langArr = (<FormArray>this.cadastro.get('planopagp'));
  langArr.controls[i].patchValue(
    {
      contatesoura:value.contas,
      codtz:value.codigo,
      banco:value.sigla,
      contasstamp:value.contasstamp,
        }
  )
      } 
      
    

      
    
adicionarFp() {

  this.visibilidadeagregado=true;
let stamp =this.turmanotaservice.Stamp();

  this.itemsFp.push(this.fb.group({
    planopagpstamp: [stamp],
    planopagstamp: [''],
    ordem: [0],
    descricao:[''],
    data: new Date(),
    parecela:[0],
    valorbruto: [0],
    valordesc: [0],
    valorextra: [0],
    valordescextra: [0],
    valorTotal: [0],
    titulo: [''],
    pzerro: [false],
    planopag: [''],
  }));
}



      myControlEtapaSemestre = new FormControl<string | any>('');
      optionsEtapaSemestre: any[] = [];
      filteredOptionsEtapaSemestre!: Observable<any[]>;

      async  getEtapaSemestre() {

        const se:selects={
          chave: 'GetContas()',
          descricao: 'gfgfg',
          ordem: 'fgfgf'
        }

        this._estudanteService.GetQualquerObjectDt(se).subscribe({
          next: (data) => {
            if (data.sucesso) {
              this.optionsEtapaSemestre = data.dados;

              this.filteredOptionsEtapaSemestre = this.myControlEtapaSemestre.
              valueChanges.pipe(
                startWith(''),
                map(value => {

                  const name = typeof value === 'string' ? value : value?.contas;
                  return name ? this._filtercontas(name as string,this.optionsEtapaSemestre) :
                  this.optionsEtapaSemestre.slice();
                }),
              );

             // this.myControlccu.setValue( {descricao:this.listaccusto[0].descricao,chave:this.listaccusto[0].chave,ordem:this.listaccusto[0].ordem});

            } else {
              this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
            }
          },
          error: (e) => {
            this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
          }
        });
      }



      myControlEntidade = new FormControl<string | selects>('');
      optionsEntidade: selects[] = [];
      filteredOptionsEntidade!: Observable<selects[]>;
      async  getEntidade() {
        //select Contasstamp,Entidadebanc from Contas where Entidadebanc <>''
        const se:condicoesprocura={
          tabela:"Contas",
        campo1: "Entidadebanc",
        campo2:"banco",
         condicao:"Entidadebanc <>''"
        }
        this._loginservice.getselectionPost(se).subscribe({
          next: (data) => {
        
            if (data.sucesso) {
              this.optionsEntidade = data.dados.selects;
              //this.myControlccu.setValue(this.sala);
              this.filteredOptionsEntidade = this.myControlEntidade.valueChanges.pipe(
                startWith(''),
                map(value => {
                  const name = typeof value === 'string' ? value : value?.descricao;
                  return name ? this._filter(name as string,this.optionsEntidade) :
                  this.optionsEntidade.slice();
                }),
              );
  if(data.dados.selects.length>1){
    this.myControlEntidade.setValue(data.dados.selects[1].descricao);
    this.OnSelectplanopag(data.dados.selects[1]);
  }

            } else {
              this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
            }
          },
          error: (e) => {
            this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
          }
        });
      }


      myControlPlanopgt = new FormControl<string | selects>('');
      optionsPlanopgt: selects[] = [];

      optionsPlanopgtGeral: selects[] = [];
      filteredOptionsPlanopgt!: Observable<selects[]>;
      async  getPlanopgt() {
        //select Contasstamp,Entidadebanc from Contas where Entidadebanc <>''
        const se:condicoesprocura={
          tabela:"Planopag",
        campo1: "Descricao",
        campo2:"descanosem",
         condicao:"vazio"
        }
        this._loginservice.getselectionPost(se).subscribe({
          next: (data) => {
            if (data.sucesso) {
              this.optionsPlanopgt = data.dados.selects;
              this.optionsPlanopgtGeral= data.dados.selects;
              this.filteredOptionsPlanopgt = this.myControlPlanopgt.valueChanges.pipe(
                startWith(''),
                map(value => {
                  const name = typeof value === 'string' ? value : value?.descricao;
                  return name ? this._filter(name as string,this.optionsPlanopgt) :
                  this.optionsPlanopgt.slice();
                }),
              );
  if(data.dados.selects.length>1){
    this.myControlEntidade.setValue(data.dados.selects[1].descricao);
    this.OnSelectplanopag(data.dados.selects[1]);
  }

            } else {
              this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
            }
          },
          error: (e) => {
            this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
          }
        });
      }


  GetDividadoAluno(clstamp:string){
    this.isSpinnerDisplayed =true;
    let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
        let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
      this._estudanteService.GetPlanopamentoestudante(clstamp).pipe(
      finalize(() => this.isSpinnerDisplayed = false),
    ).subscribe({
        next: (data) => {
          if (data.sucesso) {
            this.totalRecords = data.dados.dmzview.length;
            this.pagenumber = currentPage;
            this.pagesize = pageSize;
            this.pagetotalrecord=data.dados.dmzview.length;
           this.dataListaplanopagamento.data = data.dados.dmzview;

          }
        },
        error: (e) => {
         // this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
        }
      });

  }



  totalCc:number=0;
  OnSelectplanopag(value:selects){
    this.cadastro.patchValue({codfac:value.chave});
  }
  OnSelectDescplano(value:selects){
    this.cadastro.patchValue({planopagstamp:value.chave});
  }

  OnSelecttipodo(value:selects){
    this.editando=false;
    this.cadastro.patchValue(
      {obs:value.chave});
      let se:selects={
        chave: value.chave,
        descricao: value.descricao,
        ordem: value.descricao.toString()
      }
 

  }


      onSelectAluno(value:selects) {
      var campos=`Codcurso,Curso,Descgrelha,Gradestamp,Nivelac,Coddep,Departamento,
      Faculdade,Ccusto,Ccustostamp,Tipo,clstamp,no,nome,Email,nuit,morada,localidade,Moeda`;
      this.GetDividadoAluno(value.chave);
      let set:selects={
        chave: `clstamp='${value.chave}'`,
        descricao: campos,
        ordem: 'cl'
      }
        this._estudanteService.GetQualquerdado(set).subscribe({
          next: (data) => {
            if (data.sucesso) {
              if(data.dados.dmzview.length>1){
                let aluno = data.dados.dmzview[1];
                this.cadastro.patchValue({
                  desccurso:aluno.col2,
                  cursostamp :aluno.col1,
                  clstamp :aluno.col12,
                  no :aluno.col13,
                  nome :aluno.col14,
                  emails :aluno.col15,
                  gradestamp :aluno.col4,
                  descGrade :aluno.col3,
                  nivelac :aluno.col5,
                  ccusto :aluno.col9,
                  ccustamp :aluno.col10,
                nuit: aluno.col16,
                morada: aluno.col17,
                localidade: aluno.col18,
                moeda: aluno.col19,
                estabnome: aluno.col8,
                cambiousd: 1,
                });

              }

              this.isSpinnerDisplayed=false;
            }
          },
          error: (e) => {
            //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
          }
        });


      }


      async Getturno(){
        const se:condicoesprocura={
          tabela:"Fpagam",
        campo1: "descricao",
        campo2:"Codigo",
         condicao:"vazio"
        }
        this._loginservice.getselectionPost(se).subscribe({
          next: (data) => {
            if (data.sucesso) {
              this.optionsturno = data.dados.selects;
              this.filteredOptionsturno = this.myControlturno.valueChanges.pipe(
                startWith(''),
                map(value => {
                  const name = typeof value === 'string' ? value : value?.descricao;
                  return name ? this._filter(name as string,this.optionsturno) : this.optionsturno.slice();
                }),
              );
            } else {
              this._loginservice.mostrarAlerta("Nao foi possivel carregar as formas de pagamentos", "Opps");
            }
          },
          error: (e) => {
            this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
          }
        });

      }

      myControltipoaluno = new FormControl<string | selects>('');
      optionstipoaluno: selects[] = [];
      filteredOptionstipoaluno!: Observable<selects[]>;

      @ViewChild('listatipoaluno') listatipoaluno!: MatSelect;
      tipoaluno:string='';
      tipoalunostamp:string='';
      Settipoaluno(item:selects){
        this.tipoaluno=item.descricao;
      this.tipoalunostamp=item.chave;
          }


      myControltipobolsa = new FormControl<string | selects>('');
      optionstipobolsa: selects[] = [];
      filteredOptionstipobolsa!: Observable<selects[]>;

      @ViewChild('listatipobolsa') listatipobolsa!: MatSelect;
      tipobolsa:string='';
      tipobolsastamp:string='';


      myControlinstituicaoensino = new FormControl<string | selects>('');
      optionsinstituicaoensino: selects[] = [];
      filteredOptionsinstituicaoensino!: Observable<selects[]>;

      @ViewChild('listainstituicaoensino') listainstituicaoensino!: MatSelect;
      instituicaoensino:string='';
      instituicaoensinostamp:string='';
      array!:Blob

      listaformasp:formasp[]=[]


  
  Cadastrar( )
  {
if(this.cadastro.value.planopagp.length<=0){
  Swal.fire('Alert!', `Caro utilizador as propriedades do plano são obrigatorias`, 'info');
  return
}
if(this.cadastro.value.descdistrato=='' || this.cadastro.value.descdistrato==undefined ){
  Swal.fire('Alert!', `Caro utilizador preencha o campo nivel académico`, 'info');
  return
}

if(this.cadastro.value.anosem=='' || this.cadastro.value.anosem==undefined ){
  Swal.fire('Alert!', `Caro utilizador preencha o campo  Ano/Semestre`, 'info');
  return
}

if(this.cadastro.value.desccurso=='' || this.cadastro.value.desccurso==undefined ){
  Swal.fire('Alert!', `Caro utilizador preencha o campo  Curso`, 'info');
  return
}


    this.isSpinnerDisplayed=true;
    let ssstamp =this.turmanotaservice.Stamp();

  const Planopagam:Planopag={
    
    planopagstamp:ssstamp,
    codigo: this.cadastro.value.codigo,
    descricao: this.cadastro.value.descricao,
    parcelas:this.cadastro.value.parcelas,
    anosem: this.cadastro.value.anosem,
    anolectivo:this.cadastro.value.anolectivo,
    valor:this.cadastro.value.valor,
    valorextra:this.cadastro.value.valorextra,
    desconto: this.cadastro.value.desconto,
    valorparzero: this.cadastro.value.valorparzero,
    datapartida:this.cadastro.value.datapartida,
    datafim: this.cadastro.value.datafim,
    diauteis: this.cadastro.value.diauteis,
    pularsabados: this.cadastro.value.pularsabados,
    pulardomingos: this.cadastro.value.pulardomingos,
    pularferiados: this.cadastro.value.pularferiados,
    tipo: this.cadastro.value.tipo,
    distrato: this.cadastro.value.distrato,
    valordistrato: this.cadastro.value.valordistrato,
    diasvenc: this.cadastro.value.diasvenc,
    tipoValdistrato: this.cadastro.value.tipoValdistrato,
    descdistrato: this.cadastro.value.descdistrato,
    cursostamp: this.cadastro.value.cursostamp,
    desccurso: this.cadastro.value.desccurso,
    descanosem: this.cadastro.value.descanosem,
    anoSemstamp: this.cadastro.value.anoSemstamp,
    planopagp: this.cadastro.value.planopagp.map((p: { planopagpstamp: any; planopagstamp: any; ordem: string; descricao: any; data: string | number | Date; parecela: string; valorbruto: string; valordesc: string; valorextra: string; valordescextra: string; valorTotal: string; titulo: any; pzerro: any; }) => ({
      planopagpstamp: p.planopagpstamp,
      planopagstamp: p.planopagstamp,
      ordem: parseFloat(p.ordem),
      descricao: p.descricao,
      data: this.matriculaservice.ConvertDate(new Date(p.data)),
      parecela: parseFloat(p.parecela),
      valorbruto: parseFloat(p.valorbruto),
      valordesc: parseFloat(p.valordesc),
      valorextra: parseFloat(p.valorextra),
      valordescextra: parseFloat(p.valordescextra),
      valorTotal: parseFloat(p.valorTotal),
      titulo: p.titulo,
      pzerro: p.pzerro
    })),
    planopagt: [],
  };
  const dadosssss=Planopagam;


  this.planopagamentoService.PlanoPag(dadosssss).pipe(
    finalize(() => this.isSpinnerDisplayed = false),
  ).subscribe({
    next: (data) => {
      if (data.sucesso) {
      Swal.fire('Sucesso!', `Operação executada com sucesso`, 'success');
      }
      else{
        alert(`erro`)
      }
    },
    error: (set:any) => {
       
      Swal.fire('Erro!', "Erro de conexao "+set, 'error');
      this.veradadeiro=false;
    }
  });


  }

  total:number=0;
  totalstr:string='Total:  ';







  visibilidadeagregado:boolean=false;
  clstampvliw: string='';


  @ViewChild('recprpais') recprpais!: MatSelect;
  //-----------------------------------------------------------------------------------------------------------------------
  visibilidadeRclAdiant:boolean=false;
  visibilidadebolsa:boolean=false;
  visibilidadelingua:boolean=false;
  //------------------------------------------Adiciona e remove linhas do docs---------------------------------------------








  get matriculaTurmaAlunol(): FormArray {

    return this.cadastro.get('planopagp') as FormArray;
   }



  listaturmadis:turmadisc[]=[]
  listamatriculaTurmaAlunol:formasp[]=[]






  displayedColumns: string[] =[];
  dataSource: Alauxiliar[]=[];
  currentDate = new Date();


  displayedColumnsturma: string[] =[];
  dataSourceturma: Alauxiliar[]=[];

  displayedColumnsfinanceiro: string[] =[];
  dataSourcefinanceiro: contacorrentelista[]=[];
  veradadeiro:boolean=false;

  Dadostemp(){

  }

    eliminarestudante(stamp: string,descricao:string,index:number,tabela:string,nomecampochave:string) {
      this.veradadeiro=false;

    Swal.fire({
      title: `Deseja eliminar ${tabela}?`,
      text: descricao,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sim, Eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Não, Voltar'
    }).then((resultado => {
      if (resultado.isConfirmed) {
        this._estudanteService.eliminargradelsddgd(stamp,tabela,nomecampochave).subscribe({
          next: (data) => {
            if (data.sucesso) {
             // this._loginservice.mostrarAlerta(`${tabela} eliminada com sucesso`, "Ok");

      Swal.fire('Sucesso!', `${tabela} eliminada(o) com sucesso`, 'success');
              this.veradadeiro=true;

            } else {

      Swal.fire('Sucesso!', `Nao foi possível eliminar a(o) ${tabela} `, 'error');
              this.veradadeiro=false;
            }
  // switch(tabela.toLowerCase()){
  // case 'disciplinatumra':
  //  if(this.veradadeiro==true){
  //   this.listamatriculadisciplinaTumra = this.listamatriculadisciplinaTumra.filter(item => item.disciplinaTumrastamp.toLowerCase() != stamp.toLowerCase());
  //      var letss=this.listamatriculadisciplinaTumra;
  //  if(letss!=null && letss!=undefined &&  letss.length>0){
  //  this.visibilidadeturmadisc=true;
  //  //this.disciplinaTumra.clear();
  //  this.carregardisciplinaturma(this.listamatriculadisciplinaTumra);
  //  }  else{
  //   //this.turmadisc.clear();
  //  this.visibilidadeturmadisc=false;
  //  }
  //  }
  //   break;
  //   case 'matriculaturmaalunol':
  //  if(this.veradadeiro==true){
  //   this.removergri(index);
  //  }
  //     break;

  //     case 'formasp':
  //       if(this.veradadeiro==true){
  //        this.removergri(index);
  //       }
  //          break;
  // }

          },
          error: () => {
            this._loginservice.mostrarAlerta("Erro de conexao", "Opps");
            this.veradadeiro=false;
          }
        });

      }

    }));

  }



  removerFormasp(index: number) {

    const formArray = this.cadastro.get('planopagp') as FormArray;

    const grela = formArray.controls[index].value;
  

    const ret = this.eliminarestudante(grela.formaspstamp, grela.titulo, index, 'planopagp', 'planopagpstamp');


      formArray.removeAt(index);
  
  }



  removerturmal(index: number) {
  var aaa=index
     let tabela=this.dataListaturma.data[index].descricao;

   Swal.fire({
    title: `Deseja eliminar ${tabela}?`,
    text: tabela,
    icon: "warning",
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Sim, Eliminar',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    cancelButtonText: 'Não, Voltar'
  }).then((resultado => {
    if (resultado.isConfirmed) {
      this.listaccfill=this.listaccfill.filter(item => item.rcllstamp.toLowerCase() != this.listaccfill[index].rcllstamp.toLowerCase());

      this.dataListaturma.data= this.listaccfill;
           Swal.fire('Sucesso!', `Dado eliminado com sucesso`, 'success');

    }

  }));




  }
  MatTabGroupsss!:MatTabGroup;





  myControlfala = new FormControl<string | selects>('');
  optionsfala: selects[] = [];
  filteredOptionsfala!: Observable<selects[]>;
  @ViewChild('listafala') listafala!: MatSelect;
  fala:string='';
  falastamp:string='';
  Setfala(item:selects,i:number){
    this.fala=item.descricao;
  this.falastamp=item.chave;

  (<FormArray>this.cadastro.get('mancfam')).controls[i].value.fala= item.descricao;
      }


      myControlleitura = new FormControl<string | selects>('');
      optionsleitura : selects[] = [];
      filteredOptionsleitura !: Observable<selects[]>;
      @ViewChild('listaleitura ') listaleitura !: MatSelect;
      leitura :string='';
      leiturastamp:string='';
      Setleitura (item:selects,i:number){
        this.leitura =item.descricao;
      this.leiturastamp=item.chave;
      (<FormArray>this.cadastro.get('mancfam')).controls[i].value.leitura= item.descricao;
          }

          myControlescrita = new FormControl<string | selects>('');
          optionsescrita : selects[] = [];
          filteredOptionsescrita !: Observable<selects[]>;
          @ViewChild('listaescrita ') listaescrita !: MatSelect;
          escrita :string='';
          escritastamp:string='';
          Setescrita (item:selects,i:number){
            this.escrita =item.descricao;
          this.escritastamp=item.chave;
          (<FormArray>this.cadastro.get('mancfam')).controls[i].value.escrita= item.descricao;
              }

              myControlcompressao = new FormControl<string | selects>('');

              optionscompressao : selects[] = [];
              filteredOptionscompressao !: Observable<selects[]>;
              @ViewChild('listacompressao ') listacompressao !: MatSelect;
              compressao :string='';
              compressaostamp:string='';
              Setcompressao (item:selects,i:number){
                this.compressao =item.descricao;
              this.compressaostamp=item.chave;
              (<FormArray>this.cadastro.get('mancfam')).controls[i].value.compreecao= item.descricao;
                  }

  async Getfala(){

    const se:condicoesprocura={
      tabela:"PeAuxiliar",
    campo1: "descricao",
    campo2:"codigo",
     condicao:"tabela=12"
    }

    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionscompressao =        this.optionsescrita = this.optionsleitura=
           this.optionsfala = data.dados.selects;
          this.filteredOptionsfala = this.myControlfala.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsfala) : this.optionsfala.slice();
            }),
          );
          this.filteredOptionsleitura = this.myControlleitura.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsleitura) : this.optionsleitura.slice();
            }),
          );

          this.filteredOptionsescrita = this.myControlescrita.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsescrita) : this.optionsescrita.slice();
            }),
          );

          this.filteredOptionscompressao = this.myControlcompressao.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionscompressao) : this.optionscompressao.slice();
            }),
          );
        } else {
          this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
        }
      },
      error: (e) => {
        this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });

  }


  myControllingua = new FormControl<string | selects>('');
  optionslingua: selects[] = [];
  filteredOptionslingua!: Observable<selects[]>;
  @ViewChild('listalingua') listalingua!: MatSelect;
  lingua:string='';
  linguastamp:string='';
  Setlingua(item:selects,i:number){
    this.lingua=item.descricao;
  this.linguastamp=item.chave;


  (<FormArray>this.cadastro.get('mancfam')).controls[i].value.lingua= item.descricao;



      }
  async Getlingua(){

    const se:condicoesprocura={
      tabela:"PeAuxiliar",
    campo1: "descricao",
    campo2:"codigo",
     condicao:"tabela=2"
    }

    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionslingua = data.dados.selects;
          this.filteredOptionslingua = this.myControllingua.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionslingua) : this.optionslingua.slice();
            }),
          );
        } else {
          this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
        }
      },
      error: (e) => {
        this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      }
    });
  }







// onKeyPress($event: Event,number: number) {

// let numer=Number(($event.target as HTMLInputElement).value);
// let langArr = this.getrcll
// langArr.controls[number].patchValue(
//   {
//     valordoc:numer,
//     valorpreg:numer,
//     valorreg:numer,
//   }
// );


//     if(this.getrcll.length>0){
//       if(this.itemsFp.length==1){
     
        
//         let eeee=this.getrcll.value.reduce((prev: number, next: { valorreg: number | number; }) => prev + +next.valorreg, 0);;
        


//         let fp = this.itemsFp
//         fp.controls[0].patchValue(
//   {
//     valor:eeee,
//   }
// );
      
      
//       }
      
      
//       }
//   }

novo(){
  location.reload()
}

}

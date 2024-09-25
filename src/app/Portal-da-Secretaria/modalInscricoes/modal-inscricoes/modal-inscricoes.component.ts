import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCake } from '@fortawesome/free-solid-svg-icons';
import { finalize, Observable, startWith, map } from 'rxjs';
import { FrmProcuraGeralComponent } from 'src/app/frm-procura-geral/frm-procura-geral.component';
import { dmzview } from 'src/app/Interfaces/Grade/dmzview';
import { procura } from 'src/app/Interfaces/Procura/Procura';
import { VerTrabalhoComponent } from 'src/app/Portal-do-Estudante/trabalho/ver-trabalho/ver-trabalho.component';
import { turmanota, turmadisc } from 'src/app/Turmas/todastabelasturma';
import { environment } from 'src/environments/environment.development';
import { Alauxiliar } from 'src/Models/Alauxiliar';
import { selects, condicoesprocura, selectsprocura, contacorrentelista } from 'src/Models/CampoSessoes';
import { Clview } from 'src/Models/Cldocs';
import { Pe } from 'src/Models/Pe';
import { Resposta } from 'src/Models/Resposta';
import { Trabalho } from 'src/Models/trabalho';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import Swal from 'sweetalert2';
import { Matriculaservice } from '../../MatriculaAluno/matriculaservice';
import { PeriodicElementbcbcbc, ModalMatriculaComponent } from '../../MatriculaAluno/modal-matricula/modal-matricula.component';
import { ModalprocdisciComponent } from '../../MatriculaAluno/modal-matricula/modalprocdisci/modalprocdisci.component';
import { planopag, matriculaAluno, disciplinaTumra, matriculaTurmaAlunol, tdocMat } from '../../MatriculaAluno/todasClassesmatricula';
import { Modalproc2Component } from '../../modalproc2/modalproc2.component';

@Component({
  selector: 'app-modal-inscricoes',
  templateUrl: './modal-inscricoes.component.html',
  styleUrls: ['./modal-inscricoes.component.scss']
})
export class ModalInscricoesComponent implements OnInit, AfterViewInit {

  
  ngAfterViewInit() {
    //this.dataListaturma.paginator = this.paginatorTeste.toArray()[0];
    //this.dataListadisciplinas.paginator=this.paginatorTeste.toArray()[1];
    this.dataListaplanopagamento.paginator=this.paginatorTeste.toArray()[0];
  }
  getTotalCost(){
    return 25;
  }
  @ViewChild(MatPaginator, { static: true})  paginacaoTabela!: MatPaginator;

  @ViewChild(MatPaginator)  paginacaoTurmas!: MatPaginator;
listaplanopagamento:planopag[]=[]
  

allComplete: boolean = false;
habilitarcheckebo: boolean = false;
EstadoDisciplina: string='';

  updateAllComplete() {
    this.allComplete = this.turmacopy != null && this.turmacopy.every(t => t.padrao);
  }

  someComplete(): boolean {
    // if (this.turmacopy == null) {
    //   return false;
    // }
    // return this.turmacopy.filter(t => t.padrao).length > 0 && !this.allComplete;
    return true;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.dataListaturma.data == null) {
      return;
    }
    // for (let i = 0; i < this.dataListaturma.data.length; i++) {
    //   this.dataListaturma.data[i].dataemis = ;
    //   this.dataListaturma.data[i].datavalid = moment(this.dataListaturma.data[i].datavalid).format('YYYY-MM-DD');
    // }
    this.dataListaturma.data.forEach(t => (t.col9 = 'true'));
  }

    initialLoadplanopagamento(nivelacadem:string) {
      if(nivelacadem.length==0){
        return;
      }
      let ret=false;
      this._estudanteService.GetHorariofromplanopagamento(nivelacadem, 1, 50).pipe(
        finalize(() => ret = false),
      ).subscribe(result => {      
        if (result.status==true) {  
         this.listaplanopagamento=result.data;
        }
      });
  }
  
    totalRecords: number = 0;
    
    pagenumber: number = 0;
    pagesize: number = 0;
    
    pagetotalrecord: number = 0;
    isSpinnerDisplayed = false;
    listplanopagamento: dmzview[] = [];
    dataListaplanopagamento = new MatTableDataSource(this.listplanopagamento);
  
    
    isSpinnerDisplayedprofess = true;
    listestudanteprofess: Pe[] = [];
    dataListaestudanteprofess = new MatTableDataSource(this.listestudanteprofess);
    listestudanteprofessturma: dmzview[] = [];
    dataListaestudanteprofessturma = new MatTableDataSource(this.listestudanteprofessturma); 
    pageIndex: number = 0;
    pageIndexprofessor: number = 0;
  closeDialog() {  
    this.modalActual.close("true");
  }
  
  
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
    anularmatricula:boolean=false;
  
  
    descricaopais!: string;  
    paisstamp!: string;
    descricaoProvincia!: string;  
    Provinciastamp!: string;
  
    descricaodistrito!: string;  
    distritostamp!: string;
  
  
  
    
  
    
  
  
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

          if(this.optionsstatuss.length>1){
            this.myControlstatuss.setValue(this.optionsstatuss[1].descricao)
          }
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
  

  
  

  turma: dmzview[]=[]  
  turmaa: dmzview[]=[]  
  dataListaturma = new MatTableDataSource(this.turma);
colunas=['turma','descanoaem','etapa','marcar']
totalrecordturma:number=0;



disciplinasa: dmzview[]=[]  
disciplinas: dmzview[]=[]  
dataListadisciplinas = new MatTableDataSource(this.disciplinas);
colunasdisciplinas=['ref','disciplina','ok']
totalrecorddisciplinas:number=0;


 @ViewChildren(MatPaginator) paginatorTeste = new QueryList<MatPaginator>();

 onKeyPress($event: MatCheckboxChange,_t25: dmzview,index:number){      
  const padrao= Boolean($event.checked);
  this.selectiondmz.toggle(_t25)
  _t25.col9=String(padrao);  
  this.dataListaturma.data[index].col9=String(padrao);
 }
 onKeyPressxffdf($event: MatCheckboxChange,index:number){      
  const padrao= Boolean($event.checked);
  this.matriculaTurmaAlunol.clear();
let stamp=this.listamatriculaTurmaAlunol[index].turmastamp;

this.cadastro.patchValue({     
  codcurso :'',
  anoSem :'',
  codtur :'',
  anolect :'',
  etapa :'',
 turmastamp :'',
 turnostamp :'',
  descanoaem :'', 
  codigo: ''          
});
  for (let i = 0; i < this.listamatriculaTurmaAlunol.length; i++) {    
    if(this.listamatriculaTurmaAlunol[i].turmastamp.toLowerCase()==stamp.toLowerCase())    {
      this.listamatriculaTurmaAlunol[i].padrao=padrao;


    }else{      
      this.listamatriculaTurmaAlunol[i].padrao=false;
    }    
    }  

    if((padrao==true)){

      let i=index;
      this.cadastro.patchValue({     
        codcurso :this.listamatriculaTurmaAlunol[i].descanoaem,
        anoSem :this.listamatriculaTurmaAlunol[i].descanoaem,
        codtur :this.listamatriculaTurmaAlunol[i].codigo,
        anolect :this.listamatriculaTurmaAlunol[i].etapa,
        etapa :this.listamatriculaTurmaAlunol[i].etapa,
       turmastamp :this.listamatriculaTurmaAlunol[i].turmastamp,
       turnostamp :this.listamatriculaTurmaAlunol[i].turno,
        descanoaem :this.listamatriculaTurmaAlunol[i].descanoaem, 
        codigo:   this.listamatriculaTurmaAlunol[i].codigo,      
      });
    
    }
    this.carregarmatriculaTurmaAlunol(this.listamatriculaTurmaAlunol);  
 }




 onKeyPressdisciplina($event: MatCheckboxChange,_t25: dmzview,index:number){      
  const padrao= Boolean($event.checked);
  this.selectiondmzdisciplinas.toggle(_t25)
  _t25.col3=String(padrao);  
  this.dataListadisciplinas.data[index].col3=String(padrao);
 }
//  onKeyPressxffdf($event: MatCheckboxChange,index:number){      
//   const padrao= Boolean($event.checked);
//   this.matriculaTurmaAlunol.clear();
// let stamp=this.listamatriculaTurmaAlunol[index].turmastamp;

// this.cadastro.patchValue({     
//   codcurso :'',
//   anoSem :'',
//   codtur :'',
//   anolect :'',
//   etapa :'',
//  turmastamp :'',
//  turnostamp :'',
//   descanoaem :'', 
//   codigo: ''          
// });
//   for (let i = 0; i < this.listamatriculaTurmaAlunol.length; i++) {    
//     if(this.listamatriculaTurmaAlunol[i].turmastamp.toLowerCase()==stamp.toLowerCase())    {
//       this.listamatriculaTurmaAlunol[i].padrao=padrao;


//     }else{      
//       this.listamatriculaTurmaAlunol[i].padrao=false;
//     }    
//     }  

//     if((padrao==true)){

//       let i=index;
//       this.cadastro.patchValue({     
//         codcurso :this.listamatriculaTurmaAlunol[i].descanoaem,
//         anoSem :this.listamatriculaTurmaAlunol[i].descanoaem,
//         codtur :this.listamatriculaTurmaAlunol[i].codigo,
//         anolect :this.listamatriculaTurmaAlunol[i].etapa,
//         etapa :this.listamatriculaTurmaAlunol[i].etapa,
//        turmastamp :this.listamatriculaTurmaAlunol[i].turmastamp,
//        turnostamp :this.listamatriculaTurmaAlunol[i].turno,
//         descanoaem :this.listamatriculaTurmaAlunol[i].descanoaem, 
//         codigo:   this.listamatriculaTurmaAlunol[i].codigo,      
//       });
    
//     }
//     this.carregarmatriculaTurmaAlunol(this.listamatriculaTurmaAlunol);  
//  }


 turmassss: PeriodicElementbcbcbc[]=[]  


 async ModdalDisciplinas(estudante: selectsprocura,num:number) {

  this.dialog.open(ModalprocdisciComponent, {
    // height: '60%',
    width: '55%',
    disableClose: true,
    data: estudante,
    autoFocus: false,
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  }).afterClosed().subscribe(resultado => {
    if (resultado) {   
      
      this.disciplinaTumra.clear();

      this.turmarttt=resultado;
      if(this.turmarttt.length>0){
let item=this.turmarttt;
       for(let i = 0; i < item.length; i++){
        this.listamatriculadisciplinaTumra.push({
          matriculaAlunostamp:item[i].matriculaAlunostamp, 
          codigo:item[i].codigo,
          disciplinaTumrastamp:item[i].disciplinaTumrastamp,
         disciplina:item[i].disciplina,
         referenc:item[i].referenc,
         turmastamp:item[i].turmastamp,
         ststamp:item[i].ststamp,
         clstamp:item[i].clstamp,
         sitcao:item[i].sitcao,
        activo:true,//True=matrícula cancelada e false = matrícula activa       
         motivo:item[i].motivo,
        })
       }
        

        this.carregardisciplinaturma(this.listamatriculadisciplinaTumra);        
     this.MatTabGroupsss.selectedIndex=num;
      }
    }
  });
}

turmarttt: disciplinaTumra[]=[]
turmacopy: matriculaTurmaAlunol[]=[]
async editarestudante(estudante: selectsprocura) {  
  this.dialog.open(Modalproc2Component, {
    // height: '60%',
    width: '55%',
    disableClose: true,
    data: estudante,
    autoFocus: false,
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  }).afterClosed().subscribe(resultado => {
    if (resultado) {      
      this.listamatriculaTurmaAlunol=resultado;
      if(this.listamatriculaTurmaAlunol.length>0){
        this.habilitarcheckebo=true;
        this.carregarmatriculaTurmaAlunol(this.listamatriculaTurmaAlunol);
      }
    }
  });
}
colunasturmacopy=['numero','nome','email','marcar']
  async Getturmas(){ 
    if(this.cadastro.value.gradestamp.length==0){
      Swal.fire('Não permitido!', 'O Plano curricular do aluno está vazio!', 'error');      
      return;
    }  if(this.cadastro.value.cursostamp.length==0){
      Swal.fire('Não permitido!', 'O curso do aluno está vazio!', 'error')     
      return;
    }
    let turmas='';
    const todostrue = this.listamatriculaTurmaAlunol;
    if(todostrue.length>0){
      for (let i = 0; i < todostrue.length; i++) {
        let stamp =this.turmanotaservice.Stamp()+i;  
        if(this.turmastamp.length==0)
        {
          this.turmastamp=`'${todostrue[i].turmastamp}'`
        }else{
          
        this.turmastamp+=`,'${todostrue[i].turmastamp}'`
        }
        }
  
    }
    if( this.turmastamp.length>0){
      turmas=`and Turmastamp not in(${this.turmastamp})`
    }
let conddicao=`  Gradestamp='${this.cadastro.value.gradestamp}'  and Cursostamp='${this.cadastro.value.cursostamp}'  
and Turmastamp not in  (select Turmastamp from Turmanota where Fecho=1) ${turmas}`
    this.habilitarcheckebo=false;
    this.turma=[];
    this.totalrecordturma=0;
    var campos=`Turmastamp,codigo,AnoSemstamp,Descanoaem,
    Etapa,Sala,Turno,Formaaval,
    CONVERT(bit,0) marcar,descricao,Vagasmax,Vagasmin,Responsavel,Responsavel2 ,
    semanaslec,horasaulas,formaaval,situacao,obs, datain,
    datafim,
    horain,
    horafim`; 
    let set:selectsprocura={
      chave: conddicao,
      descricao: campos,
      ordem: 'turma',
      stamplocal: this.clstampvliw,
      stampsexcepcao:turmas
    }
     
this.editarestudante(set);
      // this._estudanteService.GetQualquerdado(set).subscribe({
      //   next: (data) => {
      //     if (data.sucesso) {    
      //       data.dados.dmzview = data.dados.dmzview.filter(item => item.col1.toLowerCase() != '');
  
      //       this.totalrecordturma =data.dados.dmzview.length;  
            
      //       this.dataListaturma.data = data.dados.dmzview;   
      //       this.turmaa=data.dados.dmzview;
      //       if( this.totalrecordturma>0){
      //         this.habilitarcheckebo=true;
              
      //       }else{
      //         Swal.fire('Opps!', 'O Sistema não conseguiu achar dados nas condições indicadas!', 'error'); 
     
      //       }
            

      //     } 
      //   },
      //   error: (e) => {
      //     //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
      //   }
      // });


   


  
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
  Setgrauparen(item:selects,i:number){
    this.listaturmadis[i].disciplina=item.descricao;
    this.listaturmadis[i].referenc=item.ordem;
    this.listaturmadis[i].ststamp=item.chave;
  (<FormArray>this.cadastro.get('turmadisc')).clear();
    this.carregarturmadisc(this.listaturmadis)
      }
      
  
      SetAluno(item:selects,i:number){
   // this.listaturmal[i].no=item.ordem;
   // this.listaturmal[i].nome=item.descricao;
    //this.listaturmal[i].clstamp=item.chave;
  this.matriculaTurmaAlunol.clear();
    this.carregarmatriculaTurmaAlunol(this.listamatriculaTurmaAlunol)
  
          }
  
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
  

  
  
  private _filterref(name: string,list:selects[]): selects[] {
    const filterValue = name.toLowerCase();  
    return list.filter(option => option.ordem.toLowerCase().includes(filterValue));
  }
  
  isibilidadeturmanota=false;
  carregarturmanota(afam: turmanota[]) {
    this.isibilidadeturmanota=true;
    const formArray = this.cadastro.get('turmanota') as FormArray;
    afam.map(item => {
      formArray.push(this.aturmanota(item));
    });
  }
  aturmanota(item: turmanota): any {
    return this.fb.group({  
    
      turmanotastamp: [item.turmanotastamp],
         turmastamp :[item.turmastamp],
         no : [item.no],
         alunostamp : [item.alunostamp],
         alunoNome : [item.alunoNome],
         n1:[item.n1],
         n2:[item.n2],
         n3:[item.n3],
         n4:[item.n4],
         n5:[item.n5],
         media:[item.media],
         data:[item.data],
         aprovado:[item.aprovado],
         coddis:[item.coddis],
         disciplina:[item.disciplina],
         anosem : [item.anosem],
         sem : [item.sem],
         cursostamp : [item.cursostamp],
         e1:[item.e1],
         e2:[item.e2], //Exame Recurso     
         es:[item.es], //Exame especial 
         mediafinal:[item.mediafinal],
          pestamp : [item.pestamp],
          Profnome : [item.profnome],
          pestamp2 : [item.pestamp2],
          profnome2 : [item.profnome2],
          fecho: [item.fecho],//Fechar o diario pelo professor (Basta fechar nao tera mais possibilidade de alterar)
         //Dados adicionados e alterados
          datafecho:[item.datafecho],
          resultado:[item.resultado],     //Para Obter todos admitidos/Excluidos
          resultadoFinal:[item.resultadoFinal],   //Para obter todas stuacoes
         //de resultados nos exames
          codSit: [item.codSit], //1=exluido,2=admitido,3=dispensado
         //,4=aprovado,5=reprovado
          codetapa: [item.codetapa]  , 
          activo: [item.activo], //True=matrícula cancelada e false = matrícula activa
          motivo : [item.motivo],//Motivo pelo qual lhe leva ao cancelamento da matrícula    
          obs : [item.obs], //Motivo pelo qual lhe leva ao cancelamento da matrícula    
   
      
        })
    }
  
  
  
  
  
  
  
  carregarturmadisc(afam: turmadisc[]) {
    this.visibilidadeturmadisc=true;  
    const formArray = this.cadastro.get('turmadisc') as FormArray;
    afam.map(item => {
      formArray.push(this.aturmadisc(item));
    });
  }
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
  carregarmatriculaTurmaAlunol(afam: matriculaTurmaAlunol[]) {


    this.visibilidadeturmal=true;
    this.isLoggedIn=false;
    const formArray = this.cadastro.get('matriculaTurmaAlunol') as FormArray;
    afam.map(item => {
      formArray.push(this.aturmal(item));
    });
  }
  ststampsss:string='';
  aturmal(item: matriculaTurmaAlunol): any {
    return this.fb.group({  
      matriculaTurmaAlunolstamp:[item.matriculaTurmaAlunolstamp],
    matriculaAlunostamp:[item.matriculaAlunostamp], 
    codigo:[item.codigo],
    descricao:[item.descricao],
   anoSemstamp:[item.anoSemstamp],
    descanoaem:[item.descanoaem],
    descurso:[item.descurso],
    cursostamp:[item.cursostamp],
    descgrade:[item.descgrade],
    gradestamp:[item.gradestamp],
    etapa:[item.etapa],
    sala:[item.sala],
    turno:[item.turno],
     vagasmin:[item.vagasmin],
     vagasmax:[item.vagasmax],
    responsavel:[item.responsavel],
    responsavel2:[item.responsavel2],
     semanaslec:[item.semanaslec],
     horasaulas:[item.horasaulas],
    formaaval:[item.formaaval],
    situacao:[item.situacao],
	obs:[item.obs],
      datain:[item.datain],
     datafim:[item.datafim],
     horain:[item.horain],
     horafim:[item.horafim],
    turmastamp:[item.turmastamp],
    turmadiscstamp:[item.turmadiscstamp],
    padrao:[item.padrao],

    }) 
    }
  

    carregardisciplinaturma(afam: disciplinaTumra[]) {
      this.visibilidadeturmadisc=true;
      const formArray = this.disciplinaTumra;
      afam.map(item => {
        formArray.push(this.adisciplinaturma(item));
      });
      
      this.ststampsss='';
      for (let i = 0; i < this.listamatriculadisciplinaTumra.length; i++) {
        if(this.ststampsss.length==0)
        {
          this.ststampsss=`'${this.listamatriculadisciplinaTumra[i].ststamp}'`
        }else{          
        this.ststampsss+=`,'${this.listamatriculadisciplinaTumra[i].ststamp}'`
        }
        }
    }
    adisciplinaturma(item: disciplinaTumra): any {

      return this.fb.group({  
      matriculaAlunostamp:[item.matriculaAlunostamp], 
      codigo:[item.codigo],
      disciplinaTumrastamp:[item.disciplinaTumrastamp],
     disciplina:[item.disciplina],
     referenc:[item.referenc],
     turmastamp:[item.turmastamp],
     ststamp:[item.ststamp],
     clstamp:[item.clstamp],
     sitcao:[item.sitcao],
    activo:[item.activo],//True=matrícula cancelada e false = matrícula activa       
     motivo:[item.motivo],
      }) 
      }
     

  //======================Teste======================
    cadastro!:FormGroup
    DadosGerais!: Clview
    fotos: any  
    foto: any
    
    confirmPageChange(pageEvent: PageEvent) {
      this.pageIndex=pageEvent.pageIndex;
      this.paginacaoTabela.pageSize=pageEvent.pageSize;    
      this.paginacaoTabela.pageIndex=pageEvent.pageIndex;
      this.initialLoadplanopagamento(this.cadastro.value.nivelac.toString());
    }
    frmestudantes!: FormGroup;
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
         private modalActual: MatDialogRef<ModalInscricoesComponent>,
         @Inject(MAT_DIALOG_DATA) public dadosestudantes: matriculaAluno,
         private _estudanteService: Matriculaservice,
         private dialog: MatDialog,library: FaIconLibrary,
         
      ){
        library.addIcons(faCake);
        this.dataListaturma.paginator = this.paginacaoTurmas; 
        if(this.dadosestudantes.descricao!=''){        
          this.titloAccao=`Nova Inscrição`;
          this.botaoAccao=`Salvar`;
        }else{
          this.titloAccao=`Actualizar Inscrição`;
          this.botaoAccao=`Salvar`;
        }
        this.cadastro = this.fb.group({
          matriculaAlunostamp:[''],
     planopagstamp :[''],
     numero :[0, [Validators.required]],
     numdoc :[0],
     codigo :['',Validators.required],
     refonecedor :[''],
     anolectivo :[0],
     descplano :[0], 
     datapartida :[new Date()],
     cursostamp :[''],
     data :[new Date()],//Data de Criacao 
     anoSemstamp :[''],
     clstamp :[''],
     descricao :[''],
     sitcao :['',Validators.required],
     no :[0],
     nome :['',Validators.required],
     curso :['',Validators.required],
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
     etapa :['',Validators.required],
     turmadiscstamp :[''],
     ststamp :[''],
     turmastamp :[''],
     turnostamp :[''],
     codfac :[''],
     alauxiliarstamp :[''],
     semstamp :[''],
     nivelac :['',[Validators.required]],
     formaingresso :[''],        
     ccusto :[''],
     ccustostamp :[''],
     coddep :[''],
     departamento :[''],
     faculdade :[''],
     descanoaem :['', [Validators.required]],
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
          
     inserindos :['gghhhhh',Validators.required],      
      })
      }
    
    
    
      private isKeyPressedNumeric(event: any, inputVal: any): boolean {

        var input = inputVal.value;
        input = input + event.key;
    
        if (input.length >= 2) {
          var txtVal = input;
          return /^((\d{1,18})|(\d{1,18})(\.{1}\d{1,15}))$/.test(txtVal);
        }
    
        const charCode = this.getCharCode(event);
        const charStr = event.key ? event.key : String.fromCharCode(charCode);
        return this.isCharNumeric(charStr);
      }
    
      private getCharCode(event: any): any {
        event = event || window.event;
        return (typeof event.which == "undefined") ? event.keyCode : event.which;
      }
    
      private isCharNumeric(charStr: any): boolean {
        var validation = false;
    
        if (charStr == ".") {
          validation = !!/\./.test(charStr);
        }
        else {
          validation = !!/\d/.test(charStr);
        }
        return validation;
      }
    
    
      onKeyPressNN(params: any) {
        var inputVal = <HTMLInputElement>document.getElementById("Input");
        if (params.key === 'Backspace' || params.key === '.') {
          return true;
        }
        else if (!this.isKeyPressedNumeric(params, inputVal)) {
          return false;
        } else {
          return true;
        }
      }
      
      isAllSelecteddmzdisciplinas() {
        const numSelected = this.selectiondmzdisciplinas.selected.length;
        const numRows = this.dataListadisciplinas.data.length;
        return numSelected === numRows;
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
      



      isAllSelecteddmz() {
        const numSelected = this.selectiondmz.selected.length;
        const numRows = this.dataListaturma.data.length;
        return numSelected === numRows;
      }
      selectiondmz = new SelectionModel<dmzview>(true, []);
    



      masterToggledmz() {
      
        this.isAllSelecteddmz() ?
            this.selectiondmz.clear() :
            this.dataListaturma.data.forEach(row => this.selectiondmz.select(row));            
            for (let i = 0; i < this.dataListaturma.data.length; i++) {
              this.dataListaturma.data[i].col9 = String(Boolean(this.dataListaturma.data[i].col9));
                }
                    }
    



      nos:string='';
     async ngOnInit() {
      

      this.habilitarcheckebo=false;
      await  this.Getstatuss();
     await this. Getturno();
     await this.GetFaculdade();
     await this.GetsupervisPedagogico();
     await this.GetAnoSem();  
     await this.GetCurso(); 
     await this.GetDisciplina(); 
     await this.Getcl(); 
     await this.GetTipoDocMat();
     await this.GetFormasingresso();
     await this.getEntidade();     
     await this.getPlanopgt();
     this.isSpinnerDisplayedprofess=false;
    this.displayedColumnsfinanceiro= ['codigo','descricao','accoes'];
       if (this.dadosestudantes != null && this.dadosestudantes.matriculaAlunostamp.length>0) {
        this.anularmatricula=true;
        this.editando=true;
        this.isSpinnerDisplayedprofess=true;
        this.cadastro.patchValue({ 
          matriculaAlunostamp:this.dadosestudantes.matriculaAlunostamp,
          planopagstamp :this.dadosestudantes.planopagstamp,
          numero :this.dadosestudantes.numero,
          numdoc :this.dadosestudantes.numdoc,
          codigo :this.dadosestudantes.codigo,
          refonecedor :this.dadosestudantes.refonecedor,
          anolectivo :this.dadosestudantes.anolectivo,
          descplano :this.dadosestudantes.descplano, 
          datapartida :this.dadosestudantes.datapartida,
          cursostamp :this.dadosestudantes.cursostamp,
          data :this.dadosestudantes.data,//Data de Criacao 
          anoSemstamp :this.dadosestudantes.anoSemstamp,
          clstamp :this.dadosestudantes.clstamp,
          descricao :this.dadosestudantes.descricao,
          sitcao :this.dadosestudantes.sitcao,
          no :this.dadosestudantes.no,
          nome :this.dadosestudantes.nome,
          curso :this.dadosestudantes.curso,
          codcurso :this.dadosestudantes.codcurso,
          datamat :this.dadosestudantes.datamat,
          turno :this.dadosestudantes.turno,
          periodo :this.dadosestudantes.periodo,
          anoSem :this.dadosestudantes.anoSem,
          codtur :this.dadosestudantes.codtur,
          anolect :this.dadosestudantes.anolect,
          localmat :this.dadosestudantes.localmat,
          emails :this.dadosestudantes.emails,        
          obs :this.dadosestudantes.obs,
          gradestamp :this.dadosestudantes.gradestamp,
          descGrade :this.dadosestudantes.descGrade,
          etapa :this.dadosestudantes.etapa,
          turmadiscstamp :this.dadosestudantes.turmadiscstamp,
          ststamp :this.dadosestudantes.ststamp,
          turmastamp :this.dadosestudantes.turmastamp,
          turnostamp :this.dadosestudantes.turnostamp,
          codfac :this.dadosestudantes.codfac,
          alauxiliarstamp :this.dadosestudantes.alauxiliarstamp,
          semstamp :this.dadosestudantes.semstamp,
          nivelac :this.dadosestudantes.nivelac,
          formaingresso :this.dadosestudantes.formaingresso,        
          ccusto :this.dadosestudantes.ccusto,
          ccustostamp :this.dadosestudantes.ccustostamp,
          coddep :this.dadosestudantes.coddep,
          departamento :this.dadosestudantes.departamento,
          faculdade :this.dadosestudantes.faculdade,
          descanoaem :this.dadosestudantes.descanoaem,
          tipo :this.dadosestudantes.tipo,
          activo :this.dadosestudantes.activo,//True=matrícula cancelada e false = matrícula activa        
          motivo :this.dadosestudantes.motivo,//Motivo pelo qual lhe leva ao cancelamento da matrícula
         matriculaTurmaAlunol: this.dadosestudantes.matriculaTurmaAlunol,
         disciplinaTumra:this.dadosestudantes.disciplinaTumra,
         matdisc:this.dadosestudantes.matdisc,
          inscricao :this.dadosestudantes.inscricao,
          matricula :this.dadosestudantes.matricula,
          nomedoc :this.dadosestudantes.nomedoc,
        });
  //       this.AnoSem=this.dadosestudantes.descanoaem;
  //       this.AnoSemstamp=this.dadosestudantes.anoSemstamp;
  //       this.sala=this.dadosestudantes.sala;
  //        this.Curso=this.dadosestudantes.descurso;
  //   this.Cursostamp=this.dadosestudantes.cursostamp;
  //  this.EtapaSemestre=this.dadosestudantes.etapa;
  //    this.turno=this.dadosestudantes.turno;
  //    this.supervisPedagogico=this.dadosestudantes.responsavel;  
  //   this.Faculdade=this.dadosestudantes.formaaval;
  //    this.statuss=this.dadosestudantes.situacao;
  //this.myControlPlanopgt.setValue(this.dadosestudantes.codfac);
 
  //myControlPlanopgt

     this.myControlstatuss.setValue(this.statuss);
     this.myControlCurso.setValue(this.Curso);
        this.planocurricular=this.dadosestudantes.descGrade;
        this.planocurricularstamp=this.dadosestudantes.gradestamp;
        this.myControlplanocurricular.setValue(this.planocurricular);
        this.myControlAnoSem.setValue(this.AnoSem);
        this.myControlturno.setValue(this.turno);
        this.myControlccu.setValue(this.sala);
        this.myControlsupervisPedagogico.setValue(this.supervisPedagogico);
        this.myControlFaculdade.setValue(this.Faculdade);
        this.myControlEtapaSemestre.setValue(this.EtapaSemestre);
        this.myControlTipoDoc.setValue(this.dadosestudantes.descricao);        
        let se:selects={
          chave: this.dadosestudantes.descricao,
          descricao: this.dadosestudantes.descricao,
          ordem: this.dadosestudantes.numdoc.toString()
        }
        this.SetTipoDoc(se);
      this.listamatriculaTurmaAlunol=this.dadosestudantes.matriculaTurmaAlunol;
       // this.listaturmadis=this.dadosestudantes.turmadisc;
        // if(this.dadosestudantes.horasaulas==1)
        // {
        //   this.cadastro.controls['tipo1'].setValue(true);
        // }else{     
        //   this.cadastro.controls['tipo1'].setValue(false);
        // }
        if(this.dadosestudantes.matriculaAlunostamp!=''){
          this.clstampvliw=this.dadosestudantes.matriculaAlunostamp;        
          
          this.GetDividadoAluno(this.dadosestudantes.clstamp);
        
        }else{
          this.clstampvliw=this.turmanotaservice.Stamp();
        }      
        if  (this.dadosestudantes.matriculaTurmaAlunol!=null && 
          this.dadosestudantes.matriculaTurmaAlunol!=undefined&& this.dadosestudantes.matriculaTurmaAlunol.length>0){
          this.carregarmatriculaTurmaAlunol(this.dadosestudantes.matriculaTurmaAlunol);
        }

    
  this.titloAccao = "Actualizar Inscrição";
 

}  else{  
    this.titloAccao = "Inscrição";
    this.isSpinnerDisplayed = false;
     this.isSpinnerDisplayedprofess=false;
     this.clstampvliw=this.turmanotaservice.Stamp();
    this.anularmatricula=false
     this.editando=false;

  this.cadastro.patchValue({   matriculaAlunostamp:this.clstampvliw})
    
  }
       
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
  toggle2(event: MatSlideToggleChange) {
    if(event.checked!=true)
    {
      //this.dadosestudantes.tipo=0;
    }else{
      
      //this.dadosestudantes.tipo=1;
    }
    this.cadastro.value.tipo1=false;
    this.cadastro.value.tipo3=false;
    this.cadastro.value.tipo4=false;
    this.cadastro.controls['tipo3'].setValue(false);
    this.cadastro.controls['tipo1'].setValue(false);
    this.cadastro.controls['tipo4'].setValue(false);
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
  
  myControlAnoSem = new FormControl<string | selects>('');
  optionsAnoSem: selects[] = [];
  filteredOptionsAnoSem!: Observable<selects[]>;  



  
  myControlTipoDoc = new FormControl<string | selects>('');
  optionsTipoDoc: selects[] = [];
  filteredOptionsTipoDoc!: Observable<selects[]>;  



  
  tdocdescricao:string='';
  tdocstamp:string='';
  numdoc:number=0;
  docMat!:tdocMat;  
  SetTipoDoc(item:selects){
    
    this.myControlTipoDoc.setValue('0');  
   this._estudanteService.GetTdocsingle(item.chave).subscribe({
    next: (data) => {
      if (data.sucesso) {            
        this.docMat = data.dados;   

        this.myControlTipoDoc.setValue(this.docMat.descricao);  
        if(this.editando!=true){
          let item:selects={
            chave: 'MatriculaAluno',
            descricao: 'numero',
            ordem: `numdoc=${this.docMat.numdoc}`
          }

          this._estudanteService.GetMax(item).subscribe({
            next: (data) => {
              if (data.sucesso) {          
                this.cadastro.patchValue({
                  numero:data.dados.chave
                })
              } 
            }
          });
        }
      } 
    }
  });
      }
      
  async GetTipoDocMat(){ 
    const se:condicoesprocura={
      tabela:"TdocMat",
    campo1: "descricao", 
    campo2:"Sigla",
     condicao:"vazio"
    }    
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {            
          this.optionsTipoDoc = data.dados.selects;
          this.filteredOptionsTipoDoc = this.myControlTipoDoc.valueChanges.pipe(
            startWith(''),
            map(value => {            
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsTipoDoc) : this.optionsTipoDoc.slice();
            }),
          );
          let se:selects={
            chave: '539D20237DMZ12111457',
            descricao: 'INSCRIÇÃO',
            ordem: '2'
          }
          this.SetTipoDoc(se);
         
        } else {
        }
      },
      error: (e) => {
      }
    });
  
  }
  
  

  myControlFormasingresso = new FormControl<string | selects>('');
  optionsFormasingresso: selects[] = [];
  filteredOptionsFormasingresso!: Observable<selects[]>;  
  
  SetFormasingresso(item:selects){
   
    
      }
      
  async GetFormasingresso(){ 
    const se:condicoesprocura={
      tabela:"Auxiliar",
    campo1: "descricao", 
    campo2:"codigo",
     condicao:"Tabela =81"
    }
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {            
          this.optionsFormasingresso = data.dados.selects;
          this.filteredOptionsFormasingresso = this.myControlFormasingresso.valueChanges.pipe(
            startWith(''),
            map(value => {            
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsFormasingresso) : this.optionsFormasingresso.slice();
            }),
          );
          let se:selects={
            chave: '539D20237DMZ12111457',
            descricao: 'INSCRIÇÃO',
            ordem: '2'
          }
          this.SetTipoDoc(se);
        } else {
        }
      },
      error: (e) => {
      }
    });
  
  }
  

  AnoSem:string='';
  AnoSemstamp:string='';
  
  
  
  SetAnoSem(item:selects){
    this.AnoSem=item.descricao;
  this.AnoSemstamp=item.chave;
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
  
  
  
  
  
  
  
  
  myControlsupervisPedagogico = new FormControl<string | selects>('');
  optionssupervisPedagogico: selects[] = [];
  filteredOptionssupervisPedagogico!: Observable<selects[]>;  
  
  supervisPedagogico:string='';
  supervisPedagogicostamp:string='';
  
  
  
  SetsupervisPedagogico(item:selects){
    this.supervisPedagogico=item.descricao;
  this.supervisPedagogicostamp=item.chave;
      }
  async GetsupervisPedagogico(){ 
    const se:condicoesprocura={
      tabela:"pe",
    campo1: "nome", 
    campo2:"no",
     condicao:"Coordenador=1"
    }
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {            
          this.optionssupervisPedagogico = data.dados.selects;
          this.filteredOptionssupervisPedagogico = this.myControlsupervisPedagogico.valueChanges.pipe(
            startWith(''),
            map(value => {            
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionssupervisPedagogico) : this.optionssupervisPedagogico.slice();
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
  
  myControlFaculdade = new FormControl<string | selects>('');
  optionsFaculdade: selects[] = [];
  filteredOptionsFaculdade!: Observable<selects[]>;  
  Faculdade:string='';
  Faculdadestamp:string='';
  async GetFaculdade(){ 
    const se:condicoesprocura={
      tabela:"ccu",
    campo1: "descricao", 
    campo2:"CodCcu",
     condicao:"vazio"
    }
    
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {            
          this.optionsFaculdade = data.dados.selects;
          this.filteredOptionsFaculdade = this.myControlFaculdade.valueChanges.pipe(
            startWith(''),
            map(value => {            
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsFaculdade) : this.optionsFaculdade.slice();
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
  SetFaculdade(item:selects){
    this.Faculdade=item.descricao;
  this.Faculdadestamp=item.chave;
      }
      
  
  
  @ViewChild('listasupervisPedagogico') listasupervisPedagogico!: MatSelect;
  
  
  @ViewChild('listaFaculdade') listaFaculdade!: MatSelect;
  
      myControlturno = new FormControl<string | selects>('');
      optionsturno: selects[] = [];
      filteredOptionsturno!: Observable<selects[]>;    
      EtapaSemestre: string='';
      EtapaSemestrestamp: string='';
  
      onSetEtapaSemestre(value:selects) {
        this.salastamp=value.chave;
        this.sala=value.descricao;
      }
      
      myControlEtapaSemestre = new FormControl<string | selects>('');
      optionsEtapaSemestre: selects[] = [];
      filteredOptionsEtapaSemestre!: Observable<selects[]>; 
      async  getEtapaSemestre() {
        const se:condicoesprocura={
          tabela:"sala",
        campo1: "Descricao", 
        campo2:"codigo",
         condicao:"vazio"
        }      
        this._loginservice.getselectionPost(se).subscribe({
          next: (data) => {
            if (data.sucesso) {            
              this.optionsEtapaSemestre = data.dados.selects;
                     
              //this.myControlccu.setValue(this.sala);
              this.filteredOptionsEtapaSemestre = this.myControlEtapaSemestre.valueChanges.pipe(
                startWith(''),
                map(value => {
                  
                  const name = typeof value === 'string' ? value : value?.descricao;
                  return name ? this._filter(name as string,this.optionsEtapaSemestre) : 
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
  // this.myControlPlanopgt.setValue(data.dados.selects[1].descricao)
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
  calculation(){ 

  return  this.dataListaplanopagamento.data.map(t => Number(t.col2)).
    reduce((acc, value) => acc + value, 0); 
    }
  totalCc:number=0;
  OnSelectplanopag(value:selects){
    this.cadastro.patchValue({codfac:value.chave, });  
  }
  OnSelectDescplano(value:selects){
    this.cadastro.patchValue({planopagstamp:value.chave}); 

   
    
  }
  
  OnSelecttipodo(value:selects){

    this.editando=false;    
    this.myControlTipoDoc.setValue('0');  
    this.cadastro.patchValue(
      {obs:value.chave});   
      let se:selects={
        chave: value.chave,
        descricao: value.descricao,
        ordem: value.descricao.toString()
      }

      this.SetTipoDoc(se);
      
  }
  
  
      onSelectAluno(value:selects) {
      var campos=`Codcurso,Curso,Descgrelha,Gradestamp,Nivelac,Coddep,Departamento,
      Faculdade,Ccusto,Ccustostamp,Tipo,clstamp,no,nome,Email`;      
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
                  curso:aluno.col2,
                  cursostamp :aluno.col1,
                  clstamp :aluno.col12,
                  no :aluno.col13,
                  nome :aluno.col14,
                  //codcurso :[''],
                  // anoSem :[''],
                  // codtur :[''],
                  // anolect :[''],
                  emails :aluno.col15,
                  gradestamp :aluno.col4,
                  descGrade :aluno.col3,
                  //etapa :aluno.col12,
                  //turmadiscstamp :[''],
                  //ststamp :[''],
                 // turmastamp :[''],
                 // turnostamp :[''],
                  // codfac :[''],
                  // alauxiliarstamp :[''],
                  // semstamp :[''],
                  nivelac :aluno.col5,
                  // formaingresso :[''],        
                  ccusto :aluno.col9,
                  ccustostamp :aluno.col10,
                  coddep :aluno.col7,
                  departamento :aluno.col6,
                  faculdade :aluno.col8,
                  //descanoaem :[''],
                  tipo :aluno.col11,               
                });
                this.initialLoadplanopagamento(aluno.col5); 



           let tes=     aluno.col2;//.includes(substring)  
if(tes.toLowerCase().includes("lic")){
  const filterValue ="lic";  
  this._filterpgt(filterValue);

} else if(tes.toLowerCase().includes("mest")){
  
  this._filterpgt("mest");
} else if(tes.toLowerCase().includes("dout")){
  
  this._filterpgt("dout");
} else if(tes.toLowerCase().includes("pos")){
  
  this._filterpgt("pos");
}

                
              }
            } 
          },
          error: (e) => {
            //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
          }
        });


      }
      private _filterpgt(name: string) {
        let fffh=this.optionsPlanopgtGeral.filter(option => option.descricao.toLowerCase().includes(name));
        this.optionsPlanopgt= fffh;
        this.filteredOptionsPlanopgt = this.myControlPlanopgt.valueChanges.pipe(
          startWith(''),
          map(value => {                  
            const name = typeof value === 'string' ? value : value?.descricao;
            return name ? this._filter(name as string,this.optionsPlanopgt) : 
            this.optionsPlanopgt.slice();
          }),
        ); 
        if(fffh.length>0){
          this.myControlPlanopgt.setValue(fffh[0].descricao)
          this.cadastro.patchValue({planopagstamp:fffh[0].chave});
        }
        
       }
       

      sala: string='';
      salastamp: string='';
  
      onSelectccu(value:selects,index:number) {
        this.salastamp=value.chave;
        this.sala=value.descricao;
      }
      
      myControlccu = new FormControl<string | selects>('');
      optionsccu: selects[] = [];
      filteredOptionsccu!: Observable<selects[]>; 
      async  getCcusto() {
        const se:condicoesprocura={
          tabela:"sala",
        campo1: "Descricao", 
        campo2:"codigo",
         condicao:"vazio"
        }      
        this._loginservice.getselectionPost(se).subscribe({
          next: (data) => {
            if (data.sucesso) {            
              this.optionsccu = data.dados.selects;
                     
              //this.myControlccu.setValue(this.sala);
              this.filteredOptionsccu = this.myControlccu.valueChanges.pipe(
                startWith(''),
                map(value => {
                  
                  const name = typeof value === 'string' ? value : value?.descricao;
                  return name ? this._filter(name as string,this.optionsccu) : 
                  this.optionsccu.slice();
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
  
  
  
      @ViewChild('listaturno') listaturno!: MatSelect;
      turno:string='';
      Setturno(item:selects){
        this.turno=item.descricao;
          }
      async Getturno(){ 
        const se:condicoesprocura={
          tabela:"turno",
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
              this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
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
  //--------------------------------------------------Adiciona imagem-------------------------------------------

  
  dados():matriculaAluno{

    const cl:matriculaAluno={
      matriculaAlunostamp: this.clstampvliw,
      planopagstamp: this.cadastro.value.planopagstamp,
      numero: this.cadastro.value.numero,
      numdoc: this.docMat.numdoc,
      codigo: this.docMat.sigla,
      refonecedor: this.docMat.tdocMatstamp,
      anolectivo: 0,
      descplano: 0,
      datapartida: new Date(),
      cursostamp: this.cadastro.value.cursostamp,
      data: new Date(),
      anoSemstamp: this.cadastro.value.anoSemstamp,
      clstamp: this.cadastro.value.clstamp,
      descricao: this.cadastro.value.descricao,
      sitcao: this.cadastro.value.sitcao,
      no: this.cadastro.value.no,
      nome: this.cadastro.value.nome,
      curso: this.cadastro.value.curso,
      codcurso: '',
      datamat: new Date(),
      turno: this.cadastro.value.turno,
      periodo: this.cadastro.value.periodo,
      anoSem: this.cadastro.value.anoSem,
      codtur: this.cadastro.value.codtur,
      anolect: this.cadastro.value.anolect,
      localmat: this.cadastro.value.localmat,
      emails:this.cadastro.value.emails,
      obs: this.cadastro.value.obs,
      gradestamp: this.cadastro.value.gradestamp,
      descGrade: this.cadastro.value.descGrade,
      etapa: this.cadastro.value.etapa,
      turmadiscstamp: '',
      ststamp: '',
      turmastamp: this.cadastro.value.turmastamp,
      turnostamp: this.cadastro.value.etapa,
      codfac: this.cadastro.value.codfac,
      alauxiliarstamp: '',
      semstamp: this.cadastro.value.semstamp,
      nivelac: this.cadastro.value.nivelac,
      formaingresso: this.cadastro.value.formaingresso,
      ccusto: this.cadastro.value.ccusto,
      ccustostamp: this.cadastro.value.ccustostamp,
      coddep: this.cadastro.value.coddep,
      departamento: this.cadastro.value.departamento,
      faculdade: this.cadastro.value.faculdade,
      descanoaem: this.cadastro.value.descanoaem,
      tipo: this.cadastro.value.tipo,
      activo: true,
      motivo: this.cadastro.value.motivo,
      matriculaTurmaAlunol: this.listamatriculaTurmaAlunol,
      disciplinaTumra:this.listamatriculadisciplinaTumra,
      matdisc: [],
      inscricao: this.docMat.inscricao,
      matricula: this.docMat.matricula,
      nomedoc: this.docMat.descricao
    };
    return cl;
    }
 
    Cadastrar()  
    {  
      if(this.cadastro.value.gradestamp.length==0){
        Swal.fire('Não permitido!', 'O Plano curricular do aluno está vazio!', 'error');      
        return ;
      } 
      if(this.cadastro.value.planopagstamp.length==0){
        Swal.fire('Não permitido!', 'O Plano de pagamento não foi seleccionado!', 'error');      
        return ;
      }
      if(this.cadastro.value.codfac.length==0){
        Swal.fire('Não permitido!', 'A entidade não foi seleccionada!', 'error');      
        return ; 
      }
      if(this.cadastro.value.clstamp.length==0){
        Swal.fire('Não permitido!', 'O aluno não foi seleccionado!', 'error');      
        return ;
      }
      
      const dadosssss=this.dados();
      this.gravarbd('UploadFile',dadosssss);
    }
//Validacao de campos


  //AnulaMatricula,AnularDisciplina e Gerarcc(Gerar conta conrrente) Sao métodos que existem na API
    AnularMatriculaAluno()  
    {  
      if(this.cadastro.value.gradestamp.length==0){
        Swal.fire('Não permitido!', 'O Plano curricular do aluno está vazio!', 'error');      
        return ;
      } 
      if(this.cadastro.value.planopagstamp.length==0){
        Swal.fire('Não permitido!', 'O Plano de pagamento não foi seleccionado!', 'error');      
        return ;
      }
      if(this.cadastro.value.codfac.length==0){
        Swal.fire('Não permitido!', 'A entidade não foi seleccionada!', 'error');      
        return ; 
      }
      if(this.cadastro.value.clstamp.length==0){
        Swal.fire('Não permitido!', 'O aluno não foi seleccionado!', 'error');      
        return ;
      }
      const dadosssss=this.dados();
      this.gravarbd('AnularMatriculaAluno',dadosssss);
    }
    AnularDisciplinaAluno( )    
    {  
      if(this.cadastro.value.gradestamp.length==0){
        Swal.fire('Não permitido!', 'O Plano curricular do aluno está vazio!', 'error');      
        return ;
      } 
      if(this.cadastro.value.planopagstamp.length==0){
        Swal.fire('Não permitido!', 'O Plano de pagamento não foi seleccionado!', 'error');      
        return ;
      }
      if(this.cadastro.value.codfac.length==0){
        Swal.fire('Não permitido!', 'A entidade não foi seleccionada!', 'error');      
        return ; 
      }
      if(this.cadastro.value.clstamp.length==0){
        Swal.fire('Não permitido!', 'O aluno não foi seleccionado!', 'error');      
        return ;
      }
      const dadosssss=this.dados();
      this.gravarbd('AnularDisciplinaAluno',dadosssss);
    }
    GerarCcAluno( )  
    {  
      if(this.cadastro.value.gradestamp.length==0){
        Swal.fire('Não permitido!', 'O Plano curricular do aluno está vazio!', 'error');      
        return ;
      } 
      if(this.cadastro.value.planopagstamp.length==0){
        Swal.fire('Não permitido!', 'O Plano de pagamento não foi seleccionado!', 'error');      
        return ;
      }
      if(this.cadastro.value.codfac.length==0){
        Swal.fire('Não permitido!', 'A entidade não foi seleccionada!', 'error');      
        return ; 
      }
      if(this.cadastro.value.clstamp.length==0){
        Swal.fire('Não permitido!', 'O aluno não foi seleccionado!', 'error');      
        return ;
      }
      const dadosssss=this.dados();
      this.gravarbd('GerarCcAluno',dadosssss);
    }
    

    gravarbd(metodo:string,cl:matriculaAluno){


      // if(this.cadastro.invalid){
      //   Swal.fire('Não permitido!', 'Caro administrador não poderá efectuar a matricular se possuir campos vazios!', 'error');
      // }



   
     
        this.isSpinnerDisplayed= true
  
      const formData = new FormData();
      const _dadoscl=cl
      var json_arr = JSON.stringify(_dadoscl);  
      formData.append("MatriculaAluno",json_arr);
      const url = `${environment.APIurl}MatriculaAluno/${metodo}`;
      const uploadReq = new HttpRequest('POST', url, formData, {
        reportProgress: true,
      });
      this.uploadUrl = '';
      this.uploadProgress = 0;
      this.working = true;
      this.http.request(uploadReq).pipe(
        finalize(() =>  this.isSpinnerDisplayed = false , ),).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {        
        Swal.fire('Sucesso!', `Operação executada com sucesso`, 'success');  
        this.cadastro.patchValue({inserindos:'hvnnnnvb'});
          this.closeDialog();
        }
      }, (error: any) => {
        Swal.fire('Erro!', `Não foi possível executar a operação, código do erro ${error}`, 'error');  
      }).add(() => {
        this.working = false;
        this.cadastro.patchValue({inserindos:'hvnnnnvb'});
      });
    
  }
  
  total:number=0;
  
  totalstr:string='Total:  ';
  
  
   //------------------------------------------------Documentos----------------------------------------------------------
  
  
   
  //---------------------------------------------------------------------------------------------------------------------
  
  //-----------------------------------Agregado Familiar-----------------------------------------------------------------
  
  //----------------------------------------------------------------------------------------------------------------------
  
  
  
  
  
  
  visibilidadeagregado:boolean=false;
  clstampvliw: string='';
    
  
  @ViewChild('recprpais') recprpais!: MatSelect;
  //-----------------------------------------------------------------------------------------------------------------------
  visibilidadedoc:boolean=false;
  visibilidadebolsa:boolean=false;
  visibilidadelingua:boolean=false;
  //------------------------------------------Adiciona e remove linhas do docs---------------------------------------------


  adicionarlistamatriculadisciplinaTumra() {
  
    if(this.cadastro.value.gradestamp.length==0){
      Swal.fire('Não permitido!', 'O Plano curricular do aluno está vazio!', 'error');      
      return;
    }  if(this.cadastro.value.cursostamp.length==0){
      Swal.fire('Não permitido!', 'O curso do aluno está vazio!', 'error')     
      return;
    }
    if(this.matriculaTurmaAlunol.length==0){
      Swal.fire('Não permitido!', 'Nenhuma turma seleccionada na grelha de turma!', 'error')     
      return;
    }
    this.disciplinaTumra.clear();
  let todostrue= this.dataListadisciplinas.data.filter(item => item.col3 == 'true');  
  if(todostrue.length==0){
    Swal.fire('Não permitido!', 'Nenhuma disciplina seleccionada na grelha de disciplina!', 'error')     
    return;
  }
  
  this.visibilidadeturmadisc=true;
  for (let i = 0; i < todostrue.length; i++) {
    
 // delay(3000);
  let stamp =this.turmanotaservice.Stamp()+i;  
  if(this.ststampsss.length==0)
  {
    this.ststampsss=`'${todostrue[i].col1}'`
  }else{
    
  this.ststampsss+=`,'${todostrue[i].col1}'`
  }
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

  this.carregardisciplinaturma(this.listamatriculadisciplinaTumra);
  this.dataListadisciplinas.data=[];
  
  }
 
 
 
 
 
  adicionarturmal() {
    this.isLoggedIn=false;
    
    this.visibilidadeturmal=true;
  let stamp =this.turmanotaservice.Stamp();  
  this.matriculaTurmaAlunol.clear();
    this.listamatriculaTurmaAlunol.push({
      matriculaTurmaAlunolstamp: stamp,
      matriculaAlunostamp: this.clstampvliw,
      codigo: '',
      descricao: '',
      anoSemstamp: '',
      descanoaem: '',
      descurso: '',
      cursostamp: '',
      descgrade: '',
      gradestamp: '',
      etapa: '',
      sala: '',
      turno: '',
      vagasmin: 0,
      vagasmax: 0,
      responsavel: '',
      responsavel2: '',
      semanaslec: 0,
      horasaulas: 0,
      formaaval: '',
      situacao: '',
      obs: '',
      datain: new Date(),
      datafim: new Date(),
      horain: new Date(),
      horafim: new Date(),
      turmastamp: '',
      turmadiscstamp: '',
      padrao: false
    });
    this.carregarmatriculaTurmaAlunol(this.listamatriculaTurmaAlunol);
  }

  paletteColour:string='';
  change() {
  this.paletteColour = 'warn';
  }

  turmastamp:string='';
  adicionarturmaleeee( tabgroup: MatTabGroup, number: number) {  
    if(this.cadastro.value.gradestamp.length==0){
      Swal.fire('Não permitido!', 'O Plano curricular do aluno está vazio!', 'error');      
      return;
    } 
     if(this.cadastro.value.cursostamp.length==0){
      Swal.fire('Não permitido!', 'O curso do aluno está vazio!', 'error')     
      return;
    }
    this.matriculaTurmaAlunol.clear();
  let todostrue= this.dataListaturma.data.filter(item => item.col9 == 'true');  
  if(todostrue.length==0){
    Swal.fire('Não permitido!', 'Nenhuma turma seleccionada na grelha de turmas!', 'error')     
    return;
  }
  this.visibilidadeturmal=true;
  //this.turmastamp='';
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

  this.carregarmatriculaTurmaAlunol(this.listamatriculaTurmaAlunol);
  this.dataListaturma.data=[];
  
  }
 
 
  
  get matriculaTurmaAlunol(): FormArray {
     
    return this.cadastro.get('matriculaTurmaAlunol') as FormArray;
   } 
   
   get disciplinaTumra(): FormArray {
     
    return this.cadastro.get('disciplinaTumra') as FormArray;
   }
  
  listaturmadis:turmadisc[]=[]
  listamatriculaTurmaAlunol:matriculaTurmaAlunol[]=[]
  listamatriculadisciplinaTumra:disciplinaTumra[]=[]
  
  visibilidadeturmadisc:boolean=false;
   
  get turmadisc(): FormArray {
     
    return this.cadastro.get('turmadisc') as FormArray;
   }
  
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
  switch(tabela.toLowerCase()){
  case 'disciplinatumra':   
   if(this.veradadeiro==true){
    this.listamatriculadisciplinaTumra = this.listamatriculadisciplinaTumra.filter(item => item.disciplinaTumrastamp.toLowerCase() != stamp.toLowerCase());
       var letss=this.listamatriculadisciplinaTumra;
   if(letss!=null && letss!=undefined &&  letss.length>0){
   this.visibilidadeturmadisc=true; 
   this.disciplinaTumra.clear();
   this.carregardisciplinaturma(this.listamatriculadisciplinaTumra); 
   }  else{  
    //this.turmadisc.clear();
   this.visibilidadeturmadisc=false;
   }
   }
    break;
    case 'matriculaturmaalunol':
   if(this.veradadeiro==true){    
    this.removergri(index);
  //  this.listamatriculaTurmaAlunol = this.listamatriculaTurmaAlunol.filter(item => item.matriculaTurmaAlunolstamp != stamp);
  //    var lets=this.listamatriculaTurmaAlunol;
  //   if(lets!=null && lets!=undefined &&  lets.length>0){
  //  this.isLoggedIn=false;
  //  this.matriculaTurmaAlunol.clear();
  //  this.carregarmatriculaTurmaAlunol(this.listamatriculaTurmaAlunol);
  //  }  else{  
  //  this.isLoggedIn=true;
  //  }
   }
      break;
  }
  
          },
          error: () => {
            this._loginservice.mostrarAlerta("Erro de conexao", "Opps");          
            this.veradadeiro=false;
          }
        });
  
      }
  
    }));
    
  }
  
  removerturmal(index: number) {  
    let grela=(<FormArray>this.cadastro.get('matriculaTurmaAlunol')).controls[index].value;
   let ret= this.eliminarestudante(grela.matriculaTurmaAlunolstamp,grela.descricao,index,'matriculaTurmaAlunol','matriculaTurmaAlunolstamp')
  
  
  
   
   
   
  }  
  MatTabGroupsss!:MatTabGroup;
  AdicionarDisciplinas( tabgroup: MatTabGroup, number: number,index: number) {


    let stamp=this.listamatriculaTurmaAlunol[index].turmastamp;

    if(this.cadastro.value.gradestamp.length==0){
      Swal.fire('Não permitido!', 'O Plano curricular do aluno está vazio!', 'error');      
      return;
    }  if(this.cadastro.value.cursostamp.length==0){
      Swal.fire('Não permitido!', 'O curso do aluno está vazio!', 'error')     
      return;
    }
    if(stamp.length==0){
      Swal.fire('Não permitido!', 'escolha a turma!', 'error')     
      return;
    }
    this.ststampsss='';

let turmadis=(<FormArray>this.cadastro.get('disciplinaTumra')).controls
    for (let i = 0; i < turmadis.length; i++) {
      let valor=turmadis[i].value;
      if(i==0)
      {
        this.ststampsss=`'${valor.ststamp}'`
      }else{        
      this.ststampsss+=`,'${valor.ststamp}'`
      }
      }
      let disciplinastm='';
if(this.ststampsss.length>0){
  disciplinastm=`  and Ststamp not in  (${this.ststampsss})`
}
let conddicao=`  Turmastamp='${stamp}'`

    this.habilitarcheckebo=false;
    this.turma=[];
    this.totalrecordturma=0;
    var campos=` SELECT DISTINCT *,
       '' AS Sitcao
FROM (
    SELECT 
        Referenc,
        Disciplina,
        CAST(0 AS BIT) AS ok,
        Turmastamp,
        Ststamp,
        COALESCE(
            (SELECT TOP 1 TRY_CONVERT(NUMERIC(18, 2), tn.Mediafinal)
             FROM Turmanota tn
             WHERE tn.Coddis = Turmadisc.Ststamp
               AND tn.Turmastamp = Turmadisc.Turmastamp), 0) AS Mediafina,
        COALESCE(
            (SELECT TOP 1 TRY_CONVERT(NUMERIC(18, 2), tn.Fecho)
             FROM Turmanota tn
             WHERE tn.Coddis = Turmadisc.Ststamp
               AND tn.Turmastamp = Turmadisc.Turmastamp), 0) AS Fecho,
        (SELECT TOP 1 Prec
         FROM st
         WHERE st.Ststamp = Turmadisc.Ststamp) AS Prec
    FROM Turmadisc
    WHERE ${conddicao}
) temp
WHERE Mediafina < 9.5
  AND Fecho = 0 ${disciplinastm};
`; 
    // let set:selects={
    //   chave: this.cadastro.value.clstamp,
    //   descricao: campos,
    //   ordem: 'disciplina'
    // }
     this.MatTabGroupsss=tabgroup;

   
    let set:selectsprocura={
      chave: conddicao,
      descricao: campos,
      ordem: 'disciplina',
      stamplocal: this.clstampvliw,
      stampsexcepcao:stamp
    }
     
this.ModdalDisciplinas(set,number);
   
  }
  

removergri(index:number){
  this.turmastamp='';
  this.matriculaTurmaAlunol.clear();
let stamp=this.listamatriculaTurmaAlunol[index].turmastamp;
  this.listamatriculaTurmaAlunol = this.listamatriculaTurmaAlunol.filter(item => item.turmastamp.toLowerCase() 
  != stamp.toLowerCase());
  for (let i = 0; i < this.listamatriculaTurmaAlunol.length; i++) {    
    if(i==0)
    {
      this.turmastamp=`'${this.listamatriculaTurmaAlunol[i].turmastamp}'`
    }else{      
    this.turmastamp+=`,'${this.listamatriculaTurmaAlunol[i].turmastamp}'`
    }    
    }  
    this.carregarmatriculaTurmaAlunol(this.listamatriculaTurmaAlunol);  
  var lets=this.cadastro.get('matriculaTurmaAlunol') as FormArray
  if(lets.length>0){
  this.visibilidadeturmal=true;
  }  else{  
  this.visibilidadeturmal=false;
  }
}
  
  removerturmadisc(index: number) {  
   if(this.listamatriculadisciplinaTumra[index]!==undefined){
    let ret= this.eliminarestudante(this.listamatriculadisciplinaTumra[index].disciplinaTumrastamp,this.listamatriculadisciplinaTumra[index].disciplina,index,'disciplinaTumra','disciplinaTumrastamp')
   
   }
   
  }
  
  
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


    //Todos esses (this._loginservice.getselection) métodos devem ser substituidos pelo this._loginservice.getselectionPost
    //Em todos os componentes
    //Percebes
    //sim percebi.



    
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
  
  //----------------------------------------------------------------Imprimir Recibo-----------------------------------------------------
  Imprimir() {
    if(this.cadastro.value.gradestamp.length==0){
      Swal.fire('Não permitido!', 'O Plano curricular do aluno está vazio!', 'error');      
      return;
    } if(this.cadastro.value.planopagstamp.length==0){
      Swal.fire('Não permitido!', 'O Plano de pagamento não foi seleccionado!', 'error');      
      return;
    }
    if(this.cadastro.value.codfac.length==0){
      Swal.fire('Não permitido!', 'A entidade não foi seleccionada!', 'error');      
      return;
    }
    if(this.cadastro.value.clstamp.length==0){
      Swal.fire('Não permitido!', 'O aluno não foi seleccionado!', 'error');      
      return;
    }
  const cl:matriculaAluno={
    matriculaAlunostamp: this.clstampvliw,
    planopagstamp: this.cadastro.value.planopagstamp,
    numero: this.cadastro.value.numero,
    numdoc: this.docMat.numdoc,
    codigo: this.docMat.sigla,
    refonecedor: this.docMat.tdocMatstamp,
    anolectivo: 0,
    descplano: 0,
    datapartida: new Date(),
    cursostamp: this.cadastro.value.cursostamp,
    data: new Date(),
    anoSemstamp: this.cadastro.value.anoSemstamp,
    clstamp: this.cadastro.value.clstamp,
    descricao: this.cadastro.value.descricao,
    sitcao: this.cadastro.value.sitcao,
    no: this.cadastro.value.no,
    nome: this.cadastro.value.nome,
    curso: this.cadastro.value.curso,
    codcurso: '',
    datamat: new Date(),
    turno: this.cadastro.value.turno,
    periodo: this.cadastro.value.periodo,
    anoSem: this.cadastro.value.anoSem,
    codtur: this.cadastro.value.codtur,
    anolect: this.cadastro.value.anolect,
    localmat: this.cadastro.value.localmat,
    emails:this.cadastro.value.emails,
    obs: this.cadastro.value.obs,
    gradestamp: this.cadastro.value.gradestamp,
    descGrade: this.cadastro.value.descGrade,
    etapa: this.cadastro.value.etapa,
    turmadiscstamp: '',
    ststamp: '',
    turmastamp: this.cadastro.value.turmastamp,
    turnostamp: this.cadastro.value.etapa,
    codfac: this.cadastro.value.codfac,
    alauxiliarstamp: '',
    semstamp: this.cadastro.value.semstamp,
    nivelac: this.cadastro.value.nivelac,
    formaingresso: this.cadastro.value.formaingresso,
    ccusto: this.cadastro.value.ccusto,
    ccustostamp: this.cadastro.value.ccustostamp,
    coddep: this.cadastro.value.coddep,
    departamento: this.cadastro.value.departamento,
    faculdade: this.cadastro.value.faculdade,
    descanoaem: this.cadastro.value.descanoaem,
    tipo: this.cadastro.value.tipo,
    activo: true,
    motivo: this.cadastro.value.motivo,
    matriculaTurmaAlunol: this.listamatriculaTurmaAlunol,
    disciplinaTumra:this.listamatriculadisciplinaTumra,
    matdisc: [],
    inscricao: this.docMat.inscricao,
    matricula: this.docMat.matricula,
    nomedoc: this.docMat.descricao
  };
    this.isSpinnerDisplayed = true;
    let resssssss: Resposta<matriculaAluno> = {
      dados: cl,
      mensagem: 'Matricula',
      sucesso: true
    };
  
    this._loginservice.GerarRelatorioFacturacao(resssssss).pipe(
      finalize(() => this.isSpinnerDisplayed = false)
    ).subscribe({
      next: (data) => {
        if (data.sucesso) {
         
          if (data.dados != null) {
  
            const filename = data.dados.filename;
            try {
              if (filename != null && filename.length > 0 && filename != '' && filename != 'vazio') {
                // this._loginservice.Downloadfile(filename);
                let trabalho: Trabalho={
                  trabalhostamp: '',
                  turmalstamp: '',
                  ststamp: '',
                  clstamp: '',
                  status: '',
                  data: new Date(),
                  path: filename,
                  path1: ''
                }
            
                this.dialog.open(VerTrabalhoComponent, {
                  width: '100%',
                  height:'100%',
                  disableClose: true,
                  data: trabalho,
                  autoFocus: false,
                }).afterClosed().subscribe(resultado => {
                  if (resultado === "true") {
                    this.isSpinnerDisplayed= false
                  }
                });
                this.isSpinnerDisplayed = false;
              }
            } catch {
              // this._loginservice.mostrarAlerta("O sistema não conseguiu carregar o ficheiro, o report apresenta má formatação!","Erro");
              Swal.fire('Erro!', "O sistema não conseguiu carregar o ficheiro, o report apresenta má formatação!", 'error');
            }
          }
        } else {
          Swal.fire('Erro!',data.mensagem , 'error');
        }
      },
      error: (e) => {
        Swal.fire('Erro!', "O sistema não conseguiu carregar o ficheiro " + e, 'error');
      }
    });
  
  }
  
  removerDiscilplina(index: number) { 
    this.listamatriculadisciplinaTumra[index].activo;

    return
    let ret= this.AnularDisciplinaAluno()
    // let disc=(<FormArray>this.cadast
      
      //this.cadastro.get('carregardisciplinaturma')).controls[index].value;

   //let ret= this.eliminarestudante(grela.matriculaTurmaAlunolstamp,grela.descricao,index,'matriculaTurmaAlunol','matriculaTurmaAlunolstamp')
  
  
  
   
   
   
  }
  

  anulardisciplina($event: MatCheckboxChange,index:number){      

    
    const padrao= Boolean($event.checked);
    //this.selectiondmzdisciplinas.toggle(_t25)
    // _t25.activo=Boolean(padrao);  
    this.listamatriculadisciplinaTumra[index].activo=Boolean(padrao);
    
    
   }


   AnularDisciplinaModal(data:boolean, descricao:string){

    let sms='';

    if(data==true){
      sms='activar'
    }
    else{
      sms='desativar'
    }

    
    Swal.fire({
      title: `Deseja ${sms} disciplina?`,
      text: descricao,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: `Sim, ${sms}`,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Não, Voltar'
    }).then((resultado => {
      this.AnularDisciplinaAluno()
  
    }));
   }


  

   getestudante() {
     this.isSpinnerDisplayed = true;
     let nimNome = '';
     this.dataListaplanopagamento = new MatTableDataSource(this.listplanopagamento);
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
       width: '50%',
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

// this.itemsFp.clear();
//this.dataListaturma.data=[];
//this.listaccfill=[];
         this.onSelectAlunosssss(set)
       }
     });
   }

   onSelectAlunosssss(value:selects) {
    var campos=`Codcurso,Curso,Descgrelha,Gradestamp,Nivelac,Coddep,Departamento,
    Faculdade,Ccusto,Ccustostamp,Tipo,clstamp,no,nome,Email,nuit,morada,localidade,Moeda`;      

    this.GetDividadoAluno(value.chave);
  

    this._estudanteService.GetPlanopamentoestudante(value.chave).pipe(      
      finalize(() => this.isSpinnerDisplayed = false),
    ).subscribe({
        next: (data) => {
          if (data.sucesso) {  
   
           this.dataListaplanopagamento.data = data.dados.dmzview;   

           const verificacao =data.dados.dmzview.find(data=>data.col2)
     
           if(verificacao?.col2!=null || verificacao!=undefined){
            Swal.fire('Não permitido!', 'O/A estudante tem conta corrente por regularizar!', 'info'); 
            return
          }


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
                      curso:aluno.col2,
                      cursostamp :aluno.col1,
                      clstamp :aluno.col12,
                      no :aluno.col13,
                      nome :aluno.col14,
                      //codcurso :[''],
                      // anoSem :[''],
                      // codtur :[''],
                      // anolect :[''],
                      emails :aluno.col15,
                      gradestamp :aluno.col4,
                      descGrade :aluno.col3,
                      //etapa :aluno.col12,
                      //turmadiscstamp :[''],
                      //ststamp :[''],
                     // turmastamp :[''],
                     // turnostamp :[''],
                      // codfac :[''],
                      // alauxiliarstamp :[''],
                      // semstamp :[''],
                      nivelac :aluno.col5,
                      // formaingresso :[''],        
                      ccusto :aluno.col9,
                      ccustostamp :aluno.col10,
                      coddep :aluno.col7,
                      departamento :aluno.col6,
                      faculdade :aluno.col8,
                      //descanoaem :[''],
                      tipo :aluno.col11,               
                    });
                    this.initialLoadplanopagamento(aluno.col5); 
                   
      
      
               let tes=     aluno.col2;//.includes(substring)  
      if(tes.toLowerCase().includes("lic")){
      const filterValue ="lic";  
      this._filterpgt(filterValue);
      
      } else if(tes.toLowerCase().includes("mest")){
      
      this._filterpgt("mest");
      } else if(tes.toLowerCase().includes("dout")){
      
      this._filterpgt("dout");
      } else if(tes.toLowerCase().includes("pos")){
      
      this._filterpgt("pos");
      }
      
                    
                  }
                } 
              },
              error: (e) => {
                //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
              }
            });



          } 
        },})



    // if(this.dataListaplanopagamento.data.length>0){
    //   Swal.fire('Não permitido!', 'O/A estudante tem conta corrente por regularizar!', 'info'); 
    //   return
    // }

    //console.log(   this.GetDividadoAluno(value.chave);)



    }
    

}

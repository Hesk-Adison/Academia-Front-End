import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { condicoesprocura, selects } from 'src/Models/CampoSessoes';
import { rtlviewsingleheader } from 'src/Models/Rtlviewsingleheader/Rtlviewsingleheader';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { rltview } from 'src/app/Interfaces/rltview';
import {finalize, map, startWith} from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
import { Trabalho } from 'src/Models/trabalho';
import { VerTrabalhoComponent } from 'src/app/Portal-do-Estudante/trabalho/ver-trabalho/ver-trabalho.component';
export const MY_DATA_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },

  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD/MM/YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  }
}
@Component({
  selector: 'app-modal-param-rel',
  templateUrl: './modal-param-rel.component.html',
  styleUrls: ['./modal-param-rel.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS },
  ]
})
export class ModalParamRelComponent implements OnInit {

  disabiltabtnSave=false;
  isSpinnerDisplayed = false;
onSelectccu(value:selects,index:number) {
  this.tbccustostamp=value.chave;
  this.tbccusto=value.descricao;
}
  ccustovisibilt:boolean=false;
onSelectfisciplina(value:selects,index:number) {
  
  this.tbdisciplinastamp=value.chave;
  this.tbdisciplina=value.descricao;
}
onSelectturma(value:selects,index:number) {
  this.tbturmastamp=value.chave;
  this.tbturma=value.descricao;
}
onSelectMoedas(value:selects,index:number) {
  this.moeda=value.descricao;
  this.moeda=value.descricao;
}
onSelectaluno(value:selects,index:number) {
  this.tbClientestam=value.chave;
  this.tbClientenome=value.descricao;
  this.tbClienteno=value.ordem;
}
onSelectcurso(value:selects,index:number) {
  this.tbcursostamp=value.chave;
  this.tbcurso=value.descricao;
}
onSelectanosem(value:selects,index:number) {
  this.tbanosemstamp=value.chave;
  this.tbanosem=value.descricao;
}
onSelectpano(value:selects,index:number) {
  this.tbplanostamp=value.chave;
  this.tbplano=value.descricao;
}
  entredatas: boolean=false;


guardarEditarMancebo() {
  
  this.isSpinnerDisplayed = true;
  this.disabiltabtnSave=true;
if(this.DadosView.tipofilter==2){
  this.dataInicio = moment(this.rltForm.value.dmzentredatas1nume).format('YYYY-MM-DD');
 this.dataFim = moment(this.rltForm.value.dmzentredatas2nume).format('YYYY-MM-DD');  
  this.dmzentredatas1 = this.rltForm.value.dmzentredatas1;
}
const fff: rtlviewsingleheader={
  modulo: 'GES',
  ctitulorelatorio: this.DadosView.descricao,
  origem: 'RLT',
  condicaoorigem: '',
  condicao: '',
  filtrado: '',
  tbClientenome: this.tbClientenome,
  tbClienteno: this.tbClienteno,
  tbClientestam: this.tbClientestam,
  formasp: '',
  dmzddn1: false,
  dmzddn1dt: '',
  dmzdata1: '',
  tbccusto: this.tbccusto,
  tbccustostamp: this.tbccustostamp,
  tbpj: '',
  tbusr: '',
  tbusrstamp:'',
  tbcurso:  this.tbcurso,
  tbcursostamp: this.tbcursostamp,
  tbturma: this.tbturma,
  tbturmastamp: this.tbturmastamp,
  profstamp: '',
  prof: '',
  tbcorredor: '',
  tbcorredorstamp: '',
  tbanosem: this.tbanosem,
  tbanosemstamp: this.tbanosemstamp,
  tbdisciplina: this.tbdisciplina,
  tbdisciplinastamp: this.tbdisciplinastamp,
  tbplano:  this.tbplano,
  tbplanostamp: this.tbplanostamp,
  tbetapa: '',
  tbetapastamp: '',
  tesouraria: '',
  tesourariastamp: '',
  rltview: this.DadosView,
  filtrodata: '',
  dmzentreanos1: false,
  dmzentreanos1nume: 0,
  dmzentreanos2nume: 0,
  dmzentredatas1: this.entredatas,
  dmzentredatas1nume: this.dataInicio,
  dmzentredatas2nume: this.dataFim,
  moeda: this.moeda,
}

this.isSpinnerDisplayed=true;

if(this.DadosView.tipofilter==2){
  fff.dmzentredatas1nume = moment(this.rltForm.value.dmzentredatas1nume).format('YYYY-MM-DD');
  fff.dmzentredatas2nume = moment(this.rltForm.value.dmzentredatas2nume).format('YYYY-MM-DD');  
  fff.dmzentredatas1 = this.rltForm.value.dmzentredatas1;
}

this._loginservice.GerarRelatorio(fff).pipe(
  finalize(() => this.isSpinnerDisplayed = false),
).subscribe({
  next:(data)=>{
    if(data.sucesso){
      
     if(data.dados!=null){
      if(data.dados.filename.length>0){
        
        const filename=data.dados.filename;
        try{
          if(filename!=null && filename.length>0 && filename!='' && filename!='vazio'){
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
        this.disabiltabtnSave=false;
          }
        }catch {
         // this._loginservice.mostrarAlerta("O sistema não conseguiu carregar o ficheiro, o report apresenta má formatação!","Erro");
        
          Swal.fire('Erro!', "O sistema não conseguiu carregar o ficheiro, o report apresenta má formatação!", 'error');
        }
       }   
      }
      else{
        Swal.fire('Erro!', "O sistema não conseguiu carregar o ficheiro, o report não conte dados!", 'error');
      }

  
    }else{
      
      Swal.fire('Erro!', "O sistema não conseguiu carregar o ficheiro "+data.mensagem, 'error');   
      this.isSpinnerDisplayed = false;    
      this.disabiltabtnSave=false;
    }
  },
error:(e)=>{
  Swal.fire('Erro!', "O sistema não conseguiu carregar o ficheiro "+e, 'error');       
  //this._loginservice.mostrarAlerta(`erro, ${e}`,"Erro");
  this.isSpinnerDisplayed = false;    
  this.disabiltabtnSave=false;
}
});

}


myControlccu = new FormControl<string | selects>('');
optionslistaccu: selects[] = [];
filteredOptionsccu!: Observable<selects[]>;


myControlaluno = new FormControl<string | selects>('');
optionslistaalunos: selects[] = [];
filteredOptionsalunos!: Observable<selects[]>;

//filteredOptionsturma
//Filtro de turmas
myControlturma= new FormControl<string | selects>('');
optionslistaturmfilterr: selects[] = [];
filteredOptionsturma!: Observable<selects[]>;

//Filtro de disciplinas
filteredOptionsdisciplinas!: Observable<selects[]>;
myControldisciplinas= new FormControl<string | selects>('');
optionsdisciplinasfilterr: selects[] = [];

//Filtro de Ano sem
filteredOptionsAnosem!: Observable<selects[]>;
myControlAnosem= new FormControl<string | selects>('');
optionslistaAnosemfilterr: selects[] = [];


//Filtro de Moedas
filteredOptionsMoedas!: Observable<selects[]>;
myControlMoedas= new FormControl<string | selects>('');
optionslistaMoedasfilterr: selects[] = [];


//Filtro de curso
filteredOptionscurso!: Observable<selects[]>;
myControlcurso= new FormControl<string | selects>('');
optionslistacursofilterr: selects[] = [];


//Filtro de plano
filteredOptionsplano!: Observable<selects[]>;
myControlplano= new FormControl<string | selects>('');
optionslistaplanofilterr: selects[] = [];



    rltForm!: FormGroup;    
    titloAccao: string = "IMPRESSÃO DE RELATÓRIO";
    botaoAccao: string = "Processar";    
  dataInicio :string='';
  dataFim ='';
    rtlviewsingleheader!:rtlviewsingleheader;
    DadosView!: rltview 
     modulo: string='';
     ctitulorelatorio: string='';
     origem: string='';
    condicaoorigem: string='';
    condicao: string='';
    filtrado: string='';
    tbClientenome: string='';
    tbClienteno: string='';
    tbClientestam: string='';
    formasp: string='';
     dmzddn1:boolean=false;
    dmzddn1dt :string='';
    dmzdata1 :string='';  
    tbccusto: string='';
    tbccustostamp: string='';
    moeda: string='';
    tbpj: string='';
    tbusr: string='';
    tbusrstamp: string='';
    tbcurso: string='';
    tbcursostamp: string='';
    tbturma: string='';
    tbturmastamp: string='';
    profstamp: string='';
    prof: string='';
    tbcorredor: string='';
    tbcorredorstamp: string='';
    tbanosem: string='';
    tbanosemstamp: string='';
    tbdisciplina: string='';
    tbdisciplinastamp: string='';
    tbplano: string='';
    tbplanostamp: string='';
    tbetapa: string='';
    tbetapastamp: string='';
    tesouraria: string='';
    tesourariastamp: string='';
     filtrodata : string='';
     dmzentreanos1:boolean=false;
     dmzentreanos1nume:Number= 0;
     dmzentreanos2nume:Number= 0;
     dmzentredatas1:boolean=false;
     dmzentredatas1nume :string='';
     dmzentredatas2nume  :string='';

    @ViewChild('listamoedas') listamoedas!: MatSelect;
    @ViewChild('listamoedastes') listamoedastes!: MatSelect;
    @ViewChild('listaalunos') listaalunos!: MatSelect;
    @ViewChild('listaturmas') listaturmas!: MatSelect;
    @ViewChild('listacursos') listacursos!: MatSelect;

    @ViewChild('listaplanos') listaplanos!: MatSelect;


    @ViewChild('listadisciplinas') listadisciplinas!: MatSelect;
    @ViewChild('listaanosemestre') listaanosemestre!: MatSelect;
   // @ViewChild('listaanosfffff') listaanosfffff!: MatSelect;
  listaturm: selects[] = [];
  
  listaaturmafilterr: selects[] = [];
  listaalunosfilterr: selects[] = [];
  listaalun: selects[] = [];
  listadisciplinafilterr: selects[] = [];
  listadisc: selects[] = [];
  listaanosemfilterr: selects[] = [];
  listaanosem: selects[] = [];
  listamoedassfilterr: selects[] = [];
  listamoedass: selects[] = [];
  listacursosssssfilterr: selects[] = [];
  listacursosssss: selects[] = [];
  listaplanossssfilterr: selects[] = [];
  listaplanossss: selects[] = []; 

  
  listaccustofilterr: selects[] = [];
  listaccusto: selects[] = []; 
  
  private ApiUrlgeral = `${environment.APIurl}Users/`
    constructor(
      private modalActual: MatDialogRef<ModalParamRelComponent>,
      @Inject(MAT_DIALOG_DATA) public dadosRlt: rltview,
      private fb: FormBuilder,
      private _loginservice: LoginServiceService,
       private router: Router,    
       private dialog: MatDialog,
    ) {  

      this.DadosView = this.dadosRlt  
      
      if(this.DadosView!==null){
this.ctitulorelatorio=this.DadosView.descricao
if(this.DadosView.comboqry1.length>0){
 this.ccustovisibilt=true;
}
      }


   this.rltForm=this.fb.group({ 
      //   modulo: [''],
      // ctitulorelatorio: [this.ctitulorelatorio],
      // origem: [''],
      // condicaoorigem: [''],
      // condicao: [''],
      // filtrado: [''],
      // tbClientenome: [''],
      // tbClienteno: [''],
      // tbClientestam: [''],
      // formasp: [''],
      //  dmzddn1:[false],
      // dmzddn1dt :[''],
      // dmzdata1 :[''],  
      // tbccusto: [''],
      // tbccustostamp: [''],
       moedas: ['MZN'],
       descricao:[this.ctitulorelatorio],
       alunochave: [''],
       turmachave: [''],
       cursochave: [''],
       tbdisciplinastamp: [''],
       tbplanostamp: [''],
      // mpadchave: ['MZN'],mpadchave
       //naomostramS: [false],
       
      // tbpj: [''],
      // tbusr: [''],
      // tbusrstamp: [''],
      // tbcurso: [''],
      // tbcursostamp: [''],
      // tbturma: [''],
      // tbturmastamp: [''],
      // profstamp: [''],
      // prof: [''],
      // tbcorredor: [''],
      // tbcorredorstamp: [''],
      // tbanosem: [''],
      // tbanosemstamp: [''],
      // tbdisciplina: [''],
      // tbdisciplinastamp: [''],
      // tbplano: [''],
      // tbplanostamp: [''],
      // tbetapa: [''],
      tbetapastamp: [''],
      // tesouraria: [''],
      // tesourariastamp: [''],
      //  filtrodata : [''],
      //  dmzentreanos1:[false],
       // dmzentreanos1nume: [0],
      //  dmzentreanos2nume: [0],
         dmzentredatas1:[false],
       dmzentredatas1nume :[''],
        dmzentredatas2nume  :[''],
      });
    }

    async  getAlunos() {
      const se:condicoesprocura={
        tabela:"cl",
      campo1: "nome", 
      campo2:"no",
       condicao:"Aluno=1"
      }
      this._loginservice.getselection(se).subscribe({
        next: (data) => {
          if (data.sucesso) {            
            this.listaalun = data.dados.selects;
            this.listaalunosfilterr=this.listaalun;
            this.filteredOptionsalunos = this.myControlaluno.valueChanges.pipe(
              startWith(''),
              map(value => {
                
                const name = typeof value === 'string' ? value : value?.descricao;
                return name ? this._filter(name as string,this.listaalunosfilterr) : this.optionslistaalunos.slice();
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

    
    async  getCcusto() {
      //Ccustamp,Descricao,codccu
      const se:condicoesprocura={
        tabela:"ccu",
      campo1: "Descricao", 
      campo2:"codccu",
       condicao:"vazio"
      }      
      this._loginservice.getselection(se).subscribe({
        next: (data) => {
          if (data.sucesso) {            
            this.listaccusto = data.dados.selects;
            this.listaccustofilterr=this.listaccusto;
            if(this.listaccusto.length>0){
              if(this.listaccusto[0].chave.length==0 || this.listaccusto[0].chave==''){
                if(this.listaccusto.length>1){
                this.tbccustostamp=this.listaccusto[1].chave;
                this.tbccusto=this.listaccusto[1].descricao;                
              }
              }else{
                this.tbccustostamp=this.listaccusto[0].chave;
                this.tbccusto=this.listaccusto[0].descricao;
                this.myControlccu.setValue(this.listaccusto[0].descricao);
              }
            }            
            this.myControlccu.setValue(this.tbccusto);
            this.filteredOptionsccu = this.myControlccu.valueChanges.pipe(
              startWith(''),
              map(value => {
                
                const name = typeof value === 'string' ? value : value?.descricao;
                return name ? this._filter(name as string,this.listaccustofilterr) : 
                this.optionslistaccu.slice();
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
    async  getturmas() {
      const se:condicoesprocura={        
        tabela:"Turma",
      campo1: "Codigo", 
      campo2:"Descricao",
       condicao:"vazio"
      }
      this._loginservice.getselection(se).subscribe({
        next: (data) => {
          if (data.sucesso) {            
            this.listaturm = data.dados.selects;
            this.listaaturmafilterr=this.listaalun;
            this.filteredOptionsturma = this.myControlturma.valueChanges.pipe(
              startWith(''),
              map(value => {
                const name = typeof value === 'string' ? value : value?.descricao;
                return name ? this._filter(name as string,this.listaaturmafilterr) : 
                this.optionslistaturmfilterr.slice();
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
   
   
   async getmoedas() {
      
      const se:condicoesprocura={
        tabela:"moedas",
      campo1: "MOEDA", 
      campo2:"descricao",
       condicao:"vazio"
      }
      this._loginservice.getselection(se).subscribe({
        next: (data) => {
          if (data.sucesso) {            
            this.listamoedass = data.dados.selects;
            this.myControlMoedas.setValue('MZN');
            this.moeda='MZN';
            this.listamoedassfilterr=this.listamoedass;
            this.filteredOptionsMoedas = this.myControlMoedas.valueChanges.pipe(
              startWith(''),
              map(value => {
                const name = typeof value === 'string' ? value : value?.descricao;
                return name ? this._filter(name as string,this.listamoedassfilterr)  : this.optionslistaMoedasfilterr.slice();
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
    async getcursos() {
      //Codcurso,Desccurso
      const se:condicoesprocura={
        tabela:"Curso",
      campo1: "Desccurso", 
      campo2:"Codcurso",
       condicao:"vazio"
      }
      this._loginservice.getselection(se).subscribe({
        next: (data) => {
          if (data.sucesso) {            
            this.listacursosssss = data.dados.selects;
            this.listacursosssssfilterr=this.listacursosssss;
            this.filteredOptionscurso = this.myControlcurso.valueChanges.pipe(
              startWith(''),
              map(value => {
                const name = typeof value === 'string' ? value : value?.descricao;
                return name ? this._filter(name as string,this.listacursosssssfilterr)  : this.optionslistacursofilterr.slice();
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
    async getplanocurricular() {
      const se:condicoesprocura={
        tabela:"Grade",
      campo1: "Descricao", 
      campo2:"Codigo",
       condicao:"vazio"
      }
      this._loginservice.getselection(se).subscribe({
        next: (data) => {
          if (data.sucesso) {            
            this.listaplanossss = data.dados.selects;

            this.listaplanossssfilterr=this.listaplanossss;
            this.filteredOptionsplano= this.myControlplano.valueChanges.pipe(
              startWith(''),
              map(value => {
                const name = typeof value === 'string' ? value : value?.descricao;
                return name ? this._filter(name as string,this.listacursosssssfilterr) : this.optionslistaplanofilterr.slice();
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

    async getetapasem() {
      //select Semstamp,Codigo from Sem order by Ordem
      const se:condicoesprocura={
        tabela:"Sem",
      campo1: "Descricao", 
      campo2:"Codigo",
       condicao:"vazio"
      }
      this._loginservice.getselection(se).subscribe({
        next: (data) => {
          if (data.sucesso) {            
            this.listaanosem = data.dados.selects;
            this.listaplanossssfilterr=this.listaplanossss;
            this.filteredOptionsplano= this.myControlplano.valueChanges.pipe(
              startWith(''),
              map(value => {
                const name = typeof value === 'string' ? value : value?.descricao;
                return name ? this._filter(name as string,this.listaplanossssfilterr) : this.optionslistaplanofilterr.slice();
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
    async getdisciplinas() {
      //Referenc,Descricao
      const se:condicoesprocura={
        tabela:"st",
      campo1: "Descricao", 
      campo2:"Referenc",
       condicao:"vazio"
      }
      this._loginservice.getselection(se).subscribe({
        next: (data) => {
          if (data.sucesso) {            
            this.listadisc = data.dados.selects;
            this.listadisciplinafilterr=this.listadisc;
            this.filteredOptionsdisciplinas= this.myControldisciplinas.valueChanges.pipe(
              startWith(''),
              map(value => {
                const name = typeof value === 'string' ? value : value?.descricao;
                return name ? this._filter(name as string,this.listadisciplinafilterr) : this.optionsdisciplinasfilterr.slice();
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
    displayFn(user: selects): string {
      
      return user && user.descricao ? user.descricao : '';
    }
  
    // private _filter(name: string): selects[] {
    //   const filterValue = name.toLowerCase();  
    //   return this.listaalunosfilterr.filter(option => option.descricao.toLowerCase().includes(filterValue));
    // }
    private _filter(name: string,list:selects[]): selects[] {
      const filterValue = name.toLowerCase();  
      return list.filter(option => option.descricao.toLowerCase().includes(filterValue));
    }
    
   
    public filteredList2 = this.listaalun.slice();
    ngOnInit(): void { 
    this.getmoedas();
    this.getAlunos();
    this.getturmas();  
    this.getcursos();    
    this.getdisciplinas();
    this.getplanocurricular();
    this.getetapasem();
    this.getCcusto();
    }
    closeDialog(){
      this.modalActual.close("true");   
    }
}


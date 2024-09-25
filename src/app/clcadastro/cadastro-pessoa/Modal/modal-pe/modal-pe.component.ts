


import { formatDate } from '@angular/common';
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { Observable, finalize, map, startWith } from 'rxjs';
import { Alauxiliar } from 'src/Models/Alauxiliar';
import { cllingview, condicoesprocura, contacorrentelista, gradelviw, selects } from 'src/Models/CampoSessoes';
import { Cldocview, Clfamview, Clview } from 'src/Models/Cldocs';
import { Pedisc } from 'src/Models/Pedisc';
import { Pedoc } from 'src/Models/Pedoc';
import { Pefam } from 'src/Models/Pefam';
import { pecadastroview } from 'src/Models/pecadastroview';
import { pelingview } from 'src/Models/pelingview';
import { EmailServiceService } from 'src/Service/EmailService/EmailService/email-service.service';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { Peservice } from 'src/Service/Peservice/peservice';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { Matriculaservice } from 'src/app/Portal-da-Secretaria/MatriculaAluno/matriculaservice';
import { Userss } from 'src/app/modalrelatorio/modalrelatorio/modalrelatorio.component';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-pe',
  templateUrl: './modal-pe.component.html',
  styleUrls: ['./modal-pe.component.scss']
})
export class ModalPeComponent implements OnInit, AfterViewInit {

  working = false;
  uploadFile!: File | null;
  uploadFiledd!: any;
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
  ReferenciaPe:number=0;
  

    constructor(
  
    private fb:FormBuilder,
    private turmanotaservice: TurmaNotaService,private http: HttpClient,private sanitizer:
     DomSanitizer,
     private _loginservice: LoginServiceService,
     private matriculaservice: Matriculaservice,
     private modalActual: MatDialogRef<ModalPeComponent>,
     private _peservice: Peservice,
     private emailservice: EmailServiceService,
     @Inject(MAT_DIALOG_DATA) public dadosProfessor: pecadastroview,
     private cdRef: ChangeDetectorRef,
  )
  {

        const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 60, 0, 1);
    this.maxDate = new Date(currentYear -18, 11, 31);


    this.cadastro = this.fb.group({
      pestamp: this.clstampvliw,
      no: ['', [Validators.required]],
      nome:['', [Validators.required]],
      nuit:[ 0, [Validators.required]],
      bi: ['', [Validators.pattern(/^\d{12}[A-Z]$/)]],
      codsit: 0,
      situacao: ['', [Validators.required]],
      datanasc: new Date(1900,1,1),
      dataAdmissao: new Date(1900,1,1),
      dataFimContrato:new Date(1900,1,1),
      dataDemissao: new Date(1900,1,1),
      sexo: ['', [Validators.required]],
      ecivil: '',
      dcasa: new Date(1900,1,1),
      nacional: ['',[Validators.required]],
      pais: ['', [Validators.required]],
      provNasc: ['', [Validators.required]],
      distNasc: ['', [Validators.required]],
      padNasc: '',
      bairro: '',
      provMorada: '',
      distMorada: '',
      padMorada: '',
      locali: '',
      pai: ['', [Validators.required]],
      mae: ['', [Validators.required]],
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
      dataInss: '',
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
      dataApoliceIn: new Date(),
      dataApoliceTer: new Date(),
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
      email: ['', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      pefamview: [],
      pedocview: [],
      pelingview: [],
      pediscview:[],
      



clview : this.fb.group({     
    
     
    }),
    clfamview: this.fb.group({
      items: this.fb.array([]),
    }),
    Docsview: this.fb.group({
      Docs: this.fb.array([]),

    }),

    
    Bolsaview: this.fb.group({
      bols: this.fb.array([]),

    }),
    Linguasview: this.fb.group({
      linguaqw: this.fb.array(['']),
    }),
    mancfam: this.fb.array([]),
    datanascimento:[new Date()],
    datacasamento:[new Date()],
    dataingresso:[''],
    valorprpina:[''],
  })


  }


  isSpinnerDisplayed: boolean =false
  minDate!: Date;
  maxDate!: Date;
  SelecteDate!: Date;
  dataprov: any
closeDialog() {
  
  this.modalActual.close("true");
}

myControl = new FormControl<string | selects>('');
options: selects[] = [];
filteredOptions!: Observable<selects[]>;  
// private _filter1(name: string): selects[] {
//   const filterValue = name.toLowerCase();

//   return this.options.filter(option => option.descricao.toLowerCase().includes(filterValue));
// }


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
this.cadastro.patchValue({sexo:this.sexo})
}  
Setestadoscivil(item:selects){
  this.estadocivil=item.descricao;
  this.cadastro.patchValue({ecivil:this.estadocivil})
    }





myControlprovincia = new FormControl<string | selects>('');
optionsprovincia: selects[] = [];
filteredOptionsprovincia!: Observable<selects[]>;




//Filtro de provincia local emissao
myControlprovinciamorada = new FormControl<string | selects>('');
optionsprovinciamorada: selects[] = [];
filteredOptionsprovinciamorada!: Observable<selects[]>;
listaprovincia: selects[] = [];  
listaaprovinciafilterr: selects[] = [];


myControldistritomorada = new FormControl<string | selects>('');
optionslistadistritomorada: selects[] = [];
filteredOptionsdistritomorada!: Observable<selects[]>;

myControlPadmorada = new FormControl<string | selects>('');
optionslistaPadmorada: selects[] = [];
filteredOptionsPadmorada!: Observable<selects[]>;


//Filtro de paises  local nasciment
myControlpaises = new FormControl<string | selects>('');
optionslistapaises: selects[] = [];
filteredOptionspaises!: Observable<selects[]>;
//listapaises: selects[] = [];



myControlNacionalidd = new FormControl<string | selects>('');
optionslistaNacionalidd : selects[] = [];
filteredOptionsNacionalidd !: Observable<selects[]>;






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


//Posto nascimento
myControlPad = new FormControl<string | selects>('');
optionslistaPad: selects[] = [];
filteredOptionsPad!: Observable<selects[]>;



myControllocalemissao = new FormControl<string | selects>('');
optionsemissao: selects[] = [];
filteredOptionsemissao!: Observable<selects[]>;  

myControlbi = new FormControl<string | selects>('');
optionsbi: selects[] = [];
filteredOptionsbi!: Observable<selects[]>;  
async  getDocumenetis() {
const se:condicoesprocura={
  tabela:"PeAuxiliar",
campo1: "descricao", 
campo2:"descricao",
 condicao:"tabela =1"
}
this._loginservice.getselectionPost(se).subscribe({
  next: (data) => {
    if (data.sucesso) {            
      this.optionsbi = data.dados.selects;        
      this.filteredOptionsbi = this.myControlbi.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,this.optionsbi) : this.optionsbi.slice();
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

async  getPaises() {
const se:condicoesprocura={
  tabela:"Paise",
campo1: "descricao", 
campo2:"codigo",
 condicao:"vazio"
}
this._loginservice.getselectionPost(se).subscribe({
  next: (data) => {
    if (data.sucesso) {            
      this.optionslistapaises = data.dados.selects;
      
      this.filteredOptionspaises = this.myControlpaises.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,this.optionslistapaises) : this.optionslistapaises.slice();
        }),
      );

      this.optionslistaNacionalidd = data.dados.selects;
      
      this.filteredOptionsNacionalidd = this.myControlNacionalidd.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,this.optionslistaNacionalidd) : this.optionslistaNacionalidd.slice();
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
getProvi() {
const se:condicoesprocura={
  tabela:"Prov",
campo1: "descricao", 
campo2:"codprov",
 condicao:"vazio"
}
this._loginservice.getselectionPost(se).subscribe({
  next: (data) => {
    if (data.sucesso) {            
      this.options = data.dados.selects;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,this.options) : this.options.slice();
        }),
      );

      this.optionsprovinciamorada = data.dados.selects;
      this.filteredOptionsprovinciamorada = this.myControlprovinciamorada.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,this.optionsprovinciamorada) : this.optionsprovinciamorada.slice();
        }),
      );

      this.optionsprovincia= data.dados.selects;
      this.filteredOptionsprovincia = this.myControlprovincia.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,this.optionsprovincia) : this.optionsprovincia.slice();
        }),
      );



      this.optionsemissao = data.dados.selects;
      this.filteredOptionsemissao = this.myControllocalemissao.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,this.optionsemissao) : this.optionsemissao.slice();
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

async Getsexo(){ 
const se:condicoesprocura={
  tabela:"peauxiliar",
campo1: "descricao", 
campo2:"descricao",
 condicao:"tabela=8"
}

this._loginservice.getselectionPost(se).subscribe({
  next: (data) => {
    if (data.sucesso) {            
      this.optionssexo = data.dados.selects;
      this.filteredOptionssexo = this.myControlsexo.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,this.optionssexo) : this.optionssexo.slice();
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




myControlstatuss = new FormControl<string | selects>('');
optionsstatuss: selects[] = [];
filteredOptionsstatuss!: Observable<selects[]>;  

@ViewChild('listastatuss') listastatuss!: MatSelect;
statuss:string='';
Setstatuss(item:selects){
this.statuss=item.descricao;

this.cadastro.patchValue({situacao:item.descricao})
  }
async Getstatuss(){ 
const se:condicoesprocura={
  tabela:"status",
campo1: "descricao", 
campo2:"codigo",
 condicao:"vazio"
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




myControlreliagiao = new FormControl<string | selects>('');
optionsreliagiao: selects[] = [];
filteredOptionsreliagiao!: Observable<selects[]>;  

@ViewChild('listareliagiao') listareliagiao!: MatSelect;
reliagiao:string='';
Setreliagiao(item:selects){
this.reliagiao=item.descricao;
  }
async Getreligiao(){ 
const se:condicoesprocura={
  tabela:"Alauxiliar",
campo1: "descricao", 
campo2:"descricao",
 condicao:"tabela=1"
}

this._loginservice.getselectionPost(se).subscribe({
  next: (data) => {
    if (data.sucesso) {            
      this.optionsreliagiao = data.dados.selects;
      this.filteredOptionsreliagiao = this.myControlreliagiao.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,this.optionsreliagiao) : this.optionsreliagiao.slice();
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
file: File | null = null; // Variable to store file
visibilidadedoc1:boolean=false;

onChange(event: any,i:number) {  
  const file: File = event.target.files[0];
if ( file) {
    var reader = new FileReader();
    reader.onload =this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
}
this.index=i;
  // let langArr = (<FormArray>this.cadastro.get('Docsview')?.get('Docs'));
  // langArr.controls[i].patchValue({file:file});
}
index:number=0;
_handleReaderLoaded(readerEvt:any) {
  var binaryString = readerEvt.target.result;
         this.base64textString= btoa(binaryString);

         
  let langArr = (<FormArray>this.cadastro.get('Docsview')?.get('Docs'));
  langArr.controls[this.index].patchValue({file:this.base64textString});
 }
private base64textString:String="";
  
  handleFileSelect(evt:any){
     
  }




myControlplanocurricular = new FormControl<string | selects>('');
optionsplanocurricular: selects[] = [];
filteredOptionsplanocurricular!: Observable<selects[]>;  

@ViewChild('listaplanocurricular') listaplanocurricular!: MatSelect;
planocurricular:string='';
planocurricularstamp:string='';
Setplanocurricular(item:selects){
this.planocurricular=item.descricao;
this.planocurricularstamp=item.chave;
this._loginservice.Getplanocurricularcurso(this.planocurricularstamp).subscribe({
next: (data) => {
  if (data.sucesso) {     
    this.dataSourcegradl = data.dados.dados
    
  } else {
    this._loginservice.mostrarAlerta("Nao foi possivel carregar", "Opps");
  }
},
error: (e) => {
  //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
}
});



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








myControlCurso = new FormControl<string | selects>('');
optionsCurso: selects[] = [];
filteredOptionsCurso!: Observable<selects[]>;  

@ViewChild('listaCurso') listaCurso!: MatSelect;
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


myControlgrauparen = new FormControl<string | selects>('');
optionsgrauparen: selects[] = [];
filteredOptionsgrauparen!: Observable<selects[]>;  

@ViewChild('listagrauparen') listagrauparen!: MatSelect;
grauparen:string='';
Setgrauparen(item:selects,i:number){
this.grauparen=item.descricao;
(<FormArray>this.cadastro.get('clfamview')?.get('items')).controls[i].value.grau= item.descricao


  }
async Getgrauparen(){ 
const se:condicoesprocura={
  tabela:"PeAuxiliar",
campo1: "descricao", 
campo2:"descricao",
 condicao:"tabela=7"
}

this._loginservice.getselectionPost(se).subscribe({
  next: (data) => {
    if (data.sucesso) {            
      this.optionsgrauparen = data.dados.selects;
      this.filteredOptionsgrauparen = this.myControlgrauparen.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,this.optionsgrauparen) : this.optionsgrauparen.slice();
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

async GetEstadocivil(){ 
const se:condicoesprocura={
  tabela:"peauxiliar",
campo1: "descricao", 
campo2:"descricao",
 condicao:"tabela=9"
}

this._loginservice.getselectionPost(se).subscribe({
  next: (data) => {
    if (data.sucesso) {            
      this.optionsestadociv = data.dados.selects;
      this.filteredOptionsestadociv = this.myControlestadociv.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,this.optionsestadociv) : this.optionsestadociv.slice();
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


async getDataGeral(tabela:string,campo1:string,campo2:string,condica:string,select:selects[]
,_filteredOptionsd:Observable<selects[]>,_controll=new FormControl<string | selects>('')

) {
const se:condicoesprocura={
  tabela:tabela,
campo1: campo1, 
campo2:campo2,
 condicao:condica
}
this._loginservice.getselectionPost(se).subscribe({
  next: (data) => {
    if (data.sucesso) {

      select = data.dados.selects;
      _filteredOptionsd = _controll.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,select) : select.slice();
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


padnascimento:string='';
padnascimentostamp:string='';


padmorada:string='';
padmoradastamp:string='';


paisnascimento:string='';

nacionalidade:string='';
pprovnascimento:string='';
codprovnascimento:number=0;
pprovnascimentostamp:string='';


pprovnascimentomorada:string='';
codprovnascimentomorada:number=0;
pprovnascimentostampmorada:string='';



distritomorada:string='';
distritostampmorada:string='';



distrnascimento:string='';
setpaisnascimento(value1:selects) {
this.paisnascimento=value1.descricao;
this.cadastro.patchValue({ pais:this.paisnascimento})
}


setpaisnacionalidade(value1:selects) {
this.nacionalidade=value1.descricao;
this.cadastro.patchValue({nacional:this.nacionalidade})
}
SetDistrito(value1:selects) {  
this.distrnascimento=value1.descricao;  
this. myControlPadmorada = new FormControl<string | selects>('');
let value = value1.chave;  
this.cadastro.patchValue({distNasc:this.distrnascimento})

const se:condicoesprocura={
  tabela:"pad",
campo1: "descricao", 
campo2:"Codpad",
 condicao:`Diststamp='${value}'`
}
this._loginservice.getselectionPost(se).subscribe({
  next: (data) => {
    if (data.sucesso) {            
      this.optionslistaPadmorada = data.dados.selects;        
      this.filteredOptionsPadmorada = this.myControlPadmorada.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,this.optionslistaPadmorada) : this.optionslistaPadmorada.slice();
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

Setpadnasc(value1:selects) {
this.padnascimento=value1.descricao;
this.padnascimentostamp=value1.chave;  
this.cadastro.patchValue({provNasc:this.padnascimento})
}

Setpadmorada(value1:selects) {
this.padmorada=value1.descricao;
this.padmoradastamp=value1.chave; 

this.cadastro.patchValue({padMorada:this.padmorada}) 
}
getDistrito(value1:selects) {
this. myControldistrito = new FormControl<string | selects>('');
this. myControlPad = new FormControl<string | selects>('');
let value = value1.chave;  

this.pprovnascimento=value1.descricao;
this.pprovnascimentostamp=value1.chave;
this.cadastro.patchValue({provNasc:this.pprovnascimento})
//this.codprovnascimento=value1.ordem;
const se:condicoesprocura={
  tabela:"Dist",
campo1: "descricao", 
campo2:"codDist",
 condicao:`Provstamp='${value}'`
}
this._loginservice.getselectionPost(se).subscribe({
  next: (data) => {
    if (data.sucesso) {            
      this.optionslistadistrito = data.dados.selects;        
      this.filteredOptionsdistrito = this.myControldistrito.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,this.optionslistadistrito) : this.optionslistadistrito.slice();
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


SetDistritomorada(value1:selects) {  
this.distritomorada=value1.descricao;  
this. myControlPadmorada = new FormControl<string | selects>('');
let value = value1.chave;  
this.cadastro.patchValue({distMorada:this.distritomorada})
const se:condicoesprocura={
  tabela:"pad",
campo1: "descricao", 
campo2:"Codpad",
 condicao:`Diststamp='${value}'`
}
this._loginservice.getselectionPost(se).subscribe({
  next: (data) => {
    if (data.sucesso) {            
      this.optionslistaPadmorada = data.dados.selects;        
      this.filteredOptionsPadmorada = this.myControlPadmorada.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,this.optionslistaPadmorada) : this.optionslistaPadmorada.slice();
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
getDistritomorada(value1:selects) {

this. myControldistritomorada = new FormControl<string | selects>('');
this. myControlPadmorada = new FormControl<string | selects>('');
 let value = value1.chave;  
 this.pprovnascimentomorada=value1.descricao;
 this.pprovnascimentostampmorada=value1.chave;
 this.cadastro.patchValue({provMorada
  :value1.descricao
 })
 const se:condicoesprocura={
   tabela:"Dist",
 campo1: "descricao", 
 campo2:"codDist",
  condicao:`Provstamp='${value}'`
 }
 this._loginservice.getselectionPost(se).subscribe({
   next: (data) => {
     if (data.sucesso) {            
       this.optionslistadistritomorada = data.dados.selects;        
       this.filteredOptionsdistritomorada = this.myControldistritomorada.valueChanges.pipe(
         startWith(''),
         map(value => {            
           const name = typeof value === 'string' ? value : value?.descricao;
           return name ? this._filter(name as string,this.optionslistadistritomorada) : this.optionslistadistritomorada.slice();
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



private _filter(name: string,list:selects[]): selects[] {
const filterValue = name.toLowerCase();  
return list.filter(option => option.descricao.toLowerCase().includes(filterValue));
}

onFileSelected(event:any): void {
  this.selectedFile = event.target.files[0];
}

upload(file:File){
  this.fileName = file.name
  const blob = new Blob([file], { type: file.type });
  this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
}

datanasc:Date=new Date();
cadastro!:FormGroup
Clfamlist: Pefam[]=[]
Cldocslist: Pedoc[]=[]
Pedisciplina: Pedisc[]=[]
DadosGerais!: pecadastroview
fotos: any  
datanascimento :Date=new Date();
dataingresso:string='';
valorprpina:string='';
grausr:string='';
foto: any
auxiliarclass:Alauxiliar[]=[{alauxiliarl:'', alauxiliarstamp :'',
  codigo :0,
  descricao :'',
  obs :'',
  padrao :false,
  tabela :0,
  desctabela :'',}]

clfamstamp: string=''
checked = false;
indeterminate = false;
labelPosition: 'before' | 'after' = 'after';
disabled = false;   
ddddd = 0;
  testadados:any;

  GetReference(tabela: string, campo: string, condica?:string){
    if(this.dadosProfessor.pestamp==''){
       if(tabela!=null && campo!= null){
          condica=''
         this.emailservice.Getreferencia(tabela,campo, condica).subscribe(data=>{
      
             if(data.dados>0 && data.sucesso==true){
          
              this.ReferenciaPe=data.dados
              if( this.dadosProfessor.pestamp==''){ 
            
              this.cadastro.patchValue({no:this.ReferenciaPe})
              }
             }
         })
       }
     }
     }

     ngAfterViewInit(): void {

     

      this.cdRef.detectChanges();
     }

 async ngOnInit() {
if( this.dadosProfessor.pestamp==''){

   await this. GetReference('Pe', 'no',  );
}

  this.testadados = this.dadosProfessor

this.displayedColumns= ['codigo','descricao','accoes','Datas','anosems','anolects','refs'   ];
this.dataSourceturma =  this.dataSource = this.auxiliarclass;
this.displayedColumnsturma= ['codigo','descricao' ];
this.displayedColumnsgridview= ['etapa','coddisc','displina'];
this.displayedColumnsfinanceiro= ['descricao','data','dataven','entidadebanc','valorreg'];

  this.getProvi();
   this.getPaises();
  this.Getsexo();
   this.GetEstadocivil();      
   this.Getreligiao();
  this.Getstatuss();
   this.Getgrauparen();
   this.GetCurso();
   this.GetDepartamento();
   this.GetFaculdade();
   this.Getccu1();
   this.Getfala();
   this.Getgrauparen();
  this.Getinstituicaoensino();
  this.Getlingua();
  this.Getnivelacademico();
   this.Getstatuss();
   this.Gettipoaluno();
   this.getDocumenetis();
 
if (this.dadosProfessor.pestamp != "" && this.dadosProfessor != null && 
     this.dadosProfessor.pestamp.length>0){ 
  
this.tituloacaco="Editar Professor"

this.botaoacao='Actualizar'
this.cadastro.patchValue({
  pestamp:  this.dadosProfessor.pestamp,
  no:  this.dadosProfessor.no,
  nome: this.dadosProfessor.nome,
  nuit: this.dadosProfessor.nuit,
  bi: this.dadosProfessor.bi,
  codsit:this.dadosProfessor.codsit ,
  situacao: this.dadosProfessor.situacao,
  datanasc: this.dadosProfessor.datanasc,
  dataAdmissao: this.dadosProfessor.dataAdmissao,
  dataFimContrato:  this.dadosProfessor.dataFimContrato,
  dataDemissao:  this.dadosProfessor.dataDemissao,
  sexo:  this.dadosProfessor.sexo,
  ecivil:  this.dadosProfessor.ecivil,
  dcasa:this.dadosProfessor.dcasa ,
  nacional: this.dadosProfessor.nacional ,
  pais: this.dadosProfessor.pais ,
  provNasc: this.dadosProfessor.provNasc ,
  distNasc: this.dadosProfessor.distNasc ,
  padNasc: this.dadosProfessor.padNasc ,
  bairro: this.dadosProfessor.bairro ,
  provMorada:this.dadosProfessor.provMorada ,
  distMorada:this.dadosProfessor.distMorada ,
  padMorada:this.dadosProfessor.padMorada ,
  locali:this.dadosProfessor.locali ,
  pai:this.dadosProfessor.pai ,
  mae:this.dadosProfessor.mae ,
  codNivel:this.dadosProfessor.codNivel ,
  nivel:this.dadosProfessor.nivel ,
  codCateg:this.dadosProfessor.codCateg ,
  categ:this.dadosProfessor.categ ,
  codprof:this.dadosProfessor.codprof ,
  prof:this.dadosProfessor.prof ,
  codep:this.dadosProfessor.codep ,
  depart:this.dadosProfessor.depart ,
  codrep:this.dadosProfessor.codrep ,
  repart:this.dadosProfessor.repart ,
  nrinss:this.dadosProfessor.nrinss ,
  balcaoInss:this.dadosProfessor.balcaoInss,
  dataInss:this.dadosProfessor.dataInss ,
  relPonto:this.dadosProfessor.relPonto ,
  valBasico:this.dadosProfessor.valBasico ,
  horasdia:this.dadosProfessor.horasdia ,
  nrdepend:this.dadosProfessor.nrdepend ,
  obs:this.dadosProfessor.obs ,
  codtipo:this.dadosProfessor.codtipo ,
  tipo:this.dadosProfessor.tipo ,
  codccu:this.dadosProfessor.codccu,
cCusto:this.dadosProfessor.cCusto ,
  ccustamp:this.dadosProfessor.ccustamp ,
  diasmes:this.dadosProfessor.diasmes,
  horasSemana:this.dadosProfessor.horasSemana ,
  salHora:this.dadosProfessor.salHora ,
  tabIrps:this.dadosProfessor.tabIrps ,
  codRepFinancas:this.dadosProfessor.codRepFinancas ,
  descRepFinancas:this.dadosProfessor.descRepFinancas ,
  apolice:this.dadosProfessor.apolice ,
  dataApoliceIn:this.dadosProfessor.dataApoliceIn ,
  dataApoliceTer:this.dadosProfessor.dataApoliceTer ,
  seguradora:this.dadosProfessor.seguradora ,
  moeda:this.dadosProfessor.moeda ,
  naoInss:this.dadosProfessor.naoInss ,
  naoIRPS:this.dadosProfessor.naoIRPS ,
  tirpsstamp:this.dadosProfessor.tirpsstamp ,
  ntabelado:this.dadosProfessor.ntabelado ,
  pontonome:this.dadosProfessor.pontonome ,
  formapag:this.dadosProfessor.formapag ,
  codformp:this.dadosProfessor.codformp ,
  dataadm:this.dadosProfessor.dataadm ,
  reDataadm:this.dadosProfessor.reDataadm ,
  basedia:this.dadosProfessor.basedia ,
  Pedagogico:this.dadosProfessor.pedagogico ,
  coordenador:this.dadosProfessor.coordenador ,
  email:this.dadosProfessor.email ,

});
if  (this.dadosProfessor.pedocview!=null &&this.dadosProfessor.pedocview!=undefined&&this.dadosProfessor.pedocview.length>0){ 
  this.carregarDocs(this.dadosProfessor.pedocview);
}

if(this.dadosProfessor.pelingview!=null &&this.dadosProfessor.pelingview!=undefined&& this.dadosProfessor.pelingview.length>0){
  this.carregarlinguas(this.dadosProfessor.pelingview);
}

if(this.dadosProfessor.pefamview!=null &&this.dadosProfessor.pefamview!=undefined&&this.dadosProfessor.pefamview.length>0){
  this.CarregaragrdadosFamil(this.dadosProfessor.pefamview);
};

if(this.dadosProfessor.pediscview!=null &&this.dadosProfessor.pediscview!=undefined&&this.dadosProfessor.pediscview.length>0){

  this.carregardisciplina(this.dadosProfessor.pediscview);
};

this.myControlNacionalidd.setValue(this.dadosProfessor.nacional);
this.myControl.setValue(this.dadosProfessor.provNasc);
this.myControldistrito.setValue(this.dadosProfessor.distNasc);
this.myControlPad.setValue(this.dadosProfessor.padNasc );
this.myControlestadociv.setValue(this.dadosProfessor.ecivil);
this.myControlsexo.setValue(this.dadosProfessor.sexo);
this.myControltipoaluno.setValue(this.dadosProfessor.tipo);
this.myControlprovinciamorada.setValue(this.dadosProfessor.provMorada);
this.myControldistritomorada.setValue(this.dadosProfessor.distMorada);
this.myControlPadmorada.setValue(this.dadosProfessor.padMorada);
this.myControlstatuss.setValue(this.dadosProfessor.situacao);
this.myControlestadociv
this.clstampvliw= this.dadosProfessor.pestamp;

this.cadastro.patchValue({pestamp:this.clstampvliw})
}else{
this.tituloacaco="Novo Professor"
  this.botaoacao='Salvar'  
this.clstampvliw= this.turmanotaservice.Stamp();

//const tttttt = this.matriculaservice.ConvertDate(this.dadosProfessor.datanasc)
this.cadastro.patchValue({pestamp:this.clstampvliw})
//console.log(tttttt)
 }

}
tituloacaco:string='';
botaoacao:string='';




  Cadastrar( ){

    const DateNasci = this.matriculaservice.ConvertDate(this.cadastro.value.datanasc);
    const DateEmissao = this.matriculaservice.ConvertDate(this.cadastro.value.dataAdmissao);
    const DateFimcontra = this.matriculaservice.ConvertDate(this.cadastro.value.dataFimContrato);
    const DateDemissao = this.matriculaservice.ConvertDate(this.cadastro.value.dataDemissao);
   const Datacasament = this.matriculaservice.ConvertDate(this.cadastro.value.dcasa);

    this.Clfamlist=this.cadastro.value.clfamview.items;
    this.Cldocslist = this.cadastro.value.Docsview.Docs;
    let linguas=this.cadastro.value.mancfam;
    this.Pedisciplina=this.cadastro.value.Bolsaview.bols
 
    const cl:pecadastroview={
      pestamp: this.cadastro.value.pestamp,
      no:this.cadastro.value.no,
      nome:this.cadastro.value.nome,
      nuit:this.cadastro.value.nuit,
      bi:this.cadastro.value.bi,
      codsit:this.cadastro.value.codsit,
      situacao:this.cadastro.value.situacao,
      datanasc:new Date(DateNasci) ,
      dataAdmissao:new Date(DateEmissao),
      dataFimContrato:new Date(DateFimcontra),
      dataDemissao:new Date(DateDemissao),
      sexo:this.cadastro.value.sexo,
      ecivil:this.cadastro.value.ecivil,
      dcasa:new Date(Datacasament),
      nacional: this.cadastro.value.nacional,
      pais:this.cadastro.value.pais,
      provNasc:this.cadastro.value.provNasc,
      distNasc: this.cadastro.value.distNasc,
      padNasc:this.cadastro.value.padNasc,
      bairro:this.cadastro.value.bairro,
      provMorada:this.cadastro.value.provMorada,
      distMorada:this.cadastro.value.distMorada,
      padMorada:this.cadastro.value.padMorada,
      locali:this.cadastro.value.locali,
      pai:this.cadastro.value.pai,
      mae:this.cadastro.value.mae,
      codNivel:this.cadastro.value.codNivel,
      nivel:this.cadastro.value.nivel,
      codCateg:this.cadastro.value.codCateg,
      categ:this.cadastro.value.categ,
      codprof:this.cadastro.value.codprof,
      prof:this.cadastro.value.prof,
      codep:this.cadastro.value.codep,
      depart:this.cadastro.value.depart,
      codrep:this.cadastro.value.codrep,
      repart:this.cadastro.value.repart,
      nrinss:this.cadastro.value.nrinss,
      balcaoInss:this.cadastro.value.balcaoInss,
      dataInss:this.cadastro.value.dataInss,
      relPonto:this.cadastro.value.relPonto,
      valBasico:this.cadastro.value.valBasico,
      horasdia:this.cadastro.value.horasdia,
      nrdepend:this.cadastro.value.nrdepend,
      obs:this.cadastro.value.obs,
      codtipo:this.cadastro.value.codtipo,
      tipo:this.cadastro.value.tipo,
      codccu:this.cadastro.value.codccu,
    cCusto:this.cadastro.value.cCusto,
      ccustamp:this.cadastro.value.ccustamp,
      diasmes:this.cadastro.value.diasmes,
      horasSemana:this.cadastro.value.horasSemana,
      salHora:this.cadastro.value.salHora,
      tabIrps:this.cadastro.value.tabIrps,
      codRepFinancas:this.cadastro.value.codRepFinancas,
      descRepFinancas:this.cadastro.value.descRepFinancas,
      apolice:this.cadastro.value.apolice,
      dataApoliceIn:this.cadastro.value.dataApoliceIn,
      dataApoliceTer:this.cadastro.value.dataApoliceTer,
      seguradora:this.cadastro.value.seguradora,
      moeda:this.cadastro.value.moeda,
      naoInss:this.cadastro.value.naoInss,
      naoIRPS:this.cadastro.value.naoIRPS,
      tirpsstamp:this.cadastro.value.tirpsstamp,
      ntabelado:this.cadastro.value.ntabelado,
      pontonome:this.cadastro.value.pontonome,
      formapag:this.cadastro.value.formapag,
      codformp:this.cadastro.value.codformp,
      dataadm:this.cadastro.value.dataadm,
      reDataadm:this.cadastro.value.reDataadm,
      basedia:this.cadastro.value.basedia,
      pedagogico: false,
      coordenador:this.cadastro.value.coordenador,
      email:this.cadastro.value.email,
      pefamview: [],
      pedocview: [],
      pelingview: [],
      pediscview: [],
    }
    
      cl.pefamview=this.Clfamlist;
      cl.pedocview=this.Cldocslist
      cl.pelingview=linguas;
      cl.pediscview = this.Pedisciplina


  
      const dadosssss=cl;
      if(cl.nome.length<=0){
        Swal.fire('Erro!', 'Caro Utilizador,o campos Nome é obrigatorio!', 'error');
        return
      }
      else if(cl.no.length<=0){
        Swal.fire('Erro!', 'Caro Utilizador,o campos Referencia é obrigatorio!', 'error');
        return
      }
      // else if(cl.situacao.length<=0){
      //   Swal.fire('Erro!', 'Caro Utilizador,o campos situacao é obrigatorio!', 'error');
      //   return
      // }
      // else if(cl.pais.length<=0){
      //   Swal.fire('Erro!', 'Caro Utilizador,o campos Pais é obrigatorio!', 'error');
      // }
      else if(cl.nuit<=2){
        Swal.fire('Erro!', 'Caro Utilizador,o campos Nuit é obrigatorio!', 'error');
        return
      }
      // else if(cl.sexo.length<=0){
      //   Swal.fire('Erro!', 'Caro Utilizador,o campos Sexo é obrigatorio!', 'error');
      //   return
      // }

      else{

      if(cl.pedocview.length<=0 ){
        Swal.fire('Erro!', 'Caro Utilizador, preencha os campos de documentos do professor!', 'error');
        return
      }
      else{
  
      
        this.isSpinnerDisplayed = true
      const formData = new FormData();     
      this.uploadFileLabel = this.uploadFile?.name;
      formData.append("ficheiro",  this.uploadFiledd);   
      const _dadoscl=dadosssss
      var json_arr = JSON.stringify(_dadoscl);  
      
      formData.append("pe",json_arr); 
      const url = `${environment.APIurl}Pe/UploadFile`;
      const uploadReq = new HttpRequest('POST', url, formData, {
        reportProgress: true,
      });
      this.uploadUrl = '';
      this.uploadProgress = 0;
      this.working = true;
      this.http.request(uploadReq).pipe(
        finalize(() => this.isSpinnerDisplayed = false)
      ).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {

          Swal.fire('Sucesso!', 'Operação executada com sucesso', 'success');
          this.closeDialog();
        }
      }, (error: any) => {
        Swal.fire('Erro!', `Não foi possivel executar a operação `, 'error'); 
      }).add(() => {
        this.working = false;
      });
    
    return;
  }
      }
    }



  //------------------------------------------------------------------------------------------------------------------------------------------
myControlccu1 = new FormControl<string | selects>('');
optionsccu1: selects[] = [];
filteredOptionsccu1!: Observable<selects[]>;  



@ViewChild('listaccu1') listaccu1!: MatSelect;
ccu1:string='';
ccu1stamp:string='';
Setccu1(item:selects){
this.ccu1=item.descricao;  
this.ccu1stamp=item.chave;
  }
async Getccu1(){ 
const se:condicoesprocura={
  tabela:"ccu",
campo1: "descricao", 
campo2:"CodCcu",
 condicao:"vazio"
}

this._loginservice.getselectionPost(se).subscribe({
  next: (data) => {
    if (data.sucesso) {            
      this.optionsccu1 = data.dados.selects;
      this.filteredOptionsccu1 = this.myControlccu1.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,this.optionsccu1) : this.optionsccu1.slice();
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


myControlDepartamento = new FormControl<string | selects>('');
optionsDepartamento: selects[] = [];
filteredOptionsDepartamento!: Observable<selects[]>;  

@ViewChild('listaDepartamento') listaDepartamento!: MatSelect;
Departamento:string='';
Departamentostamp:string='';
SetDepartamento(item:selects){
this.Departamento=item.descricao;
this.Departamentostamp=item.chave;
  }
async GetDepartamento(){ 
const se:condicoesprocura={
  tabela:"Ccudep",
campo1: "descricao", 
campo2:"Codigo",
 condicao:"vazio"
}

this._loginservice.getselectionPost(se).subscribe({
  next: (data) => {
    if (data.sucesso) {            
      this.optionsDepartamento = data.dados.selects;
      this.filteredOptionsDepartamento = this.myControlDepartamento.valueChanges.pipe(
        startWith(''),
        map(value => {            
          const name = typeof value === 'string' ? value : value?.descricao;
          return name ? this._filter(name as string,this.optionsDepartamento) : this.optionsDepartamento.slice();
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
@ViewChild('listaFaculdade') listaFaculdade!: MatSelect;
Faculdade:string='';
Faculdadestamp:string='';
SetFaculdade(item:selects){
this.Faculdade=item.descricao;
this.Faculdadestamp=item.chave;
  }
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

  myControlnivelacademico = new FormControl<string | selects>('');
  optionsnivelacademico: selects[] = [];
  filteredOptionsnivelacademico!: Observable<selects[]>;  
  
  @ViewChild('listanivelacademico') listanivelacademico!: MatSelect;
  nivelacademico:string='';
  Setnivelacademico(item:selects){
    this.nivelacademico=item.descricao;
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
          this.optionsnivelacademico = data.dados.selects;
          this.filteredOptionsnivelacademico = this.myControlnivelacademico.valueChanges.pipe(
            startWith(''),
            map(value => {            
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsnivelacademico) : this.optionsnivelacademico.slice();
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
this.cadastro.patchValue({
  tipo:  this.tipoaluno
  })

      }
  async Gettipoaluno(){ 
    const se:condicoesprocura={
      tabela:"PeAuxiliar",
    campo1: "descricao", 
    campo2:"codigo",
     condicao:"Tabela=24"
    }
    //select descricao from PeAuxiliar where tabela =24
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {            
          this.optionstipoaluno = data.dados.selects;
          this.filteredOptionstipoaluno = this.myControltipoaluno.valueChanges.pipe(
            startWith(''),
            map(value => {            
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionstipoaluno) : this.optionstipoaluno.slice();
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


  myControltipobolsa = new FormControl<string | selects>('');
  optionstipobolsa: selects[] = [];
  filteredOptionstipobolsa!: Observable<selects[]>;  
  



  options1: Userss[] = [
    { name: 'Mary' },
    { name: 'Shelley' },
    { name: 'Igor' }
  ];
  filteredOptions11: Observable<Userss[]>[] = [];
  


  @ViewChild('listatipobolsa') listatipobolsa!: MatSelect;
  tipobolsa:string='';
  tipobolsastamp:string='';
  Settipobolsa(item:selects,i:number){
    this.tipobolsa=item.descricao;
  this.tipobolsastamp=item.chave;
     
this.visibilidadebolsa=true;

(<FormArray>this.cadastro.get('Bolsaview')?.get('bols')).controls[i].value.tipobolsa= item.descricao


      }

      
  myControlinstituicaoensino = new FormControl<string | selects>('');
  optionsinstituicaoensino: selects[] = [];
  filteredOptionsinstituicaoensino!: Observable<selects[]>;  
  filteredOptions1: Observable<selects[]>[] = [];
  myControlinstituicaoensinoa = new FormControl<string | selects>('');

  myForm!: FormGroup;

  ManageNameControla(index: number) {
    //let arrayControl = (<FormArray> this.cadastro.get('Bolsaview')?.get('bols')) as FormArray;

    
    // (<FormArray> this.cadastro.get('Bolsaview')?.get('bols')).controls[index].value.sigla.setValue("Aniva")
     }


  ManageNameControl(item:selects,index: number) {
    let arrayControl = (<FormArray> this.cadastro.get('Bolsaview')?.get('bols')) as FormArray;
    if(arrayControl==null)return;




    //(<FormArray> this.cadastro.get('Bolsaview')?.get('bols')).controls[index].value.sigla


    //var arrayControl = this.myForm.get('items') as FormArray;
  let fff= arrayControl.at(index).get('sigla');//s controls;


    // this.filteredOptions1[index] = (<FormArray> this.cadastro.get('Bolsaview')?.get('bols')).controls[index]?.value.valueChanges-
    //   .pipe(
    //   startWith<string | selects>(''),
    //   map(value => typeof value === 'string' ? value : value.descricao),
    //   map(name => name ? this._filter(name as string,this.optionsinstituicaoensino) : this.optionsinstituicaoensino.slice())
    //   );

  }
  @ViewChild('listainstituicaoensino') listainstituicaoensino!: MatSelect;
  sigla:string='';
  disciplina:string='';
  ststamp:string='';
  Setinstituicaoensino(item:selects,i:number){
    this.onSelectbi11(item, i)
    this.sigla=item.ordem;
  this.ststamp=item.chave;   
  this.disciplina =item.descricao;
this.visibilidadebolsa=true; 
(<FormArray> this.cadastro.get('Bolsaview')?.get('bols')).controls[i].value.sigla= item.ordem;
(<FormArray> this.cadastro.get('Bolsaview')?.get('bols')).controls[i].value.disciplina= item.descricao;
  (<FormArray> this.cadastro.get('Bolsaview')?.get('bols')).controls[i].value.ststamp= item.chave



//this. myControlinstituicaoensino.setValue(this.sigla);

//this. myControltipobolsa.setValue(this.disciplina);

      }


      onSelectbi11(item:selects,i:number) {

        let langArr = (<FormArray> this.cadastro.get('Bolsaview')?.get('bols'))
        langArr.controls[i].patchValue({
      
            pediscstamp :item.chave,
  disciplina :item.descricao,
  sigla :item.ordem,
              })
                
      
      }
  async Getinstituicaoensino(){ 

    //referenc,Descricao,Ststamp from ST where disciplina=1
    const se:condicoesprocura={
      tabela:"ST",
    campo1: "descricao", 
    campo2:"referenc",
     condicao:"disciplina=1"
    }
    
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {            
          this.optionsinstituicaoensino = data.dados.selects;



          this.filteredOptionsinstituicaoensino = this.myControlinstituicaoensino.valueChanges.pipe(
            startWith(''),
            map(value => {            
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsinstituicaoensino) : this.optionsinstituicaoensino.slice();
            }),
          );


          this.optionstipobolsa= data.dados.selects;
          this.filteredOptionstipobolsa = this.myControltipobolsa.valueChanges.pipe(
            startWith(''),
            map(value => {            
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionstipobolsa) : this.optionstipobolsa.slice();
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


  array!:Blob
//--------------------------------------------------Adiciona imagem-------------------------------------------


  onFileChange(event:any) {
    const reader = new FileReader();   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);    
      reader.onload = () => {
       this.fotos=reader.result
      };
      this.uploadFile = event.target.files[0];
      this.uploadFileLabel = this.uploadFile?.name;
      this.uploadFiledd= event.target.files[0];
    }
  }



//-------------------------------------------------Fim CAdastro-----------------------------------------------------------



total:number=0;

//------------------------------------------------Documentos----------------------------------------------------------
get Docs(): FormArray {
 
  return this.cadastro.get('Docsview')?.get('Docs') as FormArray;
 }

 //---------------------------------------------------disciplina-----------------------------------------------------
 get bolss(): FormArray {  
  
  return this.cadastro.get('Bolsaview')?.get('bols') as FormArray;
 }


Disciplinas(): FormArray {
  return this.cadastro.get('Bolsaview')?.get('bols') as FormArray;
  }
//---------------------------------------------------------------------------------------------------------------------

//-----------------------------------Agregado Familiar-----------------------------------------------------------------
get items(): FormArray {
 
 return this.cadastro.get('clfamview')?.get('items') as FormArray;
}
//----------------------------------------------------------------------------------------------------------------------

@ViewChild('listapaise') listapaise!: MatSelect;
@ViewChild('listaprovincias') listaprovincias!: MatSelect;
@ViewChild('listadistritos') listadistritos!: MatSelect;
@ViewChild('listasexoss') listasexoss!: MatSelect;
@ViewChild('listaestadocivils') listaestadocivils!: MatSelect;

onSelectpais(value:selects) {
this.paisstamp=value.chave;
this.descricaopais=value.descricao;
}
onSelectprovincia(value:selects,i:number) {
this.Provinciastamp=value.chave;
this.descricaoProvincia=value.descricao;

(<FormArray>this.cadastro.get('Docsview')?.get('Docs')).controls[i].value.localemis= this.descricaoProvincia


}
onSelectbi(value:selects,i:number) {
(<FormArray>this.cadastro.get('Docsview')?.get('Docs')).controls[i].value.documento= value.descricao

}
//select descricao from PeAuxiliar where tabela =1
onSelectdistrito(value:selects) {

this.distritostamp=value.chave;
this.descricaodistrito=value.descricao;
}

visibilidadeagregado:boolean=false;
clstampvliw: string='';
adicionarItem() {

  this.visibilidadeagregado=true;
let stamp =this.turmanotaservice.Stamp();
  this.items.push(this.fb.group({
    pefamstamp :[stamp],
    pestamp:[this.clstampvliw],
    nome :[''],
    grau :[''],
    tel :[''],
    email :[''],
  }));
}

removerItem(index: number) {
  this.items.removeAt(index);
  var lets= this.cadastro.get('clfamview')?.get('items') as FormArray
  if(lets.length>0){
  this.visibilidadeagregado=true;
  }  else{  
  this.visibilidadeagregado=false;
  }
}
//-----------------------------------------------------------------------------------------------------------------------
visibilidadedoc:boolean=false;
visibilidadebolsa:boolean=false;
visibilidadelingua:boolean=false;
//------------------------------------------Adiciona e remove linhas do docs---------------------------------------------
adicionarDocs() {
//this. myControlbi = new FormControl<string | selects>('');
//this. myControlprovincia = new FormControl<string | selects>('');
this.visibilidadedoc=true;
let stamp =this.turmanotaservice.Stamp();
this.Docs.push(this.fb.group({
  pedocstamp : [stamp],
  pestamp :[this.clstampvliw],
  documento : [''],
  numero: [''] ,
  local:[''],
  emissao :[new Date()],
  validade : [new Date()],
  bi :[false],
  file :[''],
}));
}



addDisciplinasPe() {


  // this.Disciplinas().push(this.adicionardiciplinas())
  this.adicionardiciplinas()
  }


adicionardiciplinas(){

//  let pedisc: Pedisc
 this.visibilidadebolsa=true;
let stamp =this.turmanotaservice.Stamp();


this.bolss.push(this.fb.group({
  pediscstamp :[stamp],
  disciplina :[''],
  sigla :[''],
  pestamp :[this.clstampvliw],
  ststamp :['']
}));


}
adicionarlingua(){
let stamp =this.turmanotaservice.Stamp();
this.linguaar.push(this.fb.group({
  clstamp :[this.clstampvliw],
  cllingstamp:[stamp],
  lingua :[''],
  fala:[''],
  leitura:[''],
  escrita:[''],
  compreecao:[''],
  materna :[false],
}));
}

get linguaar(): FormArray {
 

return this.cadastro.get('Linguasview')?.get('linguaqw') as FormArray;
}


mancfams(): FormArray {
return this.cadastro.get("mancfam") as FormArray
}
addMancfam() {

this.mancfams().push(this.newMancfam());
}

newMancfam(): FormGroup {

this.visibilidadelingua=true;
let stamp =this.turmanotaservice.Stamp();
return this.fb.group({      
  pestamp :[this.clstampvliw],
  pelingstamp:[stamp],
  lingua :[''],
  fala:[''],
  leitura:[''],
  escrita:[''],
  compreecao:[''],
  materna :[false],
})
}
displayedColumns: string[] =[];
dataSource: Alauxiliar[]=[];
currentDate = new Date();
displayedColumnsturma: string[] =[];
dataSourceturma: Alauxiliar[]=[];
displayedColumnsgridview: string[] =[];
dataSourcegradl: gradelviw[]=[];

//GetDividadoaluno

displayedColumnsfinanceiro: string[] =[];
dataSourcefinanceiro: contacorrentelista[]=[];


Dadostemp(diaioClass : Alauxiliar){

}
removerDocs(index: number) {
this.Docs.removeAt(index);
var lets=this.cadastro.get('Docsview')?.get('Docs') as FormArray
if(lets.length>0){
this.visibilidadedoc=true;
}  else{  
this.visibilidadedoc=false;
}

}
removerdisciplina(index: number) {
this.bolss.removeAt(index);
var lets=this.cadastro.get('Bolsaview')?.get('bols') as FormArray
if(lets.length>0){
this.visibilidadebolsa=true;
}  else{  
this.visibilidadebolsa=false;
}
}
removerLingua(index: number) {
this.mancfams().removeAt(index);  
var lets= this.cadastro.get("mancfam") as FormArray
if(lets.length>0){
this.visibilidadelingua=true;
}  else{  
this.visibilidadelingua=false;
}
}

async Getcontacorrente(){ 



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
//----------------------------------------------------------------------------------------------------------------------------------------------
carregarDocs(afam: Pedoc[]) {
  this.visibilidadedoc=true;
  // this.visibilidadedoc1=true;
  const formArray = this.cadastro.get('Docsview')?.get('Docs') as FormArray;
  afam.map(item => {
    formArray.push(this.aDocs(item));
  });
}
aDocs(item: Pedoc): any {  


  return this.fb.group({      
    pedocstamp  :[item.pedocstamp],
    documento  :[item.documento],
    numero  :[item.numero],
    local  :[item.local],
    emissao: [new Date(item.emissao)],
    validade: [new Date(item.validade)],
   pestamp:[item.pestamp],
   bi:[item.bi]
    //imagem :[item.imagem],
  })

 
  }



  carregarlinguas(afam: pelingview[]) {
    this.visibilidadelingua=true;
    const formArray = this.cadastro.get("mancfam") as FormArray;
    afam.map(item => {
      formArray.push(this.alinguas(item));
    });
  }
  alinguas(item: pelingview): any {  
  
    return this.fb.group({      
      pelingstamp:[item.pelingstamp],
      lingua:[item.lingua],  
      fala:[item.fala],
      leitura:[item.leitura],
      escrita:[item.escrita], 
      compreecao:[item.compreecao],
      materna:[item.materna],
      pestamp:[item.pestamp],
    })
  
   
    }
  

    CarregaragrdadosFamil(afam: Pefam[]) {
      this.visibilidadeagregado=true;
      const formArray = this.items;
      afam.map(item => {
        formArray.push(this.aClfamview(item));
      });
  
      
    }
    aClfamview(item: Pefam): any { 
      return this.fb.group({      
        pefamstamp :[item.pefamstamp],
        nome :[item.nome],
        grau :[item.grau],
        tel :[item.tel],
        email :[item.email],
        morada :[item.morada],
        obs :[item.obs],
        pestamp :[item.pestamp],
      })
      }



    carregardisciplina(Disc: Pedisc[]) {
    this.visibilidadebolsa=true;
    const formArray = this.cadastro.get('Bolsaview')?.get('bols') as FormArray;
    Disc.map(item => {
      formArray.push(this.disciplinas(item));


    });
  }

  disciplinas(item: Pedisc): any{
   
    return this.fb.group({      
      pediscstamp :[item.pediscstamp],
      disciplina :[item.disciplina],
      sigla :[item.sigla],
      pestamp :[item.pestamp],
      ststamp :[item.ststamp]
    })

  }


}
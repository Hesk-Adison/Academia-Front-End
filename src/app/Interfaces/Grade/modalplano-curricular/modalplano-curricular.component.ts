import { Component, Inject, OnInit, ViewChild, forwardRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';

import { Cldocview, Clfamview, Clview } from 'src/Models/Cldocs';
import { environment } from 'src/environments/environment.development';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSelect } from '@angular/material/select';
import { cllingview, condicoesprocura, contacorrentelista, gradelviw, selects } from 'src/Models/CampoSessoes';
import { Observable, finalize, map, startWith } from 'rxjs';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { Alauxiliar } from 'src/Models/Alauxiliar';

import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pe } from 'src/Models/Pe';
import { pelingview } from 'src/Models/pelingview';
import { pecadastroview } from 'src/Models/pecadastroview';
import { Pedoc } from 'src/Models/Pedoc';
// import { MY_DATA_FORMATS } from 'src/app/modal-estudantes/modal-estudantes.component';
import { MY_DATA_FORMATS } from 'src/app/Teste/testes/testes.component';
import { grade } from '../grade';
import { gradel } from '../gradel';
import { dmzview } from '../dmzview';
import { Gradeservice } from '../gradeservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modalplano-curricular',
  templateUrl: './modalplano-curricular.component.html',
  styleUrls: ['./modalplano-curricular.component.scss'],  
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => 'lingua'),
      multi: true,
    }
    
  ]
})
export class ModalplanoCurricularComponent 
implements OnInit {
  //

  
closeDialog() {
  
  this.modalActual.close("true");
}

isSpinnerDisplayed=false
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

  myControleDisciplina = new FormControl<string | selects>('');
  optionsDisciplina : selects[] = [];
  filteredOptionsDisciplina!: Observable<selects[]>;  
  async GetDisciplina(){ 
    const se:condicoesprocura={
      tabela:"St",
    campo1: "descricao", 
    campo2:"referenc",
     condicao:"disciplina=1"
    }
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {            
          this.optionsDisciplina  = data.dados.selects;
          this.filteredOptionsDisciplina = this.myControleDisciplina.valueChanges.pipe(
            startWith(''),
            map(value => {            
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionsDisciplina) : this.optionsDisciplina.slice();
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






  sexo:string='';
  estadocivil:string='';
  SetSexo(item:selects){
this.sexo=item.descricao;
  }  
  Setestadoscivil(item:selects){
    this.estadocivil=item.descricao;
    this.cadastro.patchValue({ descplano:item.descricao,
      planopagstamp:item.chave,
      
    })

   
      }
   
   

      SetDisciplinas(item:selects, index:number){
   
        this.onSelectbi(item,index)
        // test.controls[i].value.ststamp=item.chave;
        let langArr = (<FormArray>this.cadastro.get('gradel'));
        langArr.controls[index].patchValue(
          {
            ststamp: item.chave,
            disciplina: item.descricao,

          
          }
        );
        

   
    
     
          }


   //--------------------------------------
    //--------------------------------------
     //--------------------------------------
      //--------------------------------------
       //--------------------------------------
        //--------------------------------------
         //--------------------------------------
          //--------------------------------------
           //--------------------------------------
  












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


getProjectByName(name: String) {
let fff=this.optionsdisciplinas.filter(proj => proj.col2.toLowerCase().includes(name.toLowerCase()));

  this.filteredOptionsdisciplinas = this.myControldisciplinas.valueChanges.pipe(
    startWith(''),
    map(value => {            
      const name = typeof value === 'string' ? value : value?.col2;
      return name ? this._filterdmzview(name as string,fff) : fff.slice();
    }),
  );
  //return this.optionsdisciplinas.filter(proj => proj.descricao.includes(name.toString()));
}


myControllocalemissao = new FormControl<string | selects>('');
optionsemissao: selects[] = [];
filteredOptionsemissao!: Observable<selects[]>;  

myControldisciplinas = new FormControl<string | dmzview>('');
optionsdisciplinas: dmzview[] = [];
filtareringoptionsdisciplinas: dmzview[] = [];
filteredOptionsdisciplinas!: Observable<dmzview[]>;  
async  getdisciplinas() {
  
  this._loginservice.getdisciplinas().subscribe({
    next: (data) => {
      if (data.sucesso) {         
        this.optionsdisciplinas = data.dados.dmzview;        
        this.filteredOptionsdisciplinas = this.myControldisciplinas.valueChanges.pipe(
          startWith(''),
          map(value => {            
            const name = typeof value === 'string' ? value : value?.descricao;
            return name ? this._filterdmzview(name as string,this.optionsdisciplinas) : this.optionsdisciplinas.slice();
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
    tabela:"sem",
  campo1: "codigo", 
  campo2:"Ordem",
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
      } else {
        this._loginservice.mostrarAlerta("Nao foi possivel carregar as etapas", "Opps");
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
this.cadastro.patchValue({codcurso  :item.ordem,
  desccurso :item.descricao,
   cursostamp:item.chave})
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
    
async Getplanopagam(){ 
  const se:condicoesprocura={
    tabela:"planopag",
  campo1: "descricao", 
  campo2:"descricao",
   condicao:"vazio"
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
paisnascimento:string='';
pprovnascimento:string='';
codprovnascimento:number=0;
pprovnascimentostamp:string='';
distrnascimento:string='';
setpaisnascimento(value1:selects) {
 this.paisnascimento=value1.descricao;
}
SetDistrito(value1:selects) {
  this.distrnascimento=value1.descricao;
 }
getDistrito(value1:selects) {
 this. myControldistrito = new FormControl<string | selects>('');
  let value = value1.chave;  
  this.pprovnascimento=value1.descricao;
  this.pprovnascimentostamp=value1.chave;
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
private _filter(name: string,list:selects[]): selects[] {
  const filterValue = name.toLowerCase();  
  return list.filter(option => option.descricao.toLowerCase().includes(filterValue));
}

private _filterdmzview(name: string,list:dmzview[]): dmzview[] {
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
  
  

cldocumentos = new FormArray([]);

disciplinades:string='';

carregarDocs(afam: gradel[]) {
  this.visibilidadedoc1=true;
  const formArray = this.cadastro.get('gradel') as FormArray;
  afam.map(item => {
    formArray.push(this.aDocs(item));
  });
}
aDocs(item: gradel): any {
  return this.fb.group({  
    gradelstamp:[item.gradelstamp],
       gradestamp:[item.gradestamp],
       codetapa:[item.codetapa],
       etapa:[item.etapa],
       coddisc:[item.coddisc],
       displina:[item.displina],
       ststamp:[item.ststamp],
       semstamp:[item.semstamp],
       categoria:[item.categoria],
       opcao:[item.opcao],        
        credac:[item.credac],        
        cargahtotal:[item.cargahtotal],       
        cargahteorica:[item.cargahteorica],        
        cargahpratica:[item.cargahpratica],
      prec:[item.prec],
  })

 
  }


  onAddItemgt(item: Cldocview) {
  
    // return (<FormArray>this.cadastro.get('Docsview')?.get('Docs')).push(
    //   new FormGroup({
    //     'cldocstamp': new FormControl(item.cldocstamp, Validators.required),
    //     'clstamp': new FormControl(item.clstamp, Validators.required),
    //     'documento': new FormControl(item.documento, Validators.required),
    //     'numero': new FormControl(item.numero, Validators.required),
    //     'localemis': new FormControl(item.localemis, Validators.required),
    //     'validade': new FormControl(item.validade, Validators.required),
    //     'bi': new FormControl(item.bi, Validators.required),
    //   })
    // );
  }




getControlsdocs() {


  return (<FormArray>this.cadastro.get('cldococumentos')).controls;
}
//======================Teste======================
  datanasc:Date=new Date();
  cadastro!:FormGroup
  Clfamlist: Clfamview[]=[]
  Cldocslist: Cldocview[]=[]
  DadosGerais!: Clview
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
    titloAccao: string='';
    botaoAccao: string='';
  clfamstamp: string=''
  checked = false;
  
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;   
    constructor(
      private fb:FormBuilder,
      private turmanotaservice: TurmaNotaService,private http: HttpClient,private sanitizer:
       DomSanitizer,
       private _loginservice: LoginServiceService,
       private modalActual: MatDialogRef<ModalplanoCurricularComponent>,
       @Inject(MAT_DIALOG_DATA) public dadosestudantes: grade,
       private _estudanteService: Gradeservice
    ){

      if(this.dadosestudantes.descricao!=''){
        
        this.titloAccao=`Novo plano curricular`;
        this.botaoAccao=`Guardar`;
      }else{

        this.titloAccao=`Editar plano curricular`;
        this.botaoAccao=`Actualizar`;
      }
      this.cadastro = this.fb.group({
        gradestamp:[''],
       codigo:['PLNG'],
       descricao:['', [Validators.required]],
       codcurso:['', [Validators.required]],
       desccurso:['',[Validators.required]],
       cursostamp:[''],
       activo:[false],
       anoseminic:[''],//Ano/semestre inicio 
       anoSemstamp:[''],       
       totalCargahora:[0, [Validators.min(0)]],//Carga Horaria        
       totalCargateorica:[0, [Validators.min(0)]],//Carga Horaria teórica       
       totalCargapratica:[0,[Validators.min(0)]],//Carga Horaria pratica       
       obs:[''],
       totaldisc:[0, [Validators.min(0)]],//total de disciplinas 
       totalCreda:[0],//total de creditos academicos 
       data:[new Date()],//data de Criacao 
       planopagstamp:[''],
       descplano:[''],      
       gradel: this.fb.array([]),
     
    })
    


    }
  
    nos:string='';
   async ngOnInit() {
    
    
    this.GetDisciplina();
    // this.getProvi();
      this.getPaises();
    // this.Getsexo();
      this.Getplanopagam();      
    //  this.Getreligiao();
    this.Getstatuss();
    //  this.Getgrauparen();
      this.GetCurso();
    //  this.GetDepartamento();
    //  this.GetFaculdade();
    //  this.Getccu1();
    //  this.Getfala();
    //  this.Getgrauparen();
    // this.Getinstituicaoensino();
    // this.Getlingua();
    // this.Getnivelacademico();
    //  this.Getstatuss();
    //  this.Gettipoaluno();
    //  this.Gettipobolsa();
     this.getdisciplinas();
     this.GetSemestres()
   
     if (this.dadosestudantes != null && this.dadosestudantes.gradestamp.length>0) {

      this.myControlCurso.setValue(this.dadosestudantes.desccurso);  
      this.myControlestadociv.setValue(this.dadosestudantes.descplano);
      //this.dadosestudantes.
      this.cadastro.patchValue({
        gradestamp:this.dadosestudantes.gradestamp,
        codigo:      this.dadosestudantes.codigo,
        descricao:  this.dadosestudantes.descricao,
        codcurso:   this.dadosestudantes.codcurso,
        desccurso:  this.dadosestudantes.desccurso,
        cursostamp: this.dadosestudantes.cursostamp,
        activo:    this.dadosestudantes.activo,
        anoseminic: this.dadosestudantes.anoseminic,//Ano/semestre inicio 
      anoSemstamp: this.dadosestudantes.anoSemstamp,      
    totalCargahora: this.dadosestudantes.totalCargahora,//Carga Horaria        
    totalCargatep: this.dadosestudantes.totalCargateorica,//Carga Horaria teórica       
        totalCargaprp: this.dadosestudantes.totalCargapratica,//Carga Horaria pratica       
        obs:      this.dadosestudantes.obs,
        totaldisc: this.dadosestudantes.totaldisc,//total de disciplinas 
        totalCreda: this.dadosestudantes.totalCreda,//total de creditos academicos 
        data:this.dadosestudantes.data,//dp: this.dadosestudantes.data:Date//data de Criacao 
        planopagstamp: this.dadosestudantes.planopagstamp,
        descplano: this.dadosestudantes.descplano,      
        //gradel:gradep: this.dadosestudantes.gradel;     
       
      });
      if(this.dadosestudantes.gradestamp!=''){

        this.clstampvliw=this.dadosestudantes.gradestamp;
      }else{
        this.clstampvliw=this.turmanotaservice.Stamp();
      }
      
if  (this.dadosestudantes.gradel.length>0){
 
  this.carregarDocs(this.dadosestudantes.gradel);
}
}  
if(this.dadosestudantes.gradel.length>0){
  this.titloAccao = "editar plano curricular";
  this.botaoAccao = "Actualizar";
}

else{
  this.clstampvliw=this.turmanotaservice.Stamp();
  this.titloAccao = "Novo plano curricular";
  this.botaoAccao = "Salvar";
  this.cadastro.patchValue({gradestamp:this.clstampvliw})
}
    
     
    }



    
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
        }
    async Gettipoaluno(){ 
      const se:condicoesprocura={
        tabela:"Alauxiliar",
      campo1: "descricao", 
      campo2:"codigo",
       condicao:"Tabela=21"
      }
      
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
    
    @ViewChild('listatipobolsa') listatipobolsa!: MatSelect;
    tipobolsa:string='';
    tipobolsastamp:string='';
    Settipobolsa(item:selects,i:number){
      this.tipobolsa=item.descricao;
    this.tipobolsastamp=item.chave;
       
  this.visibilidadebolsa=true;
  
  (<FormArray>this.cadastro.get('Bolsaview')?.get('bols')).controls[i].value.tipobolsa= item.descricao
  
  
        }
    async Gettipobolsa(){ 
      const se:condicoesprocura={
        tabela:"Alauxiliar",
      campo1: "descricao", 
      campo2:"codigo",
       condicao:"Tabela=4"
      }
      
      this._loginservice.getselectionPost(se).subscribe({
        next: (data) => {
          if (data.sucesso) {            
            this.optionstipobolsa = data.dados.selects;
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
    myControlinstituicaoensino = new FormControl<string | selects>('');
    optionsinstituicaoensino: selects[] = [];
    filteredOptionsinstituicaoensino!: Observable<selects[]>;  
    
    @ViewChild('listainstituicaoensino') listainstituicaoensino!: MatSelect;
    instituicaoensino:string='';
    instituicaoensinostamp:string='';
    Setinstituicaoensino(item:selects,i:number){

      this.instituicaoensino=item.descricao;
    this.instituicaoensinostamp=item.chave;
    
  this.visibilidadebolsa=true;
  (<FormArray>this.cadastro.get('Bolsaview')?.get('bols')).controls[i].value.instituicao= item.descricao
 

        }
    async Getinstituicaoensino(){ 
      const se:condicoesprocura={
        tabela:"Alauxiliar",
      campo1: "descricao", 
      campo2:"codigo",
       condicao:"Tabela=3"
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
      }
    }




    sem:selects[]=[];
  async GetSemestres(){ 
    const se:condicoesprocura={
      tabela:"sem",
    campo1: "descricao", 
    campo2:"codigo",
     condicao:"vazio"
    }
    this._loginservice.getselectionPost(se).subscribe({
      next: (data) => {
        if (data.sucesso) {            
          this.sem  = data.dados.selects;
         
        } 
      },
      error: (e) => {
       // this._loginservice.mostrarAlerta(Erro, ${e}, "Opps");
      }
    });
  
  }
Cadastrar( )

{



if(this.cadastro.invalid){
  Swal.fire('Erro!', `Caro Utilizador, preencha os campos vazios`, 'error'); 
  return
}

else{




// this.Clfamlist=this.cadastro.value.clfamview.items;
// this.Cldocslist = this.cadastro.value.Docsview.Docs;

// let bolsa=this.cadastro.value.Bolsaview.bols
// let linguas=this.cadastro.value.mancfa
const cl:grade={
  gradestamp:this.cadastro.value.gradestamp,
  codigo:this.cadastro.value.codigo,
 descricao :this.cadastro.value.descricao,
codcurso  :this.cadastro.value.codcurso,
 desccurso :this.cadastro.value.desccurso,
  cursostamp:this.cadastro.value.cursostamp,
  activo:this.cadastro.value.activo,
  anoseminic:this.cadastro.value.anoseminic,//Ano/semestre inicio 
  anoSemstamp:this.cadastro.value.anoSemstamp,       
  totalCargahora:this.cadastro.value.totalCargahora,//Carga Horaria        
  totalCargateorica:this.cadastro.value.totalCargateorica,//Carga Horaria teórica       
  totalCargapratica:this.cadastro.value.totalCargapratica,//Carga Horaria pratica       
  obs:this.cadastro.value.obs,
  totaldisc:this.cadastro.value.totaldisc,//total de disciplinas 
  totalCreda:this.cadastro.value.totalCreda,//total de creditos academicos 
  data:new Date(),//data de Criacao 
  planopagstamp:this.cadastro.value.planopagstamp,
  descplano:this.cadastro.value.descplano,       
  gradel:this.cadastro.value.gradel,       
};
//cl.gradel=this.cadastro.get('gradel') as FormArray
//cl.data=moment(this.cadastro.value.data);//.format('YYYY-MM-DD')
this.isSpinnerDisplayed=true
  const dadosssss=cl;


  

  const formData = new FormData();


  
  //formData.append("ficheirofsfsf", this.uploadFile);  
  const _dadoscl=dadosssss
  var json_arr = JSON.stringify(_dadoscl);  
  formData.append("Grade",json_arr);    

  const url = `${environment.APIurl}Grade/UploadFile`;
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
      Swal.fire('Sucesso!', `Operação executada com sucesso`, 'success'); 
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

onSelectbi(value:selects,i:number) {

  let langArr = (<FormArray>this.cadastro.get('gradel'));
  langArr.controls[i].patchValue({
       coddisc:value.ordem,
       displina:value.descricao,
       ststamp:value.chave,
        })
          

}


total:number=0;

totalstr:string='Total:  ';


 //------------------------------------------------Documentos----------------------------------------------------------
  get Gradel(): FormArray {
   
    return this.cadastro.get('gradel') as FormArray;
   }

 
//---------------------------------------------------------------------------------------------------------------------

//-----------------------------------Agregado Familiar-----------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------

@ViewChild('listapaise') listapaise!: MatSelect;
@ViewChild('listaprovincias') listaprovincias!: MatSelect;
@ViewChild('listadistritos') listadistritos!: MatSelect;
@ViewChild('listasexoss') listasexoss!: MatSelect;
@ViewChild('listaestadocivils') listaestadocivils!: MatSelect;

onSelectpais(value:selects,index:number) {
  // this.paisstamp=value.chave;
  // this.descricaopais=value.descricao;
  // this.disciplinades=value.descricao;
  
  let langArr = (<FormArray>this.cadastro.get('gradel'));
  langArr.controls[index].patchValue(
    {
      codetapa:value.ordem,
      etapa:value.descricao,
      semstamp:value.chave
  
    }
  );
  

}
onSelectprovincia(value:selects,i:number) {
  this.Provinciastamp=value.chave;
  this.descricaoProvincia=value.descricao;
  
  (<FormArray>this.cadastro.get('gradel')).controls[i].value.localemis= this.descricaoProvincia
  
  
}
 isKeyPressedNumeric(event: any, inputVal: any) {

  var input = inputVal.value;
  input = input + event.key;


}

onKeyPress(i:number) {
  let grela=(<FormArray>this.cadastro.get('gradel')).controls[i].value.displina;
  this.getProjectByName(grela);
}
onSelectdisciplinas(value:dmzview,i:number) { 
  this.onSelectbi(value,i)
  let langArr = (<FormArray>this.cadastro.get('gradel'));
  langArr.controls[i].patchValue(
    {
      coddisc:value.col1,
      ststamp:value.col3,
      credac:value.col5,
      cargahpratica:value.col8,
      cargahteorica:value.col7,
      cargahtotal:value.col6,
      
    }
    
  );

}
//select descricao from PeAuxiliar where tabela =1
onSelectdistrito(value:selects) {

  this.distritostamp=value.chave;
  this.descricaodistrito=value.descricao;
}

visibilidadeagregado:boolean=false;
clstampvliw: string='';
  

@ViewChild('recprpais') recprpais!: MatSelect;
//-----------------------------------------------------------------------------------------------------------------------
visibilidadedoc:boolean=false;
visibilidadebolsa:boolean=false;
visibilidadelingua:boolean=false;
visibilidadedoc1:boolean=false;
//------------------------------------------Adiciona e remove linhas do docs---------------------------------------------
adicionargradel() {
  this.visibilidadedoc1=true;
let stamp =this.turmanotaservice.Stamp();
  this.Gradel.push(this.fb.group({
    gradelstamp:[stamp],
    gradestamp:[this.clstampvliw],
    codetapa:[''],//
    etapa:[''],//ordem etapa 
    coddisc:[''],
    displina:[''],
    ststamp:[''],//representa o stamp da disciplina 
    semstamp:[''],//stamp do semestre 
    categoria:[''],
    opcao:[false],        
     credac:[0],//credito Academico        
     cargahtotal:[0],//somatorio de teorica e pratica         
     cargahteorica:[0],//carga Horaria contacto         
     cargahpratica:[0],//carga Horaria de estudo 
   prec:[false],//Indica se a disciplina tem precedencia 
   
  }));
}



adicionarbolsa(){
  
  this.visibilidadebolsa=true;
  let stamp =this.turmanotaservice.Stamp();
  this.Gradel.push(this.fb.group({
    clstamp :[this.clstampvliw],
    clBolsastamp :[stamp],
    instituicao:[''],
    tipobolsa :[''],
    datain:[''],
    datatermino : [''],
    anolectivo: [''],
    valor: [0],
    perc:[0],
    obs:['']
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

carregarlinguas(afam: pelingview[]) {
  this.visibilidadelingua=true;
  const formArray = this.cadastro.get("mancfam") as FormArray;
  afam.map(item => {
    formArray.push(this.alinguas(item));
  });
}
alinguas(item: pelingview): any {

  return this.fb.group({      
    clstamp :[item.pelingstamp],
    cllingstamp:[item.pestamp],
    lingua :[item.lingua],
    fala:[item.fala],
    leitura:[item.leitura],
    escrita:[item.escrita],
    compreecao:[item.compreecao],
    materna :[item.materna],
  })

 
  }




newMancfam(): FormGroup {
  
  this.visibilidadelingua=true;
  let stamp =this.turmanotaservice.Stamp();
  return this.fb.group({      
    clstamp :[this.clstampvliw],
    cllingstamp:[stamp],
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
dataSourcegradl: gradel[]=[];

//GetDividadoaluno

displayedColumnsfinanceiro: string[] =[];
dataSourcefinanceiro: contacorrentelista[]=[];


Dadostemp(diaioClass : Alauxiliar){

}
removerDocs(index: number) {
  this.Gradel.removeAt(index);
  var lets=this.cadastro.get('Docsview')?.get('Docs') as FormArray
if(lets.length>0){
this.visibilidadedoc=true;
}  else{  
this.visibilidadedoc=false;
}

}

eliminarestudante(stamp: string,descricao:string,index:number) {

  Swal.fire({
    title: 'Deseja eliminar a disciplina?',
    text: descricao,
    icon: "warning",
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Sim, Eliminar',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    cancelButtonText: 'Não, Voltar'
  }).then((resultado => {
    if (resultado.isConfirmed) {
      this._estudanteService.eliminargradelsddgd(stamp,'gradel','gradelstamp').subscribe({
        next: (data) => {
          if (data.sucesso) {
            this.removergri(index);
            this._loginservice.mostrarAlerta("Disciplina eliminada com sucesso", "Ok");
          } else {
            this._loginservice.mostrarAlerta("Nao foi possível eliminar a Disciplina", "Erro");
          }
        },
        error: (e) => {
          this._loginservice.mostrarAlerta("Erro de conexao", "Opps");
        }
      });

    }

  }));
}

removergradel(index: number) {

  
  let grela=(<FormArray>this.cadastro.get('gradel')).controls[index].value;  
  this.eliminarestudante(grela.gradelstamp,grela.displina,index)
 
}

removergri(index:number){
  this.Gradel.removeAt(index);
  var lets=this.cadastro.get('gradel') as FormArray
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
  
  this._loginservice.GetDividadoaluno(this.clstampvliw).subscribe({
    next: (data) => {
      if (data.sucesso) {        
       this.total=data.dados.total;

       for (let i = 0; i < data.dados.contacorrentelistas.length; i++) {
        data.dados.contacorrentelistas[i].dataven = moment(data.dados.contacorrentelistas[i].dataven).format('DD-MM-YYYY');
        data.dados.contacorrentelistas[i].data = moment(data.dados.contacorrentelistas[i].data).format('DD-MM-YYYY');
       
  
      }

       this.dataSourcefinanceiro = data.dados.contacorrentelistas;     
        
      } else {
        this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
     // this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
    }
  });

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





}
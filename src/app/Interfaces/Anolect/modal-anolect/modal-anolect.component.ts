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
// import { MY_DATA_FORMATS } from 'src/app/Teste/testes/testes.component';
import { MY_DATA_FORMATS } from 'src/app/Teste/GridView/modallancamento/modallancamento.component';

import Swal from 'sweetalert2';
import { anolect } from '../anolect';
import { anoSem } from '../anoSem';
import { Anolectservices } from '../anolectservices';
import { dmzview } from '../../Grade/dmzview';
import { gradel } from '../../Grade/gradel';
@Component({
  selector: 'app-modal-anolect',
  templateUrl: './modal-anolect.component.html',
  styleUrls: ['./modal-anolect.component.scss'],  
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => 'lingua'),
      multi: true,
    }
    
  ]
})
export class ModalAnolectComponent 
implements OnInit {
  //

  isSpinnerDisplayed=false
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

myControldisciplinas = new FormControl<string | anolect>('');
optionsdisciplinas: anolect[] = [];
filtareringoptionsdisciplinas: anolect[] = [];
filteredOptionsdisciplinas!: Observable<anolect[]>;  
async  getdisciplinas() {
  
 


} 






myControlstatuss = new FormControl<string | selects>('');
optionsstatuss: selects[] = [];
filteredOptionsstatuss!: Observable<selects[]>;  

@ViewChild('listastatuss') listastatuss!: MatSelect;
statuss:string='';

    



myControlreliagiao = new FormControl<string | selects>('');
optionsreliagiao: selects[] = [];
filteredOptionsreliagiao!: Observable<selects[]>;  

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

@ViewChild('listaCurso') listaCurso!: MatSelect;
Curso:string='';
Cursostamp:string='';



myControlgrauparen = new FormControl<string | selects>('');
optionsgrauparen: selects[] = [];
filteredOptionsgrauparen!: Observable<selects[]>;  

@ViewChild('listagrauparen') listagrauparen!: MatSelect;
grauparen:string='';

    

paisnascimento:string='';
pprovnascimento:string='';
codprovnascimento:number=0;
pprovnascimentostamp:string='';
distrnascimento:string='';

 
private _filter(name: string,list:selects[]): selects[] {
  const filterValue = name.toLowerCase();  
  return list.filter(option => option.descricao.toLowerCase().includes(filterValue));
}



cldocumentos = new FormArray([]);
disciplinades:string='';
carregarDocs(afam: anoSem[]) {
  this.visibilidadedoc1=true;
  const formArray = this.cadastro.get('anoSem') as FormArray;
  afam.map(item => {
    formArray.push(this.aDocs(item));
  });
}
aDocs(item: anoSem): any {


  return this.fb.group({  
    anosemstamp:[item.anosemstamp],
    anolectstamp:[item.anolectstamp],
       codigo:[item.codigo],
       descricao:[item.descricao],
       ano:[item.ano],
       obs:[item.obs],
  })

 
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
      private turmanotaservice: TurmaNotaService,private http: HttpClient,
      private _loginservice: LoginServiceService,
       private modalActual: MatDialogRef<ModalAnolectComponent>,
       @Inject(MAT_DIALOG_DATA) public dadosestudantes: anolect,
       private _estudanteService: Anolectservices
    ){

      if(this.dadosestudantes.descricao!=''){
        
        this.titloAccao=`Novo Ano lectivo`;
        this.botaoAccao=`Guardar`;
      }else{

        this.titloAccao=`Editar Ano lectivo`;
        this.botaoAccao=`Actualizar`;
      }
      this.cadastro = this.fb.group({
        gradestamp:[''],     
        anolectstamp :[''],
       codigo :[0, [Validators.min(0)]],
       ano :[0,[Validators.min(0)]],
        descricao :['',[Validators.required]],
       anoSem: this.fb.array([]),
     
    })

  
    }
  
    nos:string='';
   async ngOnInit() {


     if (this.dadosestudantes != null && this.dadosestudantes.anolectstamp.length>0) {
      this.cadastro.patchValue({ 
        anolectstamp :this.dadosestudantes.anolectstamp,
        codigo :this.dadosestudantes.codigo,
        ano :this.dadosestudantes.ano,
         descricao :this.dadosestudantes.descricao,
      });
      if(this.dadosestudantes.anolectstamp!=''){
        this.clstampvliw=this.dadosestudantes.anolectstamp;
      }else{
        this.clstampvliw=this.turmanotaservice.Stamp();
      }      
if  (this.dadosestudantes.anoSem.length>0){
 
  this.carregarDocs(this.dadosestudantes.anoSem);
}
}  

if(this.dadosestudantes.anoSem.length>0){
  this.titloAccao = "Editar Ano lectivo";
  this.botaoAccao = "Actualizar";
  
}

else{
  this.clstampvliw=this.turmanotaservice.Stamp();
  this.titloAccao = "Novo Ano lectivo";
  this.botaoAccao = "Salvar";
  this.cadastro.patchValue({ anolectstamp:this.clstampvliw})
  
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
    
    myControlnivelacademico = new FormControl<string | selects>('');
    optionsnivelacademico: selects[] = [];
    filteredOptionsnivelacademico!: Observable<selects[]>;  
    
    @ViewChild('listanivelacademico') listanivelacademico!: MatSelect;
    nivelacademico:string='';
    Setnivelacademico(item:selects){
      this.nivelacademico=item.descricao;
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


 
Cadastrar( )

{     



const cl:anolect={
  anolectstamp: this.cadastro.value.anolectstamp, 
  codigo:  this.cadastro.value.codigo,
  ano:this.cadastro.value.ano,
  descricao: this.cadastro.value.descricao,
  anoSem:this.cadastro.value.anoSem,
};


  const dadosssss=cl;

  if(this.cadastro.invalid){
    Swal.fire('Erro!', `Caro Utilizador, Preencha os campos vazios, `, 'error'); 
    return
  }
  else{
   
  if(cl.ano < 2000){
    Swal.fire('Erro!', `Caro Utilizador, o ano introduzido é invalido!, `, 'error'); 
    return
  }

  if(cl.anoSem.length<=0){
    Swal.fire('Erro!', `Caro Utilizador, adicione os semestres, `, 'error'); 
    return
  }

  else{
this.isSpinnerDisplayed=true
 
  const formData = new FormData();
  const _dadoscl=dadosssss
  var json_arr = JSON.stringify(_dadoscl);  
  formData.append("anolect",json_arr);
  const url = `${environment.APIurl}Anolect/UploadFile`;
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
      this.modalActual.close();      
    }
  }, (error: any) => {
    Swal.fire('Erro!', `Não foi possivel executar a operação `, 'error'); 
  }).add(() => {
    this.working = false;
  });
}
}
}

total:number=0;

totalstr:string='Total:  ';


 //------------------------------------------------Documentos----------------------------------------------------------
  get Gradel(): FormArray {
   
    return this.cadastro.get('anoSem') as FormArray;
   }

 
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
visibilidadedoc1:boolean=false;
//------------------------------------------Adiciona e remove linhas do docs---------------------------------------------
adicionargradel() {
  this.visibilidadedoc1=true;
let stamp =this.turmanotaservice.Stamp();
  this.Gradel.push(this.fb.group({
    anosemstamp:[stamp],
    anolectstamp :[this.clstampvliw],
    codigo :['', [Validators.required]],
    descricao :['', [Validators.required]],
    ano :[0,[Validators.min(0)]],
   obs :[''],   
  }));
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


Dadostemp(){

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
        error: () => {
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
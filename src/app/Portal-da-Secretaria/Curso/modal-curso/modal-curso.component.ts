import { Component, Inject, NgModule, OnInit, ViewChild, forwardRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';

import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { HttpClient, HttpClientModule, HttpEventType, HttpRequest } from '@angular/common/http';

import { Cldocview, Clfamview, Clview } from 'src/Models/Cldocs';
import { environment } from 'src/environments/environment.development';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { cllingview, condicoesprocura, contacorrentelista, gradelviw, selects } from 'src/Models/CampoSessoes';
import { Observable, finalize, map, startWith } from 'rxjs';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { Alauxiliar } from 'src/Models/Alauxiliar';

import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Pe } from 'src/Models/Pe';
import { pelingview } from 'src/Models/pelingview';
import { pecadastroview } from 'src/Models/pecadastroview';
import { Pedoc } from 'src/Models/Pedoc';
// import { MY_DATA_FORMATS } from 'src/app/modal-estudantes/modal-estudantes.component';
import { MY_DATA_FORMATS } from 'src/app/listaestudantes/modal-estudantes/modal-estudantes.component';

import Swal from 'sweetalert2';
import { Cursoservices } from '../cursoservices';
import { curso } from '../curso';
import { cursoacto } from '../cursoacto';
import { cursodoc } from '../cursodoc';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { grade } from '../../Grade/grade';
import { grade } from 'src/app/Interfaces/Grade/grade';
// import { ModalplanoCurricularComponent } from '../../Grade/modalplano-curricular/modalplano-curricular.component';
import { ModalplanoCurricularComponent } from 'src/app/Interfaces/Grade/modalplano-curricular/modalplano-curricular.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, CommonModule, NgSwitch } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCake } from '@fortawesome/free-solid-svg-icons';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from 'src/app/app.module';




@Component({
  selector: 'app-modal-curso',
  templateUrl: './modal-curso.component.html',
  styleUrls: ['./modal-curso.component.scss', ],  
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
 ///bootstrap: [ModalCursoComponent]
})
export class ModalCursoComponent 
implements OnInit {

  
  
@ViewChild(MatPaginator, { static: true})  paginacaoTabela!: MatPaginator;
  initialLoad() {
    if(this.clstampvliw.length==0){
      return;
    }
    this.isSpinnerDisplayed =true;
    let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
        let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
    this._estudanteService.Getgradesfromcursos(this.clstampvliw, currentPage, pageSize).pipe(
      finalize(() => this.isSpinnerDisplayed = false),
    ).subscribe(result => {
      if (result) {
        this.totalRecords = result.totalCount;
        this.dataListaestudante.data = result.data;
        this.pagenumber = currentPage;
        this.pagesize = pageSize;
        this.pagetotalrecord=result.totalCount;
      }
    });
}

editarestudante(grade: grade) {

  this.dialog.open(ModalplanoCurricularComponent, {
    // height: '85%',
    width: '77%',
    disableClose: true,
    data: grade,
    autoFocus: false,
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  }).afterClosed().subscribe(resultado => {
    if (resultado === "true") {
        this.initialLoad();
    }
  });
}
  //

  totalRecords: number = 0;
  
  pagenumber: number = 0;
  pagesize: number = 0;
  
  pagetotalrecord: number = 0;
  isSpinnerDisplayed = false;
  listestudante: grade[] = [];
  dataListaestudante = new MatTableDataSource(this.listestudante);
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

myControldisciplinas = new FormControl<string | curso>('');
optionsdisciplinas: curso[] = [];
filtareringoptionsdisciplinas: curso[] = [];
filteredOptionsdisciplinas!: Observable<curso[]>;  
async  getdisciplinas() {
  
 


} 






myControlstatuss = new FormControl<string | selects>('');
optionsstatuss: selects[] = [];
filteredOptionsstatuss!: Observable<selects[]>;  

@ViewChild('listastatuss') listastatuss!: MatSelect;
statuss:string='';

    
Setstatuss(item:selects){
  this.statuss=item.descricao;

  this.cadastro.patchValue({status:this.statuss})
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
carregarcursodoc(afam: cursodoc[]) {
  this.visibilidadedoc=true;
  const formArray = this.cadastro.get('cursodoc') as FormArray;
  afam.map(item => {
    formArray.push(this.acursodoc(item));
  });
}
acursodoc(item: cursodoc): any {
  return this.fb.group({  
    cursodocstamp:[item.cursodocstamp],
    cursostamp:[item.cursostamp],
    documento:[item.documento],
    anexo:[item.anexo],
  })
  }

carregarcursoacto(afam: cursoacto[]) {
  this.visibilidadecursoacto=true;
  const formArray = this.cadastro.get('cursoacto') as FormArray;
  afam.map(item => {
    formArray.push(this.acursoacto(item));
  });
}
acursoacto(item: cursoacto): any {

  return this.fb.group({  
    cursoactostamp:[item.cursoactostamp],
    cursostamp:[item.cursostamp],
     data:[item.data],
     titulo:[item.titulo],
     anosem:[item.anosem],
  })

 
  }

//======================Teste======================
  cadastro!:FormGroup
  DadosGerais!: Clview
  fotos: any  
  foto: any
  
pageIndex: number = 0;
  confirmPageChange(pageEvent: PageEvent) {
    this.pageIndex=pageEvent.pageIndex;
    this.paginacaoTabela.pageSize=pageEvent.pageSize;    
    this.paginacaoTabela.pageIndex=pageEvent.pageIndex;
    this.initialLoad();
  }
  frmestudantes!: FormGroup;
  colunasTabela: string[] = ['no','nim', 'nome', 'sexo', 'pai', 'mae', 'accoes'];
    titloAccao: string='';
    botaoAccao: string='';
  clfamstamp: string=''
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;   
    constructor(
      private fb:FormBuilder,
      private turmanotaservice: TurmaNotaService,private http: HttpClient,
      private _loginservice: LoginServiceService,
       private modalActual: MatDialogRef<ModalCursoComponent>,
       @Inject(MAT_DIALOG_DATA) public dadosestudantes: curso,
       private _estudanteService: Cursoservices,
       private dialog: MatDialog,library: FaIconLibrary
    ){
      
      
      library.addIcons(faCake);

      if(this.dadosestudantes.desccurso!=''){        
        this.titloAccao=`Novo Curso`;
        this.botaoAccao=`Guardar`;
      }else{
        this.titloAccao=`Editar Curso`;
        this.botaoAccao=`Actualizar`;
      }
      this.cadastro = this.fb.group({
        cursostamp: '',
        codcurso:[ 'CGC'],
        desccurso: ['',[Validators.required]],
        tipo: [0,],
        status: ['',],
        nivel: ['', ],
        nivelstamp: '',
      cargahora: [0,[Validators.required]],
        cursoeq: ['', ],
        duracao: [0,[Validators.required]],
        codmec: ['', ],
        habmec: ['', ],
        obs: '',
        imagem: this.foto,
        cCusto: ['',],
        ccudepstamp: '',
        departamento: [''],
        pestamp: '',
        director: '',
        cursoacto: this.fb.array([]),
        cursodoc: this.fb.array([]),
        cursograd: this.fb.array([]),
        tipo1:[false], 
        tipo2:[false],  
        tipo3:[false], 
        tipo4:[false],  
     
    })
    }
  
    nos:string='';
   async ngOnInit() {
    await  this.Getstatuss();
   await this. Getnivelacademico();
   await this.GetFaculdade();
   await this.GetDepartamento();
   await this.GetDirectorPedagogico(); 
   await this.getCcusto();
  this.displayedColumnsfinanceiro= ['codigo','descricao','accoes'];
     if (this.dadosestudantes != null && this.dadosestudantes.cursostamp != '') {
      this.cadastro.patchValue({ 
        cursostamp: this.dadosestudantes.cursostamp,
        codcurso: this.dadosestudantes.codcurso,
        desccurso: this.dadosestudantes.desccurso,
        tipo: this.dadosestudantes.tipo,
        status: this.dadosestudantes.status,
        nivel: this.dadosestudantes.nivel,
        nivelstamp: this.dadosestudantes.nivelstamp,
        cargahora: this.dadosestudantes.cargahora,
        cursoeq: this.dadosestudantes.cursoeq,
        duracao: this.dadosestudantes.duracao,
        codmec: this.dadosestudantes.codmec,
        habmec: this.dadosestudantes.habmec,
        obs: this.dadosestudantes.obs,
        imagem: this.dadosestudantes.imagem,
        cCusto: this.dadosestudantes.cCusto,
        ccustamp: this.dadosestudantes.ccustamp,
        ccudepstamp: this.dadosestudantes.ccudepstamp,
        departamento: this.dadosestudantes.departamento,
        pestamp: this.dadosestudantes.pestamp,
        director: this.dadosestudantes.director,
        cursoacto: this.dadosestudantes.cursoacto,
        cursodoc: this.dadosestudantes.cursodoc,
        cursograd: this.dadosestudantes.cursograd
      });
this.dadosestudantes.tipo=this.dadosestudantes.tipo
     this.statuss=this.dadosestudantes.status;
     this.myControlstatuss.setValue( this.statuss);
      this.nivelacademico=this.dadosestudantes.nivel;
      this.nivelacademicostamp=this.dadosestudantes.nivelstamp;
      
     this.myControlnivelacademico.setValue( this.nivelacademico);
    
     this.tbccusto=this.dadosestudantes.cCusto;
      this.tbccustostamp=this.dadosestudantes.ccustamp;
      
     this.myControlccu.setValue( this.tbccusto);
      this.Departamentostamp=this.dadosestudantes.ccudepstamp;
     this.Departamento=this.dadosestudantes.departamento;
     
     this.myControlDepartamento.setValue( this.Departamento);
      this.DirectorPedagogicostamp=this.dadosestudantes.pestamp;
     this.DirectorPedagogico=this.dadosestudantes.director;     
     this.myControlDirectorPedagogico.setValue( this.DirectorPedagogico);  
     
     if(this.dadosestudantes.tipo==1){
      this.cadastro.controls['tipo1'].setValue(true);
     } if(this.dadosestudantes.tipo==2){
      this.cadastro.controls['tipo2'].setValue(true);
     }
     if(this.dadosestudantes.tipo==3){
      this.cadastro.controls['tipo3'].setValue(true);
     }
     if(this.dadosestudantes.tipo==4){
      this.cadastro.controls['tipo4'].setValue(true);
     }

      if(this.dadosestudantes.cursostamp!=''){
        this.clstampvliw=this.dadosestudantes.cursostamp;        
        this.initialLoad();
      }else{
        this.clstampvliw=this.turmanotaservice.Stamp();
      }    
      

  this.DirectorPedagogico=this.dadosestudantes.director;
  this.DirectorPedagogicostamp=this.dadosestudantes.pestamp;
if  (this.dadosestudantes.cursoacto.length>0){
 
  this.carregarcursoacto(this.dadosestudantes.cursoacto);
}if  (this.dadosestudantes.cursodoc.length>0){
 
  this.carregarcursodoc(this.dadosestudantes.cursodoc);
}
}  else{
  this.clstampvliw=this.turmanotaservice.Stamp();
  
 
} 

 

     if(this.dadosestudantes.cursostamp.length>0){
      this.titloAccao = "Editar Curso";
      this.botaoAccao = "Actualizar";

     }

     else{
      this.titloAccao = "Novo Curso";
      this.botaoAccao = "Salvar";
      this.clstampvliw=this.turmanotaservice.Stamp();

  this.cadastro.patchValue({cursostamp:this.clstampvliw})

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
    
toggle1(event: MatSlideToggleChange) {
  if(event.checked==true)
  {
    this.dadosestudantes.tipo=1;
  }else{    
    this.dadosestudantes.tipo=0;
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
    this.dadosestudantes.tipo=0;
  }else{
    
    this.dadosestudantes.tipo=1;
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
    this.dadosestudantes.tipo=0;
  }else{
    
    this.dadosestudantes.tipo=3;
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
    this.dadosestudantes.tipo=0;
  }else{
    
    this.dadosestudantes.tipo=4;
  }
  this.cadastro.value.tipo1=false;
  this.cadastro.value.tipo2=false;
  this.cadastro.value.tipo3=false;
  this.cadastro.controls['tipo3'].setValue(false);
  this.cadastro.controls['tipo2'].setValue(false);
  this.cadastro.controls['tipo1'].setValue(false);
}

myControlDirectorPedagogico = new FormControl<string | selects>('');
optionsDirectorPedagogico: selects[] = [];
filteredOptionsDirectorPedagogico!: Observable<selects[]>;  

DirectorPedagogico:string='';
DirectorPedagogicostamp:string='';



SetDirectorPedagogico(item:selects){
  this.DirectorPedagogico=item.descricao;
this.DirectorPedagogicostamp=item.chave;
    }
async GetDirectorPedagogico(){ 
  const se:condicoesprocura={
    tabela:"pe",
  campo1: "nome", 
  campo2:"no",
   condicao:"pedagogico=1"
  }
  
  this._loginservice.getselectionPost(se).subscribe({
    next: (data) => {
      if (data.sucesso) {            
        this.optionsDirectorPedagogico = data.dados.selects;
        this.filteredOptionsDirectorPedagogico = this.myControlDirectorPedagogico.valueChanges.pipe(
          startWith(''),
          map(value => {            
            const name = typeof value === 'string' ? value : value?.descricao;
            return name ? this._filter(name as string,this.optionsDirectorPedagogico) : this.optionsDirectorPedagogico.slice();
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



@ViewChild('listaDepartamento') listaDepartamento!: MatSelect;


myControlFaculdade = new FormControl<string | selects>('');
optionsFaculdade: selects[] = [];
filteredOptionsFaculdade!: Observable<selects[]>;  
@ViewChild('listaFaculdade') listaFaculdade!: MatSelect;
SetFaculdade(item:selects){
  this.Faculdade=item.descricao;
this.Faculdadestamp=item.chave;
    }
    
    myControlnivelacademico = new FormControl<string | selects>('');
    optionsnivelacademico: selects[] = [];
    filteredOptionsnivelacademico!: Observable<selects[]>;  

    
    tbccusto: string='';
    tbccustostamp: string='';

    onSelectccu(value:selects,index:number) {
      this.tbccustostamp=value.chave;
      this.tbccusto=value.descricao;
    }
    
    myControlccu = new FormControl<string | selects>('');
    optionsccu: selects[] = [];
    filteredOptionsccu!: Observable<selects[]>; 
    async  getCcusto() {
      const se:condicoesprocura={
        tabela:"ccu",
      campo1: "Descricao", 
      campo2:"codccu",
       condicao:"vazio"
      }      
      this._loginservice.getselectionPost(se).subscribe({
        next: (data) => {
          if (data.sucesso) {            
            this.optionsccu = data.dados.selects;
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



    @ViewChild('listanivelacademico') listanivelacademico!: MatSelect;
    nivelacademico:string='';
    nivelacademicostamp:string='';
    Setnivelacademico(item:selects){
      this.nivelacademico=item.descricao;
      this.nivelacademicostamp=item.chave;
        }
    async Getnivelacademico(){ 
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


const cl:curso={
  cursostamp: this.clstampvliw,
  codcurso: this.cadastro.value.codcurso,
  desccurso: this.cadastro.value.desccurso,
  tipo: this.dadosestudantes.tipo,
  status: this.statuss,
  nivel: this.nivelacademico,
  nivelstamp: this.nivelacademicostamp,
  cargahora: this.cadastro.value.cargahora,
  cursoeq:  this.cadastro.value.cursoeq,
  duracao: this.cadastro.value.duracao,
  codmec:  this.cadastro.value.codmec,
  habmec:  this.cadastro.value.habmec,
  obs: this.cadastro.value.obs,
  imagem: null,
  cCusto:this.tbccusto,
  ccustamp:  this.tbccustostamp,  
  ccudepstamp:   this.Departamentostamp,
  departamento:this.Departamento,
  pestamp:  this.DirectorPedagogicostamp,
  director: this.DirectorPedagogico,
  cursoacto:this.cadastro.value.cursoacto,
  cursodoc: this.cadastro.value.cursodoc,
  cursograd: [],
};
  const dadosssss=cl;

  // if(this.cadastro.invalid){
  //   Swal.fire('Erro!', `Caro Utilizador, preencha os campos vazios`, 'error'); 
  //   return

      
  // }
this.isSpinnerDisplayed=true

  const formData = new FormData();
  const _dadoscl=dadosssss
  var json_arr = JSON.stringify(_dadoscl);  
  formData.append("Curso",json_arr);
  const url = `${environment.APIurl}Curso/UploadFile`;
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
    Swal.fire('Erro!', `Não foi possivel executar a operação ${error}`, 'error'); 
    console.log(error)
  }).add(() => {
    this.working = false;
  });

return;

  



}

total:number=0;

totalstr:string='Total:  ';


 //------------------------------------------------Documentos----------------------------------------------------------
  get cursoacto(): FormArray {
   
    return this.cadastro.get('cursoacto') as FormArray;
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
visibilidadecursoacto:boolean=false;
//------------------------------------------Adiciona e remove linhas do docs---------------------------------------------
adicionarcursoacto() {
  this.visibilidadecursoacto=true;
let stamp =this.turmanotaservice.Stamp();
  this.cursoacto.push(this.fb.group({
    cursoactostamp:[stamp],
    cursostamp :[this.clstampvliw],
    data :[new Date()],
    titulo :[''],
    anosem :[0],
  }));
}
get cursodoc(): FormArray {   
  return this.cadastro.get('cursodoc') as FormArray;
 }

adicionarcursodoc() {
  this.visibilidadedoc=true;
let stamp =this.turmanotaservice.Stamp();
  this.cursodoc.push(this.fb.group({
    cursodocstamp:[stamp],
    cursostamp :[this.clstampvliw],
    documento :[''],
  }));
}







 







displayedColumns: string[] =[];
dataSource: Alauxiliar[]=[];
currentDate = new Date();


displayedColumnsturma: string[] =[];
dataSourceturma: Alauxiliar[]=[];

//GetDividadoaluno

displayedColumnsfinanceiro: string[] =[];
dataSourcefinanceiro: contacorrentelista[]=[];


Dadostemp(){

}

  eliminarestudante(stamp: string,descricao:string,index:number,tabela:string,nomecampochave:string):boolean {
  //id: string,tabela:string,nomecampochave:string
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
            this._loginservice.mostrarAlerta(`${tabela} eliminada com sucesso`, "Ok");
            return  data.sucesso;
          } else {
            this._loginservice.mostrarAlerta("Nao foi possível eliminar a "+tabela, "Erro");          
            return  false;
          }
        },
        error: () => {
          this._loginservice.mostrarAlerta("Erro de conexao", "Opps");          
          return false;
        }
      });

      return false;
    }

    return  false;
  }));
  
  return  false;
}

removercursoacto(index: number) {

  
  let grela=(<FormArray>this.cadastro.get('cursoacto')).controls[index].value;  
  //stamp: string,descricao:string,index:number,tabela:string,nomecampochave:string
 let ret=  this.eliminarestudante(grela.cursoactostamp,grela.displina,index,'cursoacto','cursoactostamp')

 this.cursoacto.removeAt(index);
 var lets=this.cursoacto;
if(lets.length>0){
this.visibilidadecursoacto=true;
}  else{  
this.visibilidadecursoacto=false;
}
}
removercursodoc(index: number) {  
  let grela=(<FormArray>this.cadastro.get('cursodoc')).controls[index].value;
 let ret= this.eliminarestudante(grela.cursodocstamp,grela.documento,index,'cursodoc','cursodocstamp')
 this.cursodoc.removeAt(index);
 var lets=this.cursodoc;
if(lets.length>0){
this.visibilidadedoc=true;
}  else{  
this.visibilidadedoc=false;
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

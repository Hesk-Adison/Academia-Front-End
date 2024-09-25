


import { AfterViewInit, Component, Inject, OnInit, QueryList, ViewChild, ViewChildren, forwardRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, MatNativeDateModule, MatRippleModule } from '@angular/material/core';

import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';

import { Cldocs, Cldocview, Clfamview, Clview } from 'src/Models/Cldocs';
import { environment } from 'src/environments/environment.development';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSelect } from '@angular/material/select';
import { cllingview, condicoesprocura, contacorrentelista, gradelviw, selects } from 'src/Models/CampoSessoes';
import { Observable, finalize, map, startWith } from 'rxjs';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { Alauxiliar } from 'src/Models/Alauxiliar';

import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Pe } from 'src/Models/Pe';
import { pelingview } from 'src/Models/pelingview';
import { pecadastroview } from 'src/Models/pecadastroview';
import { Pedoc } from 'src/Models/Pedoc';
import { Clbolsas } from 'src/Models/Clbolsas';
import { clbolsas } from 'src/Models/Clbolsas copy';
import Swal from 'sweetalert2';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { Matriculaservice } from 'src/app/Portal-da-Secretaria/MatriculaAluno/matriculaservice';

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
  selector: 'app-modal-estudantes',
  templateUrl: './modal-estudantes.component.html',
  styleUrls: ['./modal-estudantes.component.scss'],  
  providers: [
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
    A11yModule,
    CdkTableModule,
    CdkTreeModule,
    MatRippleModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
  ], 
})
export class ModalEstudantesComponent 
implements OnInit,AfterViewInit {
  //
  veradadeiro:boolean=false
  totalrecordturma:number=0;
  totalrecordturma1:number=0;
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
    this.cadastro.patchValue({
      estadocivil:item.descricao
    })
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

  minDate!: Date;
  maxDate!: Date;
  Dataemismin!:Date;
  Dataemismax!:Date;
  Datavalmin!:Date
  Datavalmax!:Date


  

  


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
        //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
      //Swal.fire('Sucesso!', `Operação executada com sucesso`, 'success');
      //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
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
      } else {
        //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
      //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
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
        //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
      //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
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
        //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
      //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
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

  this.cadastro.patchValue({statuss:item.descricao})
  alert(``)
  console.log(this.statuss)
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
        //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
      //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
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
        //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
      //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
    }
  });

}




myControlplanocurricular = new FormControl<string | selects>('');
optionsplanocurricular: selects[] = [];
filteredOptionsplanocurricular!: Observable<selects[]>;  
totalrecordplam:number=0;
@ViewChild('listaplanocurricular') listaplanocurricular!: MatSelect;
planocurricular:string='';
planocurricularstamp:string='';
Setplanocurricular(item:selects){
  this.planocurricular=item.descricao;
this.planocurricularstamp=item.chave;
this.cadastro.patchValue({
  gradestamp:  this.planocurricularstamp,
  descgrelha:  this.planocurricular,
})
this._loginservice.Getplanocurricularcurso(this.planocurricularstamp).subscribe({
  next: (data) => {
    if (data.sucesso) {    
      this.totalrecordplam= data.dados.dados.length;
      this.dataSourcegradl.data = data.dados.dados
      
    } else {
      //this._loginservice.mostrarAlerta("Nao foi possivel carregar", "Opps");
    }
  },
  error: (e) => {
    ////this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
  }
});
    }


    
 @ViewChildren(MatPaginator) paginatorTeste = new QueryList<MatPaginator>();
 ngAfterViewInit() {
  
  //this.dataListaturma.paginator = this.paginatorTeste.toArray()[0];
  //this.dataListadisciplinas.paginator=this.paginatorTeste.toArray()[1];
  this.dataSource.paginator=this.paginatorTeste.toArray()[0];
  this.dataSourceturma.paginator=this.paginatorTeste.toArray()[1];
  this.dataSourcegradl.paginator=this.paginatorTeste.toArray()[2];
  this.dataSourcefinanceiro.paginator=this.paginatorTeste.toArray()[3];
  
  // let set:selects={
  //   chave:  "rcll",
  //   descricao: "rcll",
  //   ordem: "rcll",
  // }
  // this._estudanteService.Iniciatileany(set).subscribe({
  //   next: (data) => {
  //     if (data.sucesso) {    
  //          this.totalrecordturma =data.dados.length;              
  //       this.dataListaturma.data = data.dados;  
  //       console.log( `Dados Inicializados`);      
  //       console.log( this.dataListaturma.data);      
  //     } 
  //   },
  //   error: (e) => {        
  //     Swal.fire('Opps!', 'Erro inesperado ao inicializar as linhas do recibo, contacta o Utilizador do sistema! ', 'error'); 
  //   }
  // });
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
        //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
      //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
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
        //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
      //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
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
        //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
      //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
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
        //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
      //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
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
        //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
      //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
    }
  });
}


paisnascimento:string='';
isSpinnerDisplayed = false;
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
        //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
      //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
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
  
//======================Teste======================
name1:string = 'Angular';

cldocumentos = new FormArray([]);



carregarDocs(afam: Cldocview[]) {
  this.visibilidadedoc=true;
  this.visibilidadedoc1=true;
  const formArray = this.cadastro.get('Docsview')?.get('Docs') as FormArray;
  afam.map(item => {
    formArray.push(this.aDocs(item));
  });
}
aDocs(item: Cldocview): any {  
  return this.fb.group({      
    cldocstamp : [item.cldocstamp],
    clstamp :[item.clstamp],
    documento : [item.documento],
    numero: [item.numero] ,
    localemis:[item.localemis],
    emissao :[item.emissao],
    validade : [item.validade],
    bi :[item.bi],
    //imagem :[item.imagem],
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
  //datanasc:Date=new Date();
  cadastro!:FormGroup
  Clfamlist: Clfamview[]=[]
  Cldocslist: Cldocview[]=[]
  DadosGerais!: Clview
  fotos: any  
  foto1: any  
  selectedFiless!: File;
  //datanascimento :Date=new Date();
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
      private _estudanteService : Matriculaservice,
      private fb:FormBuilder,
      private turmanotaservice: TurmaNotaService,private http: HttpClient,private sanitizer:
       DomSanitizer,
       private _loginservice: LoginServiceService,
       private modalActual: MatDialogRef<ModalEstudantesComponent>,
       @Inject(MAT_DIALOG_DATA) public dadosestudantes: Clview,
    ){  
      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 60, 0, 1);
   this.maxDate = new Date(currentYear -17, 11, 31);
this.Dataemismin = new Date(currentYear -5, 0,1)
this.Dataemismax = new Date(currentYear , 11,31)
this.Datavalmin=  new Date(currentYear , 0,1)
this.Datavalmax=new Date(currentYear +5, 11,31)




this.cadastro = this.fb.group({
  clstamp:[''],// preenche
  no: [''],
  nome: ['', [Validators.required]],
  morada:[''],
  localidade:[''],
  email:['',[Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
  //estado:[''],
  telefone:['',],
 // [Validators.pattern('/^8[2-7][0-9]{7}$/')]
  celular:[''],
  //[Validators.pattern('/^8[2-7][0-9]{9}$/')]
  nuit:  [0, [Validators.min(0)]],
  civil:[''],
  religiao:[''],
  pais:['', [Validators.required]],
  provincia:['',],
  distrito:[''],
  fax :[''],
  codpad: [0],
  coddist:  [0],
codprov :  [0],
  saldo :  [0],
  moeda :[''],
  status :[''],
  datacl :[''],// DateTime 
  obs :[''],
  prontopag : [false],
  tipo :[''],
  pos : [false],    
  codcurso :[''],
  curso :[''],
  gradestamp :[''],
  descgrelha :[''],
  anoingresso :[''],// DateTime
  bolseiro : [false],
  coddep :[''],
  departamento :[''],
  codfac :[''],
  faculdade :[''],      
  nofnc :[''],
  fnc :[''],
  datanasc : [new Date(1900,1,1),],// DateTime
  sexo :['', [Validators.required]],
  areafiscal :[''],//Direcao da area fiscal caso mozlec 
  aluno : [true],
  estadocivil :['', [Validators.required]],
  nivelac :[''],
  codaluno :[''],
  codesc :[''],
  escola :[''],
  planosaude: [false],
  medico :[''],
  hospital :[''],
  instplanosaude :[''],
  transp :[''],
  sozinho : [false],
  acompanhado : [false],
  //Fim de dados de estudante............
  codccu :  [0],
  ccusto :[''],
  ccustostamp :[''],
  deficilCobrar: [false],
  plafond :  [0],
  vencimento :  [0],
  generico : [false],
  desconto : [false],
  percdesconto :  [0],
  codCondPagamento :  [0],//Codigo de condicoes de Pagamento 
  descCondPagamento :[''],//Descricao de condicoes de Pagamento 
  insencao : [false],
  motivoInsencao :[''],
  cobrador :[''],
  clivainc : [false],
  //Tesoraria por defeito
  codtz :  [0],
  tesouraria :[''],
  localentregas :[''],//Usado para guardar o caminho da imagem
  //Conta do cliente no Plano de contas ...
  contaPgc :[''],
  //Grupo de cliente no PGC ex: 441...
  grupoclPgc :[''],
  //Descricao do Cl no PGC ex: Cliente conta corrente...
  descGrupoclPgc :[''],
  site :[''],
  variasmoradas : [false],
  tipocl :[''],//Classificador de clientes quanto ao desconto
  precoespecial : [false],///Define 
  ctrlplanfond :[false],//Controla Plafond de crédito
  contastamp :[''],
  mesavirtual : [false],//Mesa resultante de Juncao de mesas 
  possuifilial :  [false],//Indica que tem uma filial 
  contasstamp :[''],
  
  totalcc :[''],
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
datanascimento:[new Date( )],
dataingresso:[new Date()],
valorprpina:[0, [Validators.min(0)]],
})
    }
  
    nos:string='';
   async ngOnInit() {    
    //alert('alrtea')
  this.displayedColumns= ['codigo','descricao','accoes','Datas','anosems','anolects','refs'   ];
  this.totalrecordturma1=this.totalrecordturma=this.auxiliarclass.length;
  this.dataSourceturma.data =  this.dataSource.data = this.auxiliarclass;
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
     this.Gettipobolsa();
     this.getDocumenetis();
     if (this.dadosestudantes.clstamp != "" && this.dadosestudantes != null && 
     this.dadosestudantes.clstamp.length>0) {
      
      this.cadastro.patchValue({
        clstamp: this.dadosestudantes.clstamp,// preenche       
  no: this.dadosestudantes.no,
  nome: this.dadosestudantes.nome,
  morada: this.dadosestudantes.morada,
  codprov: this.dadosestudantes.codprov,
  coddist: this.dadosestudantes.coddist,
  codpad: this.dadosestudantes.codpad,
  localidade: this.dadosestudantes.localidade,
  distrito:  this.dadosestudantes.distrito,
  provincia:  this.dadosestudantes.provincia,
  telefone:  this.dadosestudantes.telefone,
  celular:  this.dadosestudantes.celular,
  fax:  this.dadosestudantes.fax,
  email:  this.dadosestudantes.email,
  nuit:  this.dadosestudantes.nuit,
  saldo:  this.dadosestudantes.saldo,
  moeda:  this.dadosestudantes.moeda,
  status:  this.dadosestudantes.status,
  obs:  this.dadosestudantes.obs,
  prontopag:  this.dadosestudantes.prontopag,
  tipo:  this.dadosestudantes.tipo,
  pos:  this.dadosestudantes.pos,
  pais:  this.dadosestudantes.pais,
  codcurso:  this.dadosestudantes.codcurso,
  curso:  this.dadosestudantes.curso,
  gradestamp:  this.dadosestudantes.gradestamp,
  descgrelha:  this.dadosestudantes.descgrelha,
  anoingresso:  this.dadosestudantes.anoingresso,
  bolseiro:  this.dadosestudantes.bolseiro,
  coddep:  this.dadosestudantes.coddep,
  departamento:  this.dadosestudantes.departamento,
  codfac:  this.dadosestudantes.codfac,
  faculdade:  this.dadosestudantes.faculdade,
  nofnc:  this.dadosestudantes.nofnc,
  fnc:  this.dadosestudantes.fnc,
  datanasc:  this.dadosestudantes.datanasc,
  sexo:  this.dadosestudantes.sexo,
  areafiscal:  this.dadosestudantes.areafiscal,
  aluno:  this.dadosestudantes.aluno,
  estadocivil:  this.dadosestudantes.estadocivil,
  religiao: this.dadosestudantes.religiao,
  nivelac:  this.dadosestudantes.nivelac,
  codaluno:  this.dadosestudantes.codaluno,
  codesc:  this.dadosestudantes.codesc,
  escola:  this.dadosestudantes.escola,
  planosaude:  this.dadosestudantes.planosaude,
  medico:  this.dadosestudantes.medico,
  hospital:  this.dadosestudantes.hospital,
  instplanosaude:  this.dadosestudantes.instplanosaude,
  transp:  this.dadosestudantes.transp,
  sozinho:  this.dadosestudantes.sozinho,
  acompanhado:  this.dadosestudantes.acompanhado,
  codccu:  this.dadosestudantes.codccu,
  ccusto:  this.dadosestudantes.ccusto,
  ccustostamp:  this.dadosestudantes.ccustostamp,
  deficilCobrar:  this.dadosestudantes.deficilCobrar,
  plafond:  this.dadosestudantes.plafond,
  vencimento:  this.dadosestudantes.vencimento,
  generico:  this.dadosestudantes.generico,
  desconto:  this.dadosestudantes.desconto,
  percdesconto:  this.dadosestudantes.percdesconto,
  codCondPagamento:  this.dadosestudantes.codCondPagamento,
  descCondPagamento:  this.dadosestudantes.descCondPagamento,
  insencao:  this.dadosestudantes.insencao,
  motivoInsencao:  this.dadosestudantes.motivoInsencao,
  cobrador:  this.dadosestudantes.cobrador,
  clivainc:  this.dadosestudantes.clivainc,
  codtz:  this.dadosestudantes.codtz,
  tesouraria:  this.dadosestudantes.tesouraria,
  localentregas:  this.dadosestudantes.localentregas,
  contaPgc:  this.dadosestudantes.contaPgc,
  grupoclPgc:  this.dadosestudantes.grupoclPgc,
  descGrupoclPgc:  this.dadosestudantes.descGrupoclPgc,
  site:  this.dadosestudantes.site,
  variasmoradas:  this.dadosestudantes.variasmoradas,
  tipocl:  this.dadosestudantes.tipocl,
  precoespecial:  this.dadosestudantes.precoespecial,
  ctrlplanfond:  this.dadosestudantes.ctrlplanfond,
  contastamp:  this.dadosestudantes.contastamp,
  mesavirtual:  this.dadosestudantes.mesavirtual,
  possuifilial:  this.dadosestudantes.possuifilial,
  contasstamp:  this.dadosestudantes.contasstamp, 
});
this.planocurricularstamp=this.dadosestudantes.gradestamp;
this.planocurricular=this.dadosestudantes.descgrelha;
this.Curso=this.dadosestudantes.curso;
this.Cursostamp=this.dadosestudantes.codcurso;
this.sexo=this.dadosestudantes.sexo;
this.reliagiao=this.dadosestudantes.religiao;
this.paisnascimento=this.dadosestudantes.pais;
this.pprovnascimento=this.dadosestudantes.provincia
this.distrnascimento=this.dadosestudantes.distrito;
this.Departamentostamp=this.dadosestudantes.departamento;
this.Departamento=this.dadosestudantes.coddep;
this.Faculdade=this.dadosestudantes.faculdade;
this.Faculdadestamp=this.dadosestudantes.codfac;
this.tipoaluno=this.dadosestudantes.tipocl;
this.nivelacademico=this.dadosestudantes.nivelac;
this.ccu1=this.dadosestudantes.ccusto;
this.ccu1stamp=this.dadosestudantes.ccustostamp;
this.statuss=this.dadosestudantes.status;

      this.clstampvliw=this.dadosestudantes.clstamp;
      this.Getcontacorrente();
      this.titloAccao = "Editar Estudante";
      this.botaoAccao = "Actualizar";
let ss:selects={
  chave: this.dadosestudantes.codcurso,
  descricao: this.dadosestudantes.curso,
  ordem: this.dadosestudantes.curso
}


this.Curso=this.dadosestudantes.curso;
this.Cursostamp=this.dadosestudantes.codcurso;
      this.Getplanocurricular(ss)
      
if  (this.dadosestudantes.cldocview!=null &&this.dadosestudantes.cldocview!=undefined&&this.dadosestudantes.cldocview.length>0){ 
  this.carregarDocs(this.dadosestudantes.cldocview);
}
if(this.dadosestudantes.cllingview!=null &&this.dadosestudantes.cllingview!=undefined&& this.dadosestudantes.cllingview.length>0){
  this.carregarlinguas(this.dadosestudantes.cllingview);
}
if(this.dadosestudantes.clbolsaview!=null &&this.dadosestudantes.clbolsaview!=undefined&& this.dadosestudantes.clbolsaview.length>0){
  this.CarregarBolsas(this.dadosestudantes.clbolsaview);
}
if(this.dadosestudantes.clfamview!=null &&this.dadosestudantes.clfamview!=undefined&&this.dadosestudantes.clfamview.length>0){
  this.CarregaragrdadosFamil(this.dadosestudantes.clfamview);
}


this.myControlstatuss.setValue(this.dadosestudantes.status)
this.myControlCurso.setValue(this.dadosestudantes.curso)
this.myControlestadociv.setValue(this.dadosestudantes.estadocivil)
this.myControlreliagiao.setValue(this.dadosestudantes.religiao)
this.myControlpaises.setValue(this.dadosestudantes.pais)
this.myControldistrito.setValue(this.dadosestudantes.distrito)
this.myControlnivelacademico.setValue(this.dadosestudantes.nivelac)
this.myControlplanocurricular.setValue(this.dadosestudantes.descgrelha)
this.myControlFaculdade.setValue(this.dadosestudantes.faculdade)
this.myControlDepartamento.setValue(this.dadosestudantes.coddep)
this.myControlccu1.setValue(this.dadosestudantes.ccusto)
this.myControlinstituicaoensino.setValue(this.dadosestudantes.ccusto)
this.myControltipoaluno.setValue(this.dadosestudantes.tipo)
this.myControl.setValue(this.dadosestudantes.provincia)
this.myControlsexo.setValue(this.dadosestudantes.sexo)
//this.myControlnivelacademico
this._loginservice.Getplanocurricularcurso(this.dadosestudantes.gradestamp).subscribe({
  next: (data) => {
    if (data.sucesso) {    
      this.totalrecordplam= data.dados.dados.length;
      this.dataSourcegradl.data = data.dados.dados
      
    } else {
      //this._loginservice.mostrarAlerta("Nao foi possivel carregar", "Opps");
    }
  },
});
//myControlestadociv
}
     else {
      this.clstampvliw=this.turmanotaservice.Stamp();      
     this.titloAccao = "Novo Estudante";
     this.botaoAccao = "Salvar";
     this.cadastro.patchValue({clstamp:this.clstampvliw})
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
        //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
      //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
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
        //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
      //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
    }
  });

}

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
        //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
      //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
    }
  });

}


myControlFaculdade = new FormControl<string | selects>('');
optionsFaculdade: selects[] = [];
filteredOptionsFaculdade!: Observable<selects[]>;  
@ViewChild('listaFaculdade') listaFaculdade!: MatSelect;

    myControlnivelacademico = new FormControl<string | selects>('');
    optionsnivelacademico: selects[] = [];
    filteredOptionsnivelacademico!: Observable<selects[]>;  
    
    @ViewChild('listanivelacademico') listanivelacademico!: MatSelect;
    nivelacademico:string='';
    Setnivelacademico(item:selects){
      this.nivelacademico=item.descricao;
      this.cadastro.patchValue({nivelac:this.nivelacademico});
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
            //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
          }
        },
        error: (e) => {
          //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
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
            //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
          }
        },
        error: (e) => {
          //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
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
    let testedata = new Date();
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
            //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
          }
        },
        error: (e) => {
          //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
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
            //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
          }
        },
        error: (e) => {
          //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
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
         this.fotos=reader.result;
        };
        this.uploadFile = event.target.files[0];
        this.uploadFileLabel = this.uploadFile?.name;
        this.selectedFile= event.target.files[0];
      }
    }


Cadastrar( )
{
this.cadastro.value.clstamp=this.clstampvliw;
this.Clfamlist=this.cadastro.value.clfamview.items;
this.Cldocslist = this.cadastro.value.Docsview.Docs;
let bolsa=this.cadastro.value.Bolsaview.bols
let linguas=this.cadastro.value.mancfam 



const cl:Clview={
  clstamp: this.cadastro.value.clstamp,
  no: this.cadastro.value.no,
  nome: this.cadastro.value.nome,
  morada: this.cadastro.value.morada,
  codprov: this.cadastro.value.codprov,
  coddist: this.cadastro.value.coddist,
  codpad: this.cadastro.value.codpad,
  localidade: this.cadastro.value.localidade,
  distrito: this.cadastro.value.distrito,
  provincia: this.cadastro.value.provincia,
  telefone: this.cadastro.value.telefone,
  celular: this.cadastro.value.celular,
  fax: this.cadastro.value.fax,
  email: this.cadastro.value.email,
  nuit: this.cadastro.value.nuit,
  saldo: this.cadastro.value.saldo,
  moeda: this.cadastro.value.moeda,
  status: this.cadastro.value.status,
  datacl:'',
  obs: this.cadastro.value.obs,
  prontopag: this.cadastro.value.prontopag,
  tipo: this.cadastro.value.tipo,
  pos: this.cadastro.value.pos,
  pais: this.cadastro.value.pais,
  codcurso: this.cadastro.value.codcurso,
  curso: this.cadastro.value.curso,
  gradestamp: this.cadastro.value.gradestamp,
  descgrelha: this.cadastro.value.descgrelha,
  anoingresso :'',// DateTime
  bolseiro: this.cadastro.value.bolseiro,
  coddep: this.cadastro.value.coddep,
  departamento: this.cadastro.value.departamento,
  codfac: this.cadastro.value.codfac,
  faculdade: this.cadastro.value.faculdade,
  //Dados do cliente fornecedor 
  nofnc: this.cadastro.value.nofnc,
  fnc: this.cadastro.value.fnc,
  datanasc :'',// DateTime
  sexo: this.cadastro.value.sexo,
  areafiscal: this.cadastro.value.areafiscal, //Direcao da area fiscal caso mozlec 
  aluno: this.cadastro.value.aluno,
  estadocivil: this.cadastro.value.estadocivil,
  religiao: this.cadastro.value.religiao,
  nivelac: this.cadastro.value.nivelac,
  codaluno: this.cadastro.value.codaluno,
  codesc: this.cadastro.value.codesc,
  escola: this.cadastro.value.escola,
  planosaude: this.cadastro.value.planosaude,
  medico: this.cadastro.value.medico,
  hospital: this.cadastro.value.hospital,
  instplanosaude: this.cadastro.value.instplanosaude,
  transp: this.cadastro.value.transp,
  sozinho: this.cadastro.value.sozinho,
  acompanhado: this.cadastro.value.acompanhado,
  //Fim de dados de estudante............
  codccu: this.cadastro.value.codccu,
  ccusto: this.cadastro.value.ccusto,
  ccustostamp: this.cadastro.value.ccustostamp,
  deficilCobrar: this.cadastro.value.deficilCobrar,
  //Valor maximo de crédito que pode ser atribuido ao cliente..
  plafond: this.cadastro.value.plafond,
  //Tempo para vencimento de facturas 
  vencimento: this.cadastro.value.vencimento,
  generico: this.cadastro.value.generico,
  desconto: this.cadastro.value.desconto,
  percdesconto: this.cadastro.value.percdesconto,
  codCondPagamento: this.cadastro.value.codCondPagamento, //Codigo de condicoes de Pagamento 
  descCondPagamento: this.cadastro.value.descCondPagamento, //Descricao de condicoes de Pagamento 
  insencao: this.cadastro.value.insencao,
  motivoInsencao: this.cadastro.value.motivoInsencao,
  cobrador: this.cadastro.value.cobrador,
  clivainc: this.cadastro.value.clivainc,
  codtz: this.cadastro.value.codtz,
  tesouraria: this.cadastro.value.tesouraria,
  localentregas: this.cadastro.value.localentregas,
  contaPgc: this.cadastro.value.contaPgc,
  grupoclPgc: this.cadastro.value.grupoclPgc,
  descGrupoclPgc: this.cadastro.value.descGrupoclPgc,
  site: this.cadastro.value.site,
  variasmoradas: this.cadastro.value.variasmoradas,
  tipocl: this.cadastro.value.tipocl, //Classificador de clientes quanto ao desconto
  precoespecial: this.cadastro.value.precoespecial, ///Define 
  ctrlplanfond: this.cadastro.value.ctrlplanfond, //Controla Plafond de crédito
  contastamp: 'contastamp',
  mesavirtual: this.cadastro.value.mesavirtual, //Mesa resultante de Juncao de mesas 
  possuifilial: this.cadastro.value.possuifilial, //Indica que tem uma filial 
  contasstamp: 'contastamp',
  clfamview: this.Clfamlist,
  cldocview: this.Cldocslist,
  clbolsaview: bolsa,
  cllingview: [],
  // anoingresso: '',
  // datanasc: '',
  // datacl:''
  
}
cl.clbolsaview=bolsa;
cl.cllingview=linguas;
cl.gradestamp=this.planocurricularstamp;
cl.descgrelha=this.planocurricular;
cl.curso=this.Curso;
cl.codcurso=this.Cursostamp;
cl.sexo=this.sexo;
cl.estadocivil=this.estadocivil;
cl.religiao=this.reliagiao;
cl.pais=this.paisnascimento;
cl.provincia=this.pprovnascimento
cl.codprov=0;
cl.distrito=this.distrnascimento;
cl.departamento=this.Departamentostamp;
cl.coddep=this.Departamento;
cl.faculdade=this.Faculdade;
cl.codfac=this.Faculdadestamp;
cl.tipocl=this.tipoaluno;
cl.datanasc=moment(this.cadastro.value.datanascimento).format('YYYY-MM-DD')
cl.anoingresso=moment(this.cadastro.value.dataingresso).format('YYYY-MM-DD')
cl.nivelac=this.nivelacademico;
cl.ccusto=this.ccu1;
cl.ccustostamp=this.ccu1stamp;
cl.datacl=cl.datanasc;
cl.status=this.statuss;
  const dadosssss=cl;


if(cl.nome.length<=0){
  Swal.fire('Erro!', 'Caro Utilizador,o campos Nome é obrigatorio!', 'error');
  return
}
let ano = new Date()
let dateyear = moment(this.cadastro.value.datanasc).year()

if( dateyear==1900 ){
Swal.fire('Erro!', 'Caro Utilizador,Adicione o ano de nascimento do estudante', 'error');
return
}

if (dateyear <  this.minDate.getFullYear()){
  Swal.fire('Erro!', 'Caro Utilizador,Adicione o ano de nascimento do estudante', 'error');
return
}

// else if(cl.morada.length<=0){
//   Swal.fire('Erro!', 'Caro Utilizador,o campos Morada é obrigatorio!', 'error');
//   return
// }
else if(cl.pais.length<=0){
  Swal.fire('Erro!', 'Caro Utilizador,o campos Pais é obrigatorio!', 'error');
  return
}
else if(cl.nuit<=2){
  Swal.fire('Erro!', 'Caro Utilizador,o campos nuit é obrigatorio!', 'error');
  return
}
// else if(cl.sexo.length<=0){
//   Swal.fire('Erro!', 'Caro Utilizador,o campos Sexo é obrigatorio!', 'error');
//   return
// }
else{


  // if(cl.cldocview.length<=0 ){

  //   Swal.fire('Erro!', 'Caro Utilizador, preencha os campos de documentos do Estudante!', 'error');
  //   return
  // }


    
    this.isSpinnerDisplayed = true

  const formData = new FormData();  

    formData.append('Imagem', this.selectedFile);  
  const _dadoscl=dadosssss
  var json_arr = JSON.stringify(_dadoscl);  
  formData.append("Cl",json_arr);  
  const url = `${environment.APIurl}Users/UploadFile`;
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
  }
  
  );
return;


}
}

total:number=0;

totalstr:string='Total:  ';


 //------------------------------------------------Documentos----------------------------------------------------------
  get Docs(): FormArray {
   
    return this.cadastro.get('Docsview')?.get('Docs') as FormArray;
   }

   get bolss(): FormArray {  
    
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
  
  //(<FormArray>this.cadastro.get('Docsview')?.get('Docs')).controls[i].value.localemis= this.descricaoProvincia
  
  
  let langArr = (<FormArray>this.cadastro.get('Docsview')?.get('Docs'));
  langArr.controls[i].patchValue({localemis:value.descricao,
        })
}
onSelectbi(value:selects,i:number) {
  //(<FormArray>this.cadastro.get('Docsview')?.get('Docs')).controls[i].value.documento= value.descricao
  
  let langArr = (<FormArray>this.cadastro.get('Docsview')?.get('Docs'));
  langArr.controls[i].patchValue({documento:value.descricao,
        })
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
      clfamstamp :[stamp],
      clstamp :[this.clstampvliw],
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
         //console.log(btoa(binaryString));
         
  let langArr = (<FormArray>this.cadastro.get('Docsview')?.get('Docs'));
  langArr.controls[this.index].patchValue({file:this.base64textString});
 }
private base64textString:String="";
  
  handleFileSelect(evt:any){
     
  }

//------------------------------------------Adiciona e remove linhas do docs---------------------------------------------
adicionarDocs() {
  
  this.visibilidadedoc1=true;
let stamp =this.turmanotaservice.Stamp();
  this.Docs.push(this.fb.group({
    cldocstamp : [stamp],
    clstamp :[this.clstampvliw],
    documento :[''],
    numero:[''] ,
    localemis:[''],
    emissao :[new Date(1900,1,1)],
    validade : [new Date(2024,1,1)],
    bi :[false],
    //imagem :[''],
    file:['']
  }));
}



adicionarbolsa(){
  
  this.visibilidadebolsa=true;
  let stamp =this.turmanotaservice.Stamp();
  let ano=new Date().getFullYear();
  this.bolss.push(this.fb.group({
    clstamp :[this.clstampvliw],
    clBolsastamp :[stamp],
    instituicao:['ISEDEF'],
    tipobolsa :['Parcial'],
    datain:[new Date(1900,1,1)],
    datatermino :[new Date(2024,1,1)],
    anolectivo:[ano],
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

carregarlinguas(afam: cllingview[]) {
  this.visibilidadelingua=true;
  const formArray = this.cadastro.get("mancfam") as FormArray;
  afam.map(item => {
    formArray.push(this.alinguas(item));
  });
}
alinguas(item: cllingview): any {  

  return this.fb.group({      
    clstamp :[item.clstamp],
    cllingstamp:[item.cllingstamp],
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








CarregarBolsas(afam: clbolsas[]) {
  this.visibilidadebolsa=true;
  const formArray = this.bolss;
  afam.map(item => {
    formArray.push(this.aBolsas(item));
  });
}
aBolsas(item: clbolsas): any {  

  return this.fb.group({      
    clBolsastamp :[item.clBolsastamp],
    clstamp:[item.clstamp],
    instituicao:[item.instituicao],
    tipobolsa :[item.tipobolsa ],
    datain:[new Date(item.datain)],
    datatermino : [new Date(item.datatermino)],
    anolectivo: [item.anolectivo],
    valor:[item.valor],
    perc:[item.perc],
    obs:[item.obs]
  })
  }



  


  CarregaragrdadosFamil(afam: Clfamview[]) {

    this.visibilidadeagregado=true;
    const formArray = this.items;
    afam.map(item => {
      formArray.push(this.aClfamview(item));
    });

    
  }
  aClfamview(item: Clfamview): any { 
    return this.fb.group({      
      clfamstamp :[item.clfamstamp],
      clstamp :[item.clstamp],
      nome :[item.nome],
      grau :[item.grau],
      tel :[item.tel],
      email :[item.email],
    })
    }

displayedColumns: string[] =[];
dataSourcelis: Alauxiliar[]=[];
currentDate = new Date();

dataSource = new MatTableDataSource(this.dataSourcelis);


displayedColumnsturma: string[] =[];
dataSourceg: Alauxiliar[]=[];
//dataSourceturma: Alauxiliar[]=[];

dataSourceturma = new MatTableDataSource(this.dataSourceg);
displayedColumnsgridview: string[] =[];
dataSourcegradlsssss: gradelviw[]=[];


dataSourcegradl= new MatTableDataSource(this.dataSourcegradlsssss);


//GetDividadoaluno

displayedColumnsfinanceiro: string[] =[];
dataSourcefinanceiros: contacorrentelista[]=[];

dataSourcefinanceiro= new MatTableDataSource(this.dataSourcefinanceiros);

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
onFileChangeDoc(event:any,i:number) {
  const reader = new FileReader();   
  if(event.target.files && event.target.files.length) {


    const reader1 = new FileReader();
    this.selectedFiless=event.target.files[0];
    reader1.readAsDataURL(this.selectedFiless);
    reader1.onload = () => {
       this.foto1=reader1.result;
      if(reader1!=null){
        const blob = new Blob([this.foto1], { type: this.selectedFiless.type });
      
        
         
      }
    };


    const [file] = event.target.files;
    reader.readAsDataURL(file);    
    reader.onload = () => {
     this.fotos=reader.result; 
    };
    this.uploadFile = event.target.files[0];
    this.uploadFileLabel = this.uploadFile?.name;
  }
}
removerBolsa(index: number) {


  let langArr = (<FormArray>this.cadastro.get('Bolsaview')?.get('bols'));
  let dados = langArr.controls[index].value
  let ret= this.eliminarestudante(dados.clBolsastamp,dados.instituicao,index,'clBolsa','clBolsastamp')
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
case 'clbolsa':   
if(this.veradadeiro==true){
  this.bolss.removeAt(index);
  var lets=this.cadastro.get('Bolsaview')?.get('bols') as FormArray
  if(lets.length>0){
  this.visibilidadebolsa=true;
  }  else{  
  this.visibilidadebolsa=false;
  }
}  else{  
//this.turmadisc.clear();
//this.visibilidadeturmadisc=false;
}

break;
// case 'matriculaturmaalunol':
// if(this.veradadeiro==true){    
// this.removergri(index);

// }
//   break;
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

 
async Getcontacorrente(){ 
 // Swal.fire('Ok!', this.clstampvliw, 'success') ;
  this._loginservice.GetDividadoaluno(this.clstampvliw).subscribe({
    next: (data) => {
      if (data.sucesso) {        
       this.total=data.dados.total;
      //  for (let i = 0; i < data.dados.contacorrentelistas.length; i++) {
      //   data.dados.contacorrentelistas[i].dataven = moment(data.dados.contacorrentelistas[i].dataven).format('DD-MM-YYYY');
      //   data.dados.contacorrentelistas[i].data = moment(data.dados.contacorrentelistas[i].data).format('DD-MM-YYYY');
       
  
      // }
this.totalinhasfinanceiro=data.dados.contacorrentelistas.length;
       this.dataSourcefinanceiro.data = data.dados.contacorrentelistas;     
        
      } else {
       // //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
       Swal.fire('Erro!', 'Nao foi possivel carregar as moedas!', 'error');

      }
    },
    error: (e) => {
     // //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
    }
  });

}

totalinhasfinanceiro:number=0;
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
        ////this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
     // //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
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
        //
      Swal.fire('Sucesso!', `Operação executada com sucesso`, 'success'); 
        //this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
      }
    },
    error: (e) => {
      ////this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
    }
  });
}





}
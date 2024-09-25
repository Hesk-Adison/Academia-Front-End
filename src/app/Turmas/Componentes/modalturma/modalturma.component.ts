// import { Component, Inject, NgModule, OnInit, ViewChild, forwardRef } from '@angular/core';
// import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
// import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
// import { TurmaNotaService } from 'src/Service/turma-nota.service';
// import { HttpClient, HttpClientModule, HttpEventType, HttpRequest } from '@angular/common/http';
// import { Cldocview, Clfamview, Clview } from 'src/Models/Cldocs';
// import { environment } from 'src/environments/environment.development';
// import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
// import { MatSelect, MatSelectModule } from '@angular/material/select';
// import { cllingview, condicoesprocura, contacorrentelista, gradelviw, selects } from 'src/Models/CampoSessoes';
// import { Observable, finalize, map, startWith } from 'rxjs';
// import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
// import { Alauxiliar } from 'src/Models/Alauxiliar';
// import * as moment from 'moment';
// import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { Pe } from 'src/Models/Pe';
// import { pelingview } from 'src/Models/pelingview';
// import { pecadastroview } from 'src/Models/pecadastroview';
// import { Pedoc } from 'src/Models/Pedoc';
// // import { MY_DATA_FORMATS } from 'src/app/modal-estudantes/modal-estudantes.component';
// import { MY_DATA_FORMATS } from 'src/app/listaestudantes/modal-estudantes/modal-estudantes.component';
// import Swal from 'sweetalert2';
// import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
// import { MatCardModule } from '@angular/material/card';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { AsyncPipe, CommonModule, NgSwitch } from '@angular/common';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faCake } from '@fortawesome/free-solid-svg-icons';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { RouterLink, RouterModule } from '@angular/router';
// import { MatListModule } from '@angular/material/list';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { AppRoutingModule } from 'src/app/app-routing.module';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from 'src/app/app.module';
// import { horario, turma, turmadisc, turmal, turmanota } from '../../todastabelasturma';
// import { ModalPeComponent } from 'src/app/clcadastro/cadastro-pessoa/Modal/modal-pe/modal-pe.component';
// import { Turmaservico } from '../../sertvico/turmaservico';
// import { campoDashboard } from 'src/Models/campoDashboard';
// import { dmzviewgrelha } from 'src/app/Interfaces/Grade/dmzviewgrelha';
// import { dmzview } from 'src/app/Interfaces/Grade/dmzview';
// import { EmailServiceService } from 'src/Service/EmailService/EmailService/email-service.service';


// @Component({
//   selector: 'app-modalturma',
//   templateUrl: './modalturma.component.html',
//   styleUrls: ['./modalturma.component.scss'],  
//   providers: [
//     MatDatepickerModule,  
//     { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS },
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => 'lingua'),
//       multi: true,
//     }
    
//   ],
//   standalone: true,
//   imports: [MatTableModule, MatPaginatorModule,MatSortModule,
//     MatFormFieldModule,
//     MatInputModule,
//     ReactiveFormsModule,
//     MatCardModule,MatIconModule,
//     MatDividerModule, MatDialogModule,MatTabsModule,MatDatepickerModule,
//     MatNativeDateModule ,MatSlideToggleModule ,  
//     MatAutocompleteModule,
//     AsyncPipe,
//     FormsModule,
//     MatProgressSpinnerModule , MatMenuModule,
//     CommonModule
//   ], 
// })
// export class ModalturmaComponent 
// implements OnInit {  
//   @ViewChild(MatPaginator, { static: true})  paginacaoTabela!: MatPaginator;
//   initialLoad() {
//     //this.isSpinnerDisplayed = false
//     if(this.clstampvliw.length==0){
//       return;
//     }
//     this.isSpinnerDisplayed =true;
//     let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
//         let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
//     this._estudanteService.GetHorariofromturma(this.clstampvliw, currentPage, pageSize).pipe(
//       finalize(() => this.isSpinnerDisplayed = false),
//     ).subscribe(result => {
//       if (result) {
//         this.totalRecords = result.totalCount;
//         this.dataListaestudante.data = result.data;
//         this.pagenumber = currentPage;
//         this.pagesize = pageSize;
//         this.pagetotalrecord=result.totalCount;
//       }
//     });
// }
// pe!:Pe
// editarestudante(pe: Pe) {
//   this.dialog.open(ModalPeComponent, {
//     height: '85%',
//     width: '77%',
//     disableClose: true,
//     data: pe,
//     autoFocus: false,
//     enterAnimationDuration: '1000ms',
//     exitAnimationDuration: '1000ms',
//   }).afterClosed().subscribe(resultado => {
//     if (resultado === "true") {
//         //this.initialLoad();
//     }
//   });
// }
//   //


//   totalRecords: number = 0;
  
//   pagenumber: number = 0;
//   pagesize: number = 0;
  
//   pagetotalrecord: number = 0;
//   isSpinnerDisplayed = false;
//   listestudante: horario[] = [];
//   dataListaestudante = new MatTableDataSource(this.listestudante);

  
// @ViewChild(MatPaginator, { static: true})  paginacaoTabelaprofessor!: MatPaginator;
//   totalRecordsprofess: number = 0;  
//   pagenumberprofess: number = 0;
//   pagesizeprofess: number = 0;
//   pagetotalrecordprofess: number = 0;
//   isSpinnerDisplayedprofess = true;
//   listestudanteprofess: Pe[] = [];
//   dataListaestudanteprofess = new MatTableDataSource(this.listestudanteprofess);
//   listestudanteprofessturma: dmzview[] = [];
//   dataListaestudanteprofessturma = new MatTableDataSource(this.listestudanteprofessturma); 
//   pageIndex: number = 0;
//   pageIndexprofessor: number = 0;
//   confirmPageChangeprofesor(pageEvent: PageEvent) {
//     this.pageIndexprofessor=pageEvent.pageIndex;
//     this.paginacaoTabelaprofessor.pageSize=pageEvent.pageSize;    
//     this.paginacaoTabelaprofessor.pageIndex=pageEvent.pageIndex;
//     this.initialLoadprofessfromtruma();
//   }
//   initialLoadprofessfromtruma() {

//     if(this.clstampvliw.length==0){
//       return;
//     }
    
// //     let currentPage = (this.paginacaoTabelaprofessor?.pageIndex ?? 0) + 1;
// //         let pageSize = (this.paginacaoTabelaprofessor?.pageSize ?? 0);
// // this._estudanteService.GetHorariofromturma(this.clstampvliw, currentPage, pageSize).pipe(
// //   finalize(() => this.isSpinnerDisplayed = false),
// // ).subscribe(result => {
// //   if (result) {
// //     this.totalRecords = result.totalCount;
// //     this.dataListaestudante.data = result.data;
// //     this.pagenumber = currentPage;
// //     this.pagesize = pageSize;
// //     this.pagetotalrecord=result.totalCount;
// //   }
// // });



//     this.isSpinnerDisplayedprofess =false;    
//     this._estudanteService.GetDados(this.clstampvliw,"turmadiscp").pipe(
//       finalize(() => this.isSpinnerDisplayedprofess = false),
//     ).subscribe(result => {
//       if (result.sucesso) {
//         this.dataListaestudanteprofessturma.data = result.dados.dmzview;        
//         this.totalRecordsprofess = result.dados.dmzview.length;
//         this.pagenumberprofess = 1;
//         this.pagesizeprofess = 50;
//         this.pagetotalrecordprofess=result.dados.dmzview.length;
//       }
//     });
// }


//   initialLoadprofess(dmzview:dmzview   
//   ) {
//     var pesta=dmzview.col3;
//     var turmastamp=dmzview.col4;
//     const cl:Pe={
//       pestamp: '',
//       no: '',
//       nome: '',
//       nuit: 0,
//       bi: '',
//       codsit: 0,
//       situacao: '',
//       datanasc: '',
//       dataAdmissao: '',
//       dataFimContrato: '',
//       dataDemissao: '',
//       sexo: '',
//       ecivil: '',
//       dcasa: '',
//       nacional: '',
//       pais: '',
//       provNasc: '',
//       distNasc: '',
//       padNasc: '',
//       bairro: '',
//       provMorada: '',
//       distMorada: '',
//       padMorada: '',
//       locali: '',
//       pai: '',
//       mae: '',
//       codNivel: 0,
//       nivel: '',
//       codCateg: 0,
//       categ: '',
//       codprof: 0,
//       prof: '',
//       codep: 0,
//       depart: '',
//       codrep: 0,
//       repart: '',
//       nrinss: '',
//       balcaoInss: '',
//       dataInss: '',
//       relPonto: false,
//       valBasico: 0,
//       horasdia: 0,
//       nrdepend: 0,
//       obs: '',
//       codtipo: '',
//       tipo: '',
//       codccu: '',
//       ccusto: '',
//       ccustamp: '',
//       diasmes: 0,
//       horasSemana: 0,
//       salHora: 0,
//       tabIrps: '',
//       codRepFinancas: '',
//       descRepFinancas: '',
//       apolice: '',
//       dataApoliceIn: '',
//       dataApoliceTer: '',
//       seguradora: '',
//       moeda: '',
//       naoInss: false,
//       naoIRPS: false,
//       tirpsstamp: '',
//       ntabelado: false,
//       pontonome: '',
//       formapag: '',
//       codformp: 0,
//       dataadm: '',
//       reDataadm: '',
//       basedia: 0,
//       Pedagogico: false,
//       coordenador: false,
//       email: ''
//     };
//     this.pe=cl;
//     if(dmzview.col3.length==0){
//       return;
//     }
//     this.isSpinnerDisplayedprofess =false;    
//     this._estudanteService.Getprofessor(dmzview.col3).pipe(
//       finalize(() => this.isSpinnerDisplayedprofess = false),
//     ).subscribe(result => {
//       if (result.sucesso) {
//         this.dataListaestudanteprofess.data = result.dados.pe;        
//         this.totalRecordsprofess = result.dados.pe.length;
//         this.pe=result.dados.pe[0];
//         this.pagenumberprofess = 1;
//         this.pagesizeprofess = 50;
//         this.pagetotalrecordprofess=result.dados.pe.length;
//         this.editarestudante(this.pe);
//       }
//     });
// }


// closeDialog() {  
//   this.modalActual.close("true");
// }


//   myControl = new FormControl<string | selects>('');
//   options: selects[] = [];
//   filteredOptions!: Observable<selects[]>;  
//   // private _filter1(name: string): selects[] {
//   //   const filterValue = name.toLowerCase();

//   //   return this.options.filter(option => option.descricao.toLowerCase().includes(filterValue));
//   // }


//   myControlsexo = new FormControl<string | selects>('');
//   optionssexo: selects[] = [];
//   filteredOptionssexo!: Observable<selects[]>;  


//   myControlestadociv = new FormControl<string | selects>('');
//   optionsestadociv: selects[] = [];
//   filteredOptionsestadociv!: Observable<selects[]>;  



//   sexo:string='';
//   estadocivil:string='';
//   SetSexo(item:selects){
// this.sexo=item.descricao;
//   }  
//   Setestadoscivil(item:selects){
//     this.estadocivil=item.descricao;
//       }
  


   
  












//   working = false;
//   uploadFile!: File | null;
//   selectedFile!: any;
//   uploadFileLabel: string | undefined = 'Escolha a imagem';
//   uploadProgress: number=0;
//   uploadUrl: string="";
//   name = '';
//   fileUrl!:any;
//   fileName!:string;


//   descricaopais!: string;  
//   paisstamp!: string;
//   descricaoProvincia!: string;  
//   Provinciastamp!: string;

//   descricaodistrito!: string;  
//   distritostamp!: string;



  

  


// //Filtro de provincia local emissao
// myControlprovincia = new FormControl<string | selects>('');
// myControlbis = new FormControl<string | selects>('');

// optionslistaprovincia: selects[] = [];
// filteredOptionsprovincia!: Observable<selects[]>;
// listaprovincia: selects[] = [];  
// listaaprovinciafilterr: selects[] = [];



// //Filtro de paises  local nasciment
// myControlpaises = new FormControl<string | selects>('');
// optionslistapaises: selects[] = [];
// filteredOptionspaises!: Observable<selects[]>;
// //listapaises: selects[] = [];
  








// listaapaisesfilterr: selects[] = [];

// //Filtro de provincia local nasciment
// myControlprovincianasciment = new FormControl<string | selects>('');
// optionslistaprovincianasciment: selects[] = [];
// filteredOptionsprovincianasciment!: Observable<selects[]>;
// listaprovincianasciment: selects[] = [];  
// listaaprovinciafilterrnasciment: selects[] = [];
// //Filtro de Distrito nascimento
// myControldistrito = new FormControl<string | selects>('');
// optionslistadistrito: selects[] = [];
// filteredOptionsdistrito!: Observable<selects[]>;
// listadistrito: selects[] = [];  
// listaadistritofilterr: selects[] = [];



// myControllocalemissao = new FormControl<string | selects>('');
// optionsemissao: selects[] = [];
// filteredOptionsemissao!: Observable<selects[]>;  

// myControldisciplinas = new FormControl<string | turma>('');
// optionsdisciplinas: turma[] = [];
// filtareringoptionsdisciplinas: turma[] = [];
// filteredOptionsdisciplinas!: Observable<turma[]>;  
// async  getdisciplinas() {
  
 


// } 






// myControlstatuss = new FormControl<string | selects>('');
// optionsstatuss: selects[] = [];
// filteredOptionsstatuss!: Observable<selects[]>;  

// @ViewChild('listastatuss') listastatuss!: MatSelect;
// statuss:string='';

    
// Setstatuss(item:selects){
//   this.statuss=item.descricao;
//     }
// async Getstatuss(){ 
//   const se:condicoesprocura={
//     tabela:"status",
//   campo1: "descricao", 
//   campo2:"codigo",
//    condicao:"vazio"
//   }
//   //codigo,descricao
//   this._loginservice.getselection(se).subscribe({
//     next: (data) => {
//       if (data.sucesso) {            
//         this.optionsstatuss = data.dados.selects;
//         this.filteredOptionsstatuss = this.myControlstatuss.valueChanges.pipe(
//           startWith(''),
//           map(value => {            
//             const name = typeof value === 'string' ? value : value?.descricao;
//             return name ? this._filter(name as string,this.optionsstatuss) : this.optionsstatuss.slice();
//           }),
//         );
//       } else {
//         this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
//       }
//     },
//     error: (e) => {
//       this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
//     }
//   });

// }


// async GetDisciplina(){ 
//   const se:condicoesprocura={
//     tabela:"st",
//   campo1: "descricao", 
//   campo2:"referenc",
//    condicao:"vazio"
//   }
//   //codigo,descricao
//   this._loginservice.getselection(se).subscribe({
//     next: (data) => {
//       if (data.sucesso) {            
//         this.optionsst = data.dados.selects;
        
//         this.optionsstref = data.dados.selects;
//         this.filteredOptionsst= this.myControlst.valueChanges.pipe(
//           startWith(''),
//           map(value => {            
//             const name = typeof value === 'string' ? value : value?.descricao;
//             return name ? this._filter(name as string,this.optionsst) : this.optionsst.slice();
//           }),
//         );

//         this.filteredOptionsstref= this.myControlstref.valueChanges.pipe(
//           startWith(''),
//           map(value => {            
//             const name = typeof value === 'string' ? value : value?.ordem;
//             return name ? this._filterref(name as string,this.optionsstref) : this.optionsstref.slice();
//           }),
//         );
//       } else {
//         this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
//       }
//     },
//     error: (e) => {
//       this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
//     }
//   });

// }



// myControlreliagiao = new FormControl<string | selects>('');
// optionsreliagiao: selects[] = [];
// filteredOptionsreliagiao!: Observable<selects[]>;  



// async Getcl(){ 
//   const se:condicoesprocura={
//     tabela:"cl",
//   campo1: "nome", 
//   campo2:"no",
//    condicao:"aluno=1"
//   }
//   //codigo,descricao
//   this._loginservice.getselection(se).subscribe({
//     next: (data) => {
//       if (data.sucesso) {            
//         this.optionscl = data.dados.selects;
//         this.optionsclcodo = data.dados.selects;
//         this.filteredOptionscl= this.myControlcl.valueChanges.pipe(
//           startWith(''),
//           map(value => {            
//             const name = typeof value === 'string' ? value : value?.descricao;
//             return name ? this._filter(name as string,this.optionscl) : this.optionscl.slice();
//           }),
//         );

//         this.filteredOptionsclcodo= this.myControlclcodo.valueChanges.pipe(
//           startWith(''),
//           map(value => {            
//             const name = typeof value === 'string' ? value : value?.ordem;
//             return name ? this._filterref(name as string,this.optionsclcodo) : this.optionsclcodo.slice();
//           }),
//         );

        
//       } else {
//         this._loginservice.mostrarAlerta("Nao foi possivel carregar a lista de alunos", "Opps");
//       }
//     },
//     error: (e) => {
//       this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
//     }
//   });

// }



// myControlcl= new FormControl<string | selects>('');
// optionscl: selects[] = [];
// filteredOptionscl!: Observable<selects[]>;  

// myControlclcodo= new FormControl<string | selects>('');
// optionsclcodo: selects[] = [];
// filteredOptionsclcodo!: Observable<selects[]>;  


// @ViewChild('listareliagiao') listareliagiao!: MatSelect;
// reliagiao:string='';




// myControlplanocurricular = new FormControl<string | selects>('');
// optionsplanocurricular: selects[] = [];
// filteredOptionsplanocurricular!: Observable<selects[]>;  

// @ViewChild('listaplanocurricular') listaplanocurricular!: MatSelect;
// planocurricular:string='';
// planocurricularstamp:string='';

    







// myControlCurso = new FormControl<string | selects>('');
// optionsCurso: selects[] = [];
// filteredOptionsCurso!: Observable<selects[]>;  
// Curso:string='';
// Cursostamp:string='';
// SetCurso(item:selects){
//   this.Curso=item.descricao;
// this.Cursostamp=item.chave;
// this.Getplanocurricular(item);
//     }
// async GetCurso(){ 
//   const se:condicoesprocura={
//     tabela:"Curso",
//   campo1: "Desccurso", 
//   campo2:"Codcurso",
//    condicao:"vazio"
//   }
  
//   this._loginservice.getselection(se).subscribe({
//     next: (data) => {
//       if (data.sucesso) {            
//         this.optionsCurso = data.dados.selects;
//         this.filteredOptionsCurso = this.myControlCurso.valueChanges.pipe(
//           startWith(''),
//           map(value => {            
//             const name = typeof value === 'string' ? value : value?.descricao;
//             return name ? this._filter(name as string,this.optionsCurso) : this.optionsCurso.slice();
//           }),
//         );
//       } else {
//         this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
//       }
//     },
//     error: (e) => {
//       this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
//     }
//   });

// }


// Setplanocurricular(item:selects){
//   this.planocurricular=item.descricao;
// this.planocurricularstamp=item.chave;
//     }
// async Getplanocurricular(value1:selects) {
//   this. myControlplanocurricular = new FormControl<string | selects>('');
//    let value = value1.chave;  
//    const se:condicoesprocura={
//     tabela:"Grade",
//     campo1: "Descricao", 
//     campo2:"Codigo",
//     condicao:`cursostamp='${value}'`
//    }
  
//   this._loginservice.getselection(se).subscribe({
//     next: (data) => {
//       if (data.sucesso) {            
//         this.optionsplanocurricular = data.dados.selects;
//         this.filteredOptionsplanocurricular = this.myControlplanocurricular.valueChanges.pipe(
//           startWith(''),
//           map(value => {            
//             const name = typeof value === 'string' ? value : value?.descricao;
//             return name ? this._filter(name as string,this.optionsplanocurricular) : this.optionsplanocurricular.slice();
//           }),
//         );
//       } else {
//         this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
//       }
//     },
//     error: (e) => {
//       this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
//     }
//   });

// }





// myControlst = new FormControl<string | selects>('');
// optionsst: selects[] = [];
// filteredOptionsst!: Observable<selects[]>;  

// myControlstref = new FormControl<string | selects>('');
// optionsstref: selects[] = [];
// filteredOptionsstref!: Observable<selects[]>;  


// disciplina:string='';
// ststamp:string='';

// displayValue(x:any,i:number){
// var fff=x.target.value;
// this.listaturmadis[i].disciplina=fff;

// }
// Setgrauparen(item:selects,i:number){
//   this.listaturmadis[i].disciplina=item.descricao;
//   this.listaturmadis[i].referenc=item.ordem;
//   this.listaturmadis[i].ststamp=item.chave;
// (<FormArray>this.cadastro.get('turmadisc')).clear();
//   this.carregarturmadisc(this.listaturmadis)
//     }
    

//     SetAluno(item:selects,i:number){
//   this.listaturmal[i].no=item.ordem;
//   this.listaturmal[i].nome=item.descricao;
//   this.listaturmal[i].clstamp=item.chave;
// this.turmal.clear();
//   this.carregarturmal(this.listaturmal)

//         }

// paisnascimento:string='';
// pprovnascimento:string='';
// codprovnascimento:number=0;
// pprovnascimentostamp:string='';
// distrnascimento:string='';

 
// private _filter(name: string,list:selects[]): selects[] {
//   const filterValue = name.toLowerCase();  
//   return list.filter(option => option.descricao.toLowerCase().includes(filterValue));
// }


// private _filterref(name: string,list:selects[]): selects[] {
//   const filterValue = name.toLowerCase();  
//   return list.filter(option => option.ordem.toLowerCase().includes(filterValue));
// }

// isibilidadeturmanota=false;
// carregarturmanota(afam: turmanota[]) {
//   this.isibilidadeturmanota=true;
//   const formArray = this.cadastro.get('turmanota') as FormArray;
//   afam.map(item => {
//     formArray.push(this.aturmanota(item));
//   });
// }
// aturmanota(item: turmanota): any {
//   return this.fb.group({  
  
//     turmanotastamp: [item.turmanotastamp],
//        turmastamp :[item.turmastamp],
//        no : [item.no],
//        alunostamp : [item.alunostamp],
//        alunoNome : [item.alunoNome],
//        n1:[item.n1],
//        n2:[item.n2],
//        n3:[item.n3],
//        n4:[item.n4],
//        n5:[item.n5],
//        media:[item.media],
//        data:[item.data],
//        aprovado:[item.aprovado],
//        coddis:[item.coddis],
//        disciplina:[item.disciplina],
//        anosem : [item.anosem],
//        sem : [item.sem],
//        cursostamp : [item.cursostamp],
//        e1:[item.e1],
//        e2:[item.e2], //Exame Recurso     
//        es:[item.es], //Exame especial 
//        mediafinal:[item.mediafinal],
//         pestamp : [item.pestamp],
//         Profnome : [item.profnome],
//         pestamp2 : [item.pestamp2],
//         profnome2 : [item.profnome2],
//         fecho: [item.fecho],//Fechar o diario pelo professor (Basta fechar nao tera mais possibilidade de alterar)
//        //Dados adicionados e alterados
//         datafecho:[item.datafecho],
//         resultado:[item.resultado],     //Para Obter todos admitidos/Excluidos
//         resultadoFinal:[item.resultadoFinal],   //Para obter todas stuacoes
//        //de resultados nos exames
//         codSit: [item.codSit], //1=exluido,2=admitido,3=dispensado
//        //,4=aprovado,5=reprovado
//         codetapa: [item.codetapa]  , 
//         activo: [item.activo], //True=matrícula cancelada e false = matrícula activa
//         motivo : [item.motivo],//Motivo pelo qual lhe leva ao cancelamento da matrícula    
//         obs : [item.obs], //Motivo pelo qual lhe leva ao cancelamento da matrícula    
 
    
//       })
//   }







// carregarturmadisc(afam: turmadisc[]) {
//   this.visibilidadeturmadisc=true;  
//   const formArray = this.cadastro.get('turmadisc') as FormArray;
//   afam.map(item => {
//     formArray.push(this.aturmadisc(item));
//   });
// }
// aturmadisc(item: turmadisc): any {
//   return this.fb.group({  
//     turmadiscstamp:[item.turmadiscstamp],
//     turmastamp:[item.turmastamp],
//     ststamp :[item.ststamp],
//     referenc :[item.referenc],
//     disciplina :[item.disciplina],
//     turmadiscp :[item.turmadiscp],//True=matrícula cancelada e false = matrícula activa
    
//       })
//   }

// cldocumentos = new FormArray([]);
// disciplinades:string='';
// visibilidadeturmal:boolean=false;
// carregarturmal(afam: turmal[]) {
//   this.visibilidadeturmal=true;
//   this.isLoggedIn=false;
//   const formArray = this.cadastro.get('turmal') as FormArray;
//   afam.map(item => {
//     formArray.push(this.aturmal(item));
//   });
// }
// aturmal(item: turmal): any {
//   return this.fb.group({  
//     turmalstamp:[item.turmalstamp],
//     turmastamp:[item.turmastamp],
//     clstamp:[item.clstamp],
//     no:[item.no],
//     nome:[item.nome],
//     activo:[item.activo],
//     motivo:[item.motivo],
//   }) 
//   }

// //======================Teste======================
//   cadastro!:FormGroup
//   DadosGerais!: Clview
//   fotos: any  
//   foto: any
  
//   confirmPageChange(pageEvent: PageEvent) {
//     this.pageIndex=pageEvent.pageIndex;
//     this.paginacaoTabela.pageSize=pageEvent.pageSize;    
//     this.paginacaoTabela.pageIndex=pageEvent.pageIndex;
//     this.initialLoad();
//   }
//   frmestudantes!: FormGroup;
//   colunasTabela: string[] = ['no','codigo', 'descricao', 'accoes'];
//   colunasTabelaprofes: string[] = ['no','codigo', 'descricao', 'accoes'];
//     titloAccao: string='';
//     botaoAccao: string='';
//   clfamstamp: string=''
//   labelPosition: 'before' | 'after' = 'after';
//   disabled = false;   
//     constructor(
//       private fb:FormBuilder,
//       private turmanotaservice: TurmaNotaService,private http: HttpClient,
//       private _loginservice: LoginServiceService,
//        private modalActual: MatDialogRef<ModalturmaComponent>,
//        @Inject(MAT_DIALOG_DATA) public dadosestudantes: turma,
//        private _estudanteService: Turmaservico,
//        private dialog: MatDialog,library: FaIconLibrary,
//        private emailService: EmailServiceService,
//     ){
 
//       library.addIcons(faCake);

//       if(this.dadosestudantes.descricao!=''){        
//         this.titloAccao=`Nova Turma`;
//         this.botaoAccao=`Guardar`;
//       }else{
//         this.titloAccao=`Editar Turma`;
//         this.botaoAccao=`Actualizar`;
//       }
//       this.cadastro = this.fb.group({
//         cursostamp: [''],
//         turmastamp:[''],
//         codigo:['123456'],
//         descricao:[''],
//         anoSemstamp:[''],
//         descanoaem:[''],
//         descurso:[''],
//         descgrade:[''],
//         gradestamp:[''],
//         etapa:[''],
//         sala:[''],
//         turno:[''],
//         vagasmin:[0],
//         vagasmax:[0],
//         responsavel:[''],
//         responsavel2:[''],
//          semanaslec:[0],//Nº de semanas lectivas 
//          horasaulas:[0],//Nº de horas aulas por semana 
//          formaaval:[''],//Forma de avaliacao 
//          situacao:[''],//Selecione a situação da turma entre Em Inscrição (matrículas), Em Andamento (turma em atividade) e Concluída (finalizada)
//          obs:[''],
//          datain:[new Date()],
//          datafim:[new Date()],
//          horain:[new Date()],
//          horafim:[new Date()],
//          codetapa:[''],
//         turmal:this.fb.array([]),//Alunos
//         turmadisc:this.fb.array([]),//Disciplinas 
//         turmanota:this.fb.array([]),//Lancamento de notas  
//         tipo1:[false], 
//         tipo2:[false],  
//         tipo3:[false], 
//         tipo4:[false],       
//     })
//     }
  
//     nos:string='';
//    async ngOnInit() {


//     await  this.Getstatuss();
//    await this. Getturno();
//    await this.GetFaculdade();
//    await this.GetsupervisPedagogico();
//    await this.GetAnoSem();  
//    await this.GetCurso(); 
//    await this.GetDisciplina(); 
//    await this.Getcl(); 


//    this.isSpinnerDisplayedprofess=false;
//   this.displayedColumnsfinanceiro= ['codigo','descricao','accoes'];
//      if (this.dadosestudantes != null && this.dadosestudantes.turmastamp!='') {
//       this.isSpinnerDisplayedprofess=true;
//       this.cadastro.patchValue({ 
//         cursostamp: this.dadosestudantes.cursostamp,
//         turmastamp:this.dadosestudantes.turmastamp,
//         codigo:this.dadosestudantes.codigo,
//         descricao:this.dadosestudantes.descricao,
//         anoSemstamp:this.dadosestudantes.anoSemstamp,
//         descanoaem:this.dadosestudantes.descanoaem,
//         descurso:this.dadosestudantes.descurso,
//         descgrade:this.dadosestudantes.descgrade,
//         gradestamp:this.dadosestudantes.gradestamp,
//         etapa:this.dadosestudantes.etapa,
//         sala:this.dadosestudantes.sala,
//         turno:this.dadosestudantes.turno,
//         vagasmin:this.dadosestudantes.vagasmin,
//         vagasmax:this.dadosestudantes.vagasmax,
//         responsavel:this.dadosestudantes.responsavel,
//         responsavel2:this.dadosestudantes.responsavel2,
//          semanaslec:this.dadosestudantes.semanaslec,//Nº de semanas lectivas 
//          horasaulas:this.dadosestudantes.horasaulas,//Nº de horas aulas por semana 
//          formaaval:this.dadosestudantes.formaaval,//Forma de avaliacao 
//          situacao:this.dadosestudantes.situacao,//Selecione a situação da turma entre Em Inscrição (matrículas), Em Andamento (turma em atividade) e Concluída (finalizada)
//          obs:this.dadosestudantes.obs,
//          datain:this.dadosestudantes.datain,
//          datafim:this.dadosestudantes.datafim,
//          horain:this.dadosestudantes.horain,
//          horafim:this.dadosestudantes.horafim,
//          codetapa:this.dadosestudantes.codetapa,
//         turmal:this.dadosestudantes.turmal,//Alunos
//         turmadisc:this.dadosestudantes.turmadisc,//Disciplinas 
//         turmanota:this.dadosestudantes.turmanota,//Lancamento de notas  
//       });
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
//    this.myControlstatuss.setValue(this.statuss);
//    this.myControlCurso.setValue(this.Curso);
//       this.planocurricular=this.dadosestudantes.descgrade;
//       this.planocurricularstamp=this.dadosestudantes.gradestamp;
//       this.myControlplanocurricular.setValue(this.planocurricular);
//       this.myControlAnoSem.setValue(this.AnoSem);
//       this.myControlturno.setValue(this.turno);
//       this.myControlccu.setValue(this.sala);
//       this.myControlsupervisPedagogico.setValue(this.supervisPedagogico);
//       this.myControlFaculdade.setValue(this.Faculdade);
//       this.myControlEtapaSemestre.setValue(this.EtapaSemestre);
//       this.listaturmal=this.dadosestudantes.turmal;
//       this.listaturmadis=this.dadosestudantes.turmadisc;
//       if(this.dadosestudantes.horasaulas==1)
//       {
//         this.cadastro.controls['tipo1'].setValue(true);
//       }else{     
//         this.cadastro.controls['tipo1'].setValue(false);
//       }
//       if(this.dadosestudantes.turmastamp!=''){
//         this.clstampvliw=this.dadosestudantes.turmastamp;        
//         this.initialLoad();
//         this.initialLoadprofessfromtruma();
//       }else{
//         this.clstampvliw=this.turmanotaservice.Stamp();
//       }      
// if  (this.dadosestudantes.turmal!=null && 
//   this.dadosestudantes.turmal!=undefined&& this.dadosestudantes.turmal.length>0){
//   this.carregarturmal(this.dadosestudantes.turmal);
// }

// if  (this.dadosestudantes.turmadisc!=null && this.dadosestudantes.turmadisc!=undefined&& this.dadosestudantes.turmadisc.length>0){
 
//   this.carregarturmadisc(this.dadosestudantes.turmadisc);
// }
// if  (this.dadosestudantes.turmanota!=null && this.dadosestudantes.turmanota!=undefined&&this.dadosestudantes.turmanota.length>0){
 
//   this.carregarturmanota(this.dadosestudantes.turmanota);
// }
// this.titloAccao = "Editar Turma";
// }  else{  
//   this.titloAccao = "Nova Turma";
//   this.isSpinnerDisplayed = false;
//    this.isSpinnerDisplayedprofess=false;
//    this.clstampvliw=this.turmanotaservice.Stamp();
// }
     
//   this.botaoAccao = "Salvar";
//     }

//     isLoggedIn = true;
// myControlccu1 = new FormControl<string | selects>('');
// optionsccu1: selects[] = [];
// filteredOptionsccu1!: Observable<selects[]>;  



// @ViewChild('listaccu1') listaccu1!: MatSelect;
// ccu1:string='';
// ccu1stamp:string='';
// Setccu1(item:selects){
//   this.ccu1=item.descricao;  
// this.ccu1stamp=item.chave;
//     }
    
// toggle1(event: MatSlideToggleChange) {
//   if(event.checked==true)
//   {
//     this.cadastro.controls['tipo1'].setValue(true);
//     this.dadosestudantes.horasaulas=1;
//   }else{    
//     this.dadosestudantes.horasaulas=0;    
//     this.cadastro.controls['tipo1'].setValue(false);
//   }
//   this.cadastro.value.tipo3=false;
//   this.cadastro.value.tipo2=false;
//   this.cadastro.value.tipo4=false;
//   this.cadastro.controls['tipo3'].setValue(false);
//   this.cadastro.controls['tipo2'].setValue(false);
//   this.cadastro.controls['tipo4'].setValue(false);
// }
// toggle2(event: MatSlideToggleChange) {
//   if(event.checked!=true)
//   {
//     //this.dadosestudantes.tipo=0;
//   }else{
    
//     //this.dadosestudantes.tipo=1;
//   }
//   this.cadastro.value.tipo1=false;
//   this.cadastro.value.tipo3=false;
//   this.cadastro.value.tipo4=false;
//   this.cadastro.controls['tipo3'].setValue(false);
//   this.cadastro.controls['tipo1'].setValue(false);
//   this.cadastro.controls['tipo4'].setValue(false);
// }
// toggle3(event: MatSlideToggleChange) {
//   if(event.checked!=true)
//   {
//     //this.dadosestudantes.tipo=0;
//   }else{
    
//     //this.dadosestudantes.tipo=3;
//   }
//   this.cadastro.value.tipo1=false;
//   this.cadastro.value.tipo2=false;
//   this.cadastro.value.tipo4=false;
//   this.cadastro.controls['tipo1'].setValue(false);
//   this.cadastro.controls['tipo2'].setValue(false);
//   this.cadastro.controls['tipo4'].setValue(false);
  
// }
// toggle4(event: MatSlideToggleChange) {
//   if(event.checked!=true)
//   {
//     //this.dadosestudantes.tipo=0;
//   }else{
    
//    // this.dadosestudantes.tipo=4;
//   }
//   this.cadastro.value.tipo1=false;
//   this.cadastro.value.tipo2=false;
//   this.cadastro.value.tipo3=false;
//   this.cadastro.controls['tipo3'].setValue(false);
//   this.cadastro.controls['tipo2'].setValue(false);
//   this.cadastro.controls['tipo1'].setValue(false);
// }

// myControlAnoSem = new FormControl<string | selects>('');
// optionsAnoSem: selects[] = [];
// filteredOptionsAnoSem!: Observable<selects[]>;  

// AnoSem:string='';
// AnoSemstamp:string='';


// SetAnoSem(item:selects){
//   this.AnoSem=item.descricao;
// this.AnoSemstamp=item.chave;
//     }
// async GetAnoSem(){ 
//   const se:condicoesprocura={
//     tabela:"AnoSem",
//   campo1: "codigo", 
//   campo2:"descricao",
//    condicao:"vazio"
//   }
  
//   this._loginservice.getselection(se).subscribe({
//     next: (data) => {
//       if (data.sucesso) {            
//         this.optionsAnoSem = data.dados.selects;
//         this.filteredOptionsAnoSem = this.myControlAnoSem.valueChanges.pipe(
//           startWith(''),
//           map(value => {            
//             const name = typeof value === 'string' ? value : value?.descricao;
//             return name ? this._filter(name as string,this.optionsAnoSem) : this.optionsAnoSem.slice();
//           }),
//         );
//       } else {
//         this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
//       }
//     },
//     error: (e) => {
//       this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
//     }
//   });

// }








// myControlsupervisPedagogico = new FormControl<string | selects>('');
// optionssupervisPedagogico: selects[] = [];
// filteredOptionssupervisPedagogico!: Observable<selects[]>;  

// supervisPedagogico:string='';
// supervisPedagogicostamp:string='';



// SetsupervisPedagogico(item:selects){
//   this.supervisPedagogico=item.descricao;
// this.supervisPedagogicostamp=item.chave;
//     }
// async GetsupervisPedagogico(){ 
//   const se:condicoesprocura={
//     tabela:"pe",
//   campo1: "nome", 
//   campo2:"no",
//    condicao:"Coordenador=1"
//   }
//   this._loginservice.getselection(se).subscribe({
//     next: (data) => {
//       if (data.sucesso) {            
//         this.optionssupervisPedagogico = data.dados.selects;
//         this.filteredOptionssupervisPedagogico = this.myControlsupervisPedagogico.valueChanges.pipe(
//           startWith(''),
//           map(value => {            
//             const name = typeof value === 'string' ? value : value?.descricao;
//             return name ? this._filter(name as string,this.optionssupervisPedagogico) : this.optionssupervisPedagogico.slice();
//           }),
//         );
//       } else {
//         this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
//       }
//     },
//     error: (e) => {
//       this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
//     }
//   });

// }

// myControlFaculdade = new FormControl<string | selects>('');
// optionsFaculdade: selects[] = [];
// filteredOptionsFaculdade!: Observable<selects[]>;  
// Faculdade:string='';
// Faculdadestamp:string='';
// async GetFaculdade(){ 
//   const se:condicoesprocura={
//     tabela:"ccu",
//   campo1: "descricao", 
//   campo2:"CodCcu",
//    condicao:"vazio"
//   }
  
//   this._loginservice.getselection(se).subscribe({
//     next: (data) => {
//       if (data.sucesso) {            
//         this.optionsFaculdade = data.dados.selects;
//         this.filteredOptionsFaculdade = this.myControlFaculdade.valueChanges.pipe(
//           startWith(''),
//           map(value => {            
//             const name = typeof value === 'string' ? value : value?.descricao;
//             return name ? this._filter(name as string,this.optionsFaculdade) : this.optionsFaculdade.slice();
//           }),
//         );
//       } else {
//         this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
//       }
//     },
//     error: (e) => {
//       this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
//     }
//   });

// }
// SetFaculdade(item:selects){
//   this.Faculdade=item.descricao;
// this.Faculdadestamp=item.chave;
//     }
    


// @ViewChild('listasupervisPedagogico') listasupervisPedagogico!: MatSelect;


// @ViewChild('listaFaculdade') listaFaculdade!: MatSelect;

//     myControlturno = new FormControl<string | selects>('');
//     optionsturno: selects[] = [];
//     filteredOptionsturno!: Observable<selects[]>;  

//     EtapaSemestre: string='';
//     EtapaSemestrestamp: string='';

//     onSetEtapaSemestre(value:selects) {
//       this.salastamp=value.chave;
//       this.sala=value.descricao;
//     }
    
//     myControlEtapaSemestre = new FormControl<string | selects>('');
//     optionsEtapaSemestre: selects[] = [];
//     filteredOptionsEtapaSemestre!: Observable<selects[]>; 
//     async  getEtapaSemestre() {
//       const se:condicoesprocura={
//         tabela:"sala",
//       campo1: "Descricao", 
//       campo2:"codigo",
//        condicao:"vazio"
//       }      
//       this._loginservice.getselection(se).subscribe({
//         next: (data) => {
//           if (data.sucesso) {            
//             this.optionsEtapaSemestre = data.dados.selects;
                   
//             //this.myControlccu.setValue(this.sala);
//             this.filteredOptionsEtapaSemestre = this.myControlEtapaSemestre.valueChanges.pipe(
//               startWith(''),
//               map(value => {
                
//                 const name = typeof value === 'string' ? value : value?.descricao;
//                 return name ? this._filter(name as string,this.optionsEtapaSemestre) : 
//                 this.optionsEtapaSemestre.slice();
//               }),
//             );

//            // this.myControlccu.setValue( {descricao:this.listaccusto[0].descricao,chave:this.listaccusto[0].chave,ordem:this.listaccusto[0].ordem});
           
//           } else {
//             this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
//           }
//         },
//         error: (e) => {
//           this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
//         }
//       });
//     } 











    
//     sala: string='';
//     salastamp: string='';

//     onSelectccu(value:selects,index:number) {
//       this.salastamp=value.chave;
//       this.sala=value.descricao;
//     }
    
//     myControlccu = new FormControl<string | selects>('');
//     optionsccu: selects[] = [];
//     filteredOptionsccu!: Observable<selects[]>; 
//     async  getCcusto() {
//       const se:condicoesprocura={
//         tabela:"sala",
//       campo1: "Descricao", 
//       campo2:"codigo",
//        condicao:"vazio"
//       }      
//       this._loginservice.getselection(se).subscribe({
//         next: (data) => {
//           if (data.sucesso) {            
//             this.optionsccu = data.dados.selects;
                   
//             //this.myControlccu.setValue(this.sala);
//             this.filteredOptionsccu = this.myControlccu.valueChanges.pipe(
//               startWith(''),
//               map(value => {
                
//                 const name = typeof value === 'string' ? value : value?.descricao;
//                 return name ? this._filter(name as string,this.optionsccu) : 
//                 this.optionsccu.slice();
//               }),
//             );

//            // this.myControlccu.setValue( {descricao:this.listaccusto[0].descricao,chave:this.listaccusto[0].chave,ordem:this.listaccusto[0].ordem});
           
//           } else {
//             this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
//           }
//         },
//         error: (e) => {
//           this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
//         }
//       });
//     } 



//     @ViewChild('listaturno') listaturno!: MatSelect;
//     turno:string='';
//     Setturno(item:selects){
//       this.turno=item.descricao;
//         }
//     async Getturno(){ 
//       const se:condicoesprocura={
//         tabela:"turno",
//       campo1: "descricao", 
//       campo2:"Codigo",
//        condicao:"vazio"
//       }
      
//       this._loginservice.getselection(se).subscribe({
//         next: (data) => {
//           if (data.sucesso) {            
//             this.optionsturno = data.dados.selects;
//             this.filteredOptionsturno = this.myControlturno.valueChanges.pipe(
//               startWith(''),
//               map(value => {            
//                 const name = typeof value === 'string' ? value : value?.descricao;
//                 return name ? this._filter(name as string,this.optionsturno) : this.optionsturno.slice();
//               }),
//             );
//           } else {
//             this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
//           }
//         },
//         error: (e) => {
//           this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
//         }
//       });
    
//     }
        
//     myControltipoaluno = new FormControl<string | selects>('');
//     optionstipoaluno: selects[] = [];
//     filteredOptionstipoaluno!: Observable<selects[]>;  
    
//     @ViewChild('listatipoaluno') listatipoaluno!: MatSelect;
//     tipoaluno:string='';
//     tipoalunostamp:string='';
//     Settipoaluno(item:selects){
//       this.tipoaluno=item.descricao;
//     this.tipoalunostamp=item.chave;
//         }
        

//     myControltipobolsa = new FormControl<string | selects>('');
//     optionstipobolsa: selects[] = [];
//     filteredOptionstipobolsa!: Observable<selects[]>;  
    
//     @ViewChild('listatipobolsa') listatipobolsa!: MatSelect;
//     tipobolsa:string='';
//     tipobolsastamp:string='';
    
        
//     myControlinstituicaoensino = new FormControl<string | selects>('');
//     optionsinstituicaoensino: selects[] = [];
//     filteredOptionsinstituicaoensino!: Observable<selects[]>;  
    
//     @ViewChild('listainstituicaoensino') listainstituicaoensino!: MatSelect;
//     instituicaoensino:string='';
//     instituicaoensinostamp:string='';
    

//     array!:Blob
// //--------------------------------------------------Adiciona imagem-------------------------------------------


 
// Cadastrar( )

// {     

// const cl:turma={
//   turmastamp: this.clstampvliw, 
//   codigo:  this.cadastro.value.codigo,
//   descricao:  this.cadastro.value.descricao,
//   anoSemstamp:  this.AnoSemstamp,
//   descanoaem:  this.AnoSem,
//   descurso:  this.Curso,
//   cursostamp:  this.Cursostamp,
//   descgrade:  this.planocurricular,
//   gradestamp:  this.planocurricularstamp,
//   etapa:  this.EtapaSemestre,
//   sala:  this.sala,
//   turno:  this.turno,
//   vagasmin:  this.cadastro.value.vagasmin,
//   vagasmax: this.cadastro.value.vagasmax,
//   responsavel:  this.supervisPedagogico,  
//   formaaval:  this.Faculdade,
//   situacao:  this.statuss,
//   responsavel2:  '',
//   semanaslec:  this.cadastro.value.semanaslec,
//   horasaulas:  this.dadosestudantes.horasaulas,
//   obs:  this.cadastro.value.obs,
//   datain:  this.cadastro.value.datain,
//   datafim:  this.cadastro.value.datafim,
//   horain:  this.cadastro.value.horain,
//   horafim:  this.cadastro.value.horafim,
//   codetapa:  '',
//   turmal:  this.listaturmal,
//   turmadisc:  this.listaturmadis,
//   turmanota:  this.cadastro.value.turmanota
// };
//   const dadosssss=cl;
//   const formData = new FormData();
//   const _dadoscl=dadosssss
//   var json_arr = JSON.stringify(_dadoscl);  
//   formData.append("Turma",json_arr);
//   const url = `${environment.APIurl}Turma/UploadFile`;
//   const uploadReq = new HttpRequest('POST', url, formData, {
//     reportProgress: true,
//   });
//   this.uploadUrl = '';
//   this.uploadProgress = 0;
//   this.working = true;
//   this.http.request(uploadReq).subscribe((event: any) => {
//     if (event.type === HttpEventType.UploadProgress) {
//       this.uploadProgress = Math.round((100 * event.loaded) / event.total);
//     } else if (event.type === HttpEventType.Response) {
//       this._loginservice.mostrarAlerta("Operação executada com sucesso","OK");
//       this.closeDialog();
//     }
//   }, (error: any) => {
//     console.error(error);
//   }).add(() => {
//     this.working = false;
//   });

// return;

  



// }

// total:number=0;

// totalstr:string='Total:  ';


//  //------------------------------------------------Documentos----------------------------------------------------------


 
// //---------------------------------------------------------------------------------------------------------------------

// //-----------------------------------Agregado Familiar-----------------------------------------------------------------

// //----------------------------------------------------------------------------------------------------------------------







// visibilidadeagregado:boolean=false;
// clstampvliw: string='';
  

// @ViewChild('recprpais') recprpais!: MatSelect;
// //-----------------------------------------------------------------------------------------------------------------------
// visibilidadedoc:boolean=false;
// visibilidadebolsa:boolean=false;
// visibilidadelingua:boolean=false;
// //------------------------------------------Adiciona e remove linhas do docs---------------------------------------------
// adicionarturmal() {
//   this.isLoggedIn=false;
  
//   this.visibilidadeturmal=true;
// let stamp =this.turmanotaservice.Stamp();
//   // this.turmal.push(this.fb.group({
//   //   turmalstamp:[stamp],
//   //   turmastamp :[this.clstampvliw],
//   //   clstamp :[''],
//   //   no :[''],
//   //   nome :[''],
//   //  activo :[false],
//   //   motivo :[''],
//   // }));
  
// this.turmal.clear();
//   this.listaturmal.push({
//     turmalstamp:stamp,
//     turmastamp :this.clstampvliw,
//     clstamp :'',
//     no :'',
//     nome :'',
//    activo :true,
//     motivo :'',
//   });
//   this.carregarturmal(this.listaturmal);
// }
// get turmal(): FormArray {
   
//   return this.cadastro.get('turmal') as FormArray;
//  }

// listaturmadis:turmadisc[]=[]
// listaturmal:turmal[]=[]
// visibilidadeturmadisc:boolean=false;
//  adicionarturmadisc() {
//   this.isLoggedIn=false;
//   this.visibilidadeturmadisc=true;
// let stamp =this.turmanotaservice.Stamp();
//   // this.turmadisc.push(this.fb.group({
//   //   turmastamp :[this.clstampvliw],
//   //   turmadiscstamp:[stamp],
//   //   ststamp:[''],
//   //   referenc:[''],
//   //   disciplina:[''],
//   //   turmadiscp:this.fb.array([])
//   // }));
  
//   this.turmadisc.clear();
//   this.listaturmadis.push({
//     turmadiscstamp:stamp,
//     turmastamp: this.clstampvliw ,
//     ststamp: '',
//     referenc: '',
//     disciplina: '',
//     turmadiscp: []
//   });
//   this.carregarturmadisc(this.listaturmadis);
// }
// get turmadisc(): FormArray {
   
//   return this.cadastro.get('turmadisc') as FormArray;
//  }

// displayedColumns: string[] =[];
// dataSource: Alauxiliar[]=[];
// currentDate = new Date();


// displayedColumnsturma: string[] =[];
// dataSourceturma: Alauxiliar[]=[];

// //GetDividadoaluno

// displayedColumnsfinanceiro: string[] =[];
// dataSourcefinanceiro: contacorrentelista[]=[];
// veradadeiro:boolean=false;

// Dadostemp(){

// }

//   eliminarestudante(stamp: string,descricao:string,index:number,tabela:string,nomecampochave:string) {
//     this.veradadeiro=false;

    
//   //console.log(this.listaturmadis);
//   Swal.fire({
//     title: `Deseja eliminar ${tabela}?`,
//     text: descricao,
//     icon: "warning",
//     confirmButtonColor: '#3085d6',
//     confirmButtonText: 'Sim, Eliminar',
//     showCancelButton: true,
//     cancelButtonColor: '#d33',
//     cancelButtonText: 'Não, Voltar'
//   }).then((resultado => {
//     if (resultado.isConfirmed) {
//       this._estudanteService.eliminargradelsddgd(stamp,tabela,nomecampochave).subscribe({
//         next: (data) => {
//           if (data.sucesso) {
//             this._loginservice.mostrarAlerta(`${tabela} eliminada com sucesso`, "Ok");
//             this.veradadeiro=true;

//           } else {
//             this._loginservice.mostrarAlerta("Nao foi possível eliminar a(o) "+tabela, "Erro");          
//             this.veradadeiro=false;
//           }
// switch(tabela.toLowerCase()){
// case 'turmadisc':
//   this.listaturmadis = this.listaturmadis.filter(item => item.turmadiscstamp.toLowerCase() != stamp.toLowerCase());
 
//  if(this.veradadeiro==true){
//   //// this.turmadisc.removeAt(index);
//    var letss=this.listaturmadis;
//    alert(letss.length)
//  if(letss!=null && letss!=undefined &&  letss.length>0){
//  this.visibilidadeturmadisc=true; 
//  this.turmadisc.clear();
//  this.carregarturmadisc(this.listaturmadis); 
//  }  else{  
//   //this.turmadisc.clear();
//  this.visibilidadeturmadisc=false;
//  }
//  }
//   break;
//   case 'turmal':
//  if(this.veradadeiro==true){
//   //this.turmal.removeAt(index);  
//  this.listaturmal = this.listaturmal.filter(item => item.turmalstamp != stamp);
//    var lets=this.listaturmal;
//   if(lets!=null && lets!=undefined &&  lets.length>0){
//  this.isLoggedIn=false;
//  this.turmal.clear();
//  this.carregarturmal(this.listaturmal);
//  }  else{  
//  this.isLoggedIn=true;
//  }
//  }
//     break;
// }

//         },
//         error: () => {
//           this._loginservice.mostrarAlerta("Erro de conexao", "Opps");          
//           this.veradadeiro=false;
//         }
//       });

//     }

//   }));
  
// }

// removerturmal(index: number) {  
//   let grela=(<FormArray>this.cadastro.get('turmal')).controls[index].value;
//  let ret= this.eliminarestudante(grela.turmalstamp,grela.nome,index,'turmal','turmalstamp')



 
 
 
// }


// removerturmadisc(index: number) {  
//   let grela=(<FormArray>this.cadastro.get('turmadisc')).controls[index].value;
//  let ret= this.eliminarestudante(this.listaturmadis[index].turmadiscstamp,this.listaturmadis[index].disciplina,index,'turmadisc','turmadiscstamp')

//  //delete this.listaturmadis[this.listaturmadis.findIndex(item => item.turmadiscstamp == this.listaturmadis[index].turmadiscstamp)];
 
// }


// myControlfala = new FormControl<string | selects>('');
// optionsfala: selects[] = [];
// filteredOptionsfala!: Observable<selects[]>;  
// @ViewChild('listafala') listafala!: MatSelect;
// fala:string='';
// falastamp:string='';
// Setfala(item:selects,i:number){
//   this.fala=item.descricao;
// this.falastamp=item.chave;

// (<FormArray>this.cadastro.get('mancfam')).controls[i].value.fala= item.descricao;
//     }


//     myControlleitura = new FormControl<string | selects>('');
//     optionsleitura : selects[] = [];
//     filteredOptionsleitura !: Observable<selects[]>;  
//     @ViewChild('listaleitura ') listaleitura !: MatSelect;
//     leitura :string='';
//     leiturastamp:string='';
//     Setleitura (item:selects,i:number){
//       this.leitura =item.descricao;
//     this.leiturastamp=item.chave;
//     (<FormArray>this.cadastro.get('mancfam')).controls[i].value.leitura= item.descricao;
//         }

//         myControlescrita = new FormControl<string | selects>('');
//         optionsescrita : selects[] = [];
//         filteredOptionsescrita !: Observable<selects[]>;  
//         @ViewChild('listaescrita ') listaescrita !: MatSelect;
//         escrita :string='';
//         escritastamp:string='';
//         Setescrita (item:selects,i:number){
//           this.escrita =item.descricao;
//         this.escritastamp=item.chave;
//         (<FormArray>this.cadastro.get('mancfam')).controls[i].value.escrita= item.descricao;
//             }
            
//             myControlcompressao = new FormControl<string | selects>('');
            
//             optionscompressao : selects[] = [];
//             filteredOptionscompressao !: Observable<selects[]>;  
//             @ViewChild('listacompressao ') listacompressao !: MatSelect;
//             compressao :string='';
//             compressaostamp:string='';
//             Setcompressao (item:selects,i:number){
//               this.compressao =item.descricao;
//             this.compressaostamp=item.chave;
//             (<FormArray>this.cadastro.get('mancfam')).controls[i].value.compreecao= item.descricao;
//                 }

// async Getfala(){ 

//   const se:condicoesprocura={
//     tabela:"PeAuxiliar",
//   campo1: "descricao", 
//   campo2:"codigo",
//    condicao:"tabela=12"
//   }
  
//   this._loginservice.getselection(se).subscribe({
//     next: (data) => {
//       if (data.sucesso) {            
//         this.optionscompressao =        this.optionsescrita = this.optionsleitura=
//          this.optionsfala = data.dados.selects;
//         this.filteredOptionsfala = this.myControlfala.valueChanges.pipe(
//           startWith(''),
//           map(value => {            
//             const name = typeof value === 'string' ? value : value?.descricao;
//             return name ? this._filter(name as string,this.optionsfala) : this.optionsfala.slice();
//           }),
//         );
//         this.filteredOptionsleitura = this.myControlleitura.valueChanges.pipe(
//           startWith(''),
//           map(value => {            
//             const name = typeof value === 'string' ? value : value?.descricao;
//             return name ? this._filter(name as string,this.optionsleitura) : this.optionsleitura.slice();
//           }),
//         );

//         this.filteredOptionsescrita = this.myControlescrita.valueChanges.pipe(
//           startWith(''),
//           map(value => {            
//             const name = typeof value === 'string' ? value : value?.descricao;
//             return name ? this._filter(name as string,this.optionsescrita) : this.optionsescrita.slice();
//           }),
//         );

//         this.filteredOptionscompressao = this.myControlcompressao.valueChanges.pipe(
//           startWith(''),
//           map(value => {            
//             const name = typeof value === 'string' ? value : value?.descricao;
//             return name ? this._filter(name as string,this.optionscompressao) : this.optionscompressao.slice();
//           }),
//         );
//       } else {
//         this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
//       }
//     },
//     error: (e) => {
//       this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
//     }
//   });

// }


// myControllingua = new FormControl<string | selects>('');
// optionslingua: selects[] = [];
// filteredOptionslingua!: Observable<selects[]>;  
// @ViewChild('listalingua') listalingua!: MatSelect;
// lingua:string='';
// linguastamp:string='';
// Setlingua(item:selects,i:number){
//   this.lingua=item.descricao;
// this.linguastamp=item.chave;


// (<FormArray>this.cadastro.get('mancfam')).controls[i].value.lingua= item.descricao;
  


//     }
// async Getlingua(){ 
  
//   const se:condicoesprocura={
//     tabela:"PeAuxiliar",
//   campo1: "descricao", 
//   campo2:"codigo",
//    condicao:"tabela=2"
//   }
  
//   this._loginservice.getselection(se).subscribe({
//     next: (data) => {
//       if (data.sucesso) {            
//         this.optionslingua = data.dados.selects;
//         this.filteredOptionslingua = this.myControllingua.valueChanges.pipe(
//           startWith(''),
//           map(value => {            
//             const name = typeof value === 'string' ? value : value?.descricao;
//             return name ? this._filter(name as string,this.optionslingua) : this.optionslingua.slice();
//           }),
//         );
//       } else {
//         this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
//       }
//     },
//     error: (e) => {
//       this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
//     }
//   });
// }





// }
import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Alauxiliar } from 'src/Models/Alauxiliar';
import { diarioClasses } from 'src/Models/DiarioClass';
import { Estudante, ReportPauta } from 'src/Models/Estudante';
import { Turmanota1 } from 'src/Models/Turma';
import { DataSendService } from 'src/Service/Compartilhar/data-send.service';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { DadosTemporarios } from 'src/app/GuardarSessoes/DadosTemporarios';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { carregardados } from 'src/app/Interfaces/carrgardados';
import { DynamicGrid } from 'src/app/clcadastro/clcadastro/clcadastro.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lanca-trabalho',
  templateUrl: './lanca-trabalho.component.html',
  styleUrls: ['./lanca-trabalho.component.scss']
})
export class LancaTrabalhoComponent implements AfterViewInit, OnInit {


  
  Diaro: diarioClasses[]=[];
  currentDate = new Date();
  listCurso:Turmanota1[]=[];
  divHideShow:boolean=true;
  DataSource: any
dataListaCurso= new MatTableDataSource(this.listCurso);
@Output() NotasTrabalhoEmitido = new EventEmitter<any>();
listCursoOriginal:Turmanota1[]=[];
// @ViewChild(MatPaginator) paginacaoTabela!:MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;
 displayedturma: string[] = ['no', 'alunoNome', 'n3','n4', 'media'];
totalRecords:number=0;
titloAccao: string = " Notas de trabalhos";
botaoAccao: string = "Gravar";
 listaDocumento: Turmanota1[] = [];
nims: string = "0000000";
situacaos: string = "";
provchaveCprm: string = "";
cprmprovchave: string = "";
recprpaischav: string = "";
recprovchav: string = "";
recdistchav: string = "";
recpadchav: string = "";
reclocalidchav: string = "";
utilizadorCprm: string = "";
mprovchav: string = "";
mdistchav: string = "";
mpadchav: string = "";
mlocalidchav: string = "";
turmas: string = "";
cursos: string = "";
anosems: string = "";
disciplinas: string = "";
TurmaLista: Turmanota1[]=[]
dataSource: Alauxiliar[]=[]
Habilita1: boolean= true
Habilita2: boolean= true
Habilita3: boolean= true
descrteste: string = "";
liveForm!: FormGroup;
simpleForm!: FormGroup;
desc: string="";
formularioMancebo!: FormGroup;
NotaF:any
//Documento
documentochave!: string;
indice:number=0;
isSpinnerDisplayed=false;

  constructor(
    private modalActual: MatDialogRef<LancaTrabalhoComponent>,
    @Inject(MAT_DIALOG_DATA) public dadosMancebo: Estudante,
    private fb:FormBuilder,
    private TurmaotaService: TurmaNotaService,
    private _loginservice: LoginServiceService,
    private router: Router,
    private dadosTemp : DadosTemporarios,
    private lancaTemp : DadosLancamento,
    private dadossessa : GuardarSessoes,
    private route: ActivatedRoute ,private guararsessoes: GuardarSessoes,
    private Datasend: DataSendService,
  ){
  

   // this.dadostemp.obterSessaoauxiliar()
  

    this.formularioMancebo = this.fb.group({
      curso:[this.dadosTemp.obterSessao().descurso, [Validators.required]],
      cursostamp: [this.dadosTemp.obterSessao().cursostamp, [Validators.required]],
      turma: [this.dadossessa.obterSessao().codigo, [Validators.required]],
      turmastamp: [this.dadosTemp.obterSessao().turmastamp, [Validators.required]],
      anosem: [this.dadosTemp.obterSessao().anosem, [Validators.required]],
      disciplina: [this.dadosTemp.obterSessao().disciplina, [Validators.required]],
      ststamp: [this.dadosTemp.obterSessao().ststamp, [Validators.required]],
      mancdoc: this.fb.array([]),
    });
  
  }



  ngOnInit(): void {
    

  this.descrteste=this.dadosTemp.obterSessaoauxiliar().descricao
   console.log(this.descrteste.toLowerCase())
   this.HabilitarTeste()
   
  }

  

  HabilitarTeste(){

      switch(this.descrteste.toLowerCase()) {
        case 'trabalho 2':
          this.Habilita2=true;

          break;
          case 'trabalho 1':

            this.Habilita1=true;
        
          break;
          case 'teste3':
            //this.Habilita3=false;
          break;
  
      }
  }

  Imprimir(origem:string) {

    if(this.dataListaCurso.data.length==0){
      Swal.fire('Erro',`A grelha de alunos não pode estar vazia, por favor!`,'error');
      return;
    }

    // let missing =     this.listCursoOriginal.filter(item => this.dataListaCurso.data.indexOf(item) < 0);
    // if(this.dataListaCurso.data.length==0){
    //   Swal.fire('Erro',`A grelha de alunos não pode estar vazia, por favor!`,'error');
    //   return;
    // }

  const dadosMancebo=this.lancaTemp.obterSessao();
    this.estudante= {
      turmastamp: dadosMancebo == null ? '' : dadosMancebo.turmastamp,
      anosem: dadosMancebo == null ? '' : dadosMancebo.anosem,
      turma: dadosMancebo == null ? '' : dadosMancebo.codigo,
      curso: dadosMancebo == null ? '' : dadosMancebo.curso,
      cursostamp: dadosMancebo == null ? '' : dadosMancebo.cursostamp,
      disciplina: dadosMancebo == null ? '' :dadosMancebo.disciplina,
      ststamp: dadosMancebo == null ? '' : dadosMancebo.ststamp,
      turmanota: this.dataListaCurso.filteredData,
    }
     let rep:ReportPauta= {
       estudante: this.estudante,
       filename: '',
       origem: origem,
       xmlstring: ''
     }
    this.isSpinnerDisplayed = true;
    this.TurmaotaService.GerarRelatorioPauta(rep).pipe(
      finalize(() => this.isSpinnerDisplayed = false)
    ).subscribe({
      next: (data) => {
        if (data.sucesso) {
          if (data.dados != null) {
            const filename = data.dados.filename;
            try {
              if (filename != null && filename.length > 0 && filename != '' && filename != 'vazio') {


                this._loginservice.Downloadfile(filename);
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
       // Swal.fire('Erro!', "O sistema não conseguiu carregar o ficheiro " + e, 'error');
      }
    });

  }

  dynamicArray1:Array<DynamicGrid> = [];
  turmanota:Array<Turmanota1> = [];
  turmanotas:Array<Turmanota1> = [];
 
  dynamicArray: Array<Estudante> = [];
  carregardados!:carregardados;
  dynamicArrays: Array<Estudante> = [];
  newDynamic: any = {};
  lisnewDynamic: Estudante[] = [];
  //teste:string='Meu nome é';
  estudante!:Estudante;
getRecrutaIncoporado() {

}
editarManceboDesmobilizar(_t47: any) {
}


submit() {

  this.isSpinnerDisplayed= true
  if(this.dataListaCurso.data.length==0){
  Swal.fire('Erro',`A grelha de alunos não pode estar vazia, por favor!`,'error');
  return;
}
for(var x in this.dataListaCurso.data){
  this.dataListaCurso.data[x].aprovado=true
}

  const dadosMancebo=this.lancaTemp.obterSessao();
  this.estudante= {
    turmastamp: dadosMancebo == null ? '' : dadosMancebo.turmastamp,
    anosem: dadosMancebo == null ? '' : dadosMancebo.anosem,
    turma: dadosMancebo == null ? '' : dadosMancebo.codigo,
    curso: dadosMancebo == null ? '' : dadosMancebo.curso,
    cursostamp: dadosMancebo == null ? '' : dadosMancebo.cursostamp,
    disciplina: dadosMancebo == null ? '' :dadosMancebo.disciplina,
    ststamp: dadosMancebo == null ? '' : dadosMancebo.ststamp,
    turmanota: this.dataListaCurso.data,
  }


  if (this.estudante != null) {
    this.TurmaotaService.GravarDadosEst(this.estudante).pipe(
      finalize(() =>  this.isSpinnerDisplayed = false , ),)
    .subscribe({
      next: (data) => {

        if (data.sucesso) {
          this.lancaTemp.eliminarSessao();
          this.lancaTemp.guardarSessao(data.dados);
          this.listCurso=data.dados.turmanota;
          const xx=this.lancaTemp.obterSessao();
  this.estudante=xx;
  this.listCurso=this.estudante.turmanota;
  this.myDataArray=this.estudante.turmanota;
  this.listCursoOriginal=this.estudante.turmanota;
  this.totalRecords=50;
  this.dataListaCurso= new MatTableDataSource(this.listCurso);
  this.dataListaCurso.sort = this.sort;
  //window.location.reload();
  Swal.fire('Sucesso',`Lançamento executado com sucesso`,'success');
        } else {
  Swal.fire('Opss',data.mensagem,'error');
        }
      },
      error: (e) => {
       // alert(e + " Erro de conexão");
      }
    });
  } else {

  Swal.fire('Opss'," Não pode gravar com dados vazios",'error');
  }



}

  public doFilter = (value: string) => {
    this.dataListaCurso.filter = value.trim().toLocaleLowerCase();
  }

busca(event: Event) {

  this.dataListaCurso.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
 
}

myDataArray: Array<Turmanota1> = [];


onKeyPress($event: Event,_t25: Turmanota1,number: number) {
  console.log(`1111`)

let id=($event.target as HTMLInputElement).id.replace(`-${number}`,'').toString().toLowerCase()
switch(id){
  case 'n1':

  _t25.n1 =this.newMethod($event);
    break;
    case 'n2':
      _t25.n2 =this.newMethod($event) ;
      break;
      case 'n3':
        _t25.n3 =this.newMethod($event) ;
        break;
        case 'n4':
          _t25.n4 =this.newMethod($event) ;
          break;
          case 'e1':
            _t25.e1 =this.newMethod($event);
            break;
            case 'e2':
              _t25.e2 =this.newMethod($event) ;
              break;
              case 'e2':
                _t25.es =this.newMethod($event) ;
                break;

}
let nota3 : any = document.getElementById("n3-"+number) as HTMLInputElement | null;

let nota4 : any = document.getElementById("n4-"+number) as HTMLInputElement | null
;

let test : any = document.getElementById(`Obs-${number}`) as HTMLInputElement | null



 //=(Number(nota3.value)+Number(nota4.value))/2
//_t25.media=test.value;

// test.value 
test.value=((Number(nota3.value)+Number(nota4.value))*0.3).toFixed(2)
// this.NotaF=test.value.to
// this.Datasend.MudarDados(test.value)


// let dt = ((40/2)*70)/100
// let result= (Number(dt) + Number(test.value)) 

// if( _t25.media>=9.5 && _t25.media <= 13.4){
//   _t25.resultado='Admitido(a)'
// }
// else if(_t25.media > 13.4){
//   _t25.resultado='Dispensado(a)'
// _t25.e1=_t25.media
// _t25.resultadoFinal = 'Aprovado(a)'
// }
// else{
//   _t25.resultado='Excluido(a)'
//   _t25.e1=_t25.media
//   _t25.resultadoFinal = 'Reprovado(a)'
// }

}

enviardados(){
  this.NotasTrabalhoEmitido.emit()
}



closeDialog(){
  this.modalActual.close(this.desc);
//this.router.navigate(['Adim/Parametrosvaliacao', {id : this.desc}])
}


onKeyPressTelef(params: any) {
  var inputVal = <HTMLInputElement>document.getElementById("InputTelef");
  if (params.key === 'Backspace' || params.key === '.') {
    return true;
  }
  else if (!this.isKeyPressedNumeric(params, inputVal)) {
    return false;
  } else {
    return true;
  }
}

onKeyPressTelef2(params: any) {
  var inputVal = <HTMLInputElement>document.getElementById("InputTelef2");
  if (params.key === 'Backspace' || params.key === '.') {
    return true;
  }
  else if (!this.isKeyPressedNumeric(params, inputVal)) {
    return false;
  } else {
    return true;
  }
}

onKeyPressNuit(params: any) {
  var inputVal = <HTMLInputElement>document.getElementById("InputNuit");
  if (params.key === 'Backspace' || params.key === '.') {
    return true;
  }
  else if (!this.isKeyPressedNumeric(params, inputVal)) {
    return false;
  } else {
    return true;
  }
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



  private newMethod($event: Event): string {

let numer=Number(($event.target as HTMLInputElement).value);
if(numer>20 || numer<0){
  Swal.fire('Erro',`O valor introduzido está incorrecto`,'error');
  return "";
}
    return (($event.target as HTMLInputElement).value);
  }

getCurso(){
  this.isSpinnerDisplayed=true;

}

@ViewChild(MatPaginator) paginator!: MatPaginator;

ngAfterViewInit(): void {

  const Dados = this.guararsessoes.obterSessao()

  if(!this.guararsessoes.isAutenticated()){
    Swal.fire('Erro',`Nao tens permissao para ver este formulario!`,'error');
    return;
  }
  if(Dados.tipo==2){

  let idf= this.route.snapshot.paramMap.get('id')?.toString();

  if (idf === undefined){
    if(this.dadosTemp.isAutenticatedauxiliar()){
      let des=this.dadosTemp.obterSessaoauxiliar().descricao;
      if (des.toLowerCase().includes('exame')){
        this.desc='exame';
      }
      else if (des.toLowerCase().includes('teste'))
      {
        this.desc='teste';
      }
    }
  }else{
    this.desc=idf?.toString();
  }
  let dadostemp = this.dadosTemp.obterSessaoauxiliar();

this.descrteste=this.dadosTemp.obterSessaoauxiliar().descricao



this.HabilitarTeste()




  const xx=this.lancaTemp.obterSessao();



  this.dadosMancebo=xx;
  if (this.dadosMancebo != null) {

    this.nims = this.dadosMancebo.turma.toString();
    this.situacaos = this.dadosMancebo.curso;
    this.titloAccao = " Notas de trabalhos";
    this.botaoAccao = "Gravar";
  }
  this.estudante=xx;
  this.listCurso=this.estudante.turmanota;
  this.myDataArray=this.estudante.turmanota;
  this.totalRecords=50;
  this.dataListaCurso= new MatTableDataSource(this.listCurso);

  this.listCursoOriginal=this.estudante.turmanota;
  this.dataListaCurso.sort = this.sort;
  this.dataListaCurso.paginator = this.paginator;
  this.paginator._intl.itemsPerPageLabel = 'itens por página.';
  this.paginator._intl.nextPageLabel = 'Próxima';
   this.paginator._intl.previousPageLabel = 'Anterior';
this.paginator._intl.lastPageLabel = 'Última';
this.paginator._intl.firstPageLabel = 'Primeira';
}else{
    
  Swal.fire('Erro',`Nao tens permissao para ver este formulario!`,'error');
}

}

initialLoad(_descricao:string){
  let currentPage= (this.paginator?.pageIndex ?? 0)+1;
  let pageSize= (this.paginator?.pageSize ?? 0);
  this.totalRecords=10;
  this.dataListaCurso.data=this.listCurso;
}


novoCurso(){

 }

 editarCurso(curso:Alauxiliar){

 }

 eliminarNivel(curso:Alauxiliar){


 }


}

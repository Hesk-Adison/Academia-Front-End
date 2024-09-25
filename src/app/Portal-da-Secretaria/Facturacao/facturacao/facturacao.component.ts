import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCake } from '@fortawesome/free-solid-svg-icons';
import { Observable, startWith, map, finalize } from 'rxjs';
import { selects, condicoesprocura } from 'src/Models/CampoSessoes';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { dmzview } from 'src/app/Interfaces/Grade/dmzview';
import {  procura } from 'src/app/Interfaces/Procura/Procura';
import { FrmProcuraGeralComponent } from 'src/app/frm-procura-geral/frm-procura-geral.component';
import { Matriculaservice } from '../../MatriculaAluno/matriculaservice';
import { Factl } from 'src/Models/Fact/Factl';
import { GenericoService } from 'src/Service/Generico/generico.service';
import { Tdoc } from 'src/Models/Tdoc/tdoc';
import { QuerryService } from 'src/Service/Querrys/querry.service';
import * as moment from 'moment';
import { CCu } from '../../CCu/CCu';
//import { St } from '../../CCu/St';
//import { Param } from 'src/app/Turmas/Componentes/Param/Param';
import { Param } from 'src/Models/Param/Param';
import { St } from 'src/Models/St/St';
import Swal from 'sweetalert2';
import { Fact } from 'src/Models/Fact/Fact';
import { Procuservice } from '../../MatriculaAluno/procuservice';
import { formasp } from 'src/app/frm-rcl/TodosRCL';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { formatDate } from '@angular/common';
import { cl } from 'src/Models/Cl/cl';
//import { Cl } from 'src/Models/Cls';

@Component({
  selector: 'app-facturacao',
  templateUrl: './facturacao.component.html',
  styleUrls: ['./facturacao.component.scss']
})
export class FacturacaoComponent implements OnInit,AfterViewInit{
  onSelectbi(value:selects,i:number) {


    let langArr = this.itemsFpag;
    langArr.controls[i].patchValue({titulo:value.descricao,
          })
  }

  onSetEtapaSemestre(value:any,i:number) {

    let langArr = this.itemsFpag;
    langArr.controls[i].patchValue(
      {
        contatesoura:value.contas,
        codtz:value.codigo,
        banco:value.sigla,
        contasstamp:value.contasstamp,
          }
    )
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
        private _filtercontas(name: string,list:any[]): any[] {
          const filterValue = name.toLowerCase();
          let fffh=list.filter(option => option.contas.toLowerCase().includes(filterValue));

          return fffh;
        }


  myControlturno = new FormControl<string | selects>('');
  optionsturno: selects[] = [];
  filteredOptionsturno!: Observable<selects[]>;
  EtapaSemestre: string='';
  EtapaSemestrestamp: string='';
  titloAccao: string='';
  botaoAccao: string='';
  cadastro!:FormGroup
  editando:boolean=false;
  valido:boolean=false;
  valido1:boolean=true;
  icon:string="plus_one"
  icon1:string="close"
  descricao:string="Novo"
  loggedOut:boolean=false;
  checked:boolean=false;
  indeterminate:boolean=false
  visibilidadeagregado:boolean=false;
  isSpinnerDisplayed=false
  turma: dmzview[]=[]
  turmaa: dmzview[]=[]
  listaFactl: Factl[]=[]
  listaformasp: formasp[]=[]
  Tdoc!:Tdoc;
  Ccu!:CCu;
  Param!:Param
  St!:St;
  clstampvliw: string='';
  dataListaturma = new MatTableDataSource(this.listaFactl);

  formasp: formasp[]=[]
  formasoss= new MatTableDataSource(this.formasp);
  @ViewChildren(MatPaginator) paginatorTeste = new QueryList<MatPaginator>();
  dataListaformasp = new MatTableDataSource(this.listaformasp);
  constructor(
    private fb:FormBuilder,
    private turmanotaservice: TurmaNotaService,private http: HttpClient,
    private _loginservice: LoginServiceService,
     private _estudanteService: Matriculaservice,
     private dialog: MatDialog,library: FaIconLibrary,
     private generico: GenericoService,
     private querry: QuerryService,
     private procuraservice: Procuservice,
      private guardarsessoes:GuardarSessoes,
      private cdr: ChangeDetectorRef,
      private ngZone: NgZone,
      private el: ElementRef, private renderer: Renderer2

   ){


 //
    library.addIcons(faCake);

    this.clstampvliw=this.turmanotaservice.Stamp();
    this.titloAccao=`Novo`;
    this.botaoAccao=`Salvar`;
    this.cadastro = this.fb.group({
      factstamp: this.clstampvliw,
numdoc:  Number(0),
tdocstamp: '',
sigla: '',
numero: '',
data: new Date(),
dataven: new Date(),
no: '',
nome: '',
morada: '',
telefone: '',
fax: '',
nuit:  Number(0),
email: '',
moeda: '',
subtotal:  Number(0),
perdesc:  Number(0),
perdescfin:  Number(0),
desconto:  Number(0),
descontofin:  Number(0),
mDescontofin:  Number(0),
totaliva:  Number(0),
total:  Number(0),
msubtotal:  Number(0),
mdesconto:  Number(0),
mtotaliva:  Number(0),
mtotal:  Number(0),
codvend:  Number(0),
vendedor: '',
cambiousd:  Number(0),
cambfixo: false,
anulado: false,
codInterno: '',
movtz: false,
movstk: false,
codmovstk:  Number(0),
movcc: false,
codmovcc:  Number(0),
nomedoc: '',
descmovcc: '',
descmovstk: '',
numinterno: '',
ccusto: '',
obs: '',
oristamp: '',
aprovado: false,
adjudicado: false,
origem: '',
coment: '',
codarm:  Number(0),
codturno:  Number(0),
turno: '',
mesa: '',
fechada: false,
isiva: false,
clivainc: false,
campo1: '',
campo2: '',
tipodoc:  Number(0),
no2:  Number(0),
nome2: '',
morada2: '',
localidade2: '',
nomecomerc: '',
integra: false,
noDiario:  Number(0),
diario: '',
nDocCont:  Number(0),
descDocCont: '',
contabilizado: false,
reserva: false,
lant:  Number(0),
lact:  Number(0),
lreal:  Number(0),
ldata: new Date(),
tipoentida: '',
zona: '',
ncont: '',
codzona:  Number(0),
fleitura: '',
ncontador: '',
moeda2: '',
pjno:  Number(0),
pjnome: '',
pjstamp: '',
estabno:  Number(0),
estabnome: '',
codisiva:  Number(0),
motivoisiva: '',
numcaixa:  Number(0),
datcaixa: '',
codsec:  Number(0),
descsector: '',
posto:  Number(0),
fechado: false,
entrega: false,
localentrega: '',
localpartida: '',
datapartida: new Date(),
requisicao: '',
dataentrega: new Date(),
pais: '',
departamento: '',
cell: '',
mail: '',
estado: '',
matricula: '',
pcontacto: '',
regularizado: false,
valRegularizado:  Number(0),
liquidofactura:  Number(0),
vendido: false,
segundaVia: false,
nrFactura: '',
motivoanula: '',
nrdocanuala: '',
clstamp: '',
codCondPagamento:  Number(0),
descCondPagamento: '',
ccustamp: '',
usrstamp: '',
nc: false,
nd: false,
ft: false,
vd: false,
factl: this.fb.array([]),
factprest:this.fb.array([]),
factreg: this.fb.array([]),
formasp: this.fb.array([]),
fcc: this.fb.array([]),
factanexo:this.fb.array([]),
motorista: '',
cursostamp: '',
desccurso: '',
turmastamp: '',
descturma: '',
anosem: '',
etapa: '',
inscricao: false,
entidadebanc: '',
referencia: '',
multa: false,
pos: false,
matriculaAluno: false,
name:['',Validators.required]
  })
  }
  // myControlTipoDoc = new FormControl<string | selects>('');
  // optionsTipoDoc: selects[] = [];
  // filteredOptionsTipoDoc!: Observable<selects[]>;





  myControlCcu = new FormControl<string | selects>('');
  optionsCcu: selects[] = [];
  filteredOptionsCcu!: Observable<selects[]>;



//Filtro de Moedas
filteredOptionsMoedas!: Observable<selects[]>;
myControlMoedas= new FormControl<string | selects>('');
optionslistaMoedasfilterr: selects[] = [];


//Filtro de Moedas de cambio
filteredOptionsMoedascambio!: Observable<selects[]>;
myControlMoedascambio= new FormControl<string | selects>('');
optionslistaMoedasfilterrcambio: selects[] = [];








//Filtro de Produtos por descricao
filteredOptionsSt!: Observable<selects[]>;
myControlSt= new FormControl<string | selects>('');
optionslistaStfilterr: selects[] = [];

//Filtro de Produtos por Referencia
filteredOptionsStref!: Observable<selects[]>;
myControlStref= new FormControl<string | selects>('');


optionslistaStreffilterr: selects[] = [];

  OnSelecttipodo(value:selects){
    this.editando=true;
      let se:selects={
        chave: 'tdoc',
        descricao:`${this.querry.querryTdoc()}`,
        ordem: `where tdocstamp='${value.chave}'`
      }
      this.SetTipoDoc(se);
  }
async MetodoInicializacao(){
  await this.ccu();
  await this. getmoedas();
  await this. getSt();
}
 async ngAfterViewInit() {
   this.dataListaturma.paginator=this.paginatorTeste.toArray()[0];
  this.querry.querryTdoc()
  await this.GetTipoDocMat();
  await this.ccu();
  await this. getmoedas();
  await this. getSt();
await this.getParam();

await this.getEtapaSemestre();
await this.Getturno();
this.cdr.detectChanges();


  }
  nos:string='';
  nome=''
 async ngOnInit(){

this.disableForm();

this.nome=this.guardarsessoes.obterSessao().nome;
console.log(this.guardarsessoes.obterSessao())
}
dmzview:dmzview[]=[]
 async getParam(){
  let item:selects={
    chave: 'Param',
    descricao: ` *`,
    ordem: `where 1=1`
  };
  this.generico.GetGenerico(item.chave, item.descricao, item.ordem).subscribe({
    next: (data) => {
      if (data.sucesso) {
        this.dmzview = data.dados.dmzview;
      }
    }
  });


  this.generico.MetodoGenerico(item.chave, item.descricao, item.ordem).subscribe({
    next: (data) => {
      if (data.sucesso) {
                 this.Param=data.dados[0] as Param;

      }
    }
  });
}



async ccu(){

  const se:condicoesprocura={
    tabela:"ccu",
  campo1: "descricao",
  campo2:"Codccu",
   condicao:"vazio"
  }
  ''

  this._loginservice.getselectionPost(se).subscribe({
    next: (data) => {

      if (data.sucesso) {
        this.optionsCcu = data.dados.selects;
        this.filteredOptionsCcu = this.myControlCcu.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.descricao;
            return name ? this._filter(name as string,this.optionsCcu) : this.optionsCcu.slice();
          }),
        );
        let se:selects={
          chave: 'ccu',
          descricao: ` top 1 *`,
          ordem: `where descricao<>''`
        }
        this.Setccu(se);

      } else {
      }
    },
    error: (e) => {
    }
  });

}


async GetDocumentos()
{
  this.isSpinnerDisplayed = true;
  let nimNome = '';
let prc:procura={
tabela: 'Tdoc',
campo: 'descricao',
campo1: 'Sigla',
chave: 'Tdocstamp',
valorprocurado: nimNome,
currentNumber: 1,
pagesize: 5,
marcar: false,
professorstamp: '',
alunoestamp: '',
rhstamp: '',
referencia: '',
descricao: '',
origem:'Documento'
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
// this.itemsFactl.clear();
// this.itemsFpag.clear();
// this.dataListaturma.data=[];
// this.listaFactl=[];
// this.resetForm();


let se:selects={
  chave: 'Tdoc',
  descricao: `${this.querry.querryTdoc()}`,
  ordem: ` where tdocstamp='${resultado.chave}'`
}
this.SetTipoDoc(se);
    }
  });
}



  async GetTipoDocMat(){
    let se:selects={
      chave: 'Tdoc',
      descricao: `${this.querry.querryTdoc()}`,
      ordem: 'where Defa=1'
    }
    this.SetTipoDoc(se);
  }
    private _filter(name: string,list:selects[]): selects[] {
    const filterValue = name.toLowerCase();
    let fffh=list.filter(option => option.descricao.toLowerCase().includes(filterValue));

     return fffh;
   }
   private _filterREF(name: string,list:selects[]): selects[] {
    const filterValue = name.toLowerCase();
    let fffh=list.filter(option => option.ordem.toLowerCase().includes(filterValue));

     return fffh;
   }
AnularFactura(){

}
 async showConfirmationDialog(): Promise<boolean> {
  const result = await Swal.fire({
      title: 'Confirme a operação',
      text: 'Tens certeza de que pretende cancelar o documento?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
  });

  // Check if user clicked Yes or Cancel
  if (result.isConfirmed) {
      // User clicked Yes
      return true;
  } else {
      // User clicked Cancel or closed the dialog
      return false;
  }
}
async  handleAction() {
  const confirmed = await this.showConfirmationDialog();
  if (confirmed) {
    if(this.Procurou==true){
      this.Cadastrar(true)
    }
  } else {

  }
}


  Cadastrar(anulado:boolean){

    if(this.cadastro.value.clstamp.length==0){
      Swal.fire('Não permitido!', 'O aluno não foi seleccionado!', 'error');
      return;
    }
    if(this.cadastro.value.cursostamp.length==0){
      Swal.fire('Não permitido!', 'O curso do aluno está vazio!', 'error')
      return;
    }
    this.removerlinhadeTotais();

    this.dataListaturma= new MatTableDataSource(this.listaFactl);
    let turmadis=this.itemsFactl.controls
    for (let i = 0; i < turmadis.length; i++) {
let factl:Factl={
  factlstamp: turmadis[i].value.factlstamp,
  factstamp: turmadis[i].value.factstamp,
  ststamp: turmadis[i].value.ststamp,
  entidadestamp: turmadis[i].value.entidadestamp,
  numdoc: turmadis[i].value.numdoc,
  sigla: turmadis[i].value.sigla,
  ref: turmadis[i].value.ref,
  descricao: turmadis[i].value.descricao,
  quant: turmadis[i].value.quant,
  unidade: turmadis[i].value.unidade,
  armazem: turmadis[i].value.armazem,
  preco: turmadis[i].value.preco,
  mpreco: turmadis[i].value.mpreco,
  tabiva: turmadis[i].value.tabiva,
  txiva: turmadis[i].value.txiva,
  valival: turmadis[i].value.valival,
  mvalival: turmadis[i].value.mvalival,
  ivainc: turmadis[i].value.ivainc,
  activo: turmadis[i].value.activo,
  perdesc: turmadis[i].value.perdesc,
  descontol: turmadis[i].value.descontol,
  mdescontol: turmadis[i].value.mdescontol,
  subtotall: turmadis[i].value.subtotall,
  msubtotall: turmadis[i].value.msubtotall,
  totall: turmadis[i].value.totall,
  mtotall: turmadis[i].value.mtotall,
  status: turmadis[i].value.status,
  lote: turmadis[i].value.lote,
  servico: turmadis[i].value.servico,
  oristampl: turmadis[i].value.oristampl,
  dispon: turmadis[i].value.dispon,
  nmovstk: turmadis[i].value.nmovstk,
  oristamp: turmadis[i].value.oristamp,
  tit: turmadis[i].value.tit,
  stkprod: turmadis[i].value.stkprod,
  lineAnulado: anulado,
  titstamp: turmadis[i].value.titstamp,
  contatz: turmadis[i].value.contatz,
  composto: turmadis[i].value.composto,
  usalote: turmadis[i].value.usalote,
  descarm: turmadis[i].value.descarm,
  refornec: turmadis[i].value.refornec,
  usaquant2: turmadis[i].value.usaquant2,
  quant2: turmadis[i].value.quant2,
  morada: turmadis[i].value.morada,
  telefone: turmadis[i].value.telefone,
  entrega: turmadis[i].value.entrega,
  dataentrega: this._estudanteService.ConvertDate(new Date()),
  pcontacto: turmadis[i].value.pcontacto,
  email: turmadis[i].value.email,
  pais: turmadis[i].value.pais,
  guias: turmadis[i].value.guias,
  contrato: turmadis[i].value.contrato,
  gasoleo: turmadis[i].value.gasoleo,
  moeda: turmadis[i].value.moeda,
  moeda2: turmadis[i].value.moeda2,
  ccusto: turmadis[i].value.ccusto,
  codccu: turmadis[i].value.codccu,
  obs: turmadis[i].value.obs,
  armazemstamp: turmadis[i].value.armazemstamp,
  ordem: 0,
  pack: 0,
  cpoc: 0,
  cpoo: 0,
  qttOrig: 0,
  cambiousd: 0,

}
this.dataListaturma.data.push(factl)


    }


 this.formasoss= new MatTableDataSource(this.formasp);
    let turmadiss=this.itemsFpag.controls

    for (let i = 0; i < turmadiss.length; i++) {
      let formaso:formasp={
        factstamp: turmadiss[i].value.factstamp,
        formaspstamp: turmadiss[i].value.formaspstamp,
        titulo: turmadiss[i].value.titulo,
        numtitulo: turmadiss[i].value.numtitulo,
        dcheque: this._estudanteService.ConvertDate(turmadiss[i].value.dcheque),
        banco: turmadiss[i].value.banco,
        contatesoura: turmadiss[i].value.contatesoura,
        valor: turmadiss[i].value.valor,
        codtz: Number(turmadiss[i].value.codtz),
        trf: false,
        numer: false,
        tipo: false,
        obgTitulo: false,
        rclstamp: '',
        oristamp: '',
        faccstamp: '',
        pgfstamp: '',
        perclstamp: '',
        status: false,
        distamp: '',
        cpoc: 0,
        contaPgc: 0,
        origem: '',
        mvalor: 0,
        codmovtz: this.Tdoc.codmovtz,
        descmovtz: this.Tdoc.descmovtz,
        codmovtz2: 0,
        descmovtz2: '',
        usrLogin: '',
        aberturaCaixa: false,
        no: 0,
        nome: '',
        numero: 0,
        ccusto: '',
        contasstamp: '',
        ccustamp: '',
        moeda: 'MZN',
        cambiousd: 0,
        codtz2: 0,
        contatesoura2: '',
        contasstamp2: '',
        banco2: ''
      }
      this.formasoss.data.push(formaso)


          }


let fact:Fact={
  factstamp: this.clstampvliw,
  numdoc: this.Tdoc.numdoc,
  tdocstamp: this.Tdoc.tdocstamp,
  sigla: this.Tdoc.sigla,
  numero: this.cadastro.value.numero,
  data:this._estudanteService.ConvertDate(this.cadastro.value.data) ,
  dataven:this._estudanteService.ConvertDate(this.cadastro.value.dataven)  ,
  no: this.cadastro.value.no,
  nome: this.cadastro.value.nome,
  morada: this.cadastro.value.morada,
  moeda: this.cadastro.value.moeda,
  subtotal: this.cadastro.value.subtotal,
  total: this.cadastro.value.total,
  movtz: this.Tdoc.movtz,
  movstk: this.Tdoc.movstk,
  codmovstk: this.Tdoc.codmovstk,
  movcc: this.Tdoc.movcc,
  codmovcc: this.Tdoc.codmovcc,
  nomedoc: this.Tdoc.descricao,
  descmovcc: this.Tdoc.descmovcc,
  descmovstk: this.Tdoc.descmovstk,
  clstamp: this.cadastro.value.clstamp,
  ccustamp: this.cadastro.value.ccustamp,
  nc: this.Tdoc.nc,
  nd: this.Tdoc.nd,
  ft: this.Tdoc.ft,
  vd: this.Tdoc.vd,
  cursostamp: this.cadastro.value.cursostamp,
  desccurso: this.cadastro.value.desccurso,
  turmastamp: this.cadastro.value.turmastamp,
  descturma: this.cadastro.value.descturma,
  factl: this.dataListaturma.data,
  factprest: [],
  factreg: [],
  formasp: this.formasoss.data,
  fcc: [],
  factanexo: [],
  telefone: '',
  fax: '',
  nuit:  Number(0),
  email: '',
  perdesc:  Number(0),
  perdescfin:  Number(0),
  desconto:  Number(0),
  descontofin:  Number(0),
  mDescontofin:  Number(0),
  totaliva:  Number(0),
  msubtotal:  Number(0),
  mdesconto:  Number(0),
  mtotaliva:  Number(0),
  mtotal:  Number(0),
  codvend:  Number(0),
  vendedor: '',
  cambiousd:  Number(0),
  cambfixo: false,
  anulado: false,
  codInterno: '',
  numinterno: '',
  ccusto: '',
  obs: '',
  oristamp: '',
  aprovado: false,
  adjudicado: false,
  origem: '',
  coment: '',
  codarm:  Number(0),
  codturno:  Number(0),
  turno: '',
  mesa: '',
  fechada: false,
  isiva: false,
  clivainc: false,
  campo1: '',
  campo2: '',
  tipodoc:  Number(0),
  no2:  Number(0),
  nome2: '',
  morada2: '',
  localidade2: '',
  nomecomerc: '',
  integra: false,
  noDiario:  Number(0),
  diario: '',
  nDocCont:  Number(0),
  descDocCont: '',
  contabilizado: false,
  reserva: false,
  lant:  Number(0),
  lact:  Number(0),
  lreal:  Number(0),
  ldata:this._estudanteService.ConvertDate(new Date())  ,
  tipoentida: '',
  zona: '',
  ncont: '',
  codzona:  Number(0),
  fleitura: '',
  ncontador: '',
  moeda2: '',
  pjno:  Number(0),
  pjnome: '',
  pjstamp: '',
  estabno:  Number(0),
  estabnome: '',
  codisiva:  Number(0),
  motivoisiva: '',
  numcaixa:  Number(0),
  datcaixa: this._estudanteService.ConvertDate(new Date()),
  codsec:  Number(0),
  descsector: '',
  posto: Number(0),
  fechado: false,
  entrega: false,
  localentrega: '',
  localpartida: '',
  datapartida: this._estudanteService.ConvertDate(new Date()),
  requisicao: '',
  dataentrega:this._estudanteService.ConvertDate(new Date()),
  pais: '',
  departamento: '',
  cell: '',
  mail: '',
  estado: '',
  matricula: '',
  pcontacto: '',
  regularizado: false,
  valRegularizado:  Number(0),
  liquidofactura:  Number(0),
  vendido: false,
  segundaVia: false,
  nrFactura: '',
  motivoanula: '',
  nrdocanuala: '',
  codCondPagamento:  Number(0),
  descCondPagamento: '',
  motorista: '',
  inscricao: false,
  entidadebanc: '',
  referencia: '',
  multa:false,
  pos: false,
  usrstamp: '',
  anosem: '',
  etapa: '',
  matriculaAluno: false
}
fact.anulado=anulado;
const dadosssss=fact;
this.isSpinnerDisplayed=true;
this._estudanteService.PostarFact(dadosssss).pipe(
  finalize(() => this.isSpinnerDisplayed = false),
).subscribe({
  next: (data) => {
    if (data.sucesso) {

    Swal.fire('Sucesso!', `Operação executada com sucesso`, 'success');


    }


  },
  error: (set:any) => {
    this.isSpinnerDisplayed = false
  }
});

this.getSummary();
  }


// //---------------------------------Adicionar Factl------------------------------------------------------------------------


get itemsFactl(): FormArray {
  return this.cadastro.get('factl') as FormArray;
}


onSelectFactl(value: selects, i: number): void {
  const langArr = this.itemsFactl;
  langArr.controls[i].patchValue({ titulo: value.descricao });
}
Imprimir(){}


      adicionarfacttl(): void {
        if(this.cadastro.value.clstamp.length==0){
          Swal.fire('Não permitido!', 'O aluno não foi seleccionado!', 'error');
          return;
        }
       let linhastamp=this.turmanotaservice.Stamp();

     this.removerlinhadeTotais();

let qtd=1;
if(this.Tdoc.nc==true){
  qtd=-1;
}

        const factlGroup = this.fb.group({
          factlstamp: linhastamp,
          factstamp: this.clstampvliw,
          ststamp: '',
          entidadestamp: '',
          numdoc:  Number(0),
          sigla: '',
          ref: '',
          descricao: '',
          quant: qtd,
          unidade: '',
          armazem:  Number(0),
          preco:  Number(0),
          mpreco:  Number(0),
          tabiva:  Number(0),
          txiva:  Number(0),
          valival:  Number(0),
          mvalival:  Number(0),
          ivainc: false,
          activo: false,
          perdesc:  Number(0),
          descontol:  Number(0),
          mdescontol:  Number(0),
          subtotall:  Number(0),
          msubtotall:  Number(0),
          totall:  Number(0),
          mtotall:  Number(0),
          status: false,
          lote: '',
          servico: false,
          oristampl: '',
          dispon:  Number(0),
          qttOrig:  Number(0),
          nmovstk: false,
          oristamp: '',
          tit: false,
          ordem:  Number(0),
          stkprod: false,
          lineAnulado: false,
          titstamp: '',
          contatz:  Number(0),
          pack:  Number(0),
          cpoc:  Number(0),
          cpoo:  Number(0),
          composto: false,
          usalote: false,
          descarm: '',
          refornec: '',
          usaquant2: false,
          quant2:  Number(0),
          morada: '',
          telefone: '',
          entrega: false,
          dataentrega: this._estudanteService.ConvertDate(new Date()),
          pcontacto: '',
          email: '',
          pais: '',
          guias: '',
          contrato: '',
          gasoleo: false,
          cambiousd:  Number(0),
          moeda: '',
          moeda2: '',
          ccusto: '',
          codccu: '',
          obs: '',
          armazemstamp: '',
        });

        this.itemsFactl.push(factlGroup);
if(this.itemsFactl.length>=1){


  let i=this.itemsFactl.length-1;
  let langArr = (<FormArray>this.cadastro.get('factl'))
  langArr.controls[i].patchValue({
   ststamp:'',
   ref :'',
   descricao :'',
        })


        if(this.Tdoc.movtz==true){
       if(this.itemsFpag.length==0){
              this.adicionarFp();
       }
        }
}

this.getSummary();


      }

      removerFactl(index: number): void {
        this.itemsFactl.removeAt(index);
      }

      get itemsFpag(): FormArray {

        return this.cadastro.get('formasp') as FormArray;
       }

       calculationtotalpago(){
        this.removerlinhadeTotais();
        let ft=this.itemsFactl;
        let total=ft.value.reduce((prev: number, next: { totall: number | number; }) => prev + +next.totall, 0);
        this.getSummary();
          return total;
          }
       stamp='';
       visibilidadeFormasp=false;
      adicionarFp() {

         if(this.cadastro.value.cursostamp.length==0){
          Swal.fire('Não permitido!', 'O curso do aluno está vazio!', 'error')
          return;
        }
        if(this.cadastro.value.clstamp.length==0){
          Swal.fire('Não permitido!', 'Indica o aluno primeiro!', 'error')
          return;
        }
        this.visibilidadeFormasp=true;

      let yotal=0;
      let sum = this.itemsFpag.value.reduce((prev: number,
         next: { valor: string | number; }) => prev + +next.valor, 0);

       yotal=Number(this.calculationtotalpago())-Number(sum)
       if(this.calculationtotalpago()>0)
       {
        if(this.calculationtotalpago()==sum){
          Swal.fire('Não permitido!', 'Já não é possivel adicionar mais formas de pagamentos!', 'error')
          return;
        }
       }

        this.visibilidadeFormasp=true;
      let stamp =this.turmanotaservice.Stamp();
        this.itemsFpag.push(this.fb.group({
          formaspstamp: stamp,
          titulo: '',
          numtitulo: '',
          dcheque: new Date(),
          banco: '',
          banco2: '',
          contatesoura: '',
          valor: '',
          codtz: Number(0),
          codtz2:  Number(0),
          contatesoura2: '',
          contasstamp2: '',
          trf: false,
          numer: false,
          tipo: false,
          obgTitulo: false,
          rclstamp: '',
          oristamp: this.clstampvliw,
          factstamp: this.clstampvliw,
          faccstamp: '',
          pgfstamp: '',
          perclstamp: '',
          status: false,
          distamp: '',
          cpoc:  Number(0),
          contaPgc:  Number(0),
          origem: 'VD',
          mvalor:  Number(0),
          codmovtz: Number(0),
          descmovtz: '',
          codmovtz2:  Number(0),
          descmovtz2: '',
          usrLogin: '',
          aberturaCaixa: false,
          no: this.cadastro.value.no,
          nome: this.cadastro.value.nome,
          numero: this.cadastro.value.numero,
          ccusto: this.cadastro.value.ccusto,
          contasstamp: '',
          ccustamp: this.cadastro.value.ccustamp,
          moeda: 'MZN',
          cambiousd: 1
        }));
        //this.itemsFpag.push(factlGroup);
      }

      removerFp(index: number): void {
        if(this.itemsFpag.length>0){
          this.itemsFpag.removeAt(index);
        }
        if(this.itemsFpag.length>0){
          this.visibilidadeFormasp=true;
        }
        else{
          this.visibilidadeFormasp=false;
        }
      }

      get itemsAnexos(): FormArray {
        return this.cadastro.get('factanexo') as FormArray;
      }
      adicionarAnexos(){

        this.itemsAnexos.push(this.fb.group({
          factanexostamp: '',
          factstamp: '',
          descricao: '',
          anexo:'',
          fact:'',
        }))

      }

      // removerAnexos(index: number): void {
      //   this.itemsFp.removeAt(index);
      // }


      getestudante()



      {
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
    professorstamp: '',
    alunoestamp: '',
    rhstamp: '',
    referencia: '',
    descricao: '',
    origem:'Produtos'
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

  this.itemsFactl.clear();
  this.itemsFpag.clear();
  this.dataListaturma.data=[];
  this.listaFactl=[];
            this.onSelectAluno(set)
          }
        });
      }

      getprodu(orige:string,i:number) {
        this.isSpinnerDisplayed = true;
        let nimNome = '';

        let camp=orige;

        let camp2='';

        let referencia='';

        let descricao='';


        switch(orige.toLowerCase()){
          case 'ref':
            camp2='descricao';
            camp='referenc';
            descricao='referência';
            referencia='Descrição';
          break
          case 'descricao':
          camp2='referenc';
          descricao='Descrição';
          referencia='referência';
          break


        }

  let prc:procura={
    tabela: 'St',
    campo: camp,
    campo1: camp2,
    chave: 'ststamp',
    valorprocurado: nimNome,
    currentNumber: 1,
    pagesize: 5,
    marcar: false,
    professorstamp:'',
        alunoestamp: '',
        rhstamp:'',
        referencia: referencia,
        descricao: descricao,
        origem:'Produtos'
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



let descrica=''
let ref=''
            switch(orige.toLowerCase()){
              case 'ref':
                descrica=resultado.campo1;
                ref=resultado.campo;
              break
              case 'descricao':
                descrica=resultado.campo;
                ref=resultado.campo1;
              break


            }
  let set:selects={
    chave: resultado.chave,
    descricao: descrica,
    ordem: ref
  }


  // ststamp:item.chave,
  //         ref :item.ordem,
  //         descricao :item.descricao,


          this.SetProduto(set,i)
          }
        });
      }


      Procurou=false;

      getFact(orige:string) {

        if(this.Tdoc==null && this.Tdoc==undefined){
          Swal.fire('Não permitido!', 'O tipo de Documento não foi especificado!', 'error');
          return;
        }

        this.isSpinnerDisplayed = true;
        let nimNome = '';


        let camp=orige;
        let ori='';


        let camp2='';

        let referencia='';

        let descricao='';


        switch(orige.toLowerCase()){
          case 'numero':
            camp2='nome';
            camp='numero';
            descricao='Número';
            referencia='Nome';
            ori='ref'
          break
          case 'nome':
          camp2='numero';
          camp='nome';
          descricao='Número';
          referencia='Nome';
            ori='descricao'
          break
        }

  let prc:procura={
    tabela: 'Fact',
    campo: camp,
    campo1: camp2,
    chave: 'factstamp',
    valorprocurado: nimNome,
    currentNumber: 1,
    pagesize: 5,
    marcar: false,
    professorstamp: `Tdocstamp='${this.Tdoc.tdocstamp}' and mesa=0   `,
    alunoestamp: '',
    rhstamp: '',
    origem: ori,
    referencia: referencia,
    descricao: descricao,
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

  this.itemsFactl.clear();
  this.itemsFpag.clear();
  this.dataListaturma.data=[];
  this.listaFactl=[];
            this.OnsetFact(set)
this.Enableform();


          }
        });
      }



      OnsetFact(value:selects) {

        this.visibilidadeFormasp=false;
      let item:selects={
        chave: 'fact',
        descricao:` * `,
        ordem: `where factstamp='${value.chave}'`
      }

      let items:selects={
        chave: `${value.chave}`,
        descricao:` vax `,
        ordem: ` fact`
      }

      this.procuraservice.GetPreencheCampos(items).subscribe({
        next: (data) => {
          if (data.sucesso) {
            this.Procurou=true;
              let aluno = data.dados as Fact;
               this.clstampvliw=aluno.factstamp;
              this.cadastro.patchValue({
                factstamp: aluno.factstamp,
                numdoc: aluno.numdoc,
                tdocstamp: aluno.tdocstamp,
                sigla: aluno.sigla,
                numero: aluno.numero,
                data: aluno.data,
                dataven: aluno.dataven,
                no: aluno.no,
                nome: aluno.nome,
                morada: aluno.morada,
                telefone: aluno.telefone,
                fax: aluno.fax,
                nuit: aluno.nuit,
                email: aluno.email,
                moeda: aluno.moeda,
                subtotal: aluno.subtotal,
                perdesc: aluno.perdesc,
                perdescfin: aluno.perdescfin,
                desconto: aluno.desconto,
                descontofin: aluno.descontofin,
                mDescontofin: aluno.mDescontofin,
                totaliva: aluno.totaliva,
                total: aluno.total,
                msubtotal: aluno.msubtotal,
                mdesconto: aluno.mdesconto,
                mtotaliva: aluno.mtotaliva,
                mtotal: aluno.mtotal,
                codvend: aluno.codvend,
                vendedor: aluno.vendedor,
                cambiousd: aluno.cambiousd,
                cambfixo: aluno.cambfixo,
                anulado: aluno.anulado,
                codInterno: aluno.codInterno,
                movtz: aluno.movtz,
                movstk: aluno.movstk,
                codmovstk: aluno.codmovstk,
                movcc: aluno.movcc,
                codmovcc: aluno.codmovcc,
                nomedoc: aluno.nomedoc,
                descmovcc: aluno.descmovcc,
                descmovstk: aluno.descmovstk,
                numinterno: aluno.numinterno,
                ccusto: aluno.ccusto,
                obs: aluno.obs,
                oristamp: aluno.oristamp,
                aprovado: aluno.aprovado,
                adjudicado: aluno.adjudicado,
                origem: aluno.origem,
                coment: aluno.coment,
                codarm: aluno.codarm,
                codturno: aluno.codturno,
                turno: aluno.turno,
                mesa: aluno.mesa,
                fechada: aluno.fechada,
                isiva: aluno.isiva,
                clivainc: aluno.clivainc,
                campo1: aluno.campo1,
                campo2: aluno.campo2,
                tipodoc: aluno.tipodoc,
                no2: aluno.no2,
                nome2: aluno.nome2,
                morada2: aluno.morada2,
                localidade2: aluno.localidade2,
                nomecomerc: aluno.nomecomerc,
                integra: aluno.integra,
                noDiario: aluno.noDiario,
                diario: aluno.diario,
                nDocCont: aluno.nDocCont,
                descDocCont: aluno.descDocCont,
                contabilizado: aluno.contabilizado,
                reserva: aluno.reserva,
                lant: aluno.lant,
                lact: aluno.lact,
                lreal: aluno.lreal,
                ldata: aluno.ldata,
                tipoentida: aluno.tipoentida,
                zona: aluno.zona,
                ncont: aluno.ncont,
                codzona: aluno.codzona,
                fleitura: aluno.fleitura,
                ncontador: aluno.ncontador,
                moeda2: aluno.moeda2,
                pjno: aluno.pjno,
                pjnome: aluno.pjnome,
                pjstamp: aluno.pjstamp,
                estabno: aluno.estabno,
                estabnome: aluno.estabnome,
                codisiva: aluno.codisiva,
                motivoisiva: aluno.motivoisiva,
                numcaixa: aluno.numcaixa,
                datcaixa: aluno.datcaixa,
                codsec: aluno.codsec,
                descsector: aluno.descsector,
                posto: aluno.posto,
                fechado: aluno.fechado,
                entrega: aluno.entrega,
                localentrega: aluno.localentrega,
                localpartida: aluno.localpartida,
                datapartida: aluno.datapartida,
                requisicao: aluno.requisicao,
                dataentrega: aluno.dataentrega,
                pais: aluno.pais,
                departamento: aluno.departamento,
                cell: aluno.cell,
                mail: aluno.mail,
                estado: aluno.estado,
                matricula: aluno.matricula,
                pcontacto: aluno.pcontacto,
                regularizado: aluno.regularizado,
                valRegularizado: aluno.valRegularizado,
                liquidofactura: aluno.liquidofactura,
                vendido: aluno.vendido,
                segundaVia: aluno.segundaVia,
                nrFactura: aluno.nrFactura,
                motivoanula: aluno.motivoanula,
                nrdocanuala: aluno.nrdocanuala,
                clstamp: aluno.clstamp,
                codCondPagamento: aluno.codCondPagamento,
                descCondPagamento: aluno.descCondPagamento,
                ccustamp: aluno.ccustamp,
                usrstamp: aluno.usrstamp,
                nc: aluno.nc,
                nd: aluno.nd,
                ft: aluno.ft,
                vd: aluno.vd,
                motorista: aluno.motorista,
                cursostamp: aluno.cursostamp,
                desccurso: aluno.desccurso,
                turmastamp: aluno.turmastamp,
                descturma: aluno.descturma,
                anosem: aluno.anosem,
                etapa: aluno.etapa,
                inscricao: aluno.inscricao,
                entidadebanc: aluno.entidadebanc,
                referencia: aluno.referencia,
                multa: aluno.multa,
                pos: aluno.pos,
                matriculaAluno: aluno.matriculaAluno,
              });
              this.dataListaturma.data=aluno.factl
              while (this.itemsFactl.length !== 0) {
                this.itemsFactl.removeAt(0);
              }
              // Add new form controls based on data
              this.dataListaturma.data.forEach(item => {
                const formGroup = this.fb.group({
                  factlstamp: item.factlstamp,
                  factstamp: item.factstamp,
                 ststamp: item.ststamp,
                 entidadestamp: item.entidadestamp,
                  numdoc: item.numdoc,
                  sigla: item.sigla,
                   ref: item.ref,
                   descricao: item.descricao,
                   quant: item.quant,
                  unidade: item.unidade,
                  armazem: item.armazem,
                   preco: item.preco,
                  mpreco: item.mpreco,
                  tabiva: item.tabiva,
                  txiva: item.txiva,
                  valival: item.valival,
                  mvalival: item.mvalival,
                  ivainc: item.ivainc,
                  activo: item.activo,
                  perdesc: item.perdesc,
                  descontol: item.descontol,
                  mdescontol: item.mdescontol,
                  subtotall: item.subtotall,
                  msubtotall: item.msubtotall,
                   totall: item.totall,
                  mtotall: item.mtotall,
                  status: item.status,
                  lote: item.lote,
                   servico: item.servico,
                  oristampl: item.oristampl,
                  dispon: item.dispon,
                  qttOrig: item.qttOrig,
                  nmovstk: item.nmovstk,
                  oristamp: item.oristamp,
                  tit: item.tit,
                  ordem: item.ordem,
                  stkprod: item.stkprod,
                  lineAnulado: item.lineAnulado,
                  titstamp: item.titstamp,
                  contatz: item.contatz,
                  pack: item.pack,
                  cpoc: item.cpoc,
                  cpoo: item.cpoo,
                  composto: item.composto,
                  usalote: item.usalote,
                  descarm: item.descarm,
                  refornec: item.refornec,
                  usaquant2: item.usaquant2,
                  quant2: item.quant2,
                  morada: item.morada,
                  telefone: item.telefone,
                  entrega: item.entrega,
                  dataentrega: item.dataentrega,
                  pcontacto: item.pcontacto,
                  email: item.email,
                  pais: item.pais,
                  guias: item.guias,
                  contrato: item.contrato,
                  gasoleo: item.gasoleo,
                  cambiousd: item.cambiousd,
                  moeda: item.moeda,
                  moeda2: item.moeda2,
                  ccusto: item.ccusto,
                  codccu: item.codccu,
                  obs: item.obs,
                  armazemstamp: item.armazemstamp,
                  // Add more fields as needed
                });
                this.itemsFactl.push(formGroup);
              });


              this.dataListaformasp.data=aluno.formasp
              while (this.itemsFpag.length !== 0) {
                this.itemsFpag.removeAt(0);
              }
if(aluno.formasp.length>0){
  this.visibilidadeFormasp=true;
 // Add new form controls based on data
 this.dataListaformasp.data.forEach(item => {
  const formGroup = this.fb.group({
    formaspstamp :item.formaspstamp,
    titulo :item.titulo,
    numtitulo :item.numtitulo,
    dcheque :item.dcheque,
    banco :item.banco,
    banco2 :item.banco2,
    contatesoura :item.contatesoura,
     valor :item.valor,
    codtz :Number(item.codtz),
    codtz2 :Number(item.codtz2),
    contatesoura2 :item.contatesoura2,
    contasstamp2 :item.contasstamp2,
     trf :item.trf,
     numer :item.numer,
     tipo :item.tipo,
     obgTitulo :item.obgTitulo,
    rclstamp :item.rclstamp,
    oristamp :item.oristamp,
    factstamp :item.factstamp,
    faccstamp :item.faccstamp,
    pgfstamp :item.pgfstamp,
    perclstamp :item.perclstamp,
     status :item.status,
    distamp :item.distamp,
     cpoc :item.cpoc,
     contaPgc :item.contaPgc,
    origem :item.origem,
     mvalor :item.mvalor,
     codmovtz :item.codmovtz,
    descmovtz :item.descmovtz,
     codmovtz2 :item.codmovtz2,
    descmovtz2 :item.descmovtz2,
    usrLogin :item.usrLogin,//RECEBE O STAMP DO UTILIZADOR
     aberturaCaixa :item.aberturaCaixa,
    no :item.no,
    nome :item.nome,
    numero :item.numero,
    ccusto :item.ccusto,
    contasstamp :item.contasstamp,
    ccustamp :item.ccustamp,
    moeda :item.moeda,
     cambiousd :item.cambiousd,
    // Add more fields as needed
  });
  this.itemsFpag.push(formGroup);
});
}
if(this.itemsFactl.length>0){
  this.getSummary() ;
}
            }

        },
        error: (e) => {
        }
      });




        }




Cl:any;
      onSelectAluno(value:selects) {



      let item:selects={
        chave: 'cl',
        descricao:`${this.querry.QuerryclFact()}`,
        ordem: `where clstamp='${value.chave}'`
      }
      this.generico.MetodoGenerico(item.chave, item.descricao, item.ordem).subscribe({
            next: (data) => {
              if (data.sucesso) {

                  let aluno = data.dados[1];
                  if(data.dados[1].moeda==''){
                    aluno.col19='MZN'
                  }
                  this.Cl=aluno;
                  this.cadastro.patchValue({
                    desccurso:aluno.curso,
                    cursostamp :aluno.codcurso,
                    clstamp :aluno.clstamp,
                    no :aluno.no,
                    nome :aluno.nome,
                    email :aluno.email,
                    gradestamp :aluno.gradestamp,
                    descGrade :aluno.descgrelha,
                    nivelac :aluno.col5,
                    ccusto :aluno.ccusto,
                    ccustamp :aluno.ccustostamp,
                  nuit: aluno.nuit,
                  morada: aluno.morada,
                  localidade: aluno.localidade,
                  moeda: aluno.col19,
                  estabnome: aluno.faculdade,
                  cambiousd:  Number(0),
                  descturma:aluno.turma,
                  turmastamp: aluno.turmastampunion,
                  entidadebanc: aluno.entidadebanc
                  });

                }
                this.isSpinnerDisplayed=false;

            },
            error: (e) => {
              //this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
            }
          });


        }
        isCheckboxDisabled=true;

        isCheckbox=false;

SetTipoDoc(item:selects){
              this.Reiniciar();
         this.generico.MetodoGenerico(item.chave, item.descricao, item.ordem).subscribe({
          next: (data) => {
            if (data.sucesso) {
              this.Tdoc = data.dados[0];
              if(this.Tdoc.movtz==true){
                this.visibilidadeFormasp=true;
              }
              else{
                this.visibilidadeFormasp=false;

              }
              this.cadastro.patchValue({
                numdoc : this.Tdoc.numdoc,
                nomedoc : this.Tdoc.descricao,
                codmovcc : this.Tdoc.codmovcc,
                descmovcc : this.Tdoc.descmovcc,
                sigla : this.Tdoc.sigla,
                codmovtz : this.Tdoc.codmovtz,
                descmovtz : this.Tdoc.descmovtz,
                // rcladiant : this.Tdoc.rcladiant,
                // tRclstamp : this.Tdoc.tRclstamp,
              });

              // if(this.Tdoc.ft==true || this.Tdoc.multa==true){
              //   this.isCheckboxDisabled=false;
              //   if(this.Tdoc.multa==true){
              //     this.isCheckbox=true;
              //   }
              // }else{
              //   this.isCheckboxDisabled=true;
              // }
              let ano = moment().format('YYYY');
              if(this.editando!=true){
                let item:selects={
                  chave: 'fact',
                  descricao: `${this.querry.querryMaxFtFccDiRcl('numero')}`,
                  ordem: `where isnumeric(numero) = 1 and tdocstamp='${this.Tdoc.tdocstamp}' and year(Data)='${ano}' `
                }
                this.generico.MetodoGenerico(item.chave, item.descricao, item.ordem).subscribe({
                  next: (data) => {
                    if (data.sucesso) {

                      this.cadastro.patchValue({
                        numero:data.dados[0].numero
                      })
                    }
                  }
                });
              }
            }
          }
        });
            }

           async Reiniciar(){
              this.itemsFactl.clear();
              this.itemsFpag.clear();
              this.dataListaturma= new MatTableDataSource(this.listaFactl);
              this.resetForm();
              await this.MetodoInicializacao();
              this.cadastro.patchValue({
                data: new Date(),
                dataven: new Date(),
                moeda:'MZN',
                moeda2:'',
                datapartida: new Date(),
                dataentrega: new Date(),
                ldata: new Date(),
              })
            }



       Setccu(item:selects){
           this.generico.MetodoGenerico(item.chave, item.descricao, item.ordem).subscribe({
            next: (data) => {
              if (data.sucesso) {
                this.Ccu = data.dados[0];

                this.myControlCcu.setValue(this.Ccu.descricao);

                this.cadastro.patchValue({
                  ccusto: this.Ccu.descricao,
                  ccustamp : this.Ccu.ccustamp
                });


              }
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
          this.optionslistaMoedasfilterrcambio =   this.optionslistaMoedasfilterr = data.dados.selects;
          this.myControlMoedas.setValue('MZN');
          this.filteredOptionsMoedas = this.myControlMoedas.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionslistaMoedasfilterr)  : this.optionslistaMoedasfilterr.slice();
            }),
          );


          this.filteredOptionsMoedascambio = this.myControlMoedascambio.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionslistaMoedasfilterrcambio)  : this.optionslistaMoedasfilterrcambio.slice();
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


  onSelectMoedas(value:selects,index:number) {
    this.cadastro.patchValue({
      Moeda: value.descricao,
      //ccustamp : this.Ccu.ccustamp
    });

    // this.moeda=value.descricao;
    // this.moeda=value.descricao;
  }

  onSelectMoedacambio(value:selects){

    this.cadastro.patchValue({
      Moeda: value.descricao,
      //ccustamp : this.Ccu.ccustamp
    });

  //   this.generico.MetodoGenerico(item.chave, item.descricao, item.ordem).subscribe({
  //    next: (data) => {
  //      if (data.sucesso) {
  //        this.Ccu = data.dados[0];

  //        this.myControlCcu.setValue(this.Ccu.descricao);

  //        this.cadastro.patchValue({
  //          ccusto: this.Ccu.descricao,
  //          ccustamp : this.Ccu.ccustamp
  //        });


  //      }
  //    }
  //  });
       }



   async getSt() {

    const se:condicoesprocura={
      tabela:"St",
    campo1: "descricao",
    campo2:"Referenc",
     condicao:"vazio"
    }
    this._loginservice.getselection(se).subscribe({
      next: (data) => {
        if (data.sucesso) {
          this.optionslistaStfilterr =   this.optionslistaStreffilterr = data.dados.selects;
          this.filteredOptionsSt = this.myControlSt.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.descricao;
              return name ? this._filter(name as string,this.optionslistaStfilterr)  : this.optionslistaStfilterr.slice();
            }),
          );
          this.filteredOptionsStref = this.myControlStref.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.ordem;
              return name ? this._filterREF(name as string,this.optionslistaStreffilterr)  : this.optionslistaStreffilterr.slice();
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

  SetProduto(item:selects,i:number){
    this.onSelectbi11(item, i)


       }

       onSelectbi11(item:selects,i:number) {
        this.removerlinhadeTotais();
         let langArr = (<FormArray>this.cadastro.get('factl'))
         langArr.controls[i].patchValue({

          ststamp:item.chave,
          ref :item.ordem,
          descricao :item.descricao,
               })

               let se:selects={
                chave: 'st left join stprecos stp on st.ststamp=stp.ststamp',
                descricao: ` top 1 st.*,stp.Preco,stp.PrecoCompra,stp.Ccustamp,stp.Moeda,stp.Ivainc`,
                ordem: `where st.ststamp='${item.chave}'`
              }
              let factl:Factl={
                factlstamp: '',
                factstamp: '',
                ststamp: '',
                entidadestamp: '',
                numdoc:  Number(0),
                sigla: '',
                ref: '',
                descricao: '',
                quant:  Number(0),
                unidade: '',
                armazem:  Number(0),
                preco:  Number(0),
                mpreco:  Number(0),
                tabiva:  Number(0),
                txiva:  Number(0),
                valival:  Number(0),
                mvalival:  Number(0),
                ivainc: false,
                activo: false,
                perdesc:  Number(0),
                descontol:  Number(0),
                mdescontol:  Number(0),
                subtotall:  Number(0),
                msubtotall:  Number(0),
                totall:  Number(0),
                mtotall:  Number(0),
                status: false,
                lote: '',
                servico: false,
                oristampl: '',
                dispon:  Number(0),
                qttOrig:  Number(0),
                nmovstk: false,
                oristamp: '',
                tit: false,
                ordem:  Number(0),
                stkprod: false,
                lineAnulado: false,
                titstamp: '',
                contatz:  Number(0),
                pack:  Number(0),
                cpoc:  Number(0),
                cpoo:  Number(0),
                composto: false,
                usalote: false,
                descarm: '',
                refornec: '',
                usaquant2: false,
                quant2:  Number(0),
                morada: '',
                telefone: '',
                entrega: false,
                dataentrega: '',
                pcontacto: '',
                email: '',
                pais: '',
                guias: '',
                contrato: '',
                gasoleo: false,
                cambiousd:  Number(0),
                moeda: '',
                moeda2: '',
                ccusto: '',
                codccu: '',
                obs: '',
                armazemstamp: ''
              }
               this.generico.MetodoGenerico(se.chave, se.descricao, se.ordem).subscribe({
                next: (data) => {
                  if (data.sucesso) {
                   let datas= data.dados[0];
                  let dr= this.generico.SetLineValues(datas, false, this.Tdoc.nc, this.cadastro.value.moeda,
                    this.cadastro.value.moeda2,
                    "",factl,"factl",this.Tdoc,this.Param);

                    try
                    {
                        if (Boolean(this.Cl.col23)==true)
                        {
                          let setr:selects={
                            chave: ' Clst',
                            descricao: ` top 1  Preco`,
                            ordem: `where referenc='${dr.ref}'`
                          }
                          this.generico.MetodoGenerico(setr.chave, setr.descricao, setr.ordem).subscribe({
                            next: (data) => {
                              if (data.sucesso) {
                                dr.preco = data.dados[0].preco;
                              }
                            }
                          });
                        }
                    }
                    catch
                    {
                        //throw;
                    }
                    if (this.Cl != null && this.Cl!=undefined)
                      {
                          if (Boolean(this.Cl.col24)==true)
                          {
                            //Lança a percentagem de desconto definida na ficha do cliente;
                              dr.perdesc = Number(this.Cl.col25);
                          }
                          if (Boolean(this.Cl.col26)==true)
                          {
                              //Quando o cliente está insento do IVA...
                              dr.tabiva = 0;
                              dr.txiva = 0;
                          }
                          if (Boolean(this.Cl.col26)==true)
                          {
                            dr.ivainc= true;
                          }
                      }

                      dr= this.generico.TotaisLinhas(dr,false,this.Param)


                   langArr.controls[i].patchValue({
                    factlstamp: dr.factlstamp,
                    factstamp: dr.factstamp,
                    ststamp: dr.ststamp,
                    entidadestamp: dr.entidadestamp,
                    numdoc: dr.numdoc,
                    sigla: dr.sigla,
                    ref: dr.ref,
                    descricao: dr.descricao,
                    quant: dr.quant,
                    unidade: dr.unidade,
                    armazem: dr.armazem,
                    preco: dr.preco,
                    mpreco: dr.mpreco,
                    tabiva: dr.tabiva,
                    txiva: dr.txiva,
                    valival: dr.valival,
                    mvalival: dr.mvalival,
                    ivainc: dr.ivainc,
                    activo: dr.activo,
                    perdesc: dr.perdesc,
                    descontol: dr.descontol,
                    mdescontol: dr.mdescontol,
                    subtotall: dr.subtotall,
                    msubtotall: dr.msubtotall,
                    totall: dr.totall,
                    mtotall: dr.mtotall,
                    status: dr.status,
                    lote: dr.lote,
                    servico: dr.servico,
                    oristampl: dr.oristampl,
                    dispon: dr.dispon,
                    qttOrig: dr.qttOrig,
                    nmovstk: dr.nmovstk,
                    oristamp: dr.oristamp,
                    tit: dr.tit,
                    ordem: dr.tit,
                    stkprod: dr.stkprod,
                    lineAnulado: dr.lineAnulado,
                    titstamp: dr.titstamp,
                    contatz: dr.contatz,
                    pack: dr.pack,
                    cpoc: dr.cpoc,
                    cpoo: dr.cpoo,
                    composto: dr.composto,
                    usalote: dr.usalote,
                    descarm: dr.descarm,
                    refornec: dr.refornec,
                    usaquant2: dr.usaquant2,
                    quant2: dr.quant2,
                    morada: dr.morada,
                    telefone: dr.telefone,
                    entrega: dr.entrega,
                    dataentrega: dr.dataentrega,
                    pcontacto: dr.pcontacto,
                    email: dr.email,
                    pais: dr.pais,
                    guias: dr.guias,
                    contrato: dr.contrato,
                    gasoleo: dr.gasoleo,
                    cambiousd: dr.cambiousd,
                    moeda: dr.moeda,
                    moeda2: dr.moeda2,
                    ccusto: dr.ccusto,
                    codccu: dr.codccu,
                    obs: dr.obs,
                    armazemstamp: dr.armazemstamp,
                         })
this.getSummary();


                  }
                }
              });

       }


       onKeyPressdesref($event: Event,number: number) {
let dr:Factl={
  factlstamp: '',
  factstamp: '',
  ststamp: '',
  entidadestamp: '',
  numdoc:  Number(0),
  sigla: '',
  ref: '',
  descricao: '',
  quant:  Number(0),
  unidade: '',
  armazem:  Number(0),
  preco:  Number(0),
  mpreco:  Number(0),
  tabiva:  Number(0),
  txiva:  Number(0),
  valival:  Number(0),
  mvalival:  Number(0),
  ivainc: false,
  activo: false,
  perdesc:  Number(0),
  descontol:  Number(0),
  mdescontol:  Number(0),
  subtotall:  Number(0),
  msubtotall:  Number(0),
  totall:  Number(0),
  mtotall:  Number(0),
  status: false,
  lote: '',
  servico: false,
  oristampl: '',
  dispon:  Number(0),
  qttOrig:  Number(0),
  nmovstk: false,
  oristamp: '',
  tit: false,
  ordem:  Number(0),
  stkprod: false,
  lineAnulado: false,
  titstamp: '',
  contatz:  Number(0),
  pack:  Number(0),
  cpoc:  Number(0),
  cpoo:  Number(0),
  composto: false,
  usalote: false,
  descarm: '',
  refornec: '',
  usaquant2: false,
  quant2:  Number(0),
  morada: '',
  telefone: '',
  entrega: false,
  dataentrega: '',
  pcontacto: '',
  email: '',
  pais: '',
  guias: '',
  contrato: '',
  gasoleo: false,
  cambiousd:  Number(0),
  moeda: '',
  moeda2: '',
  ccusto: '',
  codccu: '',
  obs: '',
  armazemstamp: ''
}

let id=($event.target as HTMLInputElement).id.replace(`-${number}`,'').toString().toLowerCase()
switch(id){
  case 'ref':
    dr.ref=($event.target as HTMLInputElement).value;
    dr.descricao=($event.target as HTMLInputElement).value;
let servicos : any = document.getElementById("descricao-"+number) as HTMLInputElement | null;
dr.descricao=servicos.value;
    break;
    case 'descricao':
      dr.descricao=($event.target as HTMLInputElement).value;

let servico : any = document.getElementById("ref-"+number) as HTMLInputElement | null;
dr.ref=servico.value;
      break;

}
let langArr = this.itemsFactl
        langArr.controls[number].patchValue(
          {
             ref: dr.ref,
             descricao: dr.descricao,
             servico: dr.servico,
             ststamp: dr.ststamp,
          }
        );


       }
      onKeyPress($event: Event,number: number) {
        this.removerlinhadeTotais();
        let langArr = this.itemsFactl;


        let arui=langArr.controls[number].value;
if(this.Tdoc.nc==true){
  if(arui.quant>0 ) {
    arui.quant=Number(arui.quant)*Number(-1);
  }
}


        let dr=  this.generico.TotaisLinhas(arui,false,this.Param) as Factl;
            langArr.controls[number].patchValue(
              {
                factlstamp: dr.factlstamp,
                factstamp: dr.factstamp,
               ststamp: dr.ststamp,
               entidadestamp: dr.entidadestamp,
                numdoc: dr.numdoc,
                sigla: dr.sigla,
                 ref: dr.ref,
                 descricao: dr.descricao,
                 quant: dr.quant,
                unidade: dr.unidade,
                armazem: dr.armazem,
                 preco: dr.preco,
                mpreco: dr.mpreco,
                tabiva: dr.tabiva,
                txiva: dr.txiva,
                valival: dr.valival,
                mvalival: dr.mvalival,
                ivainc: dr.ivainc,
                activo: dr.activo,
                perdesc: dr.perdesc,
                descontol: dr.descontol,
                mdescontol: dr.mdescontol,
                subtotall: dr.subtotall,
                msubtotall: dr.msubtotall,
                 totall: dr.totall,
                mtotall: dr.mtotall,
                status: dr.status,
                lote: dr.lote,
                 servico: dr.servico,
                oristampl: dr.oristampl,
                dispon: dr.dispon,
                qttOrig: dr.qttOrig,
                nmovstk: dr.nmovstk,
                oristamp: dr.oristamp,
                tit: dr.tit,
                ordem: dr.ordem,
                stkprod: dr.stkprod,
                lineAnulado: dr.lineAnulado,
                titstamp: dr.titstamp,
                contatz: dr.contatz,
                pack: dr.pack,
                cpoc: dr.cpoc,
                cpoo: dr.cpoo,
                composto: dr.composto,
                usalote: dr.usalote,
                descarm: dr.descarm,
                refornec: dr.refornec,
                usaquant2: dr.usaquant2,
                quant2: dr.quant2,
                morada: dr.morada,
                telefone: dr.telefone,
                entrega: dr.entrega,
                dataentrega: dr.dataentrega,
                pcontacto: dr.pcontacto,
                email: dr.email,
                pais: dr.pais,
                guias: dr.guias,
                contrato: dr.contrato,
                gasoleo: dr.gasoleo,
                cambiousd: dr.cambiousd,
                moeda: dr.moeda,
                moeda2: dr.moeda2,
                ccusto: dr.ccusto,
                codccu: dr.codccu,
                obs: dr.obs,
                armazemstamp: dr.armazemstamp,
              }
            );
            if(this.itemsFactl.length>0){
              if(this.itemsFpag.length==1){
                let eeee=this.itemsFactl.value.reduce((prev: number, next: { totall: number | number; }) => prev + +next.totall, 0);;

                let fp = this.itemsFpag
                fp.controls[0].patchValue(
          {
            valor:eeee,
          }
        );

      }


              }
              this.getSummary();
          }

          disableForm() {
            if(this.isFormDisabled()==true){

              this.valido1=true
              this.valido=true;
              this.cadastro.enable(); // Habilita todo o formulário

        this.icon="refresh"
        this.descricao='Cancelar'

            }else{

              this.valido1=false
              this.resetForm()
              this.cadastro.disable(); // Desabilita todo o formulário
              this.valido=false;

                this.icon="plus_one"

        this.descricao='Novo'
            }

          }

          Enableform(){
            this.valido=true;
            this.cadastro.enable(); // Habilita todo o formulário

            this.valido1=false
      this.icon="refresh"
      this.descricao='Cancelar'
          }
           ///////////////////////////////////////////////////////////////////////
      resetForm() {
        this.cadastro.reset();
       }
       isFormDisabled() {
        return this.cadastro.disabled; // Check if the form is disabled
      }

      removerlinhadeTotais(){

        let index= this.itemsFactl.controls.findIndex(control => control.get('descricao')?.value ==='TOTAIS' );
        if(index>0){
    this.itemsFactl.removeAt(index)
  }
      }

      getSummary() {
    this.removerlinhadeTotais();
        let ft=this.itemsFactl;


        let total=ft.value.reduce((prev: number, next: { totall: number | number; }) => prev + +next.totall, 0);
        let sutotal=ft.value.reduce((prev: number, next: { subtotall: number | number; }) => prev + +next.subtotall, 0);;
        let desconto=ft.value.reduce((prev: number, next: { descontol: number | number; }) => prev + +next.descontol, 0);;
        let iva=ft.value.reduce((prev: number, next: { valival: number | number; }) => prev + +next.valival, 0);;

           const factlGroup = this.fb.group({
            factlstamp: '',
            factstamp: '',
            ststamp: '',
            entidadestamp: '',
            numdoc:  Number(0),
            sigla: '',
            ref: '',
            descricao: 'TOTAIS',
            quant:  Number(0),
            unidade: '',
            armazem:  Number(0),
            preco:  Number(0),
            mpreco:  Number(0),
            tabiva:  Number(0),
            txiva:  Number(0),
            valival: iva,
            mvalival:  Number(0),
            ivainc: false,
            activo: false,
            perdesc:  Number(0),
            descontol: desconto,
            mdescontol:  Number(0),
            subtotall: sutotal,
            msubtotall:  Number(0),
            totall: total,
            mtotall:  Number(0),
            status: false,
            lote: '',
            servico: false,
            oristampl: '',
            dispon:  Number(0),
            qttOrig:  Number(0),
            nmovstk: false,
            oristamp: '',
            tit: false,
            ordem:  Number(0),
            stkprod: false,
            lineAnulado: false,
            titstamp: '',
            contatz:  Number(0),
            pack:  Number(0),
            cpoc:  Number(0),
            cpoo:  Number(0),
            composto: false,
            usalote: false,
            descarm: '',
            refornec: '',
            usaquant2: false,
            quant2:  Number(0),
            morada: '',
            telefone: '',
            entrega: false,
            dataentrega: '',
            pcontacto: '',
            email: '',
            pais: '',
            guias: '',
            contrato: '',
            gasoleo: false,
            cambiousd:  Number(0),
            moeda: '',
            moeda2: '',
            ccusto: '',
            codccu: '',
            obs: '',
            armazemstamp: '',
        });
        this.itemsFactl.push(factlGroup);
        this.cadastro.patchValue({
          total:total,
          subtotal:sutotal,
          totaliva:iva,
          desconto:desconto,
        })

        let index= this.itemsFactl.controls.findIndex(control => control.get('descricao')?.value ==='TOTAIS' );
        if(index>0){
        const item = this.itemsFactl.at(index) as FormGroup;
        //const item = this.itemsFactl.at(index) as FormGroup;
    item.get('ref')?.disable();
    item.get('descricao')?.disable();
    item.get('quant')?.disable();
    item.get('preco')?.disable();
    item.get('servico')?.disable();

    this.setOpacity(index, 'ref');
    this.setOpacity(index, 'descricao');
    this.setOpacity(index, 'quant');
    this.setOpacity(index, 'preco');
    this.setOpacity(index, 'servico');

    this.isQuantityZero(index);
  }
     
  }

  setOpacity(index: number, controlName: string) {
    const element = document.getElementById(`${controlName}-${index}`);
    if (element) {
      this.renderer.setStyle(element, 'display', 'none');
    }

      }
      isQuantityZero(index: number): boolean {
        const item = this.itemsFactl.at(index) as FormGroup;
        const quantity = item.get('descricao')?.value;
        return quantity == 'TOTAIS';
      }

      BeforeSave()
        {



            if (this.Tdoc.ft || this.Tdoc.nd || this.Tdoc.nc || this.Tdoc.vd)
            {
                if (this.Param.usacademia)
                {
                    if(this.cadastro.value.turmastamp.length==0){
                      Swal.fire('Não permitido!', 'A Turma não pode estar vazio, veja na página ACADEMIA!', 'error');
                      return;
                    }
                    if(this.cadastro.value.cursostamp.length==0){
                      Swal.fire('Não permitido!', 'O curso não pode estar vazio, veja na página ACADEMIA!', 'error')
                      return;
                    }
                }


            }
            if (this.Tdoc.ft || this.Tdoc.nd || this.Tdoc.nc)
            {

                if(this.Cl.prontopag)
                {
                  Swal.fire('Não permitido!', `${this.Cl.nome}\r\nÉ um cliente pronto pagamento só pode emitir uma VD apenas!`, 'error')

                  return

                }
            }

            //if (!gridUIFt1.VerificaLote())
            //{
            //    return false;
            //}
           // #region Verifica se o valor da nota de credito é negativo--deve ser negativo
            if (this.Tdoc.nc)
            {
                if (this.calculationtotalpago()>= 0)
                {
                  Swal.fire('Não permitido!', `A Nota de crédito deve ter valores negativos, verifique`, 'error')

                    return ;
                }
                if (this.Tdoc.ncobrigadoc)
                {

                  if(this.cadastro.value.oristamp.length==0){

                    Swal.fire('Não permitido!', `A Nota de crédito obriga a indicação do documento a regularizar!`, 'error')

                  }
                  return ;

                }
                // if (_ft.Campo2.ToDecimal() < (-1 * tbTotal.tb1.Text.ToDecimal()))
                // {
                //     MsBox.Show($"O valor da Nota de crédito não pode ser superior que o valor do documento que esta a regularizar!\r\n Valor do documento {_ft.Campo2}");
                //     return false;
                // }
            }

           // #region Actualiza o Stamp do cl nas linhas
            if (this.Tdoc.movstk)
            {





              this.itemsFactl.controls= this.generico.UpdateLinhas(this.itemsFactl.controls, this.cadastro.value.cursostamp);
                var ret = this.generico.CheckStstamp(this.itemsFactl.controls);
                if (Boolean(ret[0])==true)
                {
                    Swal.fire('Não permitido!', `${ret[1]}`, 'error');
                    return ;
                }
            }

           // #region Verifica se a factura é fazia ou igual a zero ou nao
            if (this.Tdoc.ft || this.Tdoc.vd)
            {
                if (this.calculationtotalpago() <= 0)
                {
                  Swal.fire('Não permitido!', `Os Documentos: \r\nFactura\r\nVenda a Dinheiro\r\nNota de crédito\r\nNota de débito\r\nNão podem gravar com valor zero`, 'error');
                    return;
                }
            }
            //#endregion

            //#region Verifica alteracao da descricao do produto
            var facturado = this.itemsFactl.controls;
            if (facturado.length>0)
            {
          //     let turmadis=this.itemsFactl.controls
          //     for (let i = 0; i < turmadis.length; i++) {
          // let factl:Factl={
          //   factlstamp: turmadis[i].value.factlstamp,



                // foreach (var row in facturado.AsEnumerable())
                // {
                //     if (row == null) continue;
                //     if (row.RowState == DataRowState.Deleted) continue;
                //     if (row["servico"].ToBool()) continue;

                //     var st = SQL.GetGen2DT($"select referenc,descricao from st where ststamp='{row["ststamp"].ToString().Trim()}'");
                //     if (!(st?.Rows.Count > 0)) continue;
                //     var xx = st.Rows[0]["descricao"].ToString().Trim();
                //     if (xx.Equals(row["descricao"].ToString().Trim())) continue;
                //     MsBox.Show(Messagem.ParteInicial() + " Não pode alterar a descrição do produto!\r\nAlteração feita:" +
                //                $"\r\n{xx}\r\nPara:\r\n{row["descricao"].ToString().Trim()}");
                //     return false;
                // }
            }

            //
            if (this.Procurou)
            {
                if (!this.Tdoc.descricao.toLowerCase().includes("cotação"))
                {
                    var xx = this.CheckMovimentos("actualizar");
                    if (xx[0]==true) return ;
                }
            }
            if (!this.Procurou)
            {
                if (this.Tdoc.ft || this.Tdoc.vd)
                {
                    // if (_cliente.Ctrlplanfond)
                    // {
                    //     var valor = _cliente.Saldo + tbTotal.tb1.Text.ToDecimal();
                    //     if (_cliente.Plafond < valor)
                    //     {
                    //         MsBox.Show($"O Valor do documento e o saldo do cliente ({valor}) é superior que o seu Plafond ({_cliente.Plafond}).\r\nNão pode gravar atingiu o limite!");
                    //         return false;
                    //     }
                    // }
                }
            }
            // if (dtFact.dt1.Value.Year > Pbl.SqlDate.Year)
            // {
            //     MsBox.Show(Messagem.ParteInicial() + $"O ano do documento não pode ser superior que: {Pbl.SqlDate.Year}!");
            //     return false;
            // }
           // #region Verificação de Stock dos produtos a serem facturados
            // if (!TmpTdoc.Nc)
            // {
            //     var values = GenBl.CheckStock(_ft, gridUIFt1.DsDt, TmpTdoc.Usalote);
            //     if (!values.StkExiste)
            //     {
            //         MsBox.Show(values.Messagem);
            //         return false;
            //     }
            // }
           // #endregion
            // if (TmpTdoc.Ft || TmpTdoc.Vd)
            // {
            //     if (Pbl.Param.Perlucro > 0)
            //     {
            //         foreach (var r in gridUIFt1.DsDt.AsEnumerable())
            //         {
            //             if (r["servico"].ToBool()) continue;
            //             var valcompra = SQL.GetValue("PrecoCompra", "stprecos", $"ststamp=(select ststamp from st where referenc='{r["ref"].ToString().Trim()}')").ToDecimal();
            //             var valorvenda = valcompra + valcompra * this.Param.perlucro / 100;
            //             if (r["preco"].ToDecimal() >= valorvenda) continue;
            //             MsBox.Show($"Desculpa o valor de venda esta abaixo de percentagem minima de Lucro({Pbl.Param.Perlucro}).\r\n O ideal é {valorvenda}!..");
            //             return false;
            //         }
            //     }
            // }
            // if (TmpTdoc.Nc)
            // {
            //     if (string.IsNullOrEmpty(tbMotivo.tb1.Text))
            //     {
            //         MsBox.Show(Messagem.ParteInicial() + $"Deve indicar o motivo de anulação ou Retificação da {TmpTdoc.Descricao}");
            //         return false;
            //     }
            //     if (TmpTdoc.Ncobrigadoc)
            //     {
            //         if (string.IsNullOrEmpty(_ft.Oristamp))
            //         {
            //             MsBox.Show(Messagem.ParteInicial() + "Deve indicar o documento que pretende de anular ou Retificar a Nota de Crédito obriga!");
            //             return false;
            //         }
            //     }
            // }
            // if (gridFormasP1.Formaspdt?.Rows.Count > 0)
            // {
            //     (bool Correcto, string Messagem) vals;
            //     if (ucMoeda.tb1.Text.ToLower().Equals(Pbl.MoedaBase.ToLower().Trim()))
            //     {
            //         vals = GenBl.CheckTesoura(gridFormasP1.Formaspdt, tbTotal.tb1.Text.ToDecimal(), _ft.Movtz);
            //     }
            //     else
            //     {
            //         vals = GenBl.CheckTesoura(gridFormasP1.Formaspdt, tbtotalMoeda.tb1.Text.ToDecimal(), _ft.Movtz);
            //     }
            //     if (!vals.Correcto)
            //     {
            //         if (vals.Messagem.Contains("tipo de movimento"))
            //         {
            //             MsBox.Show($"{vals.Messagem} na página de pagamentos");
            //             tabControl1.SelectTab(tabPage2);
            //             return false;
            //         }

            //         MsBox.Show(vals.Messagem);
            //         return false;
            //     }
            // }
            return ;
        }
        CheckMovimentos(mensagem:string):[boolean, Number]
        {
          let ttt=false;
            mensagem +=` a ${this.Tdoc.descricao}!` ;
            if (this.Tdoc.ft || this.Tdoc.nd || this.Tdoc.nc)
            {
              let item:selects={
                chave: 'rcll',
                descricao:` Ccstamp`,
                ordem: `where Ccstamp='${this.clstampvliw}' and Anulado=0`
              }
              this.generico.MetodoGenerico(item.chave, item.descricao, item.ordem).subscribe({
                    next: (data) => {
                      if (data.sucesso) {
                        if(data.dados.length>0){
                          Swal.fire('Não permitido!', `${this.generico.ParteInicial()} Não se pode ${mensagem} a ${this.Tdoc.descricao}!. Existe(m) documento(s) de regularização (Recibo ou Nota de crédito) emitido(s)!`, 'error');
                          ttt=true;
                        }
                        }
                    },
                    error: (e) => {
                    }
                  });
            }
             return [ttt,0];
        }
    }



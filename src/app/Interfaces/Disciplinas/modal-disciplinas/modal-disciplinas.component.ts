



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

import Swal from 'sweetalert2';
import { dmzview } from '../../Grade/dmzview';
import { gradel } from '../../Grade/gradel';
import { st } from '../st';
import { stl } from '../stl';
import { Disciplinasservices } from '../disciplinasservices';
import { stb } from '../stb';
import { stPrecos } from '../stPrecos';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Matriculaservice } from 'src/app/Portal-da-Secretaria/MatriculaAluno/matriculaservice';
import { turmadisc } from 'src/app/Turmas/todastabelasturma';

@Component({
  selector: 'app-modal-disciplinas',
  templateUrl: './modal-disciplinas.component.html',
  styleUrls: ['./modal-disciplinas.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => 'lingua'),
      multi: true,
    }

  ]
})
export class ModalDisciplinasComponent implements OnInit {
  //


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
  isSpinnerDisplayed=false








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

myControlAreaacademica = new FormControl<string | selects>('');
optionsAreaacademica: selects[] = [];
filteredOptionsAreaacademica!: Observable<selects[]>;

//@ViewChild('listaescrita ') listaescrita !: MatSelect;
myControlDisciplinaPrece = new FormControl<string | selects>('');
optionsDisciplinaprec: selects[] = [];
filteredOptionsDisciplinaprec!: Observable<selects[]>;

myControlTabIva = new FormControl<string | selects>('');
optionsTabIva: selects[] = [];
filteredOptionsTabIva!: Observable<selects[]>;



myControlsubAreaacademica = new FormControl<string | selects>('');
optionssubAreaacademica: selects[] = [];
filteredOptionssubAreaacademica!: Observable<selects[]>;
areaacademica:string='';
areaacademicastamp:string='';

subareaacademica:string='';
subareaacademicastamp:string='';

onChange(enable: boolean) {
  const field = this.cadastro.get('text');
  if (enable) {
    field?.enable();
  } else {
    field?.disable();
  }
}
onChange1(enable: boolean) {

}

toggle1(event: MatSlideToggleChange) {
  if(event.checked==true)
  {
    this.dadosestudantes.tipo='1';
  }else{
    this.dadosestudantes.tipo='0';
  }
  this.cadastro.value.tipo2=false;
}
toggle2(event: MatSlideToggleChange) {
  if(event.checked==true)
  {
    this.dadosestudantes.tipo='2';
  }else{

    this.dadosestudantes.tipo='0';
  }
  this.cadastro.value.tipo1=false;
}

SetsubAreaacademica(item:selects){
  this.subareaacademica=item.descricao;
  this.subareaacademicastamp=item.chave;}
SetAreaacademica(item:selects){
  this.areaacademica=item.descricao;
  this.areaacademicastamp=item.chave;
  const se:condicoesprocura={
    tabela:"Subgrupo",
  campo1: "descricao",
  campo2:"codigo",
  condicao:`Grupostamp='${item.chave}'`
  }
  this._loginservice.getselectionPost(se).subscribe({
    next: (data) => {
      if (data.sucesso) {
        this.optionssubAreaacademica = data.dados.selects;
        this.filteredOptionssubAreaacademica = this.myControlsubAreaacademica.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.descricao;
            return name ? this._filter(name as string,this.optionssubAreaacademica) : this.optionssubAreaacademica.slice();
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
async GetAreaacademica(){
  const se:condicoesprocura={
    tabela:"grupo",
  campo1: "descricao",
  campo2:"codigo",
   condicao:"vazio"
  }
  this._loginservice.getselectionPost(se).subscribe({
    next: (data) => {
      if (data.sucesso) {
        this.optionsAreaacademica = data.dados.selects;
        this.filteredOptionsAreaacademica = this.myControlAreaacademica.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.descricao;
            return name ? this._filter(name as string,this.optionsAreaacademica) : this.optionsAreaacademica.slice();
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


async GetTabIva(){

  const se:condicoesprocura={
    tabela:"auxiliar",
  campo1: "descricao",
  campo2:"codigo",
   condicao:"tabela=5"
  }
  this._loginservice.getselectionPost(se).subscribe({
    next: (data) => {
      if (data.sucesso) {
        this.optionsTabIva = data.dados.selects;
        if(this.optionsTabIva.length>1){
          this.myControlTabIva.setValue(this.optionsTabIva[2].descricao)
        }
        this.filteredOptionsTabIva = this.myControlTabIva.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.descricao;
            return name ? this._filter(name as string,this.optionsTabIva) : this.optionsTabIva.slice();
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


myControlccu = new FormControl<string | selects>('');
optionsccu: selects[] = [];
filteredOptionsccu!: Observable<selects[]>;
async  getCcusto() {
  //Ccustamp,Descricao,codccu
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
            return name ? this._filter(name as string,this.optionsccu) : this.optionsccu.slice();
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
SettabIva(item:selects){
  this.txiva=item.descricao;
  this.tabiva=item.ordem;
  this.cadastro.patchValue({tabiva:item.ordem,
    txiva:item.descricao
  })

    }
    Setmoeda(item:selects,i:number){
      this.moeda=item.descricao;
      this.moedastamp=item.chave;
      let langArr = (<FormArray>this.cadastro.get('stPrecos'));
      langArr.controls[i].patchValue(
        {
          moeda:item.descricao,
        }
      );

        }



        SetStl(item:selects,i:number){
   
          let langArr = (<FormArray>this.cadastro.get('stl'));
          langArr.controls[i].patchValue(
            {
              moeda:item.descricao,
            }
          );
    
            }


        Setccu(item:selects,i:number){
          this.ccu=item.descricao;
          this.ccustamp=item.chave;

          let langArr = (<FormArray>this.cadastro.get('stPrecos'));
          langArr.controls[i].patchValue(
            {
              cCusto:item.descricao,

       codCCu :item.ordem,
       ccustamp :item.chave,
            }
          );


            }

        moeda:string='';
        moedastamp:string='';


        ccu:string='';
        ccustamp:string='';

    txiva:string='';
    tabiva:string='';




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




CarregarstPrecos(afam: stPrecos[]) {
  this.visibilidadestprecos=true;
  const formArray = this.cadastro.get('stPrecos') as FormArray;
  afam.map(item => {
    formArray.push(this.addstPrecos(item));
  });
}

addstPrecos(item: stPrecos): any {

  return this.fb.group({
    stPrecostamp :[item.stPrecostamp],
    ststamp :[item.ststamp],
    moeda :[item.moeda],
    cCusto :[item.cCusto],
    codCCu :[item.codCCu],
    ccustamp :[item.ccustamp],
    ivainc :[item.ivainc],
    padrao :[item.padrao],
    preco :[item.preco],
    preco1 :[item.preco1],
    preco2 :[item.preco2],
    preco3 :[item.preco3],
    preco4 :[item.preco4],
    preco5 :[item.preco5],
    preco6 :[item.preco6],
    preco7 :[item.preco7],
    precoCompra :[item.precoCompra],
    perc :[item.perc],
  })


  }



Carregarstb(afam: stb[]) {
  this.visibilidadebibliografia=true;
  const formArray = this.cadastro.get('stb') as FormArray;
  afam.map(item => {
    formArray.push(this.addstb(item));
  });
}

addstb(item: stb): any {


  return this.fb.group({
    stbstamp:[item.stbstamp],
    ststamp:[item.ststamp],
    descricao:[item.descricao]
  })


  }

cldocumentos = new FormArray([]);
disciplinades:string='';
CarregarStl(afam: stl[]) {
  this.visibilidadestl=true;
  const formArray = this.cadastro.get('stl') as FormArray;
  afam.map(item => {
    formArray.push(this.addStl(item));
  });
}
addStl(item: stl): any {

  return this.fb.group({
    stlstamp:[item.stlstamp],
    ststamp:[item.ststamp],
    codigo:[item.codigo],
    descricao:[item.descricao]
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
       private modalActual: MatDialogRef<ModalDisciplinasComponent>,
       @Inject(MAT_DIALOG_DATA) public dadosestudantes: st,
       private _estudanteService: Disciplinasservices,
       private _matriculaService: Matriculaservice,
    ){

      if(this.dadosestudantes.descricao!=''){

        this.titloAccao=`Nova Disciplina`;
        this.botaoAccao=`Cadastrar`;
      }else{

        this.titloAccao=`Editar Ano lectivo`;
        this.botaoAccao=`Actualizar`;
      }
      this.cadastro = this.fb.group({
        ststamp:[''],
        referenc:['DISC',],
        obs:[''],
        refornec:[''],
        tipo:[''],//Bar; Cozinha; Restaurant,Extras
        codigoBarras:[''],
        status:[''],
        unidade:[''],
        descricao:['', [Validators.required]],
        servico:[false],
       tabiva:[0],
       txiva:[0],
       valor:[0],
        ivainc:[false],
        codfam:[''],
        familia:[''],
        codsubfam:[''],
        subfamilia:[''],
        codarm:[''],
        armazem:[''],
       codmarca:[0],
        marca:[''],
        matricula:[''],
        modelo:[''],
        motor:[''],
        chassis:[''],
       anofab:[0],
       tara:[0],//Usado como Nivel Académico NO MÓDULO ACADEMIA//1=Licenciatura//2=Mestrado
       pesobruto:[0],
        combustivel:[false],
        tipoCombustivel:[''],
       codfab:[0],
        fabricante:[''],
        negativo:[false],
        viatura:[false],
        avisanegativo:[false],
        descontinuado:[false],
        ligaprojecto:[false],
        composto:[false],
       stock:[0],
       ultimopreco:[0],
       precoponderado:[0],
       codtrailer:[0],
        trailer:[false],
       //Novos campos
        usaconvunid:[false],//Usa conversão de unidades
       quantidade:[0],//Quantidade de conversao
        unidsaida:[''],//Unidade de saida
        usadoprod:[false],//Usado na Producao
        dimensao:[false],//Artigo com dimencoes
        devolc:[false],//Sujeito a Devolucao
        usaserie:[false],//Usa Series
       stockmin:[0],
       stockmax:[0],
       reserva:[0],
       encomenda:[0],
        nmovstk:[false],
        pos:[false],
        motorista:[''],
        departanto:[''],
        ccusto:[''],
       cilindrada:[0],
        companhia:[''],
        contrato:[''],
       inicio:[new Date()],
       termino:[new Date()],
       valorLeasing:[0],
       mensalidade:[0],
       //Fim de Leasing
        bloqueado:[false],
       assentos:[0],
       portas:[0],
       data:[new Date()],
        trailref:[''],
        traildesc:[''],
       anomodelo:[0],
       eixos:[0],
       pneus:[0],
       carga:[0],
       vendido:[0],
       comprado:[0],
        obterpeso:[false],
       peso:[0],
       volume:[0],
        usalote:[false],
        ivametade:[false], //IVA Metade
       //Contabilidade
        cpoc:[''], //Codigo de Integracao para vendas e Compras
        contaInv:[''], //Conta de Inventario
        contaCev:[''], //CEV -Conta de Existencias Vendidas
        contaReo:[''], //Conta de REO
        contaCoi:[''], //Conta de COI
        nofrota:[''],
        cor:[''],
        gasoleo:[false],
        naovisisvel:[false], //Permite que o produto nao seja visivel na facturacao
       //Imobilizado.........
        activo:[false],
       tipoartigo:[0],//se é:1-Produto,2-Servico, 3-Viatura, 4-Activo

       quantvenda:[0],
       //Fim de imobilizado
       usaquant2:[false],//Utiliza quantidade 2 nas vendas casos de bedidas a pressao


        disciplina:[false],
        sigla:[''],

       credac:[0],//Credito Academico

       cargahtotal:[0],//Somatorio de teorica e pratica

       cargahteorica:[0],//Carga Horaria Teorica

       cargahpratica:[0],//Carga Horaria Pratica
        Prec:[false],//Indica se a disciplina tem precedencia
        multa:[false],
        bilhete:[false],
        bilheteespecial:[false],
       tipoProduto:[0],
       stl:this.fb.array([]),//Disciplinas de precedencia
       stb:this.fb.array([]),//Bibliografia recomendada
        stPrecos:this.fb.array([]),
        tipo1:[false],
        tipo2:[false],

    })
    }

    nos:string='';





   async ngOnInit() {
  await  this.Getstatuss();
  await  this.GetAreaacademica();
  await this.getCcusto();
  await this.getmoedas();
  await  this.GetTabIva();
  await this.Disciplina();


     if (this.dadosestudantes != null && this.dadosestudantes.ststamp.length>0) {


      this.cadastro.patchValue({
        ststamp:this.dadosestudantes.ststamp,
        referenc:this.dadosestudantes.referenc,
        obs:this.dadosestudantes.obs,
        refornec:this.dadosestudantes.refornec,
        tipo:this.dadosestudantes.tipo,//Bar; Cozinha; Restaurant,Extras
        codigoBarras:this.dadosestudantes.codigoBarras,
        status:this.dadosestudantes.status,
        unidade:this.dadosestudantes.unidade,
        descricao:this.dadosestudantes.descricao,
        servico:this.dadosestudantes.servico,
        tabiva:this.dadosestudantes.tabiva,
        txiva:this.dadosestudantes.txiva,
        valor:this.dadosestudantes.valor,
        ivainc:this.dadosestudantes.ivainc,
        codfam:this.dadosestudantes.codfam,
        familia:this.dadosestudantes.familia,
        codsubfam:this.dadosestudantes.codsubfam,
        subfamilia:this.dadosestudantes.subfamilia,
        codarm:this.dadosestudantes.codarm,
        armazem:this.dadosestudantes.armazem,
        codmarca:this.dadosestudantes.codmarca,
        marca:this.dadosestudantes.marca,
        matricula:this.dadosestudantes.matricula,
        modelo:this.dadosestudantes.modelo,
        motor:this.dadosestudantes.motor,
        chassis:this.dadosestudantes.chassis,
        anofab:this.dadosestudantes.anofab,
        tara:this.dadosestudantes.tara,//Usado como Nivel Académico NO MÓDULO ACADEMIA//1=Licenciatura//2=Mestrado
        pesobruto:this.dadosestudantes.pesobruto,
        combustivel:this.dadosestudantes.combustivel,
        tipoCombustivel:this.dadosestudantes.tipoCombustivel,
        codfab:this.dadosestudantes.codfab,
        fabricante:this.dadosestudantes.fabricante,
        negativo:this.dadosestudantes.negativo,
        viatura:this.dadosestudantes.viatura,
        avisanegativo:this.dadosestudantes.avisanegativo,
        descontinuado:this.dadosestudantes.descontinuado,
        ligaprojecto:this.dadosestudantes.ligaprojecto,
        composto:this.dadosestudantes.composto,
        stock:this.dadosestudantes.stock,
        ultimopreco:this.dadosestudantes.ultimopreco,
        precoponderado:this.dadosestudantes.precoponderado,
        codtrailer:this.dadosestudantes.codtrailer,
        trailer:this.dadosestudantes.trailer,
        usaconvunid:this.dadosestudantes.usaconvunid,//Usa conversão de unidades
        quantidade:this.dadosestudantes.quantidade,//Quantidade de conversao
        unidsaida:this.dadosestudantes.unidsaida,//Unidade de saida
        usadoprod:this.dadosestudantes.usadoprod,//Usado na Producao
        dimensao:this.dadosestudantes.dimensao,//Artigo com dimencoes
        devolc:this.dadosestudantes.devolc,//Sujeito a Devolucao
        usaserie:this.dadosestudantes.usaserie,//Usa Series
        stockmin:this.dadosestudantes.stockmin,
        stockmax:this.dadosestudantes.stockmax,
        reserva:this.dadosestudantes.reserva,
        encomenda:this.dadosestudantes.encomenda,
        nmovstk:this.dadosestudantes.nmovstk,
        pos:this.dadosestudantes.pos,
        motorista:this.dadosestudantes.motorista,
        departanto:this.dadosestudantes.departanto,
        ccusto:this.dadosestudantes.ccusto,
        cilindrada:this.dadosestudantes.cilindrada,
        companhia:this.dadosestudantes.companhia,
        contrato:this.dadosestudantes.contrato,
        inicio:this.dadosestudantes.inicio,
        termino:this.dadosestudantes.termino,
        valorLeasing:this.dadosestudantes.valorLeasing,
        mensalidade:this.dadosestudantes.mensalidade,
        bloqueado:this.dadosestudantes.bloqueado,
        assentos:this.dadosestudantes.assentos,
        portas:this.dadosestudantes.portas,
        data:this.dadosestudantes.data,
        trailref:this.dadosestudantes.trailref,
        traildesc:this.dadosestudantes.traildesc,
        anomodelo:this.dadosestudantes.anomodelo,
        eixos:this.dadosestudantes.eixos,
        pneus:this.dadosestudantes.pneus,
        carga:this.dadosestudantes.carga,
        vendido:this.dadosestudantes.vendido,
        comprado:this.dadosestudantes.comprado,
        obterpeso:this.dadosestudantes.obterpeso,
        peso:this.dadosestudantes.peso,
        volume:this.dadosestudantes.volume,
        usalote:this.dadosestudantes.usalote,
        ivametade:this.dadosestudantes.ivametade, //IVA Metade
        cpoc:this.dadosestudantes.cpoc, //Codigo de Integracao para vendas e Compras
        contaInv:this.dadosestudantes.contaInv, //Conta de Inventario
        contaCev:this.dadosestudantes.contaCev, //CEV -Conta de Existencias Vendidas
        contaReo:this.dadosestudantes.contaReo, //Conta de REO
        contaCoi:this.dadosestudantes.contaCoi, //Conta de COI
        nofrota:this.dadosestudantes.nofrota,
        cor:this.dadosestudantes.cor,
        gasoleo:this.dadosestudantes.gasoleo,
        naovisisvel:this.dadosestudantes.naovisisvel, //Permite que o produto nao seja visivel na facturacao
        activo:this.dadosestudantes.activo,
        tipoartigo:this.dadosestudantes.tipoartigo,//se é:1-Produto,2-Servico, 3-Viatura, 4-Activo
        quantvenda:this.dadosestudantes.quantvenda,
        usaquant2:this.dadosestudantes.usaquant2,//Utiliza quantidade 2 nas vendas casos de bedidas a pressao
        disciplina:this.dadosestudantes.disciplina,
        sigla:this.dadosestudantes.sigla,
       credac:this.dadosestudantes.credac,//Credito Academico
       cargahtotal:this.dadosestudantes.cargahtotal,//Somatorio de teorica e pratica
       cargahteorica:this.dadosestudantes.cargahteorica,//Carga Horaria Teorica
       cargahpratica:this.dadosestudantes.cargahpratica,//Carga Horaria Pratica
        Prec:this.dadosestudantes.prec,//Indica se a disciplina tem precedencia
       stl:this.dadosestudantes.stl,//Disciplinas de precedencia
       stb:this.dadosestudantes.stb,//Bibliografia recomendada
       stPrecos:this.dadosestudantes.stPrecos,
        multa:this.dadosestudantes.multa,
        bilhete:this.dadosestudantes.bilhete,
        bilheteespecial:this.dadosestudantes.bilheteespecial,
       tipoProduto:this.dadosestudantes.tipoProduto,
      });
      if(this.dadosestudantes.ststamp!=''){
        this.clstampvliw=this.dadosestudantes.ststamp;
      }else{
        this.clstampvliw=this.turmanotaservice.Stamp();
      }
if  (this.dadosestudantes.stl.length>0){

  this.CarregarStl(this.dadosestudantes.stl);
}
if  (this.dadosestudantes.stb.length>0){

  this.Carregarstb(this.dadosestudantes.stb);
}

if  (this.dadosestudantes.stPrecos.length>0){

  this.CarregarstPrecos(this.dadosestudantes.stPrecos);
}

this.myControlTabIva.setValue(this.dadosestudantes.tabiva.toString())

//this.myControlAreaacademica.setValue(this.dadosestudantes.ar)
}
if(this.dadosestudantes.ststamp.length>0){
  this.titloAccao = "Editar Disciplina";
  this.botaoAccao = "Actualizar";

}
else{
  this.clstampvliw=this.turmanotaservice.Stamp();
  this.titloAccao = "Nova Disciplina";
  this.botaoAccao = "Salvar";

  this.cadastro.patchValue({ststamp:this.clstampvliw})
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

// let langArr = (<FormArray>this.cadastro.get('formasp'));
//     langArr.controls[i].patchValue(
//       {
//         contatesoura: value.contas,
//         codtz: value.codigo,
//         banco: value.sigla,
//         contasstamp: value.contasstamp,
//       }
//     );


Cadastrar( )
{
let verifica=false;
  let con:selects={
    chave: 'st',
    descricao: 'referenc',
    ordem:`ststamp='${this.cadastro.value.ststamp}'`
  }
  this._matriculaService.CheckExist(con).subscribe({
    next: (data) => {
      if (data.sucesso) {
        con.ordem= `referenc='${this.cadastro.value.referenc}' and ststamp<>'${this.cadastro.value.ststamp}'`
        this._matriculaService.CheckExist(con).subscribe({
          next: (data) => {
            if (data.sucesso) {
           Swal.fire('Erro!', `O código da disciplina já existe, deve trocar `, 'error');
           verifica=data.sucesso;
            }
          }
        });
      }else{
        con.ordem= `referenc='${this.cadastro.value.referenc}'`
        this._matriculaService.CheckExist(con).subscribe({
          next: (data) => {
            if (data.sucesso) {
           Swal.fire('Erro!', `O código da disciplina já existe, deve trocar `, 'error');
           verifica=data.sucesso;
            }
          }
        });
      }
    }
  });

  if(verifica){
    return;
  }
const cl:st={
  ststamp:  this.cadastro.value.ststamp,
  referenc: this.cadastro.value.referenc,
  obs:  this.cadastro.value.obs,
  refornec:  this.cadastro.value.refornec,
  tipo:  this.cadastro.value.tipo,
  codigoBarras: this.cadastro.value.codigoBarras,
  status:  this.cadastro.value.status,
  unidade: this.cadastro.value.unidade,
  descricao:  this.cadastro.value.descricao,
  servico:  this.cadastro.value.servico,
  tabiva: this.cadastro.value.tabiva,
  txiva: this.cadastro.value.txiva,
  valor: this.cadastro.value.valor,
  ivainc: this.cadastro.value.ivainc,
  codfam: this.cadastro.value.codfam,
  familia: this.cadastro.value.familia,
  codsubfam: this.cadastro.value.codsubfam,
  subfamilia: this.cadastro.value.subfamilia,
  codarm: this.cadastro.value.codarm,
  armazem: this.cadastro.value.armazem,
  codmarca: this.cadastro.value.codmarca,
  marca: this.cadastro.value.marca,
  matricula: this.cadastro.value.matricula,
  modelo: this.cadastro.value.modelo,
  motor: this.cadastro.value.motor,
  chassis: this.cadastro.value.chassis,
  anofab: this.cadastro.value.anofab,
  tara: this.cadastro.value.tara,
  pesobruto:this.cadastro.value.pesobruto,
  combustivel: this.cadastro.value.combustivel,
  tipoCombustivel: this.cadastro.value.tipoCombustivel,
  codfab: this.cadastro.value.codfab,
  fabricante: this.cadastro.value.fabricante,
  negativo: this.cadastro.value.negativo,
  viatura: this.cadastro.value.viatura,
  avisanegativo: this.cadastro.value.avisanegativo,
  descontinuado: this.cadastro.value.descontinuado,
  ligaprojecto: this.cadastro.value.ligaprojecto,
  composto: this.cadastro.value.composto,
  stock: this.cadastro.value.stock,
  ultimopreco: this.cadastro.value.ultimopreco,
  precoponderado: this.cadastro.value.precoponderado,
  imagem: null,
  codigobarra:null,
  codigoQr: null,
  codtrailer: this.cadastro.value.codtrailer,
  trailer: this.cadastro.value.trailer,
  usaconvunid: this.cadastro.value.usaconvunid,
  quantidade: this.cadastro.value.quantidade,
  unidsaida: this.cadastro.value.unidsaida,
  usadoprod: this.cadastro.value.usadoprod,
  dimensao: this.cadastro.value.dimensao,
  devolc: this.cadastro.value.devolc,
  usaserie: this.cadastro.value.usaserie,
  stockmin: this.cadastro.value.stockmin,
  stockmax: this.cadastro.value.stockmax,
  reserva: this.cadastro.value.reserva,
  encomenda: this.cadastro.value.encomenda,
  nmovstk: this.cadastro.value.nmovstk,
  pos: this.cadastro.value.pos,
  motorista: this.cadastro.value.motorista,
  departanto: this.cadastro.value.departanto,
  ccusto: this.cadastro.value.ccusto,
  cilindrada: this.cadastro.value.cilindrada,
  companhia: this.cadastro.value.companhia,
  contrato: this.cadastro.value.contrato,
  inicio: this.cadastro.value.inicio,
  termino: this.cadastro.value.termino,
  valorLeasing: this.cadastro.value.valorLeasing,
  mensalidade: this.cadastro.value.mensalidade,
  bloqueado: this.cadastro.value.bloqueado,
  assentos: this.cadastro.value.assentos,
  portas: this.cadastro.value.portas,
  data: this.cadastro.value.data,
  trailref: this.cadastro.value.trailref,
  traildesc: this.cadastro.value.traildesc,
  anomodelo: this.cadastro.value.anomodelo,
  eixos: this.cadastro.value.eixos,
  pneus: this.cadastro.value.pneus,
  carga: this.cadastro.value.carga,
  vendido: this.cadastro.value.vendido,
  comprado: this.cadastro.value.comprado,
  obterpeso: this.cadastro.value.obterpeso,
  peso: this.cadastro.value.peso,
  volume: this.cadastro.value.volume,
  usalote: this.cadastro.value.usalote,
  ivametade: this.cadastro.value.ivametade,
  cpoc: this.cadastro.value.cpoc,
  contaInv: this.cadastro.value.contaInv,
  contaCev: this.cadastro.value.contaCev,
  contaReo: this.cadastro.value.contaReo,
  contaCoi: this.cadastro.value.contaCoi,
  nofrota: this.cadastro.value.nofrota,
  cor: this.cadastro.value.cor,
  gasoleo: this.cadastro.value.gasoleo,
  naovisisvel: this.cadastro.value.naovisisvel,
  activo: this.cadastro.value.activo,
  tipoartigo: this.cadastro.value.tipoartigo,
  quantvenda: this.cadastro.value.quantvenda,
  usaquant2: this.cadastro.value.usaquant2,
  disciplina: this.cadastro.value.disciplina,
  sigla: this.cadastro.value.sigla,
  credac: this.cadastro.value.credac,
  cargahtotal: this.cadastro.value.cargahtotal,
  cargahteorica: this.cadastro.value.cargahteorica,
  cargahpratica: this.cadastro.value.cargahpratica,
  prec: this.cadastro.value.prec,
  stl: [],
  stb: [],
  stPrecos: this.cadastro.value.stPrecos,
  multa: this.cadastro.value.multa,
  bilhete: this.cadastro.value.bilhete,
  bilheteespecial: this.cadastro.value.bilheteespecial,
  tipoProduto: this.cadastro.value.tipoProduto,
};
  const dadosssss=cl;

  if(cl.referenc.length<=0){
    Swal.fire('Erro!', 'caro Utilizador,o campos Referencia é obrigatorio!', 'error');
    return
  }
  else if(cl.descricao.length<=0){
    Swal.fire('Erro!', 'caro Utilizador,o campos Descrição é obrigatorio!', 'error');
    return
  }


  if(cl.stPrecos.length<=0){
    Swal.fire('Erro!', 'caro Utilizador,adicione a tabela de preços!', 'error');
    return
  }
  this.isSpinnerDisplayed=true

  const formData = new FormData();
  const _dadoscl=dadosssss
  var json_arr = JSON.stringify(_dadoscl);
  formData.append("st",json_arr);
  const url = `${environment.APIurl}Disciplinas/UploadFile`;
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
    }


  }, (error: any) => {
    Swal.fire('Erro!', `Não foi possivel executar a operação `, 'error');
  }).add(() => {
    this.working = false;
  });


}

total:number=0;

totalstr:string='Total:  ';


 //------------------------------------------------Documentos----------------------------------------------------------
  get Stl(): FormArray {

    return this.cadastro.get('stl') as FormArray;
   }


//---------------------------------------------------------------------------------------------------------------------

//-----------------------------------Agregado Familiar-----------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------







visibilidadeagregado:boolean=false;
clstampvliw: string='';


myControlmoeda = new FormControl<string | selects>('');
optionsmoeda: selects[] = [];
filteredOptionsmoeda!: Observable<selects[]>;
async getmoedas() {

  const se:condicoesprocura={
    tabela:"moedas",
  campo1: "MOEDA",
  campo2:"descricao",
   condicao:"vazio"
  }
  this._loginservice.getselectionPost(se).subscribe({
    next: (data) => {
      if (data.sucesso) {
        this.optionsmoeda = data.dados.selects;
        this.myControlmoeda.setValue('MZN');
        this.filteredOptionsmoeda = this.myControlmoeda.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.descricao;
            return name ? this._filter(name as string,this.optionsmoeda)  : this.optionsmoeda.slice();
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
@ViewChild('recprpais') recprpais!: MatSelect;
//-----------------------------------------------------------------------------------------------------------------------
visibilidadedoc:boolean=false;
visibilidadebibliografia:boolean=false;
visibilidadestprecos:boolean=false;
visibilidadestl:boolean=false;
//------------------------------------------Adiciona e remove linhas do docs---------------------------------------------
adicionarStl() {
  this.visibilidadestl=true;
let stamp =this.turmanotaservice.Stamp();
  this.Stl.push(this.fb.group({
    stlstamp:[stamp],
    ststamp :[this.clstampvliw],
    codigo:[''],
    descricao:[''],
  }));
}
adicionarStb() {
  this.visibilidadestl=true;
let stamp =this.turmanotaservice.Stamp();
  this.Stb.push(this.fb.group({
    stbstamp:[stamp],
    ststamp :[this.clstampvliw],
    descricao:[''],
  }));
}
removerStb(index: number) {


  let grela=(<FormArray>this.cadastro.get('stb')).controls[index].value;
  this.eliminarestudante(grela.stbstamp,grela.descricao,index)

}
get Stb(): FormArray {

  return this.cadastro.get('stb') as FormArray;
 }

get stPrecos(): FormArray {

  return this.cadastro.get('stPrecos') as FormArray;
 }

 removerstpreco(index: number) {
  let grela=(<FormArray>this.cadastro.get('stPrecos')).controls[index].value;
  this.eliminarestudante(grela.stPrecostamp,grela.preco,index)

}
adicionarstpreco() {
  this.visibilidadestprecos=true;

let stamp =this.turmanotaservice.Stamp();
  this.stPrecos.push(this.fb.group({
        stPrecostamp :[stamp],
       ststamp :[this.clstampvliw],
       moeda :[''],
       cCusto :[''],
       codCCu :[''],
       ccustamp :[''],
       ivainc :[false],
       padrao :[false],
       preco :[0],
       preco1 :[0],
       preco2 :[0],
       preco3 :[0],
       preco4 :[0],
       preco5 :[0],
       preco6 :[0],
       preco7 :[0],
       precoCompra :[0],
       perc :[0],
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

removerstl(index: number) {


  let grela=(<FormArray>this.cadastro.get('stl')).controls[index].value;
  this.eliminarestudante(grela.stlstamp,grela.displina,index)

}



removergri(index:number){
  this.Stl.removeAt(index);
  var lets=this.cadastro.get('gradel') as FormArray
  if(lets.length>0){
  this.visibilidadestl=true;
  }  else{
  this.visibilidadestl=false;
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


async Disciplina(){

  const se:condicoesprocura={
    tabela:"st",
  campo1: "descricao",
  campo2:"Referenc",
   condicao:"Disciplina=1"
  }

  this._loginservice.getselectionPost(se).subscribe({
    next: (data) => {
      if (data.sucesso) {
        this.optionsDisciplinaprec = data.dados.selects;
 
        console.log(  this.optionsDisciplinaprec)
        this.filteredOptionsDisciplinaprec = this.myControlDisciplinaPrece.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.descricao;
            return name ? this._filter(name as string,this.optionsDisciplinaprec) : this.optionsDisciplinaprec.slice();
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

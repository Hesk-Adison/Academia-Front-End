import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Turmanota1 } from 'src/Models/Turma';
import { DataSendService } from 'src/Service/Compartilhar/data-send.service';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { DadosTemporarios } from 'src/app/GuardarSessoes/DadosTemporarios';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import Swal from 'sweetalert2';
import {MatPaginator,  MatPaginatorIntl,  PageEvent} from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';
import { finalize } from 'rxjs';
import { Estudante } from 'src/Models/Estudante';
import { turmanota } from 'src/app/Turmas/todastabelasturma';
import { Estudantestemp } from 'src/app/GuardarSessoes/GuardarEstudantes';


@Component({
  selector: 'app-form-media',
  templateUrl: './form-media.component.html',
  styleUrls: ['./form-media.component.scss']
})
export class FormMediaComponent  implements OnInit{

  formularioMancebo!: FormGroup;
  Curso=''
  Turma=''
  anosem=''
  disciplina=''
  listCurso:Turmanota1[]=[];
  Habilita1=true
  Habilita2=true
  dataListaCurso= new MatTableDataSource(this.listCurso);
  isSpinnerDisplayed=false
  trabalho=true
  displayedturma: string[] = ['alunoNome', 'n1','n2','n3', 'n4','media'];
  // , 'media'

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 5; // Itens por página
  pageSizeOptions: number[] = [5, 10, 25, 100];
  Dados:any
  DataTurm:Turmanota1[]=[]
  estudante!:Estudante
  dadosMancebo!: Estudante
  lenght = 0
  media=false
  constructor(

    // private modalActual: MatDialogRef<TabelapagComponent>,
    // @Inject(MAT_DIALOG_DATA) public dadosMancebo: Estudante,
    private fb:FormBuilder,
    private TurmaotaService: TurmaNotaService,
    private _loginservice: LoginServiceService,
    private router: Router,
    private dadosTemp : DadosTemporarios,
    private lancaTemp : DadosLancamento,
    private Datasend: DataSendService,
    private dadossessa : GuardarSessoes,
    private guardarestudantes : Estudantestemp,
    private route: ActivatedRoute ,private guararsessoes: GuardarSessoes


  ) {


    this.Dados = new MatTableDataSource<Turmanota1>(this.lancaTemp.obterSessao().turmanota)
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

    // this.estudante = this.fb.group({
    //   turmastamp: [],
    //   anosem: [],
    //   turma:[],
    //   curso:[],
    //   cursostamp:[],
    //   disciplina:[],
    //   ststamp:[],
    //   turmanota:[],
    // })  
  }

  ngOnInit(): void {
  this.Curso=this.lancaTemp.obterSessao().curso
  this.Turma=this.lancaTemp.obterSessao().turma
  this.anosem=this.lancaTemp.obterSessao().anosem
  this.disciplina=this.lancaTemp.obterSessao().disciplina

  this.listCurso=this.lancaTemp.obterSessao().turmanota

  this.lenght = this.listCurso.length
  this.buscarNota()
 


  }

  busca(event: Event) {

    this.Dados.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
   
  }

  buscarNota(){
    this.TurmaotaService.GetTurmaNota().subscribe((Data)=>{
 
    })
  }
  
onKeyPress($event: Event,_t25: Turmanota1,number: number) {





}

private newMethod($event: Event): number {

  let numer=Number(($event.target as HTMLInputElement).value);
  if(numer>20 || numer<0){
    Swal.fire('Erro',`O valor introduzido está incorrecto`,'error');
    return 0;
  }
      return Number(($event.target as HTMLInputElement).value);
    }

    ngAfterViewInit(): void {
      this.Dados.paginator=this.paginator
     
    }

calcular(){

let retorno = this.listCurso.some((Item)=> Item.aprovado===true)
this.isSpinnerDisplayed=true
    if( retorno ==false){
      for(var x in this.listCurso){
      //  if(this.listCurso[x].n1 !== "" && this.listCurso[x].n2 !== ""){
        const mediaNumerica=((Number(this.listCurso[x].n1)+Number(this.listCurso[x].n2))/2).toFixed(2)
        this.listCurso[x].media=mediaNumerica
        const mediaNumericaArredondada = Number(this.listCurso[x].media);
        if( mediaNumericaArredondada<=9.4){
          this.listCurso[x].resultado ='Excluido(a)'
          this.listCurso[x].resultadoFinal = 'Reprovado(a)'
          //console.log(this.listCurso[x].alunoNome, this.listCurso[x].media)
          //console.log(this.listCurso[x].mediafinal)
     
          this.listCurso[x].mediafinal=this.listCurso[x].media

        }
        if( mediaNumericaArredondada >= 9.5 &&  mediaNumericaArredondada <= 13.4 ){
          this.listCurso[x].resultado ='Admitido(a)'
          //console.log(this.listCurso[x].alunoNome, this.listCurso[x].media)
        }
        if( mediaNumericaArredondada>= 13.5 &&  mediaNumericaArredondada <= 20 ){
          this.listCurso[x].resultado ='Aprovado(a)'
          this.listCurso[x].resultadoFinal = 'Aprovado'
          //console.log(this.listCurso[x].media)
         // console.log(this.listCurso[x].mediafinal)
          this.listCurso[x].mediafinal=this.listCurso[x].media
        }
    
      //  }
        // else{
        //   //alert(`As notas do aluno ${this.listCurso[x].alunoNome} estão incompletas.`);
        //   this.listCurso[x].n1 != ""
        //   this.listCurso[x].n2 != ""
        //   this.listCurso[x].media != ""
        //   this.listCurso[x].mediafinal=''
        // }

        }
    
    }else if( retorno == true){

      for(var x in this.listCurso){
          const mediaNumerica = (
            ((Number(this.listCurso[x].n1) + Number(this.listCurso[x].n2)) / 2) * 0.7 +
            ((Number(this.listCurso[x].n3) + Number(this.listCurso[x].n4)) / 2) * 0.3
          ).toFixed(2);
          this.listCurso[x].media= mediaNumerica;
        const mediaNumericaArredondada = Number(this.listCurso[x].media);
        if(  mediaNumericaArredondada<=9.4){
          this.listCurso[x].resultado ='Excluido(a)'
          this.listCurso[x].resultadoFinal = 'Reprovado(a)'
          this.listCurso[x].mediafinal=this.listCurso[x].media
          console.log( this.listCurso[x].mediafinal)
        }
        if(  mediaNumericaArredondada >= 9.5 &&  mediaNumericaArredondada<= 13.4 ){
          this.listCurso[x].resultado ='Admitido(a)'
          this.listCurso[x].mediafinal=''
        }
        if(  mediaNumericaArredondada >= 13.5 &&   mediaNumericaArredondada <= 20 ){
          this.listCurso[x].resultado ='Aprovado(a)'
          this.listCurso[x].resultadoFinal ='Aprovado(a)'
          this.listCurso[x].mediafinal=this.listCurso[x].media
        }

  }
}

const dadosMancebo=this.lancaTemp.obterSessao();
this.estudante= {
  turmastamp: dadosMancebo == null ? '' : dadosMancebo.turmastamp,
  anosem: dadosMancebo == null ? '' : dadosMancebo.anosem,
  turma: dadosMancebo == null ? '' : this.Turma,
  curso: dadosMancebo == null ? '' : dadosMancebo.curso,
  cursostamp: dadosMancebo == null ? '' : dadosMancebo.cursostamp,
  disciplina: dadosMancebo == null ? '' :dadosMancebo.disciplina,
  ststamp: dadosMancebo == null ? '' : dadosMancebo.ststamp,
  turmanota: this.listCurso,
}
this.guardarestudantes.guardarSessao(this.estudante)
 this.TurmaotaService.GravarDadosEst(this.estudante ).pipe(
      finalize(() =>  this.isSpinnerDisplayed = false , ),)
    .subscribe({
      next: (data) => {
        if (data.sucesso) {
  Swal.fire('Sucesso',`O calculo foi executado com sucesso, Verifique o aprovitamento dos estudantes`,'success');
  this.lancaTemp.guardarSessao(data.dados);
        }     
        else {
  Swal.fire('Opss',data.mensagem,'error');
        }
      },
      error: (e) => {
       // alert(e + " Erro de conexão");
      }
    });
  } 

  aproveitamento(){
    this.router.navigate(['/Adim/aproveita'])
  }


  
}










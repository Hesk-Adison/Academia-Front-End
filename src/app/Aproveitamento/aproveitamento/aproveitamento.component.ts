import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Estudante, ReportPauta } from 'src/Models/Estudante';
import { Turmanota1 } from 'src/Models/Turma';
import { Trabalho } from 'src/Models/trabalho';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { DadosTemporarios } from 'src/app/GuardarSessoes/DadosTemporarios';
import { VerTrabalhoComponent } from 'src/app/Portal-do-Estudante/trabalho/ver-trabalho/ver-trabalho.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aproveitamento',
  templateUrl: './aproveitamento.component.html',
  styleUrls: ['./aproveitamento.component.scss']
})
export class AproveitamentoComponent implements OnInit{


  displayedturma: string[] = [ 'alunoNome', 'n1','n2','n3','n4','media', 'resultado','e1','e2','es','mediafinal','resultadofinal',];
  dataListaCurso:Turmanota1[]=[]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 5; // Itens por página
  pageSizeOptions: number[] = [5, 10, 25, 100];
  Dados:any
  Curso=''
  Turma=''
  anosem=''
  disciplina=''
  isSpinnerDisplayed=false;
  estudante!:Estudante;
  
constructor(

  private dadosTemp : DadosTemporarios,
  private lancaTemp : DadosLancamento,
  private TurmaotaService: TurmaNotaService,
  private dialog: MatDialog,


){}

  ngOnInit(): void {
   
    this.Dados = new MatTableDataSource<Turmanota1>(this.lancaTemp.obterSessao().turmanota)
  
    this.Curso=this.lancaTemp.obterSessao().curso
    this.Turma=this.lancaTemp.obterSessao().turma
    this.anosem=this.lancaTemp.obterSessao().anosem
    this.disciplina=this.lancaTemp.obterSessao().disciplina
  


    var teste = this.lancaTemp.obterSessao().turmanota
    this.dataListaCurso = teste
  }

  ngAfterViewInit(): void {
    this.Dados.paginator=this.paginator
   
  }


  Imprimir(origem:string) {



    if(this.dataListaCurso.length==0){
      Swal.fire('Erro',`A grelha de alunos não pode estar vazia, por favor!`,'error');
      return;
    }
  
  const dadosMancebo=this.dadosTemp.obterSessao();
    this.estudante= {
      turmastamp: dadosMancebo == null ? '' : this.dadosTemp.obterSessao().turmastamp,
      anosem: dadosMancebo == null ? '' : this.dadosTemp.obterSessao().anosem,
      turma: dadosMancebo == null ? '' : this.dadosTemp.obterSessao().codigo,
      curso: dadosMancebo == null ? '' : this.dadosTemp.obterSessao().descurso,
      cursostamp: dadosMancebo == null ? '' :this.dadosTemp.obterSessao().cursostamp,
      disciplina: dadosMancebo == null ? '' :this.dadosTemp.obterSessao().disciplina,
      ststamp: dadosMancebo == null ? '' : this.dadosTemp.obterSessao().ststamp,
      turmanota: this.dataListaCurso,
    }
  
  
  
     let rep:ReportPauta= {
       estudante: this.estudante,
       filename: '',
       origem: origem,
       xmlstring: ''
     }
    this.isSpinnerDisplayed = true;
    this.TurmaotaService.GerarRelatorioPauta(rep).subscribe({
      next: (data) => {
        if (data.sucesso) {
  
  
          if (data.dados != null) {
            const filename = data.dados.filename;
            try {
              if (filename != null && filename.length > 0 && filename != '' && filename != 'vazio') {
  
  
               // this._loginservice.Downloadfile(filename);
               rep.filename=filename;
      let trabalho: Trabalho={
        trabalhostamp: '',
        turmalstamp: '',
        ststamp: '',
        clstamp: '',
        status: '',
        data: new Date(),
        path: filename,
        path1: ''
      }
  
      this.dialog.open(VerTrabalhoComponent, {
        width: '100%',
        height:'100%',
        disableClose: true,
        data: trabalho,
        autoFocus: false,
      }).afterClosed().subscribe(resultado => {
        if (resultado === "true") {
          this.isSpinnerDisplayed= false
          this.reload()
        }
      });
     }
            } catch {
  
              // this._loginservice.mostrarAlerta("O sistema não conseguiu carregar o ficheiro, o report apresenta má formatação!","Erro");
              Swal.fire('Erro!', "O sistema não conseguiu carregar o ficheiro, o report apresenta má formatação!", 'error');
            }
          }
        } else {
          this.isSpinnerDisplayed = false
          //this.reload()
          Swal.fire('Erro!',data.mensagem , 'error');
  
  
        }
      },
      error: (e) => {
       // Swal.fire('Erro!', "O sistema não conseguiu carregar o ficheiro " + e, 'error');
      }
    });
  
    //this.dadosTemp.eliminarSessao()
  
  }














  
reload(){
  location.reload()
}
}

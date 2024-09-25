import { Component, OnInit, ViewChild } from '@angular/core';
import { Dclasse } from 'src/Models/Diario/Diario';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { GerarDiarioClasseComponent } from '../../GerarDiarioClasse/gerar-diario-classe/gerar-diario-classe.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cursoservices } from '../../Curso/cursoservices';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { finalize } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Matriculaservice } from '../../MatriculaAluno/matriculaservice';

@Component({
  selector: 'app-lista-dclasse',
  templateUrl: './lista-dclasse.component.html',
  styleUrls: ['./lista-dclasse.component.scss']
})
export class ListaDclasseComponent implements OnInit {

  listaDclasse!: Dclasse[];
  isSpinnerDisplayed=false
  frmestudantes: FormGroup;
  totalRecords: number = 0;  
  pagenumber: number = 0;
  pagesize: number = 0;  
  pagetotalrecord: number = 0;
  pageIndex: number = 0;
  colunasTabela: string[] = ['no', 'nim','nome', 'sexo','departamento', 'accoes'];
  dataListaestudante = new MatTableDataSource(this.listaDclasse);
  @ViewChild(MatPaginator, { static: true})  paginacaoTabela!: MatPaginator;



constructor(
  private _ElinarServic: Matriculaservice,
  private fb: FormBuilder,
  private turmanotaservice: TurmaNotaService,
  private dialog: MatDialog,
  private _estudanteService: Cursoservices


) {


  this.frmestudantes = this.fb.group({
    nimNome: ['']
   });
}

getestudante() {
  this.isSpinnerDisplayed = true;
  let nimNome = this.frmestudantes.value.nimNome;
  this.initialLoad(nimNome);
}

initialLoad(valor: string) {
  this.isSpinnerDisplayed =true;
  let currentPage = (this.paginacaoTabela?.pageIndex ?? 0) + 1;
      let pageSize = (this.paginacaoTabela?.pageSize ?? 0);
  this._estudanteService.Getgrades(valor, currentPage, pageSize).pipe(
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


ngOnInit(): void {
  
}



  
  novoestudante() {   
    
    let stamp =this.turmanotaservice.Stamp(); 
  let dclasse:Dclasse={
  dclassestamp : '',
  anosem : '',
  descricao : '',
  codigo : '',
  tipoprazo : '',
   datain : new Date(),
   datater : new Date(),
   datainaula : new Date(),
   datateraula : new Date(), 
   datainnota : new Date(),
   dataternota : new Date(),
   dataresult : new Date(),
    fechado : false,
    motivo : '',
    dataFecho : new Date(),
  dclassel:[]
  }
  
      this.dialog.open(GerarDiarioClasseComponent, {
        // height: '85%',
        width: '100%',
        disableClose: true,
        data: dclasse,
        autoFocus: false,
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
      }).afterClosed().subscribe(resultado => {
        if (resultado === "true") {
         // this.getestudante();
        }
      });
    }
  
    async editarestudante(dclasse: Dclasse) {
  
      this.dialog.open(GerarDiarioClasseComponent, {
        // height: '85%',
        width: '100%',
        disableClose: true,
        data: dclasse,
        autoFocus: false,
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
      }).afterClosed().subscribe(resultado => {
        if (resultado === "true") {
          this.getestudante();
        }
      });
    }
  
  
    eliminarestudante(dclasse: Dclasse) {
      //let tabela = `Horario`
      let tab= 'Dclasse'
      Swal.fire({
        title: `Deseja eliminar Este plano?`,
        text: dclasse.descricao,
        icon: "warning",
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Sim, Eliminar',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Não, Voltar'
      }).then((resultado => {
        if (resultado.isConfirmed) {
        
          this._ElinarServic.eliminargradelsddgd(dclasse.dclassestamp,tab,`dclassestamp`).subscribe({
            next: (data) => {
              if (data.sucesso) {
               // this._loginservice.mostrarAlerta(`${tabela} eliminada com sucesso`, "Ok");
               this.getestudante();
        Swal.fire('Sucesso!', `Horario eliminada(o) com sucesso`, 'success');   
               
    
              } else {
                
        Swal.fire('Erro!', `Nao foi possível eliminar a(o) Horario`, 'error');   
             
              }
    
            },
            error: () => {
             
            }
          });
    
        }
    
      }));
      
    }


    confirmPageChange(pageEvent: PageEvent) {
      let nimNome = this.frmestudantes.value.nimNome;
      this.pageIndex=pageEvent.pageIndex;
      this.paginacaoTabela.pageSize=pageEvent.pageSize;    
      this.paginacaoTabela.pageIndex=pageEvent.pageIndex;
      this.initialLoad(nimNome);
    }
}

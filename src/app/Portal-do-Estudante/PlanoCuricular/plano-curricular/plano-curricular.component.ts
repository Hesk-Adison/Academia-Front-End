import { AsyncPipe, CommonModule } from "@angular/common";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { planocurriculars } from "src/Models/planocurriculars";
import { GuardarSessoes } from "src/app/GuardarSessoes/Gaurdarsessoes";

@Component({
  selector: 'app-plano-curricular',
  templateUrl: './plano-curricular.component.html',
  styleUrls: ['./plano-curricular.component.scss'], 
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule,   MatCardModule,

    MatTableModule, MatPaginatorModule,MatSortModule,
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
   CommonModule
  ],


})
export class PlanoCurricularComponent implements OnInit, AfterViewInit{

 plano: planocurriculars[]=[]
 planoGeral: planocurriculars[]=[]
// Dados: any;

//length = 1000; // Total de itens
  pageSize = 5; // Itens por página
  pageSizeOptions: number[] = [5, 10, 25, 100];
  Dados:any
  lenght = 0
    

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private guardarsessoes: GuardarSessoes,
  ){
    this.Dados = new MatTableDataSource<planocurriculars>(this.guardarsessoes.obterSessao().camposcl.planocurriculars)
 

    
    
   
    this.lenght = this.plano.length


  }

  ngOnInit(): void {
    this.planoGeral = this.guardarsessoes.obterSessao().camposcl.planocurriculars
    this.plano = this.guardarsessoes.obterSessao().camposcl.planocurriculars

  }

  ngAfterViewInit(): void {
    this.Dados.paginator=this.paginator
   
  }
  colunas=['codetapa','etapa', 'coddisciplina', 'disciplina']

  BuscasporPagina(eventPage: PageEvent){


    // this.currentPage = eventPage.pageIndex

  }

  busca(event: Event){

    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    this.plano = this.planoGeral.filter(plano =>{
      return plano.displina.toLowerCase().includes(value)
    })
  }

}

// import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatCheckboxChange } from '@angular/material/checkbox';
// import { AspnetUser } from 'src/Models/DMZusers';
// import { EmailServiceService } from 'src/Service/EmailService/EmailService/email-service.service';
// import { dmzview } from 'src/app/Interfaces/Grade/dmzview';
// import { SelectionModel } from '@angular/cdk/collections';
// import { ViewAspnetuser } from 'src/Models/AspnetViwer';
// import { Observable } from 'rxjs';
// import { selects } from 'src/Models/CampoSessoes';
// import { ImportarFuncionarioComponent } from '../../ImportarFuncionario/importar-funcionario/importar-funcionario.component';
// import { MatDialog } from '@angular/material/dialog';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
// import { aspenetuserinterface } from 'src/Models/aspnetuserInterface';

// @Component({
//   selector: 'app-permissoes',
//   templateUrl: './permissoes.component.html',
//   styleUrls: ['./permissoes.component.scss']
// })
// export class PermissoesComponent implements OnInit {
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   colunasdisciplinas=['disciplina', 'nome','click']
//   totalrecorddisciplinas:number=0;
// Datasouce!:any
// dddd:any
// totalData:number=0;
// pageSize = 5; // Itens por página
// pageSizeOptions: number[] = [5, 10, 25, 100];
// Dados:any
// lenght = 0

//   dataListadisciplinas: any;
// constructor(
//   private dialog: MatDialog,
//   private emailservice:EmailServiceService,

// ) {
//   this.Dados = new MatTableDataSource<AspnetUser>( this.dddd)
// }


//   ngOnInit(): void {
//     this.emailservice.GetUser().subscribe((data)=>{
//       if(data.dados != null){
//         this.dddd = data.dados
//         this.Datasouce=data.dados
//         this.lenght=this.dddd.length
    
//       } })

  
//   }
//   busca(event: Event){

//     const target = event.target as HTMLInputElement;
//     const value = target.value.toLowerCase();
//     this.dddd = this.Datasouce.filter((data: { nome: string; }) =>{
//       return data.nome.toLowerCase().includes(value)
//     })
//   }

//   filteredOptionsst!: Observable<selects[]>;  
//   Setgrauparen(item:selects){


//       }
//       getElementIndex(element: AspnetUser): number {
//        return  this.Datasouce['indexOf'](element)
//      }
//      onRowClicked(row: AspnetUser): void {
//        const index = this.getElementIndex(row);
  

  
 

     
//  this.CarregarDados(this.Datasouce[index])
//      }

//      CarregarDados(dados: AspnetUser){
//       this.dialog.open(ImportarFuncionarioComponent, {
//         // height: '85%',
//         width: '55%',
//         disableClose: true,
//         data: dados,
//         autoFocus: false,
//         enterAnimationDuration: '1000ms',
//         exitAnimationDuration: '1000ms',
//       }).afterClosed().subscribe(resultado => {
//         if (resultado === "true") {
//           //this.getestudante();
//         }
//       });

//      }
//      ngAfterViewInit(): void {
//       this.Dados.paginator=this.paginator
     
//     }

// }

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AspnetUser } from 'src/Models/DMZusers';
import { EmailServiceService } from 'src/Service/EmailService/EmailService/email-service.service';
import { dmzview } from 'src/app/Interfaces/Grade/dmzview';
import { SelectionModel } from '@angular/cdk/collections';
import { ViewAspnetuser } from 'src/Models/AspnetViwer';
import { Observable } from 'rxjs';
import { selects } from 'src/Models/CampoSessoes';
import { ImportarFuncionarioComponent } from '../../ImportarFuncionario/importar-funcionario/importar-funcionario.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { aspenetuserinterface } from 'src/Models/aspnetuserInterface';

@Component({
  selector: 'app-permissoes',
  templateUrl: './permissoes.component.html',
  styleUrls: ['./permissoes.component.scss']
})
export class PermissoesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['disciplina', 'nome', 'click'];
  dataSource = new MatTableDataSource<AspnetUser>();
  pageSizeOptions: number[] = [5, 10, 25, 100];
  filteredOptionsst!: Observable<selects[]>;

  constructor(
    private dialog: MatDialog,
    private emailService: EmailServiceService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadUserData(): void {
    this.emailService.GetUser().subscribe((data) => {
      if (data.dados != null) {
        this.dataSource.data = data.dados;
      }
    });
  }

  filterData(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = value;
  }

  getElementIndex(element: AspnetUser): number {
    return this.dataSource.data.indexOf(element);
  }

  onRowClicked(row: AspnetUser): void {
    this.openDialog(row);
  }

  openDialog(data: AspnetUser): void {
    this.dialog.open(ImportarFuncionarioComponent, {
      width: '55%',
      disableClose: true,
      data: data,
      autoFocus: false,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    }).afterClosed().subscribe((result) => {
      if (result === "true") {
       
      }
    });
  }
}


import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudante } from 'src/Models/Estudante';
import { Turmanota1 } from 'src/Models/Turma';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { DadosTemporarios } from 'src/app/GuardarSessoes/DadosTemporarios';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { carregardados } from 'src/app/Interfaces/carrgardados';

export class DynamicGrid{     
  name!:string;  
  email!:string;  
  phone!:string;  
}
@Component({
  selector: 'app-outross',
  templateUrl: './outross.component.html',
  styleUrls: ['./outross.component.scss'], 
})
export class OutrossComponent  implements OnInit {

  dynamicArray1:Array<DynamicGrid> = []; 
  
  turmanota:Array<Turmanota1> = []; 
  turmanotas:Array<Turmanota1> = []; 
  constructor(
    private TurmaotaService: TurmaNotaService,
    private formbuild: FormBuilder,
    private router: Router,
    private dadosTemp : DadosTemporarios,
    private dadossessao : GuardarSessoes,
    private lancaTemp : DadosLancamento,
    private dialog: MatDialog,private route: ActivatedRoute
   
    ){

     
    }

  dynamicArray: Array<Estudante> = [];  
  carregardados!:carregardados;
  dynamicArrays: Array<Estudante> = [];  
  newDynamic: any = {};  
  lisnewDynamic: Estudante[] = []; 
  teste:string='Meu nome é';
  estudante!:Estudante;
usr!:DynamicGrid;
  ngOnInit(): void {  
const xx=this.lancaTemp.obterSessao();
this.estudante=xx;
this.turmanotas=this.turmanota=this.estudante.turmanota;
this.dynamicArrays=xx;
this.dynamicArray=xx;
this.dynamicArray1=xx;
  }  
  
  addRow() {    
    this.newDynamic = {email: "", name: "",phone:""};  
      this.dynamicArray.push(this.newDynamic);  
      return true;  
  }  
  onKeyPress(event: Event,nr:number) {

    
    console.log(`Id é ${nr}`);

    var inputVal = (event.target as HTMLInputElement).value.toLowerCase();
   
    var inputVald = (event.target as HTMLInputElement).id;

    let nota1 : any = document.getElementById("n1-"+nr) as HTMLInputElement | null;
    let nota2 : any = document.getElementById("n2-"+nr) as HTMLInputElement | null
    ;

    console.log(nota2.value);
    let test : any = document.getElementById(`media-${nr}`) as HTMLInputElement | null
test.value = nota2.value*nota1.value;


this.router.navigate(['Adim/Tabelapag'])

    
  }
  submit() {

    const dadosMancebo=this.lancaTemp.obterSessao();
    this.estudante= {
      turmastamp: dadosMancebo == null ? '' : dadosMancebo.turmastamp,
      anosem: dadosMancebo == null ? '' : dadosMancebo.anosem,
      turma: dadosMancebo == null ? '' : dadosMancebo.turma,
      curso: dadosMancebo == null ? '' : dadosMancebo.curso,
      cursostamp: dadosMancebo == null ? '' : dadosMancebo.cursostamp,
      disciplina: dadosMancebo == null ? '' :dadosMancebo.disciplina,
      ststamp: dadosMancebo == null ? '' : dadosMancebo.ststamp,
      turmanota: this.turmanota ,
    }
    if(this.estudante.turmanota.length==0){
      alert("A grelha de alunos não pode estar vazia, por favor!");
      return;
    }
    if (this.estudante != null) {
      this.TurmaotaService.GravarDadosEst(this.estudante).subscribe({
        next: (data) => {

          if (data.sucesso) {
            alert(`Lançamento executado com sucesso`);
            //this.closeDialog()
          } else {
            alert(data.mensagem);
          }
        },
        error: (e) => {
          alert(e + " Erro de conexão");
        }
      });
    } else {
      alert( " Não pode gravar com dados vazios");
    }
   
    

  }

 busca(event: Event){
  this.turmanota =  this.turmanotas.filter(dynamicArray =>{
      return dynamicArray.alunoNome.toLowerCase().includes((event.target as HTMLInputElement).value.toLowerCase())
    })
  }
  deleteRow(index:number) {  
      if(this.dynamicArray.length ==1) {  
       // this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
          return false;  
      } else {  
          this.dynamicArray.splice(index, 1);  
         // this.toastr.warning('Row deleted successfully', 'Delete row');  
          return true;  
      }  
  }

}

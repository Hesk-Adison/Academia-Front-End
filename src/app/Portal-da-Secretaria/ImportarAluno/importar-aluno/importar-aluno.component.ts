import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { CampoSessoes } from 'src/Models/CampoSessoes';
import { clTurmaClass } from 'src/Models/ClTurma';
import { Cls } from 'src/Models/Cls';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { Alunossessao } from 'src/app/GuardarSessoes/Alunos';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { campoDashboard } from 'src/Models/campoDashboard';
import { fnc } from 'src/Models/fnc';
import { Pe } from 'src/Models/Pe';
import { EmailServiceService } from 'src/Service/EmailService/EmailService/email-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { modalSenha } from 'src/Models/Modalsenha';
import { recuperarPassword } from 'src/Models/RecuperarPassword';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

export interface valor {

  origem: number
}

@Component({
  selector: 'app-importar-aluno',
  templateUrl:'./importar-aluno.component.html',
  styleUrls: ['./importar-aluno.component.scss']
})


export class ImportarAlunoComponent implements OnInit{
  titloAccao='Alterar Password'
  botaoAccao='Alterar'
  SenhaActualizada!: FormGroup;
isSpinnerDisplayed=false
passwordFieldType: string = 'password';
password: string = '';

  constructor(
    private modalActual: MatDialogRef<ImportarAlunoComponent>,
    private fb:FormBuilder,
    private emailservice:EmailServiceService,
    @Inject(MAT_DIALOG_DATA) public Dados: recuperarPassword,
  ) {
    this.SenhaActualizada = this.fb.group({
      usuario: [''],
      senha:['', [Validators.required]],
      confirmarSenha:['', [Validators.required]]
    })
    
  }

ngOnInit(): void {

}
Alterar(){

  const dddd:modalSenha={
    usuario:this.Dados.email,
    senha: this.SenhaActualizada.value.senha,
    confirmarSenha: this.SenhaActualizada.value.senha,
  
    
  }
  if(dddd.senha.length<=0 || dddd.confirmarSenha.length<=0 || dddd.usuario.length<=0){
    Swal.fire('Alerta!', 'Caro utilizador,preencha os campos', 'error');
    return
  }

  if(dddd.senha == dddd.confirmarSenha){
  this.isSpinnerDisplayed=true
  this.emailservice.actualizarsenha(dddd).pipe(
    finalize(() => this.isSpinnerDisplayed = false),
  ).subscribe((data)=>{
    Swal.fire('Sucesso!', 'Caro utilizador,As a senha de confirmação não esta correcta', 'success');
this.closeDialog()
  })
}
else{
  Swal.fire('Alerta!', 'Caro utilizador,As a senha de confirmação não esta correcta', 'info');
}
}

closeDialog() {
  
  this.modalActual.close("true");
}

togglePasswordVisibility(): void {
  this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
}
}

import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { AspnetUser } from 'src/Models/DMZusers';
import { LoginModel } from 'src/Models/Login';
import { FirstLogin, modalSenha } from 'src/Models/Modalsenha';
import { recuperarPassword } from 'src/Models/RecuperarPassword';
import { EmailServiceService } from 'src/Service/EmailService/EmailService/email-service.service';
import { LogadoService } from 'src/Service/LoginInit/logado.service';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { ImportarAlunoComponent } from 'src/app/Portal-da-Secretaria/ImportarAluno/importar-aluno/importar-aluno.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logado',
  templateUrl: './logado.component.html',
  styleUrls: ['./logado.component.scss']
})
export class LogadoComponent implements OnInit, AfterViewInit{

  
  titloAccao='Novo Utilizador'
  botaoAccao='Alterar'
  SenhaActualizada!: FormGroup;
isSpinnerDisplayed=false
passwordFieldType: string = 'password';
password: string = '';
usuario: string=''

  constructor(
    private modalActual: MatDialogRef<LogadoComponent>,
    private fb:FormBuilder,
    private emailservice:EmailServiceService,
    @Inject(MAT_DIALOG_DATA) public Dados: AspnetUser,
    private logadoService: LogadoService,
  ) {
    this.SenhaActualizada = this.fb.group({
      email: ['',  [Validators.required, Validators.email]],
      user:['', [Validators.required]],
      senha:['', [Validators.required]]
    })
    
  }
  

ngOnInit(): void {


}

ngAfterViewInit(): void {
  
}
Alterar(){
if(    this.SenhaActualizada.invalid){
  Swal.fire('Alerta!', 'Caro utilizador,preencha todos os campos', 'error');
}
  const dddd:FirstLogin={
    email: this.SenhaActualizada.value.email,
    user:this.SenhaActualizada.value.user,
    senha:this.SenhaActualizada.value.senha,
  }


  if( this.SenhaActualizada){
  this.isSpinnerDisplayed=true
  this.logadoService.Logado(dddd).pipe(
    finalize(() => this.isSpinnerDisplayed = false),
  ).subscribe((data)=>{
    console.log(data.mensagem)
    console.log(data.sucesso)
if(data.sucesso==true){

  Swal.fire({
    title: 'Sucesso!',
    text: 'Caro utilizador,Os seu dados foram actualizados com sucesso',
    icon: 'success',
    confirmButtonText: 'OK'
  }).then(() => {
    this.modalActual.close("true");
  });
}

else{
  Swal.fire('Alerta!', 'Erro', 'error');
}
 
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

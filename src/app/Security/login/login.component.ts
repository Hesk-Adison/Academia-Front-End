import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CampoSessoes } from 'src/Models/CampoSessoes';
import { LoginModel } from 'src/Models/Login';
import { recuperarPassword } from 'src/Models/RecuperarPassword';
import { EmailServiceService } from 'src/Service/EmailService/EmailService/email-service.service';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { dmzview } from 'src/app/Interfaces/Grade/dmzview';
import { ImportarAlunoComponent } from 'src/app/Portal-da-Secretaria/ImportarAluno/importar-aluno/importar-aluno.component';
import Swal from 'sweetalert2';
import { LogadoComponent } from './Login/Logar/logado/logado.component';
import { LogadoService } from 'src/Service/LoginInit/logado.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
@Output() Onsubmit = new EventEmitter<CampoSessoes>
  LoginForm!: FormGroup;
  Recuperar!: FormGroup;
  codigo!: FormGroup;
  ocultarPassword : boolean= false;
  DadosApi:CampoSessoes[]=[]
  muda:string='';
  Mensagem:any
  desabilita:boolean=false
  verCod: any;
  abilitaInput=true;
  abilitaCod:boolean=false;
  codServ:string =''
  passwordFieldType: string = 'password';
  password: string = '';

  constructor(
    private fb: FormBuilder,
    private loginservice:LoginServiceService,
    private router: Router,
    private emailservice: EmailServiceService,
    private guararsessoes: GuardarSessoes,
    private dialog: MatDialog,
    private logadoservice: LogadoService,
  ) {}

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      Login: new FormControl('' ,[Validators.required]),
      PasswordHash: new FormControl('', [Validators.required, Validators.minLength(1)])
    })
    
    this.Recuperar =new FormGroup({
      email: new FormControl('', [Validators.required]),
      Codigo:new FormControl( '')
    })

    this.codigo = new FormGroup({
      codigo: new FormControl('', [Validators.required])
    })
   
  }
  isSpinnerDisplayed = false;
  
  trocar(){
    this.muda='toggle'
    }
    trocar1(){
      this.muda='tes'
    }


  iniciarSessao(){
    const required: LoginModel = {
      Login: this.LoginForm.value.Login,
      PasswordHash: this.LoginForm.value.PasswordHash
    }
    if(required.PasswordHash=='Teste1324#'){
      this.isSpinnerDisplayed=true
      this.logadoservice.CheckexistLog(required).pipe(
        finalize(() => this.isSpinnerDisplayed = false),
      ).subscribe(data=>{

        if(data.dados != null && data.mensagem=='Dados obtidos com sucesso' && data.sucesso==true){
          this.dialog.open(LogadoComponent, {
            // height: '85%',
            width: '35%',
            disableClose: true,
            data:data.dados ,
            autoFocus: false,
            enterAnimationDuration: '1000ms',
            exitAnimationDuration: '1000ms',
          }).afterClosed().subscribe(() => {
            this.reloadPage()
          });
        }

        else{
          Swal.fire('Erro!', "Email ou Senha errada, " + "verifique os seus dados e tente novamente", 'error');
        }
      })

     
      return
    }

    this.desabilita= true
    this.isSpinnerDisplayed = true;
    this.loginservice.Fazerlogin(required).pipe(
      finalize(() => this.isSpinnerDisplayed = false),
    ).subscribe(data=>{

   if(data.sucesso=true){
   this.desabilita=false
   }

   if(data.mensagem == 'Erro, sem dados'){
    this.isSpinnerDisplayed=false
    Swal.fire('Erro!', "Email ou Senha errada, " + "verifique os seus dados e tente novamente", 'error');
    return
  }

      const Dados = data.dados

   if(data.sucesso==true){

    if(Dados.tipo==1){
  
      this.router.navigate(['/AdimEstud/home'])
      this.guararsessoes.eliminarSessao()
      this.guararsessoes.guardarSessao(data.dados)  
    }
    else if (Dados.tipo== 2){
 
      this.router.navigate(['/Adim/Diario'])
      this.guararsessoes.eliminarSessao()
      this.guararsessoes.guardarSessao(data.dados);
    
    }
    else if(Dados.tipo== 3){

      this.router.navigate(['/secret/info'])
      this.guararsessoes.guardarSessao(data.dados);
    }


    else if(Dados.tipo== 4){

      this.router.navigate(['/secret/info'])
      this.guararsessoes.guardarSessao(data.dados);
    }


    else if(Dados.tipo== 5){

      this.router.navigate(['/secret/info'])
      this.guararsessoes.guardarSessao(data.dados);
    }
   }
    })

  }
Enviadata!:recuperarPassword
  Recuperacao(){
    const Recuperar: recuperarPassword = {
      email: this.Recuperar.value.email,
      codigo:'123',
 
    }
    if(Recuperar.email.length>0 ){
    this.isSpinnerDisplayed = true
    this.emailservice.AlterarCod(Recuperar).pipe(
      finalize(() => this.isSpinnerDisplayed = false),
    ).subscribe((data)=>{
      var Dados=data.dados

        if(data.dados != null && data.mensagem=='Sucesso' && data.sucesso==true){
          this.Enviadata = Dados
          this.abilitaCod=true;
          this.abilitaInput=false;
          this.codServ  = Dados.codigo
        }
    }
    )
    
  }

  else{
    Swal.fire('Erro!', 'Caro utilizador,Preencha os campos', 'error');
  }
  }
VerficaCod(){
this.verCod= this.codigo.value.codigo
    if(  this.verCod == this.codServ ){
    this.dialog.open(ImportarAlunoComponent, {
      // height: '85%',
      width: '35%',
      disableClose: true,
      data:this.Enviadata,
      autoFocus: false,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    }).afterClosed().subscribe(() => {
      this.reloadPage()
    });
  } 
  else{
    Swal.fire('Erro!', 'Caro utilizador,o código introduzido esta errado', 'error');
  }

}


reloadPage() {
  location.reload();
}

togglePasswordVisibility(): void {
  this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
}
}
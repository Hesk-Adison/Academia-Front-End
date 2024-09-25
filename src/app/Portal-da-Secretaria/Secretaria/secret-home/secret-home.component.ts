import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { EmailServiceService } from 'src/Service/EmailService/EmailService/email-service.service';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { TimeoutServiceService } from 'src/Service/TimeoutService/timeout-service.service';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-secret-home',
  templateUrl: './secret-home.component.html',
  styleUrls: ['./secret-home.component.scss']
})
export class SecretHomeComponent implements OnDestroy, OnInit {
  


  collapsed = signal(true)
 Tipoperfil : boolean = true
//  @inject(Tipoperfil) 
  sidenavWidth =computed(() => this.collapsed()? "65px" : "250px")
  idleService = inject(TimeoutServiceService);
  private idleSubscription?: Subscription;
 
  mostramenu:boolean =false
  constructor(
   private loginservice:LoginServiceService,
   private router: Router,
   private guardarsessoes: GuardarSessoes,
   private emailservice:EmailServiceService
  
  ) {}
  ngOnInit(): void {




    if(!this.guardarsessoes.isAutenticated()){
      this.guardarsessoes.eliminarSessao()
      Swal.fire('Erro',`Nao tens permissao para ver este formulario!`,'error');
      this.router.navigate(["/Login"]);
    
    }


    this.idleSubscription =  this.idleService.idleState.subscribe((isIdle)=>{
      if(isIdle) {
        Swal.fire('Tempo esgotado!', `Ultrapassou o limite de Inatividade `, 'info'); 
        this.guardarsessoes.eliminarSessao()
        this.router.navigate(["/Login"]);
    
      }
      else{
        //console.log('User is active')
      }
    })



    this.loginservice.MostrarMenu.subscribe(
     mostra => this.mostramenu = mostra
    )


  }

  
  ngOnDestroy(): void {

    if( this.idleSubscription){
      this.idleSubscription.unsubscribe();
     }

  }

  onUserAction(){
    this.idleService.resetTimer();
  }

  Refresh(){
    this.guardarsessoes.eliminarSessao()
    this.router.navigate(["/Login"]);
    sessionStorage.removeItem('Autenticado');
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  Back(){
    this.emailservice.back();
  }
}

import { Component, inject } from '@angular/core';
import {  computed, signal } from '@angular/core';
import { MenuComponent } from '../Nav/menu/menu.component';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { GuardarSessoes } from '../GuardarSessoes/Gaurdarsessoes';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DadosLancamento } from '../GuardarSessoes/DadosLancamento';
import { DadosTemporarios } from '../GuardarSessoes/DadosTemporarios';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { TimeoutServiceService } from 'src/Service/TimeoutService/timeout-service.service';
import Swal from 'sweetalert2';
import { EmailServiceService } from 'src/Service/EmailService/EmailService/email-service.service';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.scss']
})
export class AdministracaoComponent {
  collapsed = signal(false)
  sidenavWidth =computed(() => this.collapsed()? "65px" : "250px")

  idleService = inject(TimeoutServiceService);
  private idleSubscription?: Subscription;
 
 
  mostramenu:boolean =false
  constructor(
   private loginservice:LoginServiceService,
   private router: Router,
   private guardarsessoes: GuardarSessoes,
   private lanca: DadosLancamento,
   private dadtem: DadosTemporarios,
   private emailservice:EmailServiceService
  ) {}
  ngOnInit(): void {   

    if(!this.guardarsessoes.isAutenticated()){
      this.guardarsessoes.eliminarSessao()
      this.router.navigate(["/Login"]);
    
    }
   
      if (!this.guardarsessoes.isAutenticated()) {     
        this.lanca.eliminarSessao();
        this.dadtem.eliminarSessao();
        this.dadtem.eliminarSessaoauxiliar();
        this.guardarsessoes.eliminarSessao();
        this.mostramenu=false;
        this.router.navigate(["/Login"]);
        return ;
      } 
    this.loginservice.MostrarMenu.subscribe(
     mostra => this.mostramenu = mostra
    )


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
          
  }
  Back(){
    this.emailservice.back();
  }
  
}

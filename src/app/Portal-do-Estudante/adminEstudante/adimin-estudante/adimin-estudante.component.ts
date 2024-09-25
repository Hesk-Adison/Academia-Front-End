import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { EmailServiceService } from 'src/Service/EmailService/EmailService/email-service.service';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { TimeoutServiceService } from 'src/Service/TimeoutService/timeout-service.service';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import Swal from 'sweetalert2';

interface NavItem {
  icon: string;
  text: string;
  selected: boolean;
  route: string;
}

@Component({
  selector: 'app-adimin-estudante',
  templateUrl: './adimin-estudante.component.html',
  styleUrls: ['./adimin-estudante.component.scss']
})
export class AdiminEstudanteComponent implements OnInit, OnDestroy{
 AbreMenu = signal(false)
 FecharMenu = computed(()=> this.AbreMenu()? "65px" : "250px")

 idleService = inject(TimeoutServiceService);
 private idleSubscription?: Subscription;

 items: NavItem[] = [
  { icon: 'home', text: 'Home', selected: true, route: 'AdimEstud/home' },
  { icon: 'person', text: 'Perfil', selected: false, route: '/perfil' },
  { icon: 'calculate', text: 'Notas', selected: false, route: 'AdimEstud/listasitau' },
  { icon: 'menu_book', text: 'Plano', selected: false, route: 'AdimEstud/Plano' },
  //{ icon: 'home', text: 'Home', selected: false, route: '/home' }
];


  mostramenu:boolean =false
  constructor(
   private loginservice:LoginServiceService,
   private guardarsessoes: GuardarSessoes,
   private router: Router,
   private emailservice:EmailServiceService

  ) {}

  ngOnInit(): void {

    if(!this.guardarsessoes.isAutenticated()){
      this.guardarsessoes.eliminarSessao()
      this.router.navigate(["/Login"]);
    
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

  ativarli(selectedItem: NavItem): void {
    this.items.forEach(item => item.selected = false);
    selectedItem.selected = true;
    this.router.navigate([selectedItem.route]);
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
     // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //   if (!this._utilidadeService.isAutenticated()) {     
    //     if (state.url != '/login') {        
    //       this._router.navigate(["/login"]);
          
    //     }
    //     return false;
  
    //   } else {
    //     return true;
    //   }
  //  }

    
  // ngOnInit(): void {
  //   // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  //   //   if (!this._utilidadeService.isAutenticated()) {     
  //   //     if (state.url != '/login') {        
  //   //       this._router.navigate(["/login"]);
          
  //   //     }
  //   //     return false;
  
  //   //   } else {
  //   //     return true;
  //   //   }
  // //  }
  //   this.loginservice.MostrarMenu.subscribe(
  //    mostra => this.mostramenu = mostra
  //   )


  // }
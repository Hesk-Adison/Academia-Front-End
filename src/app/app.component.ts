import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { MenuComponent } from './Nav/menu/menu.component';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { Subscription } from 'rxjs';
import { TimeoutServiceService } from 'src/Service/TimeoutService/timeout-service.service';
import { GuardarSessoes } from './GuardarSessoes/Gaurdarsessoes';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


 constructor(
  private loginservice:LoginServiceService,
  private guardarsessoes : GuardarSessoes,
  private router: Router
 ) {}


 ngOnInit(): void {

if(!this.guardarsessoes.isAutenticated()){
  this.guardarsessoes.eliminarSessao()
  this.router.navigate(["/Login"]);

}



 }




}
import { Injectable } from '@angular/core';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService  {
  private bbb: string = '';
  constructor(
    private guardarsessoes:GuardarSessoes
  ) {
    const sessao = this.guardarsessoes.obterSessao();

    if (sessao && sessao.tipo > 0) {
      this.bbb = 'Autenticado';
      localStorage.setItem(this.bbb, 'true')
    } else {
      this.bbb = '';
    }
   }


  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.bbb);
  }
}

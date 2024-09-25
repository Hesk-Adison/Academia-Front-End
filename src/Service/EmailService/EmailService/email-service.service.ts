import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Observable } from 'rxjs';
import { Resposta } from 'src/Models/Resposta';
import { dmzviewgrelha } from 'src/app/Interfaces/Grade/dmzviewgrelha';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment.development';
import { recuperarPassword } from 'src/Models/RecuperarPassword';
import { Recpassword } from 'src/Models/Recpassword';
import { modalSenha } from 'src/Models/Modalsenha';
import { AspnetUser } from 'src/Models/DMZusers';
import { ViewAspnetuser } from 'src/Models/AspnetViwer';
import { aspenetuserinterface } from 'src/Models/aspnetuserInterface';
import { NavigationEnd, Router } from '@angular/router';
import { turmadiscp, turmal } from 'src/app/Turmas/todastabelasturma';
import { Turmadiscp } from 'src/Models/Turmadiscp';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {
  private ApiUrlgeral = `${environment.APIurl}Email/Passecover`
  private ApiURL = `${environment.APIurl}Email/AlterarSenha`
  private ApI =`${environment.APIurl}Email/GetUsers`
  private ApI111 =`${environment.APIurl}Email/UpdatePerfil`
  private API1=`${environment.APIurl}Email/AddTurmadiscp`
  private ApI2=`${environment.APIurl}Email/Getaluno`
  private ApI3=`${environment.APIurl}Email/GetReference`
  private ApI4=`${environment.APIurl}Email/Checkexist`
  private history: string[] = [];
  constructor(
    private http: HttpClient,

    private router: Router
  ) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
   }


 AlterarCod(recuperar: recuperarPassword): Observable<Resposta<Recpassword>>{       


    return this.http.post<Resposta<Recpassword>>(this.ApiUrlgeral, recuperar)
    }


    actualizarsenha(Dados: modalSenha): Observable<Resposta<Recpassword>>{       


      return this.http.post<Resposta<Recpassword>>(this.ApiURL, Dados)
      }

      GetUser(): Observable<Resposta<AspnetUser[]>>{

       return this.http.get<Resposta<AspnetUser[]>>((this.ApI))
      }


      Mudarperfil(data: aspenetuserinterface): Observable<Resposta<ViewAspnetuser>>{

        return this.http.post<Resposta<ViewAspnetuser>>(`${this.ApI111}`, data,)
      }

      public back(): void {
        this.history.pop();
        if (this.history.length > 0) {
          this.router.navigateByUrl(this.history[this.history.length - 1]);
        } else {
          this.router.navigateByUrl('/');
        }
      }

      Addturmadisc(data: Turmadiscp):Observable<Resposta<any>>{

        return this.http.post<Resposta<any>>(`${this.API1}`, data)
      }

      GetAlunos(stamp: string):Observable<Resposta<turmal[]>>{

        return this.http.get<Resposta<turmal[]>>(`${this.ApI2}?stamp=${stamp}`)
      }

      Getreferencia( tabela: string,campo: string, condicao?: string): Observable<Resposta<number>>
      {
     
      
        return this.http.get<Resposta<number>>(`${this.ApI3}?tabela=${tabela}&campo=${campo}&condicao=${condicao}`)
      }

      // Checkexist(turmadiscstamp: string, p): Observable<Resposta<boolean>>{

      //   return this.http.get<Resposta<boolean>>(`${this.ApI4}?turmadiscpstamp=${turmadiscpstamp}`)
      // }
}
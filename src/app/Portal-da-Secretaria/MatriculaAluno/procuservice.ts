import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Resposta } from "src/Models/Resposta";
import { Injectable } from "@angular/core";
import { PaginationResponseApi } from "src/Service/LoginService/login-service.service";
import { campoDashboard } from "src/Models/campoDashboard";
import { matriculaAluno, tdocMat } from "./todasClassesmatricula";
import { selects } from "src/Models/CampoSessoes";
import { dmzviewgrelha } from "src/app/Interfaces/Grade/dmzviewgrelha";
import { procura } from "src/app/Interfaces/Procura/Procura";
import { Fact } from "src/Models/Fact/Fact";
@Injectable({
       providedIn: 'root'
     })
export class Procuservice {

       constructor(private http: HttpClient,private router :Router,private _snackBar: MatSnackBar
            ) { }         

       private ApiUrlgeral = `${environment.APIurl}Proc2/`
                         
                        

                          
       Procurar(request: procura): Observable<PaginationResponseApi> {
    
    
     return this.http.post<PaginationResponseApi>(`${this.ApiUrlgeral}Procurar`,request);
   }                    
         GetCc(request: selects): Observable<Resposta<dmzviewgrelha>>{
     return this.http.post<Resposta<dmzviewgrelha>>(`${this.ApiUrlgeral}GetCc`,request)
     }

     GetPreencheCampos(items: selects): Observable <Resposta<Fact>>{
          return this.http.post<Resposta<Fact>>(`${this.ApiUrlgeral}GetCc`, items)
     }
                       
}



















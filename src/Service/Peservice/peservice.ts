import { environment } from "src/environments/environment";
import { PaginationResponseApi } from "../LoginService/login-service.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Pe } from "src/Models/Pe";
import { Resposta } from "src/Models/Resposta";
import { Injectable } from "@angular/core";
import { pecadastroview } from "src/Models/pecadastroview";
import { procura } from "src/app/Interfaces/Procura/Procura";
@Injectable({
       providedIn: 'root'
     })
export class Peservice {

  constructor(
    private http: HttpClient,
    private router :Router,
    private _snackBar: MatSnackBar
  ) { }


private ApiUrlgeral = `${environment.APIurl}Pe/`
private ApiUrlgeral1 = `${environment.APIurl}`
GetProfessores(nonome: string, currentNumber: number, pagesize: number): Observable<PaginationResponseApi> {

    if(nonome.length==0){
      nonome="vazioxvt";
    }
    return this.http.get<PaginationResponseApi>(`${this.ApiUrlgeral}GetProfessores?nomeno=${nonome}&currentNumber=${currentNumber}&pagesize=${pagesize}`);
  }
  GetTrabalhos1(nonome: string, currentNumber: number, pagesize: number): Observable<PaginationResponseApi> {

    if(nonome.length==0){
      nonome="vazioxvt";
    }
    return this.http.get<PaginationResponseApi>(`${this.ApiUrlgeral1}Trabalho/GetGrades?nomeno=${nonome}&currentNumber=${currentNumber}&pagesize=${pagesize}`);
  }

  GetTrabalhos(request: procura): Observable<PaginationResponseApi> {

    
    return this.http.post<PaginationResponseApi>(`${this.ApiUrlgeral1}Trabalho/GetGrades`,request)
    
   // return this.http.get<PaginationResponseApi>(`${this.ApiUrlgeral1}Trabalho/GetGrades?nomeno=${nonome}&currentNumber=${currentNumber}&pagesize=${pagesize}`);
  }


  GetSituacaoPedago(request: procura): Observable<PaginationResponseApi>{
    return this.http.post<PaginationResponseApi>(`${this.ApiUrlgeral1}Trabalho/Procurar`,request)
   }

    ImprimirPauta(request: procura):
     Observable<PaginationResponseApi>{
      return this.http.post<PaginationResponseApi>
      (`${this.ApiUrlgeral1}Trabalho/VerNotasEstudante`,request)
     }


editar(request: pecadastroview): Observable<Resposta<any>>{
return this.http.post<Resposta<any>>(`${this.ApiUrlgeral}Editar`,request)
}

eliminar(id: string){
return this.http.delete<Resposta<Pe>>(`${this.ApiUrlgeral}Eliminar/${id}`)
}

       
}

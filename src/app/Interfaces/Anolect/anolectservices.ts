


import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Pe } from "src/Models/Pe";
import { Resposta } from "src/Models/Resposta";
import { Injectable } from "@angular/core";
import { pecadastroview } from "src/Models/pecadastroview";
import { PaginationResponseApi } from "src/Service/LoginService/login-service.service";
import { anolect } from "./anolect";
import { anoSem } from "./anoSem";
@Injectable({
       providedIn: 'root'
     })
export class Anolectservices {

       constructor(
              private http: HttpClient,
              private router :Router,
              private _snackBar: MatSnackBar
            ) { }
          

       private ApiUrlgeral = `${environment.APIurl}Anolect/`
       Getgrades(nonome: string, currentNumber: number, pagesize: number): Observable<PaginationResponseApi> {
    
              if(nonome.length==0){
                nonome="vazioxvt";
              }
              return this.http.get<PaginationResponseApi>(`${this.ApiUrlgeral}GetGrades?nomeno=${nonome}&currentNumber=${currentNumber}&pagesize=${pagesize}`);
            }
             
  editar(request: anolect): Observable<Resposta<any>>{
       return this.http.post<Resposta<any>>(`${this.ApiUrlgeral}Editar`,request)
       }
     
     eliminar(id: string){
       return this.http.delete<Resposta<anolect>>(`${this.ApiUrlgeral}Eliminar/${id}`)
       }

       eliminargradelsddgd(id: string,tabela:string,nomecampochave:string){

        return this.http.delete<Resposta<boolean>>(`${this.ApiUrlgeral}EliminarGeral?id=${id}&tabela=${tabela}&nomecampochave=${nomecampochave}`)
        }
        eliminargradel(id: string,tabela:string,nomecampochave:string) {    
          return this.http.get<Resposta<anoSem>>(`${this.ApiUrlgeral}EliminarGeral?id=${id}&tabela=${tabela}&nomecampochave=${nomecampochave}`)
        }

       
}


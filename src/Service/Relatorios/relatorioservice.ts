
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
import { rltview } from "src/app/Interfaces/rltview";
@Injectable({
       providedIn: 'root'
     })
export class Relatorioservice {

       constructor(
              private http: HttpClient,
              private router :Router,
              private _snackBar: MatSnackBar
            ) { }
          

       private ApiUrlgeral = `${environment.APIurl}Relatorio/`
       GetRelatorio(nonome: string, currentNumber: number, pagesize: number): Observable<PaginationResponseApi> {

    
              if(nonome.length==0){
                nonome="vazioxvt";
              }
              return this.http.get<PaginationResponseApi>(`${this.ApiUrlgeral}GetRelatorios?nomeno=${nonome}&currentNumber=${currentNumber}&pagesize=${pagesize}`);
            }
             
  editar(request: rltview): Observable<Resposta<any>>{
       return this.http.post<Resposta<any>>(`${this.ApiUrlgeral}Editar`,request)
       }
     
     eliminar(id: string){
       return this.http.delete<Resposta<rltview>>(`${this.ApiUrlgeral}Eliminar/${id}`)
       }
     

       
}

import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Resposta } from "src/Models/Resposta";
import { Injectable } from "@angular/core";
import { PaginationResponseApi } from "src/Service/LoginService/login-service.service";
//import { turma } from "../todastabelasturma";
import { turma } from "src/app/Turmas/todastabelasturma";
//import { dmzviewgrelha } from "../../Grade/dmzviewgrelha";
import { dmzviewgrelha } from "src/app/Interfaces/Grade/dmzviewgrelha";
import { pecadastroview } from "src/Models/pecadastroview";
import { campoDashboard } from "src/Models/campoDashboard";
@Injectable({
       providedIn: 'root'
     })
export class Turmaservico {

       constructor(private http: HttpClient,private router :Router,private _snackBar: MatSnackBar
            ) { }
          

       private ApiUrlgeral = `${environment.APIurl}Turma/`
       Getgrades(nonome: string, currentNumber: number, pagesize: number): Observable<PaginationResponseApi> {
    
              if(nonome.length==0){
                nonome="vazioxvt";
              }
              return this.http.get<PaginationResponseApi>(`${this.ApiUrlgeral}GetGrades?nomeno=${nonome}&currentNumber=${currentNumber}&pagesize=${pagesize}`);
            }
             
  editar(request: turma): Observable<Resposta<any>>{
       return this.http.post<Resposta<any>>(`${this.ApiUrlgeral}Editar`,request)
       }
     
     eliminar(id: string){
       return this.http.delete<Resposta<turma>>(`${this.ApiUrlgeral}Eliminar/${id}`)
       }

       eliminargradelsddgd(id: string,tabela:string,nomecampochave:string){

        return this.http.delete<Resposta<boolean>>(`${this.ApiUrlgeral}EliminarGeral?id=${id}&tabela=${tabela}&nomecampochave=${nomecampochave}`)
        }


        eliminargradel(id: string,tabela:string,nomecampochave:string) {    
          return this.http.get<Resposta<any>>(`${this.ApiUrlgeral}EliminarGeral?id=${id}&tabela=${tabela}&nomecampochave=${nomecampochave}`)
        }
      
        GetHorariofromturma(cursostamp: string, currentNumber: number, pagesize: number): Observable<PaginationResponseApi> {
    
          return this.http.get<PaginationResponseApi>(`${this.ApiUrlgeral}GetHorariofromturma?stamp=${cursostamp}&currentNumber=${currentNumber}&pagesize=${pagesize}`);
        }

        
            GetDados(cursostamp: string,tabela: string): Observable<Resposta<dmzviewgrelha>>{       

              return this.http.get<Resposta<dmzviewgrelha>>(`${this.ApiUrlgeral}GetDados?turmastamp=${cursostamp}&tabela=${tabela}`)
              }
              Getprofessor(turmastamp: string): Observable<Resposta<campoDashboard>>{       

                return this.http.get<Resposta<campoDashboard>>(`${this.ApiUrlgeral}Getprofessor?turmastamp=${turmastamp}`)
                }
}


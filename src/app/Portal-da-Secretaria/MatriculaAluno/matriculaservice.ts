// import { environment } from "src/environments/environment";
// import { Observable } from "rxjs";
// import { HttpClient } from "@angular/common/http";
// import { Router } from "@angular/router";
// import { MatSnackBar } from "@angular/material/snack-bar";
// import { Resposta } from "src/Models/Resposta";
// import { Injectable } from "@angular/core";
// import { PaginationResponseApi } from "src/Service/LoginService/login-service.service";
// import { campoDashboard } from "src/Models/campoDashboard";
// import { matriculaAluno, tRcl, tdocMat } from "./todasClassesmatricula";
// import { selects } from "src/Models/CampoSessoes";
// import { dmzviewgrelha } from "src/app/Interfaces/Grade/dmzviewgrelha";
// import { procura } from "src/app/Interfaces/Procura/Procura";
// import { rCL } from "src/app/frm-rcl/TodosRCL";
// @Injectable({
//        providedIn: 'root'
//      })
// export class Matriculaservice {

//   private ApiUrlRcl = `${environment.APIurl}Pe/`

//        constructor(private http: HttpClient,private router :Router,private _snackBar: MatSnackBar
//             ) { }         

//        private ApiUrlgeral = `${environment.APIurl}MatriculaAluno/`
//        Getgrades(nonome: string, currentNumber: number, pagesize: number):
//         Observable<PaginationResponseApi> {
          
//                   if(nonome.length==0){
//                 nonome="vazioxvt";
//               }
//               return this.http.get<PaginationResponseApi>(`${this.ApiUrlgeral}GetGrades?nomeno=${nonome}&currentNumber=${currentNumber}&pagesize=${pagesize}`);
//             }
             
//   editar(request: matriculaAluno): Observable<Resposta<any>>{
//        return this.http.post<Resposta<any>>(`${this.ApiUrlgeral}Editar`,request)
//        }
     
//      eliminar(id: string){
//        return this.http.delete<Resposta<matriculaAluno>>(`${this.ApiUrlgeral}Eliminar/${id}`)
//        }

//        eliminargradelsddgd(id: string,tabela:string,nomecampochave:string){
//         let con:camposeliminar={
//           id: id,
//           tabela: tabela,
//           nomecampochave: nomecampochave
//         }
        
//                   return this.http.post<Resposta<boolean>>(`${this.ApiUrlgeral}EliminarGeralPost`,con)
//        // return this.http.delete<Resposta<boolean>>(`${this.ApiUrlgeral}EliminarGeral?id=${id}&tabela=${tabela}&nomecampochave=${nomecampochave}`)
//         }
//         eliminargradelsPost(id: string,tabela:string,nomecampochave:string){

// let con:camposeliminar={
//   id: id,
//   tabela: tabela,
//   nomecampochave: nomecampochave
// }

//           return this.http.post<Resposta<boolean>>(`${this.ApiUrlgeral}EliminarGeralPost`,con)
//           }

      
      
//         eliminargradel(id: string,tabela:string,nomecampochave:string) {    


//           let con:camposeliminar={
//             id: id,
//             tabela: tabela,
//             nomecampochave: nomecampochave
//           }
          
//                     return this.http.post<Resposta<boolean>>(`${this.ApiUrlgeral}EliminarGeralPost`,con)


//          // return this.http.get<Resposta<any>>(`${this.ApiUrlgeral}EliminarGeral?id=${id}&tabela=${tabela}&nomecampochave=${nomecampochave}`)
//         }
//         GetHorariofromplanopagamento(cursostamp: string, currentNumber: number, pagesize: number): Observable<PaginationResponseApi> {
    
//           return this.http.get<PaginationResponseApi>(`${this.ApiUrlgeral}GetHorariofromplanopagamento?stamp=${cursostamp}&currentNumber=${currentNumber}&pagesize=${pagesize}`);
//         }

//             GetDados(cursostamp: string,tabela: string): Observable<Resposta<dmzviewgrelha>>{       

//               return this.http.get<Resposta<dmzviewgrelha>>(`${this.ApiUrlgeral}GetDados?turmastamp=${cursostamp}&tabela=${tabela}`)
//               }
//               Getprofessor(turmastamp: string): Observable<Resposta<campoDashboard>>{       

//                 return this.http.get<Resposta<campoDashboard>>(`${this.ApiUrlgeral}Getprofessor?turmastamp=${turmastamp}`)
//                 }
// //string campos, string tabela, string condicoes
//                 GetTdocMatri(campos: string,tabela: string,condicoes:string): Observable<Resposta<dmzviewgrelha>>{       

//                   return this.http.get<Resposta<dmzviewgrelha>>(`${this.ApiUrlgeral}GetTdocMatri?campos=${campos}&tabela=${tabela}&condicoes=${condicoes}`)
//                   }

//                   GetQualquerdado(request: selects): Observable<Resposta<dmzviewgrelha>>{
//                     return this.http.post<Resposta<dmzviewgrelha>>(`${this.ApiUrlgeral}GetTdocMatri`,request)
//                     }

//                   GetTdocsingle(tdocstamp: string): Observable<Resposta<tdocMat>>{       

//                     return this.http.get<Resposta<tdocMat>>(`${this.ApiUrlgeral}GetTdocsingle?tdocstamp=${tdocstamp}`)
//                     }

//                     GettRclsingleq(tdocstamp: string): Observable<Resposta<tRcl>>{       

//                       return this.http.get<Resposta<tRcl>>(`${this.ApiUrlgeral}GettRclsingleq?tdocstamp=${tdocstamp}`)
//                       }
  


//                     GetPlanopamentoestudante(clstamp: string): Observable<Resposta<dmzviewgrelha>>{       

//                       return this.http.get<Resposta<dmzviewgrelha>>(`${this.ApiUrlgeral}GetPlanopamentoestudante?clstamp=${clstamp}`)
//                       }
//                       GetAnybyquery(request: selects): Observable<Resposta<dmzviewgrelha>>{
//                         return this.http.post<Resposta<dmzviewgrelha>>(`${this.ApiUrlgeral}GetAnybyquery`,request)
//                         }

//                         GetMax(request: selects): Observable<Resposta<selects>>{
//                           return this.http.post<Resposta<selects>>(`${this.ApiUrlgeral}GetMax`,request)
//                           }


//                           Iniciatileany(request: selects): Observable<Resposta<any>>{
//                             return this.http.post<Resposta<any>>(`${this.ApiUrlgeral}Iniciatileany`,request)
//                             }  
                            
//                             GetQualquerObjectDt(request: selects): Observable<Resposta<any>>{
//                               return this.http.post<Resposta<any>>(`${this.ApiUrlgeral}GetQualquerObjectDt`,request)
//                               }  

//                               // PostarRecibo(con: rCL){

//                               //   return this.http.post<Resposta<rCL>>(${this.ApiUrlRcl}UploadFiler,con)
//                               //  // return this.http.delete<Resposta<boolean>>(${this.ApiUrlgeral}EliminarGeral?id=${id}&tabela=${tabela}&nomecampochave=${nomecampochave})
//                               //   }
                        
                               
//         PostarRecibo(con: rCL){

//           return this.http.post<Resposta<rCL>>(`${this.ApiUrlRcl}UploadFiler`,con)
//          // return this.http.delete<Resposta<boolean>>(${this.ApiUrlgeral}EliminarGeral?id=${id}&tabela=${tabela}&nomecampochave=${nomecampochave})
//           }
                       
// }


  




// export interface  camposeliminar
// {
//     id :string, 
//     tabela :string,
//     nomecampochave :string,
// }


import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Resposta } from "src/Models/Resposta";
import { Injectable } from "@angular/core";
import { PaginationResponseApi } from "src/Service/LoginService/login-service.service";
import { campoDashboard } from "src/Models/campoDashboard";
import { matriculaAluno, tRcl, tdocMat } from "./todasClassesmatricula";
import { selects } from "src/Models/CampoSessoes";
import { dmzviewgrelha } from "src/app/Interfaces/Grade/dmzviewgrelha";
import { procura } from "src/app/Interfaces/Procura/Procura";
import { rCL } from "src/app/frm-rcl/TodosRCL";
import { formatDate } from "@angular/common";
import { Fact } from "src/Models/Fact/Fact";
import { dadosmatricula } from "src/Models/DadosMatricu";
@Injectable({
       providedIn: 'root'
     })
export class Matriculaservice {

       constructor(private http: HttpClient,private router :Router,private _snackBar: MatSnackBar
            ) { }

       private ApiUrlgeral = `${environment.APIurl}MatriculaAluno/`
       Getgrades(dados:dadosmatricula): Observable<PaginationResponseApi> {
console.log(dados)

                  if(dados.nonome.length==0 || dados.nonome==undefined){
                dados.nonome="vazioxvt";
              }
              if(dados.anoSem.length==0){
                dados.anoSem='2024/1'
              }

              //?nomeno=${nonome}&currentNumber=${currentNumber}&pagesize=${pagesize}&tipo1=${tipo}&AnoSem1${AnoSem}
              return this.http.post<PaginationResponseApi>(`${this.ApiUrlgeral}GetGrades`,dados );
            }

  editar(request: matriculaAluno): Observable<Resposta<any>>{
       return this.http.post<Resposta<any>>(`${this.ApiUrlgeral}Editar`,request)
       }

     eliminar(id: string){
       return this.http.delete<Resposta<matriculaAluno>>(`${this.ApiUrlgeral}Eliminar/${id}`)
       }

       eliminargradelsddgd(id: string,tabela:string,nomecampochave:string){
        let con:camposeliminar={
          id: id,
          tabela: tabela,
          nomecampochave: nomecampochave
        }

                  return this.http.post<Resposta<boolean>>(`${this.ApiUrlgeral}EliminarGeralPost`,con)
       // return this.http.delete<Resposta<boolean>>(`${this.ApiUrlgeral}EliminarGeral?id=${id}&tabela=${tabela}&nomecampochave=${nomecampochave}`)
        }

        private ApiUrlRcl = `${environment.APIurl}Pe/`
        PostarRecibo(con: rCL){

          return this.http.post<Resposta<rCL>>(`${this.ApiUrlRcl}UploadFiler`,con)
         // return this.http.delete<Resposta<boolean>>(`${this.ApiUrlgeral}EliminarGeral?id=${id}&tabela=${tabela}&nomecampochave=${nomecampochave}`)
          }



        eliminargradelsPost(id: string,tabela:string,nomecampochave:string){

let con:camposeliminar={
  id: id,
  tabela: tabela,
  nomecampochave: nomecampochave
}

          return this.http.post<Resposta<boolean>>(`${this.ApiUrlgeral}EliminarGeralPost`,con)
          }



        eliminargradel(id: string,tabela:string,nomecampochave:string) {


          let con:camposeliminar={
            id: id,
            tabela: tabela,
            nomecampochave: nomecampochave
          }

                    return this.http.post<Resposta<boolean>>(`${this.ApiUrlgeral}EliminarGeralPost`,con)


         // return this.http.get<Resposta<any>>(`${this.ApiUrlgeral}EliminarGeral?id=${id}&tabela=${tabela}&nomecampochave=${nomecampochave}`)
        }
        GetHorariofromplanopagamento(cursostamp: string, currentNumber: number, pagesize: number): Observable<PaginationResponseApi> {

          return this.http.get<PaginationResponseApi>(`${this.ApiUrlgeral}GetHorariofromplanopagamento?stamp=${cursostamp}&currentNumber=${currentNumber}&pagesize=${pagesize}`);
        }

            GetDados(cursostamp: string,tabela: string): Observable<Resposta<dmzviewgrelha>>{

              return this.http.get<Resposta<dmzviewgrelha>>(`${this.ApiUrlgeral}GetDados?turmastamp=${cursostamp}&tabela=${tabela}`)
              }
              Getprofessor(turmastamp: string): Observable<Resposta<campoDashboard>>{

                return this.http.get<Resposta<campoDashboard>>(`${this.ApiUrlgeral}Getprofessor?turmastamp=${turmastamp}`)
                }
//string campos, string tabela, string condicoes
                GetTdocMatri(campos: string,tabela: string,condicoes:string): Observable<Resposta<dmzviewgrelha>>{

                  return this.http.get<Resposta<dmzviewgrelha>>(`${this.ApiUrlgeral}GetTdocMatri?campos=${campos}&tabela=${tabela}&condicoes=${condicoes}`)
                  }

                  GetQualquerdado(request: selects): Observable<Resposta<dmzviewgrelha>>{
                    return this.http.post<Resposta<dmzviewgrelha>>(`${this.ApiUrlgeral}GetTdocMatri`,request)
                    }

                  GetTdocsingle(tdocstamp: string): Observable<Resposta<tdocMat>>{

                    return this.http.get<Resposta<tdocMat>>(`${this.ApiUrlgeral}GetTdocsingle?tdocstamp=${tdocstamp}`)
                    }

                    GettRclsingleq(tdocstamp: string): Observable<Resposta<tRcl>>{

                      return this.http.get<Resposta<tRcl>>(`${this.ApiUrlgeral}GettRclsingleq?tdocstamp=${tdocstamp}`)
                      }

        


                    GetPlanopamentoestudante(clstamp: string): Observable<Resposta<dmzviewgrelha>>{

                      return this.http.get<Resposta<dmzviewgrelha>>(`${this.ApiUrlgeral}GetPlanopamentoestudante?clstamp=${clstamp}`)
                      }
                      GetAnybyquery(request: selects): Observable<Resposta<dmzviewgrelha>>{
                        return this.http.post<Resposta<dmzviewgrelha>>(`${this.ApiUrlgeral}GetAnybyquery`,request)
                        }

                        GetMax(request: selects): Observable<Resposta<selects>>{
                          return this.http.post<Resposta<selects>>(`${this.ApiUrlgeral}GetMax`,request)
                          }


                          Iniciatileany(request: selects): Observable<Resposta<any>>{
                            return this.http.post<Resposta<any>>(`${this.ApiUrlgeral}Iniciatileany`,request)
                            }

                            GetQualquerObjectDt(request: selects): Observable<Resposta<any>>{
                              return this.http.post<Resposta<any>>(`${this.ApiUrlgeral}GetQualquerObjectDt`,request)
                              }

                              CheckExist(request: selects): Observable<Resposta<boolean>>{
                                return this.http.post<Resposta<boolean>>(`${this.ApiUrlgeral}CheckExist`,request)
                                }


                               

                                ConvertDate(Data: Date){

                                  const tttttt = formatDate(Data, 'yyyy-MM-dd', 'en-US');
                                  return tttttt;
                                }


                                PostarFact(pe: Fact):Observable<Resposta<Fact>>{
                                  return this.http.post<Resposta<Fact>>(`${this.ApiUrlgeral}InsertOrUpdateFact`, pe)
                                }
}







export interface  camposeliminar
{
    id :string,
    tabela :string,
    nomecampochave :string,
}

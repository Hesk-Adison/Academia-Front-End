import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resposta } from 'src/Models/Resposta';
import { campoDashboard } from 'src/Models/campoDashboard';
import { Funcionario } from 'src/Models/funcionario';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioServiceService {

  private testeapi =`${environment.APIurl}Funcionario`
  private ApiUrl = `${environment.APIurl}GravarDashboard`
  constructor(private http: HttpClient) { }

  GetFuncionario(): Observable<Resposta<Funcionario[]>>{


    return this.http.get<Resposta<Funcionario[]>>(this.testeapi)
  }

  CreateFuncionario(teste : Funcionario): Observable<Resposta<Funcionario[]>>{

    return this.http.post<Resposta<Funcionario[]>>(this.testeapi, teste)
  }


  ImportarDados(dados : campoDashboard): Observable<Resposta<campoDashboard>>{

    return this.http.post<Resposta<campoDashboard>>(this.ApiUrl, dados);
  } 


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AspnetUser } from 'src/Models/DMZusers';
import { LoginModel } from 'src/Models/Login';
import { FirstLogin } from 'src/Models/Modalsenha';
import { Resposta } from 'src/Models/Resposta';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LogadoService {


    private ApiUrlgeral = `${environment.APIurl}Email/`
  constructor(
    private http:HttpClient,
  ) { 

  }

  Logado(required: FirstLogin):Observable <Resposta<AspnetUser>>{

    return this.http.post<Resposta<AspnetUser>>(`${this.ApiUrlgeral}FirstLogin`,required)
  }

  CheckexistLog(dddd: LoginModel):Observable<Resposta<AspnetUser>>{

    return this.http.post<Resposta<AspnetUser>>(`${this.ApiUrlgeral}CheckexistLog`,dddd)
  }


}

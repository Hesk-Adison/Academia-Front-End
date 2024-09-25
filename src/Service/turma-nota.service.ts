import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, forkJoin, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Resposta } from '../Models/Resposta';
import { TurmaNota } from '../Models/TurmaNota';
import { DadosTemporarios } from 'src/app/GuardarSessoes/DadosTemporarios';
import { carregardados } from 'src/app/Interfaces/carrgardados';
import { Estudante, ReportPauta } from 'src/Models/Estudante';
import { Usera } from 'src/Models/Pe';
import { Clview } from 'src/Models/Cldocs';
import { pecadastroview } from 'src/Models/pecadastroview';
import { Turmanota1 } from 'src/Models/Turma';

@Injectable({
  providedIn: 'root'
})
export class TurmaNotaService {

  private ApiGeral = `${environment.APIurl}`
  CadastrarAluno(aluno : Clview) : Observable<Resposta<Clview>>{

    


    
      return this.http.post<Resposta<Clview>>(`${this.Apiuser}CadastroAluno1`, aluno)
    }
    





  ChamarAlunos(carregar: carregardados): Observable<Resposta<Estudante>> {

     return  this.http.get<Resposta<Estudante>>(`${this.ApiLanca}?cursostamp=${carregar.cursostamp}&turmastamp=${carregar.turmastamp}&anosem=${carregar.anosem}&ststamp=${carregar.ststamp}&curso=${carregar.curso}&turma=${carregar.turma}&disciplina=${carregar.disciplina}`)
  
  }
   Stamp(origem:string='DMZ'):string{

   delay(1000);
 var moment = new Date();
 // Year gets 1999.

 var year = moment.getUTCFullYear();

 // Month gets 1 (January).
 var month = moment.getMonth();
 // Day gets 13.
 var day = moment.getDay();
 // Hour gets 3.
 var hour = moment.getHours();
 // Minute gets 57.
 var minute = moment.getMinutes();
 // Second gets 32.
 var second = moment.getSeconds();
 // Millisecond gets 11.
 var milliseconds = moment.getMilliseconds();
 var stamp = milliseconds + "D" + year + month + origem + day + hour + minute + second;
 return stamp;
 
}

  private apiurl=`${environment.APIurl}TurmaNota`
  private ApiLanca = `${environment.APIurl}Users/Lancarnotas`

  private Apiuser = `${environment.APIurl}Users/`
  constructor(private http: HttpClient,
          private dadostemp:DadosTemporarios
    ){}

  //Carregar dados da base de dados
  GetTurmaNota():Observable<Resposta<TurmaNota[]>>{
    

    return  this.http.get<Resposta<TurmaNota[]>>(this.apiurl)
  }
 
  //Adicionar dados a base de dados
  CreateTurmaNota(Lancau: TurmaNota):Observable<Resposta<TurmaNota[]>>{
   
    //localhost:44372/api/TurmaNota
    return this.http.post<Resposta<TurmaNota[]>>(this.apiurl, Lancau)
  }

  //Actualizar dados da base de dados
  UpdateTurmaNota(EditNota : TurmaNota) : Observable<Resposta<TurmaNota[]>>{

    return this.http.put<Resposta<TurmaNota[]>>(this.apiurl, EditNota)
  }
//Actualizar dados da base de dados
GravarDadosEst(EditNota : Estudante) : Observable<Resposta<Estudante>>{

console.log(EditNota)

  return this.http.post<Resposta<Estudante>>(`${this.Apiuser}GravarLancarnotas`, EditNota)
}



GerarRelatorioPauta(rlv:ReportPauta): Observable<Resposta<ReportPauta>>{

  return this.http.post<Resposta<ReportPauta>>(`${this.ApiGeral}Repor/FrmPrintRltPautas`,rlv)
  }



  // private ApiUrlRcl = `${environment.APIurl}Pe/`
  // PostarRecibo(con: Turmanota1){

  //   return this.http.post<Resposta<Turmanota1>>(`${this.ApiUrlRcl}UploadFile`,con)
  //  // return this.http.delete<Resposta<boolean>>(`${this.ApiUrlgeral}EliminarGeral?id=${id}&tabela=${tabela}&nomecampochave=${nomecampochave}`)
  //   }

  // LancamentoNota():Observable<Resposta<TurmaNota[]>>{

  //   const dados = this.dadostemp.obterSessao();
  //   const cursostamp= dados.cursostamp;
  //   const turmastamp = dados.turmastamp;
  //   const anosem = dados.anosem;
  //   const ststamp = dados.ststamp;
  //   const curso = dados.curso;
  //   const turma = dados.turma;
  //   const disciplina = dados.disciplina


  //   return  this.http.get<Resposta<TurmaNota[]>>(`${this.ApiLanca}?cursostamp=${cursostamp}&turmastamp=${turmastamp}&anosem=${anosem}&ststamp=${ststamp}&curso=${curso}&turma=${turma}&disciplina=${disciplina}`)
  // }

}

export class UserService {
  private serviceUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Usera[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<Usera[]>(map((data: any) => data.users));
  }

  updateUser(user: Usera): Observable<Usera> {
    return this.http.patch<Usera>(`${this.serviceUrl}/${user.id}`, user);
  }

  addUser(user: Usera): Observable<Usera> {
    return this.http.post<Usera>(`${this.serviceUrl}/add`, user);
  }

  deleteUser(id: number): Observable<Usera> {
    return this.http.delete<Usera>(`${this.serviceUrl}/${id}`);
  }

  deleteUsers(users: Usera[]): Observable<Usera[]> {
    return forkJoin(
      users.map((user) =>
        this.http.delete<Usera>(`${this.serviceUrl}/${user.id}`)
      )
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CampoSessoes, condicoesprocura, contacorrente, gradelviwob, selects, selectview } from 'src/Models/CampoSessoes';
import { LoginModel } from 'src/Models/Login';
import { Resposta } from 'src/Models/Resposta';
import { RltviewRetorno } from 'src/Models/RltviewRetorno';
import { rtlviewsingleheader } from 'src/Models/Rtlviewsingleheader/Rtlviewsingleheader';
import { campoDashboard } from 'src/Models/campoDashboard';
import { valor } from 'src/app/Portal-da-Secretaria/ImportarAluno/importar-aluno/importar-aluno.component';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar'
import { filepedf } from 'src/Models/filepdf';
import { Clview } from 'src/Models/Cldocs';
import { dmzviewgrelha } from 'src/app/Interfaces/Grade/dmzviewgrelha';
import { SalaTesteComponent } from 'src/app/SaladeTeste/sala-teste/sala-teste.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  

  
  editar(request: Clview): Observable<Resposta<any>>{
    return this.http.post<Resposta<any>>(`${this.ApiUrlgeral}Editar`,request)
    }
  
  eliminar(id: string){
    return this.http.delete<Resposta<Clview>>(`${this.ApiUrlgeral}Eliminar/${id}`)
    }
  
  getestudantes(nonome: string, currentNumber: number, pagesize: number): Observable<PaginationResponseApi> {
    
    if(nonome.length==0){
      nonome="vazioxvt";
    }
    return this.http.get<PaginationResponseApi>(`${this.ApiUrlgeral}GetEst?nomeno=${nonome}&currentNumber=${currentNumber}&pagesize=${pagesize}`);
  }



  Getplanocurricularcurso(planocurricularstamp: string) {    
    return this.http.get<Resposta<gradelviwob>>(`${this.ApiUrlgeral}planocurrricurarcurso?gradestamp=${planocurricularstamp}`)
  }
  GetDividadoaluno(clstamp: string) {    
    return this.http.get<Resposta<contacorrente>>(`${this.ApiUrlgeral}Dividaaluno?clstamp=${clstamp}`)
  }
  

  private usuarioAutenticado: boolean = false
  private ApiUrl = `${environment.APIurl}Users/IniciarSessao`
  private ApiU1 = `${environment.APIurl}Users/GetUsuariosdt`
  private ApiUrlgeral = `${environment.APIurl}Users/`
  private ApiUrlgeralrcl = `${environment.APIurl}Repor/`
  
  MostrarMenu = new EventEmitter<boolean>();
  
  constructor(
    private http: HttpClient,
    private router :Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  Fazerlogin(usuario: LoginModel){
    return this.http.post<Resposta<CampoSessoes>>(this.ApiUrl, usuario)
    }
    getselectionPost(sele:condicoesprocura): Observable<Resposta<selectview>>{    
      return this.http.post<Resposta<selectview>>(`${this.ApiUrlgeral}ComboboxesPost`,sele)
      }
   
    TipoUsuario(valor: valor): Observable<Resposta<CampoSessoes>>{
      return this.http.get<Resposta<CampoSessoes>>(`${this.ApiU1}?origem=${valor.origem}`)
      }
      getselection(sele:condicoesprocura): Observable<Resposta<selectview>>{        
        return this.http.post<Resposta<selectview>>(`${this.ApiUrlgeral}ComboboxesPost`,sele)
       // return this.http.get<Resposta<selectview>>(`${this.ApiUrlgeral}Comboboxes?tabela=${sele.tabela}&campo1=${sele.campo1}&campo2=${sele.campo2}&condicao=${sele.condicao}`)
        }

        getdisciplinas(): Observable<Resposta<dmzviewgrelha>>{       

          return this.http.get<Resposta<dmzviewgrelha>>(`${this.ApiUrlgeral}Comboboxesdmz`)
          }
        
      GetRelatorio(): Observable<Resposta<RltviewRetorno>>{
        return this.http.get<Resposta<RltviewRetorno>>(`${this.ApiUrlgeral}RelatorioTeste`)
        }

        GerarRelatorio(rlv:rtlviewsingleheader): Observable<Resposta<filepedf>>{

  
          return this.http.post<Resposta<filepedf>>(`${this.ApiUrlgeral}FrmPrintRlt`,rlv)
          }


          GerarRelatorioGetDirect(rlv:rtlviewsingleheader): Observable<Resposta<any>>{
            return this.http.post<Resposta<any>>(`${this.ApiUrlgeral}EsseFrmPrintRlt`,rlv)
            }
          //

      Imprimir(): Observable<Resposta<any>>{
        return this.http.get<Resposta<any>>(`${this.ApiUrlgeral}DVERe`)
        }

        Downloadfilercl(filename:string)      
        {
          if(filename.length>0 && filename!=''){
            window.open(`${this.ApiUrlgeralrcl}Filevis?ficheiro=${filename}`,'blank')
            // this.openBlankPage('http://localhost:4200/secret/salateste')
         
          }
          }
        
        Downloadfile(filename:string)      
        {
          if(filename.length>0 && filename!=''){


            window.open(`${this.ApiUrlgeral}Filevis?ficheiro=${filename}`,'blank')
            // this.openBlankPage('http://localhost:4200/secret/salateste')
      
          }
          }

          //O filename é o nome do ficheiro na Api, E a sua localizazação exata encontra-se neste endereço, então para além de 
//baixar, permita que seja visualizado dentro da aplicação... certo??
// tudo bem...

//É tudo que queria partilhar consigo.... .
//i Esta bem maza vou comecar pela subistituicao dos metodos la e de seguida vejo trabalhar aqui para leitura do documento!//Ok, até mais logo.

//Tenho fé que já tens m]tudo para trabalhar.


 //Tenho sim maza, acredito que ao chegar, estara tudo emplementado e caso esteja com dificuldade irei informar e irei continuar a trabalhar para finalizar


      GravarDadosEst(estudante: campoDashboard): Observable<Resposta<campoDashboard>> {
        return this.http.post<Resposta<campoDashboard>>(`${this.ApiUrlgeral}GravarDashboard`, estudante)
      }
      mostrarAlerta(mensagem: string, tipo: string) {
        this._snackBar.open(mensagem, tipo, {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 3000
        });
      }
    
           
      GerarRelatorioFacturacao(rlv:Resposta<any>): Observable<Resposta<filepedf>>{
        //  console.log(`Ver o console ao imprimir ${this.ApiUrlgeralrcl}`);
        //  alert(this.ApiUrlgeralrcl);
    
        return this.http.post<Resposta<filepedf>>(`${this.ApiUrlgeralrcl}FrmPrintRlfacturacao`,rlv)
        }

openBlankPage(url:string){
  this.router.navigateByUrl('/salateste', {skipLocationChange:true}).then(()=>{
    window.open(url, '_blank')
  })
}
   
  }
  export interface PaginationResponseApi {
    totalCount:number;
    status:boolean,
    msg:string,
    data:any
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { planopag } from 'src/app/Portal-da-Secretaria/MatriculaAluno/todasClassesmatricula';
import { environment } from 'src/environments/environment';
import { Planopag } from 'src/Models/PlanoPagamento/planoPag';
import { Resposta } from 'src/Models/Resposta';

@Injectable({
  providedIn: 'root'
})
export class PlanopagamentoService {
  private ApiUrlgeral = `${environment.APIurl}PlanoPagamento/`

  constructor(
    private http: HttpClient,
  ) { }


  PlanoPag(item: Planopag): Observable <Resposta<planopag>> {
    return this.http.post<Resposta<planopag>>(`${this.ApiUrlgeral}Passecover`, item)
  }
}

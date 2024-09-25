import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Estudante } from 'src/Models/Estudante';

@Injectable({
  providedIn: 'root'
})
export class DataSendService {
  estudante!:Estudante
  private dadoSource = new BehaviorSubject<Estudante>(this.estudante);
  dadoAtual = this.dadoSource.asObservable();

  constructor() { }


  MudarDados(dados: any){
    this.dadoSource.next(dados)
  }
}

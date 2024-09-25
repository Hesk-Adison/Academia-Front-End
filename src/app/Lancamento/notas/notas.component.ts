import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TurmaNota } from 'src/Models/TurmaNota';
import { TurmaNotaService } from 'src/Service/turma-nota.service';


@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})


export class NotasComponent implements OnInit{
  Lancamento! :FormGroup

  @Output() onSubmit = new EventEmitter<TurmaNota>
constructor(private turmanotaservice:TurmaNotaService){

}


  ngOnInit(): void {


    this.Lancamento = new FormGroup ({
      Data:new FormControl(''),
      Datafecho: new FormControl(''),
      alunoNome: new FormControl(''),
      alunostamp: new FormControl(''),
      anosem: new FormControl(''),
      aprovado: new FormControl(true),
      ativo: new FormControl(true),
      codSit: new FormControl(''),
      coddis: new FormControl(''),
      codetapa: new FormControl(''),
      cursostamp:new FormControl(''),
      data:new FormControl(new Date()),
      datafecho:new FormControl(new Date()),
      disciplina:new FormControl(''),
      e1:new FormControl(''),
      e2:new FormControl(''),
      es: new FormControl(''),
      fecho: new FormControl(''),
      id: new FormControl(2),
      media: new FormControl(''),
      mediafinal: new FormControl(''),
      motivo: new FormControl(''),
      n1: new FormControl(''),
      n2: new FormControl(''),
      n3: new FormControl(''),
      n4: new FormControl(''),
      pestamp: new FormControl(''),
      pestamp2: new FormControl(''),
      profnome: new FormControl(''),
      profnome2: new FormControl(''),
      resultado: new FormControl(''),
      resultadoFinal: new FormControl(''),
      sem: new FormControl(''),
      turmanotastamp:new FormControl(''),
      turmastamp:new FormControl(''),  
    })
  }

 Lancar(notas : TurmaNota){
  console.log(this.Lancamento.value)
  this.onSubmit.emit(this.Lancamento.value)



 }


}

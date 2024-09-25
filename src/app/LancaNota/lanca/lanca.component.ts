import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { TurmaNota } from 'src/Models/TurmaNota';
import { TurmaNotaService } from 'src/Service/turma-nota.service';

@Component({
  selector: 'app-lanca',
  templateUrl: './lanca.component.html',
  styleUrls: ['./lanca.component.scss']
})
export class LancaComponent implements OnInit {




constructor(
  private turmanotaservice: TurmaNotaService,
  private router: Router,
  private routeActive : ActivatedRoute
  ){}

ngOnInit(): void {
   const id = Number(this.routeActive.snapshot.paramMap.get('id'));

   console.log(id)
 
}


CreatNotas(Notas: TurmaNota){
  this.turmanotaservice.CreateTurmaNota(Notas).subscribe((data)=>{
    this.router.navigate(['Turmas'])
    
  },Error=>{
    console.log(Error)
  })
}



}

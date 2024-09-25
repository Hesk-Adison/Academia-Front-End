import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { rltview } from 'src/app/Interfaces/rltview';
import { ModalParamRelComponent } from 'src/app/ModalParamRel/modal-param-rel/modal-param-rel.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent  implements OnInit{
Relatorio() {
throw new Error('Method not implemented.');
}


  rltview : rltview[]=[]
  auxiliarclass=this.rltview





  constructor(
    private guardardados: GuardarSessoes,
    private loginService: LoginServiceService,
    private fb: FormBuilder,

    private dialog: MatDialog
  ){

    

  }
  private ApiUrlgeral = `${environment.APIurl}Users/`
  ngOnInit(): void {

    this.loginService.GetRelatorio().subscribe((data)=>{
      this.auxiliarclass =data.dados.rltview

      console.log(`data ta ${this.auxiliarclass}`)
    })
    
  }


  


Chamar() {

  this.loginService.GetRelatorio().subscribe((data)=>{
    this.dataSource = data.dados.rltview
    console.log(this.dataSource)
  })
  
  //window.open(`${this.ApiUrlgeral}FrmPrintRlt`, "_blank");

  // this.loginService.Imprimir().subscribe({
   
  // });
}




displayedColumns= ['codigo','descricao','accoes' ];
dataSource = this.auxiliarclass;




}

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, finalize } from 'rxjs';
import { ViewAspnetuser } from 'src/Models/AspnetViwer';
import { CampoSessoes } from 'src/Models/CampoSessoes';
import { Cls } from 'src/Models/Cls';
import { AspnetUser } from 'src/Models/DMZusers';
import { Pe } from 'src/Models/Pe';
import { aspenetuserinterface } from 'src/Models/aspnetuserInterface';
import { campoDashboard } from 'src/Models/campoDashboard';
import { fnc } from 'src/Models/fnc';
import { EmailServiceService } from 'src/Service/EmailService/EmailService/email-service.service';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import Swal from 'sweetalert2';

export interface valor {

  origem: number
}

@Component({
  selector: 'app-importar-funcionario',
  templateUrl: './importar-funcionario.component.html',
  styleUrls: ['./importar-funcionario.component.scss']
})
export class ImportarFuncionarioComponent implements OnInit{
  DataSource!:ViewAspnetuser
 // DataSource: BehaviorSubject<ViewAspnetuser[]>;
  dddd!:AspnetUser[]
  Alterar!:FormGroup
  botaoacao='Alterar'
  tituloacaco='Permissoes'
  colunas=['nome','accoes']
  qualquer: any
  isSpinnerDisplayed=false
  pageSize = 5; // Itens por página
  pageSizeOptions: number[] = [5, 10, 25, 100];
  Dados:any
  lenght = 0
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor
  (
    private modalActual: MatDialogRef<ImportarFuncionarioComponent>,
    @Inject(MAT_DIALOG_DATA) public pedata: AspnetUser,
    private fb: FormBuilder,
    private emailService: EmailServiceService
    
  ){

    
    this.Alterar = this.fb.group({
      email: [''],
      tipoperfil: ['']
    })

  }
  ngOnInit(): void {



this.Alterar.patchValue({email:this.pedata.login})


  
  }
  ngAfterViewInit(): void {
    this.Dados.paginator=this.paginator
   
  }

  closeDialog() {  
    this.modalActual.close("true");
  }

  Mudaperfil(){
 this.isSpinnerDisplayed=true
    const datasorc : aspenetuserinterface ={
      usuario:this.Alterar.value.email,
      id:this.pedata.usrstamp,
      tipoperfil:this.Alterar.value.tipoperfil
      
    }
    console.log(datasorc)

    this.emailService.Mudarperfil(datasorc).pipe(      
      finalize(() => this.isSpinnerDisplayed = false),
    ).subscribe((data)=>{
      if(data.dados != null && data.sucesso==true && data.mensagem=='Usuario actualizado')
        {
        Swal.fire('Sucesso!', 'As permisões foram atribuidas com sucesso', 'success'); 
        this.closeDialog()
      }

      else{
        Swal.fire('Erro!', 'Não foi possivel atribuir permisões', 'error'); 
        this.closeDialog()
      }
    })
    
    
  }
}

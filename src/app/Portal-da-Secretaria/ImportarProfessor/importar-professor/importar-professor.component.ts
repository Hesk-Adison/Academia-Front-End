
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { CarregaDiscp } from 'src/Models/CarregaDiscp';
import { guardarprofessores } from 'src/app/GuardarSessoes/Guardarpeviw';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { Turmaservico } from '../../Turmas/sertvico/turmaservico';
import { ResultPedata } from 'src/app/GuardarSessoes/ResultPedata';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { turmadiscp } from '../../Turmas/todastabelasturma';
import { EmailServiceService } from 'src/Service/EmailService/EmailService/email-service.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { Pe } from 'src/Models/Pe';
import { finalize } from 'rxjs';
import { pecadastroview } from 'src/Models/pecadastroview';
import { selects } from 'src/Models/CampoSessoes';
import { Matriculaservice } from '../../MatriculaAluno/matriculaservice';

export interface valor {
  origem: number;
}

@Component({
  selector: 'app-importar-professor',
  templateUrl: './importar-professor.component.html',
  styleUrls: ['./importar-professor.component.scss']
})
export class ImportarProfessorComponent implements OnInit {
  Professor: Pe[] = [];
  ProfessorGerais: Pe[] = [];
  Dataaaaa!: FormGroup;
  DataSource: any;
  clstampvliw = '';
  selectiondmz = new SelectionModel<pecadastroview>(true, []);
  selection = new SelectionModel<turmadiscp>(true, []);
  botaoacao='Gravar'
  tituloacaco='Escolha o professor'
  isSpinnerDisplayed=false

  constructor(
    private modalActual: MatDialogRef<ImportarProfessorComponent>,
    @Inject(MAT_DIALOG_DATA) public pedata: CarregaDiscp,
    private _dadosPe: guardarprofessores,
    private guardardados: GuardarSessoes,
    private loginService: LoginServiceService,
    private _turmaservice: Turmaservico,
    private resultPedata: ResultPedata,
    private fb: FormBuilder,
    private turmanotaservice: TurmaNotaService,
    private emailservice: EmailServiceService,
    private _matriculaService: Matriculaservice,
  ) {
    this.Dataaaaa = this.fb.group({
      Tumadiscp: this.fb.array([])
    });
  }

  get Tumadiscp(): FormArray {
    return this.Dataaaaa.get('Tumadiscp') as FormArray;
  }

  ngOnInit(): void {
    this.clstampvliw = this.turmanotaservice.Stamp();
    this.GetDataPe();
  }

  GetDataPe() {
    if (this.pedata.ststamp) {
      this._turmaservice.GetPedisc(this.pedata.ststamp).subscribe({
        next: (data) => {
          if (data.dados && data.mensagem === 'sucesso, existe professor') {
            this.DataSource = data.dados ;
          } else {
            Swal.fire('Erro!', 'Caro Utilizador, a disciplina não tem professores cadastrados', 'info');
          }
        },
        error: (error) => {
          Swal.fire('Erro!', 'Erro ao carregar dados', 'error');
          console.error('Erro ao carregar professores:', error);
        }
      });
    }
  }

  closeDialog() {
    this.modalActual.close("true");
  }

  busca(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    this.Professor = this.ProfessorGerais.filter(Professor => Professor.nome.toLowerCase().includes(value));
  }

  onKeyPress($event: MatCheckboxChange, _t25: pecadastroview, index: number) {
    const padrao = Boolean($event.checked);
    this.selectiondmz.toggle(_t25);
    _t25.ecivil = String(padrao);

    this.DataSource[index].ecivil = String(padrao);

  }

  masterToggledmz() {

    this.isAllSelecteddmz() ? this.selectiondmz.clear() : this.DataSource.forEach((row: pecadastroview) => this.selectiondmz.select(row));

  }


  verificacao=false
  updateFormArray(): void {
    let todostrue= this.DataSource.filter((item: { ecivil: any; }) => String(Boolean(item.ecivil)).toLowerCase() == 'true');  
    let verifa:Boolean=false;
    if(todostrue.length==0){
      Swal.fire('Não permitido!', 'Nenhuma linha seleccionada!', 'error')     
      return;
    }  
    this.Tumadiscp.clear();
    for (let i = 0; i < this.DataSource.length; i++) {

      if(this.DataSource[i].ecivil.toLowerCase()=='true'){
      let stamp = this.turmanotaservice.Stamp() + i;

      let con:selects={
        chave: 'turmadisc',
        descricao: 'ststamp',
        ordem:`ststamp='${this.pedata.ststamp}' and pestamp=${this.DataSource[i].pestamp} and Turmadiscstamp=${this.pedata.turmadiscstamp}`
        //Pestamp='987D20234DMZ1915111' and Turmadiscstamp='0D20238DMZ11154839'
      }
      this._matriculaService.CheckExist(con).subscribe({
        next: (data) => {
          if (data.sucesso) {
            this.verificacao=true
            Swal.fire('Não permitido!', `O professor ${this.DataSource[i].nome} ja foi adicionado a essa !`, 'error')  
            return
          }
        }
      }); 

      if(!this.verificacao){
        this.Tumadiscp.push(this.fb.group({
          turmadiscpstamp: [stamp],
          turmadiscstamp: [this.pedata.turmadiscstamp],
          pestamp: [this.DataSource[i].pestamp],
          ststamp: [this.pedata.ststamp],
          nome: [this.DataSource[i].nome]
          
        }));
      }
      
      
    }}
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.DataSource.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.DataSource.forEach((row: turmadiscp) => this.selection.select(row));
    this.updateFormArray();
  }

  isAllSelecteddmz() {
    const numSelected = this.selectiondmz.selected.length;
    const numRows = this.DataSource.length;
    return numSelected === numRows;
  }

  colunas = ['no', 'nome', 'accoes'];

  Cadastrar() {

    this.updateFormArray();

    this.isSpinnerDisplayed=true
    try {
      const turmaDiscpData = this.Tumadiscp.value;
      this.emailservice.Addturmadisc(turmaDiscpData).pipe(
        finalize(() => this.isSpinnerDisplayed = false),
      ).subscribe({
        next: (response) => {
          if(response.sucesso==true && response.mensagem=='Dados Guardados'){
            Swal.fire('Sucesso!', 'Professor  adicionado com sucesso', 'success');
          }
          else{
            Swal.fire('Erro!', 'Falha ao adicionado o Professor', 'error');
          }
         
          this.closeDialog()
        },
        error: (error) => {
          Swal.fire('Erro!', 'Falha ao adicionado o Professor', 'error');
          
        }
      });
    } catch (error) {
     
      Swal.fire('Erro!', 'Erro ao preparar os dados para cadastro', 'error');
    }
  }
}

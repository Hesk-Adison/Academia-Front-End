import { Component, Inject, OnInit, ViewChild, forwardRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';
import { MatSelect } from '@angular/material/select';
import { condicoesprocura, selects } from 'src/Models/CampoSessoes';
import { Observable, map, startWith } from 'rxjs';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { MY_DATA_FORMATS } from 'src/app/modal-estudantes/modal-estudantes.component';
import { MY_DATA_FORMATS } from 'src/app/listaestudantes/modal-estudantes/modal-estudantes.component';
import Swal from 'sweetalert2';
import { horario, horariol } from '../../todastabelasturma';
import { Horarioservico } from '../../ServicoHorario/horarioservico';
@Component({
  selector: 'app-modalhorario',
  templateUrl: './modalhorario.component.html',
  styleUrls: ['./modalhorario.component.scss'],  
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => 'lingua'),
      multi: true,
    }
    
  ]
})
export class ModalhorarioComponent implements OnInit {
  //

  
closeDialog() {
  
  this.modalActual.close("true");
}



  working = false;
  uploadFile!: File | null;
  selectedFile!: any;
  uploadFileLabel: string | undefined = 'Escolha a imagem';
  uploadProgress: number=0;
  uploadUrl: string="";
  name = '';
  fileUrl!:any;
  fileName!:string;



  


 
private _filter(name: string,list:selects[]): selects[] {
  const filterValue = name.toLowerCase();  
  return list.filter(option => option.descricao.toLowerCase().includes(filterValue));
}



cldocumentos = new FormArray([]);
disciplinades:string='';
carregarDocs(afam: horariol[]) {
  this.visibilidadebolsa=true;
  const formArray = this.cadastro.get('horariol') as FormArray;
  afam.map(item => {
    formArray.push(this.aDocs(item));
  });
}
aDocs(item: horariol): any {

  return this.fb.group({  
    horariolstamp:[item.horariolstamp],
    anolectstamp:[item.horariostamp],
    descricao:[item.descricao],
    hora:[item.hora],
    segunda:[item.segunda],
    terca:[item.terca],
    quarta:[item.quarta],
    quinta:[item.quinta],
    sexta:[item.sexta],
    sabado:[item.sabado],
    domingo:[item.domingo],
       
  })
  }

//======================Teste======================
  cadastro!:FormGroup
 
    titloAccao: string='';
    botaoAccao: string='';
  clfamstamp: string=''
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;   
    constructor(
      private fb:FormBuilder,
      private turmanotaservice: TurmaNotaService,private http: HttpClient,
      private _loginservice: LoginServiceService,
       private modalActual: MatDialogRef<ModalhorarioComponent>,
       @Inject(MAT_DIALOG_DATA) public dadosestudantes: horario,
       private _estudanteService: Horarioservico
    ){

      if(this.dadosestudantes.descricao!=''){
        
        this.titloAccao=`Novo Horário`;
        this.botaoAccao=`Guardar`;
      }else{

        this.titloAccao=`Editar horário`;
        this.botaoAccao=`Actualizar`;
      }
      this.cadastro = this.fb.group({
        gradestamp:[''],     
        horariostamp:[''], 
    turmastamp:[''], 
    turma:[''], 
    codigo:[''], 
    descricao:[''], 
    anosem:[''], 
    visualizar:[false], // Visualizar horário a partir da data
    hactivo:[false], //Hoarario activo ou em exercicio 
       horariol: this.fb.array([]),
     
    })
    }
  
   async ngOnInit() {
    await this.getturmas();
     if (this.dadosestudantes != null) {
      this.cadastro.patchValue({   
        horariostamp:this.dadosestudantes.horariostamp, 
    turmastamp:this.dadosestudantes.turmastamp, 
    turma:this.dadosestudantes.turma, 
    codigo:this.dadosestudantes.codigo, 
    descricao:this.dadosestudantes.descricao, 
    anosem:this.dadosestudantes.anosem, 
    visualizar:this.dadosestudantes.visualizar, // Visualizar horário a partir da data
    hactivo:this.dadosestudantes.hactivo, //Hoarario activo ou em exercicio 
       horariol: this.dadosestudantes.horariol,
      });
      if(this.dadosestudantes.horariostamp!=''){
        this.clstampvliw=this.dadosestudantes.horariostamp;
      }else{
        this.clstampvliw=this.turmanotaservice.Stamp();
      }      
if  (this.dadosestudantes.horariol.length>0){
 
  this.carregarDocs(this.dadosestudantes.horariol);
}
}  
     this.titloAccao = "Editar Ano lectivo";
     this.botaoAccao = "Actualizar";
     
    }



    myControlturma = new FormControl<string | selects>('');
    optionsturma: selects[] = [];
    filteredOptionsturma!: Observable<selects[]>; 
    turma:string='';
    turmastamp:string=''; 

    Setturmas(item:selects){
      this.turma=item.descricao;
    this.turmastamp=item.chave;
        }
    async  getturmas() {
      const se:condicoesprocura={        
        tabela:"Turma",
      campo1: "Codigo", 
      campo2:"Descricao",
       condicao:"vazio"
      }
      this._loginservice.getselection(se).subscribe({
        next: (data) => {
          if (data.sucesso) {            
            this.optionsturma = data.dados.selects;
            this.filteredOptionsturma = this.myControlturma.valueChanges.pipe(
              startWith(''),
              map(value => {
                const name = typeof value === 'string' ? value : value?.descricao;
                return name ? this._filter(name as string,this.optionsturma) : 
                this.optionsturma.slice();
              }),
            );
          } else {
            this._loginservice.mostrarAlerta("Nao foi possivel carregar as moedas", "Opps");
          }
        },
        error: (e) => {
          this._loginservice.mostrarAlerta(`Erro, ${e}`, "Opps");
        }
      });
    }
   
    
 
Cadastrar( )
{    
const cl:horario={
  horariostamp: this.cadastro.value.anolectstamp, 
  turmastamp: this.cadastro.value.turmastamp,
  turma: this.cadastro.value.turma,
  codigo: this.cadastro.value.codigo,
  descricao: this.cadastro.value.descricao,
  anosem: this.cadastro.value.anosem,
  visualizar:this.cadastro.value.visualizar,
  hactivo: this.cadastro.value.hactivo,
  horariol: this.cadastro.value.horariol,
};
  const dadosssss=cl;
  const formData = new FormData();
  const _dadoscl=dadosssss
  var json_arr = JSON.stringify(_dadoscl);  
  formData.append("Horario",json_arr);
  const url = `${environment.APIurl}Horario/UploadFile`;
  const uploadReq = new HttpRequest('POST', url, formData, {
    reportProgress: true,
  });
  this.uploadUrl = '';
  this.uploadProgress = 0;
  this.working = true;
  this.http.request(uploadReq).subscribe((event: any) => {
    if (event.type === HttpEventType.UploadProgress) {
      this.uploadProgress = Math.round((100 * event.loaded) / event.total);
    } else if (event.type === HttpEventType.Response) {
      this.uploadUrl = event.body.url;
    }
  }, (error: any) => {
    console.error(error);
  }).add(() => {
    this.working = false;
  });

return;

  



}

total:number=0;

totalstr:string='Total:  ';


 //------------------------------------------------Documentos----------------------------------------------------------
  get horariol(): FormArray {
   
    return this.cadastro.get('horariol') as FormArray;
   }

 
//---------------------------------------------------------------------------------------------------------------------

//-----------------------------------Agregado Familiar-----------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------







clstampvliw: string='';
  


visibilidadebolsa:boolean=false;
//------------------------------------------Adiciona e remove linhas do docs---------------------------------------------
adicionargradel() {
  this.visibilidadebolsa=true; 
let stamp =this.turmanotaservice.Stamp();
  this.horariol.push(this.fb.group({
    horariolstamp:[stamp],
    horariostamp :[this.clstampvliw],
    descricao:[''],
    hora:[''],
    segunda:[''],
    terca:[''],
    quarta:[''],
    quinta:[''],
    sexta:[''],
    sabado:[''],
    domingo:[''],
  }));
}
removido:boolean=false;
eliminarestudante(stamp: string,descricao:string,index:number) {
  this.removido=false;
  Swal.fire({
    title: 'Deseja eliminar a linha?',
    text: descricao,
    icon: "warning",
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Sim, Eliminar',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    cancelButtonText: 'Não, Voltar'
  }).then((resultado => {
    if (resultado.isConfirmed) {
      this._estudanteService.eliminargradelsddgd(stamp,'horariol','horariolstamp').subscribe({
        next: (data) => {
          if (data.sucesso) {
            this._loginservice.mostrarAlerta("linha eliminada com sucesso", "Ok");
            this.removergri(index);
          } else {
            this._loginservice.mostrarAlerta("Nao foi possível eliminar a linha", "Erro");
          }
        },
        error: () => {
          this._loginservice.mostrarAlerta("Erro de conexao", "Opps");
        }
      });

    }

  }));
}

removergradel(index: number) {  
  let grela=(<FormArray>this.cadastro.get('gradel')).controls[index].value;  
  this.eliminarestudante(grela.horariolstamp,grela.descricao,index)
 
}

removergri(index:number){
  this.horariol.removeAt(index);
  var lets=this.cadastro.get('gradel') as FormArray
  if(lets.length>0){
  this.visibilidadebolsa=true;
  }  else{  
  this.visibilidadebolsa=false;
  }
}

}
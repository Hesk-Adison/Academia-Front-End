
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { clclas } from 'src/Models/Cl/cl';
import { clfam } from 'src/Models/Cl/clfam';
import { Cls } from 'src/Models/Cls';
import { Estudante } from 'src/Models/Estudante';
import { UserColumns, Usera } from 'src/Models/Pe';
import { Turmanota1 } from 'src/Models/Turma';
import { Pbl } from 'src/Service/Pbl';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { Clfamview } from 'src/app/Clcadastrovie/Clfamview';
import { Clview } from 'src/app/Clcadastrovie/Clview';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { DadosTemporarios } from 'src/app/GuardarSessoes/DadosTemporarios';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { carregardados } from 'src/app/Interfaces/carrgardados';
import { environment } from 'src/environments/environment.development';
export class DynamicGrid{     
  name!:string;  
  email!:string;  
  phone!:string;  
}
@Component({
  selector: 'app-clcadastro',
  templateUrl: './clcadastro.component.html',
  styleUrls: ['./clcadastro.component.scss']
})
export class ClcadastroComponent implements OnInit {




removeRow(id: number) {
  this.dataSource.data = this.dataSource.data.filter(
    (u: Usera) => u.id !== id,
  )
}
addRowsdsds() {
  const newRow: Usera = {
    id: 0,
    firstName: 'aniva@gmail.com',
    lastName: 'aniva@gmail.com',
    email: 'aniva@gmail.com',
    birthDate: '2024-02-12',
    isEdit: true,
    isSelected: false,
  }
  this.dataSource.data = [newRow, ...this.dataSource.data]
}


working = false;
  uploadFile!: File | null;
  uploadFileLabel: string | undefined = 'Choose an image to upload';
  uploadProgress: number=0;
  uploadUrl: string="";

  handleFileInput(files: FileList) {
    if (files.length > 0) {
      this.uploadFile = files.item(0);
      this.uploadFileLabel = this.uploadFile?.name;
    }
  }

  upload() {
    if (!this.uploadFile) {
      alert('Choose a file to upload first');
      return;
    }


    let fff= JSON.stringify( this.uploadFile);
    
    const formData = new FormData();
    formData.append("ficheiro", this.uploadFile);

    const _dadoscl:clclas={
      clstamp:'Aniva',
      nome:'Eu',      
      path:this.uploadFile.name,
    }
    var json_arr = JSON.stringify(_dadoscl);
  
    
    formData.append("Cl",json_arr);    
    //formData.append("clstamp", "fhfhfhfh");
    const url = `${environment.APIurl}Users/UploadFile`;
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
  }










  titulo:string="Cl cadastro";

Dadostemp(_t38: any) {
throw new Error('Method not implemented.');
}


currentDate:Date=new Date();

  displayedColumns: string[] = UserColumns.map((col) => col.key)
  columnsSchema: any = UserColumns
  dataSource = new MatTableDataSource<Usera>()
  valid: any = {}
  listaUsera: Usera[] = [
    {  isSelected: false,
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      isEdit: false},     
  ];


  dynamicArray1:Array<DynamicGrid> = []; 
  
  turmanota:Array<Turmanota1> = []; 
  turmanotas:Array<Turmanota1> = []; 
  constructor(
    private TurmaotaService: TurmaNotaService,
    private formbuild: FormBuilder,
    private router: Router,
    private dadosTemp : DadosTemporarios,
    private dadossessao : GuardarSessoes,
    private lancaTemp : DadosLancamento,
    private dialog: MatDialog,private route: ActivatedRoute,
    private http: HttpClient
   
    ){

     this.stamps=this.TurmaotaService.Stamp();

     
    }
     stamps:string='';
  dynamicArray: Array<Turmanota1> = [];  
  carregardados!:carregardados;
  newDynamic!: Turmanota1 ;  
  listanotas: Turmanota1[] = []
  

  clvie!: Estudante;


  lisnewDynamic: Estudante[] = []; 
  teste:string='Meu nome é';
  estudante!:Estudante;
usr!:DynamicGrid;
  ngOnInit(): void {  
const xx=this.lancaTemp.obterSessao();

this.addRowsdsds();


this.listanotas=[
  {
 turmanotastamp:  this.stamps,
 turmastamp : this.stamps,
 no : this.stamps,
 alunostamp : this.stamps,
 alunoNome :  this.stamps,
 n1:"",
 n2:"",
 n3:"",
 n4:"",
 n5:"",
 media:"",
 data:new Date,
 aprovado:false,
 coddis:"",
 disciplina:"",
 anosem : "",
 sem : "",
 cursostamp : "",
 e1:"",
 e2:"", //Exame Recurso     
 es:"" ,//Exame especial 
 mediafinal:"",
  pestamp : "",
  Profnome : "",
  pestamp2 : "",
  profnome2 : "",
  fecho: false,//Fechar o diario pelo professor (Basta fechar nao tera mais possibilidade de alterar)
 //Dados adicionados e alterados
  datafecho:new Date,
  resultado:"",     //Para Obter todos admitidos/Excluidos
  resultadoFinal:"",   //Para obter todas stuacoes
 //de resultados nos exames
  codSit: 0, //1=exluido,2=admitido,3=dispensado
 //,4=aprovado,5=reprovado
  codetapa: ""   ,
  activo: false, //True=matrícula cancelada e false = matrícula activa
  motivo : "",//Motivo pelo qual lhe leva ao cancelamento da matrícula    
  obs : "", //Motivo pelo qual lhe leva ao cancelamento da matrícula },
 }
];


const _mancebo: Estudante = {
  anosem :'',
  curso :'',
  cursostamp :'',
  disciplina :'',
  ststamp :'',
  turma :'',
  turmanota: this.listanotas,
  turmastamp :'',
}



this.estudante=xx;
this.turmanotas=this.turmanota=this.listanotas;//this.estudante.turmanota;
//this.dynamicArrays=this.turmanotas;
this.dynamicArray=this.turmanotas;
this.dynamicArray1=xx;
  }  
  
  addRow() {       
    let streamp=this.TurmaotaService.Stamp();
    this.newDynamic = {      
      turmanotastamp: streamp,
      turmastamp : streamp,
      no : streamp,
      alunostamp : streamp,
      alunoNome : streamp,
      n1:"",
      n2:"",
      n3:"",
      n4:"",
      n5:"",
      media:"",
      data:new Date,
      aprovado:false,
      coddis:"",
      disciplina:"",
      anosem : "",
      sem : "",
      cursostamp : "",
      e1:"",
      e2:"", //Exame Recurso     
      es:"" ,//Exame especial 
      mediafinal:"",
       pestamp : "",
       Profnome : "",
       pestamp2 : "",
       profnome2 : "",
       fecho: false,//Fechar o diario pelo professor (Basta fechar nao tera mais possibilidade de alterar)
      //Dados adicionados e alterados
       datafecho:new Date,
       resultado:"",     //Para Obter todos admitidos/Excluidos
       resultadoFinal:"",   //Para obter todas stuacoes
      //de resultados nos exames
       codSit: 0, //1=exluido,2=admitido,3=dispensado
      //,4=aprovado,5=reprovado
       codetapa: ""   ,
       activo: false, //True=matrícula cancelada e false = matrícula activa
       motivo : "",//Motivo pelo qual lhe leva ao cancelamento da matrícula    
       obs : "", //Motivo pelo qual lhe leva ao cancelamento da matrícula 
    };  
      this.dynamicArray.push(this.newDynamic);  
      return true;  
  }  
  onKeyPress(event: Event,nr:number) {

    
    

    var inputVal = (event.target as HTMLInputElement).value.toLowerCase();
   
    var inputVald = (event.target as HTMLInputElement).id;

    let nota1 : any = document.getElementById("n1-"+nr) as HTMLInputElement | null;
    let nota2 : any = document.getElementById("n2-"+nr) as HTMLInputElement | null
    ;

    
    let test : any = document.getElementById(`media-${nr}`) as HTMLInputElement | null
test.value = nota2.value*nota1.value;


this.router.navigate(['Adim/Tabelapag'])

    
  }
  Clfamviewlista:Clfamview[]=[]
  submit() {




    const dadosMancebo=this.lancaTemp.obterSessao();
    this.estudante= {
      turmastamp: dadosMancebo == null ? '' : dadosMancebo.turmastamp,
      anosem: dadosMancebo == null ? '' : dadosMancebo.anosem,
      turma: dadosMancebo == null ? '' : dadosMancebo.turma,
      curso: dadosMancebo == null ? '' : dadosMancebo.curso,
      cursostamp: dadosMancebo == null ? '' : dadosMancebo.cursostamp,
      disciplina: dadosMancebo == null ? '' :dadosMancebo.disciplina,
      ststamp: dadosMancebo == null ? '' : dadosMancebo.ststamp,
      turmanota: this.turmanota ,
    }
    if(this.estudante.turmanota.length==0){
      alert("A grelha de alunos não pode estar vazia, por favor!");
      return;
    }
    if (this.estudante != null) {
      this.TurmaotaService.GravarDadosEst(this.estudante).subscribe({
        next: (data) => {

          if (data.sucesso) {
            alert(`Lançamento executado com sucesso`);
            //this.closeDialog()
          } else {
            alert(data.mensagem);
          }
        },
        error: (e) => {
          alert(e + " Erro de conexão");
        }
      });
    } else {
      alert( " Não pode gravar com dados vazios");
    }
   
    

  }

 busca(event: Event){
  this.turmanota =  this.turmanotas.filter(dynamicArray =>{
      return dynamicArray.alunoNome.toLowerCase().includes((event.target as HTMLInputElement).value.toLowerCase())
    })
  }
  deleteRow(index:number) {  
      if(this.dynamicArray.length ==1) {  
       // this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
          return false;  
      } else {  
          this.dynamicArray.splice(index, 1);  
         // this.toastr.warning('Row deleted successfully', 'Delete row');  
          return true;  
      }  
  }

}

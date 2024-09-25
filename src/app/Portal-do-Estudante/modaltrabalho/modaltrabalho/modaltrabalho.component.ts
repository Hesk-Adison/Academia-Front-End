import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, forwardRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { DomSanitizer } from '@angular/platform-browser';
import { Clview } from 'src/Models/Cldocs';
import { Trabalho } from 'src/Models/trabalho';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { MY_DATA_FORMATS } from 'src/app/Teste/testes/testes.component';
import { ModalEstudantesComponent } from 'src/app/listaestudantes/modal-estudantes/modal-estudantes.component';
// import { Trabalho } from '../trabalho';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modaltrabalho',
  templateUrl: './modaltrabalho.component.html',
  styleUrls: ['./modaltrabalho.component.scss']  ,
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => 'lingua'),
      multi: true,
    }
  ],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,MatIconModule,
    MatDividerModule, MatDialogModule,MatTabsModule,MatDatepickerModule,
    MatNativeDateModule ,MatSlideToggleModule ,
    MatAutocompleteModule,
    AsyncPipe,
    FormsModule,
    MatProgressSpinnerModule , MatMenuModule,
    CommonModule,MatCheckboxModule,MatButtonModule,
    A11yModule,
    CdkTableModule,
    CdkTreeModule,
    MatRippleModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
  ],
})
export class ModaltrabalhoComponent
implements OnInit {
  minDate: Date;
  maxDate: Date;
valida: boolean=false
  ficheiro: string='';
  nome:string='';
  constructor(
    private fb:FormBuilder,
    private turmanotaservice: TurmaNotaService,
    private http: HttpClient,private sanitizer:
     DomSanitizer,
     private _loginservice: LoginServiceService,
     private modalActual: MatDialogRef<ModaltrabalhoComponent>,
     @Inject(MAT_DIALOG_DATA) public dadosestudantes: Trabalho,
  ){
    const currentYear = new Date().getFullYear();
           this.minDate = new Date(currentYear - 60, 0, 1);
        this.maxDate = new Date(currentYear -17, 11, 31);
    this.cadastro = this.fb.group({
      trabalhostamp:[dadosestudantes.trabalhostamp],
      turmalstamp:[dadosestudantes.turmalstamp],
      ststamp:[dadosestudantes.ststamp],
      clstamp:[dadosestudantes.clstamp],
      status:[dadosestudantes.status],
      data:[new Date()],
      path:[dadosestudantes.path],
      path1:[dadosestudantes.path1]
  })
  }
  titloAccao: string='Envio de trabalho ';
  isSpinnerDisplayed: boolean=false;
  async ngOnInit() {}
  totalrecordturma:number=0;
  totalrecordturma1:number=0;
closeDialog() {
  this.modalActual.close("true");
}
  cadastro!:FormGroup
  onChange(event: any) {
    const file: File = event.target.files[0];
  
  if ( file) {
    this.valida = true
      this.ficheiro ='Ficheiro Carregado!'
      this.name = file.name
      var reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
  }
  }
  index:number=0;
  _handleReaderLoaded(readerEvt:any) {
    var binaryString = readerEvt.target.result;
           this.base64textString= btoa(binaryString);
    this.cadastro.patchValue({path1:this.base64textString});
   }
  private base64textString:String="";

    handleFileSelect(evt:any){

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
    Save(){


if(this.cadastro.value.path1.length==0){
  Swal.fire('Erro!', `Carrega o ficheiro, primeiro`, 'error');
  return;
}
      const cl:Trabalho={
        trabalhostamp: this.cadastro.value.trabalhostamp,
        turmalstamp: this.cadastro.value.turmalstamp,
        ststamp: this.cadastro.value.ststamp,
        clstamp: this.cadastro.value.clstamp,
        status: this.cadastro.value.status,
        data: new Date(),
        path:  this.cadastro.value.clstamp,
        path1: this.cadastro.value.path1
      }
      const dadosssss=cl;
      const formData = new FormData();
      const _dadoscl=dadosssss
      var json_arr = JSON.stringify(_dadoscl);
      formData.append("Trabalho",json_arr);
      const url = `${environment.APIurl}Users/UploadTrabalhos`;
      const uploadReq = new HttpRequest('POST', url, formData, {
        reportProgress: true,
      });

      this.http.request(uploadReq).
      subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {

          Swal.fire('Sucesso!', `Operação executada com sucesso`, 'success');
          this.closeDialog();
        }
      }, (error: any) => {

      }).add(() => {
        this.working = false;
      }

      );



    }
}

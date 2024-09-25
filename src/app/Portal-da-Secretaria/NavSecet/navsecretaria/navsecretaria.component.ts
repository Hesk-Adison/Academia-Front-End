import { Component, Input, computed, signal } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Pe } from 'src/Models/Pe';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';



export type MenuItem= {
  icon:string
  label:string
  route:string

}

@Component({
  selector: 'app-navsecretaria',
  templateUrl: './navsecretaria.component.html',
  styleUrls: ['./navsecretaria.component.scss']
})
export class NavsecretariaComponent {
  professor : Pe[]=[];
  nome: string ='';
  muda: string='';
  contador: any;
  Tipoperfil: boolean=true
  tipo=true
  Admin=false




  
  sidenavCollapsed = signal(false);
  
  sidenavCollapsed1 = signal(false);

  sidenavCollapsed2 = signal(false);
  dropdowns = signal(true);
  dropdowns1 = signal(true);
  dropdowns2 = signal(true);
  factura1 = signal(false)
  inscriccao= signal(false)

  @Input() set collapsed(val: boolean){
    this.sidenavCollapsed.set(val)

  }
  

  constructor(
    private guardarsessoes:GuardarSessoes
  ) { }

ngOnInit(): void {

  if( this.guardarsessoes.obterSessao().tipo == 3){
    this.Tipoperfil = false
  }
  else if( this.guardarsessoes.obterSessao().tipo == 4){
    this.tipo = false
  }

  else if( this.guardarsessoes.obterSessao().tipo == 5){
    this.tipo = true
    this.Tipoperfil = true
    this.Admin = true
  }
 this.nome = this.guardarsessoes.obterSessao().nome



}
submenu= computed(() => this.dropdowns()? 'none': 'block');
submenu1= computed(() => this.dropdowns1()? 'none': 'block');
submenu2= computed(() => this.dropdowns2()? 'none': 'block');
factura =computed(() => this.factura1()? 'rotate(180deg)': 'rotate(0deg)');
incricoes =computed(() => this.factura1()? 'rotate(180deg)': 'rotate(0deg)');

ocultar = computed(()=> this.sidenavCollapsed()? 'none': 'block');
ocultar1 = computed(()=> this.sidenavCollapsed1()? 'none': 'block')
paddingColapsed = computed(()=> this.sidenavCollapsed()? '1.3rem':'30px');
paddingColapsed1 = computed(()=> this.sidenavCollapsed1()? '1.3rem':'30px');
paddingColapsed2 = computed(()=> this.sidenavCollapsed2()? '1.3rem':'30px');
  FotoPerfil = computed(() =>this.sidenavCollapsed()?  '32':'100' );
  menuItems = signal<MenuItem[]>([

    // {
    //   icon: 'apps',
    //   label: 'ADIMINISTRACAO ',
    //   route: 'info'
    // },

    // {
    //   icon: 'person',
    //   label: 'Importar Estudantes',
    //   route: 'alunos11'
    // },

    // {
    //   icon: 'person',
    //   label: 'importar Professor',
    //   route: 'Professor'
    // },


    // {
    //   icon: 'add',
    //   label: 'Estudante',
    //   route: 'Estudantes'
    // },
    // {
    //   icon: 'add',
    //   label: 'Professor',
    //   route: 'Professores'
    // },

    
    // {
    //   icon: 'add',
    //   label: 'Disciplina',
    //   route: 'listaDisciplinas'
    // },

    // {
    //   icon: 'add',
    //   label: 'Plano Curricular',
    //   route: 'listaPlanoCurricular'
    // },

    // {
    //   icon: 'add',
    //   label: 'Ano Lectivo',
    //   route: 'listaAnoLect'
    // },

    // {
    //   icon: 'print_error',
    //   label: 'Relatorios',
    //   route: 'GeradorRpt'
    // },

    // {
    //   icon: 'add',
    //   label: 'Turma',
    //   route: 'listaTurma'
    // },

   
    
  ])


  troca(){
    this.muda='toggle'
    this.contador=!this.contador
  }


 
   
}


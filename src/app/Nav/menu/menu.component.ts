import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { CampoSessoes } from 'src/Models/CampoSessoes';
import { Pe } from 'src/Models/Pe';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';

export type MenuItem= {
  icon:string
  label:string
  route:string

}

export class testandoColl{
  
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{



professor : Pe[]=[];
  nome: string ='';
  muda: string='';
  contador: any;





  
  sidenavCollapsed = signal(false);
  
  sidenavCollapsed1 = signal(false);
  dropdowns = signal(true);
  dropdowns1 = signal(true);
  factura1 = signal(false)
  @Input() set collapsed(val: boolean){
    this.sidenavCollapsed.set(val)

  }
  

  constructor(
    private guardarsessoes:GuardarSessoes
  ) { }

ngOnInit(): void {
  this.professor = this.guardarsessoes.obterSessao().pe
       this.nome  = this.professor[0].nome

}
submenu= computed(() => this.dropdowns()? 'none': 'block');
submenu1= computed(() => this.dropdowns1()? 'none': 'block');
factura =computed(() => this.factura1()? 'rotate(180deg)': 'rotate(0deg)');

ocultar = computed(()=> this.sidenavCollapsed()? 'none': 'block');
ocultar1 = computed(()=> this.sidenavCollapsed1()? 'none': 'block')
paddingColapsed = computed(()=> this.sidenavCollapsed()? '1.3rem':'30px');
paddingColapsed1 = computed(()=> this.sidenavCollapsed1()? '1.3rem':'30px');
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

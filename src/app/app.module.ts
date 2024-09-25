import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Security/login/login.component';
import { FormsModule } from '@angular/forms';
import TurmasComponent from './Turmas/turmas/turmas.component';
import { NotasComponent } from './Lancamento/notas/notas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdministracaoComponent } from './administracao/administracao.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LancaComponent } from './LancaNota/lanca/lanca.component';
import { TestesComponent } from './Teste/testes/testes.component';
import { LoginServiceService } from 'src/Service/LoginService/login-service.service';
import { RouterModule } from '@angular/router';
import { LanamentoComponent } from './Teste/Testessss/lanamento/lanamento.component';
import { LogadoComponent } from './Security/login/Login/Logar/logado/logado.component';
import { DiarioClassComponent } from './DiarioClass/diario-class/diario-class.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


//-------------------------Angular Material-----------------------------------------------
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MenuComponent } from './Nav/menu/menu.component';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTreeModule} from '@angular/material/tree';
import { MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { AdiminEstudanteComponent } from './Portal-do-Estudante/adminEstudante/adimin-estudante/adimin-estudante.component';
import { NavEstudanteComponent } from './Portal-do-Estudante/NavEstudante/nav-estudante/nav-estudante.component';
import { ExamesLancComponent } from './Exames/exames-lanc/exames-lanc.component';
import { HomeComponent } from './Portal-do-Estudante/PaginaInicial/home/home.component';
import { PlanoCurricularComponent } from './Portal-do-Estudante/PlanoCuricular/plano-curricular/plano-curricular.component';
import { PerfilProfComponent } from './PerfilProff/perfil-prof/perfil-prof.component';
import { SituacaoPedagogicaComponent } from './Portal-do-Estudante/SituacaoPedagogica/situacao-pedagogica/situacao-pedagogica.component';
import { DsciplinaTurmasComponent } from './DisciplinaTurmas/dsciplina-turmas/dsciplina-turmas.component';
import { SecretHomeComponent } from './Portal-da-Secretaria/Secretaria/secret-home/secret-home.component';
import { NavsecretariaComponent } from './Portal-da-Secretaria/NavSecet/navsecretaria/navsecretaria.component';
import { InformacoesComponent } from './Portal-da-Secretaria/Informacoes/informacoes/informacoes.component';
import { DmzhomeComponent } from './DMZ-Sistema/DZMhome/dmzhome/dmzhome.component';
import { faCake } from '@fortawesome/free-solid-svg-icons';
import { DetalhesComponent } from './Portal-da-Secretaria/ModalDetalhes/detalhes/detalhes.component';
import { ImportarAlunoComponent } from './Portal-da-Secretaria/ImportarAluno/importar-aluno/importar-aluno.component';
import { ImportarProfessorComponent } from './Portal-da-Secretaria/ImportarProfessor/importar-professor/importar-professor.component';
import { ImportarFuncionarioComponent } from './Portal-da-Secretaria/ImportarFuncionario/importar-funcionario/importar-funcionario.component';
import { ParametrosavaliacaoComponent } from './Teste/ParametroTestes/parametrosavaliacao/parametrosavaliacao.component';
import { EscolhertipotesteComponent } from './Teste/EscolherTipo/escolhertipoteste/escolhertipoteste.component';
import { ConfirmDialogComponent } from './Teste/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { TabelasComponent } from './Teste/GridView/tabelas/tabelas.component';
import { OutrossComponent } from './Teste/GridView/outross/outross.component';
import { OutroComponent } from './Teste/GridView/outro/outro.component';
import { ModallancamentoComponent } from './Teste/GridView/modallancamento/modallancamento.component';
import { RelatoriosComponent } from './Teste/GridView/relatorios/relatorios.component';
import { ModalParamRelComponent } from './ModalParamRel/modal-param-rel/modal-param-rel.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, NgSwitch } from '@angular/common';
import { AutocompleteDisplayExampleComponent } from './Teste/AutocompleteDisplayExample/autocomplete-display-example/autocomplete-display-example.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ClcadastroComponent } from './clcadastro/clcadastro/clcadastro.component';
import { ConfirmDialogwrComponent } from './clcadastro/ConfirmDialogwr/confirm-dialogwr/confirm-dialogwr.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CadastroPessoaComponent } from './clcadastro/cadastro-pessoa/cadastro-pessoa.component';
import { CadastroComponent } from './Portal-da-Secretaria/Cadastro/cadastro/cadastro.component';
// import { ModalEstudantesComponent } from './modal-estudantes/modal-estudantes.component';
import { ModalPeComponent } from './clcadastro/cadastro-pessoa/Modal/modal-pe/modal-pe.component';
import { ModalplanoCurricularComponent } from './Interfaces/Grade/modalplano-curricular/modalplano-curricular.component';
import { ModalAnolectComponent } from './Interfaces/Anolect/modal-anolect/modal-anolect.component';
import { ModalDisciplinasComponent } from './Interfaces/Disciplinas/modal-disciplinas/modal-disciplinas.component';
import { SalaTesteComponent } from './SaladeTeste/sala-teste/sala-teste.component';
import { ModalEstudantesComponent } from './listaestudantes/modal-estudantes/modal-estudantes.component';
import { ModalhorarioComponent } from './Portal-da-Secretaria/Turmas/Componentes/modalhorario/modalhorario.component';
import { MOdalopenEstudanteComponent } from './Turmas/Componentes/MOdalopenEstudante/modalopen-estudante/modalopen-estudante.component';
import { FrmRclComponent } from './frm-rcl/frm-rcl.component';
import { FrmProcuraGeralComponent } from './frm-procura-geral/frm-procura-geral.component';
import { FrmPgfComponent } from './frm-pgf/frm-pgf.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { VerTrabalhoComponent } from './Portal-do-Estudante/trabalho/ver-trabalho/ver-trabalho.component';
import { ListaSituacaoPedagogicaComponent } from './Portal-do-Estudante/pedagogia/lista-situacao-pedagogica/lista-situacao-pedagogica.component';
import { EnviarTrabalhoComponent } from './Portal-do-Estudante/EnvioTrabalho/enviar-trabalho/enviar-trabalho.component';
import { ModaltrabalhoComponent } from './Portal-do-Estudante/modaltrabalho/modaltrabalho/modaltrabalho.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { VerPautaEstudanteComponent } from './Portal-do-Estudante/ver-pauta-estudante/ver-pauta-estudante/ver-pauta-estudante.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { ListaDclasseComponent } from './Portal-da-Secretaria/listaDclasse/lista-dclasse/lista-dclasse.component';
import { LancaTrabalhoComponent } from './LancaTrabalhos/lanca-trabalho/lanca-trabalho.component';
import { FormMediaComponent } from './Formula/form-media/form-media.component';
import { PermissoesComponent } from './Portal-da-Secretaria/Premissoes/permissoes/permissoes.component';
import { NovoModalTurmaComponent } from './Turmas/Componentes/NovomodalTurma/novo-modal-turma/novo-modal-turma.component';
import { AproveitamentoComponent } from './Aproveitamento/aproveitamento/aproveitamento.component';
import { FacturacaoComponent } from './Portal-da-Secretaria/Facturacao/facturacao/facturacao.component';
import { FrmrclBuscaComponent } from './frmrclBusca/frmrcl-busca/frmrcl-busca.component';
import { InscricoesComponent } from './Portal-da-Secretaria/Inscricoes/inscricoes/inscricoes.component';
import { ModalInscricoesComponent } from './Portal-da-Secretaria/modalInscricoes/modal-inscricoes/modal-inscricoes.component';
import { PlanoPagamentoComponent } from './Portal-da-Secretaria/planoPG/plano-pagamento/plano-pagamento.component';
//import GerarDiarioClasseComponent from './Portal-da-Secretaria/GerarDiarioClasse/gerar-diario-classe/gerar-diario-classe.component'; 

// import { ModalhorarioComponent } from './Turmas/Componentes/modalhorario/modalhorario.component';



export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TurmasComponent,
    NotasComponent,
    AdministracaoComponent,
    LancaComponent,
    MenuComponent,
    TestesComponent,
    LogadoComponent,
    DiarioClassComponent,
    LanamentoComponent,
    AdiminEstudanteComponent,
    NavEstudanteComponent,
    ExamesLancComponent,
    HomeComponent,
    //PlanoCurricularComponent,
    PerfilProfComponent,
    SituacaoPedagogicaComponent,
    DsciplinaTurmasComponent,
    SecretHomeComponent,
    NavsecretariaComponent,
    InformacoesComponent,
    DmzhomeComponent,
    DetalhesComponent,
    ImportarAlunoComponent,
    ImportarProfessorComponent,
    ImportarFuncionarioComponent,
    ParametrosavaliacaoComponent,
    EscolhertipotesteComponent,
    ConfirmDialogComponent,
    TabelasComponent,
    OutrossComponent,
    OutroComponent,
    ModallancamentoComponent,
    RelatoriosComponent,
    ModalParamRelComponent,
    AutocompleteDisplayExampleComponent,
    ClcadastroComponent,
    ConfirmDialogwrComponent,
    CadastroPessoaComponent,
    CadastroComponent,    
    //ModalEstudantesComponent,
         ModalPeComponent,
         ModalplanoCurricularComponent,
         ModalAnolectComponent,
         //ListaDisciplinasComponent,
         ModalDisciplinasComponent,
        //  SalaTesteComponent,
        ModalhorarioComponent,
        MOdalopenEstudanteComponent,
        VerTrabalhoComponent,
        ListaDclasseComponent,
        LancaTrabalhoComponent,
        FormMediaComponent,
        PermissoesComponent,
        AproveitamentoComponent,
        FacturacaoComponent,
        FrmrclBuscaComponent,
        InscricoesComponent,
        ModalInscricoesComponent,
        PlanoPagamentoComponent,
        //NovoModalTurmaComponent,
        //GerarDiarioClasseComponent,
       // VerPautaEstudanteComponent,
       // EnviarTrabalhoComponent,
        //ModaltrabalhoComponent,
  
       
    
  ],
  imports: [
    BrowserModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatSidenavModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatGridListModule,
    MatDividerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTabsModule,
    FontAwesomeModule,
    MatSnackBarModule,
    MatSlideToggleModule ,    
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,MatProgressSpinnerModule,    
    MatButtonModule,
    MatNativeDateModule,
    MatCheckboxModule,NgSwitch, MatMenuModule,MatTreeModule,


    NgCircleProgressModule.forRoot({
      "radius": 60,
      "space": -10,
      "outerStrokeGradient": true,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "outerStrokeGradientStopColor": "rgb(186, 138, 4)",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      // "title": "UI",
      "titleColor":"rgb(0, 12, 29)",
      
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false,
      "lazy": true})


    
  ],
  providers: [LoginServiceService,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },

    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary) {
  
    library.addIcons(faCake);
  }

 }

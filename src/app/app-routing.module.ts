import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Security/login/login.component';
import TurmasComponent from './Turmas/turmas/turmas.component';
import { NotasComponent } from './Lancamento/notas/notas.component';
import { LancaComponent } from './LancaNota/lanca/lanca.component';
import { AdministracaoComponent } from './administracao/administracao.component';
import { TestesComponent } from './Teste/testes/testes.component';

import { DiarioClassComponent } from './DiarioClass/diario-class/diario-class.component';
import { AdiminEstudanteComponent } from './Portal-do-Estudante/adminEstudante/adimin-estudante/adimin-estudante.component';
import { NavEstudanteComponent } from './Portal-do-Estudante/NavEstudante/nav-estudante/nav-estudante.component';
import { LanamentoComponent } from './Teste/Testessss/lanamento/lanamento.component';
import { HomeComponent } from './Portal-do-Estudante/PaginaInicial/home/home.component';
//import { PlanoCurricularComponent } from './Portal-do-Estudante/PlanoCuricular/plano-curricular/plano-curricular.component';
import { PerfilProfComponent } from './PerfilProff/perfil-prof/perfil-prof.component';
import { SituacaoPedagogicaComponent } from './Portal-do-Estudante/SituacaoPedagogica/situacao-pedagogica/situacao-pedagogica.component';
import { DsciplinaTurmasComponent } from './DisciplinaTurmas/dsciplina-turmas/dsciplina-turmas.component';
import { SecretHomeComponent } from './Portal-da-Secretaria/Secretaria/secret-home/secret-home.component';
import { InformacoesComponent } from './Portal-da-Secretaria/Informacoes/informacoes/informacoes.component';
import { DmzhomeComponent } from './DMZ-Sistema/DZMhome/dmzhome/dmzhome.component';
import { ImportarAlunoComponent } from './Portal-da-Secretaria/ImportarAluno/importar-aluno/importar-aluno.component';
import { ImportarProfessorComponent } from './Portal-da-Secretaria/ImportarProfessor/importar-professor/importar-professor.component';
import { ImportarFuncionarioComponent } from './Portal-da-Secretaria/ImportarFuncionario/importar-funcionario/importar-funcionario.component';
import { ParametrosavaliacaoComponent } from './Teste/ParametroTestes/parametrosavaliacao/parametrosavaliacao.component';
import { EscolhertipotesteComponent } from './Teste/EscolherTipo/escolhertipoteste/escolhertipoteste.component';
import { ConfirmDialogComponent } from './Teste/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { TabelasComponent } from './Teste/GridView/tabelas/tabelas.component';
import { OutrossComponent } from './Teste/GridView/outross/outross.component';
import { TabelapagComponent } from './Teste/GridView/tabelapag/tabelapag.component';
import { RelatoriosComponent } from './Teste/GridView/relatorios/relatorios.component';
import { ModalrelatorioComponent } from './modalrelatorio/modalrelatorio/modalrelatorio.component';
import { GeradorreportComponent } from './geradorreport/geradorreport/geradorreport.component';
import { ClcadastroComponent } from './clcadastro/clcadastro/clcadastro.component';
import { CadastroPessoaComponent } from './clcadastro/cadastro-pessoa/cadastro-pessoa.component';
import { CadastroComponent } from './Portal-da-Secretaria/Cadastro/cadastro/cadastro.component';
import { ListaestudantesComponent } from './listaestudantes/listaestudantes.component';
import { ListaprofessoresComponent } from './clcadastro/cadastro-pessoa/ListaProfessores/listaprofessores/listaprofessores.component';
import { ListaplanocurricularComponent } from './Interfaces/Grade/listaplanocurricular/listaplanocurricular.component';
import { ModalplanoCurricularComponent } from './Interfaces/Grade/modalplano-curricular/modalplano-curricular.component';
import { ListaAnolectComponent } from './Interfaces/Anolect/lista-anolect/lista-anolect.component';
import { ListaDisciplinasComponent } from './Interfaces/Disciplinas/lista-disciplinas/lista-disciplinas.component';
import { SalaTesteComponent } from './SaladeTeste/sala-teste/sala-teste.component';
import { TurmaComponent } from './Portal-da-Secretaria/turma/turma.component';
import { HorarioComponent } from './Turmas/Componentes/horario/horario.component';
import { ListaCursoComponent } from './Portal-da-Secretaria/Curso/lista-curso/lista-curso.component';
import { ListamatriculaComponent } from './Portal-da-Secretaria/MatriculaAluno/listamatricula/listamatricula.component';
import { FrmRclComponent } from './frm-rcl/frm-rcl.component';
import { ListaSituacaoPedagogicaComponent } from './Portal-do-Estudante/pedagogia/lista-situacao-pedagogica/lista-situacao-pedagogica.component';
import { EnviarTrabalhoComponent } from './Portal-do-Estudante/EnvioTrabalho/enviar-trabalho/enviar-trabalho.component';
import { PlanoCurricularComponent } from './Portal-do-Estudante/PlanoCuricular/plano-curricular/plano-curricular.component';
import { GerarDiarioClasseComponent } from './Portal-da-Secretaria/GerarDiarioClasse/gerar-diario-classe/gerar-diario-classe.component';
import { ListaDclasseComponent } from './Portal-da-Secretaria/listaDclasse/lista-dclasse/lista-dclasse.component';
import { FormMediaComponent } from './Formula/form-media/form-media.component';
import { PermissoesComponent } from './Portal-da-Secretaria/Premissoes/permissoes/permissoes.component';
import { AproveitamentoComponent } from './Aproveitamento/aproveitamento/aproveitamento.component';
import { FacturacaoComponent } from './Portal-da-Secretaria/Facturacao/facturacao/facturacao.component';
import { LogadoComponent } from './Security/login/Login/Logar/logado/logado.component';
import { authGuard } from 'src/guard auth/auth.guard';
import { InscricoesComponent } from './Portal-da-Secretaria/Inscricoes/inscricoes/inscricoes.component';
import { PlanoPagamentoComponent } from './Portal-da-Secretaria/planoPG/plano-pagamento/plano-pagamento.component';
//import GerarDiarioClasseComponent from './Portal-da-Secretaria/GerarDiarioClasse/gerar-diario-classe/gerar-diario-classe.component';
//import { ModallancamentoComponent } from './Teste/GridView/modallancamento/modallancamento.component';

const routes: Routes = [
  //Portal do professor
{path:'Adim',
component:AdministracaoComponent,
children: [
  {path:'Turmas', component:TurmasComponent},
  {path:'Notas', component:NotasComponent},
  {path:'Lancamento', component:LancaComponent},
  {path:'Diario', component:DiarioClassComponent},
  {path:'teste', component:TestesComponent },
  {path:'turma', component:TurmasComponent},
  {path:'CompTeste', component:LanamentoComponent},
  {path:'perfil', component:PerfilProfComponent},
  {path:'DiscTurm', component:DsciplinaTurmasComponent},
  {path:'lanaTeste', component:LanamentoComponent},  
  {path:'Parametrosvaliacao', component:ParametrosavaliacaoComponent},
  {path:'TiposTeste', component:EscolhertipotesteComponent},
  {path:'ConfirmDialog', component:ConfirmDialogComponent},
  {path:'Tabelas', component:TabelasComponent},
  {path:'Outrascoisas', component:OutrossComponent},  
  {path:'Tabelapag', component:TabelapagComponent},  
  {path:'Lanamento', component:LanamentoComponent}, 
  {path: 'media', component:FormMediaComponent},
  {path: 'Permisoes', component:PermissoesComponent},
  {path: 'aproveita', component:AproveitamentoComponent}
  
 
 

    

]
},

// Portal do estudante
{path:'AdimEstud', component:AdiminEstudanteComponent,

children:[
  {path:'home', component:HomeComponent},
  {path:'Plano', component:PlanoCurricularComponent},
  {path:'listasitau', component:ListaSituacaoPedagogicaComponent},
 // {path:'SituaPedag', component:SituacaoPedagogicaComponent},
  {path:'Trabalho', component:EnviarTrabalhoComponent}
]
},


// teste rota
{path:'Relatorios', component:RelatoriosComponent,
children:[
  {path:'',pathMatch:'full', component:ModalrelatorioComponent}  
]
},




//portal da secretaria

{
  path:'secret', component:SecretHomeComponent,canActivate: [authGuard],
    children: [
  {path:'info', component:InformacoesComponent},
    {path:'alunos11', component:ImportarAlunoComponent, },
    {path:'Professor', component:ImportarProfessorComponent},
    {path:'funcionario', component:ImportarFuncionarioComponent},
    {path:'CadastroPessoa', component:CadastroPessoaComponent}, 
    {path:'clcadastro', component:ClcadastroComponent},   
    {path:'GeradorRpt', component:GeradorreportComponent},  
    {path:'CadastroCl', component:ClcadastroComponent},  
    {path:'Estudantes', component:ListaestudantesComponent},
    {path:'Professores', component:ListaprofessoresComponent}, 
    {path:'cadastro', component:CadastroComponent}, 
    {path:'listaPlanoCurricular', component:ListaplanocurricularComponent}, 
    {path:'listaAnoLect', component:ListaAnolectComponent}, 
    {path:'listaDisciplinas', component:ListaDisciplinasComponent},
    {path:'listaTurma', component:TurmaComponent}, 
    {path:'listahorario', component:HorarioComponent},
    {path:'listaCurso', component:ListaCursoComponent},
    {path:'listaMatricula', component:ListamatriculaComponent},
    {path:'salateste', component:SalaTesteComponent},
    {path:'FrmRcl', component:FrmRclComponent},
    {path:'ListaDClass', component:ListaDclasseComponent},
    {path: 'Permisoes', component:PermissoesComponent},
    {path:'Facturacao' , component:FacturacaoComponent},
    {path:'inscriccoes', component:InscricoesComponent},
    {path:'planoPag', component:PlanoPagamentoComponent},
   
    
    
  
]
},


// Login
{path:'',
component:LoginComponent,
children:[
  {path:'', pathMatch:'full',redirectTo:'Login'}
]
},
{path:'Login', component:LoginComponent},

{path:'Logado', component:LogadoComponent},
//Dmz principal

{path:'dmzhome', component:DmzhomeComponent,

 
}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }

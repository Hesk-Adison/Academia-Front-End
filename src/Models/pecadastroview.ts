import { Pedisc } from "./Pedisc";
import { Pedoc } from "./Pedoc";
import { Pefam } from "./Pefam";
import { pelingview } from "./pelingview";

export interface pecadastroview{
  pestamp :string;
  no :string;
  nome :string;
  nuit :number   
  bi :string;//Bilhete de Identidade 
  codsit :number
  situacao :string;
  datanasc :Date;
  dataAdmissao :Date;
  dataFimContrato :Date;
  dataDemissao :Date;
  sexo :string;
  ecivil :string;
  dcasa : Date;
  nacional :string;
  pais :string;
  provNasc :string;
  distNasc :string;
  padNasc :string;
  bairro :string;
  provMorada :string;
  distMorada :string;
  padMorada :string;
  locali :string;
 //------------Fim Morada-------------
  pai :string;
  mae :string;
  codNivel :number
  nivel :string;
  codCateg :number
  categ :string;
  codprof :number
  prof :string;
  codep :number
  depart :string;
  codrep :number
  repart :string;
  nrinss :string; //Numero de Seguranca Social
  balcaoInss :string; //Balcao de Seguranca Social
  dataInss :Date; //Data de admissao a Seguranca Social
  relPonto :boolean
   
  valBasico :number //Vencimento Base
   
  horasdia :number//Numero de horas de trabalho por dia 
  nrdepend :number//Numero de dependentes para IRPS
   
   obs :string;
   codtipo :string;//Tipo de funcionario (Mecanico,Motorista,etc)
   tipo :string;//Tipo de funcionario (Mecanico,Motorista,etc)
 //Novos campos 
   codccu :string;
   cCusto :string;
   ccustamp :string;
   
  diasmes :number //numero de Dias de trabalho no mes
   
  horasSemana :number//Horas de Trabalho por semana SalHora
   
  salHora :number//Valor do salario por hora 
   tabIrps :string;//Tabela do IRPS a usar 
   codRepFinancas :string; //Codigo de Reparticao de financas 
   descRepFinancas :string; //Codigo de Reparticao de financas 
   apolice :string;//Numero de apolice 
   dataApoliceIn :Date;//Numero de apolice 
   dataApoliceTer :Date;//Numero de apolice 
   seguradora :string;
   moeda :string;//Moeda de recebimento 
  naoInss :boolean//Nao processa O INSS
  naoIRPS :boolean//Nao processa O IRPS
   tirpsstamp :string;//Tabela de IRPS
  ntabelado :boolean//Indica que o valor nao tabelado 
   pontonome :string;//Nome do relogio do ponto 
   formapag :string;
  codformp :number
   dataadm :Date;//DAta de admissao 
   reDataadm :Date;//DAta de readmissao 
   
  basedia :number
  pedagogico :boolean//Director pedagógico
  coordenador :boolean//Coordenador/Conselheiro/supervisor/Director do curso
  email:string; //Usado para logar no identity 
  pefamview: Pefam[]  
  pedocview: Pedoc[]  
 pelingview:pelingview[]
 pediscview:Pedisc[]

  
   }
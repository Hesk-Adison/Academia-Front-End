export interface Cls{
    
  clstamp : string
  no : string
  nome : string
  morada: string 
  codprov :number
  coddist : number
  codpad : number
  localidade : string 
  distrito : string
  provincia : string
  telefone : string 
  celular : string
  fax : string
  email : string

  nuit: number 

  saldo : number
  moeda : string
  status : string

  datacl : string

  obs : string

//  imagem : File
//  codigobarra: File 
//  codigoQr : File
  prontopag: boolean 
  tipo :string
  pos : boolean
  pais : string

  //Dados especificos de estudantes............ 
  codcurso :string
  curso:string 
  gradestamp:string 
  descgrelha:string 
  anoingresso :string
  bolseiro: boolean 
  coddep:string 
  departamento:string 
  codfac :string
  faculdade :string
//Dados do cliente fornecedor 
  nofnc :string
  fnc :string

  datanasc : string
  sexo :string

  areafiscal:string //Direcao da area fiscal caso mozlec 
  aluno: boolean 
  estadocivil :string
  religiao :string
  nivelac:string 
  codaluno :string
  codesc :string
  escola :string
  planosaude :boolean
  medico :string
  hospital :string
  instplanosaude :string
  transp :string
  sozinho : boolean
  acompanhado : boolean

//Fim de dados de estudante............
  codccu : number
  ccusto :string
  ccustostamp :string
  deficilCobrar : boolean 
//Valor maximo de crédito que pode ser atribuido ao cliente..

  plafond : number
//Tempo para vencimento de facturas 
  vencimento : number
  generico : boolean
  desconto : boolean
  percdesconto : number
  codCondPagamento : number //Codigo de condicoes de Pagamento 
  descCondPagamento:string //Descricao de condicoes de Pagamento 
  insencao : boolean
  motivoInsencao:string 
  cobrador :string 
  clivainc : boolean
//Tesoraria por defeito
  codtz : number
  tesouraria:string
  localentregas:string
//Conta do cliente no Plano de contas ...
  contaPgc :string
//Grupo de cliente no PGC ex: 441...
  grupoclPgc:string 
//Descricao do Cl no PGC ex: Cliente conta corrente...
  descGrupoclPgc :string
  site :string
  variasmoradas : boolean
  tipocl :string //Classificador de clientes quanto ao desconto
  precoespecial: boolean  //Define 
  ctrlplanfond :boolean//Controla Plafond de crédito
  contastamp:string 
  mesavirtual : boolean//Mesa resultante de Juncao de mesas 
  possuifilial: boolean //Indica que tem uma filial 

  contasstamp :string



}




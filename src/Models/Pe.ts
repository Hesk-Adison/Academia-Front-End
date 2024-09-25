
export interface Usera {
  isSelected: boolean;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  isEdit: boolean;
}

export const UserColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'firstName',
    type: 'text',
    label: 'First Name',
    required: true,
  },
  {
    key: 'lastName',
    type: 'text',
    label: 'Last Name',
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email',
    required: true,
    pattern: '.+@.+',
  },
  {
    key: 'birthDate',
    type: 'date',
    label: 'Date of Birth',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

















export interface Pe{

    pestamp :string;
    no :string;
    nome :string;
 
    nuit :number

    bi :string;//Bilhete de Identidade 
    codsit :number
    situacao :string;
    datanasc :string;
    dataAdmissao :string;
    dataFimContrato :string;
    dataDemissao :string;
    sexo :string;
    ecivil :string;
    dcasa :string;
    //Foto :string;// ver
   /// <summary>
   /// Dados de Nascimento
   /// </summary>
    nacional :string;
    pais :string;
    provNasc :string;
    distNasc :string;
    padNasc :string;
   //------------Fim Nascimento-----------

   /// <summary>
   /// Dados da Morada
   /// </summary>
   /// 
    bairro :string;
    provMorada :string;
    distMorada :string;
    padMorada :string;
    locali :string;
   //------------Fim Morada-------------
   /// <summary>
   /// Filiação
   /// </summary>
    pai :string;
    mae :string;
   /// <summary>
   /// Nivel Academico
   /// </summary>
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
    dataInss :string; //Data de admissao a Seguranca Social
    relPonto :boolean

    valBasico :number //Vencimento Base

    horasdia :number//Numero de horas de trabalho por dia 
    nrdepend :number//Numero de dependentes para IRPS

     obs :string;
     codtipo :string;//Tipo de funcionario (Mecanico,Motorista,etc)
     tipo :string;//Tipo de funcionario (Mecanico,Motorista,etc)
   //Novos campos 
     codccu :string;
     ccusto :string;
     ccustamp :string;

    diasmes :number //numero de Dias de trabalho no mes

    horasSemana :number//Horas de Trabalho por semana SalHora

    salHora :number//Valor do salario por hora 
     tabIrps :string;//Tabela do IRPS a usar 
     codRepFinancas :string; //Codigo de Reparticao de financas 
     descRepFinancas :string; //Codigo de Reparticao de financas 
     apolice :string;//Numero de apolice 
     dataApoliceIn :string;//Numero de apolice 
     dataApoliceTer :string;//Numero de apolice 
     seguradora :string;
     moeda :string;//Moeda de recebimento 
    naoInss :boolean//Nao processa O INSS
    naoIRPS :boolean//Nao processa O IRPS
     tirpsstamp :string;//Tabela de IRPS
    ntabelado :boolean//Indica que o valor nao tabelado 
     pontonome :string;//Nome do relogio do ponto 
     formapag :string;
    codformp :number
     dataadm :string;//DAta de admissao 
     reDataadm :string;//DAta de readmissao 

    basedia :number
    Pedagogico :boolean//Director pedagógico
    coordenador :boolean//Coordenador/Conselheiro/supervisor/Director do curso
    email:string; //Usado para logar no identity 
    
}


   

  

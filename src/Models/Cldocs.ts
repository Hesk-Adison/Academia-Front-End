import { cllingview } from "./CampoSessoes"
import { Clbolsas } from "./Clbolsas"

export interface Cldocs{
    cldocstamp : string,
    clstamp :string,
    documento : string,
    numero: string 
    localemis: string,
    emissao : Date
    validade : Date
    Bi :boolean,
    imagem: File

}
export interface Clfamview{
    clfamstamp :string
    clstamp :string
    nome :string
    grau :string
    tel :string
    email :string
}


export interface Clview {

    clstamp  :string ;   
   no :string ;
   nome :string ;
   morada :string ;
   codprov :number;
   coddist:number;
   codpad :number;
   localidade :string ;  
   distrito :string ;  
   provincia :string ;  
   telefone :string ;  
   celular :string ;  
   fax :string ;  
   email :string ;  
   nuit :number;
saldo :number;
moeda :string;
status :string;

datacl :string;// DateTime 
obs :string;
prontopag :boolean;
tipo :string;
pos :boolean;
 pais:string;
 //Dados especificos de estudantes............ 
codcurso :string;
curso :string;
 gradestamp :string;
 descgrelha :string;
 anoingresso :string;// DateTime
 
 bolseiro :boolean;
  coddep :string
 departamento :string
 codfac :string
 faculdade :string
//Dados do cliente fornecedor 
 nofnc :string
 fnc :string
 datanasc :string;// DateTime
 sexo :string
 areafiscal :string//Direcao da area fiscal caso mozlec 
 aluno :boolean;
 estadocivil :string
 religiao :string
 nivelac :string
 codaluno :string
 codesc :string
 escola :string
 planosaude:boolean;
 medico :string
hospital :string
 instplanosaude :string
transp :string
 sozinho :boolean;
acompanhado :boolean;
//Fim de dados de estudante............
 codccu :number;
 ccusto :string
 ccustostamp :string
 deficilCobrar:boolean;
//Valor maximo de crédito que pode ser atribuido ao cliente..
 plafond :number;
//Tempo para vencimento de facturas 
 vencimento :number;
 generico :boolean;
desconto :boolean;
 percdesconto :number;
 codCondPagamento :number;//Codigo de condicoes de Pagamento 
descCondPagamento :string//Descricao de condicoes de Pagamento 
insencao :boolean;
 motivoInsencao :string
 cobrador :string
clivainc :boolean;
//Tesoraria por defeito
 codtz :number;
 tesouraria :string
localentregas :string//Usado para guardar o caminho da imagem
//Conta do cliente no Plano de contas ...
 contaPgc :string
//Grupo de cliente no PGC ex: 441...
 grupoclPgc :string
//Descricao do Cl no PGC ex: Cliente conta corrente...
 descGrupoclPgc :string;
 site :string
 variasmoradas :boolean;
 tipocl :string//Classificador de clientes quanto ao desconto
 precoespecial :boolean;///Define 
 ctrlplanfond :boolean;//Controla Plafond de crédito
 contastamp :string
 mesavirtual :boolean;//Mesa resultante de Juncao de mesas 
possuifilial :boolean;//Indica que tem uma filial 
contasstamp :string
clfamview: Clfamview[]
clbolsaview: Clbolsas[]
cllingview
: cllingview[]
// // virtual ICollection<ClClasse> ClClasse { get; set; }
// // virtual ICollection<Clturview> Clturview { get; set; } = new List<Clturview>();
// // virtual ICollection<Clcontactview> Clcontactview { get; set; } = new List<Clcontactview>();
// // virtual ICollection<Clctview> Clctview { get; set; } = new List<Clctview>();
cldocview : Cldocview[]
// // virtual ICollection<Clcurview> ClCursoview { get; set; } = new List<Clcurview>();
// // virtual ICollection<Cldoencaview> Cldoencaview { get; set; } = new List<Cldoencaview>();
// // virtual ICollection<Clbolsaview1> Clbolsaview1 { get; set; } = new List<Clbolsaview1>();
// // virtual ICollection<Clmoradaview> Clmoradaview { get; set; } = new List<Clmoradaview>();
// // virtual ICollection<Clstview> Clstview { get; set; } = new List<Clstview>();
// // virtual ICollection<Clcontasview> Clcontasview { get; set; } = new List<Clcontasview>();
// // virtual ICollection<Clfilialview> Clfilialview { get; set; } = new List<Clfilialview>();
// // virtual ICollection<Clcartview> Clcartview { get; set; } = new List<Clcartview>();//Cartao de estudante //Peling 
// // virtual ICollection<Cllingview> Cllingview { get; set; } = new List<Cllingview>();//Linguas que o aluno fala 



}








export interface Cldocview{
    cldocstamp : string,
    clstamp :string,
    documento : string,
    numero: string 
    localemis: string,
    emissao : Date
    validade : Date
    bi :boolean,
    imagem: File,
    file: string

}



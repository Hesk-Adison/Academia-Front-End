import { Alauxiliar } from "./Alauxiliar";
import { clTurmaClass } from "./ClTurma";
import { Cls } from "./Cls";
import { diarioClasses} from "./DiarioClass";
import { Horario } from "./Horario";
import { Pe } from "./Pe";
import { pecontra } from "./Pecontra";
import { Pedisc } from "./Pedisc";
import { Pedoc } from "./Pedoc";
import { Pefam } from "./Pefam";
import { Turmanota1 } from "./Turma";
import { Turmadiscp } from "./Turmadiscp";
import { camposCl } from "./camposCl";
import { fnc } from "./fnc";

export interface CampoSessoes  {
 

     usrstamp:string,
     login :string,
     nome:string,
     email :string,
     retorno:boolean,
     tipo: number;


     diarioclass: diarioClasses[],
     horario: Horario[],
     turmadiscp: Turmadiscp[],
     pedoc: Pedoc[],
     pefam: Pefam[],
     pedisc: Pedisc[],
     clturma: clTurmaClass[],
     turmanota: Turmanota1[],
     pecontra: pecontra[],
     alauxiliar: Alauxiliar[],
     camposCl: camposCl,
     pe: Pe[];
     cls: Cls[];
     fnc: fnc[]
     totalprofesso: number; 
     totalalunos: number;  
     totalRh: number;  
     totalcurso: number;  
     totalturmas: number;  

    


}

export interface selects  {
     chave:string,
     descricao :string,
     ordem :string,
}
export interface selectsprocura  {
     chave:string,
     descricao :string,
     ordem :string,
     stamplocal :string,
     stampsexcepcao :string,
}
export interface selectview  {
     selects:selects[]
}

export interface condicoesprocura  {
     tabela:string
      campo1: string 
      campo2:string
       condicao:string
}
export interface gradelviwob  {
    
     dados
:gradelviw[]
}
export interface  gradelviw
{
    gradelstamp:string;
    gradestamp:string;
    codetapa :string;//
    etapa :string;//Ordem etapa 
    coddisc:string;
    displina :string;
    ststamp:string;//representa o stamp da disciplina 
    semstamp:string;//Stamp do semestre 
    categoria :string;
    opcao :boolean;    
    credac:number;//Credito Academico  
  cargahtotal:number;//Somatorio de teorica e pratica     
   cargahteorica:number;//Carga Horaria contacto    
  cargahpratica:number;//Carga Horaria de estudo 
  prec :boolean;//Indica se a disciplina tem precedencia    
}
export interface  cllingview
{
    cllingstamp:string;
    lingua :string;
    fala:string;
    leitura:string;
    escrita:string;
    compreecao:string;
    materna :boolean;
    clstamp:string;
}
export interface contacorrente
{ total:number;
     contacorrentelistas
:contacorrentelista[];
}
export interface  contacorrentelista
{
     descricao:string;
     valorreg :string;
     ccstamp :string;
     data :string;
     dataven:string;
      referencia :string;
      numero:string;
      entidadebanc:string;
}








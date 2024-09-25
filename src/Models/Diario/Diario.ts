import { dclassel } from "./dclassel"

export interface Dclasse{
dclassestamp : string,
 anosem : string,
 descricao : string,
 codigo : string,
  tipoprazo : string,

 //Periodo da etapa
datain : Date,
datater : Date,

//Prazo de envio de aulas e frequência 
datainaula : Date,
datateraula : Date,

// Prazo de envio de avaliacoes e notas  
datainnota : Date,
dataternota : Date,
 //Prazo de liberacao de resultados 
dataresult : Date,
 fechado : boolean,
 motivo : string,
 dataFecho : Date,
 dclassel : dclassel[]
}
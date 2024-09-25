import { gradel } from "./gradel";

export interface grade{
       gradestamp:string;
       codigo:string;
       descricao:string;
       codcurso:string;
       desccurso:string;
       cursostamp:string;
       activo:boolean;
       anoseminic:string;//Ano/semestre inicio 
       anoSemstamp:string;       
       totalCargahora:number;//Carga Horaria        
       totalCargateorica:number;//Carga Horaria teórica       
       totalCargapratica:number;//Carga Horaria pratica       
       obs:string;
       totaldisc:number;//total de disciplinas 
       totalCreda:number;//total de creditos academicos 
       data:Date//data de Criacao 
       planopagstamp:string;
       descplano:string;       
       gradel:gradel[];       
       }